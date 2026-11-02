import { getRanking } from "../../data/mock";
import { getNextResetAt, getTodayKey } from "../time";
import { ALLOW_REVOTE_NEXT_DAY, AUTH_STORAGE_KEYS, DAILY_VOTE_LIMIT } from "./config";
import { AuthError, type AuthService, type AuthSnapshot, type DailyVoteState, type Session, type VoteEvent } from "./types";

export function normalizePhone(phone: string): string {
  const clean = phone.replace(/\s/g, "");
  if (!/^(0|\+84)(3|5|7|8|9)\d{8}$/.test(clean)) {
    throw new AuthError("phone", "Số điện thoại Việt Nam không hợp lệ. Vui lòng kiểm tra lại.");
  }
  return clean.startsWith("+84") ? `0${clean.slice(3)}` : clean;
}
interface KeyValueStorage { getItem(key: string): string | null; setItem(key: string, value: string): void; removeItem(key: string): void; }
interface ServiceOptions {
  storage?: () => KeyValueStorage | null;
  now?: () => number;
  sendDelayMs?: number;
  allowRevoteNextDay?: boolean;
}
let fallbackLock: Promise<void> = Promise.resolve();
async function exclusive<T>(operation: () => Promise<T>): Promise<T> {
  if (typeof navigator !== "undefined" && navigator.locks) return navigator.locks.request("dlnt2026:vote-transaction", operation);
  const next = fallbackLock.then(operation, operation);
  fallbackLock = next.then(() => undefined, () => undefined);
  return next;
}
const isObject = (value: unknown): value is Record<string, unknown> => !!value && typeof value === "object" && !Array.isArray(value);

/** All persistence and mock authentication live here; replace this implementation with an API adapter. */
export function createMockAuthService(options: ServiceOptions = {}): AuthService {
  const now = options.now ?? Date.now;
  const storage = options.storage ?? (() => typeof window === "undefined" ? null : window.localStorage);
  const allowRevote = options.allowRevoteNextDay ?? ALLOW_REVOTE_NEXT_DAY;
  const baseline = getRanking().map(item => ({ destinationId: item.id, votes: item.votes }));
  const validIds = new Set(baseline.map(item => item.destinationId));
  const memory = new Map<string, string>();
  function read(key: string): unknown {
    try {
      const target = storage();
      const raw = target ? target.getItem(key) : memory.get(key);
      return JSON.parse(raw ?? "null") as unknown;
    } catch { return null; }
  }
  function write(key: string, value: unknown, critical = true) {
    try {
      const raw = JSON.stringify(value);
      storage()?.setItem(key, raw);
      memory.set(key, raw);
    } catch {
      if (critical) throw new AuthError("storage", "Không thể lưu trên trình duyệt. Vui lòng cho phép lưu dữ liệu rồi thử lại.");
    }
  }
  function session(): Session | null {
    const value = read(AUTH_STORAGE_KEYS.session);
    if (!isObject(value) || typeof value.phone !== "string" || typeof value.loggedInAt !== "number" || !Number.isFinite(value.loggedInAt)) return null;
    try { return { phone: normalizePhone(value.phone), loggedInAt: value.loggedInAt }; } catch { return null; }
  }
  function ledger(): VoteEvent[] {
    const value = read(AUTH_STORAGE_KEYS.ledger);
    if (!Array.isArray(value)) return [];
    const seen = new Set<string>();
    return value.flatMap((item: unknown): VoteEvent[] => {
      if (!isObject(item) || typeof item.phone !== "string" || typeof item.date !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(item.date) || typeof item.destinationId !== "string" || !validIds.has(item.destinationId)) return [];
      try {
        const phone = normalizePhone(item.phone);
        const key = `${phone}:${item.date}:${item.destinationId}`;
        if (seen.has(key)) return [];
        seen.add(key);
        return [{ phone, date: item.date, destinationId: item.destinationId }];
      } catch { return []; }
    });
  }
  function savedDaily(phone: string): DailyVoteState | null {
    const value = read(AUTH_STORAGE_KEYS.dailyVotes(phone));
    if (!isObject(value) || typeof value.date !== "string" || !Array.isArray(value.votedIds)) return null;
    const ids = value.votedIds.filter((id: unknown): id is string => typeof id === "string" && validIds.has(id));
    return { date: value.date, votedIds: [...new Set(ids)] };
  }
  function makeSnapshot(): AuthSnapshot {
    const user = session();
    const events = ledger();
    const date = getTodayKey(now());
    const saved = user ? savedDaily(user.phone) : null;
    const todayEvents = user ? events.filter(item => item.phone === user.phone && item.date === date) : [];
    const daily = { date, votedIds: [...new Set([...(saved?.date === date ? saved.votedIds : []), ...todayEvents.map(item => item.destinationId)])] };
    const votedEver = user ? [...new Set([...(saved?.votedIds ?? []), ...events.filter(item => item.phone === user.phone).map(item => item.destinationId)])] : [];
    const legacy = read(AUTH_STORAGE_KEYS.legacyTotals);
    const totals = baseline.map(item => {
      const previous: unknown = Array.isArray(legacy) ? legacy.find((record: unknown) => isObject(record) && (record.id === item.destinationId || record.destinationId === item.destinationId)) : null;
      const imported = isObject(previous) && typeof previous.votes === "number" && Number.isSafeInteger(previous.votes) ? Math.max(item.votes, previous.votes) : item.votes;
      return { ...item, votes: imported + events.filter(event => event.destinationId === item.destinationId).length };
    });
    if (user && (saved?.date !== date || JSON.stringify(saved.votedIds) !== JSON.stringify(daily.votedIds))) write(AUTH_STORAGE_KEYS.dailyVotes(user.phone), daily, false);
    return { user, daily, votedEver, totals, resetAt: getNextResetAt(now()) };
  }
  function createSession(phone: string): Session {
    const value = { phone: normalizePhone(phone), loggedInAt: now() };
    write(AUTH_STORAGE_KEYS.session, value);
    return value;
  }
  return {
    async sendOtp(phone) {
      normalizePhone(phone);
      await new Promise<void>(resolve => setTimeout(resolve, options.sendDelayMs ?? 800));
    },
    async verifyOtp(phone, otp) {
      const normalized = normalizePhone(phone);
      if (otp !== "123456") throw new AuthError("otp", "Mã OTP không đúng");
      return createSession(normalized);
    },
    async verifyAccount(username, password) {
      if (username.trim() !== "nongthon2026" || password !== "Nongthon2026!") throw new AuthError("account", "Tài khoản hoặc mật khẩu không đúng.");
      return createSession("0900002026");
    },
    async getSession() { return session(); },
    async getSnapshot() { return makeSnapshot(); },
    async logout() {
      await exclusive(async () => {
        try { storage()?.removeItem(AUTH_STORAGE_KEYS.session); memory.delete(AUTH_STORAGE_KEYS.session); }
        catch { throw new AuthError("storage", "Chưa thể đăng xuất. Vui lòng thử lại."); }
      });
    },
    async vote(destinationId) {
      return exclusive(async () => {
        const snapshot = makeSnapshot();
        if (!snapshot.user) throw new AuthError("session", "Vui lòng đăng nhập để bình chọn.");
        if (!validIds.has(destinationId)) throw new AuthError("destination", "Không tìm thấy điểm đến này.");
        if (snapshot.daily.votedIds.includes(destinationId) || (!allowRevote && snapshot.votedEver.includes(destinationId))) throw new AuthError("duplicate", allowRevote ? "Bạn đã bình chọn điểm đến này hôm nay." : "Bạn đã bình chọn điểm đến này trước đó.");
        if (snapshot.daily.votedIds.length >= DAILY_VOTE_LIMIT) throw new AuthError("limit", `Bạn đã dùng hết ${DAILY_VOTE_LIMIT} lượt hôm nay.`);
        // One authoritative append commits quota and totals together. Daily keys are rebuildable views.
        const events = ledger();
        events.push({ phone: snapshot.user.phone, date: snapshot.daily.date, destinationId });
        write(AUTH_STORAGE_KEYS.ledger, events);
        write(AUTH_STORAGE_KEYS.dailyVotes(snapshot.user.phone), { date: snapshot.daily.date, votedIds: [...snapshot.daily.votedIds, destinationId] }, false);
        return makeSnapshot();
      });
    },
  };
}
export const authService: AuthService = createMockAuthService();
