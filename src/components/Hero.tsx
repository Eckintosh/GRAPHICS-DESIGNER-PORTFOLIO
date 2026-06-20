"use client";

export function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28"
    >
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-amber-400/25 blur-[120px] dark:bg-amber-500/20" />
        <div className="absolute right-[-120px] top-40 h-[320px] w-[320px] rounded-full bg-rose-400/15 blur-[100px] dark:bg-fuchsia-500/10" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex flex-col items-start gap-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/60 px-4 py-1.5 text-xs font-medium text-slate-700 backdrop-blur dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            MARK AGGREY
          </span>

          <h1 className="max-w-4xl text-5xl font-bold leading-[1.05] tracking-tight text-slate-900 dark:text-white sm:text-6xl lg:text-7xl">
            Designing brands that{" "}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 bg-clip-text text-transparent dark:from-amber-300 dark:via-orange-400 dark:to-rose-400">
                feel alive
              </span>
              <svg
                className="absolute -bottom-2 left-0 w-full"
                viewBox="0 0 300 12"
                fill="none"
                preserveAspectRatio="none"
              >
                <path
                  d="M2 8 C 80 2, 160 12, 298 4"
                  stroke="url(#g)"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient id="g" x1="0" x2="1">
                    <stop offset="0" stopColor="#f59e0b" />
                    <stop offset="1" stopColor="#f43f5e" />
                  </linearGradient>
                </defs>
              </svg>
            </span>
            .
          </h1>

          <p className="max-w-2xl text-lg text-slate-600 dark:text-slate-400 sm:text-xl">
            I'm <span className="text-slate-900 dark:text-white">Eckintosh</span> — a freelance
            graphic designer crafting logos, brand systems, brochures and
            digital experiences for startups and studios across the globe.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <a
              href="#work"
              className="group inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-amber-300"
            >
              View Selected Work
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="transition group-hover:translate-x-0.5">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-900 transition hover:border-slate-500 dark:border-white/15 dark:text-white dark:hover:border-white/40"
            >
              Start a Project
            </a>
          </div>

          {/* Stats */}
          <div className="mt-12 grid w-full grid-cols-2 gap-8 border-t border-slate-200 pt-8 dark:border-white/10 sm:grid-cols-4">
            {[
              { k: "120+", v: "Projects delivered" },
              { k: "45", v: "Happy clients" },
              { k: "8yrs", v: "Experience" },
              { k: "14", v: "Design awards" },
            ].map((s) => (
              <div key={s.v}>
                <div className="text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">
                  {s.k}
                </div>
                <div className="mt-1 text-sm text-slate-500 dark:text-slate-400">{s.v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
