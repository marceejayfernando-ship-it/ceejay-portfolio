"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Download, Mail } from "lucide-react";
import { profile } from "@/data/profile";

// ─── Typing ticker (focus areas) ─────────────────────────────────────────────
const TYPE_SPEED = 55;
const DELETE_SPEED = 30;
const PAUSE_AFTER = 1800;
const PAUSE_BEFORE = 350;

function useTypingEffect(phrases: readonly string[]) {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = phrases[phraseIndex];
    if (!deleting && charIndex < current.length) {
      const t = setTimeout(() => setCharIndex((c) => c + 1), TYPE_SPEED);
      return () => clearTimeout(t);
    }
    if (!deleting && charIndex === current.length) {
      const t = setTimeout(() => setDeleting(true), PAUSE_AFTER);
      return () => clearTimeout(t);
    }
    if (deleting && charIndex > 0) {
      const t = setTimeout(() => setCharIndex((c) => c - 1), DELETE_SPEED);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => {
      setDeleting(false);
      setPhraseIndex((i) => (i + 1) % phrases.length);
    }, PAUSE_BEFORE);
    return () => clearTimeout(t);
  }, [charIndex, deleting, phraseIndex, phrases]);

  return phrases[phraseIndex].slice(0, charIndex);
}

// ─── Count-up ────────────────────────────────────────────────────────────────
function useCountUp(target: number, duration = 1400) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLElement | null>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || !Number.isFinite(target)) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const tick = (now: number) => {
            const p = Math.min((now - start) / duration, 1);
            setCount(Math.floor((1 - Math.pow(1 - p, 3)) * target));
            if (p < 1) requestAnimationFrame(tick);
            else setCount(target);
          };
          requestAnimationFrame(tick);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return { count, ref };
}

function StatItem({
  value,
  suffix,
  label,
}: {
  value: string;
  suffix: string;
  label: string;
}) {
  const numeric = Number(value);
  const isNumeric = Number.isFinite(numeric);
  const { count, ref } = useCountUp(isNumeric ? numeric : 0);
  return (
    <div className="min-w-[92px]">
      <dt
        ref={ref as React.RefObject<HTMLElement>}
        className="text-2xl font-bold text-cyan-400 md:text-3xl"
      >
        {isNumeric ? count : value}
        {suffix}
      </dt>
      <dd className="mt-1 text-xs leading-snug text-slate-400">{label}</dd>
    </div>
  );
}

export default function Hero() {
  const typed = useTypingEffect(profile.typingPhrases);

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden bg-slate-950 text-white"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,#0ea5e926,transparent_55%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.05] bg-[linear-gradient(to_right,#94a3b8_1px,transparent_1px),linear-gradient(to_bottom,#94a3b8_1px,transparent_1px)] bg-[size:64px_64px]" />

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col-reverse items-center gap-14 px-6 pt-28 pb-20 md:flex-row md:gap-16 md:pt-24">
        {/* LEFT — copy */}
        <div className="flex-1 text-center md:text-left">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 text-xs font-medium tracking-wide text-cyan-300">
            <span className="h-2 w-2 rounded-full bg-cyan-400" />
            Quality Engineering · AI Automation
          </div>

          <p className="mt-6 text-base text-slate-400">
            Hello, I&apos;m {profile.firstName} 👋
          </p>

          <h1 className="mt-2 text-4xl font-bold leading-[1.12] tracking-tight sm:text-5xl lg:text-6xl">
            {profile.headline}
          </h1>

          <p className="mx-auto mt-3 max-w-xl text-base font-medium leading-relaxed text-slate-300 sm:text-lg md:mx-0">
            {profile.subheadline}
          </p>

          <p className="mt-5 flex items-center justify-center gap-2 text-sm text-slate-400 md:justify-start">
            <span className="text-slate-500">Currently focused on:</span>
            <span className="font-semibold text-cyan-400">{typed}</span>
            <span className="inline-block h-[1em] w-[2px] animate-[blink_1s_step-end_infinite] rounded-sm bg-cyan-400" />
          </p>

          <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-slate-400 md:mx-0 md:text-base md:leading-8">
            {profile.intro}
          </p>

          <div className="mt-9 flex flex-wrap justify-center gap-3 md:justify-start">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-xl bg-cyan-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 transition-all duration-200 hover:bg-cyan-400"
            >
              View Projects <ArrowRight size={16} />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800/50 px-6 py-3 text-sm font-semibold text-slate-200 transition-all duration-200 hover:border-slate-500 hover:bg-slate-700"
            >
              <Mail size={16} /> Contact Me
            </a>
            <a
              href={profile.resumePath}
              download
              className="inline-flex items-center gap-2 rounded-xl border border-cyan-500/40 px-6 py-3 text-sm font-semibold text-cyan-400 transition-all duration-200 hover:border-cyan-500 hover:bg-cyan-500 hover:text-white"
            >
              <Download size={16} /> Download CV
            </a>
          </div>

          <dl className="mt-10 flex flex-wrap justify-center gap-x-8 gap-y-4 md:justify-start">
            {profile.stats.map((s, i) => (
              <div key={s.label} className="flex items-center gap-8">
                {i > 0 && (
                  <span
                    className="hidden h-8 w-px bg-slate-800 sm:block"
                    aria-hidden="true"
                  />
                )}
                <StatItem value={s.value} suffix={s.suffix} label={s.label} />
              </div>
            ))}
          </dl>
        </div>

        {/* RIGHT — portrait */}
        <div className="flex flex-1 justify-center md:justify-end">
          <div className="group relative">
            <div className="absolute -inset-4 rounded-[40px] bg-cyan-500/15 blur-2xl transition-all duration-500 group-hover:bg-cyan-400/20" />
            <div className="absolute -inset-[2px] rounded-[34px] bg-gradient-to-br from-cyan-500/30 via-transparent to-slate-800/50" />

            <Image
              src={profile.profileImage}
              alt={`${profile.fullName} — ${profile.headline}`}
              width={440}
              height={440}
              className="relative w-64 rounded-[32px] border border-cyan-500/20 object-cover shadow-2xl transition-transform duration-500 group-hover:scale-[1.02] sm:w-80 md:w-[400px]"
              priority
            />

            <div className="absolute -bottom-4 -left-4 flex max-w-[220px] items-center gap-2.5 rounded-2xl border border-slate-700 bg-slate-900/90 px-4 py-2.5 shadow-xl backdrop-blur-sm">
              <span className="relative flex h-3 w-3 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-400" />
              </span>
              <p className="text-[11px] font-medium leading-tight text-slate-300">
                Open to new roles &amp; collaborations
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
