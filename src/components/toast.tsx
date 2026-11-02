"use client";

import React from "react";
import { useVoting } from "@/context/voting-context";
import { CheckCircle2 } from "lucide-react";

export function Toast() {
  const { toastMessage } = useVoting();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 max-w-md w-[90%] sm:w-auto animate-in fade-in slide-in-from-bottom-4 duration-300 pointer-events-none">
      <div className="rounded-2xl bg-[#1B2B22]/95 backdrop-blur-md text-white px-5 py-3.5 shadow-2xl border border-[#7CB342]/30 flex items-center gap-3">
        <CheckCircle2 className="h-5 w-5 text-[#7CB342] shrink-0" />
        <p className="text-xs sm:text-sm font-medium leading-snug">
          {toastMessage}
        </p>
      </div>
    </div>
  );
}
