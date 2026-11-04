import type { DestinationCategory, RegionId } from "./mock-destination";

export interface DestinationItem {
  id: string; // e.g. "NT-01"
  recordCode: string; // e.g. "DLNT2026-001"
  name: string;
  title?: string;
  destinationName?: string;
  fullName: string;
  province: string;
  address: string;
  region: RegionId;
  category: DestinationCategory[];
  summary: string;
  highlights: string[];
  ratings?: {
    product: string;
    community: string;
    sustainability: string;
    promotion: string;
  };
  stats?: {
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
  sourceDetails?: string;
  videoUrl?: string;
  article?: {
    title: string;
    sections: { title: string; content: string }[];
  };
  votes: number;
  hidden?: boolean;
  deletedAt?: number | null;
  createdAt: number;
  updatedAt: number;
}

export interface CreateDestinationInput {
  name: string;
  fullName?: string;
  province: string;
  address?: string;
  region: RegionId;
  category: DestinationCategory[];
  summary: string;
  highlights: string[];
  operator?: string;
  stats?: DestinationItem["stats"];
  awards?: string[];
  image: { src: string; alt: string; credit?: string };
}

export interface DestinationFilters {
  status?: "all" | "visible" | "hidden" | "deleted";
  search?: string;
  region?: string;
  category?: string;
  includeHidden?: boolean;
  includeDeleted?: boolean;
  sortBy?: "code" | "votes" | "updatedAt" | "name";
  sortOrder?: "asc" | "desc";
}

export interface AdminActivity {
  id: string;
  timestamp: number;
  action: "create" | "update" | "hide" | "show" | "delete" | "restore";
  targetCode: string;
  targetName: string;
  details?: string;
}
