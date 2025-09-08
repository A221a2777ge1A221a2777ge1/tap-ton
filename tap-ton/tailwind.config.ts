
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        amber: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
      },
      keyframes: {
        'fade-in-down': {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'pulse-slow': {
          '0%, 100%': { transform: 'scale(1)', boxShadow: '0 0 0 0 rgba(251, 191, 36, 0.4)' },
          '50%': { transform: 'scale(1.05)', boxShadow: '0 0 20px 10px rgba(251, 191, 36, 0.7)' },
        },
        'coin-fall': {
          '0%': { transform: 'translateY(-100%) rotateZ(0)', opacity: '1' },
          '100%': { transform: 'translateY(100px) rotateZ(360deg)', opacity: '0' },
        },
      },
      animation: {
        'fade-in-down': 'fade-in-down 0.5s ease-out forwards',
        'fade-in-up': 'fade-in-up 0.5s ease-out forwards',
        'pulse-slow': 'pulse-slow 3s infinite ease-in-out',
        'coin-fall': 'coin-fall 1s ease-in forwards',
      },
    },
  },
  plugins: [],
};

export default config;
