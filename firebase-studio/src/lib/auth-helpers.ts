import { NextRequest } from 'next/server';
import { getAuth } from 'firebase-admin/auth';
import { getDefaultAdminApp } from './firebase-admin';
import { Role, hasRoleAtLeast } from '@/types/rbac';

export type AuthedUser = {
  uid: string;
  email?: string;
  roles: Record<string, Role>;
};

export async function verifyRequest(req: NextRequest): Promise<AuthedUser | null> {
  const authHeader = req.headers.get('authorization');
  const cookieToken = req.cookies.get('session')?.value;
  const idToken = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : cookieToken;
  if (!idToken) return null;
  try {
    const decoded = await getAuth(getDefaultAdminApp()).verifyIdToken(idToken, true);
    const roles = (decoded.roles as Record<string, Role> | undefined) ?? {};
    return { uid: decoded.uid, email: decoded.email, roles };
  } catch {
    return null;
  }
}

export function requireProjectRole(user: AuthedUser | null, projectId: string, minRole: Role) {
  if (!user) return { ok: false as const, code: 401, message: 'Unauthorized' };
  const role = user.roles?.[projectId];
  if (!hasRoleAtLeast(role, minRole)) {
    return { ok: false as const, code: 403, message: 'Forbidden' };
  }
  return { ok: true as const };
}

