import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getFirestore } from 'firebase-admin/firestore';
import { getDefaultAdminApp } from '@/lib/firebase-admin';
import { verifyRequest, requireProjectRole } from '@/lib/auth-helpers';
import { writeAuditLog } from '@/lib/audit';

const updateSchema = z.object({
  name: z.string().min(1).optional(),
  description: z.string().optional()
});

export async function GET(_req: NextRequest, { params }: { params: { projectId: string } }) {
  const db = getFirestore(getDefaultAdminApp());
  const doc = await db.collection('projects').doc(params.projectId).get();
  if (!doc.exists) return NextResponse.json({ code: 'not_found' }, { status: 404 });
  return NextResponse.json({ id: doc.id, ...doc.data() });
}

export async function PATCH(req: NextRequest, { params }: { params: { projectId: string } }) {
  const user = await verifyRequest(req);
  const authz = requireProjectRole(user, params.projectId, 'ADMIN');
  if (!authz.ok) return NextResponse.json({ code: 'forbidden', message: 'Forbidden' }, { status: authz.code });

  const body = await req.json().catch(() => null);
  const parse = updateSchema.safeParse(body);
  if (!parse.success) return NextResponse.json({ code: 'invalid', message: 'Invalid body' }, { status: 400 });

  const db = getFirestore(getDefaultAdminApp());
  await db.collection('projects').doc(params.projectId).set(parse.data, { merge: true });
  await writeAuditLog({ projectId: params.projectId, actorUserId: user!.uid, action: 'project.update', resourceType: 'project', resourcePath: `projects/${params.projectId}`, diff: parse.data, status: 'success' });
  const doc = await db.collection('projects').doc(params.projectId).get();
  return NextResponse.json({ id: doc.id, ...doc.data() });
}

export async function DELETE(req: NextRequest, { params }: { params: { projectId: string } }) {
  const user = await verifyRequest(req);
  const authz = requireProjectRole(user, params.projectId, 'OWNER');
  if (!authz.ok) return NextResponse.json({ code: 'forbidden', message: 'Forbidden' }, { status: authz.code });

  const db = getFirestore(getDefaultAdminApp());
  await db.collection('projects').doc(params.projectId).delete();
  await writeAuditLog({ projectId: params.projectId, actorUserId: user!.uid, action: 'project.delete', resourceType: 'project', resourcePath: `projects/${params.projectId}`, status: 'success' });
  return NextResponse.json({ ok: true });
}

