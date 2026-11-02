"use client";
import { ArrowUpRight } from "lucide-react";
import { getRanking } from "@/data/mock";
import { useVoting } from "@/context/voting-context";
import { useInView } from "@/hooks/useInView";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { TopRankCard, type TopRank } from "./top-rank-card";

export function Top3Leaderboard() {
  const { destinations, setLeaderboardModalOpen } = useVoting();
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: .35, once: true });
  const reduced = useReducedMotion();
  const top3 = getRanking(destinations.map(destination => ({ destinationId:destination.id, votes:destination.votes }))).slice(0,3);
  const play = inView || reduced;
  return <section id="leaderboard" className={`ranking-section premium-ranking ${play ? "ranking-playing" : ""}`}>
    <div className="ranking-spotlight" aria-hidden="true" /><div className="ranking-halo" aria-hidden="true" />
    <div className="site-container">
      {/* A viewport-sized intro remains observable at 35% even when the mobile podium is taller than the viewport. */}
      <div ref={ref} className="section-heading ranking-intro"><div><p className="eyebrow">BẢNG XẾP HẠNG · TOP 3</p><h2>Những miền xanh<br /><em>được yêu mến nhất.</em></h2></div><div className="section-aside"><p>Ba điểm đến đang dẫn đầu bình chọn.<br />Cùng gửi lá phiếu cho miền quê bạn yêu mến.</p><button className="text-link" onClick={() => setLeaderboardModalOpen(true)}>Xem toàn bộ bảng xếp hạng <ArrowUpRight size={18} /></button></div></div>
      <div className="premium-podium">{top3.map((destination,index) => <TopRankCard key={destination.id} rank={(index+1) as TopRank} destination={destination} delay={[200,1300,1500][index]} play={play} />)}</div>
      <p className="ranking-note">Thứ hạng dựa trên tổng lượt bình chọn. Cùng số phiếu, điểm đến được xếp theo mã đề cử.</p>
    </div>
  </section>;
}
