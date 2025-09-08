
'use client';

import { useEffect, useState } from 'react';
import { getAuth, signInAnonymously, onAuthStateChanged, User } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { app } from '@/lib/firebase';
import { getTelegramUser, TelegramUser } from '@/lib/telegram';
import { TonConnectButton, useTonConnectUI } from '@tonconnect/ui-react';
import { Card, CardContent } from "@/components/ui/card";
import { PiggyBank, Link, Star, TrendingUp, User as UserIcon } from 'lucide-react';

export default function TapPage() {
  const [user, setUser] = useState<User | null>(null);
  const [taps, setTaps] = useState(0);
  const [balance, setBalance] = useState(0);
  const [passiveIncome, setPassiveIncome] = useState(0);
  const [tapEffects, setTapEffects] = useState<{ id: number; x: number; y: number }[]>([]);
  const [telegramUser, setTelegramUser] = useState<TelegramUser | null>(null);

  const [tonConnectUI] = useTonConnectUI();

  useEffect(() => {
    const tgUser = getTelegramUser();
    setTelegramUser(tgUser);

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

        if (tonConnectUI.connected && tonConnectUI.wallet) {
          updateDoc(userRef, {
            wallet: tonConnectUI.wallet.account.address,
            walletConnected: true
          });
        }

      } else {
        signInAnonymously(auth);
      }
    });

    return () => unsubscribe();
  }, [tonConnectUI.connected, tonConnectUI.wallet]);

  const handleTap = async (event: React.MouseEvent<HTMLDivElement>) => {
    if (!user) return;

    const db = getFirestore(app);
    const userRef = doc(db, 'users', user.uid);
    const newTaps = taps + 1;
    const newBalance = balance + 1;
    
    setTaps(newTaps);
    setBalance(newBalance);

    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const newEffect = { id: Date.now(), x, y };
    setTapEffects(prev => [...prev, newEffect]);
    setTimeout(() => {
      setTapEffects(prev => prev.filter(e => e.id !== newEffect.id));
    }, 1000);
    
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
    <div className="min-h-screen text-white flex flex-col items-center justify-between p-4 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-[url('/african-pattern.svg')] opacity-5 z-0"></div>
      
      <div className="w-full max-w-md z-10">
        <header className="flex justify-between items-center py-2 mb-4">
          <div className="flex items-center space-x-2">
            <UserIcon className="w-6 h-6 text-amber-400" />
            <span className="font-bold text-lg">{telegramUser?.first_name || 'Player'}</span>
          </div>
          <TonConnectButton />
        </header>

        <main className="flex flex-col items-center">
          <div className="grid grid-cols-2 gap-4 mb-6 w-full">
            <Card className="bg-white/5 border-amber-500/20 backdrop-blur-sm">
              <CardContent className="p-3 flex items-center space-x-3">
                <div className="bg-amber-400/20 p-2 rounded-full">
                  <PiggyBank className="h-6 w-6 text-amber-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Balance</p>
                  <p className="text-xl font-bold">{formatNumber(balance)}</p>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white/5 border-amber-500/20 backdrop-blur-sm">
              <CardContent className="p-3 flex items-center space-x-3">
                 <div className="bg-amber-400/20 p-2 rounded-full">
                  <Link className="h-6 w-6 text-amber-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Income</p>
                  <p className="text-xl font-bold">{formatNumber(passiveIncome)}/s</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div 
            className="relative w-64 h-64 md:w-72 md:h-72 bg-gradient-to-b from-amber-400 to-amber-600 rounded-full flex items-center justify-center cursor-pointer select-none shadow-[0_0_40px_rgba(251,191,36,0.5)] active:scale-95 transition-transform duration-150 animate-pulse-slow"
            onClick={handleTap}
          >
            <span className="text-5xl font-extrabold text-black text-opacity-70">TAP</span>
            {tapEffects.map(effect => (
              <div 
                key={effect.id} 
                className="absolute text-3xl font-bold text-white opacity-90 animate-coin-fall pointer-events-none"
                style={{ top: `${effect.y}px`, left: `${effect.x}px` }}
              >
                +1
              </div>
            ))}
          </div>
          
          <div className="mt-6 text-center">
            <p className="text-gray-400">Taps: {formatNumber(taps)}</p>
          </div>
        </main>
      </div>

      <nav className="w-full max-w-md bg-white/5 border-t border-amber-500/20 backdrop-blur-sm p-2 rounded-t-2xl z-20">
        <div className="flex justify-around items-center">
          <button className="flex flex-col items-center text-amber-400 font-bold">
            <Star className="w-7 h-7 mb-1" />
            <span className="text-xs">Tap</span>
          </button>
          <button className="flex flex-col items-center text-gray-400 hover:text-white transition-colors">
            <TrendingUp className="w-7 h-7 mb-1" />
            <span className="text-xs">Invest</span>
          </button>
          <button className="flex flex-col items-center text-gray-400 hover:text-white transition-colors">
            <UserIcon className="w-7 h-7 mb-1" />
            <span className="text-xs">Leaderboard</span>
          </button>
        </div>
      </nav>
    </div>
  );
}
