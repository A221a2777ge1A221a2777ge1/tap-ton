import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { connectAuthEmulator, getAuth } from 'firebase/auth';
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore';
import { connectStorageEmulator, getStorage } from 'firebase/storage';
import { getClientEnv } from './env';

let firebaseApp: FirebaseApp | undefined;

export function getFirebaseApp(): FirebaseApp {
  if (firebaseApp) return firebaseApp;
  const apps = getApps();
  if (apps.length) return (firebaseApp = apps[0]);
  firebaseApp = initializeApp({
    ...(() => {
      const env = getClientEnv();
      return {
        apiKey: env.NEXT_PUBLIC_FIREBASE_API_KEY,
        authDomain: env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
        projectId: env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        storageBucket: env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
        appId: env.NEXT_PUBLIC_FIREBASE_APP_ID,
        messagingSenderId: env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
        measurementId: env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
      };
    })()
  });

  if (typeof window !== 'undefined' && location.hostname === 'localhost') {
    const auth = getAuth(firebaseApp);
    const firestore = getFirestore(firebaseApp);
    const storage = getStorage(firebaseApp);
    connectAuthEmulator(auth, `http://localhost:9099`, { disableWarnings: true });
    connectFirestoreEmulator(firestore, 'localhost', 8080);
    connectStorageEmulator(storage, 'localhost', 9199);
  }
  return firebaseApp;
}

export function getClientAuth() {
  return getAuth(getFirebaseApp());
}
export function getClientFirestore() {
  return getFirestore(getFirebaseApp());
}
export function getClientStorage() {
  return getStorage(getFirebaseApp());
}

