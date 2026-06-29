"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export interface MontageFrame {
  big: string;
  small?: string;
}

/**
 * Rapid cross-cut of typographic "frames" — the page-flip montage.
 * Cycles through frames on a fast interval, each flipping in/out.
 */
export function FlipMontage({
  frames,
  interval = 190,
  onComplete,
}: {
  frames: MontageFrame[];
  interval?: number;
  onComplete?: () => void;
}) {
  const [i, setI] = useState(0);

  useEffect(() => {
    if (i >= frames.length - 1) {
      const t = setTimeout(() => onComplete?.(), interval + 120);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setI((n) => n + 1), interval);
    return () => clearTimeout(t);
  }, [i, frames.length, interval, onComplete]);

  const frame = frames[Math.min(i, frames.length - 1)];

  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
      <AnimatePresence mode="popLayout">
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 1.14, rotateX: -22 }}
          animate={{ opacity: 1, scale: 1, rotateX: 0 }}
          exit={{ opacity: 0, scale: 0.92, rotateX: 18 }}
          transition={{ duration: interval / 1000, ease: "easeOut" }}
          className="flex flex-col items-center px-8 text-center"
          style={{ perspective: 1200 }}
        >
          <span className="titlecard text-[clamp(2.4rem,12vw,9rem)] text-paper">
            {frame.big}
          </span>
          {frame.small && (
            <span className="mt-2 font-serif text-xs uppercase tracking-[0.4em] text-gold/80">
              {frame.small}
            </span>
          )}
        </motion.div>
      </AnimatePresence>

      {/* sweeping light bar */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-gold/10 to-transparent"
        animate={{ x: ["-40vw", "120vw"] }}
        transition={{ duration: 1.1, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}
