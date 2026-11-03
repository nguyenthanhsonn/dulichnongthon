"use client";

import { ShieldCheck } from "lucide-react";
import { RevealOnScroll } from "./reveal-on-scroll";

export function HowToVote() {
  return (
    <section id="how-to-vote" className="how-section py-16 sm:py-20">
      <div className="site-container">
        {/* Quy Trình 5 Bước Bình Chọn - Chuẩn thiết kế BTC */}
        <RevealOnScroll className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-2xl sm:text-3xl font-black text-[#0E382B] tracking-tight">
                Quy Trình 5 Bước Bình Chọn
              </h3>
              <p className="text-sm text-[#4B6354] mt-1 font-medium">
                Mỗi số điện thoại được bình chọn tối đa 03 điểm đến khác nhau
              </p>
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-[#026E4E]/15 text-[#026E4E] text-xs font-bold self-start sm:self-auto">
              <ShieldCheck className="h-4 w-4" />
              <span>Xác thực OTP an toàn</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Step 1 */}
            <div className="p-5 rounded-2xl bg-white border border-[#026E4E]/12 shadow-2xs hover:shadow-xs transition-shadow flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-black text-[#026E4E]">01</span>
                  <span className="px-2 py-0.5 rounded-full bg-neutral-100 text-[#4B6354] text-[11px] font-bold">
                    Bước 1
                  </span>
                </div>
                <h4 className="font-extrabold text-[#0E382B] text-sm mt-3 leading-snug">
                  Xem thông tin &amp; video giới thiệu
                </h4>
                <p className="text-xs text-[#4B6354] mt-2 leading-relaxed">
                  Theo dõi bài đăng, hình ảnh và video giới thiệu 35 điểm đến trên Fanpage Facebook và kênh TikTok chính thức của Hội thi.
                </p>
              </div>
              <p className="pt-3 border-t border-[#026E4E]/10 text-[11px] font-semibold text-[#026E4E]">
                Khám phá nét đẹp làng quê
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-5 rounded-2xl bg-white border border-[#026E4E]/12 shadow-2xs hover:shadow-xs transition-shadow flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-black text-[#026E4E]">02</span>
                  <span className="px-2 py-0.5 rounded-full bg-neutral-100 text-[#4B6354] text-[11px] font-bold">
                    Bước 2
                  </span>
                </div>
                <h4 className="font-extrabold text-[#0E382B] text-sm mt-3 leading-snug">
                  Truy cập Landing Page
                </h4>
                <p className="text-xs text-[#4B6354] mt-2 leading-relaxed">
                  Quét mã QR tại các ấn phẩm truyền thông hoặc truy cập liên kết chính thức để vào cổng bình chọn trực tuyến.
                </p>
              </div>
              <p className="pt-3 border-t border-[#026E4E]/10 text-[11px] font-semibold text-[#026E4E]">
                Cổng bình chọn duy nhất
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-5 rounded-2xl bg-white border border-[#026E4E]/12 shadow-2xs hover:shadow-xs transition-shadow flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-black text-[#026E4E]">03</span>
                  <span className="px-2 py-0.5 rounded-full bg-neutral-100 text-[#4B6354] text-[11px] font-bold">
                    Bước 3
                  </span>
                </div>
                <h4 className="font-extrabold text-[#0E382B] text-sm mt-3 leading-snug">
                  Xác thực số điện thoại qua OTP
                </h4>
                <p className="text-xs text-[#4B6354] mt-2 leading-relaxed">
                  Nhập số điện thoại để nhận mã xác thực OTP 6 số qua tin nhắn hoàn toàn miễn phí và bảo mật tuyệt đối.
                </p>
              </div>
              <p className="pt-3 border-t border-[#026E4E]/10 text-[11px] font-semibold text-[#026E4E]">
                01 tài khoản • Tối đa 3 lượt vote
              </p>
            </div>

            {/* Step 4 - Highlighted */}
            <div className="p-5 rounded-2xl bg-white border-2 border-[#FF9F00] shadow-md shadow-[#FF9F00]/10 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-black text-[#FF9F00]">04</span>
                  <span className="px-2 py-0.5 rounded-full bg-amber-100 text-[#D97706] text-[11px] font-bold">
                    Bước 4
                  </span>
                </div>
                <h4 className="font-extrabold text-[#0E382B] text-sm mt-3 leading-snug">
                  Chọn mã dự thi &amp; nhấn &quot;BÌNH CHỌN&quot;
                </h4>
                <p className="text-xs text-[#4B6354] mt-2 leading-relaxed">
                  Tìm kiếm điểm đến theo mã số (DLNT01, DLNT02...) hoặc theo tên, bấm nút &apos;Bình chọn&apos; và xác nhận lá phiếu của bạn.
                </p>
              </div>
              <p className="pt-3 border-t border-amber-200 text-[11px] font-bold text-[#D97706]">
                Mỗi điểm đến chỉ chọn 01 lần
              </p>
            </div>

            {/* Step 5 */}
            <div className="p-5 rounded-2xl bg-white border border-[#026E4E]/12 shadow-2xs hover:shadow-xs transition-shadow flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-black text-[#026E4E]">05</span>
                  <span className="px-2 py-0.5 rounded-full bg-neutral-100 text-[#4B6354] text-[11px] font-bold">
                    Bước 5
                  </span>
                </div>
                <h4 className="font-extrabold text-[#0E382B] text-sm mt-3 leading-snug">
                  Tiếp tục bình chọn điểm đến khác
                </h4>
                <p className="text-xs text-[#4B6354] mt-2 leading-relaxed">
                  Sử dụng các lượt bình chọn còn lại trong tài khoản (tối đa 3 điểm đến khác nhau trong suốt thời gian diễn ra Hội thi).
                </p>
              </div>
              <p className="pt-3 border-t border-[#026E4E]/10 text-[11px] font-semibold text-[#026E4E]">
                Lượt vote không được hoàn tác
              </p>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
