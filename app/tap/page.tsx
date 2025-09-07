'use client';

import { useEffect, useState } from 'react';
import { getAuth, signInAnonymously, onAuthStateChanged, User } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { app } from '@/lib/firebase';
import { getTelegramUser } from '@/lib/telegram';
import { TonConnectButton, useTonConnectUI } from '@tonconnect/ui-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { PiggyBank, Link, Moon } from 'lucide-react';

export default function TapPage() {
  const [user, setUser] = useState<User | null>(null);
  const [taps, setTaps] = useState(0);
  const [balance, setBalance] = useState(7);
  const [passiveIncome, setPassiveIncome] = useState(0);
  const [tonConnectUI] = useTonConnectUI();

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
    <div className="min-h-screen bg-black text-white flex flex-col items-center p-4">
      <div className="w-full max-w-md">
        <header className="flex justify-between items-center py-2 mb-4">
          <div />
          <h1 className="text-2xl font-bold">Evana Tycoon</h1>
          <Button variant="ghost" size="icon">
            <Moon className="h-6 w-6" />
          </Button>
        </header>

        <main>
          <p className="text-center text-gray-400 mb-8">Your African Empire Awaits</p>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <Card className="bg-gray-900 border border-gray-700 rounded-lg">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Balance</CardTitle>
                <PiggyBank className="h-5 w-5 text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatNumber(balance)}</div>
              </CardContent>
            </Card>
            <Card className="bg-gray-900 border border-gray-700 rounded-lg">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Income</CardTitle>
                <Link className="h-5 w-5 text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatNumber(passiveIncome)}/s</div>
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-around mb-8 text-gray-400">
            <button className="hover:text-white">Tap</button>
            <button className="hover:text-white">Invest</button>
            <button className="hover:text-white">Leaderboard</button>
          </div>

          <div 
            className="w-full h-64 bg-gray-900 border border-gray-700 rounded-lg flex items-center justify-center cursor-pointer mb-8"
            onClick={handleTap}
          >
            <p className="text-gray-500">Tap!</p>
          </div>

          <div className="flex justify-center">
            <TonConnectButton />
          </div>
        </main>
      </div>
    </div>
  );
}
