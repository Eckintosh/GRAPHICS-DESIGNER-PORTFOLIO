"use client";

import Image from "next/image";
import type { Work } from "@/types";

interface WorkCardProps {
  work: Work;
  index: number;
  isAdmin: boolean;
  onOpen: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export function WorkCard({ work, index, isAdmin, onOpen, onEdit, onDelete }: WorkCardProps) {
  const tall = index % 5 === 0 || index % 5 === 3;

  return (
    <article
      className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:border-slate-300 hover:shadow-md dark:border-white/10 dark:bg-white/[0.03] dark:hover:border-white/25 dark:hover:shadow-none"
      style={{ animationDelay: `${(index % 12) * 40}ms` }}
    >
      <button
        onClick={onOpen}
        className="relative block w-full overflow-hidden"
        aria-label={`Open ${work.title}`}
      >
        <div className={`relative w-full ${tall ? "aspect-[4/5]" : "aspect-[4/3]"}`}>
          <Image
            src={work.image}
            alt={work.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition duration-700 ease-out group-hover:scale-[1.05]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/10 to-transparent opacity-90" />
          <div className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-slate-950/60 px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-white backdrop-blur">
            {work.category}
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-5">
            <h3 className="text-lg font-semibold text-white sm:text-xl">
              {work.title}
            </h3>
            <div className="mt-1 flex items-center gap-2 text-xs text-slate-300">
              {work.client && <span>{work.client}</span>}
              {work.client && work.year && <span>·</span>}
              {work.year && <span>{work.year}</span>}
            </div>
          </div>
          <div className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white opacity-0 backdrop-blur transition group-hover:opacity-100">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M7 17L17 7M17 7H9M17 7v8" />
            </svg>
          </div>
        </div>
      </button>

      {isAdmin && (
        <div className="flex items-center justify-end gap-2 border-t border-slate-200 bg-slate-50 px-3 py-2 dark:border-white/5 dark:bg-slate-950/50">
          <button
            onClick={onEdit}
            className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium text-slate-600 hover:bg-slate-200 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4 12.5-12.5z" />
            </svg>
            Edit
          </button>
          <button
            onClick={() => {
              if (confirm(`Delete "${work.title}"?`)) onDelete();
            }}
            className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium text-rose-600 hover:bg-rose-50 dark:text-rose-300 dark:hover:bg-rose-500/10 dark:hover:text-rose-200"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14z" />
            </svg>
            Delete
          </button>
        </div>
      )}
    </article>
  );
}
