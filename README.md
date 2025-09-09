# 🚀 Crypto Tycoon - African Investment Empire

A Web3 tap-to-earn game with African investment theme, built with Next.js, Firebase, and TON blockchain integration.

## ✨ Features

- **Tap-to-Earn**: Earn CT (Crypto Tycoon) tokens by tapping
- **TON Wallet Integration**: Connect TON wallets for real cryptocurrency rewards
- **African Investment Theme**: Beautiful African-inspired design
- **Leaderboard**: Compete with 300+ players for top 50 positions
- **Admin Panel**: Super admin can distribute TON to qualified users
- **Qualification System**: Only top 50 players with connected wallets qualify

## 🛠️ Technology Stack

- **Frontend**: Next.js 15, React 18, TypeScript
- **Styling**: Tailwind CSS
- **Backend**: Firebase (Authentication, Firestore)
- **Blockchain**: TON Connect, TON SDK
- **Deployment**: Firebase Hosting

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Firebase CLI
- TON wallet (Tonkeeper, MyTonWallet, etc.)

### Installation
```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your Firebase config

# Start development server
npm run dev
```

### Notes on Auth0
- This repo uses `@auth0/nextjs-auth0` v4. Import hooks from the root package:
  - `import { useUser } from '@auth0/nextjs-auth0'`
- The SDK no longer exposes `handleAuth` as in older versions. Implement API routes or middleware separately as needed.

### Sentry
- Sentry is enabled via `withSentryConfig` in `next.config.ts`.
- For full initialization per Next.js 15, move init to instrumentation files if needed.

### Firebase Setup
```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize Firebase
firebase init

# Select Hosting and Firestore
# Configure hosting to use 'out' directory
```

## 📱 App Pages

- **Homepage**: African-themed landing page with TON Connect
- **Tap Page**: Interactive tap-to-earn with CT currency
- **Leaderboard**: 300 African players with qualification status
- **Admin Panel**: TON payment management for super admins

## 🎯 Key Features

### Currency System
- **CT (Crypto Tycoon)**: In-game currency
- **TON Integration**: Real cryptocurrency rewards
- **Qualification**: Top 50 players only

### African Investment Theme
- **Real Estate**: African cities and properties
- **Agriculture**: Farms, plantations, mining
- **Technology**: African tech companies
- **Cultural Design**: Authentic African aesthetics

## 🔧 Development

### Available Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

## 🚀 Deployment

### Firebase Hosting
```bash
# Build the app
npm run build

# Deploy to Firebase
firebase deploy
```

### Environment Variables
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

## 🔒 Security

- **Firebase Authentication**: Secure user management
- **Firestore Rules**: Database security
- **TON Connect**: Secure wallet integration
- **Admin Controls**: Role-based access

## 📄 License

This project is licensed under the MIT License.

---

**Built with ❤️ for the African crypto community**