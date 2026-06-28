"use client";

import { Bot, Workflow, Link2, MessageSquare, Laptop, Video } from "lucide-react";
import { motion } from "framer-motion";
import SectionWrapper from "@/components/SectionWrapper";

// ─── Data ─────────────────────────────────────────────────────────────────────

const services = [
  {
    icon: Bot,
    title: "AI Automation",
    description: "Automate repetitive business processes using AI-powered workflows.",
    tech: ["OpenAI", "Gemini", "n8n", "Zapier"],
  },
  {
    icon: Workflow,
    title: "Workflow Automation",
    description: "Build intelligent workflows with n8n, Make.com, and Zapier.",
    tech: ["n8n", "Make.com", "Zapier"],
  },
  {
    icon: Link2,
    title: "API Integration",
    description: "Connect your apps and automate data between different platforms.",
    tech: ["REST", "Webhooks", "n8n", "Make.com"],
  },
  {
    icon: MessageSquare,
    title: "AI Chatbots",
    description: "Create AI assistants powered by OpenAI and Gemini.",
    tech: ["OpenAI", "Gemini", "Supabase", "n8n"],
  },
  {
    icon: Laptop,
    title: "Technical Virtual Assistant",
    description: "Technical support, automation setup, documentation, and system management.",
    tech: ["Notion", "GitHub", "Zapier", "Make.com"],
  },
  {
    icon: Video,
    title: "YouTube Automation",
    description: "Automate YouTube content creation, publishing, and workflows.",
    tech: ["n8n", "OpenAI", "Make.com"],
  },
];

// ─── Animation variants ────────────────────────────────────────────────────────

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function Services() {
  return (
    <SectionWrapper id="services" glowPosition="bottom-left" className="py-24">
      <div className="mx-auto max-w-7xl px-6">

        {/* Heading */}
        <div className="text-center">
          <p className="mb-3 font-semibold uppercase tracking-[0.3em] text-cyan-400">
            Services
          </p>

          <h2 className="mt-4 text-5xl font-black text-white">
            What I Can Help You With
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-slate-400">
            Helping businesses streamline operations using AI, workflow
            automation, API integrations, and intelligent systems.
          </p>
        </div>

        {/* Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mt-16 grid items-start gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <motion.div
                key={service.title}
                variants={cardVariants}
                whileHover={{ y: -10 }}
                transition={{ duration: 0.3 }}
                className="rounded-3xl border border-slate-700 bg-slate-900/60 p-7 backdrop-blur-xl transition-all hover:border-cyan-400 hover:shadow-[0_0_40px_rgba(6,182,212,.18)]"
              >
                {/* Icon */}
                <div className="mb-5 inline-flex rounded-2xl bg-cyan-500/10 p-4">
                  <Icon className="h-8 w-8 text-cyan-400" />
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-white">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="mt-4 leading-7 text-slate-400">
                  {service.description}
                </p>

                {/* Divider */}
                <div className="my-5 h-px bg-slate-700" />

                {/* Tech stack */}
                <h4 className="mb-3 text-xs uppercase tracking-[0.25em] text-cyan-400 opacity-80">
                  Tech Stack
                </h4>

                <div className="flex flex-wrap gap-2">
                  {service.tech.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-medium text-cyan-300 transition-all duration-300 hover:scale-105 hover:border-cyan-400/50 hover:bg-cyan-500/20 hover:shadow-[0_0_35px_rgba(6,182,212,0.18)]"
                    >
                      {item}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <a
                  href="#contact"
                  className="mt-8 block w-full rounded-xl border border-cyan-500 py-3 text-center font-semibold text-cyan-400 transition-all hover:bg-cyan-500 hover:text-white"
                >
                  Start Your Project →
                </a>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </SectionWrapper>
  );
}
