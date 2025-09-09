'use client';

import Link from 'next/link';

interface InvestmentCardProps {
  title: string;
  description: string;
  icon: string;
}

const InvestmentCard = ({ title, description, icon }: InvestmentCardProps) => (
  <div className="bg-gray-800 rounded-lg p-6 text-center">
    <div className="text-4xl mb-4">{icon}</div>
    <h3 className="text-xl font-bold mb-2 text-yellow-400">{title}</h3>
    <p className="text-gray-400">{description}</p>
  </div>
);

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <nav className="flex justify-between items-center p-4 bg-gray-900">
        <div className="flex items-center space-x-4">
          <Link href="/" className="text-lg font-bold">Evana Tycoon</Link>
        </div>
        <div className="flex items-center space-x-4">
          <Link href="/" className="hover:text-yellow-400">Home</Link>
          <Link href="/tap" className="hover:text-yellow-400">Tap</Link>
          <Link href="/leaderboard" className="hover:text-yellow-400">Leaderboard</Link>
        </div>
      </nav>

      <main className="flex flex-col items-center justify-center text-center p-8">
        <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center text-4xl font-bold text-yellow-400 mb-4">
          ET
        </div>
        <h1 className="text-5xl font-bold mb-2">Evana Tycoon</h1>
        <p className="text-2xl text-green-400 mb-8">Build Your African Investment Empire</p>
        <p className="max-w-2xl mb-12">
          Tap to earn ET Coins and build your wealth through strategic investments in real
          estate, agriculture, and technology across the African continent. Connect your TON
          wallet to supercharge your progress!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <InvestmentCard 
            icon="🏘️" 
            title="Real Estate" 
            description="Lagos mega-malls, Nairobi tech parks, Accra luxury apartments." 
          />
          <InvestmentCard 
            icon="🌱" 
            title="Agriculture" 
            description="Ghanaian cocoa farms, Ethiopian coffee plantations, Kenyan flower exports." 
          />
          <InvestmentCard 
            icon="💡" 
            title="Technology" 
            description="Invest in African fintech, AI research, and renewable energy startups." 
          />
        </div>
      </main>
    </div>
  );
}
