"use client";
import { useEffect, useState } from 'react';
import { collection, doc, getDocs, getFirestore, onSnapshot, query, setDoc } from 'firebase/firestore';

export default function FirestorePage() {
  const [db, setDb] = useState<any>(null);
  const [path, setPath] = useState('projects');
  const [docsState, setDocsState] = useState<any[]>([]);
  const [live, setLive] = useState(false);

  async function runQuery() {
    if (!db) return;
    const q = query(collection(db, path));
    const snap = await getDocs(q);
    setDocsState(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
  }

  function toggleLive() {
    setLive((v) => !v);
    if (!live && db) {
      return onSnapshot(collection(db, path), (snap) => {
        setDocsState(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
      });
    }
  }

  async function addDoc() {
    const newRef = doc(collection(db!, path));
    await setDoc(newRef, { createdAt: new Date().toISOString(), demo: true });
    await runQuery();
  }

  useEffect(() => {
    (async () => {
      const { getFirebaseApp } = await import('@/lib/firebase-client');
      setDb(getFirestore(getFirebaseApp()));
    })();
  }, []);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Firestore</h2>
      <div className="flex gap-2">
        <input className="border rounded p-2 flex-1" value={path} onChange={(e) => setPath(e.target.value)} />
        <button className="border rounded px-3" onClick={runQuery}>Run</button>
        <button className="border rounded px-3" onClick={toggleLive}>{live ? 'Stop Live' : 'Live'}</button>
        <button className="border rounded px-3" onClick={addDoc}>Add Doc</button>
      </div>
      <div className="border rounded">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-900">
              <th className="text-left p-2">id</th>
              <th className="text-left p-2">data</th>
            </tr>
          </thead>
          <tbody>
            {docsState.map((d) => (
              <tr key={d.id} className="border-t">
                <td className="p-2 font-mono text-xs">{d.id}</td>
                <td className="p-2">
                  <pre className="text-xs overflow-auto">{JSON.stringify(d, null, 2)}</pre>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

