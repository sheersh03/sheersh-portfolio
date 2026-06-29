"use client";

import { motion, useReducedMotion } from "framer-motion";

export function PhasePlate({
  numeral,
  title,
  era,
}: {
  numeral: string;
  title: string;
  era: string;
}) {
  const reduce = useReducedMotion();

  return (
    <div className="relative flex flex-col items-center text-center">
      <motion.span
        className="eyebrow"
        initial={reduce ? false : { opacity: 0, letterSpacing: "0.5em" }}
        whileInView={{ opacity: 1, letterSpacing: "0.32em" }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        {era}
      </motion.span>

      <motion.h2
        className="titlecard mt-3 text-[clamp(2.6rem,11vw,8rem)]"
        initial={reduce ? false : { opacity: 0, scale: 1.18, y: 18 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, margin: "-15% 0px" }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className="block text-paper-mute text-[0.34em] tracking-title-wide">
          PHASE {numeral}
        </span>
        <span className="gold-text">{title}</span>
      </motion.h2>

      <div className="spectrum-rule mt-6 w-28 rounded-full" />
    </div>
  );
}
