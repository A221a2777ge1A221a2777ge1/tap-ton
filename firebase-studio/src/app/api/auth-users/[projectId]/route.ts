import { NextRequest, NextResponse } from 'next/server';
import { getAuth } from 'firebase-admin/auth';
import { getAdminApp } from '@/lib/firebase-admin';
import { verifyRequest, requireProjectRole } from '@/lib/auth-helpers';
import { z } from 'zod';

const createSchema = z.object({ email: z.string().email(), password: z.string().min(6), displayName: z.string().optional(), disabled: z.boolean().optional(), customClaims: z.record(z.any()).optional() });

export async function GET(req: NextRequest, { params }: { params: { projectId: string } }) {
  const user = await verifyRequest(req);
  const authz = requireProjectRole(user, params.projectId, 'ADMIN');
  if (!authz.ok) return NextResponse.json({ code: 'forbidden' }, { status: authz.code });
  const email = new URL(req.url).searchParams.get('email');
  if (!email) return NextResponse.json({ code: 'invalid' }, { status: 400 });
  try {
    const u = await getAuth(getAdminApp(params.projectId)).getUserByEmail(email);
    return NextResponse.json({ uid: u.uid, email: u.email, displayName: u.displayName, disabled: u.disabled, customClaims: u.customClaims });
  } catch {
    return NextResponse.json({ code: 'not_found' }, { status: 404 });
  }
}

export async function POST(req: NextRequest, { params }: { params: { projectId: string } }) {
  const user = await verifyRequest(req);
  const authz = requireProjectRole(user, params.projectId, 'ADMIN');
  if (!authz.ok) return NextResponse.json({ code: 'forbidden' }, { status: authz.code });
  const parse = createSchema.safeParse(await req.json().catch(() => null));
  if (!parse.success) return NextResponse.json({ code: 'invalid' }, { status: 400 });
  const auth = getAuth(getAdminApp(params.projectId));
  const created = await auth.createUser({ email: parse.data.email, password: parse.data.password, displayName: parse.data.displayName, disabled: parse.data.disabled });
  if (parse.data.customClaims) await auth.setCustomUserClaims(created.uid, parse.data.customClaims);
  return NextResponse.json({ uid: created.uid });
}

