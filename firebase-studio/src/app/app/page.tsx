export default function DashboardPage() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Dashboard</h2>
      <p className="text-sm text-muted-foreground">Project health, quick links, recent activity.</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="border rounded p-4">Firestore</div>
        <div className="border rounded p-4">Storage</div>
        <div className="border rounded p-4">Auth</div>
      </div>
    </div>
  );
}

