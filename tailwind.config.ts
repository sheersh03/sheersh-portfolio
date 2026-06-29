import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "var(--ink)",
        "ink-2": "var(--ink-2)",
        panel: "var(--panel)",
        gold: "rgb(var(--gold-rgb) / <alpha-value>)",
        "gold-bright": "rgb(var(--gold-bright-rgb) / <alpha-value>)",
        "gold-deep": "rgb(var(--gold-deep-rgb) / <alpha-value>)",
        paper: "var(--paper)",
        "paper-dim": "var(--paper-dim)",
        "paper-mute": "var(--paper-mute)",
        line: "var(--line)",
        "line-strong": "var(--line-strong)",
      },
      fontFamily: {
        title: ["var(--font-title)", "Impact", "sans-serif"],
        impact: ["var(--font-impact)", "Arial Narrow", "Impact", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        title: "0.06em",
        "title-wide": "0.18em",
      },
      maxWidth: {
        shell: "1180px",
      },
      keyframes: {
        "gold-sheen": {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "200% 50%" },
        },
      },
      animation: {
        "gold-sheen": "gold-sheen 6s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
