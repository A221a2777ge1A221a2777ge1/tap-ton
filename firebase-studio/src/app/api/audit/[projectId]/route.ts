import { NextRequest, NextResponse } from 'next/server';
import { getFirestore } from 'firebase-admin/firestore';
import { getDefaultAdminApp } from '@/lib/firebase-admin';
import { verifyRequest, requireProjectRole } from '@/lib/auth-helpers';

export async function GET(req: NextRequest, { params }: { params: { projectId: string } }) {
  const user = await verifyRequest(req);
  const authz = requireProjectRole(user, params.projectId, 'VIEWER');
  if (!authz.ok) return NextResponse.json({ code: 'forbidden' }, { status: authz.code });
  const db = getFirestore(getDefaultAdminApp());
  const snap = await db
    .collection('auditLogs')
    .where('projectId', '==', params.projectId)
    .orderBy('createdAt', 'desc')
    .limit(100)
    .get();
  return NextResponse.json(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
}

