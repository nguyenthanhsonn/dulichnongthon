"use client";

import { useVotingStore } from "@/stores/use-voting-store";

/** Today's history follows the active account and the daily reset automatically. */
export function useVoteHistory() {
  return useVotingStore(state => state.snapshot.daily.votedIds);
}
