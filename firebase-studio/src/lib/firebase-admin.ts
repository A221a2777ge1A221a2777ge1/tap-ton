import { cert, getApp, getApps, initializeApp, App, ServiceAccount } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
import { getStorage } from 'firebase-admin/storage';
import { serverEnv } from './env';

type AdminInstances = {
  app: App;
};

const adminCache: Map<string, AdminInstances> = new Map();

function decodeServiceAccount(): ServiceAccount | undefined {
  const b64 = process.env.FIREBASE_ADMIN_CREDENTIALS_B64;
  if (!b64) return undefined;
  try {
    const json = Buffer.from(b64, 'base64').toString('utf8');
    return JSON.parse(json);
  } catch {
    return undefined;
  }
}

export function getAdminApp(projectId: string): App {
  const cacheKey = `admin:${projectId}`;
  const cached = adminCache.get(cacheKey);
  if (cached) return cached.app;

  const existing = getApps().find((a) => a.name === cacheKey);
  if (existing) return existing;

  const serviceAccount = decodeServiceAccount();
  const app = initializeApp(
    serviceAccount
      ? {
          credential: cert(serviceAccount),
          projectId
        }
      : {
          projectId
        },
    cacheKey
  );

  // Touch SDKs to ensure proper initialization
  getAuth(app);
  getFirestore(app);
  getStorage(app);

  adminCache.set(cacheKey, { app });
  return app;
}

export function getDefaultAdminApp(): App {
  const name = 'admin:default';
  try {
    return getApp(name);
  } catch {
    const serviceAccount = decodeServiceAccount();
    const app = initializeApp(
      serviceAccount ? { credential: cert(serviceAccount) } : {},
      name
    );
    return app;
  }
}

export function isEmulator(): boolean {
  return process.env.FIRESTORE_EMULATOR_HOST != null || process.env.FUNCTIONS_EMULATOR != null;
}

export function getEmulatorHostAndPorts() {
  return {
    host: serverEnv.EMULATOR_HOST,
    auth: serverEnv.EMULATOR_AUTH_PORT,
    firestore: serverEnv.EMULATOR_FIRESTORE_PORT,
    storage: serverEnv.EMULATOR_STORAGE_PORT,
    functions: serverEnv.EMULATOR_FUNCTIONS_PORT
  };
}

