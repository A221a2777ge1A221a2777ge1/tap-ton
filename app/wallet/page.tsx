'use client';

import { useState, useEffect } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';

export default function WalletPage() {
  const { user, error, isLoading } = useUser();
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    if (user) {
      fetch(`/api/wallet?address=${user.sub}`)
        .then(res => res.json())
        .then(data => setBalance(data.balance));
    }
  }, [user]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      <h1 className="text-4xl font-bold mb-4">Wallet</h1>
      {user && (
        <div className="flex flex-col items-center">
            <p className="text-lg mb-2">Balance: {balance} ET</p>
        </div>
      )}
    </div>
  );
}
