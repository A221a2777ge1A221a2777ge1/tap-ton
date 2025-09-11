'use client';

import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useEffect, useState } from 'react';
import { formatET } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Trophy } from 'lucide-react';

type LeaderboardUser = {
  id: string;
  username: string;
  balance: number;
  avatarUrl?: string;
  tonAddress: string;
};

export default function LeaderboardScreen() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardUser[]>([]);

  useEffect(() => {
    const usersRef = collection(db, 'users');
    const q = query(usersRef, orderBy('balance', 'desc'));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const leaderboardData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as LeaderboardUser[];
      setLeaderboard(leaderboardData);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="p-4">
      <h1 className="font-headline text-3xl font-bold mb-6 text-center">Leaderboard</h1>
      <div className="space-y-3">
        {leaderboard.map((user, index) => (
          <Card key={user.id} className="bg-card/50">
            <CardContent className="p-3 flex items-center gap-4">
              <div className="flex items-center gap-3">
                <span className="font-bold text-lg w-6 text-center">
                  {index === 0 && <Trophy className="w-6 h-6 text-yellow-400 inline" />}
                  {index === 1 && <Trophy className="w-6 h-6 text-gray-400 inline" />}
                  {index === 2 && <Trophy className="w-6 h-6 text-yellow-600 inline" />}
                  {index > 2 && index + 1}
                </span>
                <Avatar>
                  <AvatarImage src={user.avatarUrl} alt={user.username} />
                  <AvatarFallback>{user.username.charAt(0)}</AvatarFallback>
                </Avatar>
              </div>
              <div className="flex-grow">
                <p className="font-semibold">{user.username}</p>
                <p className="text-sm text-muted-foreground">
                  {user.tonAddress.slice(0, 6)}...{user.tonAddress.slice(-4)}
                </p>
              </div>
              <div className="text-right">
                <p className="font-bold text-lg text-primary">{formatET(user.balance)}</p>
                <p className="text-sm text-muted-foreground">ET</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
