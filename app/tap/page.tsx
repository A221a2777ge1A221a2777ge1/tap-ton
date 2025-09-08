"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useTonConnectUI, useTonWallet } from '@tonconnect/ui-react';

export default function TapPage() {
  const [count, setCount] = useState(0);
  const [tonConnectUI] = useTonConnectUI();
  const wallet = useTonWallet();

  useEffect(() => {
    const tg = (typeof window !== 'undefined' && (window as any).Telegram?.WebApp) || undefined;
    tg?.BackButton?.show?.();
    tg?.BackButton?.onClick?.(() => {
      tg?.close?.();
    });
    return () => {
      tg?.BackButton?.hide?.();
    };
  }, []);

  return (
    <main className="flex min-h-[100svh] flex-col items-center p-safe px-6 py-8 gap-6">
      <div className="w-full max-w-sm rounded-2xl bg-white/5 p-5 text-center">
        <div className="text-sm text-white/60">Your CT balance</div>
        <div className="mt-1 text-5xl font-black text-[#FFD007]">{count}</div>
      </div>

      <button
        onClick={() => setCount((c) => c + 1)}
        className="h-48 w-48 rounded-full bg-gradient-to-br from-[#FFD007] to-[#FF6B35] text-black text-xl font-extrabold active:scale-95 shadow-xl"
      >
        TAP
      </button>

      <div className="w-full max-w-sm rounded-2xl bg-white/5 p-4">
        <div className="flex items-center justify-between">
          <span className="text-white/80 text-sm">Wallet</span>
          <span className="text-xs text-white/60">{wallet ? 'Connected' : 'Not connected'}</span>
        </div>
        <div className="mt-3">
          <button
            onClick={() => tonConnectUI.openModal()}
            className="w-full rounded-xl bg-white/10 px-4 py-3 text-sm font-semibold hover:bg-white/15 active:scale-95"
          >
            {wallet ? 'Manage TON Wallet' : 'Connect TON Wallet'}
          </button>
        </div>
      </div>

      <Link href="/" className="text-white/60 text-sm underline underline-offset-4">Back home</Link>
    </main>
  );
}

