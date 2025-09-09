import { getFirestore, collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { app } from '@/lib/firebase';

export async function GET(req: Request) {
  const db = getFirestore(app);

  try {
    const usersRef = collection(db, 'users');
    const q = query(usersRef, orderBy('balance', 'desc'), limit(10));
    const querySnapshot = await getDocs(q);
    
    const leaderboard = querySnapshot.docs.map(doc => ({
        address: doc.id,
        balance: doc.data().balance
    }));

    return new Response(JSON.stringify(leaderboard), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch leaderboard' }), { status: 500 });
  }
}
