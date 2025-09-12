export type Role = 'OWNER' | 'ADMIN' | 'EDITOR' | 'VIEWER';

export const roleRank: Record<Role, number> = {
  VIEWER: 1,
  EDITOR: 2,
  ADMIN: 3,
  OWNER: 4
};

export function hasRoleAtLeast(actual: Role | undefined, required: Role): boolean {
  if (!actual) return false;
  return roleRank[actual] >= roleRank[required];
}

export function isAdminOrOwner(actual: Role | undefined): boolean {
  return hasRoleAtLeast(actual, 'ADMIN');
}

