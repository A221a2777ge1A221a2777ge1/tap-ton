'use client';

import { useState, useEffect } from 'react';
import { getFirestore, collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { app } from '../../lib/firebase';

const formatNumber = (num: number) => {
  return new Intl.NumberFormat().format(num);
};

interface LeaderboardEntry {
  uid: string;
  displayName: string;
  balance: number;
}

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      const db = getFirestore(app);
      const leaderboardCol = collection(db, 'leaderboard');
      const q = query(leaderboardCol, orderBy('balance', 'desc'), limit(300));
      const leaderboardSnapshot = await getDocs(q);
      const leaderboardData = leaderboardSnapshot.docs.map(doc => ({
        uid: doc.id,
        ...doc.data()
      })) as LeaderboardEntry[];
      setLeaderboard(leaderboardData);
      setLoading(false);
    };

    fetchLeaderboard();
  }, []);

  return (
    <div className="font-sans container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center my-8">Leaderboard</h1>
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white dark:bg-gray-800">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Rank</th>
                <th className="py-2 px-4 border-b">Name</th>
                <th className="py-2 px-4 border-b">Balance</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((user, index) => (
                <tr key={user.uid} className="text-center">
                  <td className="py-2 px-4 border-b">{index + 1}</td>
                  <td className="py-2 px-4 border-b">{user.displayName}</td>
                  <td className="py-2 px-4 border-b">{formatNumber(user.balance)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
