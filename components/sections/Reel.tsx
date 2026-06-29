"use client";

import { useReducedMotion } from "framer-motion";
import { GrowReel } from "@/components/sections/GrowReel";
import { ReelRecap } from "@/components/sections/ReelRecap";
import { CharacterTag } from "@/components/heroes/CharacterTag";
import { heroById } from "@/lib/characters";
import { asset } from "@/lib/asset";

/**
 * A full-screen cinematic reel. Pass a `heroId` to pull the clip + reel copy
 * straight from the hero registry (the connected path), or pass explicit
 * `clip`/`eyebrow`/`headline`/`details` for a one-off beat (e.g. the finale).
 * Grows small→big like the Story reel; falls back to a static full-bleed beat
 * under reduced motion.
 */
export function Reel({
  heroId,
  id,
  clip,
  eyebrow,
  headline,
  details,
  tagHeroId,
  scrollCue = true,
}: {
  heroId?: string;
  id?: string;
  clip?: string;
  eyebrow?: string;
  headline?: string;
  details?: string[];
  tagHeroId?: string;
  scrollCue?: boolean;
}) {
  const reduce = useReducedMotion();
  const hero = heroId ? heroById(heroId) : undefined;

  const resolvedClip = clip ?? hero?.clip ?? "";
  const resolvedEyebrow = eyebrow ?? hero?.reel?.eyebrow;
  const resolvedTitle = headline ?? hero?.reel?.headline ?? hero?.name ?? "";
  const resolvedDetails = details ?? hero?.reel?.details;
  const resolvedTag = tagHeroId ?? heroId;
  const resolvedId = id ?? (heroId ? `reel-${heroId}` : undefined);

  const recap = (
    <ReelRecap
      eyebrow={resolvedEyebrow}
      title={resolvedTitle}
      details={resolvedDetails}
      scrollCue={scrollCue}
    />
  );

  // Reduced motion: a calm static full-bleed beat, no pinning/grow.
  if (reduce) {
    return (
      <section
        id={resolvedId}
        className="relative flex min-h-[100svh] items-center overflow-hidden"
      >
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src={asset(resolvedClip)}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-ink via-ink/70 to-ink/30"
        />
        <div className="relative z-10 mx-auto w-full max-w-shell px-6">{recap}</div>
        {resolvedTag && (
          <div className="absolute bottom-4 left-5 z-10">
            <CharacterTag heroId={resolvedTag} />
          </div>
        )}
      </section>
    );
  }

  return (
    <GrowReel id={resolvedId} clip={resolvedClip} heroId={resolvedTag}>
      {recap}
    </GrowReel>
  );
}
