import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import BottomNav from "../components/BottomNav";
import { UserProvider } from '@auth0/nextjs-auth0/client';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ET Tap",
  description: "Tap to earn ET coins",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
        <body className={`${inter.className} bg-gray-900 text-white`}>
          <UserProvider>
            {children}
            <BottomNav />
          </UserProvider>
        </body>
    </html>
  );
}
