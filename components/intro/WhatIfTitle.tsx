"use client";

import { motion } from "framer-motion";
import { useEffect } from "react";

const LINE = ["Marvel", "Studios", "created", "my", "portfolio?"];

/**
 * Opening beat — a "What If…?"-style question that draws in, then hands off
 * to the montage. Original treatment (no official styling).
 */
export function WhatIfTitle({ onComplete }: { onComplete?: () => void }) {
  useEffect(() => {
    const t = setTimeout(() => onComplete?.(), 6000);
    return () => clearTimeout(t);
  }, [onComplete]);

  return (
    <div className="relative flex flex-col items-center px-8 text-center">
      <motion.span
        className="marvel-title text-sm uppercase !tracking-[0.5em] text-gold md:text-base"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        What if&hellip;
      </motion.span>

      <motion.h2
        className="marvel-title mt-6 max-w-4xl text-[clamp(1.8rem,6vw,4.5rem)] text-paper"
        initial="hidden"
        animate="show"
        variants={{
          hidden: {},
          show: { transition: { delayChildren: 0.5, staggerChildren: 0.16 } },
        }}
      >
        {LINE.map((w, i) => (
          <motion.span
            key={i}
            className="mr-3 inline-block"
            variants={{
              hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
              show: {
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
              },
            }}
          >
            {w === "Marvel" || w === "Studios" ? (
              <span className="gold-text">{w}</span>
            ) : (
              w
            )}
          </motion.span>
        ))}
      </motion.h2>

      <motion.div
        className="gold-rule mt-8 w-0"
        animate={{ width: "min(70vw, 520px)" }}
        transition={{ delay: 1.6, duration: 1, ease: "easeOut" }}
      />
    </div>
  );
}
