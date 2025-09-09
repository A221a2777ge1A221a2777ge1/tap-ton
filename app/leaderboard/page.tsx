'use client';

import { useState, useEffect } from 'react';

interface LeaderboardEntry {
  address: string;
  balance: number;
}

export default function LeaderboardPage() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);

  useEffect(() => {
    fetch('/api/leaderboard')
      .then(res => res.json())
      .then(data => setLeaderboard(data));
  }, []);

  return (
    <div className="flex flex-col items-center min-h-screen bg-black text-white p-4">
      <h1 className="text-4xl font-bold mb-4">Leaderboard</h1>
      <div className="w-full max-w-md">
        {leaderboard.map((entry, index) => (
          <div key={entry.address} className="flex justify-between items-center p-2 border-b border-gray-700">
            <p>{index + 1}. {entry.address.substring(0, 10)}...</p>
            <p>{entry.balance} ET</p>
          </div>
        ))}
      </div>
    </div>
  );
}
