'use client';
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { TonConnectUIProvider } from "@tonconnect/ui-react";

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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
      <TonConnectUIProvider manifestUrl="https://ton-connect.github.io/demo-dapp-with-react-ui/tonconnect-manifest.json">
        <nav className="flex justify-center my-4">
          <Link href="/" className="mx-4">Home</Link>
          <Link href="/tap" className="mx-4">Tap</Link>
          <Link href="/leaderboard" className="mx-4">Leaderboard</Link>
          <Link href="/admin" className="mx-4">Admin</Link>
        </nav>
        {children}
        </TonConnectUIProvider>
      </body>
    </html>
  );
}
