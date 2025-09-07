# 🚀 Crypto Tycoon - African Investment Empire

## 🌍 Web3 App with African Vibe

A modern tap-to-earn cryptocurrency game focused on African investments, built with Next.js, Firebase, and TON blockchain integration.

## ✨ Features Implemented

### 🎮 Core Gameplay
- **Tap-to-Earn**: Earn CT (Crypto Tycoon) currency by tapping
- **African Investment Theme**: Beautiful African-inspired design with warm colors
- **TON Wallet Integration**: Connect TON wallets using TonConnect protocol
- **Qualification System**: Top 50 players qualify for real TON payments

### 🌍 African Design Elements
- **Color Scheme**: Warm African colors (yellow, orange, red, green)
- **Cultural Patterns**: African-inspired background patterns
- **African Names**: 300 authentic African names in leaderboard
- **Investment Theme**: African real estate, agriculture, and technology

### 💰 TON Integration
- **Wallet Connection**: Secure TON wallet integration
- **Payment Qualification**: Only top 50 with connected wallets get paid
- **Admin Payments**: Super admin can send TON to qualified users
- **Real-time Updates**: Live qualification status

## 🛠️ Technology Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS with African color scheme
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
# Navigate to the project directory
cd tap-ton/tap-ton

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your Firebase config

# Start development server
npm run dev
```

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
# Set up Firestore security rules
```

## 📱 App Pages

### 🏠 Homepage
- African-themed landing page with warm gradients
- CT (Crypto Tycoon) branding
- Feature highlights for African investments
- TON Connect button integration
- Statistics display

### 👆 Tap Page
- Interactive tap-to-earn interface
- CT currency display
- TON wallet connection status
- Qualification indicators
- African investment previews

### 🏆 Leaderboard
- 300 African players with authentic names
- Qualification status for TON payments
- Beautiful African-themed design
- Real-time ranking system

### 👑 Admin Panel
- Super admin interface for TON payments
- Bulk and individual payment options
- Qualified users management
- African-themed admin dashboard

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

### Web3 Integration
- **TON Connect**: Secure wallet connection
- **Blockchain Payments**: Real TON distribution
- **Qualification System**: Automatic eligibility checks

## 🔧 Development

### Available Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

### Project Structure
```
tap-ton/tap-ton/
├── app/                 # Next.js App Router
│   ├── page.tsx        # Homepage
│   ├── tap/page.tsx    # Tap-to-earn page
│   ├── leaderboard/page.tsx # Leaderboard
│   ├── admin/page.tsx  # Admin panel
│   └── layout.tsx      # Root layout
├── lib/                # Utilities
│   ├── firebase.ts     # Firebase config
│   └── telegram.ts     # Telegram integration
├── public/             # Static assets
│   ├── icon.svg        # App icon
│   └── tonconnect-manifest.json # TON Connect config
└── package.json        # Dependencies
```

## 🚀 Deployment

### Firebase Hosting
```bash
# Build the app
npm run build

# Deploy to Firebase
firebase deploy

# Or use the combined command
npm run build && firebase deploy
```

### Environment Variables
```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

## 🎨 Design Features

### African Color Palette
- **Primary**: Yellow (#FFD007) - African gold
- **Secondary**: Orange (#FF6B35) - African sunset
- **Accent**: Red (#E63946) - African earth
- **Background**: Green (#2D5016) - African nature

### Cultural Elements
- **Patterns**: African-inspired geometric patterns
- **Typography**: Bold, modern fonts with African flair
- **Icons**: Emoji-based icons for universal appeal
- **Layout**: Warm, welcoming design

## 🔒 Security

- **Firebase Authentication**: Secure user management
- **Firestore Rules**: Database security
- **TON Connect**: Secure wallet integration
- **Admin Controls**: Role-based access

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📞 Support

For support and questions, please open an issue on GitHub.

---

**Built with ❤️ for the African crypto community**

## 🌟 Next Steps

1. **Deploy to Firebase**: Set up Firebase project and deploy
2. **Configure TON Connect**: Update manifest URL with your domain
3. **Set up Admin**: Create admin user in Firestore
4. **Test Wallet Connection**: Verify TON wallet integration
5. **Launch**: Share with the African crypto community!

The app is now ready with a beautiful African theme and full Web3 functionality! 🚀
