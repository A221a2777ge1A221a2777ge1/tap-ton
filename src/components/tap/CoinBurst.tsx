"use client";

import { useEffect, useState } from 'react';
import { Coins } from 'lucide-react';

interface Coin {
  id: number;
  x: number;
  y: number;
  rotation: number;
  size: number;
}

export function CoinBurst() {
  const [coins, setCoins] = useState<Coin[]>([]);

  useEffect(() => {
    const newCoins: Coin[] = Array.from({ length: 10 }).map((_, i) => {
      const angle = Math.random() * 2 * Math.PI;
      const distance = Math.random() * 100 + 50;
      return {
        id: i,
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance,
        rotation: Math.random() * 360,
        size: Math.random() * 0.5 + 0.75, // from 0.75rem to 1.25rem
      };
    });
    setCoins(newCoins);

    const timer = setTimeout(() => {
      setCoins([]);
    }, 700);

    return () => clearTimeout(timer);
  }, []);

  if (coins.length === 0) return null;
  
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
      {coins.map(coin => (
        <div
          key={coin.id}
          className="tap-coin absolute text-primary"
          style={{
            '--tw-translate-x': `${coin.x}px`,
            '--tw-translate-y': `${coin.y}px`,
            transform: `rotate(${coin.rotation}deg)`,
            fontSize: `${coin.size}rem`,
          } as React.CSSProperties}
        >
          <Coins style={{width: '1em', height: '1em'}}/>
        </div>
      ))}
    </div>
  );
}
