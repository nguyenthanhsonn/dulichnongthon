export const VIETNAM_TIME_ZONE = "Asia/Ho_Chi_Minh";
const VIETNAM_UTC_OFFSET_MS = 7 * 60 * 60 * 1000;
const calendar = new Intl.DateTimeFormat("en-CA", {
  timeZone: VIETNAM_TIME_ZONE, year: "numeric", month: "2-digit", day: "2-digit",
});

/** Uses the Vietnam calendar date, independently of the device's local timezone. */
export function getTodayKey(timestamp = Date.now()): string {
  const parts = calendar.formatToParts(new Date(timestamp));
  const part = (type: Intl.DateTimeFormatPartTypes) => parts.find(value => value.type === type)?.value ?? "";
  return `${part("year")}-${part("month")}-${part("day")}`;
}
export function getNextResetAt(timestamp = Date.now()): number {
  const [year, month, day] = getTodayKey(timestamp).split("-").map(Number);
  return Date.UTC(year, month - 1, day + 1) - VIETNAM_UTC_OFFSET_MS;
}
export function getCountdownParts(target: number, now = Date.now()): { h: string; m: string; s: string } {
  const seconds = Math.max(0, Math.ceil((target - now) / 1000));
  const two = (value: number) => String(value).padStart(2, "0");
  return { h: two(Math.floor(seconds / 3600)), m: two(Math.floor(seconds / 60) % 60), s: two(seconds % 60) };
}
export function formatCountdown(target: number, now = Date.now()): string {
  const { h, m, s } = getCountdownParts(target, now);
  return `${h}:${m}:${s}`;
}
// getTodayKey(Date.parse("2026-11-02T16:59:59Z")) === "2026-11-02"
// getTodayKey(Date.parse("2026-11-02T17:00:00Z")) === "2026-11-03"
// getNextResetAt(Date.parse("2026-12-31T16:59:59Z")) === Date.parse("2026-12-31T17:00:00Z")
