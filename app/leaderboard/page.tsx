"use client";

import Link from 'next/link';

const names = [
  'Kwame', 'Amina', 'Femi', 'Zuri', 'Kofi', 'Nia', 'Tariq', 'Imani', 'Jelani', 'Thandi',
  'Ade', 'Sade', 'Zola', 'Amara', 'Bayo', 'Chidi', 'Dayo', 'Efe', 'Folake', 'Gbemisola'
];

export default function LeaderboardPage() {
  const leaderboard = names.map((n, i) => ({ name: n, score: 3000 - i * 37, qualified: i < 50 }));
  return (
    <main className="min-h-[100svh] p-safe px-6 py-8">
      <h1 className="text-2xl font-extrabold">Leaderboard</h1>
      <p className="text-white/70 text-sm mt-1">Top 50 with wallets qualify for TON rewards</p>
      <ul className="mt-6 divide-y divide-white/10 rounded-2xl overflow-hidden bg-white/5">
        {leaderboard.map((row, idx) => (
          <li key={idx} className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-3">
              <span className="w-6 text-white/60">{idx + 1}</span>
              <span className="font-semibold">{row.name}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[#FFD007] font-bold">{row.score.toLocaleString()} CT</span>
              <span className={`text-xs px-2 py-1 rounded ${idx < 50 ? 'bg-green-500/20 text-green-300' : 'bg-white/10 text-white/60'}`}>
                {idx < 50 ? 'Qualified' : 'Unqualified'}
              </span>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-6">
        <Link href="/" className="text-white/60 text-sm underline underline-offset-4">Back home</Link>
      </div>
    </main>
  );
}

