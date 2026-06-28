"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import SectionWrapper from "@/components/SectionWrapper";
import {
  Bot,
  Workflow,
  Link2,
  Sparkles,
  Brain,
  Database,
  Check,
} from "lucide-react";

// ─── Data ─────────────────────────────────────────────────────────────────────

const skills = [
  "AI Automation",
  "n8n",
  "Make.com",
  "Zapier",
  "OpenAI",
  "Gemini",
  "API Integration",
  "Technical VA",
];

const floatingIcons = [
  { icon: Bot,      className: "-top-10 -left-6"  },
  { icon: Workflow, className: "-top-10 right-12"  },
  { icon: Link2,    className: "top-1/2 -left-8"   },
  { icon: Brain,    className: "bottom-0 -left-6"  },
  { icon: Database, className: "-bottom-6 right-4" },
  { icon: Sparkles, className: "top-1/2 -right-12" },
];

const stats = [
  { value: "3+", label: "Years Experience" },
  { value: "15+", label: "Projects" },
  { value: "5+", label: "AI Solutions" },
];

// ─── Animation variants ────────────────────────────────────────────────────────

const statsContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

const statItem = {
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1,  y: 0, transition: { duration: 0.5 } },
};

// ─── Component ─────────────────────────────────────────────────────────────────

export default function About() {
  return (
    <SectionWrapper id="about" glowPosition="top-left" className="py-28">
      <div className="mx-auto max-w-7xl px-6">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mx-auto mb-20 max-w-3xl text-center"
        >
          <p className="mb-3 font-semibold uppercase tracking-[0.3em] text-cyan-400">
            About Me
          </p>

          <h2 className="text-6xl font-black text-white">
            Building Intelligent Automation Solutions
          </h2>

          <p className="mt-6 max-w-2xl text-lg text-slate-400">
            I specialize in AI-powered workflows, intelligent automation,
            API integrations, and custom business solutions that save
            companies time and eliminate repetitive work.
          </p>
        </motion.div>

        {/* Content */}
        <div className="grid items-center gap-24 lg:grid-cols-2">

          {/* LEFT — profile image + floating icons */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="relative flex justify-center"
          >
            <div className="absolute h-80 w-80 rounded-full bg-cyan-500/20 blur-3xl" />

            <div className="relative">
              <Image
                src="/images/profile.png"
                alt="CJ Fernando"
                width={360}
                height={360}
                className="rounded-3xl border border-cyan-500/30"
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
              />

              {floatingIcons.map(({ icon: Icon, className }, i) => (
                <motion.div
                  key={i}
                  animate={{ y: [0, -12, 0] }}
                  transition={{
                    repeat: Infinity,
                    repeatType: "mirror",
                    duration: 3 + i,
                    ease: "easeInOut",
                  }}
                  className={`absolute rounded-xl border border-cyan-500/30 bg-slate-900 p-3 shadow-lg ${className}`}
                >
                  <Icon className="h-6 w-6 text-cyan-400" />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT — bio, skills, stats */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <h3 className="text-4xl font-bold text-white">
              Hi, I'm CJ Fernando 👋
            </h3>

            <p className="mt-6 text-lg leading-8 text-slate-400">
              I help startups and businesses automate repetitive tasks using
              AI, APIs, and workflow automation platforms like n8n,
              Make.com, and Zapier.
            </p>

            <p className="mt-6 text-lg leading-8 text-slate-400">
              My goal is simple: build systems that reduce manual work,
              increase productivity, and help businesses scale faster.
            </p>

            {/* Skills */}
            <div className="mt-10 grid grid-cols-2 gap-4">
              {skills.map((skill) => (
                <div
                  key={skill}
                  className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900/60 p-4 transition hover:border-cyan-400 hover:bg-slate-900"
                >
                  <Check className="h-4 w-4 shrink-0 text-cyan-400" />
                  <span className="font-medium text-white">{skill}</span>
                </div>
              ))}
            </div>

            {/* Stats */}
            <motion.div
              variants={statsContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="mt-12 grid grid-cols-3 gap-6"
            >
              {stats.map(({ value, label }) => (
                <motion.div key={label} variants={statItem}>
                  <h4 className="text-4xl font-black text-cyan-400">{value}</h4>
                  <p className="text-slate-400">{label}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

        </div>
      </div>
    </SectionWrapper>
  );
}
