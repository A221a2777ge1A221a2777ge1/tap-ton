'use client';

import Link from 'next/link';

interface InvestmentCardProps {
  title: string;
  description: string;
  icon: string;
}

const InvestmentCard = ({ title, description, icon }: InvestmentCardProps) => (
  <div className="bg-gray-800 rounded-lg p-6 text-center">
    <div className="text-4xl mb-4">{icon}</div>
    <h3 className="text-xl font-bold mb-2 text-yellow-400">{title}</h3>
    <p className="text-gray-400">{description}</p>
  </div>
);

export default function Page() {
	return (
		<div className="space-y-4">
			<h1 className="text-2xl font-semibold">Dashboard</h1>
			<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
				<div className="border rounded p-4">
					<h2 className="font-medium mb-2">Project Health</h2>
					<p className="text-sm text-muted-foreground">Connect to a project to see stats.</p>
				</div>
				<div className="border rounded p-4">
					<h2 className="font-medium mb-2">Recent Activity</h2>
					<p className="text-sm text-muted-foreground">Audit log entries appear here.</p>
				</div>
				<div className="border rounded p-4">
					<h2 className="font-medium mb-2">Quick Links</h2>
					<ul className="list-disc list-inside text-sm">
						<li><a className="underline" href="/firestore">Open Firestore</a></li>
						<li><a className="underline" href="/storage">Open Storage</a></li>
						<li><a className="underline" href="/auth">Open Auth</a></li>
					</ul>
				</div>
			</div>
		</div>
	);
}
