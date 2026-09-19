"use client";

import { useState } from "react";
import emailjs from "@emailjs/browser";
import { Loader2 } from "lucide-react";
import SectionWrapper from "@/components/SectionWrapper";
import { EMAILJS } from "@/lib/emailjs";
import { email, socials, isPlaceholder } from "@/data/social";

type Status = "idle" | "sending" | "success" | "error";

const OPEN_TO = [
  "Quality Engineering",
  "Test Automation",
  "AI Automation",
  "Workflow Automation",
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "sending") return;
    if (honeypot) return;
    setStatus("sending");
    try {
      await emailjs.send(
        EMAILJS.serviceId,
        EMAILJS.templateId,
        {
          from_name: form.name,
          from_email: form.email,
          message: form.message,
          reply_to: form.email,
        },
        EMAILJS.publicKey
      );
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <SectionWrapper id="contact" glowPosition="bottom" className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-14 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 text-xs font-medium tracking-wide text-cyan-300">
            <span className="h-2 w-2 rounded-full bg-cyan-400" />
            Get in touch
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Let&apos;s build something{" "}
            <span className="text-cyan-400">better</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-slate-400 md:text-base">
            I&apos;m open to opportunities in quality engineering, test
            automation, and AI &amp; workflow automation. If you&apos;re hiring
            or want to collaborate on something technical, send a message —
            I usually reply within 24 hours.
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-2">
            {OPEN_TO.map((t) => (
              <span
                key={t}
                className="rounded-full border border-slate-700 bg-slate-900/60 px-3 py-1 text-xs text-slate-300"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-5 lg:gap-14">
          {/* left: contact channels */}
          <div className="flex flex-col gap-4 lg:col-span-2">
            <a
              href={`mailto:${email}`}
              className="group flex items-start gap-4 rounded-2xl border border-slate-800 bg-slate-900/60 p-5 transition-all duration-200 hover:border-cyan-500/40 hover:bg-slate-800/60"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-cyan-500/20 bg-cyan-500/10 text-cyan-400">
                <MailIcon />
              </span>
              <span>
                <span className="mb-1 block text-xs font-semibold uppercase tracking-widest text-slate-500">
                  Email
                </span>
                <span className="block font-medium text-slate-200 transition-colors group-hover:text-cyan-300">
                  {email}
                </span>
                <span className="mt-0.5 block text-xs text-slate-500">
                  Usually replies within 24 hrs
                </span>
              </span>
            </a>

            {socials
              .filter((s) => s.icon !== "mail")
              .map((s) => {
                const placeholder = isPlaceholder(s.href);
                const inner = (
                  <>
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-cyan-500/20 bg-cyan-500/10 text-cyan-400">
                      {s.icon === "linkedin" ? <LinkedInIcon /> : <GithubIcon />}
                    </span>
                    <span>
                      <span className="mb-1 block text-xs font-semibold uppercase tracking-widest text-slate-500">
                        {s.label}
                      </span>
                      <span className="block font-medium text-slate-200">
                        {s.handle}
                      </span>
                      <span className="mt-0.5 block text-xs text-slate-500">
                        {placeholder ? "Link coming soon" : "Opens in a new tab"}
                      </span>
                    </span>
                  </>
                );
                const base =
                  "group flex items-start gap-4 rounded-2xl border border-slate-800 bg-slate-900/60 p-5 transition-all duration-200";
                return placeholder ? (
                  <div key={s.label} className={`${base} opacity-60`}>
                    {inner}
                  </div>
                ) : (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${base} hover:border-cyan-500/40 hover:bg-slate-800/60`}
                  >
                    {inner}
                  </a>
                );
              })}

            <div className="flex items-center gap-3 rounded-2xl border border-slate-800 bg-slate-900/60 px-5 py-4">
              <span className="relative flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-400" />
              </span>
              <p className="text-sm text-slate-300">
                <span className="font-semibold text-emerald-400">Available</span>{" "}
                for new roles &amp; automation projects
              </p>
            </div>
          </div>

          {/* right: form */}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-5 rounded-2xl border border-slate-800 bg-slate-900/60 p-8 lg:col-span-3"
          >
            <input
              type="text"
              name="website"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              className="hidden"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
            />

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="name" className="text-sm font-medium text-slate-400">
                  Your name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder="Jane Dela Cruz"
                  value={form.name}
                  onChange={handleChange}
                  className="rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-sm text-white transition-colors placeholder:text-slate-600 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-slate-400"
                >
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="jane@company.com"
                  value={form.email}
                  onChange={handleChange}
                  className="rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-sm text-white transition-colors placeholder:text-slate-600 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="message"
                className="text-sm font-medium text-slate-400"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                placeholder="Tell me about the role or the project…"
                value={form.message}
                onChange={handleChange}
                className="resize-none rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-sm text-white transition-colors placeholder:text-slate-600 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
              />
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              className="mt-1 inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-500/25 transition-all duration-200 hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === "sending" ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Sending…
                </>
              ) : (
                "Send message"
              )}
            </button>

            {status === "success" && (
              <p className="text-center text-sm text-emerald-400">
                ✓ Message sent! I&apos;ll get back to you shortly.
              </p>
            )}
            {status === "error" && (
              <p className="text-center text-sm text-rose-400">
                Something went wrong — please email me directly at {email}.
              </p>
            )}
          </form>
        </div>
      </div>
    </SectionWrapper>
  );
}

function MailIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.5 2.87 8.32 6.84 9.67.5.09.68-.22.68-.49 0-.24-.01-.87-.01-1.71-2.78.62-3.37-1.36-3.37-1.36-.45-1.18-1.11-1.5-1.11-1.5-.91-.63.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.36-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05a9.36 9.36 0 0 1 5 0c1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.81-4.57 5.06.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.59.69.49A10.02 10.02 0 0 0 22 12.26C22 6.58 17.52 2 12 2z" />
    </svg>
  );
}
