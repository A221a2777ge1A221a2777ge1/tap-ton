import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { verifyRequest, requireProjectRole } from '@/lib/auth-helpers';

const schema = z.object({ type: z.enum(['firestore', 'storage']), method: z.string(), path: z.string(), authContext: z.record(z.any()).optional(), resource: z.record(z.any()).optional() });

// Placeholder simulation (real simulation would call Google Rules API or emulator endpoint)
export async function POST(req: NextRequest, { params }: { params: { projectId: string } }) {
  const user = await verifyRequest(req);
  const authz = requireProjectRole(user, params.projectId, 'VIEWER');
  if (!authz.ok) return NextResponse.json({ code: 'forbidden' }, { status: authz.code });
  const parse = schema.safeParse(await req.json().catch(() => null));
  if (!parse.success) return NextResponse.json({ code: 'invalid' }, { status: 400 });
  return NextResponse.json({ allow: true, matched: 'mockRuleSegment', input: parse.data });
}

