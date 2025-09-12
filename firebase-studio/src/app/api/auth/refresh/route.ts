import { NextRequest, NextResponse } from 'next/server';
import { getAuth } from 'firebase-admin/auth';
import { getDefaultAdminApp } from '@/lib/firebase-admin';

export async function POST(req: NextRequest) {
  const authHeader = req.headers.get('authorization');
  const idToken = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : undefined;
  if (!idToken) return NextResponse.json({ code: 'unauthorized', message: 'Missing token' }, { status: 401 });
  try {
    const decoded = await getAuth(getDefaultAdminApp()).verifyIdToken(idToken, true);
    const user = await getAuth(getDefaultAdminApp()).getUser(decoded.uid);
    const newClaims = user.customClaims || {};
    await getAuth(getDefaultAdminApp()).setCustomUserClaims(decoded.uid, newClaims);
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ code: 'refresh_failed', message: e?.message ?? 'Failed' }, { status: 400 });
  }
}

