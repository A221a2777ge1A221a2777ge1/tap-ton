'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatET } from '@/lib/utils';
import { useTonConnectUI, useTonWallet, TonConnectButton } from '@tonconnect/ui-react';
import { ArrowDownLeft, ArrowUpRight } from 'lucide-react';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useEffect, useState } from 'react';
import { useAppContext } from '@/contexts/AppContext';

type Transaction = {
  id: string;
  type: string;
  amount: number;
  item?: string;
  date: any;
};

export default function WalletScreen() {
  const [tonConnectUI] = useTonConnectUI();
  const wallet = useTonWallet();
  const { state } = useAppContext();
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    if (state.user) {
      const transactionsRef = collection(db, 'users', state.user.tonAddress, 'transactions');
      const q = query(transactionsRef, orderBy('date', 'desc'));

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const newTransactions = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Transaction[];
        setTransactions(newTransactions);
      });

      return () => unsubscribe();
    }
  }, [state.user]);

  const formatDate = (timestamp: any) => {
    if (timestamp && timestamp.toDate) {
        return timestamp.toDate().toLocaleDateString();
    } else {
        return new Date().toLocaleDateString();
    }
  }

  return (
    <div className="p-4 space-y-6">
      <h1 className="font-headline text-3xl font-bold text-center">Wallet</h1>
      <Card>
        <CardHeader>
          <CardTitle>TON Connect</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {wallet ? (
            <div className="space-y-2">
              <p className="text-sm font-medium">Connected Wallet:</p>
              <p className="text-xs bg-muted p-2 rounded-md break-all">{wallet.account.address}</p>
              <p className="text-sm text-muted-foreground">Chain: {wallet.account.chain}</p>
              <Button onClick={() => tonConnectUI.disconnect()} variant="destructive" className="w-full">
                Disconnect
              </Button>
            </div>
          ) : (
            <div className="text-center space-y-4">
              <p>Connect your TON wallet to sync your progress.</p>
              <div className="flex justify-center">
                <TonConnectButton />
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
        </CardHeader>
        <CardContent>
          {transactions.length > 0 ? (
            <ul className="space-y-4">
              {transactions.map((tx) => (
                <li key={tx.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        tx.amount > 0 ? 'bg-green-500/20' : 'bg-red-500/20'
                      }`}>
                      {tx.amount > 0 ? (
                        <ArrowDownLeft className="w-4 h-4 text-green-500" />
                      ) : (
                        <ArrowUpRight className="w-4 h-4 text-red-500" />
                      )}
                    </div>
                    <div>
                      <p className="font-semibold capitalize">
                        {tx.type === 'investment' ? `Purchase: ${tx.item}` : tx.type}
                      </p>
                      <p className="text-sm text-muted-foreground">{formatDate(tx.date)}</p>
                    </div>
                  </div>
                  <p className={`font-bold ${tx.amount > 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {tx.amount > 0 ? '+' : ''}
                    {formatET(tx.amount)} ET
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted-foreground text-center">No transactions yet.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
