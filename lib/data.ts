export type ProjectKind = "tentpole" | "film" | "short" | "studio";
export type ProjectStatus =
  | "In Production"
  | "Live"
  | "Scaling"
  | "Shipped"
  | "Archived"
  | "In Development";

export interface BreakdownSection {
  label: string;
  summary: string;
  points: string[];
}

export interface Project {
  id: string;
  title: string;
  role?: string;
  tagline: string;
  blurb: string;
  tech: string[];
  status: ProjectStatus;
  kind: ProjectKind;
  link?: string;
  /** Public GitHub repo for this project; renders a "Code" link when set. */
  repo?: string;
  /** Optional deep-dive shown under tentpole projects. */
  breakdown?: BreakdownSection[];
}

export interface Phase {
  id: string;
  numeral: string; // ONE / TWO / THREE
  title: string;
  era: string;
  logline: string;
  projects: Project[];
}

export interface SkillGroup {
  label: string;
  items: string[];
}

export interface Social {
  label: string;
  href: string;
  handle: string;
}

export const PERSON = {
  name: "Sheersh Atrishi",
  firstName: "Sheersh",
  lastName: "Atrishi",
  role: "Software Developer + AI Strategist",
  tagline: "Engineer. Builder. AI strategist. Problem-solver.",
  ethos:
    "I treat the codebase as a system, not a feature collection. Health checks, runbooks, rollback plans, and a clean Done column matter as much as the code itself.",
};

/** MCU-style "Previously on…" origin recap. */
export const STORY_SO_FAR = [
  "It started with trading engines. TheTraderGuy was a Python-and-Docker system that had to keep running with real money on the line. That's where the obsession was forged: uptime, failure modes, and the discipline of actually shipping.",
  "Then came Cavebeat, a multi-venture studio, the company behind companies. Its own CI/CD ships a slate of web and mobile products across Vercel, Netlify, and Cloudflare, led by Vybb, a voice-first dating app spanning Flutter, FastAPI, and Next.js.",
  "Today: founding engineer and engineering lead at Audena, a voice-first AI CRM. LLM-driven calls and structured data extraction on FastAPI, Postgres + pgvector, and Redis, with full production infrastructure across five environments, behind security-first boot-gates that fail loud on a bad deploy.",
  "Throughout, the same instinct: compounding output through tooling. A code-review knowledge-graph MCP, AI-assisted architecture reviews, runbooks and rollback plans, all while never drifting away from the deep technical work itself.",
];

export const PHASES: Phase[] = [
  {
    id: "phase-one",
    numeral: "ONE",
    title: "Foundations",
    era: "The Origin Builds",
    logline:
      "Before the studio and the stage came the systems that taught the discipline. Trading engines, search interfaces, and the habit of shipping.",
    projects: [
      {
        id: "thetraderguy",
        title: "TheTraderGuy",
        role: "Solo build",
        tagline: "A trading bot, sharpened.",
        blurb:
          "A second pass at automated trading, with tighter strategy logic and a cleaner operational loop. The groundwork for thinking about uptime and failure modes.",
        tech: ["Python", "Automation"],
        status: "Archived",
        kind: "film",
      },
      {
        id: "search-ui",
        title: "Search Engine UI",
        role: "Frontend",
        tagline: "A search interface from scratch.",
        blurb:
          "A Vite + React search-engine front end, the project that turned into the NovaSearch venture under Cavebeat later on.",
        tech: ["Vite", "React", "TypeScript"],
        status: "Shipped",
        kind: "film",
      },
    ],
  },
  {
    id: "phase-two",
    numeral: "TWO",
    title: "Cavebeat: The Studio",
    era: "The Company Behind Companies",
    logline:
      "A multi-venture holding company, the studio that produces products. One flagship feature film and a slate of shorts, deployed across the edge.",
    projects: [
      {
        id: "cavebeat",
        title: "Cavebeat",
        role: "Founder",
        tagline: "The company behind companies.",
        blurb:
          "A multi-venture studio housing a portfolio of web and mobile products, orchestrated with its own CI/CD and deployed across Vercel, Netlify, and Cloudflare.",
        tech: ["Founder", "Vercel", "Netlify", "Jenkins"],
        status: "Live",
        kind: "studio",
        link: "https://cavebeat.com",
      },
      {
        id: "vybb",
        title: "Vybb",
        role: "Founder & Engineer",
        tagline: "A voice-first dating app.",
        blurb:
          "The flagship feature film of the studio: a voice-first dating experience spanning a Flutter mobile app, a FastAPI backend, and a Next.js web surface, self-hosted across Cloudflare and a VPS.",
        tech: ["Flutter", "FastAPI", "Next.js", "Cloudflare"],
        status: "Scaling",
        kind: "film",
      },
      {
        id: "inventra",
        title: "Inventra",
        role: "Studio venture",
        tagline: "An ERP system.",
        blurb: "A Next.js ERP product in the studio slate.",
        tech: ["Next.js"],
        status: "In Development",
        kind: "short",
      },
      {
        id: "novasearch",
        title: "NovaSearch",
        role: "Studio venture",
        tagline: "A search engine project.",
        blurb: "A Vite/React search product, grown out of the Phase One UI.",
        tech: ["Vite", "React"],
        status: "In Development",
        kind: "short",
      },
      {
        id: "jarvis",
        title: "Jarvis",
        role: "Studio venture",
        tagline: "A neural UI / automation system.",
        blurb: "An automation and assistant experiment in the slate.",
        tech: ["Vite", "Automation"],
        status: "In Development",
        kind: "short",
      },
    ],
  },
  {
    id: "phase-three",
    numeral: "THREE",
    title: "Audena",
    era: "The Current Saga",
    logline:
      "The tentpole. Engineering lead and founding engineer at a voice-first CRM: production infrastructure, security-first deploy gates, and AI-assisted architecture at scale.",
    projects: [
      {
        id: "audena",
        title: "Audena",
        role: "Engineering Lead & Founding Engineer",
        tagline: "An AI voice CRM.",
        blurb:
          "A voice-first CRM that runs outbound and inbound calls with LLM-driven conversations and structured data extraction. I lead engineering: a FastAPI backend on Postgres + pgvector + asyncpg + Redis, a React front end, and full production infrastructure: Docker, Caddy, Jenkins CI/CD across five environments, and boot-gate discipline that fails loud on a misconfigured deploy. Plus a code-review knowledge-graph MCP for AI-assisted architecture review.",
        tech: [
          "FastAPI",
          "PostgreSQL + pgvector",
          "Redis",
          "React",
          "Docker",
          "Jenkins",
          "Cloudflare",
          "LLM / MCP",
        ],
        status: "In Production",
        kind: "tentpole",
        breakdown: [
          {
            label: "Founding Engineer Journey",
            summary:
              "Founding engineer turned engineering lead, owning the product end-to-end, from the first builds to in-production scale.",
            points: [
              "Own the architecture, security posture, and production infrastructure end-to-end.",
              "Set the engineering bar: PR-review discipline, runbooks, rollback plans, and deploy gates that fail loud.",
              "Lead and mentor the engineering team, driving decisions from data model to deploy.",
              "Took the platform from early-stage prototype to a live, multi-environment system.",
            ],
          },
          {
            label: "Frontend Stack",
            summary:
              "A React + TypeScript control surface for running live voice conversations and the CRM around them.",
            points: [
              "React (TypeScript) single-page app with a component-driven UI.",
              "Real-time dashboards that monitor inbound and outbound calls as they happen.",
              "Agent, role, and permission management for the CRM team.",
              "Talks to the backend over REST and live streaming connections.",
            ],
          },
          {
            label: "Backend Stack & AI Integrations",
            summary:
              "An async FastAPI core that turns live voice calls into structured CRM data with LLMs.",
            points: [
              "FastAPI (async Python) on PostgreSQL + pgvector, asyncpg, and Alembic migrations.",
              "Redis for caching, queues, and conversation state.",
              "LLM-driven conversation engine with real-time structured data extraction.",
              "Twilio telephony for inbound/outbound calls; pgvector-backed semantic search / RAG over customer data.",
              "A code-review knowledge-graph MCP server for AI-assisted architecture reviews.",
            ],
          },
          {
            label: "Deployment & Infra",
            summary:
              "Dockerized services shipped through Jenkins across five isolated environments.",
            points: [
              "Docker Compose services behind a Caddy reverse proxy with automatic TLS.",
              "Jenkins CI/CD pipelines spanning five environments, development through production.",
              "Cloudflare for DNS and secure tunnels into internal boxes.",
              "Hosted across DigitalOcean and AWS, with boot-gate health checks, log streaming, and rollback runbooks.",
            ],
          },
        ],
      },
    ],
  },
];

export const SKILLS: SkillGroup[] = [
  {
    label: "Languages",
    items: ["Python", "TypeScript / JavaScript", "Java", "SQL", "Bash"],
  },
  {
    label: "Backend",
    items: [
      "FastAPI",
      "Spring Boot",
      "PostgreSQL / pgvector",
      "Redis",
      "asyncpg",
      "Alembic / Flyway",
    ],
  },
  {
    label: "Frontend",
    items: ["React", "Next.js", "Vite", "Tailwind", "Framer Motion"],
  },
  {
    label: "Infra & DevOps",
    items: [
      "Docker",
      "Jenkins",
      "GitHub Actions",
      "Cloudflare",
      "AWS",
      "DigitalOcean",
      "Caddy",
    ],
  },
  {
    label: "AI & Tooling",
    items: [
      "Claude / Gemini integration",
      "MCP servers",
      "Knowledge graphs",
      "RAG",
      "LLM-assisted review",
    ],
  },
];

export const SOCIALS: Social[] = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/sheershatrishi/",
    handle: "/in/sheershatrishi",
  },
  {
    label: "GitHub",
    href: "https://github.com/Sheersh03",
    handle: "@Sheersh03",
  },
  {
    label: "Email",
    href: "mailto:Sheershatrishi@gmail.com",
    handle: "Sheershatrishi@gmail.com",
  },
];
