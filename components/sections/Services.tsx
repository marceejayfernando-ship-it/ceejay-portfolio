"use client";

import { motion } from "framer-motion";
import { ShieldCheck, FlaskConical, Bot, Contact } from "lucide-react";
import SectionWrapper from "@/components/SectionWrapper";

const pillars = [
  {
    icon: ShieldCheck,
    title: "Quality Engineering",
    tag: "Professional",
    tagClass: "border-emerald-500/30 bg-emerald-500/10 text-emerald-300",
    description:
      "Functional, regression and integration testing for enterprise applications — test case design, defect management in Jira, UAT support, and SQL data validation across SAP and PeopleSoft.",
    items: ["Test Case Design", "Defect Management", "SAP / PeopleSoft", "UAT"],
  },
  {
    icon: FlaskConical,
    title: "Test Automation",
    tag: "Learning",
    tagClass: "border-amber-500/30 bg-amber-500/10 text-amber-300",
    description:
      "Hands-on with Playwright + TypeScript — built into a working Page Object Model framework with data-driven tests and cross-browser runs — plus hands-on training in Tricentis Tosca.",
    items: ["Playwright", "Tricentis Tosca", "Page Object Model", "Cross-Browser Testing"],
  },
  {
    icon: Bot,
    title: "AI Automation",
    tag: "Project",
    tagClass: "border-cyan-500/30 bg-cyan-500/10 text-cyan-300",
    description:
      "Building AI agents and automations with n8n, Claude Code, and the OpenAI and Gemini APIs — RAG pipelines, chatbots, and API integrations that remove repetitive work.",
    items: ["n8n", "Claude Code", "AI Agents", "RAG"],
  },
  {
    icon: Contact,
    title: "Business Automation",
    tag: "Project",
    tagClass: "border-cyan-500/30 bg-cyan-500/10 text-cyan-300",
    description:
      "CRM and no-code automation — hands-on GoHighLevel training for leads, pipelines and follow-ups, plus Make.com and Zapier scenarios for business workflows.",
    items: ["GoHighLevel", "Make.com", "Zapier", "CRM Pipelines"],
  },
];

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};
const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

export default function Services() {
  return (
    <SectionWrapper id="expertise" glowPosition="bottom-left" className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-cyan-400">
            What I Do
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Four connected areas of work
          </h2>
          <p className="mt-4 text-sm text-slate-400 md:text-base">
            Each label below reflects how I actually use the skill — professional
            work, active learning, or portfolio projects.
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {pillars.map(({ icon: Icon, title, tag, tagClass, description, items }) => (
            <motion.div
              key={title}
              variants={cardVariants}
              className="flex flex-col rounded-2xl border border-slate-800 bg-slate-900/60 p-6 transition-all hover:border-cyan-500/40 hover:shadow-[0_0_30px_rgba(6,182,212,0.12)]"
            >
              <div className="flex items-center justify-between">
                <div className="inline-flex rounded-xl bg-cyan-500/10 p-3">
                  <Icon className="h-6 w-6 text-cyan-400" />
                </div>
                <span
                  className={`rounded-full border px-2.5 py-1 text-xs font-semibold ${tagClass}`}
                >
                  {tag}
                </span>
              </div>

              <h3 className="mt-5 text-lg font-bold text-white">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-400">{description}</p>

              <div className="mt-5 flex flex-wrap gap-2">
                {items.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-slate-700 bg-slate-800/50 px-2.5 py-1 text-xs text-slate-300"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
