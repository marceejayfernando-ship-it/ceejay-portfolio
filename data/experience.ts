// Professional experience — kept strictly to what the CV supports.
// Portfolio / personal projects live in data/projects.ts, NOT here.

export type ExperienceItem = {
  company: string;
  role: string;
  period: string;
  location: string;
  summary: string;
  highlights: string[];
  stack: string[];
  type: "Professional Experience";
};

export const experience: ExperienceItem[] = [
  {
    company: "Accenture",
    role: "Quality Engineering Analyst / Software Tester",
    period: "Aug 2023 – Present",
    location: "Cebu, Philippines",
    summary:
      "Quality Engineering Analyst with 3+ years of experience specializing in manual and functional testing of enterprise applications including SAP and PeopleSoft.",
    highlights: [
      "Execute manual and functional testing for enterprise business applications, validating functionality and identifying defects across the testing lifecycle.",
      "Design and maintain test cases aligned to business and functional requirements to ensure consistent coverage across releases.",
      "Document and track defects in Jira, partnering with development and functional teams to drive timely resolution.",
      "Perform regression testing to confirm system stability following application changes.",
      "Support User Acceptance Testing (UAT) and validate business requirements with stakeholders.",
      "Run SQL queries for backend data validation and troubleshooting.",
      "SAP Project (Telecommunications): performed functional testing of SAP-based business processes and financial/workflow transactions; reported defects and coordinated resolution with functional and development teams.",
      "PeopleSoft Project: performed functional and regression testing for PeopleSoft applications; tracked defects in Jira and performed SQL-based data validation to support UAT and release validation.",
    ],
    stack: [
      "Manual Testing",
      "Functional Testing",
      "Regression Testing",
      "UAT",
      "SAP",
      "PeopleSoft",
      "Jira",
      "SQL",
      "Agile",
    ],
    type: "Professional Experience",
  },
];

// Education & certifications from the CV.
export const education = {
  degree: "BS in Mechanical Engineering",
  school: "Bachelor's Degree",
};

export type Certification = {
  name: string;
  issuer?: string;
  date?: string;
  /** Link to the certificate PDF (local) or a live verification/badge page (external). */
  link?: string;
  /** Optional badge graphic shown next to the entry. */
  badgeImage?: string;
};

export const certifications: Certification[] = [
  { name: "Software Testing Fundamentals" },
  { name: "Agile Methodology" },
  { name: "Generative AI Fundamentals" },
  { name: "Prompt Engineering" },
  { name: "AI Automation with n8n, Zapier & Make.com" },
  { name: "API Integration & Automation" },
  {
    name: "HighLevel CRM Masterclass",
    issuer: "Go High Level Champs – Training PH",
    date: "Sep 14, 2026",
    link: "/certificates/highlevel-crm-masterclass-certificate.pdf",
    badgeImage: "/certificates/highlevel-crm-expert-badge.png",
  },
  {
    name: "Tricentis Tosca Fundamentals – Automating Web Application Testing (AS1)",
    issuer: "Tricentis Academy",
    date: "Sep 11, 2026",
    link: "https://academy.tricentis.com/share/v1/gamification/assigned_badge/e38ed54d-c06a-4ed9-ba74-1b4c576bd9e8/shared?lang=en&t=1789346769872",
  },
];

// A short, honest note on where the focus is heading.
export const learningNow: string[] = [
  "Tricentis Tosca — hands-on model-based test automation training",
  "Deeper Playwright practice — API mocking, visual checks, CI pipelines",
  "GoHighLevel — hands-on CRM & automation training",
];
