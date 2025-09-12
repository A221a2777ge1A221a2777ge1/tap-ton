import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getFirestore } from 'firebase-admin/firestore';
import { getDefaultAdminApp } from '@/lib/firebase-admin';
import { verifyRequest, requireProjectRole } from '@/lib/auth-helpers';
import { writeAuditLog } from '@/lib/audit';

const updateSchema = z.object({ role: z.enum(['OWNER', 'ADMIN', 'EDITOR', 'VIEWER']) });

export async function PATCH(req: NextRequest, { params }: { params: { projectId: string; memberId: string } }) {
  const user = await verifyRequest(req);
  const authz = requireProjectRole(user, params.projectId, 'ADMIN');
  if (!authz.ok) return NextResponse.json({ code: 'forbidden' }, { status: authz.code });
  const body = await req.json().catch(() => null);
  const parse = updateSchema.safeParse(body);
  if (!parse.success) return NextResponse.json({ code: 'invalid' }, { status: 400 });
  const db = getFirestore(getDefaultAdminApp());
  const ref = db.collection('projectMembers').doc(params.memberId);
  await ref.set({ role: parse.data.role }, { merge: true });
  await writeAuditLog({ projectId: params.projectId, actorUserId: user!.uid, action: 'member.update', resourceType: 'project', resourcePath: ref.path, diff: parse.data, status: 'success' });
  return NextResponse.json({ ok: true });
}

export async function DELETE(req: NextRequest, { params }: { params: { projectId: string; memberId: string } }) {
  const user = await verifyRequest(req);
  const authz = requireProjectRole(user, params.projectId, 'ADMIN');
  if (!authz.ok) return NextResponse.json({ code: 'forbidden' }, { status: authz.code });
  const db = getFirestore(getDefaultAdminApp());
  const ref = db.collection('projectMembers').doc(params.memberId);
  await ref.delete();
  await writeAuditLog({ projectId: params.projectId, actorUserId: user!.uid, action: 'member.delete', resourceType: 'project', resourcePath: ref.path, status: 'success' });
  return NextResponse.json({ ok: true });
}

