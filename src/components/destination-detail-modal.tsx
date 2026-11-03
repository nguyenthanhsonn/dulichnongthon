"use client";

import React, { useEffect, useRef, useState, useMemo } from "react";
import { useVoting } from "@/context/voting-context";
import { DestinationImage } from "./destination-image";
import {
  X,
  MapPin,
  Users,
  Sparkles,
  Share2,
  CheckCircle2,
  Heart,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Check,
  Globe,
  Leaf,
  Layers,
  Film,
  ExternalLink,
} from "lucide-react";

function getVimeoEmbedUrl(url?: string): string | null {
  if (!url) return null;
  const match = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (match) {
    return `https://player.vimeo.com/video/${match[1]}?autoplay=0&byline=0&portrait=0&title=0&dnt=1`;
  }
  return null;
}

export function DestinationDetailModal() {
  const {
    detailModalDestination,
    setDetailModalDestination,
    destinations,
    user,
    handleVoteClick,
    showToast,
  } = useVoting();

  const [copied, setCopied] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Khóa scroll trang và dừng Lenis khi mở modal
  useEffect(() => {
    if (!detailModalDestination) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    if (typeof window !== "undefined" && window.__lenis) {
      window.__lenis.stop();
    }
    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      if (typeof window !== "undefined" && window.__lenis) {
        window.__lenis.start();
      }
    };
  }, [detailModalDestination]);

  // Tìm thứ hạng và các bài thi trước/sau
  const { rank, prevDestination, nextDestination } = useMemo(() => {
    if (!detailModalDestination) {
      return { rank: 1, prevDestination: null, nextDestination: null };
    }
    const sorted = [...destinations].sort((a, b) => b.votes - a.votes);
    const index = sorted.findIndex((d) => d.id === detailModalDestination.id);
    const r = index >= 0 ? index + 1 : 1;
    const prev = index > 0 ? sorted[index - 1] : sorted[sorted.length - 1];
    const next = index < sorted.length - 1 ? sorted[index + 1] : sorted[0];
    return { rank: r, prevDestination: prev, nextDestination: next };
  }, [detailModalDestination, destinations]);

  if (!detailModalDestination) return null;

  const dest = detailModalDestination;
  const isVoted = user?.votedIds.includes(dest.id);

  const close = () => setDetailModalDestination(null);

  const handleShare = async () => {
    const url = typeof window !== "undefined" ? `${window.location.origin}/bai-thi/${dest.id}` : "";
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        showToast(`Đã sao chép liên kết bài thi: ${dest.name}`);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch {
      showToast(`Bài thi: ${dest.name} (${dest.recordCode || dest.code})`);
    }
  };

  return (
    <div
      className="destination-detail-overlay fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/65 backdrop-blur-md animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
      }}
      onKeyDown={(e) => {
        if (e.key === "Escape") close();
      }}
    >
      <div
        ref={panelRef}
        data-lenis-prevent
        className="destination-detail-panel relative w-full max-w-5xl xl:max-w-6xl max-h-[95vh] flex flex-col bg-white rounded-3xl border border-[#026E4E]/15 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
        aria-labelledby="detail-modal-title"
      >
        {/* Floating Close Button (Always accessible at top-right of the modal) */}
        <button
          ref={closeButtonRef}
          onClick={close}
          className="absolute top-3.5 right-3.5 sm:top-5 sm:right-5 z-40 p-2.5 rounded-full bg-black/60 hover:bg-black/85 text-white backdrop-blur-md border border-white/25 shadow-lg transition-all cursor-pointer"
          aria-label="Đóng chi tiết bài thi"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Scrollable Body: Contains Cover Header + All Detail Sections */}
        <div className="overflow-y-auto flex-1 text-[#0E382B] bg-[#FAFCFA] focus:outline-none">
          {/* Cover Photo Header (Inside scroll container so scrolling frees up 100% modal height for video) */}
          <div className="relative h-60 sm:h-76 md:h-88 w-full overflow-hidden bg-[#08291D]">
            <DestinationImage
              src={dest.imageUrl}
              alt={dest.name}
              region={dest.region}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-black/20" />

            {/* Top Badges */}
            <div className="absolute top-4 sm:top-5 left-4 sm:left-6 flex flex-wrap items-center gap-1.5 sm:gap-2 z-10 pr-16">
              <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-[11px] font-bold text-white border border-white/20">
                #{rank} TOÀN QUỐC • {dest.recordCode || dest.code}
              </span>
              <span className="px-2.5 py-1 rounded-full bg-[#026E4E]/90 backdrop-blur-md text-[11px] font-bold text-white">
                {dest.regionLabel}
              </span>
            </div>

            {/* Title & Location Banner */}
            <div className="absolute bottom-4 sm:bottom-6 inset-x-4 sm:inset-x-8 text-white space-y-1 sm:space-y-1.5 z-10">
              <div className="flex items-center gap-1.5 text-xs sm:text-sm text-[#00C2FF] font-semibold">
                <MapPin className="h-3.5 w-3.5 shrink-0" />
                <span>{dest.province}</span>
                {dest.operator && (
                  <>
                    <span className="text-white/40">•</span>
                    <span className="truncate text-white/80">{dest.operator}</span>
                  </>
                )}
              </div>
              <h2 id="detail-modal-title" className="text-xl sm:text-3xl font-black text-white tracking-tight leading-tight">
                {dest.name}
              </h2>
              {dest.fullName && dest.fullName !== dest.name && (
                <p className="text-xs sm:text-sm text-white/80 line-clamp-1 italic font-serif">
                  {dest.fullName}
                </p>
              )}
            </div>
          </div>

          {/* Inner Content Sections */}
          <div className="p-4 sm:p-8 space-y-8">
          {/* Section: Giới thiệu & Điểm nổi bật */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#026E4E]">
              <Sparkles className="h-4 w-4" />
              <span>Hồ Sơ Đề Cử & Điểm Nổi Bật</span>
            </div>

            <p className="text-sm sm:text-base text-[#2A4437] leading-relaxed">
              {dest.summary || dest.brief}
            </p>

            {/* Highlights Chips */}
            {dest.highlights && dest.highlights.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-1">
                {dest.highlights.map((h, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-[#026E4E]/15 text-xs font-bold text-[#026E4E] shadow-2xs"
                  >
                    <Check className="h-3 w-3 text-[#FF9F00]" />
                    <span>{h}</span>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Section: Video Giới Thiệu (Nếu có) */}
          {dest.videoUrl && (
            <div className="space-y-3.5 scroll-mt-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#026E4E]">
                  <Film className="h-4 w-4 text-[#026E4E]" />
                  <span>Video Thuyết Minh & Giới Thiệu Bài Thi</span>
                </div>
                <a
                  href={dest.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-[#026E4E] hover:text-[#0E382B] hover:underline inline-flex items-center gap-1.5 cursor-pointer bg-white px-2.5 py-1 rounded-lg border border-[#026E4E]/15 shadow-2xs transition-colors"
                >
                  <span>Mở trên Vimeo</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>

              <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black shadow-xl border border-[#026E4E]/25 group">
                <iframe
                  src={getVimeoEmbedUrl(dest.videoUrl) || ""}
                  className="w-full h-full border-0"
                  title={`Video giới thiệu ${dest.name}`}
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          )}

          {/* Section: Bài viết giới thiệu chi tiết (Nếu có) */}
          {dest.article && (
            <div className="space-y-6 p-6 sm:p-7 rounded-3xl bg-white border border-[#026E4E]/15 shadow-2xs">
              <div className="border-b border-[#026E4E]/10 pb-4">
                <span className="text-[11px] font-bold text-[#026E4E] uppercase tracking-wider block">
                  Hồ sơ bài thi chính thức
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-[#0E382B] mt-1.5 tracking-tight">
                  {dest.article.title}
                </h3>
                <div className="mt-2.5 space-y-1 text-xs sm:text-sm text-[#4B6354]">
                  <p>
                    <strong className="text-[#0E382B]">Địa phương:</strong> Tỉnh {dest.province}
                  </p>
                  <p>
                    <strong className="text-[#0E382B]">Chương trình:</strong> Hội thi “Điểm đến du lịch nông thôn Việt Nam tốt nhất” năm 2026
                  </p>
                </div>
              </div>

              <div className="space-y-5">
                {dest.article.sections.map((sec, idx) => (
                  <div key={idx} className="space-y-2">
                    <h4 className="font-extrabold text-sm sm:text-base text-[#026E4E] flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-[#FF9F00]" />
                      <span>{sec.title}</span>
                    </h4>
                    <p className="text-xs sm:text-sm text-[#2A4437] leading-relaxed pl-4 border-l-2 border-[#026E4E]/15">
                      {sec.content}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section: 4 Trụ Cột Đánh Giá Của Hội Thi */}
          {dest.ratings && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#026E4E]">
                <Layers className="h-4 w-4" />
                <span>Tiêu Chí Đánh Giá Cốt Lõi (Bộ Nông nghiệp & Môi trường)</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* 1. Sản phẩm & OCOP */}
                <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#026E4E]/15 space-y-2 shadow-2xs">
                  <div className="flex items-center gap-2 text-xs font-black text-[#026E4E]">
                    <span className="h-6 w-6 rounded-lg bg-emerald-50 text-[#026E4E] flex items-center justify-center text-xs">
                      🌾
                    </span>
                    <h4>Sản phẩm du lịch & Ẩm thực OCOP</h4>
                  </div>
                  <p className="text-xs sm:text-sm text-[#4B6354] leading-relaxed">
                    {dest.ratings.product}
                  </p>
                </div>

                {/* 2. Cộng đồng & Bản sắc */}
                <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#026E4E]/15 space-y-2 shadow-2xs">
                  <div className="flex items-center gap-2 text-xs font-black text-[#00C2FF]">
                    <span className="h-6 w-6 rounded-lg bg-sky-50 text-[#00C2FF] flex items-center justify-center text-xs">
                      🤝
                    </span>
                    <h4 className="text-[#0E382B]">Sự tham gia cộng đồng & Chia sẻ lợi ích</h4>
                  </div>
                  <p className="text-xs sm:text-sm text-[#4B6354] leading-relaxed">
                    {dest.ratings.community}
                  </p>
                </div>

                {/* 3. Môi trường & Bền vững */}
                <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#026E4E]/15 space-y-2 shadow-2xs">
                  <div className="flex items-center gap-2 text-xs font-black text-[#16A34A]">
                    <span className="h-6 w-6 rounded-lg bg-emerald-50 text-[#16A34A] flex items-center justify-center text-xs">
                      <Leaf className="h-3.5 w-3.5" />
                    </span>
                    <h4 className="text-[#0E382B]">Môi trường sinh thái & Bảo tồn bản sắc</h4>
                  </div>
                  <p className="text-xs sm:text-sm text-[#4B6354] leading-relaxed">
                    {dest.ratings.sustainability}
                  </p>
                </div>

                {/* 4. Chuyển đổi số & Truyền thông */}
                <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#026E4E]/15 space-y-2 shadow-2xs">
                  <div className="flex items-center gap-2 text-xs font-black text-[#FF9F00]">
                    <span className="h-6 w-6 rounded-lg bg-amber-50 text-[#FF9F00] flex items-center justify-center text-xs">
                      <Globe className="h-3.5 w-3.5" />
                    </span>
                    <h4 className="text-[#0E382B]">Chuyển đổi số & Quảng bá đa kênh</h4>
                  </div>
                  <p className="text-xs sm:text-sm text-[#4B6354] leading-relaxed">
                    {dest.ratings.promotion}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Section: Thống kê quy mô làng quê */}
          {dest.stats && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#026E4E]">
                <Users className="h-4 w-4" />
                <span>Quy Mô & Tác Động Kinh Tế - Xã Hội</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {dest.stats.totalHouseholds && (
                  <div className="p-3.5 rounded-2xl bg-white border border-[#026E4E]/12 text-center shadow-2xs">
                    <span className="text-[11px] text-[#4B6354] block">Quy mô cộng đồng</span>
                    <strong className="text-lg sm:text-xl font-black text-[#026E4E]">
                      {dest.stats.totalHouseholds}
                    </strong>
                    <span className="text-[10px] text-[#4B6354] block">hộ dân</span>
                  </div>
                )}

                {dest.stats.tourismHouseholds && (
                  <div className="p-3.5 rounded-2xl bg-white border border-[#026E4E]/12 text-center shadow-2xs">
                    <span className="text-[11px] text-[#4B6354] block">Hộ làm du lịch</span>
                    <strong className="text-lg sm:text-xl font-black text-[#FF9F00]">
                      {dest.stats.tourismHouseholds}
                    </strong>
                    <span className="text-[10px] text-[#4B6354] block">hộ gia đình</span>
                  </div>
                )}

                {dest.stats.tourismWorkers && (
                  <div className="p-3.5 rounded-2xl bg-white border border-[#026E4E]/12 text-center shadow-2xs">
                    <span className="text-[11px] text-[#4B6354] block">Lao động du lịch</span>
                    <strong className="text-lg sm:text-xl font-black text-[#00C2FF]">
                      {dest.stats.tourismWorkers}
                    </strong>
                    <span className="text-[10px] text-[#4B6354] block">người địa phương</span>
                  </div>
                )}

                {dest.stats.foundedYear && (
                  <div className="p-3.5 rounded-2xl bg-white border border-[#026E4E]/12 text-center shadow-2xs">
                    <span className="text-[11px] text-[#4B6354] block">Năm hình thành</span>
                    <strong className="text-lg sm:text-xl font-black text-[#16A34A]">
                      {dest.stats.foundedYear}
                    </strong>
                    <span className="text-[10px] text-[#4B6354] block">khởi đầu mô hình</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Section: Thông tin pháp lý / Đơn vị tổ chức */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#E6F1E8]/70 border border-[#026E4E]/15 space-y-2 text-xs text-[#2A4437]">
            <div className="flex items-center gap-2 font-bold text-[#026E4E]">
              <ShieldCheck className="h-4 w-4" />
              <span>Thông Tin Đơn Vị Đề Cử & Địa Chỉ</span>
            </div>
            <p>
              <strong>Địa chỉ:</strong> {dest.address || dest.province}
            </p>
            {dest.operator && (
              <p>
                <strong>Chủ thể quản lý:</strong> {dest.operator}
              </p>
            )}
            <p className="text-[11px] text-[#4B6354]">
              Hồ sơ thuộc đề án phát triển du lịch nông thôn trong xây dựng nông thôn mới giai đoạn 2021 – 2025.
            </p>
          </div>
        </div>
      </div>

        {/* Sticky Action Footer */}
        <div className="px-4 sm:px-8 py-4 bg-white border-t border-[#026E4E]/12 flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0 shadow-lg">
          {/* Left: Votes count & Ranking */}
          <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-start">
            <div>
              <span className="text-[11px] text-[#4B6354] block font-medium">Lượt bình chọn hợp lệ</span>
              <div className="flex items-baseline gap-1.5">
                <span className="text-xl sm:text-2xl font-black text-[#026E4E]">
                  {dest.votes.toLocaleString("vi-VN")}
                </span>
                <span className="text-xs font-bold text-[#4B6354]">phiếu</span>
              </div>
            </div>

            <div className="h-8 w-px bg-black/10 hidden sm:block" />

            <div className="hidden sm:block">
              <span className="text-[11px] text-[#4B6354] block font-medium">Bảng xếp hạng</span>
              <span className="text-sm font-bold text-[#FF9F00]">Hạng #{rank} Toàn quốc</span>
            </div>
          </div>

          {/* Right: Quick Prev/Next & CTA Vote */}
          <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
            {/* Prev / Next Destination Buttons */}
            {prevDestination && (
              <button
                onClick={() => setDetailModalDestination(prevDestination)}
                className="p-2.5 rounded-xl bg-white hover:bg-emerald-50 text-[#0E382B] border border-[#026E4E]/15 shadow-2xs transition-all cursor-pointer"
                title={`Bài trước: ${prevDestination.name}`}
                aria-label="Bài thi trước"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
            )}

            {nextDestination && (
              <button
                onClick={() => setDetailModalDestination(nextDestination)}
                className="p-2.5 rounded-xl bg-white hover:bg-emerald-50 text-[#0E382B] border border-[#026E4E]/15 shadow-2xs transition-all cursor-pointer"
                title={`Bài tiếp: ${nextDestination.name}`}
                aria-label="Bài thi tiếp theo"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            )}

            {/* Share Button */}
            <button
              onClick={handleShare}
              className="p-2.5 rounded-xl bg-white hover:bg-emerald-50 text-[#0E382B] border border-[#026E4E]/15 shadow-2xs transition-all flex items-center gap-1.5 text-xs font-bold cursor-pointer"
              title="Sao chép liên kết bài thi"
              aria-label="Chia sẻ bài thi"
            >
              {copied ? <Check className="h-4 w-4 text-[#16A34A]" /> : <Share2 className="h-4 w-4 text-[#026E4E]" />}
              <span className="hidden md:inline">{copied ? "Đã chép" : "Chia sẻ"}</span>
            </button>

            {/* Main Vote Button */}
            <button
              onClick={() => handleVoteClick(dest)}
              disabled={isVoted}
              className={`vote-button px-6 py-2.5 rounded-xl text-xs sm:text-sm font-black cursor-pointer shrink-0 ${
                isVoted ? "is-voted" : ""
              }`}
            >
              {isVoted ? (
                <>
                  <CheckCircle2 className="h-4 w-4 text-[#026E4E]" />
                  <span>Đã bình chọn</span>
                </>
              ) : (
                <>
                  <Heart className="h-4 w-4 fill-white/80" />
                  <span>Bình chọn bài thi</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
