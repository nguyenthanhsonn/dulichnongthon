"use client";
import { createContext, useContext, useState, type ReactNode } from "react";
import { getRanking } from "@/data/mock";
import { toVotingDestination, type Destination } from "@/data/destinations";
import { AuthProvider, useAuth } from "@/lib/auth/AuthProvider";

export interface UserState { phone: string; votesRemaining: number; votedIds: string[]; }
interface VotingContextType {
  user: UserState | null;
  destinations: Destination[];
  loginModalOpen: boolean;
  setLoginModalOpen(open: boolean): void;
  voteModalDestination: Destination | null;
  setVoteModalDestination(destination: Destination | null): void;
  detailModalDestination: Destination | null;
  setDetailModalDestination(destination: Destination | null): void;
  leaderboardModalOpen: boolean;
  setLeaderboardModalOpen(open: boolean): void;
  rulesModalOpen: boolean;
  setRulesModalOpen(open: boolean): void;
  toastMessage: string | null;
  showToast(message: string): void;
  loginUser(phone: string): void;
  logoutUser(): Promise<void>;
  confirmVote(destinationId: string): Promise<boolean>;
  handleVoteClick(destination: Destination): void;
  totalVotes: number;
}
const VotingContext = createContext<VotingContextType | null>(null);
function VotingBridge({ children }: { children: ReactNode }) {
  const auth = useAuth();
  const destinations = getRanking(auth.totals).map(toVotingDestination);
  const [voteModalDestination, setVoteModalDestination] = useState<Destination | null>(null);
  const [detailModalDestination, setDetailModalDestination] = useState<Destination | null>(null);
  const [leaderboardModalOpen, setLeaderboardModalOpen] = useState(false);
  const [rulesModalOpen, setRulesModalOpen] = useState(false);
  const user = auth.user ? { phone: auth.user.phone, votesRemaining: auth.votesLeftToday, votedIds: auth.votedIdsToday } : null;
  const handleVoteClick = (destination: Destination) => {
    if (!auth.user || auth.hasVoted(destination.id) || auth.votesLeftToday === 0) {
      void auth.vote(destination.id);
      return;
    }
    setVoteModalDestination(destination);
    setLeaderboardModalOpen(false);
  };
  const confirmVote = async (destinationId: string) => {
    const success = await auth.vote(destinationId);
    if (success) setVoteModalDestination(null);
    return success;
  };
  return <VotingContext.Provider value={{
    user, destinations, loginModalOpen: auth.loginModalOpen,
    setLoginModalOpen: open => { if (open) auth.openLoginModal(); else auth.closeLoginModal(); },
    voteModalDestination, setVoteModalDestination,
    detailModalDestination, setDetailModalDestination,
    leaderboardModalOpen, setLeaderboardModalOpen, rulesModalOpen, setRulesModalOpen,
    toastMessage: auth.toastMessage, showToast: auth.showToast,
    loginUser: (phone: string) => { void auth.verifyOtp(phone, "123456").catch(() => {}); },
    logoutUser: auth.logout,
    handleVoteClick, confirmVote, totalVotes: destinations.reduce((sum, destination) => sum + destination.votes, 0),
  }}>{children}</VotingContext.Provider>;
}
export function VotingProvider({ children }: { children: ReactNode }) {
  return <AuthProvider><VotingBridge>{children}</VotingBridge></AuthProvider>;
}
export function useVoting() {
  const value = useContext(VotingContext);
  if (!value) throw new Error("useVoting phải được dùng bên trong VotingProvider.");
  return value;
}
