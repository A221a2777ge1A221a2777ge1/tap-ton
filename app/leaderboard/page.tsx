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
  walletConnected?: boolean;
  taps?: number;
}

// Generate 300 African names for the leaderboard
const generateAfricanNames = () => {
  const firstNames = [
    "Adebayo", "Amara", "Kwame", "Fatima", "Musa", "Ngozi", "Kofi", "Aisha", "Tunde", "Zara",
    "Oluwaseun", "Mariam", "Chinedu", "Aminata", "Babatunde", "Kemi", "Emeka", "Hawa", "Ibrahim", "Nneka",
    "Yusuf", "Adunni", "Obi", "Khadija", "Segun", "Folake", "Chidi", "Aminah", "Tolu", "Zainab",
    "Okechukwu", "Blessing", "Mohammed", "Grace", "Adeyemi", "Peace", "Chukwu", "Faith", "Oluwafemi", "Hope",
    "Adebisi", "Joy", "Chinedum", "Mercy", "Oluwaseyi", "Patience", "Emmanuel", "Priscilla", "Oluwatosin", "Ruth",
    "Adebola", "Sarah", "Chukwudi", "Esther", "Oluwadamilare", "Mary", "Chinedu", "Elizabeth", "Oluwaseun", "Rebecca",
    "Adeyinka", "Deborah", "Chukwuemeka", "Hannah", "Oluwafunmilayo", "Naomi", "Chinedu", "Rachel", "Oluwaseun", "Leah",
    "Adebayo", "Miriam", "Chukwuma", "Abigail", "Oluwaseun", "Ruth", "Chinedu", "Esther", "Oluwaseun", "Sarah",
    "Adeyemi", "Mary", "Chukwudi", "Elizabeth", "Oluwaseun", "Rebecca", "Chinedu", "Deborah", "Oluwaseun", "Hannah",
    "Adebisi", "Naomi", "Chukwuemeka", "Rachel", "Oluwaseun", "Leah", "Chinedu", "Miriam", "Oluwaseun", "Abigail"
  ];
  
  const lastNames = [
    "Adebayo", "Okoro", "Traoré", "Al-Hassan", "Nkrumah", "Okafor", "Diallo", "Mensah", "Ibrahim", "Obi",
    "Sow", "Adeyemi", "Keita", "Okafor", "Traoré", "Nkrumah", "Diallo", "Mensah", "Ibrahim", "Obi",
    "Sow", "Adeyemi", "Keita", "Okafor", "Traoré", "Nkrumah", "Diallo", "Mensah", "Ibrahim", "Obi",
    "Sow", "Adeyemi", "Keita", "Okafor", "Traoré", "Nkrumah", "Diallo", "Mensah", "Ibrahim", "Obi",
    "Sow", "Adeyemi", "Keita", "Okafor", "Traoré", "Nkrumah", "Diallo", "Mensah", "Ibrahim", "Obi",
    "Sow", "Adeyemi", "Keita", "Okafor", "Traoré", "Nkrumah", "Diallo", "Mensah", "Ibrahim", "Obi",
    "Sow", "Adeyemi", "Keita", "Okafor", "Traoré", "Nkrumah", "Diallo", "Mensah", "Ibrahim", "Obi",
    "Sow", "Adeyemi", "Keita", "Okafor", "Traoré", "Nkrumah", "Diallo", "Mensah", "Ibrahim", "Obi",
    "Sow", "Adeyemi", "Keita", "Okafor", "Traoré", "Nkrumah", "Diallo", "Mensah", "Ibrahim", "Obi",
    "Sow", "Adeyemi", "Keita", "Okafor", "Traoré", "Nkrumah", "Diallo", "Mensah", "Ibrahim", "Obi"
  ];
  
  const names = [];
  for (let i = 0; i < 300; i++) {
    const firstName = firstNames[i % firstNames.length];
    const lastName = lastNames[i % lastNames.length];
    names.push(`${firstName} ${lastName}`);
  }
  return names;
};

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      const db = getFirestore(app);
      const usersCol = collection(db, 'users');
      const q = query(usersCol, orderBy('balance', 'desc'), limit(300));
      const usersSnapshot = await getDocs(q);
      
      // If we have real users, use them, otherwise generate mock data
      if (usersSnapshot.docs.length > 0) {
        const leaderboardData = usersSnapshot.docs.map(doc => ({
          uid: doc.id,
          ...doc.data()
        })) as LeaderboardEntry[];
        setLeaderboard(leaderboardData);
      } else {
        // Generate mock leaderboard data
        const names = generateAfricanNames();
        const mockData = names.map((name, index) => ({
          uid: `mock_${index}`,
          displayName: name,
          balance: Math.max(200000000 - (index * 500000) + Math.floor(Math.random() * 100000), 1000000),
          walletConnected: index < 50, // Top 50 have connected wallets
          taps: Math.floor(Math.random() * 10000) + 1000
        }));
        setLeaderboard(mockData);
      }
      setLoading(false);
    };

    fetchLeaderboard();
  }, []);

  const getRankIcon = (rank: number) => {
    if (rank === 1) return '👑';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    if (rank <= 10) return '🏆';
    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700">
      {/* African Pattern Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-32 h-32 bg-white rounded-full"></div>
        <div className="absolute top-40 right-32 w-24 h-24 bg-black rounded-full"></div>
        <div className="absolute bottom-32 left-40 w-28 h-28 bg-white rounded-full"></div>
        <div className="absolute bottom-20 right-20 w-20 h-20 bg-black rounded-full"></div>
      </div>

      <div className="relative z-10 container mx-auto p-4">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-white drop-shadow-lg mb-4">
            🏆 African Tycoon Leaderboard
          </h1>
          <p className="text-blue-100 text-xl">
            Top 300 African investors competing for TON rewards
          </p>
          <div className="bg-yellow-500/20 backdrop-blur-sm rounded-xl p-4 mt-6 border border-yellow-400/30 max-w-2xl mx-auto">
            <p className="text-yellow-100 font-semibold">
              🎯 Only the top 50 players with connected TON wallets qualify for real cryptocurrency payments!
            </p>
          </div>
        </div>

        {loading ? (
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto"></div>
            <p className="text-white mt-4">Loading leaderboard...</p>
          </div>
        ) : (
          <div className="max-w-6xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="border-b border-white/20">
                      <th className="py-4 px-6 text-left text-white font-bold">Rank</th>
                      <th className="py-4 px-6 text-left text-white font-bold">Tycoon</th>
                      <th className="py-4 px-6 text-right text-white font-bold">CT Balance</th>
                      <th className="py-4 px-6 text-center text-white font-bold">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leaderboard.map((user, index) => {
                      const rank = index + 1;
                      const isQualified = rank <= 50 && user.walletConnected;
                      
                      return (
                        <tr 
                          key={user.uid} 
                          className={`border-b border-white/10 hover:bg-white/5 transition-colors ${
                            rank <= 10 ? 'bg-gradient-to-r from-yellow-500/10 to-orange-500/10' : ''
                          }`}
                        >
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-2">
                              {getRankIcon(rank) && <span className="text-2xl">{getRankIcon(rank)}</span>}
                              <span className="text-white font-bold text-lg">#{rank}</span>
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <div className="text-white font-semibold text-lg">{user.displayName}</div>
                            <div className="text-blue-200 text-sm">{user.taps?.toLocaleString()} taps</div>
                          </td>
                          <td className="py-4 px-6 text-right">
                            <div className="text-white font-bold text-lg">{formatNumber(user.balance)} CT</div>
                          </td>
                          <td className="py-4 px-6 text-center">
                            {isQualified ? (
                              <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                                ✅ Qualified
                              </span>
                            ) : (
                              <span className="bg-gray-500 text-white px-3 py-1 rounded-full text-sm">
                                {rank <= 50 ? '🔗 Connect Wallet' : 'Not Qualified'}
                              </span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 text-center">
                <div className="text-3xl font-bold text-white">300</div>
                <div className="text-blue-100">Total Players</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 text-center">
                <div className="text-3xl font-bold text-white">50</div>
                <div className="text-blue-100">TON Qualified</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 text-center">
                <div className="text-3xl font-bold text-white">24/7</div>
                <div className="text-blue-100">Competition</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
