"use client";

import React from "react";
import Image from "next/image";
import { useVoting } from "@/context/voting-context";
import { X, Trophy, Crown, Award, Medal, CheckCircle2 } from "lucide-react";

export function LeaderboardModal() {
  const { leaderboardModalOpen, setLeaderboardModalOpen, destinations, user, handleVoteClick } = useVoting();

  if (!leaderboardModalOpen) return null;

  const sorted = [...destinations].sort((a, b) => b.votes - a.votes);
  const maxVotes = sorted[0]?.votes || 1;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-md animate-in fade-in duration-200">
      {/* Modal Card Glassmorphism */}
      <div className="relative w-full max-w-3xl max-h-[90vh] rounded-3xl bg-white/80 backdrop-blur-2xl border border-white/90 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25),inset_0_1px_2px_0_rgba(255,255,255,0.95)] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-6 py-5 border-b border-black/5 bg-white/50 backdrop-blur-md flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-[#F5A623]/20 border border-[#F5A623]/30 flex items-center justify-center text-[#F5A623] shadow-xs">
              <Trophy className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-xl font-black text-[#1B2B22]">
                Bảng Xếp Hạng Đầy Đủ (35 Điểm Đến)
              </h3>
              <p className="text-xs text-[#4B5E52] font-medium">
                Cập nhật theo thời gian thực lượt bình chọn hợp lệ
              </p>
            </div>
          </div>

          <button
            onClick={() => setLeaderboardModalOpen(false)}
            className="p-2 rounded-full bg-white/60 hover:bg-white text-[#1B2B22] border border-white/80 shadow-xs backdrop-blur-md transition-all cursor-pointer"
            aria-label="Đóng"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Scrollable list of 35 destinations */}
        <div className="overflow-y-auto p-4 sm:p-6 space-y-3 flex-1">
          {sorted.map((dest, index) => {
            const rank = index + 1;
            const percentage = Math.round((dest.votes / maxVotes) * 100);
            const isVoted = user?.votedIds.includes(dest.id);

            return (
              <div
                key={dest.id}
                className={`p-3.5 rounded-2xl border transition-all flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 ${
                  rank === 1
                    ? "bg-[#F5A623]/15 border-[#F5A623] shadow-xs"
                    : rank === 2 || rank === 3
                    ? "bg-white/80 border-[#7CB342]/40 shadow-2xs"
                    : "bg-white/60 border-white/80 shadow-2xs"
                }`}
              >
                {/* Left: Rank & Info */}
                <div className="flex items-center gap-3.5 min-w-0 flex-1">
                  {/* Rank Badge */}
                  <div className="w-8 flex items-center justify-center shrink-0">
                    {rank === 1 ? (
                      <Crown className="h-6 w-6 text-[#F5A623]" />
                    ) : rank === 2 ? (
                      <Award className="h-6 w-6 text-[#1F6B45]" />
                    ) : rank === 3 ? (
                      <Medal className="h-6 w-6 text-[#7CB342]" />
                    ) : (
                      <span className="font-bold text-sm text-[#4B5E52] font-mono">
                        #{rank}
                      </span>
                    )}
                  </div>

                  {/* Thumbnail */}
                  <div className="relative h-12 w-16 rounded-xl overflow-hidden shrink-0 border border-white shadow-xs">
                    <Image
                      src={dest.imageUrl}
                      alt={dest.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Text details */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-sm text-[#1B2B22] truncate">
                        {dest.name}
                      </h4>
                      <span className="text-[10px] px-1.5 py-0.2 rounded-md bg-[#1F6B45]/10 text-[#1F6B45] font-semibold">
                        {dest.code}
                      </span>
                    </div>
                    <p className="text-xs text-[#4B5E52] font-medium truncate">
                      {dest.province} • {dest.regionLabel}
                    </p>

                    {/* Progress Bar */}
                    <div className="mt-1.5 w-full bg-black/5 rounded-full h-1.5 overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          rank === 1
                            ? "bg-[#F5A623]"
                            : rank <= 3
                            ? "bg-[#7CB342]"
                            : "bg-[#1F6B45]"
                        }`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Right: Vote numbers & button */}
                <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-black/5">
                  <div className="text-left sm:text-right">
                    <span className="text-xs text-[#4B5E52] block leading-none font-medium">
                      Lượt vote
                    </span>
                    <span className="text-sm sm:text-base font-black text-[#1F6B45]">
                      {dest.votes.toLocaleString("vi-VN")}
                    </span>
                  </div>

                  <button
                    onClick={() => handleVoteClick(dest)}
                    disabled={isVoted}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all flex items-center gap-1 cursor-pointer ${
                      isVoted
                        ? "bg-[#7CB342]/15 text-[#1F6B45] border border-[#7CB342]/30 cursor-not-allowed"
                        : "bg-[#F5A623] hover:bg-[#e09318] text-[#1B2B22] shadow-xs"
                    }`}
                  >
                    {isVoted ? (
                      <>
                        <CheckCircle2 className="h-3.5 w-3.5 text-[#1F6B45]" />
                        <span>Đã vote</span>
                      </>
                    ) : (
                      <span>Bình chọn</span>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
