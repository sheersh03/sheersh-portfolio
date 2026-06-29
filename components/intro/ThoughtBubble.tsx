"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * A comic chat/thought bubble: shows a "typing…" indicator (three bouncing
 * dots) for a beat, then reveals the message. Tail points down toward the
 * figure, so it reads as the character thinking/saying it.
 */
export function ThoughtBubble({
  children,
  typingMs = 1200,
}: {
  children: React.ReactNode;
  typingMs?: number;
}) {
  const reduce = useReducedMotion();
  const [thinking, setThinking] = useState(true);

  useEffect(() => {
    if (reduce) {
      setThinking(false);
      return;
    }
    const t = setTimeout(() => setThinking(false), typingMs);
    return () => clearTimeout(t);
  }, [reduce, typingMs]);

  return (
    <motion.div
      className="relative max-w-md"
      initial={reduce ? false : { opacity: 0, y: -10, scale: 0.94 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="relative rounded-3xl border border-gold/40 bg-panel/85 px-6 py-4 text-center shadow-[0_12px_40px_-14px_rgba(0,0,0,0.7)] backdrop-blur">
        {thinking ? (
          <span className="flex items-center justify-center gap-1.5 py-1.5">
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className="h-2 w-2 rounded-full bg-gold-bright"
                animate={{ y: [0, -5, 0], opacity: [0.35, 1, 0.35] }}
                transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.16 }}
              />
            ))}
          </span>
        ) : (
          <p className="font-body text-sm leading-snug text-paper md:text-base">
            {children}
          </p>
        )}

        {/* tail pointing down toward the figure */}
        <span className="absolute -bottom-[7px] left-1/2 h-3.5 w-3.5 -translate-x-1/2 rotate-45 border-b border-r border-gold/40 bg-panel/85" />
      </div>
    </motion.div>
  );
}
