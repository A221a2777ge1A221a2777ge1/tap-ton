import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getFirestore } from 'firebase-admin/firestore';
import { getDefaultAdminApp } from '@/lib/firebase-admin';
import { verifyRequest } from '@/lib/auth-helpers';
import { writeAuditLog } from '@/lib/audit';
import { rateLimitKey } from '@/lib/rate-limit';

const createSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional()
});

export async function GET(req: NextRequest) {
  const user = await verifyRequest(req);
  if (!user) return NextResponse.json({ code: 'unauthorized', message: 'Unauthorized' }, { status: 401 });

  const db = getFirestore(getDefaultAdminApp());
  const snap = await db.collection('projectMembers').where('userId', '==', user.uid).get();
  const projectIds = Array.from(new Set(snap.docs.map((d) => d.get('projectId'))));
  if (projectIds.length === 0) return NextResponse.json([]);
  const projectsSnap = await db.getAll(...projectIds.map((id) => db.collection('projects').doc(id)));
  const projects = projectsSnap.filter((d) => d.exists).map((d) => ({ id: d.id, ...d.data() }));
  return NextResponse.json(projects);
}

export async function POST(req: NextRequest) {
  const keyInfo = rateLimitKey(`projects:create:${req.ip}`);
  if (!keyInfo.allowed) return NextResponse.json({ code: 'rate_limited' }, { status: 429 });

  const user = await verifyRequest(req);
  if (!user) return NextResponse.json({ code: 'unauthorized', message: 'Unauthorized' }, { status: 401 });

  const body = await req.json().catch(() => null);
  const parse = createSchema.safeParse(body);
  if (!parse.success) {
    return NextResponse.json({ code: 'invalid', message: 'Invalid body', details: parse.error.flatten() }, { status: 400 });
  }

  const db = getFirestore(getDefaultAdminApp());
  const projectRef = db.collection('projects').doc();
  const projectId = projectRef.id;
  const now = new Date();
  await db.runTransaction(async (tx) => {
    tx.set(projectRef, {
      name: parse.data.name,
      description: parse.data.description ?? '',
      createdAt: now,
      createdBy: user.uid,
      emulatorConfig: { host: '127.0.0.1', ports: { auth: 9099, firestore: 8080, storage: 9199, functions: 5001 } }
    });
    const memberRef = db.collection('projectMembers').doc();
    tx.set(memberRef, { projectId, userId: user.uid, role: 'OWNER', createdAt: now });
  });

  await writeAuditLog({ projectId, actorUserId: user.uid, action: 'project.create', resourceType: 'project', resourcePath: `projects/${projectId}`, status: 'success' });
  const doc = await projectRef.get();
  return NextResponse.json({ id: doc.id, ...doc.data() });
}

