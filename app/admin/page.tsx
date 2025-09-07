'use client';

import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc, collection, query, orderBy, getDocs, where } from 'firebase/firestore';
import { app } from '@/lib/firebase';

// Mocking a fetch for payout pool from a backend/db
const getPayoutPool = async () => {
    // In a real app, this would fetch from Firestore or a secure backend
    const poolDocRef = doc(getFirestore(app), 'admin', 'payoutPool');
    const poolDoc = await getDoc(poolDocRef);
    if (poolDoc.exists()) {
        return poolDoc.data().balance || 0;
    }
    return 0;
};

const updatePayoutPool = async (amount: number) => {
    // In a real app, this would update the value in Firestore
    const poolDocRef = doc(getFirestore(app), 'admin', 'payoutPool');
    await setDoc(poolDocRef, { balance: amount }, { merge: true });
};


export default function AdminPage() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [totalUsers, setTotalUsers] = useState(0);
  const [topInvestors, setTopInvestors] = useState<Investor[]>([]);
  const [loading, setLoading] = useState(true);
  const [payoutPool, setPayoutPool] = useState(0);
  const [tonAmount, setTonAmount] = useState('');

  // Define Investor interface
  interface Investor {
    id: string;
    displayName: string;
    balance: number;
    walletAddress: string;
  }
  
  // Define Payout interface
  interface Payout {
      name: string;
      wallet: string;
      payout: string;
  }
  
  const formatNumber = (num: number) => {
    if (num >= 1e12) return `${(num / 1e12).toFixed(2)}T`;
    if (num >= 1e9) return `${(num / 1e9).toFixed(2)}B`;
    if (num >= 1e6) return `${(num / 1e6).toFixed(2)}M`;
    if (num >= 1e3) return `${(num / 1e3).toFixed(2)}K`;
    return new Intl.NumberFormat().format(num);
  };

  useEffect(() => {
    const auth = getAuth(app);
    const db = getFirestore(app);

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const adminUID = process.env.NEXT_PUBLIC_ADMIN_UID;
        if (user.uid === adminUID) {
          setIsAdmin(true);
          // Fetch admin data
          const usersCollection = collection(db, 'users');
          const usersSnapshot = await getDocs(usersCollection);
          setTotalUsers(usersSnapshot.size);

          const fetchedPool = await getPayoutPool();
          setPayoutPool(fetchedPool);

          const q = query(collection(db, 'users'), where('walletConnected', '==', true), orderBy('balance', 'desc'));
          const topInvestorsSnapshot = await getDocs(q);
          const investors: Investor[] = [];
          topInvestorsSnapshot.forEach(doc => {
            const data = doc.data();
            investors.push({
              id: doc.id,
              displayName: data.displayName,
              balance: data.balance,
              walletAddress: data.wallet,
            });
          });
          setTopInvestors(investors);
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleFundPool = async () => {
    const amount = parseFloat(tonAmount);
    if (isNaN(amount) || amount <= 0) {
      alert('Please enter a valid amount.');
      return;
    }
    const newPoolBalance = payoutPool + amount;
    await updatePayoutPool(newPoolBalance);
    setPayoutPool(newPoolBalance);
    setTonAmount('');
    alert(`${amount} TON has been added to the payout pool.`);
  };

  const handlePayout = async () => {
    if (payoutPool <= 0) {
      alert('Payout pool is empty. Please fund the pool first.');
      return;
    }
    
    console.log("Initiating payout...");
    const db = getFirestore(app);
    const q = query(collection(db, 'users'), where('walletConnected', '==', true));
    const investorsSnapshot = await getDocs(q);
    
    let totalInvestment = 0;
    investorsSnapshot.forEach(doc => {
      totalInvestment += doc.data().balance;
    });

    if (totalInvestment === 0) {
        alert('No investments to pay out.');
        return;
    }

    console.log(`Total Investment Value: ${formatNumber(totalInvestment)} ET`);
    console.log(`Payout Pool: ${payoutPool} TON`);
    console.log("Calculating individual payouts...");

    const payouts: Payout[] = [];
    investorsSnapshot.forEach(doc => {
      const userData = doc.data();
      const userInvestment = userData.balance;
      const userPayout = (userInvestment / totalInvestment) * payoutPool;
      payouts.push({
        name: userData.displayName,
        wallet: userData.wallet,
        payout: userPayout.toFixed(4) + ' TON'
      });
    });

    console.log("--- Payout Simulation ---");
    console.table(payouts);
    alert('Payout simulation complete! Check the console for details.');
    
    // Reset the pool after payout
    await updatePayoutPool(0);
    setPayoutPool(0);
  };

  if (loading) {
    return (
        <div className="min-h-screen bg-gray-900 flex justify-center items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-400"></div>
        </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gray-900 flex flex-col justify-center items-center text-white">
          <h1 className="text-4xl font-bold text-red-500">Access Denied</h1>
          <p className="text-lg text-gray-400 mt-4">You do not have permission to view this page.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-4xl font-bold mb-8 text-purple-400">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <div className="bg-gray-800 p-6 rounded-lg border border-purple-500/50">
          <h2 className="text-2xl font-bold mb-2 text-purple-300">Total Users</h2>
          <p className="text-4xl font-bold text-white">{formatNumber(totalUsers)}</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg border-yellow-500/50">
          <h2 className="text-2xl font-bold mb-2 text-yellow-300">Payout Pool</h2>
          <p className="text-4xl font-bold text-white">{formatNumber(payoutPool)} TON</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg border-teal-500/50">
          <h2 className="text-2xl font-bold mb-2 text-teal-300">Execute Payouts</h2>
          <button 
            onClick={handlePayout}
            className="bg-teal-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-teal-700 transition-colors w-full"
          >
            Initiate Payout
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <div className="bg-gray-800 p-6 rounded-lg border-green-500/50 col-span-2">
            <h2 className="text-2xl font-bold mb-2 text-green-300">Fund Payout Pool</h2>
            <p className="text-gray-400 mb-4">Send real TON Coin to the global payout pool. This action is irreversible.</p>
            <div className="flex gap-4">
                <input 
                    type="number"
                    value={tonAmount}
                    onChange={(e) => setTonAmount(e.target.value)}
                    placeholder="Enter TON Amount"
                    className="bg-gray-700 text-white border border-gray-600 rounded-lg py-2 px-4 w-full"
                />
                <button 
                    onClick={handleFundPool}
                    className="bg-green-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-green-700 transition-colors"
                >
                    Fund
                </button>
            </div>
        </div>
      </div>

      <div>
        <h2 className="text-3xl font-bold mb-4 text-pink-400">Top Investors</h2>
        <div className="bg-gray-800 rounded-lg border border-pink-500/50 p-4">
        <ul className="space-y-4">
          {topInvestors.map((investor, index) => (
            <li key={investor.id} className="grid grid-cols-12 items-center bg-gray-700/50 p-3 rounded-lg">
              <div className="col-span-1 text-xl font-bold text-pink-300">{index + 1}</div>
              <div className="col-span-4">
                <p className="font-bold text-md text-white">{investor.displayName}</p>
                <p className="text-xs text-gray-400 truncate">{investor.walletAddress}</p>
              </div>
              <div className="col-span-3 text-right font-bold text-lg text-teal-300">{formatNumber(investor.balance)} ET</div>
              <div className="col-span-4 text-right">
                 {/* Payout button for individual user could go here */}
              </div>
            </li>
          ))}
        </ul>
        </div>
      </div>
    </div>
  );
}
