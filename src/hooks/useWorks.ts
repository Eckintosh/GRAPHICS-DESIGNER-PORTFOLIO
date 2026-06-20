import { useCallback, useEffect, useState } from "react";
import type { Work } from "@/types";
import { SEED_WORKS } from "@/data";

const STORAGE_KEY = "portfolio.works.v1";

function loadWorks(): Work[] {
  if (typeof window === "undefined") return SEED_WORKS;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return SEED_WORKS;
    const parsed = JSON.parse(raw) as Work[];
    if (!Array.isArray(parsed)) return SEED_WORKS;
    return parsed;
  } catch {
    return SEED_WORKS;
  }
}

export function useWorks() {
  const [works, setWorks] = useState<Work[]>(() => loadWorks());

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(works));
    } catch {
      /* ignore quota errors */
    }
  }, [works]);

  const addWork = useCallback((w: Omit<Work, "id" | "createdAt">) => {
    const newWork: Work = {
      ...w,
      id: `w-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`,
      createdAt: Date.now(),
    };
    setWorks((prev) => [newWork, ...prev]);
    return newWork;
  }, []);

  const updateWork = useCallback((id: string, patch: Partial<Work>) => {
    setWorks((prev) => prev.map((w) => (w.id === id ? { ...w, ...patch } : w)));
  }, []);

  const removeWork = useCallback((id: string) => {
    setWorks((prev) => prev.filter((w) => w.id !== id));
  }, []);

  const resetWorks = useCallback(() => {
    setWorks(SEED_WORKS);
  }, []);

  return { works, addWork, updateWork, removeWork, resetWorks };
}
