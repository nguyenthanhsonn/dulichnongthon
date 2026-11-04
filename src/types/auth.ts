import type { VoteRecord } from "./mock-destination";

export interface Session { email: string; loggedInAt: number; }

export interface DailyVoteState { date: string; votedIds: string[]; }

export interface AuthSnapshot {
  user: Session | null;
  daily: DailyVoteState;
  votedEver: string[];
  totals: VoteRecord[];
  resetAt: number;
}

export interface VoteEvent {
  email: string;
  date: string;
  destinationId: string;
  timestamp?: number;
  deviceId?: string;
}

export interface AuthService {
  sendOtp(email: string, password: string): Promise<void>;
  verifyOtp(email: string, otp: string): Promise<Session>;
  logout(): Promise<void>;
  getSession(): Promise<Session | null>;
  getSnapshot(): Promise<AuthSnapshot>;
  vote(destinationId: string): Promise<AuthSnapshot>;
}

export type AuthErrorCode = "email" | "otp" | "account" | "session" | "duplicate" | "limit" | "destination" | "storage";

export interface AuthContextValue {
  user: Session | null;
  isLoading: boolean;
  isVoting: boolean;
  loginModalOpen: boolean;
  pendingDestinationId: string | null;
  openLoginModal(destinationId?: string): void;
  closeLoginModal(): void;
  sendOtp(email: string, password: string): Promise<void>;
  verifyOtp(email: string, otp: string): Promise<void>;
  logout(errorToastContainerId?: string): Promise<void>;
  votesUsedToday: number;
  votesLeftToday: number;
  votedIdsToday: string[];
  resetAt: number;
  vote(destinationId: string): Promise<boolean>;
  hasVoted(destinationId: string): boolean;
  totals: AuthSnapshot["totals"];
}

export interface KeyValueStorage { getItem(key: string): string | null; setItem(key: string, value: string): void; removeItem(key: string): void; }

export interface ServiceOptions {
  storage?: () => KeyValueStorage | null;
  now?: () => number;
  sendDelayMs?: number;
  allowRevoteNextDay?: boolean;
}
