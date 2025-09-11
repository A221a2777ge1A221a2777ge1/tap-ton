"use client";

import { useState, type ReactNode } from "react";
import { BottomNav } from "@/components/BottomNav";
import TapScreen from "@/components/screens/TapScreen";
import InvestScreen from "@/components/screens/InvestScreen";
import LeaderboardScreen from "@/components/screens/LeaderboardScreen";
import WalletScreen from "@/components/screens/WalletScreen";

export type Screen = "tap" | "invest" | "leaderboard" | "wallet";

export default function Home() {
  const [activeScreen, setActiveScreen] = useState<Screen>("tap");

  const renderScreen = (): ReactNode => {
    switch (activeScreen) {
      case "tap":
        return <TapScreen />;
      case "invest":
        return <InvestScreen />;
      case "leaderboard":
        return <LeaderboardScreen />;
      case "wallet":
        return <WalletScreen />;
      default:
        return <TapScreen />;
    }
  };

  return (
    <main className="flex flex-col h-screen w-full max-w-md mx-auto bg-background overflow-hidden">
      <div className="flex-grow overflow-y-auto">{renderScreen()}</div>
      <BottomNav activeScreen={activeScreen} setActiveScreen={setActiveScreen} />
    </main>
  );
}
