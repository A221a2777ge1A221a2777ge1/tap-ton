import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-20 backdrop-blur supports-[backdrop-filter]:bg-[rgba(5,8,6,0.6)]">
      <div className="mx-auto max-w-6xl px-6 sm:px-10 md:px-16 lg:px-24 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold">
          <span className="inline-block h-3 w-3 rounded-sm" style={{ background: "var(--accent)" }} />
          <span>Tap-Ton</span>
        </Link>
        <nav className="hidden sm:flex items-center gap-6 text-sm" style={{ color: "var(--muted-foreground)" }}>
          <Link href="#features" className="hover:text-[var(--foreground)]">Features</Link>
          <Link href="#docs" className="hover:text-[var(--foreground)]">Docs</Link>
          <Link href="#pricing" className="hover:text-[var(--foreground)]">Pricing</Link>
        </nav>
        <div className="flex items-center gap-3">
          <a className="btn-ghost" href="#login">Log in</a>
          <a className="btn-primary" href="#signup">Sign up</a>
        </div>
      </div>
    </header>
  );
}

