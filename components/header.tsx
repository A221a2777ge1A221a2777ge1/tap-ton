import { PiggyBank, Coins } from "lucide-react";
import { Card } from "./ui/card";
import { ThemeToggle } from "./theme-provider";

interface HeaderProps {
  currency: number;
  passiveIncome: number;
}

export default function Header({ currency, passiveIncome }: HeaderProps) {
  return (
    <header className="mb-8">
      <div className="text-center relative">
        <h1 className="text-4xl md:text-5xl font-bold">Evana Tycoon</h1>
        <p className="text-muted-foreground">Your African Empire Awaits</p>
        <div className="absolute top-0 right-0">
          <ThemeToggle />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <Card className="p-4 flex items-center bg-card/50 border-primary/20">
          <PiggyBank className="w-8 h-8 mr-4 text-primary" />
          <div>
            <div className="text-muted-foreground">Balance</div>
            <div className="text-2xl font-bold">
              {Math.floor(currency).toLocaleString()}
            </div>
          </div>
        </Card>
        <Card className="p-4 flex items-center bg-card/50 border-primary/20">
          <Coins className="w-8 h-8 mr-4 text-primary" />
          <div>
            <div className="text-muted-foreground">Income</div>
            <div className="text-2xl font-bold">
              {passiveIncome.toLocaleString()}/s
            </div>
          </div>
        </Card>
      </div>
    </header>
  );
}
