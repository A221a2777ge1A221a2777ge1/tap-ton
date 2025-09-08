import './globals.css';
import type { Metadata } from 'next';
import { PropsWithChildren } from 'react';
import { TonProvider } from '@/components/TonProvider';

export const metadata: Metadata = {
  title: 'Crypto Tycoon',
  description: 'African-themed tap-to-earn Web3 game built on TON',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false
  },
  manifest: '/tonconnect-manifest.json',
  themeColor: '#2D5016'
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-b from-[#2D5016] to-[#0f2610] text-white antialiased">
        <TonProvider>
          {children}
        </TonProvider>
      </body>
    </html>
  );
}

