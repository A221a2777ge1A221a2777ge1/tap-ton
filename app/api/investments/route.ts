import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { app } from '@/lib/firebase';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const address = searchParams.get('address');

  if (!address) {
    return new Response(JSON.stringify({ error: 'Address is required' }), { status: 400 });
  }

  const db = getFirestore(app);

  try {
    const investmentsRef = collection(db, 'investments');
    const q = query(investmentsRef, where('userAddress', '==', address));
    const querySnapshot = await getDocs(q);
    
    const investments = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));

    return new Response(JSON.stringify(investments), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch investments' }), { status: 500 });
  }
}
