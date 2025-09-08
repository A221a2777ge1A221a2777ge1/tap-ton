"use client";

import Link from 'next/link';
import { TonConnectButton, useTonConnectUI } from '@tonconnect/ui-react';
import { useEffect } from 'react';

export default function HomePage() {
  const [tonConnectUI] = useTonConnectUI();

  useEffect(() => {
    if (typeof window === 'undefined') return;
    // Telegram WebApp init (safe fallback)
    const tg = (window as any).Telegram?.WebApp;
    try {
      tg?.expand?.();
      tg?.ready?.();
      tg?.setBackgroundColor?.('#0f2610');
      tg?.setHeaderColor?.('#2D5016');
    } catch {}
  }, []);

  return (
    <main className="flex min-h-[100svh] flex-col items-center justify-center gap-8 p-safe pb-20 px-6 text-center">
      <div>
        <h1 className="text-4xl font-extrabold tracking-tight">Crypto Tycoon</h1>
        <p className="mt-2 text-white/80">Tap-to-earn with an African investment vibe</p>
      </div>

      <TonConnectButton className="scale-110" />

      <div className="grid w-full max-w-sm grid-cols-2 gap-3">
        <Link href="/tap" className="rounded-xl bg-[#FFD007] px-4 py-3 font-semibold text-black active:scale-95">Start Tapping</Link>
        <Link href="/leaderboard" className="rounded-xl bg-white/10 px-4 py-3 font-semibold hover:bg-white/15 active:scale-95">Leaderboard</Link>
      </div>

      <p className="text-xs text-white/60">Top 50 with wallets qualify for TON rewards</p>
    </main>
  );
}

