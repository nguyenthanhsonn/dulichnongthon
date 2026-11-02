"use client";

import React from "react";
import Image from "next/image";
import { useVoting } from "@/context/voting-context";
import { Trees, Users, Calendar, Sparkles } from "lucide-react";
import { RevealOnScroll } from "./reveal-on-scroll";

export function StatsGrid() {
  const { totalVotes } = useVoting();

  return (
    <section className="py-20 bg-[#F2F7F4] border-y border-[#1F6B45]/10 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left: Intro paragraph */}
          <div className="lg:col-span-5">
            <RevealOnScroll direction="left" className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1F6B45]/10 text-[#1F6B45] text-xs font-semibold">
                <Sparkles className="h-3.5 w-3.5 text-[#F5A623]" />
                <span>Dấu ấn Nông thôn Việt Nam</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1B2B22] tracking-tight leading-tight">
                Lan tỏa giá trị xanh từ những miền quê
              </h2>

              <p className="text-base text-[#4B5E52] leading-relaxed">
                Mỗi điểm đến tham gia cuộc thi là một câu chuyện sinh động về tình yêu đất mẹ, mô hình sản xuất sinh thái và nỗ lực bảo tồn nếp sống truyền thống. Lá phiếu bình chọn của bạn góp phần khích lệ bà con nông dân và thúc đẩy ngành du lịch nông thôn phát triển bền vững.
              </p>

              <div className="p-4 rounded-2xl bg-white border border-[#1F6B45]/15 shadow-xs flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-[#7CB342]/15 flex items-center justify-center shrink-0">
                  <Users className="h-5 w-5 text-[#1F6B45]" />
                </div>
                <p className="text-xs sm:text-sm text-[#1B2B22] font-medium">
                  Cuộc thi được tổ chức minh bạch, bình chọn mở rộng cho toàn bộ công dân và du khách yêu mến cảnh sắc Việt Nam.
                </p>
              </div>
            </RevealOnScroll>
          </div>

          {/* Right: Signature Checkerboard Grid with staggered scroll animations */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Stat Tile 1: Solid Deep Green */}
              <RevealOnScroll delay={100} direction="up">
                <div className="rounded-2xl bg-[#1F6B45] p-6 text-white flex flex-col justify-between min-h-[170px] shadow-sm hover:-translate-y-1 transition-transform duration-300">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#7CB342]">
                      Quy mô
                    </span>
                    <Trees className="h-5 w-5 text-[#7CB342]" />
                  </div>
                  <div>
                    <div className="text-4xl font-black text-white">35</div>
                    <p className="text-sm text-white/80 font-medium mt-1">
                      Điểm đến bình chọn
                    </p>
                  </div>
                </div>
              </RevealOnScroll>

              {/* Photo Tile 1 */}
              <RevealOnScroll delay={200} direction="up">
                <div className="relative rounded-2xl overflow-hidden min-h-[170px] group shadow-sm hover:-translate-y-1 transition-transform duration-300">
                  <Image
                    src="https://images.unsplash.com/photo-1531747056595-07f6cbbe10ad?auto=format&fit=crop&w=600&q=80"
                    alt="Đồi chè Cầu Đất"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-3 left-4 right-4 text-white">
                    <span className="text-[11px] font-semibold text-[#5BB5E8]">Lâm Đồng</span>
                    <p className="text-xs font-bold truncate">Đồi chè Cầu Đất</p>
                  </div>
                </div>
              </RevealOnScroll>

              {/* Stat Tile 2: Solid Fresh Green */}
              <RevealOnScroll delay={300} direction="up">
                <div className="rounded-2xl bg-[#7CB342] p-6 text-[#1B2B22] flex flex-col justify-between min-h-[170px] shadow-sm hover:-translate-y-1 transition-transform duration-300">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-black/60">
                      Sôi nổi
                    </span>
                    <Users className="h-5 w-5 text-[#1B2B22]" />
                  </div>
                  <div>
                    <div className="text-3xl sm:text-4xl font-black text-[#1B2B22]">
                      {totalVotes.toLocaleString("vi-VN")}
                    </div>
                    <p className="text-sm font-semibold text-black/80 mt-1">
                      Tổng lượt bình chọn
                    </p>
                  </div>
                </div>
              </RevealOnScroll>

              {/* Photo Tile 2 */}
              <RevealOnScroll delay={200} direction="up">
                <div className="relative rounded-2xl overflow-hidden min-h-[170px] group shadow-sm hover:-translate-y-1 transition-transform duration-300">
                  <Image
                    src="https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=600&q=80"
                    alt="Sông nước Bến Tre"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-3 left-4 right-4 text-white">
                    <span className="text-[11px] font-semibold text-[#F5A623]">Bến Tre</span>
                    <p className="text-xs font-bold truncate">Cù lao sông nước</p>
                  </div>
                </div>
              </RevealOnScroll>

              {/* Stat Tile 3: Solid Cream / River Blue Accent */}
              <RevealOnScroll delay={300} direction="up">
                <div className="rounded-2xl bg-white border border-[#1F6B45]/15 p-6 text-[#1B2B22] flex flex-col justify-between min-h-[170px] shadow-sm hover:-translate-y-1 transition-transform duration-300">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#4B5E52]">
                      Thời gian
                    </span>
                    <Calendar className="h-5 w-5 text-[#1F6B45]" />
                  </div>
                  <div>
                    <div className="text-4xl font-black text-[#1F6B45]">18</div>
                    <p className="text-sm text-[#4B5E52] font-medium mt-1">
                      Ngày còn lại của cuộc thi
                    </p>
                  </div>
                </div>
              </RevealOnScroll>

              {/* Photo Tile 3 */}
              <RevealOnScroll delay={400} direction="up">
                <div className="relative rounded-2xl overflow-hidden min-h-[170px] group shadow-sm hover:-translate-y-1 transition-transform duration-300">
                  <Image
                    src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=600&q=80"
                    alt="Rau Trà Quế"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-3 left-4 right-4 text-white">
                    <span className="text-[11px] font-semibold text-[#7CB342]">Quảng Nam</span>
                    <p className="text-xs font-bold truncate">Làng rau Trà Quế</p>
                  </div>
                </div>
              </RevealOnScroll>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
