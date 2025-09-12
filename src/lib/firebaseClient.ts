import { initializeApp, getApps, FirebaseApp } from "firebase/app";
import { connectAuthEmulator, getAuth, GoogleAuthProvider } from "firebase/auth";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";
import { connectStorageEmulator, getStorage } from "firebase/storage";

let app: FirebaseApp | undefined;

export function getClientApp() {
	if (!app) {
		app = initializeApp({
			apiKey: "demo",
			authDomain: "demo.firebaseapp.com",
			projectId: process.env.NEXT_PUBLIC_DEFAULT_PROJECT_ID || "demo-firebase",
			storageBucket: `${process.env.NEXT_PUBLIC_DEFAULT_PROJECT_ID || "demo-firebase"}.appspot.com`
		});
		const host = process.env.NEXT_PUBLIC_EMULATOR_HOST || "localhost";
		const auth = getAuth(app);
		connectAuthEmulator(auth, `http://${host}:9099`, { disableWarnings: true });
		const db = getFirestore(app);
		connectFirestoreEmulator(db, host, 8080);
		const storage = getStorage(app);
		connectStorageEmulator(storage, host, 9199);
	}
	return app!;
}

export function getAuthClient() {
	return getAuth(getClientApp());
}
export function getFirestoreClient() {
	return getFirestore(getClientApp());
}
export function getStorageClient() {
	return getStorage(getClientApp());
}
export const googleProvider = new GoogleAuthProvider();