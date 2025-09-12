import { NextRequest, NextResponse } from 'next/server';
import { verifyRequest, requireProjectRole } from '@/lib/auth-helpers';

export async function GET(req: NextRequest, { params }: { params: { projectId: string } }) {
  const user = await verifyRequest(req);
  const authz = requireProjectRole(user, params.projectId, 'VIEWER');
  if (!authz.ok) return NextResponse.json({ code: 'forbidden' }, { status: authz.code });
  // Placeholder: require integration to list deployed functions
  return NextResponse.json([{ name: 'nextServer', region: 'us-central1', status: 'ACTIVE' }]);
}

