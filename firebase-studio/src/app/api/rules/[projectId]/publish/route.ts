import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getFirestore } from 'firebase-admin/firestore';
import { getDefaultAdminApp } from '@/lib/firebase-admin';
import { verifyRequest, requireProjectRole } from '@/lib/auth-helpers';

const schema = z.object({ ruleSetId: z.string() });

export async function POST(req: NextRequest, { params }: { params: { projectId: string } }) {
  const user = await verifyRequest(req);
  const authz = requireProjectRole(user, params.projectId, 'ADMIN');
  if (!authz.ok) return NextResponse.json({ code: 'forbidden' }, { status: authz.code });
  const parse = schema.safeParse(await req.json().catch(() => null));
  if (!parse.success) return NextResponse.json({ code: 'invalid' }, { status: 400 });
  const db = getFirestore(getDefaultAdminApp());
  await db.collection('ruleSets').doc(parse.data.ruleSetId).set({ published: true }, { merge: true });
  return NextResponse.json({ ok: true });
}

