// Skills grouped by area, each tagged with an honest proficiency level.
//
//   professional → used day-to-day in a paid role (Accenture QA)
//   project      → applied in portfolio / personal projects
//   learning     → actively studying / hands-on training, not yet production-level
//
// Only technologies backed by the CV, current role, or the portfolio projects
// are listed here. Playwright and Tricentis Tosca are intentionally kept at
// "learning" — real, hands-on, but not professional production experience.

import type { ComponentType } from "react";
import {
  SiJira,
  SiSap,
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiNodedotjs,
  SiGit,
  SiGithub,
  SiPostman,
  SiJson,
  SiN8N,
  SiZapier,
  SiMake,
  SiOpenai,
  SiGooglegemini,
  SiClaude,
  SiSupabase,
  SiPostgresql,
  SiTricentis,
} from "react-icons/si";
import {
  ClipboardCheck,
  Bug,
  Database,
  ShieldCheck,
  FlaskConical,
  Drama,
  MonitorCheck,
  SquareStack,
  FileBarChart,
  Bot,
  BrainCircuit,
  Link2,
  Webhook,
  Contact,
  Crosshair,
  Layers,
  ListChecks,
  type LucideIcon,
} from "lucide-react";

export type SkillLevel = "professional" | "project" | "learning";

export type Skill = {
  name: string;
  icon: ComponentType<{ className?: string; size?: number }> | LucideIcon;
  level: SkillLevel;
};

export type SkillGroup = {
  label: string;
  blurb: string;
  dotColor: string;
  skills: Skill[];
};

export const levelMeta: Record<SkillLevel, { label: string; className: string }> = {
  professional: {
    label: "Professional",
    className: "border-emerald-500/30 bg-emerald-500/10 text-emerald-300",
  },
  project: {
    label: "Project",
    className: "border-cyan-500/30 bg-cyan-500/10 text-cyan-300",
  },
  learning: {
    label: "Learning",
    className: "border-amber-500/30 bg-amber-500/10 text-amber-300",
  },
};

export const skillGroups: SkillGroup[] = [
  {
    label: "Quality Engineering",
    blurb: "The core of my day-to-day work at Accenture.",
    dotColor: "bg-emerald-400",
    skills: [
      { name: "Manual Testing", icon: ClipboardCheck, level: "professional" },
      { name: "Functional Testing", icon: ShieldCheck, level: "professional" },
      { name: "Regression Testing", icon: MonitorCheck, level: "professional" },
      { name: "Integration Testing", icon: Layers, level: "professional" },
      { name: "UAT", icon: ClipboardCheck, level: "professional" },
      { name: "Test Case Design", icon: SquareStack, level: "professional" },
      { name: "Requirements Validation", icon: ListChecks, level: "professional" },
      { name: "Defect Management", icon: Bug, level: "professional" },
      { name: "Jira", icon: SiJira, level: "professional" },
      { name: "SAP", icon: SiSap, level: "professional" },
      { name: "PeopleSoft", icon: MonitorCheck, level: "professional" },
      { name: "SQL", icon: Database, level: "professional" },
      { name: "Postman", icon: SiPostman, level: "professional" },
    ],
  },
  {
    label: "Test Automation",
    blurb: "A working Playwright framework, plus hands-on Tosca training.",
    dotColor: "bg-cyan-400",
    skills: [
      { name: "Playwright", icon: Drama, level: "learning" },
      { name: "TypeScript", icon: SiTypescript, level: "project" },
      { name: "Tricentis Tosca", icon: SiTricentis, level: "learning" },
      { name: "Page Object Model", icon: SquareStack, level: "project" },
      { name: "Data-Driven Testing", icon: Database, level: "project" },
      { name: "Cross-Browser Testing", icon: MonitorCheck, level: "project" },
      { name: "Locators & Assertions", icon: Crosshair, level: "project" },
      { name: "End-to-End Testing", icon: FlaskConical, level: "project" },
      { name: "Allure & Test Reporting", icon: FileBarChart, level: "project" },
    ],
  },
  {
    label: "AI Automation",
    blurb: "Applied across my n8n automation portfolio projects.",
    dotColor: "bg-purple-400",
    skills: [
      { name: "n8n", icon: SiN8N, level: "project" },
      { name: "Claude Code", icon: SiClaude, level: "project" },
      { name: "AI Agents", icon: Bot, level: "project" },
      { name: "RAG", icon: Database, level: "project" },
      { name: "Prompt Engineering", icon: BrainCircuit, level: "project" },
      { name: "OpenAI API", icon: SiOpenai, level: "project" },
      { name: "Gemini API", icon: SiGooglegemini, level: "project" },
      { name: "REST APIs", icon: Link2, level: "project" },
      { name: "Webhooks", icon: Webhook, level: "project" },
      { name: "JSON", icon: SiJson, level: "project" },
    ],
  },
  {
    label: "Business Automation",
    blurb: "CRM and no-code platforms for lead & business workflows.",
    dotColor: "bg-orange-400",
    skills: [
      { name: "GoHighLevel", icon: Contact, level: "learning" },
      { name: "Make.com", icon: SiMake, level: "project" },
      { name: "Zapier", icon: SiZapier, level: "project" },
    ],
  },
  {
    label: "Development",
    blurb: "Used to build this site and the project front-ends.",
    dotColor: "bg-blue-400",
    skills: [
      { name: "JavaScript", icon: SiJavascript, level: "project" },
      { name: "TypeScript", icon: SiTypescript, level: "project" },
      { name: "React", icon: SiReact, level: "project" },
      { name: "Next.js", icon: SiNextdotjs, level: "project" },
      { name: "Tailwind CSS", icon: SiTailwindcss, level: "project" },
      { name: "Node.js", icon: SiNodedotjs, level: "project" },
    ],
  },
  {
    label: "Dev Tools & Data",
    blurb: "Everyday tooling around code and data.",
    dotColor: "bg-slate-400",
    skills: [
      { name: "Git", icon: SiGit, level: "professional" },
      { name: "GitHub", icon: SiGithub, level: "project" },
      { name: "Supabase", icon: SiSupabase, level: "project" },
      { name: "PostgreSQL", icon: SiPostgresql, level: "project" },
    ],
  },
];
