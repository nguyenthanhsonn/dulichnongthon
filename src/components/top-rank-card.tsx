"use client";

import { useEffect, useRef, useState, type CSSProperties, type PointerEvent } from "react";
import { Award, Check, Crown, Heart, Medal, MapPin } from "lucide-react";
import type { RankedDestination } from "@/data/mock";
import { toVotingDestination } from "@/data/destinations";
import { useVoting } from "@/context/voting-context";
import { useCountUp } from "@/hooks/useCountUp";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { DestinationImage } from "./destination-image";

export type TopRank = 1 | 2 | 3;
export const RANK_THEME = {
  1: {
    label: "DẪN ĐẦU BÌNH CHỌN", icon: Crown, order: 2, ink: "#5A4204", labelSurface: "#fff4cce6", voteInk: "#8A6508", tint: "#fff9e8",
    header: "linear-gradient(135deg, #F7D774, #D4AF37 45%, #B8860B 70%, #F7D774)",
    border: "linear-gradient(145deg, #FFF4CC, #D4AF37 30%, #8A6508 60%, #F7D774 82%, #FFF4CC)",
    glow: "0 0 0 1px rgba(212,175,55,.4), 0 20px 60px -10px rgba(212,175,55,.45), 0 0 80px rgba(247,215,116,.25)",
    badge: "linear-gradient(135deg, #5A4204, #795908 40%, #5A4204 70%, #725207)",
    entrance: "rank-enter-gold", duration: 900, shine: 900, count: 1000,
  },
  2: {
    label: "VỊ TRÍ THỨ HAI", icon: Award, order: 1, ink: "#293B49", labelSurface: "#f5f8facc", voteInk: "#445866", tint: "#f0f4f7",
    header: "linear-gradient(135deg, #e8edf1, #C9D1D9 40%, #8E9AA6 76%, #dce3e9)",
    border: "linear-gradient(145deg, #f5f8fa, #C9D1D9 40%, #8E9AA6 72%, #dce3e9)",
    glow: "0 14px 38px -15px rgba(103,125,145,.25)",
    badge: "linear-gradient(135deg, #293B49, #516576, #293B49)",
    entrance: "rank-enter-left", duration: 700, shine: 1800, count: 2200,
  },
  3: {
    label: "VỊ TRÍ THỨ BA", icon: Medal, order: 3, ink: "#40200D", labelSurface: "#fff3e5cc", voteInk: "#7A4824", tint: "#faf0e7",
    header: "linear-gradient(135deg, #f0d4b5, #D9A878 40%, #A8693A 76%, #e3bc94)",
    border: "linear-gradient(145deg, #f4dec7, #D9A878 40%, #A8693A 72%, #e5c6a5)",
    glow: "0 14px 38px -15px rgba(168,105,58,.24)",
    badge: "linear-gradient(135deg, #40200D, #6d3a18, #40200D)",
    entrance: "rank-enter-right", duration: 700, shine: 2000, count: 2200,
  },
} as const;

const SPARKLES = [
  { x: "8%", y: "15%", delay: 100 }, { x: "24%", y: "5%", delay: 800 },
  { x: "42%", y: "22%", delay: 1500 }, { x: "64%", y: "9%", delay: 400 },
  { x: "83%", y: "26%", delay: 1900 }, { x: "94%", y: "8%", delay: 1200 },
  { x: "73%", y: "45%", delay: 2400 },
] as const;
const BURST = [
  [-120,-65,30],[-96,-108,-35],[-67,-132,65],[-30,-100,-40],[5,-145,25],
  [40,-117,80],[77,-133,-25],[110,-87,55],[136,-30,100],[91,10,-50],
  [53,-48,35],[-57,-34,-60],[-143,-15,80],[-22,-155,110],
] as const;
function FourPointStar() { return <svg viewBox="0 0 16 16" fill="currentColor"><path d="M8 0 10 6 16 8 10 10 8 16 6 10 0 8 6 6Z" /></svg>; }
interface TopRankCardProps { rank: TopRank; destination: RankedDestination; delay: number; play: boolean; }

export function TopRankCard({ rank, destination, delay, play }: TopRankCardProps) {
  const theme = RANK_THEME[rank];
  const Icon = theme.icon;
  const reduced = useReducedMotion();
  const canTilt = useMediaQuery("(hover: hover) and (pointer: fine)");
  const [countStarted, setCountStarted] = useState(false);
  const [entering, setEntering] = useState(false);
  const [complete, setComplete] = useState(false);
  const tilt = useRef<HTMLDivElement>(null);
  const pointerFrame = useRef(0);
  const { user, handleVoteClick } = useVoting();
  const voted = !!user?.votedIds.includes(destination.id);
  const count = useCountUp(destination.votes, { duration: 1600, start: countStarted });
  useEffect(() => {
    if (!play || reduced) return;
    const timer = window.setTimeout(() => setCountStarted(true), theme.count);
    return () => window.clearTimeout(timer);
  }, [play, reduced, theme.count]);
  useEffect(() => () => cancelAnimationFrame(pointerFrame.current), []);
  const onMove = (event: PointerEvent<HTMLDivElement>) => {
    if (rank !== 1 || !canTilt || reduced) return;
    const element = event.currentTarget;
    const box = element.getBoundingClientRect();
    const x = Math.max(-4, Math.min(4, ((event.clientX - box.left) / box.width - .5) * 8));
    const y = Math.max(-4, Math.min(4, ((event.clientY - box.top) / box.height - .5) * -8));
    cancelAnimationFrame(pointerFrame.current);
    pointerFrame.current = requestAnimationFrame(() => {
      element.style.setProperty("--tilt-x", `${y}deg`);
      element.style.setProperty("--tilt-y", `${x}deg`);
      element.dataset.tilting = "true";
    });
  };
  const resetTilt = () => {
    cancelAnimationFrame(pointerFrame.current);
    tilt.current?.style.removeProperty("--tilt-x");
    tilt.current?.style.removeProperty("--tilt-y");
    if (tilt.current) delete tilt.current.dataset.tilting;
  };
  const style = {
    "--rank-order": theme.order, "--rank-header": theme.header, "--rank-border": theme.border,
    "--rank-ink": theme.ink, "--rank-label-surface": theme.labelSurface, "--rank-vote-ink": theme.voteInk, "--rank-tint": theme.tint,
    "--rank-glow": theme.glow, "--rank-badge": theme.badge, "--rank-entrance": theme.entrance,
    "--rank-delay": `${delay}ms`, "--rank-mobile-delay": `${rank * 200}ms`,
    "--rank-duration": `${theme.duration}ms`, "--rank-shine-delay": `${theme.shine}ms`,
  } as CSSProperties;
  return <div className={`rank-slot rank-slot-${rank}`} style={style}>
    <div className={`rank-reveal ${play ? "rank-playing" : ""} ${entering ? "rank-entering" : ""} ${complete ? "rank-complete" : ""}`} inert={!play && !reduced} onAnimationStart={event => { if (event.target === event.currentTarget) setEntering(true); }} onAnimationEnd={event => { if (event.target === event.currentTarget) { setEntering(false); setComplete(true); } }}>
      <div ref={tilt} className="rank-tilt" onPointerMove={onMove} onPointerLeave={resetTilt} onPointerCancel={resetTilt}>
        <div className="rank-glow" aria-hidden="true" />
        <article className="rank-frame" aria-label={`Hạng ${rank}: ${destination.name}`}>
          <div className="rank-surface">
            <div className="rank-visual">
              <header className="rank-header"><span><Icon size={18} strokeWidth={1.8} />{theme.label}</span><span className="rank-badge-plate"><strong className="rank-badge">0{rank}</strong></span></header>
              <div className="rank-photo"><DestinationImage src={destination.image.src} alt={destination.name} region={destination.region} /><div className="rank-photo-shade" /><span className="rank-code">{destination.id}</span><div className="rank-place"><p><MapPin size={12} />{destination.province}</p><h3>{destination.name}</h3></div></div>
              <div className="rank-shine" aria-hidden="true" />
              {rank === 1 && <div className="rank-sparkles" aria-hidden="true">{SPARKLES.map((sparkle, index) => <span key={index} style={{ left:sparkle.x, top:sparkle.y, "--sparkle-delay":`${sparkle.delay + 1000}ms` } as CSSProperties}><FourPointStar /></span>)}</div>}
            </div>
            <div className="rank-body"><p>{destination.summary}</p><div className="rank-actions"><div className="rank-vote-count"><span>Lượt bình chọn</span><strong><span className="sr-only">{destination.votes.toLocaleString("vi-VN")}</span><span className="rank-count-motion" aria-hidden="true">{count.toLocaleString("vi-VN")}</span><span className="rank-count-final" aria-hidden="true">{destination.votes.toLocaleString("vi-VN")}</span></strong></div><button className="vote-button" disabled={voted} onClick={() => handleVoteClick(toVotingDestination(destination))}>{voted ? <Check size={16} /> : <Heart size={16} />}{voted ? "Đã chọn" : "Bình chọn"}</button></div></div>
          </div>
        </article>
        {rank === 1 && <div className="rank-burst" aria-hidden="true">{BURST.map(([x,y,rotation], index) => <span key={index} style={{ "--burst-x":`${x}px`, "--burst-y":`${y}px`, "--burst-turn":`${rotation}deg` } as CSSProperties}><FourPointStar /></span>)}</div>}
      </div>
    </div>
  </div>;
}
