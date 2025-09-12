import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getAdminApp } from '@/lib/firebase-admin';
import { getFirestore, Query, FieldPath } from 'firebase-admin/firestore';
import { verifyRequest, requireProjectRole } from '@/lib/auth-helpers';

const bodySchema = z.object({
  collectionPath: z.string(),
  filters: z
    .array(
      z.object({
        field: z.string(),
        op: z.enum(['<', '<=', '==', '>=', '>', '!=', 'array-contains', 'array-contains-any', 'in', 'not-in']),
        value: z.any()
      })
    )
    .default([]),
  orderBy: z.array(z.object({ field: z.string(), direction: z.enum(['asc', 'desc']).default('asc') })).default([]),
  limit: z.number().min(1).max(1000).default(50)
});

export async function POST(req: NextRequest, { params }: { params: { projectId: string } }) {
  const user = await verifyRequest(req);
  const authz = requireProjectRole(user, params.projectId, 'VIEWER');
  if (!authz.ok) return NextResponse.json({ code: 'forbidden' }, { status: authz.code });
  const parse = bodySchema.safeParse(await req.json().catch(() => null));
  if (!parse.success) return NextResponse.json({ code: 'invalid' }, { status: 400 });
  const db = getFirestore(getAdminApp(params.projectId));
  let q: Query = db.collection(parse.data.collectionPath);
  for (const f of parse.data.filters) {
    q = q.where(f.field as any, f.op as any, f.value);
  }
  for (const o of parse.data.orderBy) {
    q = q.orderBy(o.field, o.direction);
  }
  q = q.limit(parse.data.limit);
  const snap = await q.get();
  return NextResponse.json(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
}

