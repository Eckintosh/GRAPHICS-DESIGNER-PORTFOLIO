import { useCallback, useEffect, useState } from "react";
import type { Work } from "@/types";

export function useWorks() {
  const [works, setWorks] = useState<Work[]>([]);
  const [loading, setLoading] = useState(true);

  // ── Load on mount ──────────────────────────────────────────────────────
  useEffect(() => {
    fetch("/api/works")
      .then((r) => r.json())
      .then((data: Work[]) => {
        setWorks(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        console.error("Failed to load works", err);
      })
      .finally(() => setLoading(false));
  }, []);

  // ── CRUD ───────────────────────────────────────────────────────────────
  const addWork = useCallback(async (w: Omit<Work, "id" | "createdAt">) => {
    const res = await fetch("/api/works", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(w),
    });
    if (!res.ok) throw new Error("Failed to create work");
    const newWork: Work = await res.json();
    setWorks((prev) => [newWork, ...prev]);
    return newWork;
  }, []);

  const updateWork = useCallback(async (id: string, patch: Partial<Work>) => {
    // Optimistic update
    setWorks((prev) => prev.map((w) => (w.id === id ? { ...w, ...patch } : w)));
    const res = await fetch(`/api/works/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(patch),
    });
    if (!res.ok) {
      // Rollback: re-fetch
      const fresh = await fetch("/api/works").then((r) => r.json());
      setWorks(fresh);
    }
  }, []);

  const removeWork = useCallback(async (id: string) => {
    // Optimistic update
    setWorks((prev) => prev.filter((w) => w.id !== id));
    const res = await fetch(`/api/works/${id}`, { method: "DELETE" });
    if (!res.ok) {
      const fresh = await fetch("/api/works").then((r) => r.json());
      setWorks(fresh);
    }
  }, []);

  const resetWorks = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/works/seed", { method: "POST" });
    if (res.ok) {
      const data: Work[] = await res.json();
      setWorks(data);
    }
    setLoading(false);
  }, []);

  return { works, loading, addWork, updateWork, removeWork, resetWorks };
}
