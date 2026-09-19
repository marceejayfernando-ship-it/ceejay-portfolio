// Central profile / positioning data.
// Keep every claim here truthful and in sync with the CV in /public/resume.pdf.

export const profile = {
  firstName: "CJ",
  name: "Chona Fernando",
  fullName: 'Chona "CJ" Fernando',
  location: "Cebu, Philippines",

  // Primary professional positioning
  roles: ["Quality Engineering Analyst", "Test Automation", "AI Automation"],

  headline: "Quality Engineering + Automation",
  subheadline:
    "Quality Engineering Analyst specializing in manual and functional testing while expanding into Playwright, Tricentis Tosca, and AI-powered automation.",
  tagline: "Building AI-Assisted Test Automation & Intelligent Workflows",

  // Short elevator pitch used in the hero — one sentence, expands on the subheadline
  intro:
    "I combine 3+ years of enterprise QA experience with modern test automation and AI-powered business workflow automation.",

  // Rotating phrases for the hero typing effect (all accurate)
  typingPhrases: [
    "Functional Testing",
    "Test Case Design",
    "Playwright + TypeScript",
    "Tricentis Tosca",
    "AI & Business Automation",
  ],

  // Honest, non-fabricated stats
  stats: [
    { value: "3+", suffix: "yrs", label: "Enterprise QA Experience" },
    { value: "2", suffix: "", label: "ERP Platforms Tested (SAP, PeopleSoft)" },
    { value: "13", suffix: "", label: "Automation & Test Projects Built" },
  ],

  availability: "Open to Quality Engineering, Test Automation & AI Automation roles",

  resumePath: "/resume.pdf",
  profileImage: "/images/profile.png",
} as const;

export type Profile = typeof profile;
