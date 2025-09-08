'use client';

import { useEffect, useState } from 'react';
import { getAuth, signInAnonymously, onAuthStateChanged, User } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { app } from '@/lib/firebase';
import { getTelegramUser } from '@/lib/telegram';
import { TonConnectWrapper, useTonConnect } from '../../components/TonConnectWrapper';

export default function TapPage() {
  const [user, setUser] = useState<User | null>(null);
  const [taps, setTaps] = useState(0);
  const [balance, setBalance] = useState(0);
  const [passiveIncome, setPassiveIncome] = useState(0);
  const { tonConnectUI, wallet, connected } = useTonConnect();

  useEffect(() => {
    const auth = getAuth(app);
    const db = getFirestore(app);

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        const userRef = doc(db, 'users', user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const userData = userSnap.data();
          setTaps(userData.taps || 0);
          setBalance(userData.balance || 0);
          setPassiveIncome(userData.passiveIncome || 0);
        } else {
          const tgUser = getTelegramUser();
          if (tgUser) {
            await setDoc(userRef, {
              tgId: tgUser.tgId,
              displayName: tgUser.first_name,
              username: tgUser.username,
              taps: 0,
              balance: 0,
              passiveIncome: 0,
              isQualified: false,
              createdAt: new Date(),
            });
          }
        }

        if (connected && wallet) {
          updateDoc(userRef, {
            wallet: wallet.account.address,
            walletConnected: true
          });
        }

      } else {
        signInAnonymously(auth);
      }
    });

    return () => unsubscribe();
  }, [connected, wallet]);

  const handleTap = async () => {
    if (!user) return;
    
    const db = getFirestore(app);
    const userRef = doc(db, 'users', user.uid);
    const newTaps = taps + 1;
    const newBalance = balance + 1;
    
    setTaps(newTaps);
    setBalance(newBalance);
    
    await updateDoc(userRef, {
      taps: newTaps,
      balance: newBalance,
    });
  };

  const formatNumber = (num: number) => {
    if (num >= 1e12) return `${(num / 1e12).toFixed(2)}T`;
    if (num >= 1e9) return `${(num / 1e9).toFixed(2)}B`;
    if (num >= 1e6) return `${(num / 1e6).toFixed(2)}M`;
    if (num >= 1e3) return `${(num / 1e3).toFixed(2)}K`;
    return new Intl.NumberFormat().format(num);
  };

  return (
    <div className="min-h-screen text-white">
      {/* Neon Glow Background */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-20 left-20 w-32 h-32 bg-purple-600 rounded-full filter blur-3xl"></div>
        <div className="absolute top-40 right-32 w-24 h-24 bg-blue-500 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-32 left-40 w-28 h-28 bg-pink-500 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-20 h-20 bg-teal-400 rounded-full filter blur-3xl"></div>
      </div>

      <div className="relative z-10 container mx-auto p-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white drop-shadow-[0_0_10px_rgba(168,85,247,0.7)]">Evana Tycoon</h1>
            <p className="text-teal-300">Build Your African Investment Empire</p>
          </div>
          <TonConnectWrapper />
        </div>

        {user ? (
          <div className="max-w-4xl mx-auto">
            {/* Welcome Section */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-purple-500/30">
              <h2 className="text-2xl font-bold text-white mb-2">
                Welcome, {getTelegramUser()?.first_name || 'Tycoon'}! 👑
              </h2>
              <p className="text-teal-300">
                {tonConnectUI && tonConnectUI.wallet ? 
                  "🎉 Your TON wallet is connected! You're eligible for exclusive rewards!" :
                  "Connect your TON wallet to supercharge your earnings!"
                }
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-purple-500/30 text-center shadow-lg">
                <div className="text-3xl mb-2">💰</div>
                <div className="text-2xl font-bold text-purple-300">{formatNumber(balance)}</div>
                <div className="text-gray-400">ET Coins</div>
              </div>
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-teal-500/30 text-center shadow-lg">
                <div className="text-3xl mb-2">👆</div>
                <div className="text-2xl font-bold text-teal-300">{formatNumber(taps)}</div>
                <div className="text-gray-400">Total Taps</div>
              </div>
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-pink-500/30 text-center shadow-lg">
                <div className="text-3xl mb-2">📈</div>
                <div className="text-2xl font-bold text-pink-300">{formatNumber(passiveIncome)}</div>
                <div className="text-gray-400">ET/s Income</div>
              </div>
            </div>

            {/* Tap Section */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 mb-8 border border-purple-500/30 text-center">
              <h3 className="text-2xl font-bold text-white mb-6">Tap to Earn ET Coins</h3>
              <button
                onClick={handleTap}
                className="w-48 h-48 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full shadow-2xl shadow-purple-500/50 transform hover:scale-105 transition-all duration-200 flex items-center justify-center mx-auto mb-6"
              >
                <div className="text-center">
                  <div className="text-6xl font-bold text-white mb-2">ET</div>
                  <div className="text-white font-semibold">Evana Tycoon</div>
                </div>
              </button>
              <p className="text-teal-300 text-lg">
                Each tap earns you 1 ET Coin. Grow your empire!
              </p>
            </div>

            {/* Investment Categories */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-teal-500/30">
              <h3 className="text-2xl font-bold text-white mb-6">Investments</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Real Estate */}
                <div className="bg-gray-700/50 p-4 rounded-lg border border-purple-500/50">
                  <h4 className="text-xl font-bold text-purple-300 mb-2">Real Estate</h4>
                  <p className="text-gray-400 mb-4">Invest in high-yield properties across Africa.</p>
                  <button className="bg-purple-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors w-full">View</button>
                </div>
                {/* Agriculture */}
                <div className="bg-gray-700/50 p-4 rounded-lg border border-teal-500/50">
                  <h4 className="text-xl font-bold text-teal-300 mb-2">Agriculture</h4>
                  <p className="text-gray-400 mb-4">Fund farms and export valuable crops.</p>
                  <button className="bg-teal-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-teal-700 transition-colors w-full">View</button>
                </div>
                {/* Technology */}
                <div className="bg-gray-700/50 p-4 rounded-lg border border-pink-500/50">
                  <h4 className="text-xl font-bold text-pink-300 mb-2">Technology</h4>
                  <p className="text-gray-400 mb-4">Back innovative African tech startups.</p>
                  <button className="bg-pink-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-pink-700 transition-colors w-full">View</button>
                </div>
                {/* Politics */}
                <div className="bg-gray-700/50 p-4 rounded-lg border border-yellow-500/50">
                  <h4 className="text-xl font-bold text-yellow-300 mb-2">Politics</h4>
                  <p className="text-gray-400 mb-4">Influence policy and gain powerful allies.</p>
                  <button className="bg-yellow-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-yellow-700 transition-colors w-full">View</button>
                </div>
                 {/* Supermarkets / Goods & Services */}
                 <div className="bg-gray-700/50 p-4 rounded-lg border-green-500/50">
                    <h4 className="text-xl font-bold text-green-300 mb-2">Supermarkets</h4>
                    <p className="text-gray-400 mb-4">Own a chain of supermarkets across the continent.</p>
                    <button className="bg-green-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-700 transition-colors w-full">View</button>
                </div>
              </div>
            </div>

          </div>
        ) : (
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-400 mx-auto"></div>
            <p className="text-gray-400 mt-4">Loading your empire...</p>
          </div>
        )}
      </div>
    </div>
  );
}
