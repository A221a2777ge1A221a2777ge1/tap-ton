import Link from 'next/link';
import { TonConnectWrapper } from '../components/TonConnectWrapper';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-400 via-orange-500 to-red-600">
      {/* African Pattern Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 bg-black rounded-full"></div>
        <div className="absolute top-32 right-20 w-16 h-16 bg-white rounded-full"></div>
        <div className="absolute bottom-20 left-32 w-24 h-24 bg-black rounded-full"></div>
        <div className="absolute bottom-40 right-10 w-18 h-18 bg-white rounded-full"></div>
      </div>
      
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-8">
        <main className="text-center space-y-8 max-w-4xl">
          {/* Logo and Title */}
          <div className="space-y-4">
            <div className="w-24 h-24 mx-auto bg-gradient-to-br from-yellow-300 to-orange-600 rounded-full flex items-center justify-center shadow-2xl">
              <span className="text-4xl font-bold text-white">CT</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-bold text-white drop-shadow-lg">
              Crypto Tycoon
            </h1>
            <p className="text-2xl md:text-3xl text-yellow-100 font-semibold">
              African Investment Empire
            </p>
            <p className="text-lg text-yellow-50 max-w-2xl mx-auto">
              Build your wealth through African investments. Tap to earn CT tokens, 
              invest in real estate, agriculture, and tech across the continent. 
              Connect your TON wallet to qualify for real cryptocurrency rewards!
            </p>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-12">
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 border border-white/30">
              <div className="text-4xl mb-4">🏠</div>
              <h3 className="text-xl font-bold text-white mb-2">Real Estate</h3>
              <p className="text-yellow-100">Invest in properties across Lagos, Nairobi, Accra, and more African cities</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 border border-white/30">
              <div className="text-4xl mb-4">🌾</div>
              <h3 className="text-xl font-bold text-white mb-2">Agriculture</h3>
              <p className="text-yellow-100">Own cocoa farms, coffee plantations, and mining operations</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 border border-white/30">
              <div className="text-4xl mb-4">💻</div>
              <h3 className="text-xl font-bold text-white mb-2">Technology</h3>
              <p className="text-yellow-100">Invest in African fintech, AI research, and crypto exchanges</p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/tap">
              <button className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-4 px-8 rounded-full text-lg shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center gap-2">
                <span className="text-2xl">🚀</span>
                Start Building Empire
              </button>
            </Link>
            <div className="flex items-center gap-2">
              <TonConnectWrapper />
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-white">300+</div>
              <div className="text-yellow-100">Active Players</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">50</div>
              <div className="text-yellow-100">TON Qualified</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">24/7</div>
              <div className="text-yellow-100">Passive Income</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">100%</div>
              <div className="text-yellow-100">African Focus</div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
