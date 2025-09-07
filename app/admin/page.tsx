'use client';

import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc, collection, addDoc, serverTimestamp, query, orderBy, getDocs, writeBatch, limit } from 'firebase/firestore';
import { app } from '../../lib/firebase';
import { useRouter } from 'next/navigation';
import { TonConnectWrapper, useTonConnect } from '../../components/TonConnectWrapper';

interface User {
  id: string;
  balance: number;
  taps?: number;
  displayName?: string;
  walletConnected?: boolean;
}

export default function AdminPage() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [amountTON, setAmountTON] = useState(0);
  const [notes, setNotes] = useState('');
  const [period, setPeriod] = useState('daily');
  const [qualifiedUsers, setQualifiedUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [individualAmount, setIndividualAmount] = useState(0);
  const router = useRouter();
  const auth = getAuth(app);
  const db = getFirestore(app);
  const { tonConnectUI, wallet } = useTonConnect();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const adminRef = doc(db, 'admins', user.uid);
        const adminSnap = await getDoc(adminRef);
        if (adminSnap.exists()) {
          setIsAdmin(true);
          fetchQualifiedUsers();
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

  const fetchQualifiedUsers = async () => {
    try {
      const usersQuery = query(collection(db, 'users'), orderBy('balance', 'desc'), limit(50));
      const usersSnapshot = await getDocs(usersQuery);
      const users: User[] = usersSnapshot.docs.map(doc => ({ 
        id: doc.id, 
        ...doc.data() 
      } as User));
      
      // Filter users with connected wallets
      const qualified = users.filter(user => user.walletConnected);
      setQualifiedUsers(qualified);
    } catch (error) {
      console.error('Error fetching qualified users:', error);
    }
  };

  const handleBulkPayout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAdmin || !tonConnectUI.wallet) return;

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
        type: 'bulk',
      });

      const usersQuery = query(collection(db, 'users'), orderBy('balance', 'desc'));
      const usersSnapshot = await getDocs(usersQuery);
      const users: User[] = usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as User));

      const totalTapsLast24h = users.reduce((acc, user) => acc + (user.taps || 1), 0); 

      const batch = writeBatch(db);
      users.forEach(user => {
        const userTaps = user.taps || 1;
        const shareTON = (userTaps / totalTapsLast24h) * amountTON;
        const itemRef = doc(db, 'payouts', payoutRef.id, 'items', user.id);
        batch.set(itemRef, { shareTON });
      });

      await batch.commit();

      alert('Bulk payout created successfully!');
      setAmountTON(0);
      setNotes('');
    } catch (error) {
      console.error('Error creating payout:', error);
      alert('Failed to create payout.');
    }
  };

  const handleIndividualPayout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAdmin || !tonConnectUI.wallet || !selectedUser) return;

    const user = auth.currentUser;
    if (!user) return;

    try {
      const payoutRef = await addDoc(collection(db, 'payouts'), {
        amountTON: individualAmount,
        notes: `Individual payout to ${qualifiedUsers.find(u => u.id === selectedUser)?.displayName}`,
        period: 'individual',
        createdAt: serverTimestamp(),
        createdBy: user.uid,
        status: 'prepared',
        type: 'individual',
        targetUserId: selectedUser,
      });

      const itemRef = doc(db, 'payouts', payoutRef.id, 'items', selectedUser);
      await writeBatch(db).set(itemRef, { shareTON: individualAmount }).commit();

      alert('Individual payout created successfully!');
      setSelectedUser('');
      setIndividualAmount(0);
    } catch (error) {
      console.error('Error creating individual payout:', error);
      alert('Failed to create individual payout.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-600 via-purple-600 to-indigo-700 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto"></div>
          <p className="text-white mt-4">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-600 via-purple-600 to-indigo-700">
      {/* African Pattern Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-32 h-32 bg-white rounded-full"></div>
        <div className="absolute top-40 right-32 w-24 h-24 bg-black rounded-full"></div>
        <div className="absolute bottom-32 left-40 w-28 h-28 bg-white rounded-full"></div>
        <div className="absolute bottom-20 right-20 w-20 h-20 bg-black rounded-full"></div>
      </div>

      <div className="relative z-10 container mx-auto p-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-5xl font-bold text-white drop-shadow-lg">👑 Super Admin</h1>
            <p className="text-purple-100 text-xl">African Investment Empire Management</p>
          </div>
          <TonConnectWrapper />
        </div>

        {wallet && (
          <div className="bg-green-500/20 backdrop-blur-sm rounded-xl p-4 mb-8 border border-green-400/30">
            <p className="text-green-100 text-center">
              ✅ Connected wallet: {wallet.account.address.slice(0, 12)}...{wallet.account.address.slice(-8)}
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Bulk Payout Section */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <h2 className="text-2xl font-bold text-white mb-6">💰 Bulk TON Distribution</h2>
            <form onSubmit={handleBulkPayout} className="space-y-4">
              <div>
                <label className="block text-sm font-bold mb-2 text-white" htmlFor="amountTON">
                  Total Amount (TON)
                </label>
                <input
                  type="number"
                  step="0.01"
                  id="amountTON"
                  value={amountTON}
                  onChange={(e) => setAmountTON(Number(e.target.value))}
                  className="w-full py-3 px-4 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  placeholder="Enter TON amount"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2 text-white" htmlFor="notes">
                  Notes
                </label>
                <textarea
                  id="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full py-3 px-4 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  placeholder="Payment description..."
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2 text-white" htmlFor="period">
                  Period
                </label>
                <select
                  id="period"
                  value={period}
                  onChange={(e) => setPeriod(e.target.value)}
                  className="w-full py-3 px-4 rounded-lg bg-white/20 border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                >
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="special">Special Event</option>
                </select>
              </div>
              <button
                type="submit"
                disabled={!tonConnectUI.wallet}
                className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 disabled:from-gray-500 disabled:to-gray-600 text-white font-bold py-3 px-6 rounded-lg transition-all duration-200"
              >
                {tonConnectUI.wallet ? '🚀 Create Bulk Payout' : '⚠️ Connect Wallet First'}
              </button>
            </form>
          </div>

          {/* Individual Payout Section */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <h2 className="text-2xl font-bold text-white mb-6">🎯 Individual TON Payment</h2>
            <form onSubmit={handleIndividualPayout} className="space-y-4">
              <div>
                <label className="block text-sm font-bold mb-2 text-white" htmlFor="selectedUser">
                  Select Qualified User
                </label>
                <select
                  id="selectedUser"
                  value={selectedUser}
                  onChange={(e) => setSelectedUser(e.target.value)}
                  className="w-full py-3 px-4 rounded-lg bg-white/20 border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  required
                >
                  <option value="">Choose a qualified user</option>
                  {qualifiedUsers.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.displayName || 'Anonymous'} - {user.balance?.toLocaleString()} CT
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold mb-2 text-white" htmlFor="individualAmount">
                  TON Amount
                </label>
                <input
                  type="number"
                  step="0.01"
                  id="individualAmount"
                  value={individualAmount}
                  onChange={(e) => setIndividualAmount(Number(e.target.value))}
                  className="w-full py-3 px-4 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  placeholder="Enter TON amount"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={!tonConnectUI.wallet || !selectedUser}
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:from-gray-500 disabled:to-gray-600 text-white font-bold py-3 px-6 rounded-lg transition-all duration-200"
              >
                {tonConnectUI.wallet ? '💸 Send Individual Payment' : '⚠️ Connect Wallet First'}
              </button>
            </form>
          </div>
        </div>

        {/* Qualified Users List */}
        <div className="mt-8 bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
          <h3 className="text-2xl font-bold text-white mb-6">
            🏆 Qualified Users ({qualifiedUsers.length})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {qualifiedUsers.map((user, index) => (
              <div key={user.id} className="bg-white/10 rounded-lg p-4 border border-white/20">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-yellow-400 font-bold">#{index + 1}</span>
                  <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs">✅ Qualified</span>
                </div>
                <div className="text-white font-semibold">{user.displayName || 'Anonymous'}</div>
                <div className="text-purple-200 text-sm">{user.balance?.toLocaleString()} CT</div>
                <div className="text-purple-200 text-sm">{user.taps?.toLocaleString()} taps</div>
              </div>
            ))}
          </div>
        </div>

        {/* Admin Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 text-center">
            <div className="text-3xl font-bold text-white">{qualifiedUsers.length}</div>
            <div className="text-purple-100">Qualified Users</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 text-center">
            <div className="text-3xl font-bold text-white">50</div>
            <div className="text-purple-100">Max Qualified</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 text-center">
            <div className="text-3xl font-bold text-white">24/7</div>
            <div className="text-purple-100">Admin Access</div>
          </div>
        </div>
      </div>
    </div>
  );
}
