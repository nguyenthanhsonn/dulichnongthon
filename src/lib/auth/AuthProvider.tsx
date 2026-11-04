"use client";
import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { toast } from "react-toastify";
import { getRanking } from "@/data/mock";
import { formatCountdown, getNextResetAt, getTodayKey } from "@/lib/time";
import { authService } from "./authService";
import { ALLOW_REVOTE_NEXT_DAY, DAILY_VOTE_LIMIT } from "./config";
import { AuthError } from "./auth-error";
import type { AuthContextValue, AuthSnapshot, Session } from "@/types/auth";

const AuthContext = createContext<AuthContextValue | null>(null);
const baseline = getRanking().map(item => ({ destinationId: item.id, votes: item.votes }));
const initialSnapshot: AuthSnapshot = { user: null, daily: { date: "", votedIds: [] }, votedEver: [], totals: baseline, resetAt: 0 };

export function AuthProvider({ children }: { children: ReactNode }) {
  const [snapshot, setSnapshot] = useState<AuthSnapshot>(initialSnapshot);
  const snapshotRef = useRef(snapshot);
  const [isLoading, setIsLoading] = useState(true);
  const [isVoting, setIsVoting] = useState(false);
  const voting = useRef(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [pendingDestinationId, setPendingDestinationId] = useState<string | null>(null);
  const pending = useRef<string | null>(null);
  const refreshSequence = useRef(0);
  const alive = useRef(true);
  const apply = useCallback((value: AuthSnapshot) => {
    if (!alive.current) return;
    snapshotRef.current = value;
    setSnapshot(value);
  }, []);
  const refresh = useCallback(async () => {
    const sequence = ++refreshSequence.current;
    const value = await authService.getSnapshot();
    if (alive.current && sequence === refreshSequence.current) { apply(value); setIsLoading(false); }
  }, [apply]);
  useEffect(() => {
    alive.current = true;
    void refresh();
    const onStorage = (event: StorageEvent) => { if (event.key === null || event.key.startsWith("dlnt2026:")) void refresh(); };
    const onVisible = () => { if (document.visibilityState === "visible") void refresh(); };
    window.addEventListener("storage", onStorage);
    window.addEventListener("focus", onVisible);
    document.addEventListener("visibilitychange", onVisible);
    return () => {
      alive.current = false;
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("focus", onVisible);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, [refresh]);
  useEffect(() => {
    if (!snapshot.resetAt) return;
    const timer = window.setTimeout(() => void refresh(), Math.max(20, snapshot.resetAt - Date.now() + 20));
    // Also catches clock changes and a computer resuming across midnight.
    const interval = window.setInterval(() => {
      if (getTodayKey() !== snapshotRef.current.daily.date) void refresh();
    }, 1000);
    return () => { window.clearTimeout(timer); window.clearInterval(interval); };
  }, [snapshot.resetAt, refresh]);
  const openLoginModal = useCallback((destinationId?: string) => {
    pending.current = destinationId ?? null;
    setPendingDestinationId(pending.current);
    setLoginModalOpen(true);
  }, []);
  const closeLoginModal = useCallback(() => {
    pending.current = null;
    setPendingDestinationId(null);
    setLoginModalOpen(false);
  }, []);
  const performVote = useCallback(async (destinationId: string): Promise<boolean> => {
    if (voting.current) return false;
    voting.current = true;
    setIsVoting(true);
    try {
      const previous = await authService.getSnapshot();
      if (!previous.user) { apply(previous); openLoginModal(destinationId); return false; }
      if (previous.daily.votedIds.includes(destinationId) || (!ALLOW_REVOTE_NEXT_DAY && previous.votedEver.includes(destinationId))) throw new AuthError("duplicate", "Bạn đã bình chọn điểm đến này hôm nay.");
      if (previous.daily.votedIds.length >= DAILY_VOTE_LIMIT) throw new AuthError("limit", "Hết lượt bình chọn hôm nay.");
      if (!previous.totals.some(record => record.destinationId === destinationId)) throw new AuthError("destination", "Không tìm thấy điểm đến này.");
      ++refreshSequence.current;
      apply({
        ...previous,
        daily: { ...previous.daily, votedIds: [...previous.daily.votedIds, destinationId] },
        votedEver: [...new Set([...previous.votedEver, destinationId])],
        totals: previous.totals.map(record => record.destinationId === destinationId ? { ...record, votes: record.votes + 1 } : record),
      });
      const committed = await authService.vote(destinationId);
      apply(committed);
      const name = getRanking().find(destination => destination.id === destinationId)?.name ?? "điểm đến";
      toast.success(`Bình chọn thành công cho ${name}. Bạn còn ${Math.max(0, DAILY_VOTE_LIMIT - committed.daily.votedIds.length)} lượt hôm nay.`);
      return true;
    } catch (error) {
      await refresh();
      if (error instanceof AuthError && error.code === "limit") toast.error(`Bạn đã dùng hết ${DAILY_VOTE_LIMIT} lượt hôm nay. Lượt mới sau ${formatCountdown(getNextResetAt())}`);
      else toast.error(error instanceof Error ? error.message : "Chưa thể bình chọn. Vui lòng thử lại.");
      return false;
    } finally {
      voting.current = false;
      if (alive.current) setIsVoting(false);
    }
  }, [apply, openLoginModal, refresh]);
  const vote = useCallback(async (destinationId: string) => {
    if (isLoading) { toast.info("Đang tải tài khoản. Vui lòng thử lại sau giây lát."); return false; }
    if (!snapshotRef.current.user) { openLoginModal(destinationId); return false; }
    return performVote(destinationId);
  }, [isLoading, openLoginModal, performVote]);
  const finishLogin = useCallback(async () => {
    ++refreshSequence.current;
    apply(await authService.getSnapshot());
    const waiting = pending.current;
    pending.current = null;
    setPendingDestinationId(null);
    setLoginModalOpen(false);
    toast.success("Đăng nhập thành công");
    if (waiting) await performVote(waiting);
  }, [apply, performVote]);
  const completeLogin = useCallback(async (authenticate: () => Promise<Session>) => {
    try {
      await authenticate();
      await finishLogin();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Đăng nhập thất bại. Vui lòng thử lại.");
      throw error;
    }
  }, [finishLogin]);
  const verifyOtp = useCallback((phone: string, otp: string) =>
    completeLogin(() => authService.verifyOtp(phone, otp)), [completeLogin]);
  const loginWithAccount = useCallback((username: string, password: string) =>
    completeLogin(() => authService.verifyAccount(username, password)), [completeLogin]);
  const logout = useCallback(async (errorToastContainerId?: string) => {
    try {
      await authService.logout();
      closeLoginModal();
      await refresh();
      toast.success("Đã đăng xuất thành công.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Chưa thể đăng xuất.", { containerId: errorToastContainerId });
    }
  }, [closeLoginModal, refresh]);
  const votesUsedToday = snapshot.daily.votedIds.length;
  return <AuthContext.Provider value={{
    user: snapshot.user, isLoading, isVoting, loginModalOpen, pendingDestinationId,
    openLoginModal, closeLoginModal, sendOtp: authService.sendOtp, verifyOtp, loginWithAccount, logout,
    votesUsedToday, votesLeftToday: Math.max(0, DAILY_VOTE_LIMIT - votesUsedToday),
    votedIdsToday: snapshot.daily.votedIds, resetAt: snapshot.resetAt,
    vote, hasVoted: destinationId => snapshot.daily.votedIds.includes(destinationId) || (!ALLOW_REVOTE_NEXT_DAY && snapshot.votedEver.includes(destinationId)),
    totals: snapshot.totals,
  }}>{children}</AuthContext.Provider>;
}
export function useAuth() {
  const value = useContext(AuthContext);
  if (!value) throw new Error("useAuth phải được dùng bên trong AuthProvider.");
  return value;
}
