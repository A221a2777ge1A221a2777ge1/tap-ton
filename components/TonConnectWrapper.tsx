'use client';

import { TonConnectButton, useTonConnectUI, useTonWallet } from '@tonconnect/ui-react';
import { useEffect, useState } from 'react';

export function TonConnectWrapper() {
  const [mounted, setMounted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [tonConnectUI] = useTonConnectUI();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (tonConnectUI) {
      const unsubscribe = tonConnectUI.onStatusChange(() => {
        // Handle wallet status change if needed
      }, (err) => {
        console.error('TON Connect Error:', err);
        setError((err as Error).message);
      });

      return () => {
        unsubscribe();
      };
    }
  }, [tonConnectUI]);

  if (!mounted) {
    return (
      <div className="bg-gray-200 animate-pulse rounded-lg px-4 py-2 h-10 w-32"></div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm">
        Connection Error
      </div>
    );
  }

  return (
    <div className="ton-connect-wrapper">
      <TonConnectButton />
    </div>
  );
}

export function useTonConnect() {
  const [mounted, setMounted] = useState(false);
  const [tonConnectUI] = useTonConnectUI();
  const wallet = useTonWallet();
  const connected = !!wallet;

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return { tonConnectUI: null, wallet: null, connected: false };
  }

  return { tonConnectUI, wallet, connected };
}
