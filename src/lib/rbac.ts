export type Role = "OWNER" | "ADMIN" | "EDITOR" | "VIEWER";

export function canRead(role?: Role) {
	return Boolean(role);
}
export function canWrite(role?: Role) {
	return role === "OWNER" || role === "ADMIN" || role === "EDITOR";
}
export function canAdmin(role?: Role) {
	return role === "OWNER" || role === "ADMIN";
}
export function isOwner(role?: Role) {
	return role === "OWNER";
}

export function getRoleFromClaims(claims: any, projectId: string): Role | undefined {
	const roles = (claims?.roles || {}) as Record<string, Role>;
	return roles[projectId];
}