"use client";

export function About() {
  const skills = [
    { name: "Brand Identity", level: 95 },
    { name: "Logo Design", level: 98 },
    { name: "Print & Editorial", level: 90 },
    { name: "Packaging", level: 88 },
    { name: "Digital & Social", level: 92 },
    { name: "Illustration", level: 80 },
  ];

  const tools = [
    "Figma",
    "Adobe Illustrator",
    "Photoshop",
    "InDesign",
    "After Effects",
    "Blender",
    "Procreate",
  ];

  return (
    <section id="about" className="relative border-t border-slate-200 bg-slate-50/60 py-24 dark:border-white/5 dark:bg-slate-950/60">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-14 px-6 lg:grid-cols-5 lg:px-10">
        <div className="lg:col-span-2">
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-amber-600 dark:text-amber-400">
            About
          </p>
          <h2 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
            Curious designer,
            <br />
            strategic thinker.
          </h2>
          <div className="mt-6 space-y-4 text-slate-600 dark:text-slate-400">
            <p>
              Based in Bangalore, I've spent the last 8 years helping startups
              and established brands find their voice through thoughtful visual
              systems. I believe great design is invisible — it simply works.
            </p>
            <p>
              When I'm not pushing pixels, you'll find me sketching in coffee
              shops, collecting vintage design books, or hiking the Western
              Ghats.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-2">
            {tools.map((t) => (
              <span
                key={t}
                className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-300"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        <div className="lg:col-span-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-8 dark:border-white/10 dark:bg-white/[0.02]">
            <h3 className="mb-6 text-sm font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Core Skills
            </h3>
            <div className="space-y-5">
              {skills.map((s) => (
                <div key={s.name}>
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span className="text-slate-900 dark:text-white">{s.name}</span>
                    <span className="text-slate-500 dark:text-slate-500">{s.level}%</span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-white/5">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-amber-500 to-orange-500"
                      style={{ width: `${s.level}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { t: "2018", s: "Freelance launch" },
              { t: "2020", s: "Awwwards HM" },
              { t: "2022", s: "Type Directors Club" },
              { t: "2024", s: "Brand New feature" },
            ].map((m) => (
              <div
                key={m.t}
                className="rounded-xl border border-slate-200 bg-white p-4 dark:border-white/10 dark:bg-white/[0.02]"
              >
                <div className="text-xl font-bold text-amber-600 dark:text-amber-400">{m.t}</div>
                <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">{m.s}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
