export type LeaderboardUser = {
  id: number;
  name: string;
  balance: number;
  avatarUrl: string;
  wallet: string;
};

export const leaderboardData: LeaderboardUser[] = [
  { id: 1, name: "CryptoKing", balance: 125000000000, avatarUrl: "https://picsum.photos/seed/1/40/40", wallet: "EQA...s7fF" },
  { id: 2, name: "TapMaster", balance: 98000000000, avatarUrl: "https://picsum.photos/seed/2/40/40", wallet: "EQB...t8gG" },
  { id: 3, name: "ET Whale", balance: 76000000000, avatarUrl: "https://picsum.photos/seed/3/40/40", wallet: "EQC...u9hH" },
  { id: 4, name: "DiamondHands", balance: 54000000000, avatarUrl: "https://picsum.photos/seed/4/40/40", wallet: "EQD...v0iI" },
  { id: 5, name: "Satoshi Jr.", balance: 41000000000, avatarUrl: "https://picsum.photos/seed/5/40/40", wallet: "EQE...w1jJ" },
  { id: 6, name: "CoinCollector", balance: 29000000000, avatarUrl: "https://picsum.photos/seed/6/40/40", wallet: "EQF...x2kK" },
  { id: 7, name: "Pixel Tapper", balance: 15000000000, avatarUrl: "https://picsum.photos/seed/7/40/40", wallet: "EQG...y3lL" },
  { id: 8, name: "Digital Driller", balance: 8000000000, avatarUrl: "https://picsum.photos/seed/8/40/40", wallet: "EQH...z4mM" },
  { id: 9, name: "Newbie Miner", balance: 950000000, avatarUrl: "https://picsum.photos/seed/9/40/40", wallet: "EQI...a5nN" },
  { id: 10, name: "Just Tapping", balance: 120000000, avatarUrl: "https://picsum.photos/seed/10/40/40", wallet: "EQJ...b6oO" },
];
