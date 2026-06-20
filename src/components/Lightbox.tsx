"use client";

import { useEffect } from "react";
import type { Work } from "@/types";

interface LightboxProps {
  work: Work;
  onClose: () => void;
  isAdmin: boolean;
  onEdit: () => void;
  onDelete: () => void;
}

// Lightbox stays dark regardless of theme — it's a dramatic overlay.
export function Lightbox({ work, onClose, isAdmin, onEdit, onDelete }: LightboxProps) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm sm:p-8"
      onClick={onClose}
    >
      <div
        className="relative grid max-h-[92vh] w-full max-w-5xl grid-cols-1 overflow-hidden rounded-2xl border border-white/10 bg-slate-900 shadow-2xl sm:grid-cols-5"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative sm:col-span-3">
          <img
            src={work.image}
            alt={work.title}
            className="h-full max-h-[50vh] w-full object-cover sm:max-h-[92vh]"
          />
        </div>
        <div className="flex flex-col gap-5 overflow-y-auto p-6 sm:col-span-2 sm:p-8">
          <div>
            <span className="inline-block rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-amber-300">
              {work.category}
            </span>
            <h3 className="mt-4 text-2xl font-bold text-white sm:text-3xl">
              {work.title}
            </h3>
            <div className="mt-2 flex items-center gap-3 text-sm text-slate-400">
              {work.client && (
                <span className="inline-flex items-center gap-1.5">
                  <span className="text-slate-500">Client</span>
                  <span className="text-slate-200">{work.client}</span>
                </span>
              )}
              {work.client && work.year && <span className="text-slate-600">·</span>}
              {work.year && <span>{work.year}</span>}
            </div>
          </div>

          {work.description && (
            <p className="leading-relaxed text-slate-300">{work.description}</p>
          )}

          {work.tags && work.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {work.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-slate-300"
                >
                  #{t}
                </span>
              ))}
            </div>
          )}

          <div className="mt-auto flex flex-wrap gap-3 pt-4">
            {isAdmin && (
              <>
                <button
                  onClick={onEdit}
                  className="rounded-full border border-white/15 px-5 py-2 text-sm font-medium text-white transition hover:border-white/40"
                >
                  Edit Project
                </button>
                <button
                  onClick={() => {
                    if (confirm(`Delete "${work.title}"?`)) onDelete();
                  }}
                  className="rounded-full border border-rose-500/30 px-5 py-2 text-sm font-medium text-rose-300 transition hover:bg-rose-500/10"
                >
                  Delete
                </button>
              </>
            )}
            {!isAdmin && (
              <a
                href="#contact"
                onClick={onClose}
                className="rounded-full bg-amber-400 px-5 py-2 text-sm font-semibold text-slate-950 transition hover:bg-amber-300"
              >
                Start a Similar Project
              </a>
            )}
          </div>
        </div>

        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-slate-950/60 text-white backdrop-blur transition hover:bg-white/10"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}
