"use client"

import { useState } from "react"
import emailjs from "@emailjs/browser"
import SectionWrapper from "@/components/SectionWrapper"

const EMAILJS_SERVICE_ID  = "service_p89xvrr"
const EMAILJS_TEMPLATE_ID = "template_wo2h41l"
const EMAILJS_PUBLIC_KEY  = "SV8RBoTX1-9pKyU-O"

type Status = "idle" | "sending" | "success" | "error"

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" })
  const [honeypot, setHoneypot] = useState("") // spam trap
  const [status, setStatus] = useState<Status>("idle")

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (status === "sending") return
    // Honeypot check — bots fill hidden fields, humans don't
    if (honeypot) return
    setStatus("sending")
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name:  form.name,
          from_email: form.email,
          message:    form.message,
          reply_to:   form.email,
        },
        EMAILJS_PUBLIC_KEY
      )
      setStatus("success")
      setForm({ name: "", email: "", message: "" })
    } catch {
      setStatus("error")
    }
  }

  return (
    <SectionWrapper id="contact" glowPosition="bottom" className="py-28">
      <div className="mx-auto max-w-7xl px-6">

        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 text-sm font-medium text-cyan-300 tracking-wide mb-6">
            <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
            Get In Touch
          </div>
          <h2 className="text-4xl font-black tracking-tight md:text-5xl">
            Let's build something <span className="text-cyan-400">together</span>
          </h2>
          <p className="mt-4 text-slate-400 text-base max-w-xl mx-auto leading-7">
            Have a project in mind or just want to explore what AI automation
            could do for your business? Drop a message — I usually reply within 24 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-5 lg:gap-16 items-start">

          {/* LEFT: contact info */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <a
              href="mailto:marceejayfernando@gmail.com"
              className="group flex items-start gap-4 rounded-2xl border border-slate-800 bg-slate-900/60 p-5 hover:border-cyan-500/40 hover:bg-slate-800/60 transition-all duration-200"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 group-hover:bg-cyan-500/20 transition-colors duration-200">
                <MailIcon />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-1">Email</p>
                <p className="text-slate-200 font-medium group-hover:text-cyan-300 transition-colors duration-200">
                  marceejayfernando@gmail.com
                </p>
                <p className="text-slate-500 text-xs mt-0.5">Usually replies within 24 hrs</p>
              </div>
            </a>

            <a
              href="https://linkedin.com/in/yourprofile"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-start gap-4 rounded-2xl border border-slate-800 bg-slate-900/60 p-5 hover:border-cyan-500/40 hover:bg-slate-800/60 transition-all duration-200"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 group-hover:bg-cyan-500/20 transition-colors duration-200">
                <LinkedInIcon />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-1">LinkedIn</p>
                <p className="text-slate-200 font-medium group-hover:text-cyan-300 transition-colors duration-200">
                  CJ Fernando
                </p>
                <p className="text-slate-500 text-xs mt-0.5">Connect professionally</p>
              </div>
            </a>

            <div className="flex items-center gap-3 rounded-2xl border border-slate-800 bg-slate-900/60 px-5 py-4">
              <span className="relative flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
                <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-400" />
              </span>
              <p className="text-sm text-slate-300">
                <span className="font-semibold text-emerald-400">Available</span> for freelance &amp; contract work
              </p>
            </div>
          </div>

          {/* RIGHT: form */}
          <form
            onSubmit={handleSubmit}
            className="lg:col-span-3 rounded-2xl border border-slate-800 bg-slate-900/60 p-8 flex flex-col gap-5"
          >
            {/* Honeypot — hidden from humans, bots fill this */}
            <input
              type="text"
              name="website"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              style={{ display: "none" }}
              tabIndex={-1}
              autoComplete="off"
            />

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="name" className="text-sm font-medium text-slate-400">Your name</label>
                <input
                  id="name" name="name" type="text" required
                  placeholder="John Smith"
                  value={form.name} onChange={handleChange}
                  className="rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 transition-colors duration-150"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="email" className="text-sm font-medium text-slate-400">Email address</label>
                <input
                  id="email" name="email" type="email" required
                  placeholder="john@company.com"
                  value={form.email} onChange={handleChange}
                  className="rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 transition-colors duration-150"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="message" className="text-sm font-medium text-slate-400">Message</label>
              <textarea
                id="message" name="message" rows={5} required
                placeholder="Tell me about your project or what you'd like to automate…"
                value={form.message} onChange={handleChange}
                className="resize-none rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 transition-colors duration-150"
              />
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              className="mt-1 inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-500/25 hover:bg-cyan-400 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200"
            >
              {status === "sending" ? (
                <>
                  <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                  </svg>
                  Sending…
                </>
              ) : "Send Message"}
            </button>

            {status === "success" && (
              <p className="text-sm text-emerald-400 text-center">
                ✓ Message sent! I'll get back to you shortly.
              </p>
            )}
            {status === "error" && (
              <p className="text-sm text-rose-400 text-center">
                Something went wrong. Please email me directly.
              </p>
            )}
          </form>

        </div>
      </div>
    </SectionWrapper>
  )
}

function MailIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}
