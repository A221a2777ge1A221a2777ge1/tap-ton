
import Image from "next/image";

// Helper component for icons
const Icon = ({ src, alt, size = 24 }: { src: string; alt: string; size?: number }) => (
  <Image src={src} alt={alt} width={size} height={size} />
);

export default function Home() {
  return (
    <div className="bg-black text-white min-h-screen flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between p-4 border-b border-gray-700">
        <div className="flex items-center space-x-4">
          <button className="text-2xl">×</button>
          <h1 className="text-xl font-bold">Evana Tycoon</h1>
        </div>
        <div className="flex items-center space-x-4">
          <button>
            <Icon src="/arrow-down.svg" alt="Back" />
          </button>
          <button>
            <Icon src="/dots-vertical.svg" alt="More" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-between p-4">
        <div className="w-full max-w-md mx-auto">
          <div className="text-center mt-8">
            <h2 className="text-5xl font-bold">Evana Tycoon</h2>
            <p className="text-gray-400 mt-2">Your African Empire Awaits</p>
          </div>

          <div className="flex justify-around my-8">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-2">
                <Icon src="/piggy-bank.svg" alt="Balance" />
                <p className="text-gray-400">Balance</p>
              </div>
              <p className="text-3xl font-bold text-green-400">$418.5K</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center space-x-2">
                <Icon src="/link.svg" alt="Income" />
                <p className="text-gray-400">Income</p>
              </div>
              <p className="text-3xl font-bold text-green-400">$4.25K/s</p>
            </div>
          </div>

          <div className="flex justify-around border-b-2 border-gray-700">
            <button className="py-2 px-4 text-lg font-semibold border-b-2 border-yellow-400 text-yellow-400">
              Tap
            </button>
            <button className="py-2 px-4 text-lg font-semibold text-gray-400">
              Invest
            </button>
            <button className="py-2 px-4 text-lg font-semibold text-gray-400">
              Leaderboard
            </button>
          </div>
        </div>

        <div className="flex-grow flex items-center justify-center">
          <div className="relative">
            <div className="w-64 h-64 rounded-full bg-green-900 flex items-center justify-center">
              <div className="w-48 h-48 rounded-full bg-yellow-400 flex items-center justify-center">
                <span className="text-black text-5xl font-bold">ET</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
