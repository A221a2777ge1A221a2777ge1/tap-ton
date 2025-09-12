import { NextRequest, NextResponse } from 'next/server';
import { getStorage } from 'firebase-admin/storage';
import { getAdminApp } from '@/lib/firebase-admin';
import { verifyRequest, requireProjectRole } from '@/lib/auth-helpers';

export async function GET(req: NextRequest, { params }: { params: { projectId: string } }) {
  const user = await verifyRequest(req);
  const authz = requireProjectRole(user, params.projectId, 'VIEWER');
  if (!authz.ok) return NextResponse.json({ code: 'forbidden' }, { status: authz.code });

  const prefix = new URL(req.url).searchParams.get('prefix') ?? '';
  const bucket = getStorage(getAdminApp(params.projectId)).bucket();
  const [files] = await bucket.getFiles({ prefix, autoPaginate: false, maxResults: 100 });
  return NextResponse.json(files.map((f) => ({ name: f.name, size: f.metadata.size, contentType: f.metadata.contentType, updated: f.metadata.updated })));
}

