import { destinations } from "./destinations";
import type { VoteRecord } from "@/types/mock-destination";

export const MOCK_VOTE_SEED = 2026;
export const MOCK_VOTE_TOTAL = 377_230;

/** Pure seeded generator: identical output on server, client and every rebuild. */
export function createMockVotes(ids: readonly string[], seed = MOCK_VOTE_SEED, total = MOCK_VOTE_TOTAL): VoteRecord[] {
  if (ids.length === 0) return [];
  if (new Set(ids).size !== ids.length) throw new Error("Mã điểm đến phải duy nhất.");
  if (!Number.isSafeInteger(total) || total < 0) throw new Error("Tổng phiếu phải là số nguyên không âm.");
  let state = seed >>> 0;
  const random = () => {
    state = (Math.imul(state, 1664525) + 1013904223) >>> 0;
    return state / 4_294_967_296;
  };
  const weights = ids.map((_, index) => index < 3 ? 4.1 - index * .5 + random() * .1 : 1.65 / Math.pow(1 + (index - 3) * .055, .85) + random() * .025);
  const sum = weights.reduce((acc, value) => acc + value, 0);
  const quotas = weights.map(weight => weight / sum * total);
  const counts = quotas.map(Math.floor);
  const remainder = total - counts.reduce((acc, value) => acc + value, 0);
  const order = quotas.map((quota, index) => ({ index, fraction: quota - counts[index] })).sort((a, b) => b.fraction - a.fraction || a.index - b.index);
  for (let i = 0; i < remainder; i++) counts[order[i].index] += 1;
  return ids.map((destinationId, index) => ({ destinationId, votes: counts[index] }));
}
export const votes: VoteRecord[] = createMockVotes(destinations.map(destination => destination.id));
export function sumVotes(records: readonly VoteRecord[] = votes): number {
  return records.reduce((sum, record) => sum + record.votes, 0);
}
