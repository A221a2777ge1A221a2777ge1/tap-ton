'use client';

import { useState } from 'react';

export default function AnimatedCoin() {
  const [isTapped, setIsTapped] = useState(false);

  const handleTap = () => {
    setIsTapped(true);
    setTimeout(() => setIsTapped(false), 200);
  };

  return (
    <div
      className={`w-48 h-48 bg-yellow-400 rounded-full flex items-center justify-center text-black font-bold text-3xl cursor-pointer transition-transform duration-200 ${isTapped ? 'scale-90' : ''}`}
      onClick={handleTap}
    >
      ET
    </div>
  );
}

