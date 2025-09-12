"use client";
import { useState } from 'react';

const firestoreTemplate = `rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents { match /{document=**} { allow read, write: if false; } }
}`;

const storageTemplate = `rules_version = '2';
service firebase.storage { match /b/{bucket}/o { match /{allPaths=**} { allow read, write: if false; } } }`;

export default function RulesPage() {
  const [type, setType] = useState<'firestore' | 'storage'>('firestore');
  const [source, setSource] = useState(firestoreTemplate);
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Rules</h2>
      <div className="flex gap-2 items-center">
        <select className="border rounded p-2" value={type} onChange={(e) => setType(e.target.value as any)}>
          <option value="firestore">Firestore</option>
          <option value="storage">Storage</option>
        </select>
        <button className="border rounded px-3">Simulate</button>
        <button className="border rounded px-3">Publish</button>
      </div>
      <textarea className="w-full h-96 border rounded p-2 font-mono text-sm" value={source} onChange={(e) => setSource(e.target.value)} />
    </div>
  );
}

