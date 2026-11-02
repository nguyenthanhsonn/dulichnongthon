// Compatibility view for existing voting components; all records originate in data/mock or repository.
import { regions, type RankedDestination } from "./mock";
import type { DestinationItem } from "@/lib/destinations/destinationRepository";

export interface Destination {
  id: string;
  code: string;
  name: string;
  province: string;
  region: "north" | "central" | "south";
  regionLabel: "Miền Bắc" | "Miền Trung" | "Miền Nam";
  brief: string;
  votes: number;
  imageUrl: string;
  tags: string[];
  featured?: boolean;
}
const regionCodes = { bac: "north", trung: "central", nam: "south" } as const;
export function toVotingDestination(destination: RankedDestination | DestinationItem): Destination {
  const regionLabel = regions.find(region => region.id === destination.region)?.name ?? "Miền Bắc";
  return {
    id: destination.id, code: destination.id, name: destination.name,
    province: destination.province, region: regionCodes[destination.region],
    regionLabel: regionLabel as Destination["regionLabel"], brief: destination.summary,
    votes: destination.votes, imageUrl: destination.image.src,
    tags: [destination.recordCode, ...destination.highlights],
  };
}

