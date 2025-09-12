import { cookies, headers } from "next/headers";
import { getAuth } from "firebase-admin/auth";
import { getAdminApp } from "./firebaseAdmin";
import { getRoleFromClaims, Role } from "./rbac";

export type AuthedUser = {
	uid: string;
	email?: string | null;
	claims: any;
	role?: Role;
};

export async function requireUser(projectId?: string): Promise<AuthedUser> {
	const authHeader = headers().get("authorization");
	const token = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : undefined;
	if (!token) throw new Response(JSON.stringify({ code: "unauthenticated", message: "Missing token" }), { status: 401 });
	const app = getAdminApp(projectId || process.env.NEXT_PUBLIC_DEFAULT_PROJECT_ID || "demo-firebase");
	const decoded = await getAuth(app).verifyIdToken(token, true);
	const role = projectId ? getRoleFromClaims(decoded, projectId) : undefined;
	return { uid: decoded.uid, email: decoded.email ?? null, claims: decoded, role };
}

export function json(data: any, init?: number | ResponseInit) {
	return new Response(JSON.stringify(data), {
		status: typeof init === "number" ? init : init?.status || 200,
		headers: { "content-type": "application/json", ...(typeof init === "object" ? init.headers : undefined) }
	});
}