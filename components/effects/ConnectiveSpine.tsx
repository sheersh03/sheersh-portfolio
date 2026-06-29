"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

/**
 * A single continuous red thread that draws downward as you scroll the region
 * between two cinematic reels — the connective tissue linking, e.g., the Thor
 * reel to the Hulk reel through the ethos quote and Phase One. Place inside a
 * `relative` wrapper that spans the in-between content; it sits behind it (z-0).
 */
export function ConnectiveSpine() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  // Grow the thread as the region passes through the viewport.
  const scaleY = useTransform(scrollYProgress, [0.06, 0.7], [0, 1]);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-y-0 left-6 z-0 md:left-12"
    >
      {/* node at the top — where the thread leaves the Thor reel */}
      <span className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-gold shadow-[0_0_12px_2px_rgba(237,29,36,0.7)]" />

      <motion.div
        className="relative h-full w-[2px] origin-top"
        style={reduce ? undefined : { scaleY }}
      >
        {/* soft glow */}
        <div className="absolute inset-0 scale-x-[3] bg-gradient-to-b from-gold/0 via-gold/25 to-gold/0 blur-[3px]" />
        {/* crisp thread */}
        <div className="absolute inset-0 bg-gradient-to-b from-gold/0 via-gold/70 to-gold/0" />
      </motion.div>

      {/* node at the bottom — where it meets the next reel */}
      <span className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-gold shadow-[0_0_12px_2px_rgba(237,29,36,0.7)]" />
    </div>
  );
}

/**
 * Wraps an inter-reel content block so the spine runs down its left gutter as
 * one continuous rail, connecting the reel above to the reel below. Content
 * sits above the rail (z-10) so the line never crosses it.
 */
export function SpineSection({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      <ConnectiveSpine />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
