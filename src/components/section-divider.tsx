import type { CSSProperties } from "react";
interface SectionDividerProps { fill: string; className?: string; }
export function SectionDivider({ fill, className = "" }: SectionDividerProps) {
  return <div className={`section-divider ${className}`} style={{ color: fill } as CSSProperties} aria-hidden="true"><svg viewBox="0 0 1440 72" preserveAspectRatio="none"><path d="M0 34C240 90 390-12 720 30S1180 86 1440 14V72H0Z" fill="currentColor" /></svg></div>;
}
