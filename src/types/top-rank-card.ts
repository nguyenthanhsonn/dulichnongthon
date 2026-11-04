import type { RankedDestination } from "./mock-destination";

export type TopRank = 1 | 2 | 3;

export interface TopRankCardProps { rank: TopRank; destination: RankedDestination; delay: number; play: boolean; }
