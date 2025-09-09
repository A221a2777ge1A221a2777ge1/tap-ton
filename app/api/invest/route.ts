import { getFirestore, doc, collection, serverTimestamp, runTransaction } from 'firebase/firestore';
import { app } from '@/lib/firebase';

export async function POST(req: Request) {
  const { address, amount, duration } = await req.json();
  const db = getFirestore(app);

  try {
    await runTransaction(db, async (transaction) => {
      const userRef = doc(db, "users", address);
      const userDoc = await transaction.get(userRef);
      if (!userDoc.exists()) {
        throw new Error("User does not exist!");
      }

      const currentBalance = userDoc.data().balance as number;
      if (currentBalance < amount) {
        throw new Error("Insufficient balance!");
      }

      const newBalance = currentBalance - amount;
      transaction.update(userRef, { balance: newBalance });

      const investmentRef = doc(collection(db, "investments"));
      transaction.set(investmentRef, {
        userAddress: address,
        amount,
        duration, // in months
        createdAt: serverTimestamp(),
        status: 'active'
      });
    });
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return new Response(JSON.stringify({ error: message }), { status: 500 });
  }
}
