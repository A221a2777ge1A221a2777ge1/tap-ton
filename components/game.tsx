"use client";

import { useState, useEffect } from "react";
import Header from "./header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TapSection from "./tap-section";
import InvestmentsSection from "./investments-section";
import LeaderboardSection from "./leaderboard-section";

export interface GameState {
  currency: number;
  passiveIncome: number;
  investments: Record<string, number>;
}

export default function Game() {
  const [gameState, setGameState] = useState<GameState>(() => {
    if (typeof window !== 'undefined') {
        const savedGame = localStorage.getItem("gameState");
        if (savedGame) {
            return JSON.parse(savedGame);
        }    
    }
    return {
      currency: 0,
      passiveIncome: 0,
      investments: {},
    };
  });

  useEffect(() => {
    localStorage.setItem("gameState", JSON.stringify(gameState));
  }, [gameState]);

  useEffect(() => {
    const gameLoop = setInterval(() => {
      setGameState((prev) => ({...prev, currency: prev.currency + prev.passiveIncome}));
    }, 1000);
    return () => clearInterval(gameLoop);
  }, [gameState.passiveIncome]);

  const handleTap = () => {
    setGameState((prev) => ({ ...prev, currency: prev.currency + 1 }));
  };

  const handlePurchase = (cost: number, income: number, investmentId: string) => {
    if (gameState.currency >= cost) {
      setGameState((prev) => ({
        ...prev,
        currency: prev.currency - cost,
        passiveIncome: prev.passiveIncome + income,
        investments: {
          ...prev.investments,
          [investmentId]: (prev.investments[investmentId] || 0) + 1,
        },
      }));
    }
  };

  return (
    <>
      <Header currency={gameState.currency} passiveIncome={gameState.passiveIncome} />
      <Tabs defaultValue="tap" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-transparent">
          <TabsTrigger value="tap" className="data-[state=active]:bg-card data-[state=active]:shadow-none">Tap</TabsTrigger>
          <TabsTrigger value="invest" className="data-[state=active]:bg-card data-[state=active]:shadow-none">Invest</TabsTrigger>
          <TabsTrigger value="leaderboard" className="data-[state=active]:bg-card data-[state=active]:shadow-none">Leaderboard</TabsTrigger>
        </TabsList>
        <TabsContent value="tap">
          <TapSection handleTap={handleTap} />
        </TabsContent>
        <TabsContent value="invest">
          <InvestmentsSection handlePurchase={handlePurchase} gameState={gameState} />
        </TabsContent>
        <TabsContent value="leaderboard">
          <LeaderboardSection />
        </TabsContent>
      </Tabs>
    </>
  );
}
