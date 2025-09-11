'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';

interface Investment {
    id: string;
    amount: number;
    duration: number;
    createdAt: unknown; // Firestore timestamp
    status: string;
}

export default function ProfilePage() {
  const { user, error, isLoading } = useUser();
  const [investments, setInvestments] = useState<Investment[]>([]);

  useEffect(() => {
    if (user) {
        fetch(`/api/investments?address=${user.sub}`)
            .then(res => res.json())
            .then(data => setInvestments(data));
    }
    }, [user]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <div className="flex flex-col items-center min-h-screen bg-black text-white p-4">
      <h1 className="text-4xl font-bold mb-4">Profile</h1>
      {user && (
        <div className="flex flex-col items-center space-y-4">
            <Image src={user.picture || '/assets/avatar-placeholder.png'} alt="Profile Picture" className="rounded-full" width={96} height={96} />
            <p>{user.name}</p>
            <p>{user.email}</p>
        </div>
      )}

        <div className="w-full max-w-md mt-8">
            <h2 className="text-2xl font-bold mb-4">My Investments</h2>
            {investments.map(investment => (
                <div key={investment.id} className="p-4 mb-4 bg-gray-800 rounded">
                    <p>Amount: {investment.amount} ET</p>
                    <p>Duration: {investment.duration} months</p>
                    <p>Status: {investment.status}</p>
                </div>
            ))}
        </div>
    </div>
  );
}
