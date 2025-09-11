"use client";

import { InvestmentCard } from "@/components/invest/InvestmentCard";
import { Confetti } from "@/components/invest/Confetti";
import { investments } from "@/data/investments";
import { useAppContext } from "@/contexts/AppContext";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function InvestScreen() {
    const { buyInvestment } = useAppContext();
    const [purchaseSuccess, setPurchaseSuccess] = useState(0);
    const { toast } = useToast();

    const handleBuy = async (investment: typeof investments[0]) => {
        const success = await buyInvestment(investment);
        if (success) {
            setPurchaseSuccess(prev => prev + 1);
        } else {
            toast({
                title: "Not enough funds",
                description: "You don't have enough ET to buy this investment.",
                variant: "destructive"
            });
        }
    }

    return (
        <div className="p-4 relative">
            <Confetti key={purchaseSuccess} />
            <h1 className="font-headline text-3xl font-bold mb-6 text-center">Investments</h1>
            <div className="grid grid-cols-1 gap-4">
                {investments.map((investment) => (
                    <InvestmentCard 
                        key={investment.id} 
                        investment={investment}
                        onBuy={() => handleBuy(investment)}
                    />
                ))}
            </div>
        </div>
    );
}
