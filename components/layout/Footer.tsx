"use client"

// ─── Update these with your real links ───────────────────────────────────────
const LINKEDIN_URL = "https://linkedin.com/in/yourprofile"
const FACEBOOK_URL = "https://facebook.com/yourprofile"
const EMAIL       = "marceejayfernando@gmail.com"

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" })
  const year = new Date().getFullYear()

  return (
    <footer className="relative bg-slate-950 text-white overflow-hidden">

      {/* Top border glow */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />

      {/* Subtle grid */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.04] bg-[linear-gradient(to_right,#94a3b8_1px,transparent_1px),linear-gradient(to_bottom,#94a3b8_1px,transparent_1px)] bg-[size:60px_60px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-12">

        <div className="flex flex-col items-center gap-8 md:flex-row md:justify-between">

          {/* LEFT: Logo + tagline */}
          <div className="text-center md:text-left">
            <p className="text-2xl font-black text-cyan-400 tracking-tight">CJ.dev</p>
            <p className="mt-1 text-sm text-slate-400 max-w-xs">
              Building smarter businesses with AI automation.
            </p>
          </div>

          {/* CENTER: Email */}
          <a
            href={`mailto:${EMAIL}`}
            className="flex items-center gap-2 text-sm text-slate-400 hover:text-cyan-400 transition-colors duration-200"
          >
            <MailIcon />
            {EMAIL}
          </a>

          {/* RIGHT: Socials */}
          <div className="flex items-center gap-3">
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-700 bg-slate-800/60 text-slate-400 hover:border-cyan-500/50 hover:text-cyan-400 hover:bg-slate-700 transition-all duration-200"
            >
              <LinkedInIcon />
            </a>
            <a
              href={FACEBOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-700 bg-slate-800/60 text-slate-400 hover:border-cyan-500/50 hover:text-cyan-400 hover:bg-slate-700 transition-all duration-200"
            >
              <FacebookIcon />
            </a>
          </div>

        </div>

        {/* Divider */}
        <div className="my-8 h-px bg-slate-800" />

        {/* Bottom row: copyright + back to top */}
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <p className="text-xs text-slate-500">
            © {year} CJ Fernando. All rights reserved.
          </p>

          {/* Back to top */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800/60 px-4 py-2 text-xs font-semibold text-slate-400 hover:border-cyan-500/50 hover:text-cyan-400 hover:bg-slate-700 transition-all duration-200"
          >
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
            </svg>
            Back to top
          </button>
        </div>

      </div>
    </footer>
  )
}

// ─── Icons ────────────────────────────────────────────────────────────────────

function MailIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

function FacebookIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  )
}
