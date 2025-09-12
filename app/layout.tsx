import "./globals.css";
import { ReactNode } from "react";
import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";

export const metadata = {
	title: "Firebase Studio",
	description: "Admin dashboard for Firebase projects"
};

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body>
				<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
					<div className="min-h-dvh flex">
						<aside className="w-64 shrink-0 border-r hidden md:block">
							<div className="p-4 font-semibold">Firebase Studio</div>
							<nav className="px-2 space-y-1">
								<a className="block px-3 py-2 rounded hover:bg-muted" href="/">Dashboard</a>
								<a className="block px-3 py-2 rounded hover:bg-muted" href="/firestore">Firestore</a>
								<a className="block px-3 py-2 rounded hover:bg-muted" href="/storage">Storage</a>
								<a className="block px-3 py-2 rounded hover:bg-muted" href="/auth">Authentication</a>
								<a className="block px-3 py-2 rounded hover:bg-muted" href="/rules">Rules</a>
								<a className="block px-3 py-2 rounded hover:bg-muted" href="/functions">Functions</a>
								<a className="block px-3 py-2 rounded hover:bg-muted" href="/audit">Audit Logs</a>
								<a className="block px-3 py-2 rounded hover:bg-muted" href="/settings">Settings</a>
							</nav>
						</aside>
						<main className="flex-1 min-w-0">
							<header className="h-14 border-b flex items-center justify-between px-3 gap-3">
								<div className="flex items-center gap-2">
									<button className="md:hidden inline-flex items-center justify-center h-9 w-9 border rounded" aria-label="Menu">≡</button>
									<select className="border rounded px-2 h-9">
										<option>Default Project</option>
									</select>
								</div>
								<div className="flex items-center gap-2">
									<button className="h-9 px-3 border rounded">Sign in</button>
								</div>
							</header>
							<div className="p-4">{children}</div>
						</main>
					</div>
					<Toaster richColors />
				</ThemeProvider>
			</body>
		</html>
	);
}
