import { NextResponse } from 'next/server';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export async function POST(req: Request) {
  const { address } = await req.json();

  if (!address) {
    return NextResponse.json({ error: 'Address is required' }, { status: 400 });
  }

  try {
    const userRef = doc(db, 'users', address);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      // Create a new user
      const newUser = {
        address,
        balance: 1000,
        lastLogin: new Date(),
        investments: [],
      };
      await setDoc(userRef, newUser);
      return NextResponse.json(newUser);
    } else {
      // Return existing user data
      return NextResponse.json(userSnap.data());
    }
  } catch (error) {
    console.error('Failed to connect:', error);
    return NextResponse.json({ error: 'Failed to connect' }, { status: 500 });
  }
}
