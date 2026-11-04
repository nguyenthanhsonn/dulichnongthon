"use client";
import type { VotingContextType } from "@/types/voting-context";
import { createContext, useContext, useState, type ReactNode } from "react";
import { getRanking } from "@/data/mock";
import { toVotingDestination } from "@/data/destinations";
import type { Destination } from "@/types/voting-destination";
import { AuthProvider, useAuth } from "@/lib/auth/AuthProvider";

const VotingContext = createContext<VotingContextType | null>(null);
function VotingBridge({ children }: { children: ReactNode }) {
  const auth = useAuth();
  const destinations = getRanking(auth.totals).map(toVotingDestination);
  const [voteModalDestination, setVoteModalDestination] = useState<Destination | null>(null);
  const [leaderboardModalOpen, setLeaderboardModalOpen] = useState(false);
  const [rulesModalOpen, setRulesModalOpen] = useState(false);
  const user = auth.user ? { email: auth.user.email, votesRemaining: auth.votesLeftToday, votedIds: auth.votedIdsToday } : null;
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
    leaderboardModalOpen, setLeaderboardModalOpen, rulesModalOpen, setRulesModalOpen,
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
