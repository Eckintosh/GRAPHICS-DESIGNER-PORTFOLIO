import { useEffect, useMemo, useState } from "react";
import type { Category, Work } from "@/types";
import { WorkCard } from "./WorkCard";
import { Lightbox } from "./Lightbox";

const CATEGORIES: Category[] = [
  "All",
  "Logo",
  "Branding",
  "Brochure",
  "Packaging",
  "Social Media",
  "Poster",
  "Illustration",
];

interface PortfolioProps {
  works: Work[];
  loading?: boolean;
  isAdmin: boolean;
  onEdit: (w: Work) => void;
  onDelete: (id: string) => void;
}

export function Portfolio({ works, loading = false, isAdmin, onEdit, onDelete }: PortfolioProps) {
  const [active, setActive] = useState<Category>("All");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Work | null>(null);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    setShowAll(false);
  }, [active, query]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return works
      .filter((w) => (active === "All" ? true : w.category === active))
      .filter((w) => {
        if (!q) return true;
        return (
          w.title.toLowerCase().includes(q) ||
          (w.client ?? "").toLowerCase().includes(q) ||
          (w.tags ?? []).some((t) => t.toLowerCase().includes(q))
        );
      })
      .sort((a, b) => b.createdAt - a.createdAt);
  }, [works, active, query]);

  const displayedWorks = useMemo(() => {
    return showAll ? filtered : filtered.slice(0, 20);
  }, [filtered, showAll]);

  const counts = useMemo(() => {
    const map: Record<string, number> = { All: works.length };
    for (const w of works) map[w.category] = (map[w.category] ?? 0) + 1;
    return map;
  }, [works]);

  return (
    <section id="work" className="relative mx-auto max-w-7xl px-6 py-20 lg:px-10">
      <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-amber-600 dark:text-amber-400">
            Selected Work
          </p>
          <h2 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
            A decade of brand stories.
          </h2>
          <p className="mt-4 text-slate-600 dark:text-slate-400">
            Filter by category, search by keyword, or scroll through the
            archive. Click any piece for project details.
          </p>
        </div>

        <div className="relative w-full md:w-72">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search projects, clients, tags…"
            className="w-full rounded-full border border-slate-200 bg-white/70 py-2.5 pl-11 pr-4 text-sm text-slate-900 placeholder-slate-400 outline-none transition focus:border-amber-500 focus:bg-white dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder-slate-500 dark:focus:border-amber-400/60 dark:focus:bg-white/10"
          />
        </div>
      </div>

      {/* Category filter */}
      <div className="mt-10 -mx-6 overflow-x-auto px-6 lg:-mx-10 lg:px-10">
        <div className="flex min-w-max items-center gap-2 pb-2">
          {CATEGORIES.map((c) => {
            const count = counts[c] ?? 0;
            const isActive = active === c;
            const disabled = !isActive && count === 0;
            return (
              <button
                key={c}
                onClick={() => setActive(c)}
                disabled={disabled}
                className={`group inline-flex items-center gap-2 whitespace-nowrap rounded-full border px-4 py-2 text-sm transition ${
                  isActive
                    ? "border-amber-500 bg-amber-400 text-slate-950 dark:border-amber-400"
                    : disabled
                    ? "border-slate-200 bg-slate-50 text-slate-400 dark:border-white/5 dark:bg-white/[0.02] dark:text-slate-600"
                    : "border-slate-200 bg-white text-slate-700 hover:border-slate-400 hover:text-slate-900 dark:border-white/10 dark:bg-white/[0.03] dark:text-slate-300 dark:hover:border-white/25 dark:hover:text-white"
                }`}
              >
                <span className="font-medium">{c}</span>
                <span
                  className={`rounded-full px-1.5 py-0.5 text-[10px] font-semibold ${
                    isActive
                      ? "bg-slate-950/15 text-slate-950"
                      : "bg-slate-900/10 text-slate-600 dark:bg-white/10 dark:text-slate-400"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid */}
      <div className="mt-8">
        {loading ? (
          /* Skeleton loader */
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="animate-pulse overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 dark:border-white/10 dark:bg-white/[0.04]"
              >
                <div className="aspect-[4/3] bg-slate-200 dark:bg-white/10" />
                <div className="p-4">
                  <div className="mb-2 h-3 w-1/3 rounded-full bg-slate-200 dark:bg-white/10" />
                  <div className="h-4 w-3/4 rounded-full bg-slate-200 dark:bg-white/10" />
                  <div className="mt-2 h-3 w-1/2 rounded-full bg-slate-200 dark:bg-white/10" />
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 py-24 text-center dark:border-white/10 dark:bg-white/[0.02]">
            <p className="text-slate-500 dark:text-slate-400">
              No projects found.{" "}
              {isAdmin ? "Use Admin mode to add one." : "Try a different filter."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((w, i) => (
              <WorkCard
                key={w.id}
                work={w}
                index={i}
                isAdmin={isAdmin}
                onOpen={() => setSelected(w)}
                onEdit={() => onEdit(w)}
                onDelete={() => onDelete(w.id)}
              />
            ))}
          </div>
        )}
      </div>

      {selected && (
        <Lightbox
          work={selected}
          onClose={() => setSelected(null)}
          isAdmin={isAdmin}
          onEdit={() => {
            onEdit(selected);
            setSelected(null);
          }}
          onDelete={() => {
            onDelete(selected.id);
            setSelected(null);
          }}
        />
      )}
    </section>
  );
}
