"use client";

import { useAppContext } from "@/contexts/AppContext";
import { formatET } from "@/lib/utils";
import { Coins } from "lucide-react";
import { TapButton } from "@/components/tap/TapButton";
import { CoinBurst } from "../tap/CoinBurst";
import { useState, useCallback } from "react";

export default function TapScreen() {
  const { state, dispatch, passiveIncomeRate, accruedIncome } = useAppContext();
  const [burstCount, setBurstCount] = useState(0);

  const handleTap = useCallback(() => {
    dispatch({ type: "TAP" });
    setBurstCount(prev => prev + 1);
    if (typeof window !== "undefined" && window.navigator && window.navigator.vibrate) {
      window.navigator.vibrate(10);
    }
  }, [dispatch]);

  return (
    <div className="flex flex-col items-center justify-between h-full p-8 relative overflow-hidden">
      <CoinBurst key={burstCount} />
      <div className="text-center">
        <h1 className="font-headline text-4xl sm:text-5xl font-bold tracking-tighter">
          {formatET(state.balance)}
        </h1>
        <p className="text-muted-foreground">ET Balance</p>
      </div>

      <TapButton on-tap={handleTap} />

      <div className="flex flex-col items-center gap-2">
        <div className="flex items-center gap-2 text-lg">
          <Coins className="w-5 h-5 text-primary" />
          <span>+{formatET(passiveIncomeRate)}/sec</span>
        </div>
        <div className="bg-primary/20 text-primary font-bold py-1 px-3 rounded-full text-sm">
            Claimable: {formatET(accruedIncome)}
        </div>
      </div>
    </div>
  );
}
