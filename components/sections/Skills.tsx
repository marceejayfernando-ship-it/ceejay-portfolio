"use client";

import { motion } from "framer-motion";
import SectionWrapper from "@/components/SectionWrapper";
import { skillGroups, levelMeta, type SkillLevel } from "@/data/skills";

const LEGEND: { level: SkillLevel; desc: string }[] = [
  { level: "professional", desc: "Used day-to-day in my role at Accenture" },
  { level: "project", desc: "Applied in portfolio / personal projects" },
  { level: "learning", desc: "Actively studying — not yet production-level" },
];

export default function Skills() {
  return (
    <SectionWrapper id="skills" glowPosition="center" className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-10 max-w-2xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-cyan-400">
            Skills
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Skills &amp; tech stack
          </h2>
          <p className="mt-4 text-sm text-slate-400 md:text-base">
            Grouped by area and tagged by how I actually use each one, so the
            picture stays honest.
          </p>
        </div>

        {/* Legend */}
        <div className="mb-12 flex flex-wrap gap-3">
          {LEGEND.map(({ level, desc }) => (
            <div
              key={level}
              className="flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900/60 px-3 py-2"
            >
              <span
                className={`rounded-full border px-2 py-0.5 text-xs font-semibold ${levelMeta[level].className}`}
              >
                {levelMeta[level].label}
              </span>
              <span className="text-xs text-slate-400">{desc}</span>
            </div>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {skillGroups.map((group, gi) => (
            <motion.div
              key={group.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: (gi % 2) * 0.08 }}
              viewport={{ once: true }}
              className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6"
            >
              <h3 className="flex items-center gap-2.5 text-base font-bold text-white">
                <span
                  className={`h-2 w-2 shrink-0 rounded-full ${group.dotColor}`}
                />
                {group.label}
              </h3>
              <p className="mt-1 text-xs text-slate-500">{group.blurb}</p>

              <ul className="mt-5 flex flex-wrap gap-2">
                {group.skills.map(({ name, icon: Icon, level }) => (
                  <li
                    key={name}
                    className="group inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800/50 px-3 py-1.5 transition-colors hover:border-cyan-500/40"
                  >
                    <Icon
                      className="h-4 w-4 shrink-0 text-slate-300 transition-colors group-hover:text-cyan-400"
                      size={16}
                    />
                    <span className="text-sm text-slate-200">{name}</span>
                    <span
                      className={`ml-1 rounded-full border px-1.5 py-0.5 text-[10px] font-semibold ${levelMeta[level].className}`}
                    >
                      {levelMeta[level].label}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
