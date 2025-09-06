'use client';

import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc, collection, addDoc, serverTimestamp, query, orderBy, getDocs, writeBatch } from 'firebase/firestore';
import { app } from '../../lib/firebase';
import { useRouter } from 'next/navigation';
import { TonConnectButton, useTonConnectUI } from '@tonconnect/ui-react';

export default function AdminPage() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [amountTON, setAmountTON] = useState(0);
  const [notes, setNotes] = useState('');
  const [period, setPeriod] = useState('daily');
  const router = useRouter();
  const auth = getAuth(app);
  const db = getFirestore(app);
  const [tonConnectUI] = useTonConnectUI();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const adminRef = doc(db, 'admins', user.uid);
        const adminSnap = await getDoc(adminRef);
        if (adminSnap.exists()) {
          setIsAdmin(true);
        } else {
          router.push('/');
        }
      } else {
        router.push('/');
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [auth, db, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAdmin) return;

    const user = auth.currentUser;
    if (!user) return;

    try {
      const payoutRef = await addDoc(collection(db, 'payouts'), {
        amountTON,
        notes,
        period,
        createdAt: serverTimestamp(),
        createdBy: user.uid,
        status: 'prepared',
      });

      const usersQuery = query(collection(db, 'users'), orderBy('balance', 'desc'));
      const usersSnapshot = await getDocs(usersQuery);
      const users = usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      // Placeholder for tap calculation in the last 24h
      const totalTapsLast24h = users.reduce((acc, user) => acc + (user.taps || 1), 0); 

      const batch = writeBatch(db);
      users.forEach(user => {
        const userTaps = user.taps || 1; // Placeholder
        const shareTON = (userTaps / totalTapsLast24h) * amountTON;
        const itemRef = doc(db, 'payouts', payoutRef.id, 'items', user.id);
        batch.set(itemRef, { shareTON });
      });

      await batch.commit();

      alert('Payout created successfully!');
      setAmountTON(0);
      setNotes('');
    } catch (error) {
      console.error('Error creating payout:', error);
      alert('Failed to create payout.');
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!isAdmin) {
    return null; // or a not authorized message
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-end">
        <TonConnectButton />
      </div>
      <h1 className="text-4xl font-bold text-center my-8">Admin - Create Payout</h1>
      {tonConnectUI.wallet && <p className="text-center">Connected wallet: {tonConnectUI.wallet.account.address}</p>}
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2" htmlFor="amountTON">
            Amount (TON)
          </label>
          <input
            type="number"
            id="amountTON"
            value={amountTON}
            onChange={(e) => setAmountTON(Number(e.target.value))}
            className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2" htmlFor="notes">
            Notes
          </label>
          <textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2" htmlFor="period">
            Period
          </label>
          <input
            type="text"
            id="period"
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Create Payout
          </button>
        </div>
      </form>
    </div>
  );
}
