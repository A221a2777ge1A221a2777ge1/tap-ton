import { getFirestore } from 'firebase-admin/firestore';
import { getDefaultAdminApp } from './firebase-admin';

type AuditParams = {
  projectId: string;
  actorUserId: string;
  action: string;
  resourceType: 'firestore' | 'storage' | 'auth' | 'rules' | 'functions' | 'hosting' | 'project';
  resourcePath: string;
  diff?: unknown;
  status: 'success' | 'error';
  errorMessage?: string;
};

export async function writeAuditLog(params: AuditParams) {
  const db = getFirestore(getDefaultAdminApp());
  const doc = db.collection('auditLogs').doc();
  await doc.set({
    ...params,
    createdAt: new Date()
  });
}

