"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { playSting, setEnabled } from "@/lib/sound";

const CODE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

export function KonamiEasterEgg() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    let pos = 0;
    const onKey = (e: KeyboardEvent) => {
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      if (key === CODE[pos]) {
        pos += 1;
        if (pos === CODE.length) {
          pos = 0;
          setEnabled(true);
          playSting("assemble");
          setShow(true);
          setTimeout(() => setShow(false), 2600);
        }
      } else {
        pos = key === CODE[0] ? 1 : 0;
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[120] grid place-items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at center, rgba(8,8,10,0.6), rgba(8,8,10,0.95))",
            }}
          />
          {/* halftone burst */}
          <div
            aria-hidden
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage:
                "radial-gradient(var(--gold) 1.5px, transparent 1.6px)",
              backgroundSize: "16px 16px",
            }}
          />
          <motion.div
            className="relative text-center"
            initial={{ scale: 0.4, rotate: -8 }}
            animate={{ scale: [0.4, 1.15, 1], rotate: [-8, 3, 0] }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* starburst */}
            <svg
              viewBox="0 0 200 200"
              className="mx-auto mb-2 h-44 w-44"
              aria-hidden
            >
              <polygon
                points={Array.from({ length: 24 })
                  .map((_, i) => {
                    const a = (i * Math.PI) / 12;
                    const r = i % 2 === 0 ? 95 : 64;
                    return `${100 + r * Math.cos(a)},${100 + r * Math.sin(a)}`;
                  })
                  .join(" ")}
                fill="var(--gold)"
                opacity="0.9"
              />
            </svg>
            <span className="titlecard absolute inset-0 grid place-items-center text-5xl text-ink md:text-6xl">
              ASSEMBLED!
            </span>
          </motion.div>
          <p className="absolute bottom-24 left-1/2 -translate-x-1/2 font-serif text-xs uppercase tracking-[0.34em] text-gold">
            Easter egg unlocked · soundtrack on
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
