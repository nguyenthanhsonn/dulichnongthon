"use client";

import { useEffect, useState } from "react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { VIMEO_EMBED_URL } from "@/lib/media";

export function Hero() {
  const [remaining, setRemaining] = useState<number | null>(null);

  useEffect(() => {
    const tick = () => setRemaining(Math.max(0, new Date("2026-11-20T23:59:59+07:00").getTime() - Date.now()));
    tick();
    const timer = setInterval(tick, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const values =
    remaining === null
      ? [null, null, null, null]
      : [
          Math.floor(remaining / 86400000),
          Math.floor(remaining / 3600000) % 24,
          Math.floor(remaining / 60000) % 60,
          Math.floor(remaining / 1000) % 60,
        ];

  return (
    <section id="hero" className="campaign-hero">
      {/* Vimeo Background Video: Sử dụng trực tiếp link Vimeo chính thức với chế độ background=1 */}
      <div className="hero-film-container" aria-hidden="true">
        <iframe
          src={VIMEO_EMBED_URL}
          className="hero-film-iframe"
          title="Video giới thiệu du lịch nông thôn Việt Nam"
          allow="autoplay; fullscreen"
        />
      </div>

      <div className="hero-shade" />

      <div className="site-container hero-layout">
        <div className="hero-copy" data-aos="fade-up">
          <p className="eyebrow hero-eyebrow">
            <span className="live-dot" /> DU LỊCH NÔNG THÔN VIỆT NAM · 2026
          </p>
          <h1>
            Về miền xanh.<br />
            <em>Chạm điều bình dị.</em>
          </h1>
          <p className="hero-description">
            Tôn vinh 35 điểm đến du lịch nông thôn tiêu biểu.
          </p>
          <div className="hero-actions">
            <a href="#destinations" className="vote-button">
              Bình chọn ngay <ArrowUpRight size={19} />
            </a>
            <a href="#how-to-vote" className="hero-text-link">
              Thể lệ bình chọn <ArrowDown size={16} />
            </a>
          </div>
        </div>

        <div className="hero-bottom">
          <div className="hero-location">
            <span>NHỮNG MIỀN QUÊ ĐÁNG ĐỂ TRỞ VỀ</span>
            <p>Thiên nhiên. Con người. Bản sắc Việt.</p>
          </div>
          <div className="countdown">
            <span className="countdown-label">
              {remaining === 0 ? "BÌNH CHỌN ĐÃ KẾT THÚC" : "Thời gian bình chọn còn lại"}
            </span>
            <div className="countdown-values">
              {values.map((value, index) => (
                <div key={index} className="countdown-unit">
                  <strong>{value === null ? "--" : String(value).padStart(2, "0")}</strong>
                  <small>{["Ngày", "Giờ", "Phút", "Giây"][index]}</small>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
