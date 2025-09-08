import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { TonConnectProvider } from "./components/TonConnectProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-900 text-white bg-grid bg-glow`}>
        <TonConnectProvider>
          <nav className="sticky top-4 z-20 flex justify-center bg-gray-800/40 supports-[backdrop-filter]:backdrop-blur border border-white/15 rounded-full p-2 mx-4">
            <Link href="/" className="mx-2 px-4 py-2 rounded-full text-gray-300 hover:bg-white/10 hover:text-white transition-colors font-semibold">🏠 Home</Link>
            <Link href="/tap" className="mx-2 px-4 py-2 rounded-full text-gray-300 hover:bg-white/10 hover:text-white transition-colors font-semibold">👆 Tap</Link>
            <Link href="/leaderboard" className="mx-2 px-4 py-2 rounded-full text-gray-300 hover:bg-white/10 hover:text-white transition-colors font-semibold">🏆 Leaderboard</Link>
            <Link href="/admin" className="mx-2 px-4 py-2 rounded-full text-gray-300 hover:bg-white/10 hover:text-white transition-colors font-semibold">👑 Admin</Link>
            <Link href="/test-ton" className="mx-2 px-4 py-2 rounded-full text-gray-300 hover:bg-white/10 hover:text-white transition-colors font-semibold">🔧 Test TON</Link>
          </nav>
          {children}
        </TonConnectProvider>
      </body>
    </html>
  );
}
