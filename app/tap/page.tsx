'use client';

import { useState, useEffect } from 'react';
import { useUser } from '@auth0/nextjs-auth0';
import AnimatedCoin from '@/components/AnimatedCoin';
import { useDebouncedCallback } from 'use-debounce';

export default function TapPage() {
  const { user, error, isLoading } = useUser();
  const [balance, setBalance] = useState(0);
  const [localTaps, setLocalTaps] = useState(0);

  useEffect(() => {
    if (user) {
      fetch(`/api/wallet?address=${user.sub}`)
        .then(res => res.json())
        .then(data => setBalance(data.balance));
    }
  }, [user]);

  const debouncedApiCall = useDebouncedCallback(() => {
    if (user && localTaps > 0) {
        fetch('/api/tap', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ address: user.sub, taps: localTaps }),
        });
        setLocalTaps(0); // Reset local taps after sending to API
    }
  }, 1000);

  const handleTap = () => {
    setBalance(prev => prev + 1);
    setLocalTaps(prev => prev + 1);
    debouncedApiCall();
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      <h1 className="text-4xl font-bold mb-4">ET Tap</h1>
      {user && (
        <div className="flex flex-col items-center">
          <p className="text-lg mb-2">Balance: {balance} ET</p>
          <div onClick={handleTap}>
            <AnimatedCoin />
          </div>
        </div>
      )}
    </div>
  );
}
