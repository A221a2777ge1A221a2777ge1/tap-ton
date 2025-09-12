import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getAdminApp } from '@/lib/firebase-admin';
import { getFirestore } from 'firebase-admin/firestore';
import { verifyRequest, requireProjectRole } from '@/lib/auth-helpers';
import { writeAuditLog } from '@/lib/audit';

const bodySchema = z.object({ path: z.string(), merge: z.boolean().optional(), data: z.record(z.any()) });

export async function GET(req: NextRequest, { params }: { params: { projectId: string } }) {
  const path = new URL(req.url).searchParams.get('path');
  if (!path) return NextResponse.json({ code: 'invalid_path' }, { status: 400 });
  const db = getFirestore(getAdminApp(params.projectId));
  const doc = await db.doc(path).get();
  if (!doc.exists) return NextResponse.json({ code: 'not_found' }, { status: 404 });
  return NextResponse.json({ id: doc.id, ...doc.data() });
}

export async function POST(req: NextRequest, { params }: { params: { projectId: string } }) {
  const user = await verifyRequest(req);
  const authz = requireProjectRole(user, params.projectId, 'EDITOR');
  if (!authz.ok) return NextResponse.json({ code: 'forbidden' }, { status: authz.code });
  const parse = bodySchema.safeParse(await req.json().catch(() => null));
  if (!parse.success) return NextResponse.json({ code: 'invalid' }, { status: 400 });
  const db = getFirestore(getAdminApp(params.projectId));
  await db.doc(parse.data.path).set(parse.data.data, { merge: parse.data.merge ?? false });
  await writeAuditLog({ projectId: params.projectId, actorUserId: user!.uid, action: 'firestore.doc.write', resourceType: 'firestore', resourcePath: parse.data.path, diff: parse.data, status: 'success' });
  return NextResponse.json({ ok: true });
}

export async function DELETE(req: NextRequest, { params }: { params: { projectId: string } }) {
  const path = new URL(req.url).searchParams.get('path');
  if (!path) return NextResponse.json({ code: 'invalid_path' }, { status: 400 });
  const user = await verifyRequest(req);
  const authz = requireProjectRole(user, params.projectId, 'EDITOR');
  if (!authz.ok) return NextResponse.json({ code: 'forbidden' }, { status: authz.code });
  const db = getFirestore(getAdminApp(params.projectId));
  await db.doc(path).delete();
  await writeAuditLog({ projectId: params.projectId, actorUserId: user!.uid, action: 'firestore.doc.delete', resourceType: 'firestore', resourcePath: path, status: 'success' });
  return NextResponse.json({ ok: true });
}

