"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowUpRight, Pause, Play } from "lucide-react";
import { CAMPAIGN_POSTER, CAMPAIGN_VIDEO } from "@/lib/media";

export function Hero() {
  const video = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);
  const [remaining, setRemaining] = useState<number | null>(null);
  useEffect(() => {
    const tick = () => setRemaining(Math.max(0, new Date("2026-11-20T23:59:59+07:00").getTime() - Date.now()));
    tick();
    const timer = setInterval(tick, 1000);
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!media.matches) video.current?.play().catch(() => setPlaying(false));
    const pause = () => { if (media.matches) video.current?.pause(); };
    media.addEventListener("change", pause);
    return () => { clearInterval(timer); media.removeEventListener("change", pause); };
  }, []);
  const values = remaining === null ? [null, null, null, null] : [Math.floor(remaining / 86400000), Math.floor(remaining / 3600000) % 24, Math.floor(remaining / 60000) % 60, Math.floor(remaining / 1000) % 60];
  return (
    <section id="hero" className="campaign-hero">
      <video ref={video} className="hero-film" muted loop playsInline preload="metadata" poster={CAMPAIGN_POSTER} onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} onError={() => setFailed(true)} aria-label="Phong cảnh đồng lúa và núi non miền Trung Việt Nam">
        <source src={CAMPAIGN_VIDEO} type="video/mp4" />
      </video>
      <div className="hero-shade" />
      <div className="site-container hero-layout">
        <div className="hero-copy" data-aos="fade-up">
          <p className="eyebrow hero-eyebrow"><span className="live-dot" /> DU LỊCH NÔNG THÔN VIỆT NAM · 2026</p>
          <h1>Về miền xanh.<br /><em>Chạm điều bình dị.</em></h1>
          <p className="hero-description">Tôn vinh 35 điểm đến du lịch nông nghiệp, làng nghề và sinh thái. Một lá phiếu của bạn, thêm một miền quê được biết đến.</p>
          <div className="hero-actions"><a href="#destinations" className="vote-button">Bình chọn điểm đến <ArrowUpRight size={19} /></a><a href="#how-to-vote" className="hero-text-link">Cách thức tham gia <ArrowDown size={16} /></a></div>
        </div>
        <div className="hero-bottom">
          <div className="hero-location"><span>NHỮNG MIỀN QUÊ ĐÁNG ĐỂ TRỞ VỀ</span><p>Thiên nhiên. Con người. Bản sắc Việt.</p></div>
          <div className="countdown"><span>{remaining === 0 ? "BÌNH CHỌN ĐÃ KẾT THÚC" : "THỜI GIAN BÌNH CHỌN CÒN LẠI"}</span><div>{values.map((value, index) => <div key={index}><strong>{value === null ? "--" : String(value).padStart(2, "0")}</strong><small>{["Ngày", "Giờ", "Phút", "Giây"][index]}</small></div>)}</div></div>
          {!failed && <button className="film-toggle" onClick={() => { if (playing) video.current?.pause(); else video.current?.play().catch(() => setPlaying(false)); }} aria-label={playing ? "Tạm dừng video nền" : "Phát video nền"}>{playing ? <Pause size={16} /> : <Play size={16} />}</button>}
        </div>
      </div>
    </section>
  );
}
