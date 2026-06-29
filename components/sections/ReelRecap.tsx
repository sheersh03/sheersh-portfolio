"use client";

import { motion } from "framer-motion";

/**
 * The fading foreground for a cinematic reel: an eyebrow, a title, and an
 * optional numbered recap (01, 02, …) with a "keep scrolling" cue — the same
 * shape as the Thor "Story So Far" reel, shared across every hero reel.
 */
export function ReelRecap({
  eyebrow,
  title,
  details,
  scrollCue = true,
}: {
  eyebrow?: string;
  title: string;
  details?: string[];
  scrollCue?: boolean;
}) {
  return (
    <div className="max-w-xl">
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2 className="titlecard mt-3 text-[clamp(1.9rem,5.5vw,3.6rem)] gold-text">
        {title}
      </h2>

      {details && details.length > 0 && (
        <div className="mt-6 space-y-4 md:space-y-5">
          {details.map((line, i) => (
            <div key={i} className="flex gap-4">
              <span className="font-serif text-xl leading-none text-gold/60 md:text-2xl">
                0{i + 1}
              </span>
              <p className="text-sm leading-relaxed text-paper-dim md:text-base">
                {line}
              </p>
            </div>
          ))}
        </div>
      )}

      {scrollCue && (
        <p className="mt-6 flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-paper-mute">
          <span>Keep scrolling</span>
          <motion.span
            aria-hidden
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
          >
            ↓
          </motion.span>
        </p>
      )}
    </div>
  );
}
