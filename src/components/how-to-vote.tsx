"use client";

import React, { useState, useEffect, useRef } from "react";
import { Smartphone, CheckSquare, HeartHandshake, ShieldCheck, HelpCircle, ArrowRight, Sparkles, Check } from "lucide-react";
import { useVoting } from "@/context/voting-context";

export function HowToVote() {
  const { setRulesModalOpen } = useVoting();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0); // 0: chưa bắt đầu, 1, 2, 3: các bước đã hoàn tất hoạt họa
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          // Kích hoạt animation step-by-step lần lượt
          setTimeout(() => setActiveStep(1), 200);   // Bước 1 hiện lên sau 200ms
          setTimeout(() => setActiveStep(2), 700);   // Bước 2 hiện lên sau 700ms
          setTimeout(() => setActiveStep(3), 1200);  // Bước 3 hiện lên sau 1200ms
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [hasAnimated]);

  const scrollToDestinations = () => {
    const el = document.getElementById("destinations");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const steps = [
    {
      step: "01",
      stepNum: 1,
      title: "Đăng nhập bằng số điện thoại",
      desc: "Nhập số điện thoại của bạn để nhận mã xác thực OTP 6 số qua tin nhắn hoàn toàn miễn phí và bảo mật tuyệt đối.",
      icon: Smartphone,
      accentColor: "#1F6B45",
      badge: "Bước 1 • Xác thực tức thì",
      tip: "🔒 Thông tin bảo mật theo tiêu chuẩn",
    },
    {
      step: "02",
      stepNum: 2,
      title: "Chọn tối đa 3 điểm đến khác nhau",
      desc: "Khám phá danh sách 35 điểm đến và lựa chọn tối đa 3 địa danh du lịch nông thôn bạn yêu thích và muốn ủng hộ.",
      icon: CheckSquare,
      accentColor: "#7CB342",
      badge: "Bước 2 • Tối đa 3 lượt vote",
      tip: "💡 Không bình chọn trùng lặp 1 điểm đến",
    },
    {
      step: "03",
      stepNum: 3,
      title: "Xác nhận bình chọn",
      desc: "Bấm nút 'Bình chọn' và xác nhận. Lá phiếu của bạn sẽ được ghi nhận trực tiếp vào bảng xếp hạng toàn quốc.",
      icon: HeartHandshake,
      accentColor: "#F5A623",
      badge: "Bước 3 • Ghi nhận tức thì",
      tip: "✨ Kết quả cập nhật trực tiếp thời gian thực",
      isHero: true,
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="how-to-vote"
      className="py-24 bg-gradient-to-b from-[#FBF8F0] via-white to-[#FBF8F0] border-t border-[#1F6B45]/10 overflow-hidden relative"
    >
      {/* Decorative background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[350px] bg-gradient-to-r from-[#1F6B45]/5 via-[#7CB342]/10 to-[#F5A623]/10 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1F6B45]/10 border border-[#1F6B45]/20 text-[#1F6B45] text-xs font-bold shadow-2xs">
            <ShieldCheck className="h-4 w-4 text-[#1F6B45]" />
            <span>Quy trình 3 bước đơn giản & minh bạch</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-[#1B2B22] tracking-tight">
            Cách Thức Bình Chọn
          </h2>
          <p className="text-sm sm:text-base text-[#4B5E52] leading-relaxed">
            Mỗi công dân có tối đa 3 lượt bình chọn để cùng chung tay tôn vinh nét đẹp du lịch nông nghiệp, sinh thái Việt Nam.
          </p>
        </div>

        {/* 3 Step Cards with Interactive Timeline Connector & Step-by-Step Animation */}
        <div className="relative">
          {/* Animated Connecting Line on Desktop */}
          <div className="hidden lg:block absolute top-[72px] left-[16%] right-[16%] h-1 bg-black/5 -z-0 rounded-full">
            <div
              className="h-full bg-gradient-to-r from-[#1F6B45] via-[#7CB342] to-[#F5A623] transition-all duration-700 ease-out rounded-full shadow-[0_0_8px_rgba(245,166,35,0.5)]"
              style={{
                width: activeStep === 0 ? "0%" : activeStep === 1 ? "25%" : activeStep === 2 ? "65%" : "100%",
              }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            {steps.map((item) => {
              const Icon = item.icon;
              const isPassed = activeStep >= item.stepNum;
              const isCurrent = activeStep === item.stepNum;

              return (
                <div
                  key={item.step}
                  className={`relative rounded-3xl transition-all duration-700 flex flex-col justify-between p-8 sm:p-9 space-y-6 ${
                    isPassed
                      ? "opacity-100 translate-y-0 scale-100"
                      : "opacity-0 translate-y-12 scale-95 pointer-events-none"
                  } ${
                    item.isHero
                      ? isPassed
                        ? "bg-gradient-to-b from-white via-white to-[#F5A623]/10 border-2 border-[#F5A623] shadow-[0_20px_45px_rgba(245,166,35,0.22)] md:-translate-y-2"
                        : "bg-white border border-[#F5A623]/40"
                      : isPassed
                      ? "bg-white border border-[#1F6B45]/20 shadow-[0_15px_35px_rgba(31,107,69,0.08)] hover:shadow-xl hover:-translate-y-2"
                      : "bg-white border border-black/5"
                  }`}
                >
                  {/* Step Header: Number & Glowing Icon */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span
                        className={`text-4xl font-black font-mono transition-colors duration-500 ${
                          item.isHero ? "text-[#F5A623]" : isPassed ? "text-[#1F6B45]" : "text-black/20"
                        }`}
                      >
                        {item.step}
                      </span>
                      {isPassed && (
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#1F6B45] text-white shadow-2xs">
                          <Check className="h-3 w-3 stroke-[3]" />
                        </span>
                      )}
                    </div>

                    <div
                      className={`h-14 w-14 rounded-2xl flex items-center justify-center transition-all duration-500 shadow-sm ${
                        item.isHero
                          ? "bg-[#F5A623]/20 border border-[#F5A623]/40 text-[#F5A623] scale-105"
                          : item.stepNum === 2
                          ? "bg-[#7CB342]/15 border border-[#7CB342]/30 text-[#1F6B45]"
                          : "bg-[#1F6B45]/10 border border-[#1F6B45]/20 text-[#1F6B45]"
                      } ${isCurrent ? "animate-pulse" : ""}`}
                    >
                      <Icon className="h-7 w-7" />
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="space-y-3">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-[11px] font-bold ${
                        item.isHero
                          ? "bg-[#F5A623]/15 text-[#1B2B22] border border-[#F5A623]/30"
                          : "bg-[#F2F7F4] text-[#1F6B45]"
                      }`}
                    >
                      {item.badge}
                    </span>

                    <h3 className="text-xl font-black text-[#1B2B22] leading-snug">
                      {item.title}
                    </h3>

                    <p className="text-sm text-[#4B5E52] leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  {/* Card Bottom Note */}
                  <div className="pt-4 border-t border-black/5 text-xs text-[#4B5E52] font-semibold flex items-center gap-2">
                    <span>{item.tip}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA Banner: Đưa người dùng bấm bình chọn ngay sau khi xem quy trình */}
        <div
          className={`max-w-2xl mx-auto text-center space-y-4 pt-4 transition-all duration-700 ${
            activeStep >= 3 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={scrollToDestinations}
              className="w-full sm:w-auto px-9 py-4 rounded-2xl bg-[#F5A623] hover:bg-[#e09318] text-[#1B2B22] font-black text-base shadow-[0_10px_30px_rgba(245,166,35,0.4)] hover:shadow-[0_15px_35px_rgba(245,166,35,0.5)] transition-all flex items-center justify-center gap-2.5 cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <Sparkles className="h-4 w-4" />
              <span>Bình chọn cho điểm đến ngay</span>
              <ArrowRight className="h-4 w-4" />
            </button>

            <button
              onClick={() => setRulesModalOpen(true)}
              className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-white hover:bg-[#FBF8F0] text-[#1F6B45] border border-[#1F6B45]/25 font-bold text-sm shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <HelpCircle className="h-4 w-4" />
              <span>Xem thể lệ chi tiết</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
