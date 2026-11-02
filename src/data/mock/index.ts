// Step 1: schema and source data. Selectors and UI migration belong to subsequent steps.
export type { Destination, DestinationCategory, Region, RegionId, VoteRecord } from "./types";
export { destinations } from "./destinations";
export { regions } from "./regions";
export { votes, createMockVotes, sumVotes, MOCK_VOTE_SEED, MOCK_VOTE_TOTAL } from "./votes";
export { contest, contestStats } from "./contest";

import { destinations as sourceDestinations } from "./destinations";
import { votes as baselineVotes } from "./votes";
import type { Destination, VoteRecord } from "./types";
export type RankedDestination = Destination & { votes: number };
/** Runtime vote records override the seeded baseline; equal counts sort by stable id. */
export function getRanking(records: readonly VoteRecord[] = baselineVotes): RankedDestination[] {
  const totals = new Map(baselineVotes.map(record => [record.destinationId, record.votes]));
  for (const record of records) {
    if (Number.isSafeInteger(record.votes) && record.votes >= 0) totals.set(record.destinationId, record.votes);
  }
  return sourceDestinations.map(destination => ({ ...destination, votes: totals.get(destination.id) ?? 0 }))
    .sort((a, b) => b.votes - a.votes || a.id.localeCompare(b.id));
}
