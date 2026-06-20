"use client";

interface AdminToolbarProps {
  onAdd: () => void;
}

export function AdminToolbar({ onAdd }: AdminToolbarProps) {
  return (
    <div className="fixed bottom-6 left-1/2 z-30 -translate-x-1/2">
      <div className="flex items-center gap-3 rounded-full border border-amber-500/40 bg-white/95 px-3 py-2 shadow-2xl shadow-amber-500/10 backdrop-blur-xl dark:border-amber-400/40 dark:bg-slate-950/90">
        <span className="flex items-center gap-2 px-3 text-xs font-medium text-amber-700 dark:text-amber-300">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-500 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-500" />
          </span>
          Admin Mode
        </span>
        <button
          onClick={onAdd}
          className="inline-flex items-center gap-1.5 rounded-full bg-amber-400 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-amber-300"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
            <path d="M12 5v14M5 12h14" />
          </svg>
          New Project
        </button>
      </div>
    </div>
  );
}
