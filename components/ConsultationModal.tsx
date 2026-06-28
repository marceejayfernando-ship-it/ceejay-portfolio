"use client"

import { useState, useEffect } from "react"
import emailjs from "@emailjs/browser"
import { X, Calendar, Clock, Briefcase } from "lucide-react"

const EMAILJS_SERVICE_ID  = "service_p89xvrr"
const EMAILJS_TEMPLATE_ID = "template_wo2h41l"
const EMAILJS_PUBLIC_KEY  = "SV8RBoTX1-9pKyU-O"

type Status = "idle" | "sending" | "success" | "error"

interface Props {
  isOpen: boolean
  onClose: () => void
}

const SERVICES = [
  "AI Automation",
  "Workflow Automation (n8n / Make.com)",
  "API Integration",
  "AI Chatbot",
  "Technical Virtual Assistant",
  "YouTube Automation",
  "Other",
]

const BUDGETS = [
  "< $500",
  "$500 – $1,000",
  "$1,000 – $3,000",
  "$3,000+",
  "Not sure yet",
]

export default function ConsultationModal({ isOpen, onClose }: Props) {
  const [form, setForm] = useState({
    name: "", email: "", service: "", budget: "", message: "",
  })
  const [honeypot, setHoneypot] = useState("") // spam trap
  const [status, setStatus] = useState<Status>("idle")

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : ""
    if (!isOpen) {
      setForm({ name: "", email: "", service: "", budget: "", message: "" })
      setStatus("idle")
      setHoneypot("")
    }
    return () => { document.body.style.overflow = "" }
  }, [isOpen])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose() }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [onClose])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (status === "sending") return
    if (honeypot) return // bot detected
    setStatus("sending")
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name:  form.name,
          from_email: form.email,
          service:    form.service,
          budget:     form.budget,
          message:    form.message,
          reply_to:   form.email,
        },
        EMAILJS_PUBLIC_KEY
      )
      setStatus("success")
    } catch {
      setStatus("error")
    }
  }

  if (!isOpen) return null

  return (
    <>
      <div
        className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Book a Free Consultation"
        className="fixed inset-0 z-[70] flex items-center justify-center p-4"
      >
        <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl shadow-black/50">

          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute top-4 right-4 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-slate-700 bg-slate-800 text-slate-400 hover:text-white hover:border-slate-500 transition-all duration-200"
          >
            <X size={16} />
          </button>

          <div className="px-6 pt-6 pb-5 border-b border-slate-800">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-medium text-cyan-300 mb-3">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
              Free — No commitment
            </div>
            <h2 className="text-2xl font-black text-white">Book a Free Consultation</h2>
            <p className="mt-1 text-sm text-slate-400">
              Tell me about your project and I'll get back to you within 24 hours.
            </p>
            <div className="mt-4 flex flex-wrap gap-4 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <Calendar size={13} className="text-cyan-400" /> Reply within 24hrs
              </span>
              <span className="flex items-center gap-1.5">
                <Clock size={13} className="text-cyan-400" /> 30-min free call
              </span>
              <span className="flex items-center gap-1.5">
                <Briefcase size={13} className="text-cyan-400" /> No strings attached
              </span>
            </div>
          </div>

          {status === "success" ? (
            <div className="flex flex-col items-center justify-center gap-4 px-6 py-16 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 border border-emerald-500/30">
                <svg className="h-8 w-8 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white">Request Sent!</h3>
              <p className="text-slate-400 text-sm max-w-xs">
                Thanks {form.name}! I'll review your project and reach out within 24 hours.
              </p>
              <button
                onClick={onClose}
                className="mt-2 rounded-xl bg-cyan-500 px-6 py-2.5 text-sm font-semibold text-white hover:bg-cyan-400 transition-colors"
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 px-6 py-6">

              {/* Honeypot — invisible to humans */}
              <input
                type="text"
                name="website"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                style={{ display: "none" }}
                tabIndex={-1}
                autoComplete="off"
              />

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="c-name" className="text-xs font-semibold uppercase tracking-wide text-slate-400">Your Name</label>
                  <input
                    id="c-name" name="name" type="text" required
                    placeholder="John Smith"
                    value={form.name} onChange={handleChange}
                    className="rounded-xl border border-slate-700 bg-slate-800 px-4 py-2.5 text-sm text-white placeholder:text-slate-600 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 transition-colors"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="c-email" className="text-xs font-semibold uppercase tracking-wide text-slate-400">Email Address</label>
                  <input
                    id="c-email" name="email" type="email" required
                    placeholder="john@company.com"
                    value={form.email} onChange={handleChange}
                    className="rounded-xl border border-slate-700 bg-slate-800 px-4 py-2.5 text-sm text-white placeholder:text-slate-600 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 transition-colors"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="c-service" className="text-xs font-semibold uppercase tracking-wide text-slate-400">What do you need help with?</label>
                <select
                  id="c-service" name="service" required
                  value={form.service} onChange={handleChange}
                  className="rounded-xl border border-slate-700 bg-slate-800 px-4 py-2.5 text-sm text-white focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 transition-colors"
                >
                  <option value="" disabled>Select a service…</option>
                  {SERVICES.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="c-budget" className="text-xs font-semibold uppercase tracking-wide text-slate-400">Estimated Budget</label>
                <select
                  id="c-budget" name="budget" required
                  value={form.budget} onChange={handleChange}
                  className="rounded-xl border border-slate-700 bg-slate-800 px-4 py-2.5 text-sm text-white focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 transition-colors"
                >
                  <option value="" disabled>Select a range…</option>
                  {BUDGETS.map((b) => <option key={b} value={b}>{b}</option>)}
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="c-message" className="text-xs font-semibold uppercase tracking-wide text-slate-400">Tell me about your project</label>
                <textarea
                  id="c-message" name="message" rows={4} required
                  placeholder="Describe what you'd like to automate or build…"
                  value={form.message} onChange={handleChange}
                  className="resize-none rounded-xl border border-slate-700 bg-slate-800 px-4 py-2.5 text-sm text-white placeholder:text-slate-600 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 transition-colors"
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
                ) : "Send Consultation Request"}
              </button>

              {status === "error" && (
                <p className="text-sm text-rose-400 text-center">
                  Something went wrong. Please email me directly.
                </p>
              )}

            </form>
          )}
        </div>
      </div>
    </>
  )
}
