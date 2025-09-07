'use client';

import { useEffect, useState } from 'react';
import { getFirestore, collection, query, where, orderBy, getDocs } from 'firebase/firestore';
import { app } from '@/lib/firebase';

interface LeaderboardUser {
  id: string;
  displayName: string;
  balance: number;
  walletAddress: string;
}

export default function LeaderboardPage() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      const db = getFirestore(app);
      const usersRef = collection(db, 'users');
      const q = query(
        usersRef,
        where('walletConnected', '==', true),
        orderBy('balance', 'desc')
      );

      const querySnapshot = await getDocs(q);
      const leaderboardData: LeaderboardUser[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        leaderboardData.push({
          id: doc.id,
          displayName: data.displayName || 'Anonymous',
          balance: data.balance || 0,
          walletAddress: data.wallet || 'N/A',
        });
      });

      setLeaderboard(leaderboardData);
      setLoading(false);
    };

    fetchLeaderboard();
  }, []);

  const formatNumber = (num: number) => {
    if (num >= 1e12) return `${(num / 1e12).toFixed(2)}T`;
    if (num >= 1e9) return `${(num / 1e9).toFixed(2)}B`;
    if (num >= 1e6) return `${(num / 1e6).toFixed(2)}M`;
    if (num >= 1e3) return `${(num / 1e3).toFixed(2)}K`;
    return new Intl.NumberFormat().format(num);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="relative z-10 container mx-auto p-4">
        <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold text-white drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]">
              Leaderboard
            </h1>
            <p className="text-lg text-teal-300 mt-2">Top investors in the Evana Tycoon ecosystem.</p>
        </div>

        {loading ? (
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-400 mx-auto"></div>
            <p className="text-gray-400 mt-4">Loading rankings...</p>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/30">
            <ul className="space-y-4">
              {leaderboard.map((user, index) => (
                <li key={user.id} className="grid grid-cols-12 items-center bg-gray-700/50 p-4 rounded-lg border border-teal-500/30 hover:bg-purple-600/30 transition-colors">
                  <div className="col-span-1 text-2xl font-bold text-purple-300">{index + 1}</div>
                  <div className="col-span-5">
                    <p className="font-bold text-lg text-white">{user.displayName}</p>
                    <p className="text-xs text-gray-400 truncate">{user.walletAddress}</p>
                  </div>
                  <div className="col-span-5 text-right font-bold text-xl text-teal-300">{formatNumber(user.balance)} ET</div>
                  <div className="col-span-1 text-right text-2xl">{index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : ''}</div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
