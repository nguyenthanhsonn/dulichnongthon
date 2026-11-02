"use client";

import React from "react";
import Image from "next/image";
import { Destination } from "@/data/destinations";
import { useVoting } from "@/context/voting-context";
import { MapPin, CheckCircle2, Heart } from "lucide-react";

interface DestinationCardProps {
  destination: Destination;
  rank: number;
}

export function DestinationCard({ destination, rank }: DestinationCardProps) {
  const { user, handleVoteClick } = useVoting();
  const isVoted = user?.votedIds.includes(destination.id);

  return (
    <div className="group rounded-2xl overflow-hidden bg-white border border-[#1F6B45]/15 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between transform hover:-translate-y-1">
      {/* Top Image with Gradient Overlay */}
      <div className="relative aspect-4/3 w-full overflow-hidden bg-[#EBF5EE]">
        <Image
          src={destination.imageUrl}
          alt={destination.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Dark Gradient Overlay for Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent" />

        {/* Top Badges */}
        <div className="absolute top-2.5 inset-x-2.5 flex items-center justify-between">
          <span className="px-2 py-0.5 rounded-full bg-black/50 backdrop-blur-md text-[10px] font-bold text-white uppercase tracking-wider">
            #{rank} • {destination.code}
          </span>
          <span className="px-2 py-0.5 rounded-full bg-[#1F6B45]/85 backdrop-blur-md text-[10px] font-semibold text-white">
            {destination.regionLabel}
          </span>
        </div>

        {/* Name & Province over Photo */}
        <div className="absolute bottom-2.5 inset-x-3 text-white">
          <div className="flex items-center gap-1 text-[11px] text-[#5BB5E8] font-medium mb-0.5">
            <MapPin className="h-3 w-3 shrink-0" />
            <span className="truncate">{destination.province}</span>
          </div>
          <h3 className="font-bold text-sm sm:text-base leading-snug line-clamp-1 text-white group-hover:text-[#F5A623] transition-colors">
            {destination.name}
          </h3>
        </div>
      </div>

      {/* Card Content & Action */}
      <div className="p-3.5 space-y-3 flex-1 flex flex-col justify-between">
        <p className="text-xs text-[#4B5E52] leading-relaxed line-clamp-2">
          {destination.brief}
        </p>

        {/* Vote count and CTA Button */}
        <div className="pt-2 border-t border-black/5 flex items-center justify-between gap-2">
          <div>
            <span className="text-[10px] text-[#4B5E52] block font-medium">Bình chọn</span>
            <span
              key={destination.votes}
              className="text-sm sm:text-base font-extrabold text-[#1F6B45] inline-block transition-transform duration-300 animate-in zoom-in-95"
            >
              {destination.votes.toLocaleString("vi-VN")}
            </span>
          </div>

          <button
            onClick={() => handleVoteClick(destination)}
            disabled={isVoted}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all duration-200 flex items-center gap-1 cursor-pointer shrink-0 ${
              isVoted
                ? "bg-[#7CB342]/15 text-[#1F6B45] border border-[#7CB342]/30 cursor-not-allowed"
                : "bg-[#F5A623] hover:bg-[#e09318] text-[#1B2B22] shadow-xs hover:shadow"
            }`}
          >
            {isVoted ? (
              <>
                <CheckCircle2 className="h-3.5 w-3.5 text-[#1F6B45]" />
                <span>Đã bình chọn</span>
              </>
            ) : (
              <>
                <Heart className="h-3.5 w-3.5 fill-[#1B2B22]/20" />
                <span>Bình chọn</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
