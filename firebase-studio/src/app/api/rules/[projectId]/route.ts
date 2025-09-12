import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getFirestore } from 'firebase-admin/firestore';
import { getDefaultAdminApp } from '@/lib/firebase-admin';
import { verifyRequest, requireProjectRole } from '@/lib/auth-helpers';

const createSchema = z.object({ type: z.enum(['firestore', 'storage']), source: z.string().min(10) });

export async function GET(req: NextRequest, { params }: { params: { projectId: string } }) {
  const user = await verifyRequest(req);
  const authz = requireProjectRole(user, params.projectId, 'VIEWER');
  if (!authz.ok) return NextResponse.json({ code: 'forbidden' }, { status: authz.code });
  const db = getFirestore(getDefaultAdminApp());
  const snap = await db.collection('ruleSets').where('projectId', '==', params.projectId).orderBy('createdAt', 'desc').limit(20).get();
  return NextResponse.json(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
}

export async function POST(req: NextRequest, { params }: { params: { projectId: string } }) {
  const user = await verifyRequest(req);
  const authz = requireProjectRole(user, params.projectId, 'ADMIN');
  if (!authz.ok) return NextResponse.json({ code: 'forbidden' }, { status: authz.code });
  const parse = createSchema.safeParse(await req.json().catch(() => null));
  if (!parse.success) return NextResponse.json({ code: 'invalid' }, { status: 400 });
  const db = getFirestore(getDefaultAdminApp());
  const doc = db.collection('ruleSets').doc();
  await doc.set({ projectId: params.projectId, type: parse.data.type, source: parse.data.source, version: Date.now(), published: false, createdBy: user!.uid, createdAt: new Date() });
  return NextResponse.json({ id: doc.id });
}

