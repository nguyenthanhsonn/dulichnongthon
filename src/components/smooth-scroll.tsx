"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { frame, cancelFrame } from "motion";

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

/**
 * Tích hợp Lenis Smooth Scroll với Motion Animation Loop
 * Tham chiếu chính thức: https://motion.dev/examples/js-lenis-smooth-scroll
 */
export function SmoothScroll() {
  useEffect(() => {
    // Tôn trọng thiết lập prefers-reduced-motion của người dùng
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    // Khởi tạo Lenis với autoRaf: false theo đúng đặc tả của motion.dev
    const lenis = new Lenis({
      autoRaf: false,
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
      infinite: false,
    });

    // Đồng bộ frame scheduler của Motion để chạy Lenis
    const update = (data: { timestamp: number } | number) => {
      const time = typeof data === "number" ? data : (data?.timestamp ?? performance.now());
      lenis.raf(time);
    };

    frame.update(update, true);

    // Lưu instance vào window để các component khác có thể gọi scrollTo
    window.__lenis = lenis;

    // Bắt sự kiện click các anchor link (#...) để cuộn mượt bằng Lenis
    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest("a");
      if (!target) return;
      const href = target.getAttribute("href");
      if (href && href.startsWith("#") && href.length > 1) {
        const targetElement = document.querySelector(href);
        if (targetElement) {
          e.preventDefault();
          lenis.scrollTo(targetElement as HTMLElement, { offset: -70 });
        }
      }
    };
    document.addEventListener("click", handleAnchorClick);

    return () => {
      cancelFrame(update);
      document.removeEventListener("click", handleAnchorClick);
      lenis.destroy();
      delete window.__lenis;
    };
  }, []);

  return null;
}
