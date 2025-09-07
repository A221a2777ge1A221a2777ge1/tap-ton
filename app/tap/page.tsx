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
  const [isQualified, setIsQualified] = useState(false);
  const { tonConnectUI, wallet, connected } = useTonConnect();

  useEffect(() => {
    const auth = getAuth(app);
    const db = getFirestore(app);

    const unsubscribe = onAuthStateChanged(auth, async (user: any) => {
      if (user) {
        setUser(user);
        const userRef = doc(db, 'users', user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const userData: any = userSnap.data();
          setTaps(userData.taps || 0);
          setBalance(userData.balance || 0);
          setPassiveIncome(userData.passiveIncome || 0);
          setIsQualified(userData.isQualified || false);
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
  }, [tonConnectUI]);

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
    return new Intl.NumberFormat().format(num);
  };

  return (
    <div className="relative">
      <div className="relative z-10 container mx-auto p-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Tap to Earn</h1>
            <p className="text-white/70">Grow your African empire by tapping</p>
          </div>
          <TonConnectWrapper />
        </div>

        {user ? (
          <div className="max-w-4xl mx-auto">
            {/* Welcome Section */}
            <div className="bg-white/5 rounded-2xl p-6 mb-8 border border-white/10">
              <h2 className="text-2xl font-bold text-white mb-2">
                Welcome, {getTelegramUser()?.first_name || 'Tycoon'}! 👑
              </h2>
              <p className="text-yellow-100">
                {tonConnectUI.wallet ? 
                  "🎉 Your TON wallet is connected! You're eligible for real cryptocurrency rewards!" :
                  "Connect your TON wallet to qualify for real TON payments from the super admin!"
                }
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white/5 rounded-xl p-6 border border-white/10 text-center">
                <div className="text-3xl mb-2">💰</div>
                <div className="text-2xl font-bold text-white">{formatNumber(balance)}</div>
                <div className="text-yellow-100">CT Balance</div>
              </div>
              <div className="bg-white/5 rounded-xl p-6 border border-white/10 text-center">
                <div className="text-3xl mb-2">👆</div>
                <div className="text-2xl font-bold text-white">{formatNumber(taps)}</div>
                <div className="text-yellow-100">Total Taps</div>
              </div>
              <div className="bg-white/5 rounded-xl p-6 border border-white/10 text-center">
                <div className="text-3xl mb-2">📈</div>
                <div className="text-2xl font-bold text-white">{formatNumber(passiveIncome)}</div>
                <div className="text-yellow-100">CT/s Income</div>
              </div>
            </div>

            {/* Tap Section */}
            <div className="bg-white/5 rounded-2xl p-8 mb-8 border border-white/10 text-center">
              <h3 className="text-2xl font-bold text-white mb-6">Tap to Earn CT Tokens</h3>
              <button
                onClick={handleTap}
                className="w-48 h-48 bg-gradient-to-br from-yellow-300 to-orange-600 rounded-full shadow-[0_25px_60px_-20px_#f59e0b] transform hover:scale-105 transition-all duration-200 flex items-center justify-center mx-auto mb-6"
              >
                <div className="text-center">
                  <div className="text-6xl font-bold text-white mb-2">CT</div>
                  <div className="text-white font-semibold">Crypto Tycoon</div>
                </div>
              </button>
              <p className="text-white/80 text-lg">
                Each tap earns you 1 CT token. Build your African investment empire!
              </p>
            </div>

            {/* Qualification Status */}
            <div className={`rounded-xl p-6 mb-8 border ${
              connected && wallet ? 
                'bg-green-500/10 border-green-400/40' : 
                'bg-yellow-500/10 border-yellow-400/40'
            }`}>
              <div className="flex items-center gap-4">
                <div className="text-4xl">
                  {connected && wallet ? '✅' : '⚠️'}
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white">
                    {connected && wallet ? 'TON Wallet Connected!' : 'Connect TON Wallet'}
                  </h4>
                  <p className="text-white/80">
                    {connected && wallet ? 
                      `You qualify for real TON payments! Address: ${wallet.account.address.slice(0, 8)}...${wallet.account.address.slice(-8)}` :
                      'Connect your TON wallet to qualify for real cryptocurrency rewards!'
                    }
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <h4 className="text-xl font-bold text-white mb-4">🏠 African Investments</h4>
                <p className="text-yellow-100 mb-4">
                  Invest your CT tokens in African real estate, agriculture, and technology
                </p>
                <button className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-indigo-600 hover:to-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200">
                  View Investments
                </button>
              </div>
              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <h4 className="text-xl font-bold text-white mb-4">🏆 Leaderboard</h4>
                <p className="text-yellow-100 mb-4">
                  Compete with 300+ players for the top 50 positions and TON rewards
                </p>
                <button className="bg-gradient-to-r from-purple-500 to-fuchsia-600 hover:from-fuchsia-600 hover:to-purple-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200">
                  View Rankings
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto"></div>
            <p className="text-white/80 mt-4">Loading your empire...</p>
          </div>
        )}
      </div>
    </div>
  );
}
