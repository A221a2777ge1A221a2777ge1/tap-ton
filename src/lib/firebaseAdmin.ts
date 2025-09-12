import { App, cert, getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
import { getStorage } from "firebase-admin/storage";
import { serverEnv } from "./env";

const appCache = new Map<string, App>();

function getCredentials(projectId: string) {
	if (serverEnv.FIREBASE_SERVICE_ACCOUNT_BASE64) {
		const json = Buffer.from(serverEnv.FIREBASE_SERVICE_ACCOUNT_BASE64, "base64").toString("utf8");
		const creds = JSON.parse(json);
		return cert({
			projectId,
			clientEmail: creds.client_email,
			privateKey: creds.private_key
		});
	}
	return undefined;
}

export function getAdminApp(projectId: string) {
	if (appCache.has(projectId)) return appCache.get(projectId)!;
	const app = initializeApp(
		{
			credential: getCredentials(projectId),
			projectId
		},
		projectId
	);
	appCache.set(projectId, app);
	return app;
}

export function getAdminServices(projectId: string) {
	const app = getAdminApp(projectId);
	const firestore = getFirestore(app);
	const auth = getAuth(app);
	const storage = getStorage(app);
	return { app, firestore, auth, storage };
}