"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { Tech } from "@/lib/techStack";

/**
 * One tile in the stack "Arsenal" — a brand glyph (or a monogram for text-only
 * entries) that's muted by default and lights up in the tech's brand color on
 * hover. Logos are inline SVG (self-contained, CSP-safe).
 */
export function TechBadge({ tech }: { tech: Tech }) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      whileHover={reduce ? undefined : { y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="group flex flex-col items-center gap-2.5 rounded-xl border border-line bg-panel/40 px-3 py-4 text-center transition-colors hover:border-[color:var(--tc)]"
      style={{ ["--tc" as string]: tech.color }}
    >
      {tech.path ? (
        <svg
          viewBox="0 0 24 24"
          aria-hidden
          className="h-7 w-7 text-paper-mute transition-colors duration-300 group-hover:text-[color:var(--tc)]"
        >
          <path d={tech.path} fill="currentColor" />
        </svg>
      ) : (
        <span className="grid h-7 w-7 place-items-center rounded-md border border-line-strong text-[0.58rem] font-bold text-paper-mute transition-colors duration-300 group-hover:border-[color:var(--tc)] group-hover:text-[color:var(--tc)]">
          {tech.name.replace(/[^A-Za-z]/g, "").slice(0, 2).toUpperCase()}
        </span>
      )}
      <span className="text-[0.7rem] leading-tight text-paper-dim transition-colors group-hover:text-paper">
        {tech.name}
      </span>
    </motion.div>
  );
}
