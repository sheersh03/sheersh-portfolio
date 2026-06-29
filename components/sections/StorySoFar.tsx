"use client";

import { motion, useReducedMotion } from "framer-motion";
import { STORY_SO_FAR } from "@/lib/data";
import { GrowReel } from "@/components/sections/GrowReel";
import { CharacterTag } from "@/components/heroes/CharacterTag";
import { heroById } from "@/lib/characters";
import { asset } from "@/lib/asset";

/** The reel is Thor's — pulled from the shared clip registry. */
const THOR = heroById("thor");
const STORY_CLIP = THOR?.clip ?? "/story/story-reel.mp4";

export function StorySoFar() {
  const reduce = useReducedMotion();

  // Reduced-motion / no-JS-friendly: keep the calm framed panel, no pinning.
  if (reduce) return <StorySoFarStatic />;

  return <StorySoFarCinematic />;
}

/* ------------------------------------------------------------------ */
/* Cinematic: the Thor reel grows from a framed panel to fullscreen,   */
/* recap fades, sound rises — all handled by the shared GrowReel.      */
/* (The ethos quote lives in page.tsx so the connective spine can pass */
/* through it.)                                                        */
/* ------------------------------------------------------------------ */
function StorySoFarCinematic() {
  return (
    <GrowReel id="story" clip={STORY_CLIP} heroId="thor">
      <div className="max-w-xl">
        <span className="eyebrow">Previously On</span>
        <h2 className="titlecard mt-3 text-[clamp(1.9rem,5.5vw,3.6rem)] gold-text">
          The Story So Far
        </h2>

        <div className="mt-6 space-y-4 md:space-y-5">
          {STORY_SO_FAR.map((line, i) => (
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
      </div>
    </GrowReel>
  );
}

/* ------------------------------------------------------------------ */
/* Static fallback (reduced motion): the original framed two-column.    */
/* (Ethos is rendered by page.tsx, after this section.)                 */
/* ------------------------------------------------------------------ */
function StorySoFarStatic() {
  return (
    <section id="story" className="relative mx-auto max-w-shell px-6 py-28 md:py-40">
      <div className="text-center">
        <span className="eyebrow">Previously On</span>
        <h2 className="titlecard mt-3 text-[clamp(2.2rem,7vw,5rem)] gold-text">
          The Story So Far
        </h2>
      </div>

      <div className="mt-14 grid gap-10 md:mt-20 md:grid-cols-2 md:items-center md:gap-14">
        <div className="space-y-8">
          {STORY_SO_FAR.map((line, i) => (
            <div key={i} className="flex gap-5 md:gap-7">
              <span className="font-serif text-2xl leading-none text-gold/60 md:text-3xl">
                0{i + 1}
              </span>
              <p className="text-lg leading-relaxed text-paper-dim md:text-xl">
                {line}
              </p>
            </div>
          ))}
        </div>

        <div className="relative overflow-hidden rounded-2xl border border-gold/40 shadow-[0_0_50px_-14px_rgba(237,29,36,0.5)]">
          <video
            className="aspect-video h-full w-full object-cover"
            src={asset(STORY_CLIP)}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/75 via-transparent to-ink/15"
          />
          <div className="absolute bottom-3 left-4">
            <CharacterTag heroId="thor" />
          </div>
        </div>
      </div>
    </section>
  );
}
