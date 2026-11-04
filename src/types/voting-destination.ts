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
