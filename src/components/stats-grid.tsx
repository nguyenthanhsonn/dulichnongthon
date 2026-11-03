"use client";
import { regions } from "@/data/mock";
import { ArrowUpRight } from "lucide-react";
import { useVoting } from "@/context/voting-context";
import { RevealOnScroll } from "./reveal-on-scroll";
export function StatsGrid() {
  const { totalVotes, destinations } = useVoting();
  return <section className="story-section"><div className="site-container">
    <RevealOnScroll className="story-intro"><p className="eyebrow">CUỘC THI DU LỊCH NÔNG THÔN 2026</p><h2>Bình chọn hôm nay.<br /><em>Tôn vinh miền quê Việt.</em></h2><div><p>Cuộc thi là dịp để cộng đồng bình chọn và tôn vinh 35 điểm đến du lịch nông nghiệp, làng nghề và sinh thái tiêu biểu trên khắp Việt Nam.</p><p>Hãy dành lá phiếu cho những điểm đến bạn yêu mến, góp phần quảng bá bản sắc địa phương và khuyến khích phát triển du lịch nông thôn bền vững.</p><a href="#destinations" className="text-link">Xem đề cử & bình chọn <ArrowUpRight size={18} /></a></div></RevealOnScroll>
    <RevealOnScroll className="stats-band">
      <div><strong className="text-[#026E4E]">{String(destinations.length).padStart(2, "0")}<small> điểm đến</small></strong><span>Những câu chuyện nông thôn tiêu biểu</span></div>
      <div><strong className="text-[#FF9F00]">{totalVotes.toLocaleString("vi-VN")}</strong><span>Lượt bình chọn dành cho các đề cử</span></div>
      <div><strong className="text-[#00C2FF]">{String(regions.length).padStart(2, "0")}<small> miền đất</small></strong><span>Kết nối một hành trình Việt Nam</span></div>
    </RevealOnScroll>
  </div></section>;
}
