import Link from "next/link";
import Image from "next/image";
import { Destination } from "@/types";
import { formatCurrency } from "@/lib/utils";
import { MapPin, Star } from "lucide-react";

interface DestinationCardProps {
  destination: Destination;
}

export function DestinationCard({ destination }: DestinationCardProps) {
  return (
    <div className="group rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 transition-all hover:shadow-md">
      <div className="relative aspect-video w-full overflow-hidden bg-zinc-100 dark:bg-zinc-800">
        <Image
          src={destination.thumbnail}
          alt={destination.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          unoptimized
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-2.5 right-2.5 flex items-center gap-1 rounded-full bg-black/60 px-2 py-0.5 text-xs font-medium text-white backdrop-blur-xs">
          <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
          <span>{destination.rating.toFixed(1)}</span>
        </div>
      </div>

      <div className="p-4 space-y-2">
        <div className="flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400">
          <MapPin className="h-3.5 w-3.5 text-emerald-600" />
          <span>{destination.location.province}</span>
        </div>

        <h3 className="font-semibold text-base line-clamp-1 group-hover:text-emerald-600 transition-colors">
          <Link href={`/destinations/${destination.slug}`}>
            {destination.title}
          </Link>
        </h3>

        <p className="text-xs text-zinc-600 dark:text-zinc-400 line-clamp-2">
          {destination.description}
        </p>

        <div className="pt-2 flex items-center justify-between border-t border-zinc-100 dark:border-zinc-800">
          <span className="text-xs text-zinc-500">Giá từ</span>
          <span className="font-semibold text-emerald-600">
            {formatCurrency(destination.priceFrom)}
          </span>
        </div>
      </div>
    </div>
  );
}
