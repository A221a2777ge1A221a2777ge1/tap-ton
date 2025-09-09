'use client';

import { useState } from 'react';
import { useUser } from '@auth0/nextjs-auth0';

export default function InvestPage() {
  const { user } = useUser();
  const [amount, setAmount] = useState('');
  const [duration, setDuration] = useState(1);
  const [notification, setNotification] = useState('');

  const handleInvest = async () => {
    if (!user) {
      setNotification('You must be logged in to invest.');
      return;
    }

    const response = await fetch('/api/invest', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ address: user.sub, amount: Number(amount), duration }),
    });

    if (response.ok) {
      setNotification('Investment successful!');
      setAmount('');
    } else {
      const data = await response.json();
      setNotification(`Investment failed: ${data.error}`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      <h1 className="text-4xl font-bold mb-4">Invest</h1>
      {notification && <p className="text-yellow-400 mb-4">{notification}</p>}
      <div className="flex flex-col items-center space-y-4">
        <input 
          type="number"
          placeholder="Amount to invest"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="p-2 rounded bg-gray-800 text-white"
        />
        <div>
          <label>Duration (months): </label>
          <select value={duration} onChange={(e) => setDuration(Number(e.target.value))} className="p-2 rounded bg-gray-800 text-white">
            <option value={1}>1</option>
            <option value={3}>3</option>
            <option value={6}>6</option>
            <option value={12}>12</option>
          </select>
        </div>
        <button onClick={handleInvest} className="px-4 py-2 bg-yellow-400 text-black rounded">Invest</button>
      </div>
    </div>
  );
}
