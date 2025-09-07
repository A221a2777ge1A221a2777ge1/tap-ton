'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { TonConnectWrapper } from '../../components/TonConnectWrapper';

const navLinks = [
  { href: '/', label: 'Home', icon: '🏠' },
  { href: '/tap', label: 'Tap', icon: '👆' },
  { href: '/leaderboard', label: 'Leaderboard', icon: '🏆' },
  { href: '/admin', label: 'Admin', icon: '👑' },
  { href: '/test-ton', label: 'Test TON', icon: '🔧' },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-black/30 bg-black/20 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-yellow-300 to-orange-600 shadow-lg grid place-items-center">
              <span className="text-black font-extrabold">CT</span>
            </div>
            <div className="hidden sm:block">
              <div className="text-white font-bold leading-none">Crypto Tycoon</div>
              <div className="text-white/60 text-xs">African Investment Empire</div>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map(({ href, label, icon }) => {
              const active = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    active ? 'bg-white/15 text-white' : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <span className="mr-1">{icon}</span>
                  {label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden sm:block">
              <TonConnectWrapper />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

