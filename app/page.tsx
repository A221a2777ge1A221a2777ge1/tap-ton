import Link from 'next/link';
import { TonConnectWrapper } from '../components/TonConnectWrapper';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Neon Glow Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-32 h-32 bg-purple-600 rounded-full filter blur-3xl"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-blue-500 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-20 left-32 w-28 h-28 bg-pink-500 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-40 right-10 w-20 h-20 bg-teal-400 rounded-full filter blur-3xl"></div>
      </div>
      
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-8">
        <main className="text-center space-y-8 max-w-4xl">
          {/* Logo and Title */}
          <div className="space-y-4">
            <div className="w-24 h-24 mx-auto bg-gray-800 border-2 border-purple-500 rounded-full flex items-center justify-center shadow-2xl shadow-purple-500/20">
              <span className="text-4xl font-bold text-purple-400">ET</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-bold text-white drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]">
              Evana Tycoon
            </h1>
            <p className="text-2xl md:text-3xl text-teal-300 font-semibold">
              Build Your African Investment Empire
            </p>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Tap to earn ET Coins and build your wealth through strategic investments 
              in real estate, agriculture, and technology across the African continent. 
              Connect your TON wallet to supercharge your progress!
            </p>
          </div>

          {/* Investment Categories */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-12">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-purple-500/30 shadow-lg hover:shadow-purple-500/30 transition-shadow">
              <div className="text-4xl mb-4">🏙️</div>
              <h3 className="text-xl font-bold text-purple-300 mb-2">Real Estate</h3>
              <p className="text-gray-400">Lagos mega-malls, Nairobi tech parks, Accra luxury apartments.</p>
            </div>
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-teal-500/30 shadow-lg hover:shadow-teal-500/30 transition-shadow">
              <div className="text-4xl mb-4">🌿</div>
              <h3 className="text-xl font-bold text-teal-300 mb-2">Agriculture</h3>
              <p className="text-gray-400">Ghanaian cocoa farms, Ethiopian coffee plantations, Kenyan flower exports.</p>
            </div>
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-pink-500/30 shadow-lg hover:shadow-pink-500/30 transition-shadow">
              <div className="text-4xl mb-4">💡</div>
              <h3 className="text-xl font-bold text-pink-300 mb-2">Technology</h3>
              <p className="text-gray-400">Invest in African fintech, AI research, and renewable energy startups.</p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/tap">
              <button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-4 px-8 rounded-full text-lg shadow-xl shadow-purple-500/30 transform hover:scale-105 transition-all duration-200 flex items-center gap-2">
                <span className="text-2xl">🚀</span>
                Start Tapping
              </button>
            </Link>
            <div className="flex items-center gap-2">
              <TonConnectWrapper />
            </div>
          </div>

          {/* Player Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400">1,000+</div>
              <div className="text-gray-500">Active Tycoons</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-teal-400">150+</div>
              <div className="text-gray-500">TON Wallets Connected</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-pink-400">24/7</div>
              <p className="text-gray-500">Passive Income Generation</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-400">100%</div>
              <p className="text-gray-500">Focus on African Markets</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
