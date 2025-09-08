 

export default function Home() {
  return (
    <div className="font-sans min-h-screen">
      <main className="px-6 sm:px-10 md:px-16 lg:px-24 py-24">
        <section className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border" style={{ borderColor: "var(--border)", background: "rgba(34,197,94,0.06)" }}>
            <span className="h-2 w-2 rounded-full" style={{ background: "var(--accent)" }} />
            <span className="text-sm/6" style={{ color: "var(--muted-foreground)" }}>Now in Emerald theme</span>
          </div>

          <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight">
            Build modern apps with a crisp green on black UI
          </h1>
          <p className="mt-4 text-base sm:text-lg md:text-xl max-w-3xl mx-auto" style={{ color: "var(--muted-foreground)" }}>
            A sleek, high-contrast experience with accessible color choices, subtle depth,
            and delightful micro-interactions.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <a className="btn-primary" href="#get-started">Get started</a>
            <a className="btn-ghost" href="#learn-more">Learn more</a>
          </div>
        </section>

        <section id="features" className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {["Fast DX", "Beautiful defaults", "Accessible by design"].map((title, idx) => (
            <div key={idx} className="card p-6">
              <h3 className="text-xl font-semibold mb-2" style={{ color: "#d1fadf" }}>{title}</h3>
              <p style={{ color: "var(--muted-foreground)" }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut
                labore et dolore magna aliqua.
              </p>
            </div>
          ))}
        </section>

        <section id="docs" className="mt-20 max-w-6xl mx-auto">
          <div className="card p-8">
            <h2 className="text-2xl font-bold">Documentation</h2>
            <p className="mt-2" style={{ color: "var(--muted-foreground)" }}>
              Explore guides, examples, and API references to get productive faster.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a className="btn-primary" href="https://nextjs.org/docs" target="_blank" rel="noreferrer">Next.js Docs</a>
              <a className="btn-ghost" href="https://tailwindcss.com/docs" target="_blank" rel="noreferrer">Tailwind Docs</a>
            </div>
          </div>
        </section>

        <section id="pricing" className="mt-20 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {["Free", "Pro", "Enterprise"].map((tier, idx) => (
              <div key={idx} className="card p-6">
                <h3 className="text-xl font-semibold" style={{ color: "#d1fadf" }}>{tier}</h3>
                <p className="mt-2" style={{ color: "var(--muted-foreground)" }}>
                  Great for {tier === "Free" ? "trying things out" : tier === "Pro" ? "growing teams" : "large orgs"}.
                </p>
                <a className="btn-primary mt-6 inline-block" href="#get-started">Choose {tier}</a>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
