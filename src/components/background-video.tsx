"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { CAMPAIGN_POSTER, VIMEO_EMBED_URL } from "@/lib/media";

const VIMEO_ORIGIN = new URL(VIMEO_EMBED_URL).origin;

export function BackgroundVideo() {
  const reducedMotion = useReducedMotion();
  const [canPlayVideo, setCanPlayVideo] = useState(false);
  const player = useRef<HTMLIFrameElement>(null);
  const showPlayer = canPlayVideo && !reducedMotion;
  const background = useRef<HTMLDivElement>(null);
  const overlay = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const connection = (navigator as Navigator & { connection?: EventTarget & { saveData?: boolean } }).connection;
    const update = () => setCanPlayVideo(!connection?.saveData);

    update();
    connection?.addEventListener("change", update);
    return () => {
      connection?.removeEventListener("change", update);
    };
  }, []);

  useEffect(() => {
    const iframe = player.current;
    if (!showPlayer || !iframe) return;

    const send = (method: string, value?: string) => {
      iframe.contentWindow?.postMessage({ method, value }, VIMEO_ORIGIN);
    };
    const ping = () => send("ping");

    const handleMessage = (message: MessageEvent) => {
      if (message.origin !== VIMEO_ORIGIN || message.source !== iframe.contentWindow) return;

      let data = message.data;
      if (typeof data === "string") {
        try {
          data = JSON.parse(data);
        } catch {
          return;
        }
      }
      if (!data) return;

      if (data.event === "ready" || data.method === "ping") {
        send("addEventListener", "playing");
        send("getPaused");
      }
      if (data.event === "playing" || (data.method === "getPaused" && data.value === false)) {
        iframe.style.opacity = "1";
      }
    };

    window.addEventListener("message", handleMessage);
    iframe.addEventListener("load", ping);
    ping();
    return () => {
      iframe.removeEventListener("load", ping);
      window.removeEventListener("message", handleMessage);
    };
  }, [showPlayer]);

  useEffect(() => {
    const shade = overlay.current;
    if (!shade) return;

    const update = () => {
      const progress = Math.min(1, Math.max(0, window.scrollY / window.innerHeight));
      shade.style.opacity = String(0.35 + progress * 0.45);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div
      ref={background}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#08291D] bg-cover bg-center"
      style={{ backgroundImage: `url("${CAMPAIGN_POSTER}")` }}
    >
      {showPlayer && (
        <iframe
          ref={player}
          src={VIMEO_EMBED_URL}
          title="Video giới thiệu du lịch nông thôn Việt Nam"
          allow="autoplay"
          tabIndex={-1}
          className="pointer-events-none absolute top-1/2 left-1/2 h-[max(100%,56.25vw)] w-[max(100%,177.78vh)] -translate-x-1/2 -translate-y-1/2 border-0 opacity-0"
        />
      )}
      <div
        ref={overlay}
        className="absolute inset-0 bg-black pointer-events-none transition-opacity duration-150"
        style={{ opacity: 0.35 }}
      />
    </div>
  );
}
