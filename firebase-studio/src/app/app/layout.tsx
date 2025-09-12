import { ReactNode } from 'react';
import Link from 'next/link';

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen grid grid-cols-[260px_1fr] grid-rows-[56px_1fr]">
      <header className="col-span-2 border-b px-4 flex items-center justify-between">
        <div className="font-semibold">Firebase Studio</div>
        <nav className="flex items-center gap-3 text-sm">
          <Link className="underline" href="/app">Dashboard</Link>
          <Link className="underline" href="/app/firestore">Firestore</Link>
          <Link className="underline" href="/app/storage">Storage</Link>
          <Link className="underline" href="/app/auth">Authentication</Link>
          <Link className="underline" href="/app/rules">Rules</Link>
          <Link className="underline" href="/app/functions">Functions</Link>
          <Link className="underline" href="/app/audit">Audit</Link>
          <Link className="underline" href="/app/settings">Settings</Link>
        </nav>
      </header>
      <aside className="border-r p-4 space-y-2">
        <div className="text-sm text-muted-foreground">Project Switcher</div>
        <select className="w-full border rounded p-2">
          <option>Demo Project (emulator)</option>
        </select>
      </aside>
      <main className="p-4">{children}</main>
    </div>
  );
}

