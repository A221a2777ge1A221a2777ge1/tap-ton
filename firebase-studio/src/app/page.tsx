import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="min-h-screen p-8">
      <div className="mx-auto max-w-3xl space-y-6">
        <h1 className="text-3xl font-semibold">Firebase Studio</h1>
        <p className="text-muted-foreground">Admin-grade dashboard for Firebase projects.</p>
        <div className="flex gap-4">
          <Link className="underline" href="/signin">Sign in</Link>
          <Link className="underline" href="/app">Open App</Link>
        </div>
      </div>
    </main>
  );
}

