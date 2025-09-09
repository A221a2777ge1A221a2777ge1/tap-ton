import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import BottomNav from "@/components/BottomNav";
import { Auth0Provider } from '@auth0/nextjs-auth0';

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
          <Auth0Provider user={undefined}>
            {children}
            <BottomNav />
          </Auth0Provider>
        </body>
    </html>
  );
}
