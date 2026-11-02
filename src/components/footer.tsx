"use client";

import React from "react";
import Image from "next/image";
import { useVoting } from "@/context/voting-context";
import { Mail, Phone, MapPin, ShieldCheck, Heart } from "lucide-react";

export function Footer() {
  const { setRulesModalOpen, setLeaderboardModalOpen } = useVoting();

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="campaign-footer bg-bg-deep text-white pt-16 pb-12 border-t border-[#7CB342]/20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Col 1: Logo & Mission */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative h-12 w-12 rounded-full overflow-hidden border-2 border-[#7CB342]/40 shadow-sm">
                <Image
                  src="/logo.png"
                  alt="Logo Cuộc thi Du lịch Nông thôn"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <span className="block font-black text-lg text-white tracking-tight">
                  Du Lịch Nông Thôn
                </span>
                <span className="block text-xs text-[#7CB342] font-semibold">
                  Cuộc thi Bình chọn Toàn quốc 2026
                </span>
              </div>
            </div>

            <p className="text-sm text-white/70 leading-relaxed max-w-sm">
              Tôn vinh các điểm đến du lịch nông nghiệp, sinh thái và văn hóa truyền thống mẫu mực; kết nối cộng đồng gìn giữ cảnh quan thiên nhiên và phát triển kinh tế nông thôn bền vững.
            </p>

            <div className="pt-2 flex items-center gap-2 text-xs text-[#5BB5E8]">
              <ShieldCheck className="h-4 w-4" />
              <span>Hệ thống bình chọn trực tuyến an toàn & minh bạch</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-bold text-sm text-[#7CB342] uppercase tracking-wider">
              Khám phá cuộc thi
            </h4>
            <ul className="space-y-2 text-sm text-white/75">
              <li>
                <button
                  onClick={() => scrollTo("hero")}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Trang chủ
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo("destinations")}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Danh sách 35 điểm đến
                </button>
              </li>
              <li>
                <button
                  onClick={() => setLeaderboardModalOpen(true)}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Bảng xếp hạng trực tuyến
                </button>
              </li>
              <li>
                <button
                  onClick={() => setRulesModalOpen(true)}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Thể lệ & Cơ cấu giải thưởng
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Contact & Organizing Committee */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="font-bold text-sm text-[#7CB342] uppercase tracking-wider">
              Ban Tổ chức Cuộc thi
            </h4>
            <ul className="space-y-3 text-sm text-white/75">
              <li className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 text-[#7CB342] shrink-0 mt-0.5" />
                <span>Số 02 Ngọc Hà, Ba Đình, TP. Hà Nội</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 text-[#7CB342] shrink-0" />
                <span>Hotline: 1900 6868 (8:00 - 18:00 hàng ngày)</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-[#7CB342] shrink-0" />
                <span>Email: bantochuc@dulichnongthon.vn</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright band */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <p>© 2026 Ban Tổ chức Cuộc thi Bình chọn Du Lịch Nông Thôn Việt Nam. Tất cả quyền được bảo lưu.</p>
          <div className="flex items-center gap-1 text-white/60">
            <span>Chung tay vì nông thôn xanh</span>
            <Heart className="h-3.5 w-3.5 text-[#F5A623] fill-current" />
          </div>
        </div>
      </div>
    </footer>
  );
}
