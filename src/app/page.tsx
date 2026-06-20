"use client";

import { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Portfolio } from "@/components/Portfolio";
import { AdminPanel } from "@/components/AdminPanel";
import { AdminToolbar } from "@/components/AdminToolbar";
import { LoginModal } from "@/components/LoginModal";
import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { useWorks } from "@/hooks/useWorks";
import { useTheme } from "@/hooks/useTheme";
import type { Work } from "@/types";



export default function HomePage() {
  const { works, addWork, updateWork, removeWork, resetWorks } = useWorks();
  const { theme, toggle } = useTheme();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [panelOpen, setPanelOpen] = useState(false);
  const [editing, setEditing] = useState<Work | null>(null);

  const handleAdminToggle = () => {
    if (isAdmin) {
      setIsAdmin(false);
      return;
    }
    setLoginOpen(true);
  };

  const openAdd = () => {
    setEditing(null);
    setPanelOpen(true);
  };

  const openEdit = (w: Work) => {
    setEditing(w);
    setPanelOpen(true);
  };

  const handleSave = (data: Omit<Work, "id" | "createdAt">, id?: string) => {
    if (id) updateWork(id, data);
    else addWork(data);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && panelOpen) setPanelOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [panelOpen]);

  return (
    <div className="relative min-h-screen bg-white text-slate-900 antialiased transition-colors duration-300 dark:bg-slate-950 dark:text-white">
      {/* Ambient background glow */}
      <div
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          background:
            theme === "dark"
              ? "radial-gradient(ellipse at 20% 0%, rgba(251,191,36,0.08), transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(244,63,94,0.06), transparent 50%), #020617"
              : "radial-gradient(ellipse at 20% 0%, rgba(251,191,36,0.15), transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(244,63,94,0.08), transparent 50%), #ffffff",
        }}
      />

      <Navbar
        onAdminClick={handleAdminToggle}
        isAdmin={isAdmin}
        theme={theme}
        onToggleTheme={toggle}
      />

      <main>
        <Hero />
        <Portfolio
          works={works}
          isAdmin={isAdmin}
          onEdit={openEdit}
          onDelete={(id) => {
            if (confirm("Delete this project?")) removeWork(id);
          }}
        />
        <About />
        <Contact />
      </main>

      <Footer />

      {isAdmin && <AdminToolbar onAdd={openAdd} />}

      <AdminPanel
        open={panelOpen}
        editing={editing}
        onClose={() => setPanelOpen(false)}
        onSave={handleSave}
        onReset={resetWorks}
      />

      <LoginModal
        open={loginOpen}
        onClose={() => setLoginOpen(false)}
        onSuccess={() => setIsAdmin(true)}
      />
    </div>
  );
}
