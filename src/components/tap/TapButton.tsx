"use client";

import { cn } from "@/lib/utils";

interface TapButtonProps {
  "on-tap": () => void;
}

export function TapButton({ "on-tap": onTap }: TapButtonProps) {
  return (
    <div className="relative flex items-center justify-center">
      <div className="absolute w-64 h-64 bg-primary/20 rounded-full animate-pulse" />
      <button
        onClick={onTap}
        className={cn(
          "relative z-10 w-48 h-48 sm:w-56 sm:h-56 rounded-full transition-transform duration-100 ease-in-out",
          "bg-gradient-to-br from-primary to-purple-600",
          "shadow-[0_0_20px_theme(colors.primary),inset_0_2px_4px_rgba(255,255,255,0.2)]",
          "active:scale-95 border-4 border-purple-400"
        )}
      >
        <span className="text-4xl font-bold text-white drop-shadow-lg font-headline">TAP</span>
      </button>
    </div>
  );
}
