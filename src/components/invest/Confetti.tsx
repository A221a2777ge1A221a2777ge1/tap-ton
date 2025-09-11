"use client";

import { useEffect, useState } from 'react';

const colors = ['#A020F0', '#00FF00', '#FFD700', '#FFFFFF'];

interface ConfettiPiece {
  id: number;
  left: string;
  duration: string;
  delay: string;
  color: string;
  transform: string;
}

export function Confetti() {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([]);

  useEffect(() => {
    const newPieces: ConfettiPiece[] = Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      duration: `${Math.random() * 1 + 1.5}s`,
      delay: `${Math.random() * 1}s`,
      color: colors[Math.floor(Math.random() * colors.length)],
      transform: `scale(${Math.random() + 0.5}) rotate(${Math.random() * 360}deg)`,
    }));

    setPieces(newPieces);
    const timer = setTimeout(() => setPieces([]), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (pieces.length === 0) return null;

  return (
    <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-50 overflow-hidden">
      {pieces.map(p => (
        <div
          key={p.id}
          className="confetti-piece absolute w-2 h-4"
          style={{
            left: p.left,
            animationDuration: p.duration,
            animationDelay: p.delay,
            backgroundColor: p.color,
            transform: p.transform,
          }}
        />
      ))}
    </div>
  );
}
