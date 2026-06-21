"use client";

import { useState } from "react";

export function Contact() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setForm({ name: "", email: "", message: "" });
    }, 3500);
  };

  return (
    <section id="contact" className="relative overflow-hidden py-24">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute bottom-0 left-1/2 h-[400px] w-[800px] -translate-x-1/2 rounded-full bg-amber-400/20 blur-[120px] dark:bg-amber-500/10" />
      </div>

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-14 px-6 lg:grid-cols-2 lg:px-10">
        <div>
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-amber-600 dark:text-amber-400">
            Let's collaborate
          </p>
          <h2 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
            Have a project in mind?
          </h2>
          <p className="mt-4 max-w-lg text-slate-600 dark:text-slate-400">
            Whether you're starting from scratch or refreshing an existing
            brand, I'd love to hear about it. Expect a reply within 24 hours.
          </p>

          <div className="mt-10 space-y-5">
            <ContactItem
              icon={
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <path d="m22 6-10 7L2 6" />
                </svg>
              }
              label="Email"
              value="eckintoshmarkintosh@gmail.com"
              href="mailto:eckintoshmarkintosh@gmail.com"
            />
            <ContactItem
              icon={
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              }
              label="Based in"
              value="Accra, Ghana"
            />
            <ContactItem
              icon={
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v6l4 2" />
                </svg>
              }
              label="Response time"
              value="Within 24 hours"
            />
          </div>

          {/* <div className="mt-10 flex flex-wrap gap-2">
            {["Dribbble", "Behance", "Instagram", "LinkedIn"].map((s) => (
              <a
                key={s}
                href="#"
                onClick={(e) => e.preventDefault()}
                className="rounded-full border border-slate-200 px-4 py-2 text-xs text-slate-700 transition hover:border-slate-400 hover:text-slate-900 dark:border-white/10 dark:text-slate-300 dark:hover:border-white/30 dark:hover:text-white"
              >
                {s}
              </a>
            ))}
          </div> */}
        </div>

        <form
          onSubmit={submit}
          className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-white/10 dark:bg-white/[0.03] dark:shadow-none"
        >
          <div className="space-y-5">
            <Field label="Your name">
              <input
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className={inputCls}
                placeholder="Your Name"
              />
            </Field>
            <Field label="Email">
              <input
                required
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className={inputCls}
                placeholder="example@company.com"
              />
            </Field>
            <Field label="Tell me about your project">
              <textarea
                required
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className={`${inputCls} resize-none`}
                placeholder="Project goals, timeline, budget range…"
              />
            </Field>

            <button
              type="submit"
              disabled={sent}
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:bg-emerald-500 dark:bg-amber-400 dark:text-slate-950 dark:hover:bg-amber-300 dark:disabled:bg-emerald-400"
            >
              {sent ? (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  Message sent!
                </>
              ) : (
                <>
                  Send Message
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="transition group-hover:translate-x-0.5">
                    <path d="M5 12h14M13 5l7 7-7 7" />
                  </svg>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

const inputCls =
  "w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder-slate-400 outline-none transition focus:border-amber-500 focus:bg-white dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder-slate-500 dark:focus:border-amber-400/60 dark:focus:bg-white/10";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">
        {label}
      </span>
      {children}
    </label>
  );
}

function ContactItem({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}) {
  const Wrap = href ? "a" : "div";
  return (
    <Wrap
      {...(href ? { href } : {})}
      className="flex items-start gap-4 rounded-xl border border-slate-200 bg-white p-4 transition hover:border-slate-300 dark:border-white/5 dark:bg-white/[0.02] dark:hover:border-white/15"
    >
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-amber-600 dark:border-white/10 dark:bg-white/5 dark:text-amber-400">
        {icon}
      </span>
      <div>
        <div className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-500">
          {label}
        </div>
        <div className="mt-0.5 text-sm text-slate-900 dark:text-white">{value}</div>
      </div>
    </Wrap>
  );
}
