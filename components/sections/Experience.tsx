"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import SectionWrapper from "@/components/SectionWrapper";
import {
  experience,
  education,
  certifications,
  learningNow,
} from "@/data/experience";
import {
  Building2,
  GraduationCap,
  Award,
  Sparkles,
  MapPin,
  ArrowRight,
  ExternalLink,
} from "lucide-react";

export default function Experience() {
  return (
    <SectionWrapper id="experience" glowPosition="top-right" className="py-24">
      <div className="mx-auto max-w-5xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-14 max-w-2xl"
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-cyan-400">
            Experience
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Professional experience
          </h2>
          <p className="mt-4 text-sm text-slate-400 md:text-base">
            My paid, professional work in quality engineering. Self-built AI and
            automation work lives in the{" "}
            <a href="#projects" className="text-cyan-400 hover:underline">
              Projects
            </a>{" "}
            section and is labelled as project experience.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative border-l border-slate-800 pl-8">
          {experience.map((job, i) => (
            <motion.article
              key={job.company + i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="relative pb-4"
            >
              <span className="absolute -left-[41px] flex h-6 w-6 items-center justify-center rounded-full border border-cyan-500/40 bg-slate-950">
                <span className="h-2 w-2 rounded-full bg-cyan-400" />
              </span>

              <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3 className="flex items-center gap-2 text-lg font-bold text-white">
                      <Building2 className="h-4 w-4 text-cyan-400" />
                      {job.role}
                    </h3>
                    <p className="mt-1 text-sm font-medium text-cyan-300">
                      {job.company}
                    </p>
                  </div>
                  <div className="text-right text-xs text-slate-400">
                    <p className="rounded-full border border-slate-700 px-3 py-1 font-semibold text-slate-300">
                      {job.period}
                    </p>
                    <p className="mt-1.5 flex items-center justify-end gap-1">
                      <MapPin className="h-3 w-3" />
                      {job.location}
                    </p>
                  </div>
                </div>

                <p className="mt-4 text-sm leading-6 text-slate-400">
                  {job.summary}
                </p>

                <ul className="mt-4 space-y-2">
                  {job.highlights.map((h) => (
                    <li
                      key={h}
                      className="flex gap-2.5 text-sm leading-6 text-slate-300"
                    >
                      <ArrowRight className="mt-1 h-3.5 w-3.5 shrink-0 text-cyan-500" />
                      {h}
                    </li>
                  ))}
                </ul>

                <div className="mt-5 flex flex-wrap gap-2">
                  {job.stack.map((s) => (
                    <span
                      key={s}
                      className="rounded-full border border-emerald-500/25 bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-300"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Education + certs + learning */}
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
            <h3 className="flex items-center gap-2 text-sm font-bold text-white">
              <GraduationCap className="h-4 w-4 text-cyan-400" />
              Education
            </h3>
            <p className="mt-3 text-sm text-slate-300">{education.degree}</p>
            <p className="text-xs text-slate-500">{education.school}</p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
            <h3 className="flex items-center gap-2 text-sm font-bold text-white">
              <Award className="h-4 w-4 text-cyan-400" />
              Certifications
            </h3>
            <ul className="mt-3 space-y-2">
              {certifications.map((c) => (
                <li key={c.name} className="text-xs leading-5 text-slate-400">
                  {c.link ? (
                    <a
                      href={c.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-start gap-2 text-slate-300 hover:text-cyan-300"
                    >
                      {c.badgeImage ? (
                        <span className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full bg-slate-950 ring-1 ring-slate-700">
                          <Image
                            src={c.badgeImage}
                            alt={`${c.name} badge`}
                            fill
                            sizes="32px"
                            className="object-cover"
                          />
                        </span>
                      ) : (
                        <ExternalLink className="mt-0.5 h-3 w-3 shrink-0 text-cyan-500" />
                      )}
                      <span>
                        <span className="underline decoration-slate-600 underline-offset-2 group-hover:decoration-cyan-400">
                          {c.name}
                        </span>
                        {(c.issuer || c.date) && (
                          <span className="block text-[11px] text-slate-500">
                            {[c.issuer, c.date].filter(Boolean).join(" · ")}
                          </span>
                        )}
                      </span>
                    </a>
                  ) : (
                    c.name
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-amber-500/20 bg-amber-500/[0.04] p-6">
            <h3 className="flex items-center gap-2 text-sm font-bold text-white">
              <Sparkles className="h-4 w-4 text-amber-400" />
              Currently learning
            </h3>
            <ul className="mt-3 space-y-1.5">
              {learningNow.map((l) => (
                <li key={l} className="text-xs leading-5 text-slate-400">
                  {l}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
