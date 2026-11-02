export * from "./api";

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  role: "user" | "host" | "admin";
  createdAt: string;
}

export interface Destination {
  id: string;
  slug: string;
  title: string;
  description: string;
  location: {
    province: string;
    district: string;
    address: string;
    coordinates?: [number, number];
  };
  thumbnail: string;
  images: string[];
  rating: number;
  reviewCount: number;
  priceFrom: number;
  tags: string[];
  isFeatured?: boolean;
}

export interface Tour {
  id: string;
  slug: string;
  title: string;
  destinationId: string;
  duration: string; // e.g. "2 ngày 1 đêm"
  price: number;
  maxParticipants: number;
  highlights: string[];
  includes: string[];
  excludes: string[];
  itinerary: {
    day: number;
    title: string;
    activities: string[];
  }[];
}
