import Link from 'next/link';
import { TonConnectWrapper } from '../components/TonConnectWrapper';

export default function Home() {
  return (
    <div className="relative min-h-[calc(100vh-4rem)]">
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] p-8">
        <main className="text-center space-y-10 max-w-5xl">
          <div className="space-y-5">
            <div className="w-24 h-24 mx-auto bg-gradient-to-br from-yellow-300 to-orange-600 rounded-2xl flex items-center justify-center shadow-[0_10px_40px_-10px_#ff9800]">
              <span className="text-4xl font-extrabold text-black">CT</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white">
              Crypto Tycoon
            </h1>
            <p className="text-xl md:text-2xl text-white/80 font-medium">
              African Investment Empire
            </p>
            <p className="text-base md:text-lg text-white/70 max-w-2xl mx-auto">
              Build your wealth through African investments. Tap to earn CT tokens, invest in real estate, agriculture, and tech across the continent. Connect your TON wallet to qualify for real cryptocurrency rewards!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
            {[{e:'🏠', t:'Real Estate', d:'Invest in properties across Lagos, Nairobi, Accra and more.'}, {e:'🌾', t:'Agriculture', d:'Own cocoa farms, coffee plantations and mining operations.'}, {e:'💻', t:'Technology', d:'Invest in African fintech, AI research and exchanges.'}].map((f) => (
              <div key={f.t} className="bg-white/5 hover:bg-white/10 transition-colors rounded-xl p-6 border border-white/10">
                <div className="text-4xl mb-3">{f.e}</div>
                <h3 className="text-lg font-bold text-white mb-1">{f.t}</h3>
                <p className="text-white/70 text-sm">{f.d}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/tap" className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-emerald-600 hover:to-green-700 text-white font-semibold py-3 px-6 rounded-xl text-base shadow-[0_10px_30px_-10px_#10b981] transition-all">
              <span className="mr-2">🚀</span>
              Start Building Empire
            </Link>
            <div className="flex items-center gap-2">
              <TonConnectWrapper />
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            {[{v:'300+', l:'Active Players'}, {v:'50', l:'TON Qualified'}, {v:'24/7', l:'Passive Income'}, {v:'100%', l:'African Focus'}].map((s) => (
              <div key={s.l} className="text-center">
                <div className="text-3xl font-bold text-white">{s.v}</div>
                <div className="text-white/70">{s.l}</div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
