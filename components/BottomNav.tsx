'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Briefcase, BarChart, Wallet, User, LogIn, LogOut } from 'lucide-react';
import { useUser } from '@auth0/nextjs-auth0';

const navItems = [
  { href: '/tap', icon: Home, label: 'Tap' },
  { href: '/invest', icon: Briefcase, label: 'Invest' },
  { href: '/leaderboard', icon: BarChart, label: 'Leaderboard' },
  { href: '/wallet', icon: Wallet, label: 'Wallet' },
];

export default function BottomNav() {
  const pathname = usePathname();
  const { user } = useUser();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-gray-900 flex justify-around p-2">
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link key={item.href} href={item.href} className={`flex flex-col items-center ${isActive ? 'text-yellow-400' : 'text-gray-400'}`}>
            <item.icon />
            <span className="text-xs">{item.label}</span>
          </Link>
        );
      })}
      {user ? (
        <>
          <Link href="/profile" className={`flex flex-col items-center ${pathname === '/profile' ? 'text-yellow-400' : 'text-gray-400'}`}>
            <User />
            <span className="text-xs">Profile</span>
          </Link>
          <Link href="/api/auth/logout" className="flex flex-col items-center text-gray-400">
            <LogOut />
            <span className="text-xs">Logout</span>
          </Link>
        </>
      ) : (
        <Link href="/api/auth/login" className="flex flex-col items-center text-gray-400">
          <LogIn />
          <span className="text-xs">Login</span>
        </Link>
      )}
    </nav>
  );
}
