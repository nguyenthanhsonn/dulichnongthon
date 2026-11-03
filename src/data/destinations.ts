// Compatibility view for existing voting components; all records originate in data/mock or repository.
import { regions, type RankedDestination } from "./mock";
import type { DestinationItem } from "@/lib/destinations/destinationRepository";

export interface Destination {
  id: string;
  code: string;
  recordCode?: string;
  name: string;
  title?: string;
  destinationName?: string;
  fullName?: string;
  province: string;
  address?: string;
  region: "north" | "central" | "south";
  regionLabel: "Miền Bắc" | "Miền Trung" | "Miền Nam";
  brief: string;
  summary?: string;
  votes: number;
  imageUrl: string;
  tags: string[];
  category?: string[];
  highlights?: string[];
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
  awards?: string[];
  operator?: string;
  sourceDetails?: string;
  featured?: boolean;
  videoUrl?: string;
  article?: {
    title: string;
    sections: { title: string; content: string }[];
  };
}

const regionCodes = { bac: "north", trung: "central", nam: "south" } as const;

export function toVotingDestination(destination: RankedDestination | DestinationItem): Destination {
  const regionLabel = regions.find(region => region.id === destination.region)?.name ?? "Miền Bắc";
  return {
    id: destination.id,
    code: destination.id,
    recordCode: destination.recordCode,
    name: destination.name,
    title: destination.title,
    destinationName: destination.destinationName,
    fullName: destination.fullName || destination.name,
    province: destination.province,
    address: destination.address,
    region: regionCodes[destination.region],
    regionLabel: regionLabel as Destination["regionLabel"],
    brief: destination.summary,
    summary: destination.summary,
    votes: destination.votes,
    imageUrl: destination.image.src,
    tags: [destination.recordCode, ...destination.highlights],
    category: destination.category,
    highlights: destination.highlights,
    ratings: destination.ratings,
    stats: destination.stats,
    awards: destination.awards,
    operator: destination.operator,
    sourceDetails: destination.sourceDetails,
    videoUrl: destination.videoUrl,
    article: destination.article,
  };
}

