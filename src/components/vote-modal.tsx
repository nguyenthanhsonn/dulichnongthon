"use client";

import React from "react";
import { DestinationImage } from "./destination-image";
import { useVoting } from "@/context/voting-context";
import { X, Heart, AlertCircle, CheckCircle2 } from "lucide-react";

export function VoteModal() {
  const { voteModalDestination, setVoteModalDestination, confirmVote, user, loginModalOpen } = useVoting();

  if (!voteModalDestination || loginModalOpen || !user) return null;

  const votesLeft = user?.votesRemaining || 0;
  const isVoted = user?.votedIds.includes(voteModalDestination.id);

  const handleConfirm = () => {
    confirmVote(voteModalDestination.id);
  };

  return (
    <div className="responsive-modal-overlay fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-md animate-in fade-in duration-200">
      {/* Modal Card Glassmorphism */}
      <div className="responsive-modal-panel relative w-full max-w-md rounded-3xl bg-white/75 backdrop-blur-2xl border border-white/90 p-7 sm:p-9 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25),inset_0_1px_2px_0_rgba(255,255,255,0.95)] space-y-6">
        {/* Close Button Glassmorphic */}
        <button
          onClick={() => setVoteModalDestination(null)}
          className="absolute right-5 top-5 p-2 rounded-full bg-white/60 hover:bg-white text-[#1B2B22] border border-white/80 shadow-xs backdrop-blur-md transition-all cursor-pointer"
          aria-label="Đóng"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header Icon */}
        <div className="text-center space-y-2">
          <div className="mx-auto h-16 w-16 rounded-full bg-[#b8e486]/20 border border-[#F5A623]/30 flex items-center justify-center text-[#F5A623] mb-2 shadow-xs">
            <Heart className="h-8 w-8 fill-[#F5A623]" />
          </div>
          <h3 className="text-2xl font-black text-[#1B2B22] tracking-tight">
            Xác nhận bình chọn
          </h3>
          <p className="text-xs sm:text-sm text-[#4B5E52] font-medium">
            Bạn đang thực hiện quyền bình chọn cho điểm đến du lịch nông thôn
          </p>
        </div>

        {/* Destination Card Preview */}
        <div className="rounded-2xl overflow-hidden bg-white/80 backdrop-blur-md border border-white/90 shadow-xs">
          <div className="relative aspect-video w-full">
            <DestinationImage
          region={voteModalDestination.region}
              src={voteModalDestination.imageUrl}
              alt={voteModalDestination.name}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-3 left-4 right-4 text-white">
              <span className="text-[10px] font-bold text-[#5BB5E8] uppercase tracking-wider">
                {voteModalDestination.code} • {voteModalDestination.province}
              </span>
              <h4 className="font-extrabold text-base leading-tight">
                {voteModalDestination.name}
              </h4>
            </div>
          </div>
          <div className="p-3.5 bg-white/70 flex items-center justify-between text-xs font-semibold text-[#1B2B22]">
            <span className="text-[#4B5E52]">Lượt bình chọn hiện tại:</span>
            <span className="text-[#1F6B45] font-black text-sm">
              {voteModalDestination.votes.toLocaleString("vi-VN")} lượt
            </span>
          </div>
        </div>

        {/* Voting Allowance Notice */}
        {votesLeft > 0 && !isVoted ? (
          <div className="p-3.5 rounded-2xl bg-white/70 backdrop-blur-md border border-white/80 space-y-1 shadow-2xs">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#4B5E52] font-medium">Lượt bình chọn còn lại của bạn:</span>
              <span className="font-black text-[#1F6B45] bg-[#1F6B45]/10 px-2 py-0.5 rounded-full">
                {votesLeft} lượt
              </span>
            </div>
            <p className="text-[11px] text-[#4B5E52]">
              Sau khi xác nhận, bạn sẽ còn <strong>{votesLeft - 1}</strong> lượt bình chọn cho các điểm đến khác.
            </p>
          </div>
        ) : isVoted ? (
          <div className="p-3.5 rounded-2xl bg-amber-50/90 border border-amber-200 flex items-center gap-2.5 text-xs text-amber-800 font-bold">
            <CheckCircle2 className="h-4 w-4 text-amber-600 shrink-0" />
            <span>Bạn đã bình chọn cho điểm đến này rồi. Mỗi điểm đến chỉ được bình chọn 1 lần.</span>
          </div>
        ) : (
          <div className="p-3.5 rounded-2xl bg-rose-50/90 border border-rose-200 flex items-center gap-2.5 text-xs text-rose-800 font-bold">
            <AlertCircle className="h-4 w-4 text-rose-600 shrink-0" />
            <span>Bạn đã sử dụng hết 3/3 lượt bình chọn. Cảm ơn bạn đã tham gia cuộc thi!</span>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={() => setVoteModalDestination(null)}
            className="w-1/3 py-3 rounded-2xl bg-white/75 hover:bg-white text-[#1B2B22] border border-white/80 text-xs sm:text-sm font-bold shadow-xs backdrop-blur-md transition-colors cursor-pointer"
          >
            Hủy
          </button>
          <button
            onClick={handleConfirm}
            disabled={votesLeft <= 0 || isVoted}
            className={`w-2/3 py-3 rounded-2xl font-black text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              votesLeft <= 0 || isVoted
                ? "bg-zinc-200 text-zinc-400 cursor-not-allowed shadow-none"
                : "bg-[#b8e486] hover:bg-[#a4d771] text-[#1B2B22] hover:shadow-lg"
            }`}
          >
            <Heart className="h-4 w-4 fill-current" />
            <span>Xác nhận bình chọn</span>
          </button>
        </div>
      </div>
    </div>
  );
}
