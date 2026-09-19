"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import SectionWrapper from "@/components/SectionWrapper";
import { profile } from "@/data/profile";
import {
  ClipboardCheck,
  Workflow,
  Bot,
  Database,
  Bug,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";

const floatingIcons = [
  { icon: Bug, className: "-top-8 -left-5" },
  { icon: ShieldCheck, className: "-top-8 right-10" },
  { icon: Workflow, className: "top-1/2 -left-7" },
  { icon: Database, className: "bottom-2 -left-5" },
  { icon: Bot, className: "-bottom-5 right-3" },
  { icon: ClipboardCheck, className: "top-1/3 -right-8" },
];

const pillars = [
  {
    label: "Quality Engineering",
    note: "Where I work today",
    color: "text-emerald-300",
  },
  {
    label: "Test Automation",
    note: "Playwright + Tosca training",
    color: "text-amber-300",
  },
  {
    label: "AI Automation",
    note: "Project experience",
    color: "text-cyan-300",
  },
  {
    label: "Business Automation",
    note: "GHL, Make, Zapier",
    color: "text-cyan-300",
  },
];

const highlights = [
  "Functional, regression & integration testing",
  "SAP & PeopleSoft enterprise applications",
  "Jira defect management",
  "UAT support",
  "SQL data validation",
  "Playwright + TypeScript framework",
  "Tricentis Tosca (hands-on training)",
  "n8n & Claude Code automation",
  "GoHighLevel CRM (hands-on training)",
  "Make.com & Zapier",
];

export default function About() {
  return (
    <SectionWrapper id="about" glowPosition="top-left" className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mx-auto mb-16 max-w-3xl text-center"
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-cyan-400">
            About Me
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Quality engineering, expanded with automation
          </h2>
        </motion.div>

        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="relative flex justify-center"
          >
            <div className="absolute h-64 w-64 rounded-full bg-cyan-500/15 blur-3xl" />
            <div className="relative">
              <Image
                src={profile.profileImage}
                alt={profile.fullName}
                width={340}
                height={340}
                className="w-64 rounded-3xl border border-cyan-500/25 sm:w-80"
              />
              {floatingIcons.map(({ icon: Icon, className }, i) => (
                <motion.div
                  key={i}
                  animate={{ y: [0, -10, 0] }}
                  transition={{
                    repeat: Infinity,
                    repeatType: "mirror",
                    duration: 3 + i * 0.6,
                    ease: "easeInOut",
                  }}
                  className={`absolute rounded-xl border border-cyan-500/25 bg-slate-900 p-2.5 shadow-lg ${className}`}
                >
                  <Icon className="h-5 w-5 text-cyan-400" />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* copy */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-white">
              Hi, I&apos;m {profile.name}
            </h3>

            <p className="mt-5 text-sm leading-7 text-slate-400 md:text-base">
              I&apos;m a Quality Engineering Analyst at Accenture with nearly
              four years of hands-on software testing experience. My day-to-day
              is functional, regression and integration testing of enterprise
              applications across <span className="text-slate-200">SAP</span> and{" "}
              <span className="text-slate-200">PeopleSoft</span> — designing and
              executing test cases, supporting UAT, managing defects in Jira, and
              validating data with SQL.
            </p>

            <p className="mt-4 text-sm leading-7 text-slate-400 md:text-base">
              On top of that foundation I&apos;m building in two directions:{" "}
              <span className="text-slate-200">test automation</span> — a
              working Playwright and TypeScript framework, plus hands-on training
              in Tricentis Tosca — and{" "}
              <span className="text-slate-200">
                AI and business automation
              </span>{" "}
              with n8n, Claude Code, GoHighLevel, Make.com and Zapier.
              It&apos;s the same goal I have in QA — making delivery faster and
              more reliable — just with more of the repetitive work handled by
              code.
            </p>

            {/* transition triad */}
            <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-3">
              {pillars.map((p, i) => (
                <div key={p.label} className="flex items-center gap-3">
                  {i > 0 && (
                    <ArrowRight
                      className="h-4 w-4 shrink-0 text-slate-600"
                      aria-hidden="true"
                    />
                  )}
                  <div className="rounded-xl border border-slate-700 bg-slate-900/60 px-3.5 py-2">
                    <p className={`text-sm font-semibold ${p.color}`}>
                      {p.label}
                    </p>
                    <p className="text-[11px] text-slate-500">{p.note}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-2">
              {highlights.map((h) => (
                <span
                  key={h}
                  className="rounded-full border border-slate-700 bg-slate-900/60 px-3 py-1 text-xs text-slate-300"
                >
                  {h}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  );
}
