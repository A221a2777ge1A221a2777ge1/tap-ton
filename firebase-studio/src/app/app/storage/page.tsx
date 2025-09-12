"use client";
import { useEffect, useState } from 'react';
import { getDownloadURL, list, ref, uploadBytes } from 'firebase/storage';

export default function StoragePage() {
  const [storage, setStorage] = useState<any>(null);
  const [prefix, setPrefix] = useState('projects/demo/');
  const [items, setItems] = useState<any[]>([]);

  async function refresh() {
    if (!storage) return;
    const l = await list(ref(storage, prefix));
    setItems([...(l.prefixes ?? []), ...(l.items ?? [])]);
  }

  useEffect(() => {
    (async () => {
      const { getClientStorage } = await import('@/lib/firebase-client');
      setStorage(getClientStorage());
    })();
  }, []);

  useEffect(() => {
    refresh();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prefix, storage]);

  async function onUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const target = ref(storage!, prefix + file.name);
    await uploadBytes(target, file);
    await refresh();
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Storage</h2>
      <div className="flex gap-2">
        <input className="border rounded p-2 flex-1" value={prefix} onChange={(e) => setPrefix(e.target.value)} />
        <input type="file" onChange={onUpload} />
      </div>
      <ul className="space-y-1 text-sm">
        {items.map((it) => (
          <li key={it.fullPath} className="flex items-center gap-2">
            <span className="font-mono text-xs">{it.fullPath}</span>
            {it.bucket && (
              <a className="underline" onClick={async () => window.open(await getDownloadURL(it))}>download</a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

