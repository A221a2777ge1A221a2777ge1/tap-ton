"use client";
import { FormEvent, useState } from 'react';
import { GoogleAuthProvider, GithubAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default function SignInPage() {
  const [email, setEmail] = useState('admin@example.com');
  const [password, setPassword] = useState('password123');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const { getClientAuth } = await import('@/lib/firebase-client');
      const auth = getClientAuth();
      await signInWithEmailAndPassword(auth, email, password);
      location.href = '/app';
    } catch (err: any) {
      setError(err?.message ?? 'Sign-in failed');
    } finally {
      setLoading(false);
    }
  }

  async function onProvider(provider: 'google' | 'github') {
    setError(null);
    setLoading(true);
    try {
      const { getClientAuth } = await import('@/lib/firebase-client');
      const auth = getClientAuth();
      const p = provider === 'google' ? new GoogleAuthProvider() : new GithubAuthProvider();
      await signInWithPopup(auth, p);
      location.href = '/app';
    } catch (err: any) {
      setError(err?.message ?? 'Sign-in failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-md space-y-6">
        <h1 className="text-2xl font-semibold">Sign in</h1>
        {error && <div className="text-red-600 text-sm">{error}</div>}
        <form onSubmit={onSubmit} className="space-y-4">
          <input className="w-full border rounded p-2" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input className="w-full border rounded p-2" placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button className="w-full bg-black text-white rounded py-2" disabled={loading}>{loading ? 'Signing in...' : 'Sign in'}</button>
        </form>
        <div className="flex gap-2">
          <button className="flex-1 border rounded py-2" onClick={() => onProvider('google')}>Google</button>
          <button className="flex-1 border rounded py-2" onClick={() => onProvider('github')}>GitHub</button>
        </div>
        <div className="text-sm">
          <Link className="underline" href="/">Back</Link>
        </div>
      </div>
    </main>
  );
}

