"use client";

import { useEffect, useState } from "react";
import type { Category, Work } from "@/types";

const CATEGORIES: Exclude<Category, "All">[] = [
  "Logo",
  "Branding",
  "Brochure",
  "Packaging",
  "Social Media",
  "Poster",
  "Illustration",
];

interface AdminPanelProps {
  open: boolean;
  editing: Work | null;
  onClose: () => void;
  onSave: (data: Omit<Work, "id" | "createdAt">, id?: string) => void;
  onReset: () => void;
}

// Admin panel stays dark for visual consistency with the lightbox.
export function AdminPanel({ open, editing, onClose, onSave, onReset }: AdminPanelProps) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<Exclude<Category, "All">>("Logo");
  const [image, setImage] = useState("");
  const [client, setClient] = useState("");
  const [year, setYear] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (!open) return;
    if (editing) {
      setTitle(editing.title);
      setCategory(editing.category);
      setImage(editing.image);
      setClient(editing.client ?? "");
      setYear(editing.year ?? "");
      setDescription(editing.description ?? "");
      setTags((editing.tags ?? []).join(", "));
    } else {
      setTitle("");
      setCategory("Logo");
      setImage("");
      setClient("");
      setYear(new Date().getFullYear().toString());
      setDescription("");
      setTags("");
    }
  }, [open, editing]);

  if (!open) return null;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !image.trim()) return;
    const data: Omit<Work, "id" | "createdAt"> = {
      title: title.trim(),
      category,
      image: image.trim(),
      client: client.trim() || undefined,
      year: year.trim() || undefined,
      description: description.trim() || undefined,
      tags: tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    };
    onSave(data, editing?.id);
    onClose();
  };

  const handleFile = async (file: File) => {
    setUploading(true);
    try {
      const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
      const preset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
      const fd = new FormData();
      fd.append("file", file);
      fd.append("upload_preset", preset!);
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        { method: "POST", body: fd }
      );
      if (!res.ok) throw new Error("Cloudinary upload failed");
      const data = await res.json();
      setImage(data.secure_url as string);
    } catch (err) {
      console.error(err);
      alert("Image upload failed. Please try again or paste a URL.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/80 p-0 backdrop-blur-sm sm:items-center sm:p-8"
      onClick={onClose}
    >
      <form
        onSubmit={submit}
        onClick={(e) => e.stopPropagation()}
        className="relative max-h-[94vh] w-full max-w-2xl overflow-y-auto rounded-t-3xl border border-white/10 bg-slate-900 p-6 shadow-2xl sm:rounded-3xl sm:p-8"
      >
        <div className="mb-6 flex items-start justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-400">
              Admin
            </p>
            <h3 className="mt-1 text-2xl font-bold text-white">
              {editing ? "Edit Project" : "Add New Project"}
            </h3>
            <p className="mt-1 text-sm text-slate-400">
              Projects are saved to your database.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-slate-300 hover:bg-white/5 hover:text-white"
            aria-label="Close"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Title *">
            <input
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Nova Coffee — Visual Identity"
              className={inputCls}
            />
          </Field>

          <Field label="Category">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as Exclude<Category, "All">)}
              className={inputCls}
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c} className="bg-slate-900 text-white">
                  {c}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Client">
            <input
              value={client}
              onChange={(e) => setClient(e.target.value)}
              placeholder="Client or personal project"
              className={inputCls}
            />
          </Field>

          <Field label="Year">
            <input
              value={year}
              onChange={(e) => setYear(e.target.value)}
              placeholder="2025"
              className={inputCls}
            />
          </Field>

          <div className="sm:col-span-2">
            <Field label="Image URL *">
              <div className="flex gap-2">
                <input
                  required
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  placeholder="https://… or upload below"
                  className={inputCls}
                />
                <label className={`flex cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap rounded-lg border border-white/10 bg-white/5 px-4 text-sm text-slate-200 transition hover:bg-white/10 ${uploading ? "opacity-60 pointer-events-none" : ""}`}>
                  {uploading ? (
                    <>
                      <svg className="animate-spin" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10" strokeOpacity="0.25"/><path d="M12 2a10 10 0 0 1 10 10" /></svg>
                      Uploading…
                    </>
                  ) : "Upload"}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    disabled={uploading}
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      if (f) handleFile(f);
                    }}
                  />
                </label>
              </div>
              {image && (
                <div className="mt-3 flex gap-3">
                  <img
                    src={image}
                    alt="Preview"
                    className="h-20 w-28 rounded-lg border border-white/10 object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => setImage("")}
                    className="text-xs text-rose-300 hover:text-rose-200"
                  >
                    Remove image
                  </button>
                </div>
              )}
            </Field>
          </div>

          <div className="sm:col-span-2">
            <Field label="Description">
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                placeholder="A brief story about the project…"
                className={`${inputCls} resize-none`}
              />
            </Field>
          </div>

          <div className="sm:col-span-2">
            <Field label="Tags (comma separated)">
              <input
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="e.g. Wordmark, Coffee, Packaging"
                className={inputCls}
              />
            </Field>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-5">
          <button
            type="button"
            onClick={() => {
              if (confirm("Reset all projects to defaults? This cannot be undone.")) {
                onReset();
              }
            }}
            className="text-xs text-slate-400 hover:text-rose-300"
          >
            Reset to defaults
          </button>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-full border border-white/15 px-5 py-2 text-sm font-medium text-white hover:border-white/40"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-full bg-amber-400 px-5 py-2 text-sm font-semibold text-slate-950 hover:bg-amber-300"
            >
              {editing ? "Save Changes" : "Add Project"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

const inputCls =
  "w-full rounded-lg border border-white/10 bg-white/5 px-3.5 py-2.5 text-sm text-white placeholder-slate-500 outline-none transition focus:border-amber-400/60 focus:bg-white/10";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-slate-400">
        {label}
      </span>
      {children}
    </label>
  );
}
