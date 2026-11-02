"use client";
import { ReactNode } from "react";
interface RevealProps { children: ReactNode; className?: string; delay?: number; direction?: "up" | "down" | "left" | "right" | "fade"; }
export function RevealOnScroll({ children, className = "", delay = 0, direction = "up" }: RevealProps) {
  return <div data-aos={direction === "fade" ? "fade" : `fade-${direction}`} data-aos-delay={delay} className={className}>{children}</div>;
}
