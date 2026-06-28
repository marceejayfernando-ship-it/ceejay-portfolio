"use client";

import { motion } from "framer-motion";
import SectionWrapper from "@/components/SectionWrapper";

import {
  SiOpenai,
  SiGooglegemini,
  SiN8N,
  SiNextdotjs,
  SiReact,
  SiTailwindcss,
  SiSupabase,
  SiPostgresql,
  SiGithub,
  SiRender,
  SiTypescript,
  SiNodedotjs,
} from "react-icons/si";

import { Link, Zap, Bot, Webhook, Workflow } from "lucide-react";

// ─── Data ────────────────────────────────────────────────────────────────────

type Tech = {
  name: string;
  icon: React.ElementType;
  category: string;
  level: string;
  progress: string;
  color: string;
};

type Section = {
  label: string;
  dotColor: string;
  stack: Tech[];
};

const sections: Section[] = [
  {
    label: "AI & Automation",
    dotColor: "bg-cyan-400",
    stack: [
      { name: "OpenAI",    icon: SiOpenai,       category: "LLM Platform",        level: "Advanced",     progress: "95%", color: "text-green-400"  },
      { name: "Gemini",    icon: SiGooglegemini, category: "Generative AI",        level: "Advanced",     progress: "90%", color: "text-blue-400"   },
      { name: "n8n",       icon: SiN8N,          category: "Workflow Automation",  level: "Advanced",     progress: "95%", color: "text-orange-400" },
      { name: "Make.com",  icon: Workflow,       category: "Visual Automation",    level: "Advanced",     progress: "90%", color: "text-purple-400" },
      { name: "Zapier",    icon: Zap,            category: "Business Automation",  level: "Advanced",     progress: "90%", color: "text-orange-500" },
      { name: "AI Agents", icon: Bot,            category: "Custom AI Solutions",  level: "Advanced",     progress: "92%", color: "text-cyan-400"   },
    ],
  },
  {
    label: "Frontend",
    dotColor: "bg-blue-400",
    stack: [
      { name: "React",        icon: SiReact,       category: "Frontend Library",     level: "Advanced", progress: "95%", color: "text-cyan-400" },
      { name: "Next.js",      icon: SiNextdotjs,   category: "React Framework",      level: "Advanced", progress: "90%", color: "text-white"    },
      { name: "TypeScript",   icon: SiTypescript,  category: "Programming Language", level: "Advanced", progress: "90%", color: "text-blue-400" },
      { name: "Tailwind CSS", icon: SiTailwindcss, category: "CSS Framework",        level: "Advanced", progress: "95%", color: "text-sky-400"  },
    ],
  },
  {
    label: "Backend",
    dotColor: "bg-green-400",
    stack: [
      { name: "Node.js",  icon: SiNodedotjs, category: "Runtime Environment", level: "Intermediate", progress: "85%", color: "text-green-500"  },
      { name: "REST API", icon: Link,        category: "API Development",     level: "Advanced",     progress: "90%", color: "text-cyan-400"   },
      { name: "Webhooks", icon: Webhook,     category: "Automation",          level: "Advanced",     progress: "90%", color: "text-yellow-400" },
    ],
  },
  {
    label: "Database",
    dotColor: "bg-purple-400",
    stack: [
      { name: "Supabase",   icon: SiSupabase,   category: "Backend Platform", level: "Intermediate", progress: "85%", color: "text-green-400" },
      { name: "PostgreSQL", icon: SiPostgresql, category: "Database",         level: "Intermediate", progress: "80%", color: "text-blue-500"  },
    ],
  },
  {
    label: "Tools & Platforms",
    dotColor: "bg-orange-400",
    stack: [
      { name: "GitHub", icon: SiGithub, category: "Version Control",  level: "Advanced",     progress: "90%", color: "text-white"    },
      { name: "Render", icon: SiRender, category: "Cloud Deployment", level: "Intermediate", progress: "85%", color: "text-cyan-400" },
    ],
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function SectionHeader({ label, dotColor }: { label: string; dotColor: string }) {
  return (
    <h3 className="mb-6 flex items-center gap-3 text-2xl font-bold text-white">
      <span className={`h-2 w-2 shrink-0 rounded-full ${dotColor}`} />
      {label}
    </h3>
  );
}

function TechCard({ tech }: { tech: Tech }) {
  const Icon = tech.icon;
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.03 }}
      transition={{ duration: 0.22 }}
      className="group flex flex-col gap-4 rounded-xl border border-slate-700 bg-slate-900/60 p-5 transition-all duration-300 hover:border-cyan-500/50 hover:bg-slate-800/80 hover:shadow-[0_0_25px_rgba(34,211,238,0.12)]"
    >
      {/* Top row: icon + text block */}
      <div className="flex items-start gap-3">

        {/* Icon */}
        <Icon
          size={32}
          className={`${tech.color} mt-0.5 shrink-0 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6`}
        />

        {/* Name + category — allow wrapping, no truncate */}
        <div className="flex-1 overflow-hidden">
          <h4 className="break-words text-base font-bold leading-snug text-white">
            {tech.name}
          </h4>
          <p className="mt-0.5 break-words text-xs leading-snug text-slate-400">
            {tech.category}
          </p>
        </div>

        {/* Level badge — sits to the right, wraps if needed */}
        <span className="ml-auto shrink-0 self-start rounded-full border border-cyan-500/30 bg-cyan-500/10 px-2.5 py-1 text-xs font-semibold leading-none text-cyan-400">
          {tech.level}
        </span>

      </div>

      {/* Progress bar + percentage */}
      <div className="flex items-center gap-3">
        <div className="h-1.5 flex-1 rounded-full bg-slate-800">
          <div
            className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-cyan-400 transition-all duration-500"
            style={{ width: tech.progress }}
          />
        </div>
        <span className="w-8 shrink-0 text-right text-xs font-semibold text-slate-500">
          {tech.progress}
        </span>
      </div>

    </motion.div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function TechStack() {
  return (
    <SectionWrapper id="tech" glowPosition="center" className="py-24">
      <div className="mx-auto max-w-5xl px-6 lg:px-8">

        <p className="mb-3 font-semibold uppercase tracking-[0.3em] text-cyan-400">
          Tech Stack
        </p>

        <h2 className="text-5xl font-black text-white">Technologies I Use</h2>

        <p className="mt-4 max-w-2xl text-lg text-slate-400">
          Modern AI, automation, frontend, backend, and cloud technologies that
          power intelligent business solutions.
        </p>

        {sections.map((section, i) => (
          <div key={section.label} className={i === 0 ? "mt-12" : "mt-14"}>
            <SectionHeader label={section.label} dotColor={section.dotColor} />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {section.stack.map((tech) => (
                <TechCard key={tech.name} tech={tech} />
              ))}
            </div>
          </div>
        ))}

      </div>
    </SectionWrapper>
  );
}

