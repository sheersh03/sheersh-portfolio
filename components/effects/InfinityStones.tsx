"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { GEMS } from "@/lib/characters";

/** A small faceted gem. Lit gems glow in their stone color; unlit are dim. */
function Gem({ color, lit }: { color: string; lit: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className="h-full w-full" aria-hidden>
      {/* outer facet */}
      <polygon
        points="12,1.5 21,8 17,22 7,22 3,8"
        fill={lit ? color : "transparent"}
        stroke={lit ? color : "var(--paper-mute)"}
        strokeWidth="1.4"
        strokeLinejoin="round"
        opacity={lit ? 1 : 0.45}
      />
      {/* inner highlight facet */}
      <polygon
        points="12,1.5 21,8 12,12 3,8"
        fill="#ffffff"
        opacity={lit ? 0.35 : 0.08}
      />
      <line
        x1="12" y1="12" x2="12" y2="22"
        stroke="#ffffff" strokeWidth="0.8" opacity={lit ? 0.25 : 0.06}
      />
    </svg>
  );
}

/**
 * The Gauntlet — six Infinity Stones pinned bottom-center. They set one-by-one
 * as you scroll past each milestone; a set stone scrolls to its section. When
 * all six are set, the gauntlet gives a subtle "snap"-ready glow.
 */
export function InfinityStones({ show }: { show: boolean }) {
  const reduce = useReducedMotion();
  const [reached, setReached] = useState(-1);

  const recompute = useCallback(() => {
    const mid = window.innerHeight * 0.6;
    let idx = -1;
    GEMS.forEach((g, i) => {
      const el = document.getElementById(g.target);
      if (el && el.getBoundingClientRect().top <= mid) idx = i;
    });
    setReached(idx);
  }, []);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(recompute);
    };
    recompute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [recompute]);

  const jump = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: reduce ? "auto" : "smooth",
      block: "start",
    });
  };

  const allSet = reached >= GEMS.length - 1;

  return (
    <motion.div
      aria-hidden={!show}
      initial={{ opacity: 0, y: 20 }}
      animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6 }}
      className="fixed bottom-4 left-1/2 z-40 flex -translate-x-1/2 items-center gap-2.5 rounded-full border bg-ink/75 px-3.5 py-2 backdrop-blur transition-shadow duration-700"
      style={{
        borderColor: allSet ? "rgba(237,29,36,0.5)" : "var(--line)",
        boxShadow: allSet
          ? "0 0 22px -4px rgba(237,29,36,0.55)"
          : "0 0 0 rgba(0,0,0,0)",
      }}
    >
      {GEMS.map((g, i) => {
        const lit = i <= reached;
        const stone = g.id.charAt(0).toUpperCase() + g.id.slice(1);
        return (
          <button
            key={g.id}
            type="button"
            onClick={() => jump(g.target)}
            aria-label={`${stone} Stone — go to ${g.label}`}
            title={`${stone} · ${g.label}`}
            className="group relative grid h-5 w-5 place-items-center"
          >
            <motion.span
              className="block h-[18px] w-[18px]"
              animate={
                reduce
                  ? { opacity: lit ? 1 : 0.4 }
                  : lit
                  ? { scale: i === reached ? [1, 1.35, 1] : 1, opacity: 1 }
                  : { scale: 1, opacity: 0.5 }
              }
              transition={reduce ? {} : { duration: 0.5 }}
              style={{
                filter: lit ? `drop-shadow(0 0 6px ${g.color})` : "none",
              }}
            >
              <Gem color={g.color} lit={lit} />
            </motion.span>
            <span className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-ink px-2 py-1 text-[0.55rem] uppercase tracking-[0.16em] text-paper-dim opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
              <span style={{ color: g.color }}>{stone}</span>
              <span className="mx-1 text-paper-mute">·</span>
              {g.label}
            </span>
          </button>
        );
      })}
    </motion.div>
  );
}
