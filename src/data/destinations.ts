// Compatibility view for existing voting components; all records originate in data/mock or repository.
import { regions } from "./mock";
import type { RankedDestination } from "@/types/mock-destination";
import type { DestinationItem } from "@/types/destination-repository";
import type { Destination } from "@/types/voting-destination";

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
