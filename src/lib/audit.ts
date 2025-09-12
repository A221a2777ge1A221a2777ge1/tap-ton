import { getAdminServices } from "./firebaseAdmin";

type AuditParams = {
	projectId: string;
	actorUserId: string;
	action: string;
	resourceType: "firestore" | "storage" | "auth" | "rules" | "functions" | "hosting" | "project";
	resourcePath: string;
	diff?: any;
	status: "success" | "error";
	errorMessage?: string;
};

export async function writeAuditLog(params: AuditParams) {
	const { firestore } = getAdminServices(params.projectId);
	await firestore.collection("auditLogs").add({
		...params,
		createdAt: new Date()
	});
}