"use client";

import type { Screen } from "@/app/page";
import { cn } from "@/lib/utils";
import { HandCoins, Landmark, Trophy, Wallet } from "lucide-react";
import type { Dispatch, SetStateAction } from "react";

interface BottomNavProps {
  activeScreen: Screen;
  setActiveScreen: Dispatch<SetStateAction<Screen>>;
}

const navItems: { screen: Screen; label: string; icon: React.ElementType }[] = [
  { screen: "tap", label: "Tap", icon: HandCoins },
  { screen: "invest", label: "Invest", icon: Landmark },
  { screen: "leaderboard", label: "Top", icon: Trophy },
  { screen: "wallet", label: "Wallet", icon: Wallet },
];

export function BottomNav({ activeScreen, setActiveScreen }: BottomNavProps) {
  return (
    <nav className="flex justify-around items-center h-20 bg-card border-t border-border">
      {navItems.map(({ screen, label, icon: Icon }) => (
        <button
          key={screen}
          onClick={() => setActiveScreen(screen)}
          className={cn(
            "flex flex-col items-center justify-center gap-1 p-2 transition-colors duration-200 w-full h-full",
            activeScreen === screen
              ? "text-primary"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <Icon
            className="w-7 h-7"
            strokeWidth={activeScreen === screen ? 2.5 : 2}
          />
          <span className="text-xs font-medium">{label}</span>
        </button>
      ))}
    </nav>
  );
}
