import type { Metadata } from "next";
import { Geist } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import Link from "next/link";
import { TonConnectProvider } from "./components/TonConnectProvider";

const geistSans = Geist;
const geistMono = GeistMono;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
      <TonConnectProvider>
        <nav className="flex justify-center my-4 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-full p-2 mx-4">
          <Link href="/" className="mx-2 px-4 py-2 rounded-full text-white hover:bg-white/20 transition-colors font-semibold">🏠 Home</Link>
          <Link href="/tap" className="mx-2 px-4 py-2 rounded-full text-white hover:bg-white/20 transition-colors font-semibold">👆 Tap</Link>
          <Link href="/leaderboard" className="mx-2 px-4 py-2 rounded-full text-white hover:bg-white/20 transition-colors font-semibold">🏆 Leaderboard</Link>
          <Link href="/admin" className="mx-2 px-4 py-2 rounded-full text-white hover:bg-white/20 transition-colors font-semibold">👑 Admin</Link>
          <Link href="/test-ton" className="mx-2 px-4 py-2 rounded-full text-white hover:bg-white/20 transition-colors font-semibold">🔧 Test TON</Link>
        </nav>
        {children}
      </TonConnectProvider>
      </body>
    </html>
  );
}
