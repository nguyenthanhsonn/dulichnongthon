"use client";

import { useEffect, useRef, useState } from "react";
import {
  Award,
  BookOpen,
  CalendarDays,
  Check,
  CheckCircle2,
  Flame,
  Globe,
  HelpCircle,
  Info,
  Mail,
  PieChart,
  Share2,
  ShieldAlert,
  ShieldCheck,
  Trophy,
  X,
} from "lucide-react";
import { useVoting } from "@/context/voting-context";

type ActiveTab = "overview" | "awards" | "weight" | "steps" | "validity";

export function RulesModal() {
  const { rulesModalOpen, setRulesModalOpen } = useVoting();
  const [activeTab, setActiveTab] = useState<ActiveTab>("overview");
  const panel = useRef<HTMLDivElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!rulesModalOpen) return;
    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    if (typeof window !== "undefined" && window.__lenis) {
      window.__lenis.stop();
    }
    closeButton.current?.focus();
    return () => {
      document.body.style.overflow = previousOverflow;
      if (typeof window !== "undefined" && window.__lenis) {
        window.__lenis.start();
      }
      previousFocus?.focus();
    };
  }, [rulesModalOpen]);

  if (!rulesModalOpen) return null;
  const close = () => setRulesModalOpen(false);

  return (
    <div
      className="rules-overlay fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-md animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
      }}
      onKeyDown={(e) => {
        if (e.key === "Escape") close();
      }}
    >
      <div
        ref={panel}
        data-lenis-prevent
        className="rules-panel relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-white rounded-3xl border border-[#026E4E]/15 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
        aria-labelledby="rules-title"
      >
        {/* Modal Header */}
        <header className="px-6 py-5 bg-[#08291D] text-white flex items-center justify-between gap-4 border-b border-white/10 shrink-0">
          <div className="flex items-center gap-3.5 min-w-0">
            <div className="h-11 w-11 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center text-[#FF9F00] shrink-0">
              <BookOpen className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <span className="block text-[10px] font-bold tracking-widest text-[#A7F3D0] uppercase">
                BỘ NÔNG NGHIỆP VÀ MÔI TRƯỜNG • BAN TỔ CHỨC HỘI THI
              </span>
              <h2 id="rules-title" className="text-lg sm:text-xl font-black text-white truncate">
                Thể Lệ & Quy Chế Bình Chọn Chính Thức 2026
              </h2>
            </div>
          </div>
          <button
            ref={closeButton}
            onClick={close}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer shrink-0"
            aria-label="Đóng thể lệ"
          >
            <X className="h-5 w-5" />
          </button>
        </header>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 px-6 py-3 bg-[#F4FAF6] border-b border-[#026E4E]/10 overflow-x-auto text-xs font-bold scrollbar-none shrink-0">
          <button
            onClick={() => setActiveTab("overview")}
            className={`px-3.5 py-1.5 rounded-full transition-all shrink-0 cursor-pointer ${
              activeTab === "overview"
                ? "bg-[#026E4E] text-white shadow-xs"
                : "bg-white text-[#4B6354] hover:text-[#0E382B] border border-[#026E4E]/10"
            }`}
          >
            Tóm tắt cốt lõi
          </button>
          <button
            onClick={() => setActiveTab("awards")}
            className={`px-3.5 py-1.5 rounded-full transition-all shrink-0 cursor-pointer ${
              activeTab === "awards"
                ? "bg-[#026E4E] text-white shadow-xs"
                : "bg-white text-[#4B6354] hover:text-[#0E382B] border border-[#026E4E]/10"
            }`}
          >
            Giải thưởng (Điều 10)
          </button>
          <button
            onClick={() => setActiveTab("weight")}
            className={`px-3.5 py-1.5 rounded-full transition-all shrink-0 cursor-pointer ${
              activeTab === "weight"
                ? "bg-[#026E4E] text-white shadow-xs"
                : "bg-white text-[#4B6354] hover:text-[#0E382B] border border-[#026E4E]/10"
            }`}
          >
            Cơ cấu 80% - 10% - 10%
          </button>
          <button
            onClick={() => setActiveTab("steps")}
            className={`px-3.5 py-1.5 rounded-full transition-all shrink-0 cursor-pointer ${
              activeTab === "steps"
                ? "bg-[#026E4E] text-white shadow-xs"
                : "bg-white text-[#4B6354] hover:text-[#0E382B] border border-[#026E4E]/10"
            }`}
          >
            Quy trình 5 bước
          </button>
          <button
            onClick={() => setActiveTab("validity")}
            className={`px-3.5 py-1.5 rounded-full transition-all shrink-0 cursor-pointer ${
              activeTab === "validity"
                ? "bg-[#026E4E] text-white shadow-xs"
                : "bg-white text-[#4B6354] hover:text-[#0E382B] border border-[#026E4E]/10"
            }`}
          >
            Tiêu chuẩn hợp lệ
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-[#0E382B] text-sm leading-relaxed">
          {/* TAB 1: OVERVIEW */}
          {activeTab === "overview" && (
            <div className="space-y-6 animate-in fade-in duration-150">
              {/* Highlight summary cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-50 to-emerald-100/40 border border-emerald-200/80 text-center">
                  <span className="block text-3xl font-black text-[#026E4E]">80%</span>
                  <span className="text-xs font-bold text-[#0E382B] mt-1 block">Landing Page</span>
                  <span className="text-[10px] text-[#4B6354]">Bình chọn OTP chính thức</span>
                </div>
                <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100/40 border border-blue-200/80 text-center">
                  <span className="block text-3xl font-black text-[#00C2FF]">10%</span>
                  <span className="text-xs font-bold text-[#0E382B] mt-1 block">Fanpage FB</span>
                  <span className="text-[10px] text-[#4B6354]">Like + Share (×2)</span>
                </div>
                <div className="p-4 rounded-2xl bg-gradient-to-br from-rose-50 to-rose-100/40 border border-rose-200/80 text-center">
                  <span className="block text-3xl font-black text-rose-500">10%</span>
                  <span className="text-xs font-bold text-[#0E382B] mt-1 block">TikTok</span>
                  <span className="text-[10px] text-[#4B6354]">Tim + Share (×2)</span>
                </div>
                <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-50 to-amber-100/40 border border-amber-200/80 text-center">
                  <span className="block text-3xl font-black text-[#FF9F00]">03</span>
                  <span className="text-xs font-bold text-[#0E382B] mt-1 block">Lượt vote / SĐT</span>
                  <span className="text-[10px] text-[#4B6354]">Không trùng lặp 1 điểm đến</span>
                </div>
              </div>

              {/* Contest Duration Card */}
              <div className="p-5 rounded-2xl bg-[#F8FCF9] border border-[#026E4E]/15 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-[#026E4E]/10 flex items-center justify-center text-[#026E4E] shrink-0">
                    <CalendarDays className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-[#0E382B]">Thời gian bình chọn chính thức</h4>
                    <p className="text-xs text-[#4B6354]">Áp dụng đồng bộ trên toàn bộ các kênh truyền thông</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-xs sm:text-sm font-black bg-white px-4 py-2.5 rounded-xl border border-[#026E4E]/15 shadow-2xs">
                  <span className="text-[#026E4E]">00:00 · 05/11/2026</span>
                  <span className="text-[#4B6354]">đến</span>
                  <span className="text-[#FF9F00]">23:59 · 20/11/2026</span>
                </div>
              </div>

              {/* Core Purpose & Philosophy */}
              <div className="space-y-3">
                <h4 className="font-black text-base text-[#0E382B] flex items-center gap-2">
                  <Info className="h-4 w-4 text-[#026E4E]" />
                  <span>Mục đích & Ý nghĩa cuộc thi</span>
                </h4>
                <p className="text-sm text-[#4B6354] leading-relaxed">
                  Hội thi <strong>“Điểm đến du lịch nông thôn Việt Nam tốt nhất” năm 2026</strong> do Ban Tổ chức Hội thi (Bộ Nông nghiệp và Môi trường) chủ trì tổ chức, nhằm tôn vinh 35 điểm đến du lịch nông nghiệp, sinh thái tiêu biểu; đồng thời kết nối cộng đồng gìn giữ cảnh quan thiên nhiên và thúc đẩy kinh tế nông thôn bền vững.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="p-3.5 rounded-xl bg-white border border-[#026E4E]/10 shadow-2xs space-y-1">
                    <span className="text-xs font-bold text-[#026E4E] flex items-center gap-1.5">
                      <Check className="h-4 w-4" /> Cổng bình chọn duy nhất
                    </span>
                    <p className="text-xs text-[#4B6354]">
                      Landing Page là cổng ghi nhận kết quả chính thức; mọi lượt vote đều xác thực qua mã OTP minh bạch.
                    </p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white border border-[#026E4E]/10 shadow-2xs space-y-1">
                    <span className="text-xs font-bold text-[#FF9F00] flex items-center gap-1.5">
                      <Share2 className="h-4 w-4" /> Lan tỏa mạng xã hội
                    </span>
                    <p className="text-xs text-[#4B6354]">
                      20% tỷ trọng dành cho Facebook & TikTok khuyến khích các địa phương lan tỏa tự nhiên hình ảnh nông thôn.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB: AWARDS (ĐIỀU 10. GIẢI THƯỞNG & BAN TỔ CHỨC) */}
          {activeTab === "awards" && (
            <div className="space-y-6 animate-in fade-in duration-150">
              {/* Ban Tổ Chức Badge */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-[#08291D] to-[#0E382B] text-white border border-[#026E4E]/30 space-y-2 text-center">
                <span className="text-xs font-bold tracking-widest text-[#A7F3D0] uppercase">
                  BỘ NÔNG NGHIỆP VÀ MÔI TRƯỜNG
                </span>
                <h4 className="text-base sm:text-lg font-black tracking-tight text-white">
                  BAN TỔ CHỨC HỘI THI &quot;ĐIỂM ĐẾN DU LỊCH NÔNG THÔN VIỆT NAM TỐT NHẤT&quot; NĂM 2026
                </h4>
              </div>

              {/* Title & Scope */}
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs sm:text-sm text-emerald-950 flex items-start gap-3">
                <Trophy className="h-5 w-5 text-[#026E4E] shrink-0 mt-0.5" />
                <div>
                  <strong className="block font-bold text-sm">Điều 10. Giải thưởng</strong>
                  <p className="mt-0.5 text-xs text-[#0E382B]/80 leading-relaxed">
                    &quot;Điểm đến du lịch nông thôn&quot; được trao giải thưởng sẽ được nhận đầy đủ quyền lợi, biểu trưng và giải thưởng tiền mặt theo quy định của Ban Tổ chức:
                  </p>
                </div>
              </div>

              {/* 2 Cash Prize Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-[#FF9F00] shadow-sm space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-full bg-[#FF9F00] text-white text-[11px] font-extrabold uppercase">
                      Hạng mục cao nhất
                    </span>
                    <Trophy className="h-6 w-6 text-[#FF9F00]" />
                  </div>
                  <div>
                    <h5 className="font-black text-sm text-[#0E382B]">
                      Giải thưởng &quot;Điểm đến du lịch nông thôn Việt Nam tốt nhất&quot;
                    </h5>
                    <div className="mt-2 text-2xl font-black text-[#D97706]">
                      20.000.000 VNĐ
                      <span className="text-xs font-semibold text-[#4B6354] ml-1">/ giải</span>
                    </div>
                  </div>
                  <p className="text-xs text-[#4B6354]">
                    Trao cho điểm đến đạt kết quả tổng hợp xuất sắc nhất từ bình chọn Landing Page (80%) và tương tác mạng xã hội (20%).
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 border-2 border-[#026E4E] shadow-sm space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-full bg-[#026E4E] text-white text-[11px] font-extrabold uppercase">
                      Bình chọn cộng đồng
                    </span>
                    <Award className="h-6 w-6 text-[#026E4E]" />
                  </div>
                  <div>
                    <h5 className="font-black text-sm text-[#0E382B]">
                      Giải thưởng &quot;Điểm đến du lịch nông thôn Việt Nam được cộng đồng bình chọn&quot;
                    </h5>
                    <div className="mt-2 text-2xl font-black text-[#026E4E]">
                      10.000.000 VNĐ
                      <span className="text-xs font-semibold text-[#4B6354] ml-1">/ giải</span>
                    </div>
                  </div>
                  <p className="text-xs text-[#4B6354]">
                    Trao cho điểm đến có số lượt bình chọn trực tuyến và tình cảm yêu mến cao nhất từ cộng đồng người dân trên toàn quốc.
                  </p>
                </div>
              </div>

              {/* Detailed 4 Points from Điều 10 */}
              <div className="p-5 rounded-2xl bg-white border border-[#026E4E]/15 shadow-2xs space-y-4">
                <h5 className="font-black text-sm text-[#0E382B]">
                  Chi tiết 4 quyền lợi trao cho &quot;Điểm đến du lịch nông thôn&quot; được trao giải thưởng:
                </h5>
                <ol className="space-y-3 text-xs sm:text-sm text-[#4B6354]">
                  <li className="flex items-start gap-2.5">
                    <span className="h-5 w-5 rounded-full bg-[#026E4E]/10 text-[#026E4E] font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                      1
                    </span>
                    <span><strong>Giấy chứng nhận</strong> của Ban Tổ chức.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="h-5 w-5 rounded-full bg-[#026E4E]/10 text-[#026E4E] font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                      2
                    </span>
                    <span><strong>Biểu trưng</strong> Hội thi.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="h-5 w-5 rounded-full bg-[#026E4E]/10 text-[#026E4E] font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                      3
                    </span>
                    <div>
                      <strong>Giải thưởng bằng tiền mặt theo quy định, gồm:</strong>
                      <ul className="mt-1 space-y-1 list-disc list-inside pl-2">
                        <li>a) Giải thưởng <em>&quot;Điểm đến du lịch nông thôn Việt Nam tốt nhất&quot;</em>: <strong>20 triệu đồng/giải</strong>.</li>
                        <li>b) Giải thưởng <em>&quot;Điểm đến du lịch nông thôn Việt Nam được cộng đồng bình chọn&quot;</em>: <strong>10 triệu đồng/giải</strong>.</li>
                      </ul>
                    </div>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="h-5 w-5 rounded-full bg-[#026E4E]/10 text-[#026E4E] font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                      4
                    </span>
                    <span>
                      <strong>Quyền được sử dụng giải thưởng</strong> trong các hoạt động quảng bá, giới thiệu về &quot;Điểm đến du lịch nông thôn&quot;; được quảng bá, giới thiệu trên hệ thống truyền thông của Ban Tổ chức; được ưu tiên tham gia các hoạt động quảng bá, xúc tiến du lịch do các cơ quan quản lý nhà nước tổ chức.
                    </span>
                  </li>
                </ol>
              </div>
            </div>
          )}

          {/* TAB 2: WEIGHTING & CALCULATION */}
          {activeTab === "weight" && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 text-xs sm:text-sm text-amber-950 flex items-start gap-3">
                <PieChart className="h-5 w-5 text-[#FF9F00] shrink-0 mt-0.5" />
                <div>
                  <strong className="block font-bold">Phương thức ghi nhận & tính kết quả bình chọn</strong>
                  <span>
                    Xây dựng cơ chế vừa bảo đảm tính công bằng hiển thị trực tiếp 24/7 qua Landing Page (80%), vừa khuyến khích lan tỏa nội dung tự nhiên qua Fanpage (10%) và TikTok (10%).
                  </span>
                </div>
              </div>

              {/* Weight table */}
              <div className="overflow-hidden rounded-2xl border border-[#026E4E]/15 shadow-2xs">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-[#08291D] text-white">
                    <tr>
                      <th className="py-3 px-4 font-bold">Kênh ghi nhận</th>
                      <th className="py-3 px-4 font-bold">Dữ liệu ghi nhận</th>
                      <th className="py-3 px-4 font-bold text-center">Hệ số lan tỏa</th>
                      <th className="py-3 px-4 font-bold text-right">Tỷ trọng</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#026E4E]/10 bg-white">
                    <tr className="hover:bg-emerald-50/40">
                      <td className="py-3 px-4 font-bold text-[#026E4E] flex items-center gap-2">
                        <Globe className="h-4 w-4 text-[#026E4E]" /> Landing Page
                      </td>
                      <td className="py-3 px-4 text-[#4B6354]">Lượt bình chọn hợp lệ, xác thực OTP</td>
                      <td className="py-3 px-4 text-center font-semibold text-[#0E382B]">1 vote = 1 điểm</td>
                      <td className="py-3 px-4 text-right font-black text-lg text-[#026E4E]">80%</td>
                    </tr>
                    <tr className="hover:bg-blue-50/40">
                      <td className="py-3 px-4 font-bold text-[#00C2FF] flex items-center gap-2">
                        <Share2 className="h-4 w-4 text-[#00C2FF]" /> Fanpage Facebook
                      </td>
                      <td className="py-3 px-4 text-[#4B6354]">Số Like + (Số Share × 2) trên bài chính thức</td>
                      <td className="py-3 px-4 text-center font-semibold text-blue-600">Share tính hệ số 2</td>
                      <td className="py-3 px-4 text-right font-black text-lg text-[#00C2FF]">10%</td>
                    </tr>
                    <tr className="hover:bg-rose-50/40">
                      <td className="py-3 px-4 font-bold text-rose-600 flex items-center gap-2">
                        <Flame className="h-4 w-4 text-rose-500" /> TikTok
                      </td>
                      <td className="py-3 px-4 text-[#4B6354]">Số Tim + (Số Share × 2) trên video chính thức</td>
                      <td className="py-3 px-4 text-center font-semibold text-rose-600">Share tính hệ số 2</td>
                      <td className="py-3 px-4 text-right font-black text-lg text-rose-500">10%</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Master Formula */}
              <div className="p-4 rounded-2xl bg-[#08291D] text-white space-y-2 text-center">
                <span className="text-[11px] font-bold tracking-wider text-[#A7F3D0] uppercase">
                  CÔNG THỨC TÍNH KẾT QUẢ CHUNG
                </span>
                <p className="font-mono text-sm sm:text-base font-bold text-[#FFB020]">
                  KẾT QUẢ CHUNG = (Tỷ lệ Landing Page × 80%) + (Tỷ lệ Fanpage × 10%) + (Tỷ lệ TikTok × 10%)
                </p>
                <p className="text-[11px] text-white/70 max-w-xl mx-auto">
                  * Tỷ lệ mỗi kênh = (Kết quả của điểm đến / Kết quả cao nhất trên chính kênh đó) × 100%
                </p>
              </div>

              {/* Realistic Example Box */}
              <div className="p-4 rounded-2xl bg-[#F8FCF9] border border-[#026E4E]/15 space-y-3">
                <h5 className="font-bold text-xs uppercase tracking-wider text-[#026E4E] flex items-center gap-1.5">
                  <HelpCircle className="h-4 w-4" /> Ví dụ minh họa cách tính điểm (Điểm đến A)
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                  <div className="p-3 bg-white rounded-xl border border-black/5">
                    <span className="font-bold block text-[#026E4E]">Landing Page:</span>
                    <span className="text-[#4B6354]">9.000 / 10.000 lượt (cao nhất)</span>
                    <strong className="block text-sm mt-1 text-[#0E382B]">Tỷ lệ = 90%</strong>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-black/5">
                    <span className="font-bold block text-[#00C2FF]">Fanpage:</span>
                    <span className="text-[#4B6354]">1.200 / 2.000 tương tác (cao nhất)</span>
                    <strong className="block text-sm mt-1 text-[#0E382B]">Tỷ lệ = 60%</strong>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-black/5">
                    <span className="font-bold block text-rose-500">TikTok:</span>
                    <span className="text-[#4B6354]">800 / 1.000 tương tác (cao nhất)</span>
                    <strong className="block text-sm mt-1 text-[#0E382B]">Tỷ lệ = 80%</strong>
                  </div>
                </div>
                <div className="pt-2 border-t border-[#026E4E]/10 flex items-center justify-between font-bold text-xs sm:text-sm">
                  <span>Kết quả quy đổi điểm đến A:</span>
                  <span className="text-base font-black text-[#FF9F00]">
                    (90% × 80%) + (60% × 10%) + (80% × 10%) = 86%
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: 5 STEPS */}
          {activeTab === "steps" && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <p className="text-xs text-[#4B6354]">
                Theo <strong>Điều 4 Quy chế bình chọn</strong> ban hành kèm quyết định của Ban Tổ chức, người tham gia thực hiện theo 05 bước sau:
              </p>
              <div className="space-y-3">
                <div className="flex gap-4 p-4 rounded-2xl bg-white border border-[#026E4E]/15 shadow-2xs">
                  <div className="h-9 w-9 rounded-xl bg-[#026E4E] text-white flex items-center justify-center font-black text-sm shrink-0">
                    01
                  </div>
                  <div>
                    <h5 className="font-extrabold text-[#0E382B]">Xem thông tin & video giới thiệu</h5>
                    <p className="text-xs text-[#4B6354] mt-0.5">
                      Theo dõi hình ảnh, video và thông tin 35 điểm đến trên Fanpage, TikTok và các kênh truyền thông chính thức của Hội thi.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 p-4 rounded-2xl bg-white border border-[#026E4E]/15 shadow-2xs">
                  <div className="h-9 w-9 rounded-xl bg-[#026E4E] text-white flex items-center justify-center font-black text-sm shrink-0">
                    02
                  </div>
                  <div>
                    <h5 className="font-extrabold text-[#0E382B]">Truy cập Landing Page bình chọn</h5>
                    <p className="text-xs text-[#4B6354] mt-0.5">
                      Truy cập trực tiếp qua đường link chính thức hoặc quét mã QR gắn tại các bài đăng quảng bá.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 p-4 rounded-2xl bg-white border border-[#026E4E]/15 shadow-2xs">
                  <div className="h-9 w-9 rounded-xl bg-[#026E4E] text-white flex items-center justify-center font-black text-sm shrink-0">
                    03
                  </div>
                  <div>
                    <h5 className="font-extrabold text-[#0E382B]">Nhập số điện thoại & Xác thực OTP</h5>
                    <p className="text-xs text-[#4B6354] mt-0.5">
                      Nhập số điện thoại hợp lệ và điền mã OTP 6 chữ số gửi qua tin nhắn để kích hoạt quyền bình chọn.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 p-4 rounded-2xl bg-white border border-[#026E4E]/15 shadow-2xs">
                  <div className="h-9 w-9 rounded-xl bg-[#FF9F00] text-white flex items-center justify-center font-black text-sm shrink-0">
                    04
                  </div>
                  <div>
                    <h5 className="font-extrabold text-[#0E382B]">Lựa chọn điểm đến & Nhấn &quot;BÌNH CHỌN&quot;</h5>
                    <p className="text-xs text-[#4B6354] mt-0.5">
                      Tìm kiếm điểm đến theo mã dự thi (DLNT01, DLNT02...) hoặc theo tên, bấm nút &quot;Bình chọn&quot; và xác nhận.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 p-4 rounded-2xl bg-white border border-[#026E4E]/15 shadow-2xs">
                  <div className="h-9 w-9 rounded-xl bg-[#00C2FF] text-white flex items-center justify-center font-black text-sm shrink-0">
                    05
                  </div>
                  <div>
                    <h5 className="font-extrabold text-[#0E382B]">Tiếp tục bình chọn cho điểm đến khác</h5>
                    <p className="text-xs text-[#4B6354] mt-0.5">
                      Mỗi tài khoản được bình chọn tối đa <strong>03 điểm đến khác nhau</strong> trong toàn bộ thời gian diễn ra cuộc thi.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: VALIDITY & PRINCIPLES */}
          {activeTab === "validity" && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs sm:text-sm text-emerald-950 flex items-start gap-3">
                <ShieldCheck className="h-5 w-5 text-[#026E4E] shrink-0 mt-0.5" />
                <div>
                  <strong className="block font-bold">Điều 6. Lượt bình chọn hợp lệ</strong>
                  <p className="mt-1 text-xs text-[#0E382B]/80 leading-relaxed">
                    Một lượt bình chọn chỉ được công nhận khi thỏa mãn đầy đủ các điều kiện theo quy định của Ban Tổ chức.
                  </p>
                </div>
              </div>

              <div className="space-y-2.5">
                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-black/5">
                  <CheckCircle2 className="h-4 w-4 text-[#026E4E] shrink-0 mt-0.5" />
                  <span className="text-xs text-[#4B6354]">
                    Thực hiện trực tiếp trên <strong>Landing Page chính thức</strong> của Hội thi.
                  </span>
                </div>
                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-black/5">
                  <CheckCircle2 className="h-4 w-4 text-[#026E4E] shrink-0 mt-0.5" />
                  <span className="text-xs text-[#4B6354]">
                    Số điện thoại đã được xác thực thành công qua mã OTP 6 chữ số.
                  </span>
                </div>
                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-black/5">
                  <CheckCircle2 className="h-4 w-4 text-[#026E4E] shrink-0 mt-0.5" />
                  <span className="text-xs text-[#4B6354]">
                    Được thực hiện trong khung giờ quy định: từ <strong>00:00 ngày 05/11/2026 đến 23:59 ngày 20/11/2026</strong>.
                  </span>
                </div>
                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-black/5">
                  <CheckCircle2 className="h-4 w-4 text-[#026E4E] shrink-0 mt-0.5" />
                  <span className="text-xs text-[#4B6354]">
                    Không vượt quá giới hạn <strong>tối đa 03 điểm đến khác nhau</strong> cho mỗi số điện thoại.
                  </span>
                </div>
                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-black/5">
                  <CheckCircle2 className="h-4 w-4 text-[#026E4E] shrink-0 mt-0.5" />
                  <span className="text-xs text-[#4B6354]">
                    <strong>Không bình chọn trùng lặp</strong> cùng một điểm đến; lá phiếu đã xác nhận không thể chuyển đổi.
                  </span>
                </div>
                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-black/5">
                  <CheckCircle2 className="h-4 w-4 text-[#026E4E] shrink-0 mt-0.5" />
                  <span className="text-xs text-[#4B6354]">
                    Không sử dụng công cụ tự động, bot hoặc gian lận làm sai lệch kết quả bình chọn.
                  </span>
                </div>
              </div>

              {/* Anti-fraud warning */}
              <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 flex items-start gap-3 text-xs text-rose-900">
                <ShieldAlert className="h-5 w-5 text-rose-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="block font-bold">Xử lý vi phạm & Thẩm quyền của Ban Tổ chức</strong>
                  <p className="mt-0.5 leading-relaxed">
                    Sau khi kết thúc bình chọn, Ban Tổ chức cùng đơn vị kỹ thuật rà soát, đối soát và loại bỏ toàn bộ các lượt bình chọn/tương tác có dấu hiệu bất thường trước khi phê duyệt kết quả chính thức.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <footer className="px-6 py-4 bg-[#F4FAF6] border-t border-[#026E4E]/10 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2 text-xs text-[#4B6354]">
            <Mail className="h-4 w-4 text-[#026E4E]" />
            <span>Ban Thư ký Hội thi: <strong>bantochuc@dulichnongthon.vn</strong></span>
          </div>
          <button
            onClick={close}
            className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-gradient-to-r from-[#026E4E] to-[#00875A] hover:from-[#01583E] hover:to-[#026E4E] text-white text-xs font-bold shadow-md transition-all cursor-pointer"
          >
            Đã hiểu thể lệ & quay lại
          </button>
        </footer>
      </div>
    </div>
  );
}
