import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

// Mock data for now
const leaderboardData = [
  { name: "Player 1", income: 10000 },
  { name: "Player 2", income: 8000 },
  { name: "Player 3", income: 5000 },
  { name: "Player 4", income: 2000 },
  { name: "Player 5", income: 1000 },
];

export default function LeaderboardSection() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Leaderboard</CardTitle>
      </CardHeader>
      <CardContent>
        <ol className="space-y-2">
          {leaderboardData.map((player, index) => (
            <li key={index} className="flex justify-between">
              <span>{player.name}</span>
              <span>{player.income.toLocaleString()}/s</span>
            </li>
          ))}
        </ol>
      </CardContent>
    </Card>
  );
}
