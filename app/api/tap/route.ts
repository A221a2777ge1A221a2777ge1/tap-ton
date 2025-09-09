import { getFirestore, doc, updateDoc, increment } from 'firebase/firestore';
import { app } from '@/lib/firebase';

export async function POST(req: Request) {
  const { address, taps } = await req.json();
  const db = getFirestore(app);

  try {
    const userRef = doc(db, 'users', address);
    await updateDoc(userRef, {
      balance: increment(taps)
    });
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to update balance' }), { status: 500 });
  }
}
