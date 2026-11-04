export const DAILY_VOTE_LIMIT = 3;
export const ALLOW_REVOTE_NEXT_DAY = true;
export const OTP_RESEND_SECONDS = 60;
export const DEMO_ACCOUNT = {
  email: "demo@dulichnongthon.vn",
} as const;
export const AUTH_STORAGE_KEYS = {
  session: "dlnt2026:session",
  dailyVotes: (email: string) => `dlnt2026:daily-votes:${email}`,
  ledger: "dlnt2026:vote-ledger",
  legacyTotals: "dlnt2026:votes",
} as const;
