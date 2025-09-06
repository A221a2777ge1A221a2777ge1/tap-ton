'use client';

import { useEffect, useState } from 'react';
import { getAuth, signInAnonymously, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { app } from '@/lib/firebase';
import { getTelegramUser } from '@/lib/telegram';
import { TonConnectButton, useTonConnectUI } from '@tonconnect/ui-react';

export default function TapPage() {
  const [user, setUser] = useState(null);
  const [taps, setTaps] = useState(0);
  const [balance, setBalance] = useState(0);
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
          setTaps(userData.taps);
          setBalance(userData.balance);
        } else {
          const tgUser = getTelegramUser();
          if (tgUser) {
            await setDoc(userRef, {
              tgId: tgUser.tgId,
              displayName: tgUser.first_name,
              username: tgUser.username,
              taps: 0,
              balance: 0,
            });
          }
        }

        if (tonConnectUI.wallet) {
          updateDoc(userRef, { wallet: tonConnectUI.wallet.account.address });
        }

      } else {
        signInAnonymously(auth);
      }
    });

    return () => unsubscribe();
  }, [tonConnectUI.wallet]);

  return (
    <div>
      {user ? (
        <div>
          <TonConnectButton />
          <h1>Welcome, {getTelegramUser()?.first_name}</h1>
          <p>Taps: {taps}</p>
          <p>Balance: {balance}</p>
          <button onClick={() => setTaps(taps + 1)}>Tap</button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
