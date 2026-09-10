// All copy and data for the site lives here. Edit this file, not the markup.

export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000")
).replace(/\/+$/, "");

export const profile = {
  name: "Lohith Kumar Neerukonda",
  role: "Software engineer, full-stack",
  location: "Troy, Michigan",
  email: "lohithkumarneerukonda@gmail.com",
  description:
    "By day, enterprise software. By night, my own products. Full-stack software engineer, open to full-time roles.",
  updated: "2026-09-10",
  openTo: "full-time only · software or AI engineer · remote or relocate anywhere in the US",
  now: "Full-stack engineer at Marvel Technologies, building Grower Pay for Mastronardi Produce",
  links: {
    linkedin: "https://www.linkedin.com/in/lknnerukonda/",
    github: "https://github.com/squid-beast",
    x: "https://x.com/startwithleo",
    instagram: "https://www.instagram.com/thealpharomeo_/",
    blog: "https://www.momentumops.blog",
    source: "https://github.com/squid-beast/Portfolio-Website",
  },
};

export type Chapter = {
  title: string;
  client?: string;
  span: string;
  stack: string[];
  bullets: string[];
};

export type Role = {
  id: string;
  years: string;
  line: string;
  file: string;
  company: string;
  where: string;
  span: string;
  type: string;
  chapters: Chapter[];
};

export const roles: Role[] = [
  {
    id: "mastronardi-produce",
    years: "2026 → now",
    line: "Full-stack engineer. Grower Pay, the grower accounting and settlement platform.",
    file: "mastronardi-produce.md",
    company: "Mastronardi Produce",
    where: "",
    span: "May 2026 – present",
    type: "full-time",
    chapters: [
      {
        title: "Full-stack engineer, Grower Pay",
        span: "May 2026 – present",
        stack: [".NET", "C#", "SPA frontend", "Microsoft Entra ID", "Microsoft Graph", "Azure"],
        bullets: [
          "Building the platform that replaces Excel and VBA pricing and payment workbooks with one web app: contract and market pricing, settlement math, approvals, audit trails, role-based access, reporting and ERP integration.",
          "Implemented Entra ID single sign-on across the SPA and the .NET API: OAuth2 authorization-code flow with PKCE, API scopes, application-user onboarding and access validation on Azure Object IDs.",
          "Wired Microsoft Graph directory lookup and Azure security-group membership into onboarding, so role and region authorization comes from the directory.",
          "The goal: less hand-keyed pricing and a traceable trail behind every settlement.",
        ],
      },
    ],
  },
  {
    id: "marvel-technologies",
    years: "2025 → 26",
    line: "Java, then AI engineering. Demand forecasting carried through to billing.",
    file: "marvel-technologies.md",
    company: "Marvel Technologies Inc.",
    where: "West Bloomfield, Michigan",
    span: "Feb 2025 – Apr 2026",
    type: "full-time",
    chapters: [
      {
        title: "AI engineer, demand forecasting and billing",
        span: "Aug 2025 – Apr 2026",
        stack: ["Python", "Prophet", "SQL", "REST"],
        bullets: [
          "Built a demand forecasting engine on Facebook Prophet with external regressors, producing product-level forecasts that feed inventory and supply planning.",
          "Backend services for purchase-order generation, supplier scheduling, inventory allocation and real-time inventory position.",
          "Carried the flow from forecast to billing, including journal entries and balance-sheet reports.",
        ],
      },
      {
        title: "Java developer, enterprise mobile backend",
        span: "Feb 2025 – Jul 2025",
        stack: ["Java", "Spring Boot", "REST"],
        bullets: [
          "Backend APIs for an enterprise mobile app: employee profiles, timesheets, time-off requests, expenses and leave.",
          "Held API consistency, performance and request validation with the frontend and product teams.",
        ],
      },
    ],
  },
  {
    id: "anywhere-real-estate",
    years: "2024 → 25",
    line: "Spring Boot on Amazon Bedrock for listings. Throughput up 30%.",
    file: "anywhere-real-estate.md",
    company: "Anywhere Real Estate",
    where: "New York, remote",
    span: "Aug 2024 – Jan 2025",
    type: "full-time",
    chapters: [
      {
        title: "Software engineer, AI for listings",
        span: "Aug 2024 – Jan 2025",
        stack: ["Java 17", "Spring Boot", "Amazon Bedrock", "S3", "ECS", "Docker", "Flyway", "MySQL"],
        bullets: [
          "Spring Boot microservices on Amazon Bedrock that read property photos and write the tags, captions and listing descriptions, cutting the manual work for listing coordinators.",
          "S3 ingestion with Spring async processing in parallel; throughput up about 30%.",
          "Flyway-managed schemas, JMeter for load testing, Grafana for the dashboards, Docker images on ECS.",
        ],
      },
    ],
  },
  {
    id: "greenlots",
    years: "2024",
    line: "Notification services. Intern.",
    file: "greenlots.md",
    company: "Greenlots (Shell)",
    where: "Bay Area, remote",
    span: "Jan 2024 – May 2024",
    type: "internship",
    chapters: [
      {
        title: "Software engineer intern, notification service",
        span: "Jan 2024 – May 2024",
        stack: ["Java 11", "Spring", "Twilio", "SendGrid", "SQS", "Docker"],
        bullets: [
          "Notification microservices for email, SMS and push over Twilio and SendGrid, with Mustache templates.",
          "Quartz retry scheduling, in-memory caching and async processing so failed deliveries get retried, not dropped.",
        ],
      },
    ],
  },
  {
    id: "infosys",
    years: "2022",
    line: "Device trust and risk scoring.",
    file: "infosys.md",
    company: "Infosys",
    where: "Hyderabad, India",
    span: "Jan 2022 – Dec 2022",
    type: "internship, then full-time",
    chapters: [
      {
        title: "Systems engineer, intern then full-time",
        span: "Jan 2022 – Dec 2022",
        stack: ["Java 8", "Spring Boot", "Drools", "Kafka", "RabbitMQ", "AWS ECS"],
        bullets: [
          "Device Confidence service: Java, Spring Boot, Drools and Kafka, scoring whether a device can be trusted for high-risk transactions. Rules reload every four hours without a redeploy.",
          "Risk-assessment REST service returning accept, challenge or block from IP, browser, login and transaction signals.",
          "Hystrix circuit breakers, parallel downstream calls and caching; Docker images on ECS.",
        ],
      },
    ],
  },
];

export type Project = {
  id: string;
  line: string;
  file: string;
  name: string;
  tagline: string;
  live: string;
  liveLabel: string;
  status: string;
  role: string;
  stack: string[];
  what: string;
  built: string;
  hard: string;
};

export const projects: Project[] = [
  {
    id: "bookyourslot",
    line: "A booking engine for businesses that meet in person.",
    file: "bookyourslot.md",
    name: "BookYourSlot",
    tagline: "Appointment booking engine for local service businesses.",
    live: "https://bookyourslot.online",
    liveLabel: "bookyourslot.online",
    status: "live · side project",
    role: "fork, maintained solo",
    stack: ["TypeScript", "Next.js", "Prisma", "tRPC", "PostgreSQL", "Docker"],
    what: "A self-hosted booking engine forked from a Cal.com-lineage codebase and tuned for in-person businesses instead of video calls. Each service gets its own link, durations and booking questions. Six location types, from the customer's address to the shop's. Working hours, date overrides, buffers and booking limits. Seats for group sessions. Google Calendar sync. Webhooks out to whatever CRM the owner already uses.",
    built: "I run the fork, the VPS deployment and the product. This year I audited the codebase against its own docs, traced the README's biggest claim to the schema's git history and corrected it, and wrote the product source of truth that now drives the roadmap. Next is a Booking Gateway, so a phone agent can hold, book, reschedule and cancel through the same internal functions the booking page calls, behind a per-business key.",
    hard: "Booking is a concurrency problem wearing a calendar UI. Slot holds, timezone math, calendar sync and a machine caller with no session all have to agree on one row in the bookings table.",
  },
  {
    id: "swamp",
    line: "Drop in a spreadsheet. Get a database.",
    file: "swamp.md",
    name: "Swamp",
    tagline: "Turn a spreadsheet into a shared database.",
    live: "https://swampy.app",
    liveLabel: "swampy.app",
    status: "live · side project",
    role: "built solo",
    stack: ["Next.js", "TypeScript", "Supabase", "PostgreSQL"],
    what: "Upload a CSV, Excel or JSON file and get a real database with a detected schema and five views on the same rows: grid, board, gallery, calendar and form. Share it with a team. It is the database for people who will never open a database tool.",
    built: "Built from scratch on Next.js and Supabase Postgres, with NocoDB as the design reference. Schema inference from messy spreadsheets, the five views, sharing and the form builder. I use it as my own CRM: contacts, status and drafts in one base.",
    hard: "Guessing types from human spreadsheets: dates in four formats, numbers with currency symbols, empty cells that mean three different things. Then keeping a generic grid fast once the table stops being small.",
  },
  {
    id: "voxpilot-automations",
    line: "A voice agent and 22 automations for businesses that miss calls.",
    file: "voxpilot-automations.md",
    name: "VoxPilot automations",
    tagline: "A voice agent and automations for businesses that miss calls.",
    live: "https://voxpilot.io",
    liveLabel: "voxpilot.io",
    status: "live · side project",
    role: "n8n suite and console built solo",
    stack: ["n8n", "PostgreSQL", "Retell", "Twilio", "OpenAI", "React", "Vercel"],
    what: "A Retell voice agent built for a roofing company's demo line that walks a caller through a booking script. Behind it, 22 n8n workflows for small service businesses: appointment reminders with cancellation backfill, receivables chase, speed-to-lead, review replies with a human approve step on Telegram, invoice OCR, maintenance requests, recruiting screens and win-back. One Postgres schema of 15 tables and 12 reporting views drives all of them.",
    built: "Mine: the workflows, the schema, the agent prompt and tool config, a single-file HTML operations console with a demo mode, the public intake forms, and the front door at voxpilot.io, a React site whose lead form posts to a Vercel function, then an n8n webhook, then Sheets and Gmail. Next: wire the agent into BookYourSlot through the Booking Gateway.",
    hard: "Two customers tapping the same cancellation-backfill SMS link cannot both get the slot, so the waitlist claim and the booking happen in one SQL statement and the database decides. The rest is the unglamorous part: retries, and the licensing shape that keeps a client's credentials on the client's own instance, never mine.",
  },
];

export const skills = [
  { group: "Languages", items: ["Java 17", "C# / .NET", "TypeScript", "Python", "SQL"] },
  {
    group: "Backend",
    items: ["Spring Boot", ".NET Web API", "REST and microservices", "Kafka", "RabbitMQ", "async and retry patterns", "OAuth2 / JWT", "Microsoft Entra ID"],
  },
  { group: "Frontend", items: ["React", "Next.js App Router", "Tailwind", "tRPC", "Prisma"] },
  { group: "Data", items: ["PostgreSQL", "MySQL", "Supabase", "Flyway", "Drools", "Prophet"] },
  {
    group: "AI and automation",
    items: ["LLM apps on Bedrock, Claude and OpenAI", "LangChain", "Retell voice agents", "n8n", "prompt and tool design", "Claude Code, daily"],
  },
  {
    group: "Cloud and ops",
    items: ["AWS: ECS, S3, Bedrock, SQS", "Azure: AKS, Entra ID, Graph", "Docker", "CI/CD with Jenkins and GitHub", "Vercel", "VPS operations"],
  },
];

export const education = [
  {
    school: "University of North Texas",
    degree: "Master's in Information Technology",
    span: "Jan 2023 – May 2024",
    where: "Denton, Texas",
  },
  {
    school: "Anil Neerukonda Institute of Technology and Sciences",
    degree: "Bachelor's in Information Technology",
    span: "Jul 2018 – May 2022",
    where: "Visakhapatnam, India",
  },
];

export const oneLineSkills = "Java · TypeScript · Python · Postgres · AWS · Azure · LLM agents · n8n";

// Automations: systems that run without me. One line each, every line sourced from a shipped thing.
export const automations = [
  "Listing copy pipeline: property photos in, tags, captions and descriptions out. Amazon Bedrock, in production at Anywhere Real Estate.",
  "Demand-to-billing pipeline: Prophet forecasts feeding purchase orders, inventory and journal entries. Built at Marvel Technologies.",
  "Contract review pipeline: an LLM reads the clauses, deterministic rules decide. Manual review time down 90%.",
  "Phone booking agent: answers the call and takes the caller through a booking. Retell, n8n.",
  "Automation suite: 36 n8n workflows, 586 nodes, one Postgres schema. Reminders with cancellation backfill, receivables chase, speed-to-lead, review replies with a human approve step, invoice OCR.",
  "Ad production pipeline: a product reference in, faceless spec reels out. Seedance, driven by a set of Claude skills I wrote.",
  "This site: drafted from my Obsidian vault by Claude as an operating partner, fact-checked line by line, shipped static.",
];

export const socials = [
  { label: "GitHub", href: profile.links.github },
  { label: "LinkedIn", href: profile.links.linkedin },
  { label: "X", href: profile.links.x },
  { label: "Instagram", href: profile.links.instagram },
  { label: "Blog", href: profile.links.blog },
];
