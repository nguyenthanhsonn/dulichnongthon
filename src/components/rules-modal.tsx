"use client";

import React from "react";
import { useVoting } from "@/context/voting-context";
import { X, BookOpen, CheckCircle, ShieldCheck, Calendar, Trophy, Mail } from "lucide-react";

export function RulesModal() {
  const { rulesModalOpen, setRulesModalOpen } = useVoting();

  if (!rulesModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-md animate-in fade-in duration-200">
      {/* Modal Card Glassmorphism */}
      <div className="relative w-full max-w-2xl max-h-[90vh] rounded-3xl bg-white/80 backdrop-blur-2xl border border-white/90 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25),inset_0_1px_2px_0_rgba(255,255,255,0.95)] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-6 py-5 border-b border-black/5 bg-white/50 backdrop-blur-md flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-[#1F6B45]/15 border border-[#1F6B45]/20 flex items-center justify-center text-[#1F6B45] shadow-xs">
              <BookOpen className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-xl font-black text-[#1B2B22]">
                Thể Lệ Cuộc Thi Bình Chọn
              </h3>
              <p className="text-xs text-[#4B5E52] font-medium">
                Quy chế chính thức từ Ban Tổ chức Cuộc thi Du lịch Nông thôn 2026
              </p>
            </div>
          </div>

          <button
            onClick={() => setRulesModalOpen(false)}
            className="p-2 rounded-full bg-white/60 hover:bg-white text-[#1B2B22] border border-white/80 shadow-xs backdrop-blur-md transition-all cursor-pointer"
            aria-label="Đóng"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-6 space-y-6 text-sm text-[#1B2B22] leading-relaxed flex-1">
          {/* Section 1 */}
          <div className="space-y-2">
            <h4 className="font-extrabold text-base text-[#1F6B45] flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              1. Thời gian bình chọn
            </h4>
            <p className="text-[#4B5E52] leading-relaxed">
              Hệ thống bình chọn trực tuyến mở từ <strong>00:00 ngày 15/10/2026</strong> đến <strong>23:59 ngày 20/11/2026</strong>. Kết quả bình chọn sẽ được công bố chính thức tại Lễ Trao giải Du lịch Nông thôn Việt Nam.
            </p>
          </div>

          {/* Section 2 */}
          <div className="space-y-2">
            <h4 className="font-extrabold text-base text-[#1F6B45] flex items-center gap-2">
              <ShieldCheck className="h-4 w-4" />
              2. Quy định tài khoản & Lượt bình chọn
            </h4>
            <ul className="space-y-2 text-[#4B5E52] list-disc list-inside">
              <li>Mỗi người tham gia sử dụng số điện thoại di động chính chủ tại Việt Nam để đăng nhập và xác thực mã OTP.</li>
              <li>Mỗi số điện thoại được cấp <strong>tối đa 3 lượt bình chọn</strong> trong suốt thời gian diễn ra cuộc thi.</li>
              <li>Mỗi lượt bình chọn chỉ được dành cho <strong>1 điểm đến duy nhất</strong> (không được dồn cả 3 lượt cho cùng 1 điểm đến).</li>
              <li>Lượt bình chọn đã xác nhận thành công sẽ không thể thay đổi hoặc thu hồi.</li>
            </ul>
          </div>

          {/* Section 3 */}
          <div className="space-y-2">
            <h4 className="font-extrabold text-base text-[#1F6B45] flex items-center gap-2">
              <Trophy className="h-4 w-4 text-[#F5A623]" />
              3. Cơ cấu giải thưởng & Tôn vinh
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              <div className="p-3.5 rounded-2xl bg-white/75 backdrop-blur-md border border-[#F5A623]/50 shadow-2xs">
                <span className="font-bold text-xs text-[#F5A623] block uppercase tracking-wider">Giải Quán Quân</span>
                <p className="font-black text-sm text-[#1B2B22] mt-0.5">Top 1 Điểm đến</p>
                <p className="text-[11px] text-[#4B5E52] mt-1 font-medium">Bằng khen Bộ NN&PTNT + Cúp vàng danh dự</p>
              </div>
              <div className="p-3.5 rounded-2xl bg-white/75 backdrop-blur-md border border-[#7CB342]/50 shadow-2xs">
                <span className="font-bold text-xs text-[#1F6B45] block uppercase tracking-wider">Giải Ấn Tượng</span>
                <p className="font-black text-sm text-[#1B2B22] mt-0.5">Top 2 & 3</p>
                <p className="text-[11px] text-[#4B5E52] mt-1 font-medium">Kỷ niệm chương + Gói truyền thông du lịch</p>
              </div>
              <div className="p-3.5 rounded-2xl bg-white/75 backdrop-blur-md border border-[#5BB5E8]/50 shadow-2xs">
                <span className="font-bold text-xs text-[#5BB5E8] block uppercase tracking-wider">Giải Khuyến Khích</span>
                <p className="font-black text-sm text-[#1B2B22] mt-0.5">Top 10 Tiêu Biểu</p>
                <p className="text-[11px] text-[#4B5E52] mt-1 font-medium">Chứng nhận Điểm đến Nông thôn Xanh 2026</p>
              </div>
            </div>
          </div>

          {/* Section 4 */}
          <div className="space-y-2">
            <h4 className="font-extrabold text-base text-[#1F6B45] flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              4. Tính minh bạch & Chống gian lận
            </h4>
            <p className="text-[#4B5E52] leading-relaxed">
              Hệ thống áp dụng công nghệ chống gian lận đa tầng, tự động phát hiện và loại bỏ các lượt bình chọn ảo bằng bot hoặc công cụ tự động hóa. Quyết định cuối cùng thuộc về Hội đồng Giám khảo và Ban Tổ chức.
            </p>
          </div>

          {/* Section 5: Support */}
          <div className="p-4 rounded-2xl bg-white/60 backdrop-blur-md border border-white/80 shadow-2xs flex items-center gap-3">
            <Mail className="h-5 w-5 text-[#1F6B45] shrink-0" />
            <div className="text-xs text-[#4B5E52]">
              Mọi thắc mắc và đóng góp ý kiến vui lòng liên hệ Ban Thư ký Cuộc thi qua email:{" "}
              <a href="mailto:bantochuc@dulichnongthon.vn" className="font-bold text-[#1F6B45] hover:underline">
                bantochuc@dulichnongthon.vn
              </a>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-white/50 backdrop-blur-md border-t border-black/5 text-center">
          <button
            onClick={() => setRulesModalOpen(false)}
            className="px-7 py-2.5 rounded-full bg-[#1F6B45] hover:bg-[#164e32] text-white text-xs font-bold transition-all shadow-md cursor-pointer"
          >
            Đã hiểu thể lệ
          </button>
        </div>
      </div>
    </div>
  );
}
