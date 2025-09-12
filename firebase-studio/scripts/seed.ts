/*
  Seed emulator with sample data and test user.
*/
import { initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';

initializeApp({ projectId: 'firebase-studio-emulator' });

async function main() {
  const auth = getAuth();
  const db = getFirestore();

  // Create admin user
  const email = 'admin@example.com';
  const existing = await auth.getUserByEmail(email).catch(() => null);
  const uid = existing?.uid ?? (await auth.createUser({ email, password: 'password123', emailVerified: true })).uid;
  await auth.setCustomUserClaims(uid, { roles: {} });

  // Create demo project
  const projectRef = db.collection('projects').doc('demo');
  await projectRef.set({
    name: 'Demo Project',
    description: 'Seeded project for emulator',
    createdAt: new Date(),
    createdBy: uid,
    emulatorConfig: { host: '127.0.0.1', ports: { auth: 9099, firestore: 8080, storage: 9199, functions: 5001 } }
  });
  await db.collection('projectMembers').add({ projectId: 'demo', userId: uid, role: 'OWNER', createdAt: new Date() });
  await auth.setCustomUserClaims(uid, { roles: { demo: 'OWNER' } });

  // Sample data
  await db.collection('projects').doc('demo').collection('samples').doc('hello').set({
    message: 'world',
    count: 1,
    updatedAt: new Date()
  });

  // eslint-disable-next-line no-console
  console.log('Seed completed');
}

main().catch((e) => {
  // eslint-disable-next-line no-console
  console.error(e);
  process.exit(1);
});

