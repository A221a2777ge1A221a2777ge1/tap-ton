"use client";
import { useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, onAuthStateChanged, sendEmailVerification, signOut } from 'firebase/auth';

export const dynamic = 'force-dynamic';

export default function AuthUsersPage() {
  const [auth, setAuth] = useState<any>(null);
  const [current, setCurrent] = useState<any>(null);

  useEffect(() => {
    (async () => {
      const { getClientAuth } = await import('@/lib/firebase-client');
      const a = getClientAuth();
      setAuth(a);
      return onAuthStateChanged(a, setCurrent);
    })();
  }, []);

  const [email, setEmail] = useState('user@example.com');
  const [password, setPassword] = useState('password123');

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Authentication</h2>
      <div className="text-sm">Current: {current?.email ?? 'none'}</div>
      <div className="flex gap-2">
        <button className="border rounded px-3" onClick={() => auth && signOut(auth)}>Sign out</button>
        <button className="border rounded px-3" onClick={() => current && sendEmailVerification(current)}>Send verify email</button>
      </div>
      <div className="space-y-2">
        <div className="font-medium">Create test user</div>
        <div className="flex gap-2">
          <input className="border rounded p-2" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input className="border rounded p-2" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button className="border rounded px-3" onClick={() => auth && createUserWithEmailAndPassword(auth, email, password)}>Create</button>
        </div>
      </div>
    </div>
  );
}

