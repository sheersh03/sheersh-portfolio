"use client";

import { motion } from "framer-motion";

/**
 * The logo reveal — the name assembles in a living gradient (footage-through-
 * text feel) with a gold settle, then holds.
 */
export function TitleReveal({
  firstName,
  lastName,
  onSettled,
}: {
  firstName: string;
  lastName: string;
  onSettled?: () => void;
}) {
  return (
    <motion.div
      className="relative flex flex-col items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      onAnimationComplete={() => {
        const t = setTimeout(() => onSettled?.(), 1400);
        return () => clearTimeout(t);
      }}
    >
      <motion.span
        className="eyebrow mb-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        Presents
      </motion.span>

      <motion.h1
        className="titlecard relative flex flex-col items-center text-[clamp(3rem,15vw,12rem)] leading-[0.82]"
        initial={{ scale: 1.28, filter: "blur(14px)", opacity: 0 }}
        animate={{ scale: 1, filter: "blur(0px)", opacity: 1 }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
      >
        <span
          className="bg-clip-text text-transparent animate-gold-sheen"
          style={{
            backgroundImage: "var(--spectrum)",
            backgroundSize: "200% 100%",
          }}
        >
          {firstName}
        </span>
        <span className="gold-text">{lastName}</span>
      </motion.h1>

      <motion.div
        className="gold-rule mt-7 w-0"
        animate={{ width: "min(60vw, 460px)" }}
        transition={{ delay: 0.9, duration: 0.9, ease: "easeOut" }}
      />

      <motion.span
        className="mt-5 font-serif text-xs uppercase tracking-[0.4em] text-paper-dim"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        Software Developer &middot; AI Strategist
      </motion.span>
    </motion.div>
  );
}
