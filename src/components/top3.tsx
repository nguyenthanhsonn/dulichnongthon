"use client";

import React from "react";
import Image from "next/image";
import { useVoting } from "@/context/voting-context";
import { Trophy, Award, Medal, Crown, ArrowRight, CheckCircle2 } from "lucide-react";
import { RevealOnScroll } from "./reveal-on-scroll";

export function Top3Leaderboard() {
  const { destinations, user, handleVoteClick, setLeaderboardModalOpen } = useVoting();

  const sortedDestinations = [...destinations].sort((a, b) => b.votes - a.votes);
  const top3 = sortedDestinations.slice(0, 3);

  return (
    <section id="leaderboard" className="py-20 bg-[#FBF8F0] overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <RevealOnScroll direction="up">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 text-[#F5A623] text-xs sm:text-sm font-bold uppercase tracking-wider">
                <Trophy className="h-4 w-4" />
                <span>Dẫn đầu bình chọn</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1B2B22] tracking-tight">
                Top 3 Điểm Đến Được Yêu Thích Nhất
              </h2>
              <p className="text-sm sm:text-base text-[#4B5E52] max-w-2xl">
                Thứ hạng được cập nhật thời gian thực theo lượt bình chọn hợp lệ từ người dùng trên toàn quốc.
              </p>
            </div>

            <button
              onClick={() => setLeaderboardModalOpen(true)}
              className="inline-flex items-center gap-2 text-sm font-bold text-[#1F6B45] hover:text-[#164e32] transition-colors group cursor-pointer"
            >
              <span>Xem bảng xếp hạng đầy đủ (35 điểm đến)</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1.5 transition-transform duration-200" />
            </button>
          </div>
        </RevealOnScroll>

        {/* 3 Large Cards Grid with Staggered Scroll Animations */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {top3.map((dest, index) => {
            const rank = index + 1;
            const isRank1 = rank === 1;
            const isVoted = user?.votedIds.includes(dest.id);
            const delay = isRank1 ? 0 : rank === 2 ? 150 : 300;

            return (
              <RevealOnScroll key={dest.id} delay={delay} direction="up" className="h-full">
                <div
                  className={`relative h-full rounded-3xl overflow-hidden transition-all duration-300 flex flex-col justify-between ${
                    isRank1
                      ? "bg-gradient-to-b from-white via-white to-[#F5A623]/10 border-2 border-[#F5A623] shadow-xl md:-translate-y-3 z-10 hover:-translate-y-4"
                      : "bg-white border border-[#1F6B45]/15 shadow-md hover:shadow-xl hover:-translate-y-2"
                  }`}
                >
                  {/* Rank Badge Header */}
                  <div
                    className={`px-6 py-3.5 flex items-center justify-between text-xs font-bold ${
                      isRank1
                        ? "bg-[#F5A623] text-[#1B2B22]"
                        : rank === 2
                        ? "bg-[#EBF5EE] text-[#1F6B45]"
                        : "bg-[#F2F7F4] text-[#4B5E52]"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {isRank1 ? (
                        <Crown className="h-4 w-4 text-[#1B2B22]" />
                      ) : rank === 2 ? (
                        <Award className="h-4 w-4 text-[#1F6B45]" />
                      ) : (
                        <Medal className="h-4 w-4 text-[#4B5E52]" />
                      )}
                      <span className="uppercase tracking-wider">
                        {isRank1 ? "Vị trí Quán quân" : `Hạng ${rank}`}
                      </span>
                    </div>
                    <span className="text-[11px] font-semibold opacity-80">{dest.code}</span>
                  </div>

                  {/* Photo with Gradient Overlay */}
                  <div className="relative aspect-4/3 w-full overflow-hidden group">
                    <Image
                      src={dest.imageUrl}
                      alt={dest.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                    
                    {/* Text Over Photo */}
                    <div className="absolute bottom-4 left-5 right-5 text-white">
                      <span className="inline-block px-2.5 py-0.5 rounded-full bg-black/40 backdrop-blur-md text-[11px] font-medium text-[#5BB5E8] mb-1">
                        {dest.province} • {dest.regionLabel}
                      </span>
                      <h3 className="font-extrabold text-xl sm:text-2xl text-white leading-tight">
                        {dest.name}
                      </h3>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6 space-y-5 flex-1 flex flex-col justify-between">
                    <p className="text-sm text-[#4B5E52] leading-relaxed line-clamp-2">
                      {dest.brief}
                    </p>

                    <div className="pt-4 border-t border-black/5 flex items-center justify-between">
                      <div>
                        <span className="text-xs text-[#4B5E52] block font-medium">Lượt bình chọn</span>
                        <span className={`text-2xl font-black ${isRank1 ? "text-[#F5A623]" : "text-[#1F6B45]"}`}>
                          {dest.votes.toLocaleString("vi-VN")}
                        </span>
                      </div>

                      <button
                        onClick={() => handleVoteClick(dest)}
                        disabled={isVoted}
                        className={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all duration-200 flex items-center gap-1.5 cursor-pointer ${
                          isVoted
                            ? "bg-[#7CB342]/15 text-[#1F6B45] border border-[#7CB342]/30 cursor-not-allowed"
                            : isRank1
                            ? "bg-[#F5A623] hover:bg-[#e09318] text-[#1B2B22] shadow-md hover:shadow-lg hover:scale-105"
                            : "bg-[#F5A623] hover:bg-[#e09318] text-[#1B2B22] shadow-sm hover:shadow hover:scale-105"
                        }`}
                      >
                        {isVoted ? (
                          <>
                            <CheckCircle2 className="h-4 w-4 text-[#1F6B45]" />
                            <span>Đã bình chọn</span>
                          </>
                        ) : (
                          <span>Bình chọn</span>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </RevealOnScroll>
            );
          })}
        </div>
      </div>
    </section>
  );
}
