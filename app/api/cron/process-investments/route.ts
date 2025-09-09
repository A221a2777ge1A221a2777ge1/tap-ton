import { getFirestore, collection, query, where, getDocs, doc, writeBatch } from 'firebase/firestore';
import { app } from '@/lib/firebase';

// Simple interest rate for now
const INTEREST_RATE = 0.05; // 5% per month

export async function GET(req: Request) {
    const db = getFirestore(app);

    try {
        const investmentsRef = collection(db, 'investments');
        const q = query(investmentsRef, where('status', '==', 'active'));
        const querySnapshot = await getDocs(q);
        const batch = writeBatch(db);

        querySnapshot.forEach(document => {
            const investment = document.data();
            const createdAt = investment.createdAt.toDate(); // Convert firestore timestamp to date
            const now = new Date();

            const monthsPassed = (now.getFullYear() - createdAt.getFullYear()) * 12 + (now.getMonth() - createdAt.getMonth());

            if (monthsPassed >= investment.duration) {
                const userRef = doc(db, 'users', investment.userAddress);
                const investmentRef = doc(db, 'investments', document.id);

                const interest = investment.amount * investment.duration * INTEREST_RATE;
                const newBalance = investment.amount + interest;

                batch.update(userRef, { balance: newBalance });
                batch.update(investmentRef, { status: 'completed' });
            }
        });

        await batch.commit();

        return new Response(JSON.stringify({ success: true }), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Failed to process investments' }), { status: 500 });
    }
}
