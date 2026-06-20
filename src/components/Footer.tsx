"use client";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white py-10 dark:border-white/5 dark:bg-slate-950">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 text-sm text-slate-500 dark:text-slate-500 sm:flex-row lg:px-10">
        <div className="flex items-center gap-2.5">
          
          <span>© {new Date().getFullYear()} Eckintosh.</span>
        </div>
        <div className="flex items-center gap-5">
          <a href="#top" className="hover:text-slate-900 dark:hover:text-white">Back to top ↑</a>
        </div>
      </div>
    </footer>
  );
}
