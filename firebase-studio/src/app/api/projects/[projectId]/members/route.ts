import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getFirestore } from 'firebase-admin/firestore';
import { getDefaultAdminApp } from '@/lib/firebase-admin';
import { verifyRequest, requireProjectRole } from '@/lib/auth-helpers';
import { writeAuditLog } from '@/lib/audit';

const addSchema = z.object({ userId: z.string(), role: z.enum(['OWNER', 'ADMIN', 'EDITOR', 'VIEWER']) });

export async function GET(req: NextRequest, { params }: { params: { projectId: string } }) {
  const user = await verifyRequest(req);
  const authz = requireProjectRole(user, params.projectId, 'VIEWER');
  if (!authz.ok) return NextResponse.json({ code: 'forbidden' }, { status: authz.code });
  const db = getFirestore(getDefaultAdminApp());
  const snap = await db.collection('projectMembers').where('projectId', '==', params.projectId).get();
  return NextResponse.json(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
}

export async function POST(req: NextRequest, { params }: { params: { projectId: string } }) {
  const user = await verifyRequest(req);
  const authz = requireProjectRole(user, params.projectId, 'ADMIN');
  if (!authz.ok) return NextResponse.json({ code: 'forbidden' }, { status: authz.code });
  const body = await req.json().catch(() => null);
  const parse = addSchema.safeParse(body);
  if (!parse.success) return NextResponse.json({ code: 'invalid' }, { status: 400 });
  const db = getFirestore(getDefaultAdminApp());
  const doc = db.collection('projectMembers').doc();
  await doc.set({ ...parse.data, projectId: params.projectId, createdAt: new Date() });
  await writeAuditLog({ projectId: params.projectId, actorUserId: user!.uid, action: 'member.add', resourceType: 'project', resourcePath: doc.path, diff: parse.data, status: 'success' });
  return NextResponse.json({ id: doc.id, ...parse.data });
}

