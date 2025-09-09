import { NextResponse } from 'next/server';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const address = searchParams.get('address');

  if (!address) {
    return NextResponse.json({ error: 'Address is required' }, { status: 400 });
  }

  try {
    const userRef = doc(db, 'users', address);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const userData = userSnap.data();
    return NextResponse.json({
      balance: userData.balance,
      investments: userData.investments,
    });
  } catch (error) {
    console.error('Failed to fetch wallet data:', error);
    return NextResponse.json({ error: 'Failed to fetch wallet data' }, { status: 500 });
  }
}
