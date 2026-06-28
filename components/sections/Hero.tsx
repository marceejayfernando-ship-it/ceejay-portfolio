"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import ConsultationModal from "@/components/ConsultationModal"

// ─── Typing animation ─────────────────────────────────────────────────────────
const PHRASES = [
  "AI Automation",
  "Save 20hrs/Week",
  "Cut Repetitive Work",
  "Smarter Workflows",
  "API Integrations",
]
const TYPE_SPEED   = 60
const DELETE_SPEED = 35
const PAUSE_AFTER  = 2000
const PAUSE_BEFORE = 400

function useTypingEffect(phrases: string[]) {
  const [displayed, setDisplayed] = useState("")
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = phrases[phraseIndex]
    if (!deleting && charIndex < current.length) {
      const t = setTimeout(() => setCharIndex((c) => c + 1), TYPE_SPEED)
      return () => clearTimeout(t)
    }
    if (!deleting && charIndex === current.length) {
      const t = setTimeout(() => setDeleting(true), PAUSE_AFTER)
      return () => clearTimeout(t)
    }
    if (deleting && charIndex > 0) {
      const t = setTimeout(() => setCharIndex((c) => c - 1), DELETE_SPEED)
      return () => clearTimeout(t)
    }
    if (deleting && charIndex === 0) {
      const t = setTimeout(() => {
        setDeleting(false)
        setPhraseIndex((i) => (i + 1) % phrases.length)
      }, PAUSE_BEFORE)
      return () => clearTimeout(t)
    }
  }, [charIndex, deleting, phraseIndex, phrases])

  useEffect(() => {
    setDisplayed(phrases[phraseIndex].slice(0, charIndex))
  }, [charIndex, phraseIndex, phrases])

  return displayed
}

// ─── Count-up hook ────────────────────────────────────────────────────────────
function useCountUp(target: number, duration = 1500) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLElement | null>(null)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          const startTime = performance.now()
          const tick = (now: number) => {
            const elapsed = now - startTime
            const progress = Math.min(elapsed / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            setCount(Math.floor(eased * target))
            if (progress < 1) requestAnimationFrame(tick)
            else setCount(target)
          }
          requestAnimationFrame(tick)
          observer.disconnect()
        }
      },
      { threshold: 0.5 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [target, duration])

  return { count, ref }
}

// ─── Stat item ────────────────────────────────────────────────────────────────
function StatItem({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const { count, ref } = useCountUp(value)
  return (
    <div>
      <dt ref={ref as React.RefObject<HTMLElement>} className="text-3xl font-black text-cyan-400">
        {count}{suffix}
      </dt>
      <dd className="mt-1 text-sm text-slate-400">{label}</dd>
    </div>
  )
}

// ─── Social proof avatars ─────────────────────────────────────────────────────
const AVATARS = ["JM", "AR", "SK", "TL", "DP"]

// ─── Component ────────────────────────────────────────────────────────────────
export default function Hero() {
  const typedText = useTypingEffect(PHRASES)
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <section className="relative min-h-[100vh] bg-slate-950 text-white overflow-hidden">

      {/* Background radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#0ea5e933,transparent_55%)]" />

      {/* Subtle grid overlay */}
      <div className="absolute inset-0 opacity-[0.07] bg-[linear-gradient(to_right,#94a3b8_1px,transparent_1px),linear-gradient(to_bottom,#94a3b8_1px,transparent_1px)] bg-[size:60px_60px]" />

      <div className="relative z-10 mx-auto flex min-h-[100vh] max-w-7xl flex-col items-center justify-center gap-12 px-6 pt-20 pb-16 md:flex-row md:gap-16">

        {/* LEFT: Copy */}
        <div className="flex-1 text-center md:text-left">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 text-sm font-medium text-cyan-300 tracking-wide">
            <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
            AI Automation Specialist
          </div>

          {/* Headline with typing effect */}
          <h1 className="mt-6 text-5xl font-black leading-[1.1] tracking-tight md:text-6xl lg:text-7xl">
            Build Smarter
            <br />
            Businesses with
            <span className="mt-2 flex items-center gap-1 justify-center md:justify-start min-h-[1.2em]">
              <span className="text-cyan-400">{typedText}</span>
              <span className="inline-block w-[3px] h-[0.85em] bg-cyan-400 rounded-sm animate-[blink_1s_step-end_infinite]" />
            </span>
          </h1>

          {/* Description */}
          <p className="mt-6 max-w-lg text-base leading-7 text-slate-400 md:text-lg md:leading-8">
            I help businesses automate repetitive work by building AI agents,
            intelligent workflows, and API integrations using{" "}
            <span className="text-slate-200 font-medium">n8n, Make.com, OpenAI, Gemini</span>,
            and modern automation tools.
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-wrap gap-3 justify-center md:justify-start">

            {/* Opens consultation modal */}
            <button
              onClick={() => setModalOpen(true)}
              className="inline-flex items-center gap-2 rounded-xl bg-cyan-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-500/25 hover:bg-cyan-400 hover:shadow-cyan-400/30 transition-all duration-200 cursor-pointer"
            >
              Book a Free Consultation
            </button>

            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800/50 px-6 py-3 text-sm font-semibold text-slate-200 hover:bg-slate-700 hover:border-slate-500 transition-all duration-200 cursor-pointer"
            >
              View Projects
            </a>

            {/* ✅ Put your resume PDF in /public/resume.pdf */}
            <a
              href="/resume.pdf"
              download
              className="inline-flex items-center gap-2 rounded-xl border border-cyan-500/50 px-6 py-3 text-sm font-semibold text-cyan-400 hover:bg-cyan-500 hover:text-white hover:border-cyan-500 transition-all duration-200 cursor-pointer"
            >
              Download Resume
            </a>
          </div>

          {/* Social proof */}
          <div className="mt-6 flex items-center gap-3 justify-center md:justify-start">
            <div className="flex -space-x-2">
              {AVATARS.map((initials, i) => (
                <div
                  key={i}
                  style={{ zIndex: AVATARS.length - i }}
                  className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-slate-950 bg-gradient-to-br from-cyan-500 to-slate-600 text-[10px] font-bold text-white"
                >
                  {initials}
                </div>
              ))}
            </div>
            <div>
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="h-3.5 w-3.5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-xs text-slate-400">
                Trusted by <span className="font-semibold text-slate-200">10+ businesses</span> worldwide
              </p>
            </div>
          </div>

          {/* Stats */}
          <dl className="mt-10 flex gap-8 justify-center md:justify-start">
            <StatItem value={3}  suffix="+" label="Years Experience"     />
            <div className="w-px bg-slate-800" aria-hidden="true" />
            <StatItem value={15} suffix="+" label="Automation Workflows" />
            <div className="w-px bg-slate-800" aria-hidden="true" />
            <StatItem value={5}  suffix="+" label="AI Integrations"      />
          </dl>

        </div>

        {/* RIGHT: Profile Image */}
        <div className="flex flex-1 justify-center md:justify-end">
          <div className="relative group">

            <div className="absolute -inset-4 rounded-[40px] bg-cyan-500/20 blur-2xl transition-all duration-500 group-hover:bg-cyan-400/30 group-hover:blur-3xl" />
            <div className="absolute -inset-[2px] rounded-[34px] bg-gradient-to-br from-cyan-500/40 via-transparent to-slate-800/60" />

            <Image
              src="/images/profile.png"
              alt="CJ Fernando — AI Automation Specialist"
              width={480}
              height={480}
              className="relative rounded-[32px] border border-cyan-500/20 shadow-2xl object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              priority
            />

            {/* Availability badge */}
            <div className="absolute -bottom-4 -left-4 flex items-center gap-2.5 rounded-2xl border border-slate-700 bg-slate-900/90 px-4 py-2.5 shadow-xl backdrop-blur-sm">
              <span className="relative flex h-3 w-3 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-400" />
              </span>
              <div>
                <p className="text-xs font-bold text-emerald-400 leading-none">Available Now</p>
                <p className="mt-0.5 text-[10px] text-slate-400 leading-none">Open to new projects</p>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* Consultation modal — mounts here, renders as portal-like overlay */}
      <ConsultationModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />

    </section>
  )
}
