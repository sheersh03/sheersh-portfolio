"use client";

import { useReducedMotion } from "framer-motion";
import { GrowReel } from "@/components/sections/GrowReel";
import { CharacterTag } from "@/components/heroes/CharacterTag";

/**
 * A full-bleed cinematic beat between sections. Like the Story reel, it grows
 * from a small framed panel to fullscreen as you scroll, plays start-to-end
 * with sound while it's the screen you're on, and mutes when you leave. Ties
 * back to the hero who "owns" the clip via `heroId`.
 */
export function CinematicInterlude({
  src,
  eyebrow,
  headline,
  id,
  heroId,
}: {
  src: string;
  eyebrow?: string;
  headline?: string;
  id?: string;
  heroId?: string;
}) {
  const reduce = useReducedMotion();

  const Foreground = (eyebrow || headline) && (
    <div className="mx-auto max-w-3xl text-center">
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      {headline && (
        <h2 className="titlecard mt-3 text-[clamp(2.2rem,7vw,5.5rem)] leading-[0.9] text-paper drop-shadow-[0_4px_30px_rgba(0,0,0,0.8)]">
          {headline}
        </h2>
      )}
    </div>
  );

  // Reduced motion: a calm static full-bleed beat, no pinning/grow.
  if (reduce) {
    return (
      <section
        id={id}
        className="relative flex h-[100svh] items-center justify-center overflow-hidden"
      >
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src={src}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink/80 via-transparent to-ink/85"
        />
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-ink/15" />
        <div className="relative z-10 px-6">
          {Foreground}
          {heroId && (
            <div className="mt-6 flex justify-center">
              <CharacterTag heroId={heroId} />
            </div>
          )}
        </div>
      </section>
    );
  }

  return (
    <GrowReel id={id} clip={src} heroId={heroId}>
      {Foreground}
    </GrowReel>
  );
}
