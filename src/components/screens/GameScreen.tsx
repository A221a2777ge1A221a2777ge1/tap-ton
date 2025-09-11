'use client';

import { useAppContext } from '@/contexts/AppContext';
import { formatET } from '@/lib/utils';
import { Gem } from 'lucide-react';

export default function GameScreen() {
  const { state, claimPassiveIncome } = useAppContext();

  const handleTap = () => {
    claimPassiveIncome();
  };

  return (
    <div className="flex flex-col items-center justify-center h-full p-4">
      <div className="w-full max-w-md">
        <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl text-center shadow-lg mb-8">
          <h2 className="text-xl font-semibold text-gray-300">Your Balance</h2>
          <p className="font-headline text-5xl font-bold text-white my-2 tracking-wider">
            {formatET(state.balance)}
          </p>
          <p className="text-sm text-green-400">+ {formatET(state.coinsPerTap)} per tap</p>
        </div>

        <div className="flex justify-center mb-8">
          <button onClick={handleTap} className="active:scale-95 transition-transform">
            <Gem className="w-48 h-48 text-primary animate-pulse" />
          </button>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-xl shadow-lg">
          <div className="flex justify-between items-center">
            <p className="text-lg font-semibold text-gray-300">Passive Income</p>
            <p className="text-lg font-bold text-white">{formatET(state.passiveIncomeRate)}/hr</p>
          </div>
          <div className="h-2 bg-gray-700 rounded-full mt-2">
            <div className="h-2 bg-primary rounded-full" style={{ width: `100%` }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}
