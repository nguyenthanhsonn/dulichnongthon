export type RegionId = "bac" | "trung" | "nam";
export type DestinationCategory = "cong-dong" | "lang-nghe" | "sinh-thai" | "nong-nghiep" | "cham-soc-suc-khoe";
export interface Destination {
  id: string;
  recordCode: string;
  name: string;
  fullName: string;
  province: string;
  address: string;
  region: RegionId;
  category: DestinationCategory[];
  summary: string;
  highlights: string[];
  ratings: { product: string; community: string; sustainability: string; promotion: string };
  stats: {
    totalHouseholds?: number;
    tourismHouseholds?: number;
    tourismWorkers?: number;
    foundedYear?: number;
    visitors2025?: number;
    visitors9m2026?: number;
    revenue2025?: string;
    revenue9m2026?: string;
    avgIncomeMonthly?: string;
  };
  awards: string[];
  operator?: string;
  image: { src: string; alt: string; credit?: string };
  needsReview?: boolean;
  reviewNote?: string;
  relatedTo?: string[];
  /** Original “Nét khác biệt”; retains ranges, approximations and contradictory source numbers. */
  sourceDetails?: string;
}
export interface VoteRecord { destinationId: string; votes: number; }
export interface Region { id: RegionId; name: string; }
