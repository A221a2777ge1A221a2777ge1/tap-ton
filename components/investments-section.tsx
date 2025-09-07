import { investmentOptions } from "@/lib/investments";
import { GameState } from "./game";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface InvestmentsSectionProps {
  handlePurchase: (cost: number, income: number, investmentId: string) => void;
  gameState: GameState;
}

export default function InvestmentsSection({ handlePurchase, gameState }: InvestmentsSectionProps) {
  return (
    <Card>
      <CardContent className="space-y-4 pt-6">
        {investmentOptions.map((investment) => (
          <Card key={investment.id}>
            <CardHeader>
              <CardTitle>{investment.name}</CardTitle>
            </CardHeader>
            <CardContent className="flex justify-between items-center">
              <div>
                <p>Cost: {investment.cost.toLocaleString()}</p>
                <p>Income: {investment.income.toLocaleString()}/s</p>
              </div>
              <Button
                onClick={() => handlePurchase(investment.cost, investment.income, investment.id)}
                disabled={gameState.currency < investment.cost}
              >
                Buy
              </Button>
            </CardContent>
          </Card>
        ))}
      </CardContent>
    </Card>
  );
}
