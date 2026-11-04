"use client";

import { create } from "zustand";
import { getRanking } from "@/data/mock";
import type { AuthSnapshot } from "@/types/auth";

interface VotingStore {
  snapshot: AuthSnapshot;
  isVoting: boolean;
  applySnapshot(snapshot: AuthSnapshot): void;
  setIsVoting(isVoting: boolean): void;
}

// Totals, quota and history are replaced together so every view sees the same vote.
export const useVotingStore = create<VotingStore>((set) => ({
  snapshot: {
    user: null,
    daily: { date: "", votedIds: [] },
    votedEver: [],
    totals: getRanking().map(item => ({ destinationId: item.id, votes: item.votes })),
    resetAt: 0,
  },
  isVoting: false,
  applySnapshot: (snapshot) => set({ snapshot }),
  setIsVoting: (isVoting) => set({ isVoting }),
}));
