export default function Footer() {
  return (
    <footer className="mt-24 border-t" style={{ borderColor: "var(--border)" }}>
      <div className="mx-auto max-w-6xl px-6 sm:px-10 md:px-16 lg:px-24 py-10 flex flex-col sm:flex-row items-center justify-between gap-4" style={{ color: "var(--muted-foreground)" }}>
        <p className="text-sm">© {new Date().getFullYear()} Tap-Ton. All rights reserved.</p>
        <nav className="flex items-center gap-5 text-sm">
          <a href="#privacy" className="hover:text-[var(--foreground)]">Privacy</a>
          <a href="#terms" className="hover:text-[var(--foreground)]">Terms</a>
          <a href="#contact" className="hover:text-[var(--foreground)]">Contact</a>
        </nav>
      </div>
    </footer>
  );
}

