'use client';

import { TonConnectButton, useTonConnectUI } from '@tonconnect/ui-react';
import { useEffect, useState } from 'react';

export function TonConnectWrapper() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="bg-gray-200 animate-pulse rounded-lg px-4 py-2 h-10 w-32"></div>
    );
  }

  return <TonConnectButton />;
}

export function useTonConnect() {
  const [mounted, setMounted] = useState(false);
  const [tonConnectUI] = useTonConnectUI();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return { tonConnectUI: null };
  }

  return { tonConnectUI };
}
