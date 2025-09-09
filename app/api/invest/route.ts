import { getFirestore, doc, updateDoc, collection, addDoc, serverTimestamp, runTransaction } from 'firebase/firestore';
import { app } from '@/lib/firebase';

export async function POST(req: Request) {
  const { address, amount, duration } = await req.json();
  const db = getFirestore(app);

  try {
    await runTransaction(db, async (transaction) => {
      const userRef = doc(db, "users", address);
      const userDoc = await transaction.get(userRef);
      if (!userDoc.exists()) {
        throw "User does not exist!";
      }

      const currentBalance = userDoc.data().balance;
      if (currentBalance < amount) {
        throw "Insufficient balance!";
      }

      const newBalance = currentBalance - amount;
      transaction.update(userRef, { balance: newBalance });

      const investmentRef = collection(db, "investments");
      await addDoc(investmentRef, {
        userAddress: address,
        amount,
        duration, // in months
        createdAt: serverTimestamp(),
        status: 'active'
      });
    });
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.toString() }), { status: 500 });
  }
}
