export type EmblemKey =
  | "reactor"
  | "web"
  | "smash"
  | "bolt"
  | "horns";

export interface Hero {
  id: string;
  name: string;
  alias: string;
  domain: string;
  color: string;
  colorAlt: string;
  tagline: string;
  quote: string;
  abilities: string[];
  projectId: string;
  projectLabel: string;
  emblem: EmblemKey;
  /**
   * The cinematic clip this hero "owns" — a single source of truth shared by
   * the hero card, the Story reel, and the interludes so the footage and the
   * character are always connected. Optional: not every hero has a clip.
   */
  clip?: string;
  /**
   * Copy for this hero's full-screen cinematic reel (eyebrow + headline +
   * numbered recap details), shown as the foreground that fades as the reel
   * grows. Present only for heroes that get a reel.
   */
  reel?: {
    eyebrow: string;
    headline: string;
    details: string[];
  };
}

/**
 * Five heroes, each an original-art parody mapped to a facet of the craft.
 * Names are used as homage; all visuals are hand-built (see Emblem.tsx).
 * Quotes are original phrasings, not verbatim trademarked lines.
 */
export const HEROES: Hero[] = [
  {
    id: "ironman",
    name: "Iron Man",
    alias: "The Architect",
    domain: "AI · Systems · Infrastructure",
    color: "#c1121f",
    colorAlt: "#ffd166",
    tagline: "Genius engineering, in a suit of infrastructure.",
    quote:
      "The suit isn't the magic. The systems underneath are. I build the platform, the infra, and the AI that runs inside it.",
    abilities: ["Platform architecture", "LLM / MCP tooling", "Boot-gated infra", "Production resilience"],
    projectId: "audena",
    projectLabel: "Audena, AI Voice CRM",
    emblem: "reactor",
    clip: "/reels/ironman-mentor.mp4",
    reel: {
      eyebrow: "The Architect",
      headline: "Genius is in the system.",
      details: [
        "Platform architecture and production infrastructure designed end-to-end, not bolted on after.",
        "LLM-driven features and a code-review knowledge-graph MCP that powers AI-assisted architecture.",
        "Boot-gated deploys and a security-first posture. The suit is only as good as the systems underneath.",
      ],
    },
  },
  {
    id: "spiderman",
    name: "Spider-Man",
    alias: "The Web-Slinger",
    domain: "Frontend · React · Web UX",
    color: "#e63946",
    colorAlt: "#1d3557",
    tagline: "Friendly-neighborhood frontend, building interfaces that stick.",
    quote:
      "Speed, agility, and a web of components that catch the user before they fall. Every interaction lands.",
    abilities: ["React / Next.js", "Framer Motion", "Design systems", "Pixel-perfect builds"],
    projectId: "vybb",
    projectLabel: "Vybb, voice-first app",
    emblem: "web",
    clip: "/reels/spiderman.mp4",
    reel: {
      eyebrow: "The Web-Slinger",
      headline: "Interfaces that stick.",
      details: [
        "React + Next.js front ends with real-time dashboards and a web of reusable components.",
        "Framer Motion choreography and pixel-precise builds, so every interaction lands.",
        "From a voice-first dating app to live CRM control surfaces, the UI catches the user before they fall.",
      ],
    },
  },
  {
    id: "hulk",
    name: "Hulk",
    alias: "The Heavy Lifter",
    domain: "Backend · Data · Heavy Loads",
    color: "#43aa8b",
    colorAlt: "#6a4c93",
    tagline: "Smash the hard problems. The heavier the better.",
    quote:
      "Big data, big loads, big migrations. When the problem is too heavy for anyone else, that's exactly when I get to work.",
    abilities: ["FastAPI / Spring Boot", "PostgreSQL + pgvector", "Redis · asyncpg", "Migrations at scale"],
    projectId: "audena",
    projectLabel: "Audena backend",
    emblem: "smash",
    clip: "/interlude/hulkbuster.mp4",
    reel: {
      eyebrow: "Interlude",
      headline: "Built to take the hit.",
      details: [
        "The heavy lifting: async FastAPI on PostgreSQL + pgvector, asyncpg, and migrations that move under load.",
        "Redis for caching, queues, and conversation state, so latency stays low when traffic spikes.",
        "Big data, big migrations, big loads, engineered to stay standing when the problem gets heavy.",
      ],
    },
  },
  {
    id: "thor",
    name: "Thor",
    alias: "The Stormbringer",
    domain: "Deploys · CI/CD · Infra Power",
    color: "#4895ef",
    colorAlt: "#adb5bd",
    tagline: "Bring the thunder. Ship to every realm, no downtime.",
    quote:
      "Five environments, one hammer. Pipelines that strike clean and deploys that land without breaking the sky.",
    abilities: ["Jenkins · GitHub Actions", "Docker · Caddy", "Cloudflare · AWS · DO", "Zero-downtime cutovers"],
    projectId: "audena",
    projectLabel: "Jenkins multi-env CI/CD",
    emblem: "bolt",
    clip: "/story/story-reel.mp4",
  },
  {
    id: "loki",
    name: "Loki",
    alias: "The Trickster",
    domain: "Debugging · Edge Cases · Clever Hacks",
    color: "#386641",
    colorAlt: "#bb9457",
    tagline: "The one who finds the edge case before it finds prod.",
    quote:
      "Every system has a trick hiding in it. I find the edge case, the race, the silent failure, and I turn it against the bug.",
    abilities: ["Root-cause debugging", "Brutal code review", "Boot gates · invariants", "Security hardening"],
    projectId: "audena",
    projectLabel: "Boot gates & reviews",
    emblem: "horns",
  },
];

/** Look up a hero by id — used to connect clips/badges back to a character. */
export const heroById = (id: string): Hero | undefined =>
  HEROES.find((h) => h.id === id);

/** Six gems for the scroll-progress tracker (original colored stones). */
export interface Gem {
  id: string;
  label: string;
  color: string;
  target: string; // section id
}

export const GEMS: Gem[] = [
  { id: "space", label: "Origin", color: "#4cc9f0", target: "story" },
  { id: "mind", label: "Phase I", color: "#ffd60a", target: "phase-one" },
  { id: "reality", label: "Phase II", color: "#e5383b", target: "phase-two" },
  { id: "power", label: "Phase III", color: "#9d4edd", target: "phase-three" },
  { id: "time", label: "Arsenal", color: "#52b788", target: "abilities" },
  { id: "soul", label: "Contact", color: "#fb8500", target: "contact" },
];
