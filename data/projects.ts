// Portfolio / personal projects.
//
// These are self-built projects, NOT professional client work. Descriptions are
// deliberately qualitative — no invented metrics, clients, repos or live demos.
// Add a `links` entry only when a real URL exists.

export type Project = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  problem: string;
  solution: string;
  features: string[];
  tech: string[];
  tags: string[];
  /** Filter categories — a project can belong to several. Drives the Projects filter bar. */
  categories: ProjectCategory[];
  image: string;
  /** How the preview image sits in its frame. Use "contain" for wide diagram / screenshot captures. */
  imageFit?: "cover" | "contain";
  /** Optional screen-recording walkthrough, played in the project detail modal (poster = `image`). */
  video?: string;
  type: string;
  featured: boolean;
  status:
    | "Prototype"
    | "Case study"
    | "In progress"
    | "Learning / Hands-on Project"
    | "Hands-on Training Project";
  links?: { demo?: string; repo?: string; workflow?: string };
};

// All categories the filter UI knows about. New ones (e.g. "GHL", "QA Automation")
// only need to be added here and referenced in a project's `categories` array —
// the filter bar renders itself from the data and hides empty categories.
export const PROJECT_CATEGORIES = [
  "AI Automation",
  "n8n",
  "Make",
  "GHL",
  "QA Automation",
  "Content Automation",
  "RAG",
] as const;

export type ProjectCategory = (typeof PROJECT_CATEGORIES)[number];

const projects: Project[] = [
  {
    slug: "playwright-ecommerce-test-automation",
    title: "Playwright E-Commerce Test Automation Framework",
    tagline: "POM + data-driven UI tests across two demo storefronts",
    description:
      "A Playwright + TypeScript automation framework testing two public demo e-commerce sites (SauceDemo and the LambdaTest E-Commerce Playground) with the Page Object Model, fixtures, external test data, tags and cross-browser runs.",
    problem:
      "I wanted a portfolio-grade way to demonstrate practical Playwright and TypeScript test automation — structured the way a real team would maintain it, not a pile of throwaway scripts.",
    solution:
      "A layered framework: Page Objects hold locators and actions, custom fixtures wire them into specs, and the specs own the assertions. Test data lives in external JSON and CSV, scenarios are tagged @SmokeTest / @Regression / @UAT, and three browser projects (Chromium, Firefox, WebKit) run with HTML and Allure reporting plus screenshots, video and traces on failure.",
    features: [
      "Page Object Model with a shared BasePage and per-app objects",
      "SauceDemo: login, products, cart, and a full end-to-end checkout flow",
      "LambdaTest: My Account login, data-driven product search, product & cart checks",
      "Data-driven tests from external JSON and CSV",
      "Cross-browser projects: Chromium, Firefox, WebKit",
      "Playwright HTML + Allure reports; trace / screenshot / video on failure",
    ],
    tech: ["Playwright", "TypeScript", "Node.js", "Allure", "Page Object Model"],
    tags: ["QA AUTOMATION", "PLAYWRIGHT", "TYPESCRIPT"],
    categories: ["QA Automation"],
    image: "/images/projects/playwright-ecommerce.png",
    imageFit: "contain",
    type: "QA Automation",
    featured: true,
    status: "Learning / Hands-on Project",
  },
  {
    slug: "tosca-vehicle-insurance-automation",
    title: "Tricentis Tosca – Vehicle Insurance Automation",
    tagline: "Model-based automation, hands-on in Tosca Commander",
    description:
      "A hands-on, model-based test automation project built in Tricentis Tosca Commander against the standard Vehicle Insurance training application, covering Modules, TestCases, TestSteps and ExecutionLists.",
    problem:
      "Enterprise QA teams widely use model-based tools like Tosca alongside code-first frameworks. I wanted structured, hands-on practice with that approach rather than only script-based automation.",
    solution:
      "Working in Tosca Commander against the Vehicle Insurance sample application, I built reusable Modules mapped to the app UI, assembled TestCases from TestSteps and reusable TestStepBlocks, linked them to Requirements for traceability, parameterized runs with Test Configuration Parameters and Buffers, applied Constraints and Verifications, ran them through ExecutionLists, and reviewed the Execution Results.",
    features: [
      "Modules mapped to the Vehicle Insurance application UI",
      "Reusable TestStepBlocks for common flows",
      "TestCases built from TestSteps with Verifications",
      "Requirements linked to TestCases for traceability",
      "Test Configuration Parameters & Buffers for data handling",
      "ExecutionLists with reviewed Execution Results",
    ],
    tech: ["Tricentis Tosca", "Tosca Commander", "Model-Based Testing"],
    tags: ["QA AUTOMATION", "TOSCA"],
    categories: ["QA Automation"],
    image: "/images/projects/tosca-vehicle-insurance.png",
    imageFit: "contain",
    type: "QA Automation",
    featured: false,
    status: "Hands-on Training Project",
  },
  {
    slug: "gmail-classify-label-drive-archive",
    title: "Gmail Triage → Label, Sheet & Drive Archive",
    tagline: "Classify email, label it, log it, file the attachments",
    description:
      "An n8n workflow that triggers on new Gmail, classifies each email with an LLM, applies the matching Gmail label, logs it to Google Sheets, and files any attachments into a find-or-create Drive folder tree (label / date / sender).",
    problem:
      "Manual inbox triage is slow, attachments get lost, and there is no consistent archive — folders end up duplicated or inconsistently named.",
    solution:
      "A new email is parsed, classified into one of five categories, and routed through a Switch that applies the right Gmail label. Every processed email is appended to a tracking sheet. When attachments are present, the workflow resolves a nested Drive path — Label → Date → Sender — using idempotent find-or-create steps, then validates and uploads each attachment.",
    features: [
      "LLM classification into five routed labels (Job Opportunity, Promotion, Socials, Personal, Misc)",
      "Gmail label applied via Switch routing",
      "Every email logged to Google Sheets",
      "Idempotent find-or-create Drive folders — label / date / sender, no duplicates",
      "Attachment loop with validation before upload",
      "\"Watched label only\" guard to scope what gets processed",
    ],
    tech: ["n8n", "Gmail API", "OpenAI", "Google Sheets", "Google Drive"],
    tags: ["AI AUTOMATION", "N8N", "API"],
    categories: ["AI Automation", "n8n"],
    image: "/images/projects/wf1-gmail-drive.png",
    imageFit: "contain",
    type: "Workflow Automation",
    featured: false,
    status: "Prototype",
  },
  {
    slug: "telegram-receipt-photo-processing",
    title: "Telegram Receipt Photo Processing",
    tagline: "Photo a receipt, get it read, filed and logged",
    description:
      "An n8n workflow where a receipt photo sent to a Telegram bot is read by Gemini vision, filed in Google Drive by date, logged to a Google Sheet, and confirmed back in the chat.",
    problem:
      "Logging expense receipts by hand — photographing, transcribing the vendor, date and total, then filing the image — is tedious and error-prone.",
    solution:
      "The Telegram trigger checks the message is a photo, downloads the file, and sends it to Gemini to extract vendor, date and total. The parsed result is filed into a find-or-create date folder in Drive, the original image is uploaded, a structured row is appended to an expense sheet, and the bot replies with a confirmation. Non-photo messages get a prompt to send one.",
    features: [
      "Telegram bot intake with photo validation",
      "Gemini vision extracts vendor, date and total from the image",
      "Find-or-create date folder in Google Drive",
      "Original receipt image archived to Drive",
      "Structured expense row appended to Google Sheets",
      "Telegram confirmation reply (or a prompt when no photo is sent)",
    ],
    tech: ["n8n", "Telegram API", "Google Gemini", "Google Drive", "Google Sheets"],
    tags: ["AI AUTOMATION", "N8N", "API"],
    categories: ["AI Automation", "n8n"],
    image: "/images/projects/wf2-telegram-receipt.png",
    imageFit: "contain",
    type: "AI Automation",
    featured: false,
    status: "Prototype",
  },
  {
    slug: "ai-customer-support-agent",
    title: "AI Customer Support Agent",
    tagline: "Messenger chatbot backed by a live knowledge base",
    description:
      "An AI-powered Facebook Messenger support agent built in n8n, using Gemini and a Google Docs knowledge base for dynamic responses and escalation handling.",
    problem:
      "Repetitive customer questions consume support hours and slow down response times, while answers drift out of sync with the latest information.",
    solution:
      "An n8n workflow receives Messenger events, retrieves context from a Google Docs knowledge base, generates a grounded reply with Gemini, and escalates to a human when confidence is low.",
    features: [
      "Meta Messenger webhook integration",
      "Google Docs as an editable knowledge source",
      "Gemini-generated, context-grounded replies",
      "Automatic escalation path for complex cases",
    ],
    tech: ["n8n", "Gemini", "Google Docs", "Meta Messenger API"],
    tags: ["AI AGENT", "AI AUTOMATION", "N8N"],
    categories: ["AI Automation", "n8n"],
    image: "/images/projects/customer-support.png",
    type: "AI Agent",
    featured: true,
    status: "Prototype",
  },
  {
    slug: "inbox-email-ai-agent",
    title: "Inbox / Email AI Agent",
    tagline: "Triage, summarise and draft replies automatically",
    description:
      "An email automation that reads incoming messages, classifies them, summarises long threads, and prepares draft replies for review.",
    problem:
      "A busy inbox mixes urgent items with noise, and writing repetitive replies from scratch wastes time.",
    solution:
      "An n8n workflow polls the mailbox, classifies each message with an LLM, writes a short summary, and stores a suggested draft reply so a human only has to approve or edit.",
    features: [
      "Rule + LLM based message classification",
      "Thread summarisation for long conversations",
      "Draft reply generation kept human-in-the-loop",
      "Label / folder routing",
    ],
    tech: ["n8n", "OpenAI", "Gmail API"],
    tags: ["AI AUTOMATION", "N8N"],
    categories: ["AI Automation", "n8n"],
    image: "/images/projects/inbox-agent.png",
    type: "AI Automation",
    featured: false,
    status: "Prototype",
  },
  {
    slug: "outbound-lead-generation",
    title: "Outbound Lead Generation Automation",
    tagline: "Find, enrich and queue prospects end to end",
    description:
      "A lead pipeline that collects prospects, enriches them through APIs, scores fit, and writes the results to a sheet ready for outreach.",
    problem:
      "Manual prospecting — searching, copying data between tools, and formatting lists — is slow and error-prone.",
    solution:
      "An n8n workflow pulls candidate leads, enriches each record via third-party APIs, applies a simple scoring model, and appends qualified rows to Google Sheets with notifications.",
    features: [
      "Multi-source lead collection",
      "API-based data enrichment",
      "Lightweight fit scoring",
      "Google Sheets output + alerts",
    ],
    tech: ["n8n", "REST APIs", "Google Sheets"],
    tags: ["AI AUTOMATION", "N8N", "API"],
    categories: ["AI Automation", "n8n"],
    image: "/images/projects/lead-generator.png",
    type: "Workflow Automation",
    featured: true,
    status: "Prototype",
  },
  {
    slug: "rag-pipeline-chatbot",
    title: "RAG Pipeline & Chatbot",
    tagline: "Answer questions from your own documents",
    description:
      "A retrieval-augmented generation pipeline that ingests documents, stores embeddings, and answers questions with cited context.",
    problem:
      "General LLMs don't know private or domain-specific content and can answer confidently but incorrectly.",
    solution:
      "Documents are chunked and embedded into a vector store; at query time the most relevant chunks are retrieved and passed to the model so answers stay grounded in the source material.",
    features: [
      "Document ingestion & chunking",
      "Vector store for semantic search",
      "Context-grounded answers",
      "Chat interface over the knowledge base",
    ],
    tech: ["n8n", "OpenAI", "Vector Store", "Supabase"],
    tags: ["RAG", "AI AUTOMATION", "N8N"],
    categories: ["AI Automation", "n8n", "RAG"],
    image: "/images/projects/rag-pipeline.png",
    type: "RAG",
    featured: true,
    status: "Prototype",
  },
  {
    slug: "facebook-messenger-automation",
    title: "Facebook Messenger Automation",
    tagline: "Automated conversation flows for a Page",
    description:
      "A Messenger automation that handles common inbound conversations, captures details, and hands structured data to downstream tools.",
    problem:
      "Page messages arrive at all hours and need a consistent first response plus clean data capture.",
    solution:
      "An n8n workflow responds to Messenger events with guided flows, validates the collected information, and forwards it to a sheet or CRM.",
    features: [
      "Guided conversation flows",
      "Input validation & structured capture",
      "Handoff to spreadsheet / CRM",
    ],
    tech: ["n8n", "Meta Messenger API"],
    tags: ["AI AUTOMATION", "N8N"],
    categories: ["AI Automation", "n8n"],
    image: "/images/projects/facebook-agent.png",
    type: "Workflow Automation",
    featured: false,
    status: "Prototype",
  },
  {
    slug: "business-workflow-automation",
    title: "Business Workflow Automation",
    tagline: "Notifications, reporting and follow-ups on autopilot",
    description:
      "A set of Make.com scenarios that automate repetitive business processes across Google Workspace and third-party APIs.",
    problem:
      "Routine operational tasks — copying data, sending updates, compiling simple reports — eat into the working day.",
    solution:
      "Make.com scenarios connect the relevant apps, transform the data, and run the steps on a schedule or trigger, with error notifications.",
    features: [
      "Scheduled and event-triggered scenarios",
      "Google Workspace integration",
      "Data mapping between services",
      "Failure alerts",
    ],
    tech: ["Make", "Google Workspace APIs", "Webhooks"],
    tags: ["WORKFLOW AUTOMATION", "MAKE", "API"],
    categories: ["Make"],
    image: "/images/projects/make-business-automation.png",
    imageFit: "contain",
    type: "Workflow Automation",
    featured: false,
    status: "Prototype",
  },
  {
    slug: "gohighlevel-crm-lead-automation",
    title: "GoHighLevel CRM & Lead Automation",
    tagline: "Hands-on CRM setup for leads, pipelines and follow-ups",
    description:
      "A hands-on GoHighLevel project covering contact management, sales pipelines, appointment calendars, and automated lead follow-up workflows, practiced using a solar-business scenario.",
    problem:
      "I wanted practical, hands-on experience with a CRM platform that pairs directly with the workflow automation tools I already use, focused on how a lead moves from first contact to a booked appointment.",
    solution:
      "Working through a practice solar-business scenario, I set up CRM contact records, built a sales pipeline with defined stages, configured appointment booking calendars, and built automated follow-up workflows that move leads through the pipeline and notify the right people as status changes.",
    features: [
      "Contact & lead record management",
      "Sales pipeline with defined stages",
      "Appointment booking calendars",
      "Automated follow-up workflows",
      "Lead status routing and notifications",
    ],
    tech: ["GoHighLevel", "CRM Automation", "Workflow Automation"],
    tags: ["GHL", "CRM AUTOMATION"],
    categories: ["GHL"],
    image: "/images/projects/ghl-lead-automation.png",
    imageFit: "contain",
    type: "CRM Automation",
    featured: false,
    status: "Hands-on Training Project",
  },
  {
    slug: "ugc-ad-video-generator",
    title: "UGC Ad Video Generator",
    tagline: "Turn a spreadsheet row into a finished ad clip",
    description:
      "An automation that generates UGC-style ad videos from a Google Sheet using AI image and video prompts.",
    problem:
      "Producing many short ad variations by hand is slow and hard to keep consistent.",
    solution:
      "Each sheet row becomes a job: prompts are expanded, images and video segments are generated via AI APIs, then assembled into a final clip.",
    features: [
      "Google Sheet as the job queue",
      "Prompt expansion for image & video",
      "AI video generation via API",
      "Automated assembly of the final video",
    ],
    tech: ["n8n", "Veo", "Kie AI", "Google Sheets"],
    tags: ["CONTENT AUTOMATION", "AI AUTOMATION", "N8N"],
    categories: ["AI Automation", "n8n", "Content Automation"],
    image: "/images/projects/UGC-Instant.png",
    type: "Content Automation",
    featured: false,
    status: "Prototype",
  },
  {
    slug: "youtube-shorts-automation",
    title: "YouTube Shorts Automation Pipeline",
    tagline: "Script → voiceover → render → upload",
    description:
      "An end-to-end pipeline that generates AI images, video and voiceover, renders the final Short, and uploads it to YouTube with an email notification.",
    problem:
      "Publishing short-form video consistently means repeating the same multi-tool production process every time.",
    solution:
      "One n8n workflow chains scripting, image and video generation, voiceover, rendering and the YouTube upload, then emails a summary when the video is live.",
    features: [
      "AI script, image, video and voiceover generation",
      "Automated render step",
      "YouTube Data API upload",
      "Email notification on completion",
    ],
    tech: ["n8n", "OpenAI", "YouTube Data API"],
    tags: ["CONTENT AUTOMATION", "AI AUTOMATION", "N8N"],
    categories: ["AI Automation", "n8n", "Content Automation"],
    image: "/images/projects/Youtube-Automation.png",
    type: "Content Automation",
    featured: false,
    status: "Prototype",
  },
  {
    slug: "dental-clinic-lead-funnel",
    title: "Dental Clinic Lead Funnel",
    tagline: "GoHighLevel funnel built to book consultations",
    description:
      "A GoHighLevel funnel for a local dental practice, built page-by-page in the funnel builder to turn visitors into booked consultations rather than just showing a generic homepage.",
    problem:
      "A generic clinic homepage gives visitors no clear next step — trust signals, offers and the booking call-to-action are scattered instead of building toward one conversion goal.",
    solution:
      "Built the funnel in GoHighLevel's page builder around a single goal — booking a free consultation. A hero section leads with the offer and a primary CTA, trust badges and a review count reinforce credibility right below it, and a stats strip (patients treated, years of experience, satisfaction rate) backs up the pitch before the CTA repeats further down the page.",
    features: [
      "Hero section built around one primary CTA: Book Consultation",
      "Trust badges — certifications, low-anxiety care, extended hours",
      "Star rating and verified review count for social proof",
      "Stats strip: patients treated, years of experience, satisfaction rate",
      "Mobile-responsive layout built entirely in GoHighLevel's funnel builder",
    ],
    tech: ["GoHighLevel", "Funnel Builder", "Lead Generation"],
    tags: ["GHL", "FUNNEL", "LEAD GEN"],
    categories: ["GHL"],
    image: "/images/projects/dental-clinic-funnel.jpg",
    imageFit: "contain",
    video: "/videos/projects/dental-clinic-funnel.mp4",
    type: "GHL Funnel",
    featured: false,
    status: "Prototype",
  },
  {
    slug: "solar-lead-funnel",
    title: "Solar Lead Funnel",
    tagline: "GoHighLevel funnel for a free solar assessment offer",
    description:
      "A GoHighLevel funnel for a residential solar company, guiding visitors toward booking a free assessment with proof points and financing messaging built into the page.",
    problem:
      "Solar is a high-consideration purchase — a page that doesn't quickly answer \"what does this cost me\" and \"can I trust this company\" loses the visitor before they ever reach the offer.",
    solution:
      "Built the funnel in GoHighLevel's page builder to move a visitor from the offer to the ask in one scroll: a hero leads with the free assessment and a $0-down financing callout, a stats strip backs the claims with homes powered, customer savings and warranty terms, and an about section with real outcomes closes the trust gap before the CTA repeats.",
    features: [
      "Hero section with the offer and a $0-down financing callout",
      "Stats strip: homes powered, customer savings, warranty length, rating",
      "About section reinforcing outcomes and credibility",
      "Repeated CTA button pattern to keep the ask visible while scrolling",
      "Mobile-responsive layout built entirely in GoHighLevel's funnel builder",
    ],
    tech: ["GoHighLevel", "Funnel Builder", "Lead Generation"],
    tags: ["GHL", "FUNNEL", "LEAD GEN"],
    categories: ["GHL"],
    image: "/images/projects/solar-funnel.jpg",
    imageFit: "contain",
    video: "/videos/projects/solar-funnel.mp4",
    type: "GHL Funnel",
    featured: false,
    status: "Prototype",
  },
];

export default projects;

export const featuredProjects = projects.filter((p) => p.featured);

/** Categories that actually have at least one project, in canonical order. */
export const activeCategories: ProjectCategory[] = PROJECT_CATEGORIES.filter(
  (cat) => projects.some((p) => p.categories.includes(cat))
);

export const filterProjects = (category: "All" | ProjectCategory) =>
  category === "All"
    ? projects
    : projects.filter((p) => p.categories.includes(category));
