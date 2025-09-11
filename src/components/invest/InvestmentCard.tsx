"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { investments, type Investment } from "@/data/investments";
import { useAppContext } from "@/contexts/AppContext";
import { formatET } from "@/lib/utils";
import { GoldIcon, OilDrumIcon, DiamondIcon, CobaltIcon } from "@/components/shared/icons";

interface InvestmentCardProps {
  investment: Investment;
  onBuy: (investment: Investment) => void;
}

const iconMap: Record<string, React.ElementType> = {
  "Gold Mine": GoldIcon,
  "Oil Well": OilDrumIcon,
  "Diamond Mine": DiamondIcon,
  "Cobalt Mine": CobaltIcon,
};

export function InvestmentCard({ investment, onBuy }: InvestmentCardProps) {
    const { state } = useAppContext();
    const Icon = iconMap[investment.name] || GoldIcon;
    const level = state.investments[investment.id] || 0;
    const price = investment.price * Math.pow(1.15, level);

    return (
        <Card className="overflow-hidden">
            <CardContent className="p-4 flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon className="w-8 h-8 text-primary" />
                </div>
                <div className="flex-grow">
                    <h3 className="font-bold text-lg">{investment.name}</h3>
                    <div className="text-sm text-muted-foreground flex gap-4">
                        <span>Lvl: {level}</span>
                        <span>+{formatET(investment.income * (level || 1))}/s</span>
                    </div>
                </div>
                <Button 
                    onClick={() => onBuy(investment)}
                    className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold flex flex-col h-auto px-4 py-2"
                >
                    <span>{formatET(price)}</span>
                    <span className="text-xs font-normal">Buy</span>
                </Button>
            </CardContent>
        </Card>
    );
}
