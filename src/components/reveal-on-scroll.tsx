"use client";

import React, { useEffect, useRef, useState } from "react";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number; // Delay theo milliseconds
  direction?: "up" | "down" | "left" | "right" | "fade";
}

export function RevealOnScroll({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: RevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const getTransformClass = () => {
    if (isVisible) return "translate-x-0 translate-y-0 opacity-100 scale-100";
    switch (direction) {
      case "up":
        return "translate-y-10 opacity-0";
      case "down":
        return "-translate-y-10 opacity-0";
      case "left":
        return "translate-x-10 opacity-0";
      case "right":
        return "-translate-x-10 opacity-0";
      case "fade":
        return "opacity-0 scale-95";
    }
  };

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out will-change-transform ${getTransformClass()} ${className}`}
    >
      {children}
    </div>
  );
}
