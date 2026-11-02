"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ArrowRight, Sparkles, Timer } from "lucide-react";

interface Slide {
  id: number;
  name: string;
  imageUrl: string;
}

const HERO_SLIDES: Slide[] = [
  {
    id: 1,
    name: "Ruộng bậc thang Mù Cang Chải",
    imageUrl: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=2200&q=85",
  },
  {
    id: 2,
    name: "Quần thể danh thắng Tràng An & Tam Cốc",
    imageUrl: "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=2200&q=85",
  },
  {
    id: 3,
    name: "Đồi chè bát úp Long Cốc",
    imageUrl: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=2200&q=85",
  },
  {
    id: 4,
    name: "Sông nước miệt vườn & Vườn dừa Bến Tre",
    imageUrl: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=2200&q=85",
  },
  {
    id: 5,
    name: "Thung lũng lúa vàng Bắc Sơn",
    imageUrl: "https://images.unsplash.com/photo-1570789210967-2cac24afeb00?auto=format&fit=crop&w=2200&q=85",
  },
];

export function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Background slideshow tự động chuyển cảnh mỗi 5 giây
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Đồng hồ đếm ngược thời gian kết thúc bình chọn (Ngày : Giờ : Phút : Giây)
  const [timeLeft, setTimeLeft] = useState({
    days: 18,
    hours: 8,
    minutes: 35,
    seconds: 42,
  });

  useEffect(() => {
    const target = new Date("2026-11-20T23:59:59").getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = target - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="hero" className="relative min-h-[92vh] lg:min-h-screen flex items-center pt-28 pb-16 overflow-hidden">
      {/* Background Slideshow tự động hoàn toàn */}
      <div className="absolute inset-0 z-0">
        {HERO_SLIDES.map((slide, idx) => {
          const isActive = idx === currentSlide;
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                isActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
              }`}
            >
              <Image
                src={slide.imageUrl}
                alt={slide.name}
                fill
                priority={idx === 0}
                className={`object-cover object-center transform transition-transform duration-[6500ms] ease-out ${
                  isActive ? "scale-105" : "scale-100"
                }`}
              />
            </div>
          );
        })}
      </div>

      <div className="relative z-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-3xl space-y-7">
          {/* Tag Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/40 text-white text-xs sm:text-sm font-bold shadow-lg">
            <Sparkles className="h-4 w-4 text-[#F5A623]" />
            <span>Bình chọn Trực tuyến Toàn quốc 2026</span>
          </div>

          {/* Tiêu đề chính */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.1] text-white drop-shadow-[0_3px_12px_rgba(0,0,0,0.85)]">
            Cuộc thi <br />
            <span className="text-[#F5A623] drop-shadow-[0_3px_12px_rgba(0,0,0,0.85)]">
              Du lịch nông thôn
            </span>
          </h1>

          {/* Mô tả */}
          <p className="text-base sm:text-xl text-white font-medium leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] max-w-xl">
            Tôn vinh 35 điểm đến sinh thái, làng nghề truyền thống và mô hình nông nghiệp xanh đặc sắc trên khắp dải đất hình chữ S.
          </p>

          {/* Đồng hồ đếm ngược thời gian và nút Bình chọn bên cạnh */}
          <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-end gap-5 sm:gap-6">
            {/* Countdown Box */}
            <div className="flex flex-col gap-2">
              <span className="text-xs font-bold text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.85)] flex items-center gap-1.5 uppercase tracking-wider">
                <Timer className="h-3.5 w-3.5 text-[#F5A623]" />
                <span>Thời gian bình chọn còn lại</span>
              </span>

              <div className="flex items-center gap-2 sm:gap-2.5">
                {/* Ngày */}
                <div className="flex flex-col items-center justify-center min-w-[56px] sm:min-w-[62px] h-16 sm:h-18 px-2 rounded-2xl bg-black/45 backdrop-blur-md border border-white/35 shadow-xl text-white">
                  <span className="text-2xl sm:text-3xl font-black text-[#F5A623] leading-none drop-shadow-xs">
                    {String(timeLeft.days).padStart(2, "0")}
                  </span>
                  <span className="text-[10px] font-bold text-white/80 uppercase tracking-wider mt-1">
                    Ngày
                  </span>
                </div>

                <span className="text-xl sm:text-2xl font-black text-white/80 drop-shadow-md">:</span>

                {/* Giờ */}
                <div className="flex flex-col items-center justify-center min-w-[56px] sm:min-w-[62px] h-16 sm:h-18 px-2 rounded-2xl bg-black/45 backdrop-blur-md border border-white/35 shadow-xl text-white">
                  <span className="text-2xl sm:text-3xl font-black text-white leading-none drop-shadow-xs">
                    {String(timeLeft.hours).padStart(2, "0")}
                  </span>
                  <span className="text-[10px] font-bold text-white/80 uppercase tracking-wider mt-1">
                    Giờ
                  </span>
                </div>

                <span className="text-xl sm:text-2xl font-black text-white/80 drop-shadow-md">:</span>

                {/* Phút */}
                <div className="flex flex-col items-center justify-center min-w-[56px] sm:min-w-[62px] h-16 sm:h-18 px-2 rounded-2xl bg-black/45 backdrop-blur-md border border-white/35 shadow-xl text-white">
                  <span className="text-2xl sm:text-3xl font-black text-white leading-none drop-shadow-xs">
                    {String(timeLeft.minutes).padStart(2, "0")}
                  </span>
                  <span className="text-[10px] font-bold text-white/80 uppercase tracking-wider mt-1">
                    Phút
                  </span>
                </div>

                <span className="text-xl sm:text-2xl font-black text-white/80 drop-shadow-md">:</span>

                {/* Giây */}
                <div className="flex flex-col items-center justify-center min-w-[56px] sm:min-w-[62px] h-16 sm:h-18 px-2 rounded-2xl bg-black/45 backdrop-blur-md border border-white/35 shadow-xl text-white">
                  <span className="text-2xl sm:text-3xl font-black text-[#7CB342] leading-none drop-shadow-xs">
                    {String(timeLeft.seconds).padStart(2, "0")}
                  </span>
                  <span className="text-[10px] font-bold text-white/80 uppercase tracking-wider mt-1">
                    Giây
                  </span>
                </div>
              </div>
            </div>

            {/* Nút Bình Chọn Ngay Đặt Bên Cạnh */}
            <div className="w-full sm:w-auto">
              <button
                onClick={() => scrollTo("destinations")}
                className="w-full sm:w-auto h-16 sm:h-18 px-8 sm:px-9 rounded-2xl bg-[#F5A623] hover:bg-[#e09318] text-[#1B2B22] font-black text-base sm:text-lg shadow-[0_10px_30px_rgba(245,166,35,0.45)] hover:shadow-[0_15px_35px_rgba(245,166,35,0.55)] transition-all duration-200 flex items-center justify-center gap-2.5 cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>Bình chọn ngay</span>
                <ArrowRight className="h-5 w-5 text-[#1B2B22]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
