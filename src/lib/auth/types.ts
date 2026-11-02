import type { VoteRecord } from "../../data/mock/types";
export interface Session { phone: string; loggedInAt: number; }
export interface DailyVoteState { date: string; votedIds: string[]; }
export interface AuthSnapshot {
  user: Session | null;
  daily: DailyVoteState;
  votedEver: string[];
  totals: VoteRecord[];
  resetAt: number;
}
export interface VoteEvent { phone: string; date: string; destinationId: string; }
export interface AuthService {
  sendOtp(phone: string): Promise<void>;
  verifyOtp(phone: string, otp: string): Promise<Session>;
  verifyAccount(username: string, password: string): Promise<Session>;
  logout(): Promise<void>;
  getSession(): Promise<Session | null>;
  getSnapshot(): Promise<AuthSnapshot>;
  vote(destinationId: string): Promise<AuthSnapshot>;
}
export type AuthErrorCode = "phone" | "otp" | "account" | "session" | "duplicate" | "limit" | "destination" | "storage";
export class AuthError extends Error {
  constructor(public readonly code: AuthErrorCode, message: string) { super(message); this.name = "AuthError"; }
}
