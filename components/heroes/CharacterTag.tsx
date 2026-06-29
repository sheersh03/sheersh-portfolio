"use client";

import { heroById } from "@/lib/characters";
import { Emblem } from "./Emblem";

/**
 * A small character badge that ties a cinematic clip back to the hero who
 * "owns" it — e.g. the Thor reel or the Hulk interlude. Keeps the footage and
 * the engineering-discipline reference connected wherever the clip appears.
 */
export function CharacterTag({
  heroId,
  className = "",
}: {
  heroId: string;
  className?: string;
}) {
  const hero = heroById(heroId);
  if (!hero) return null;

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border bg-ink/55 px-3 py-1.5 backdrop-blur ${className}`}
      style={{ borderColor: `${hero.color}66` }}
    >
      <Emblem
        kind={hero.emblem}
        color={hero.color}
        colorAlt={hero.colorAlt}
        active
        size={18}
      />
      <span
        className="font-impact font-bold text-[0.7rem] uppercase tracking-[0.2em]"
        style={{ color: hero.color }}
      >
        {hero.name}
      </span>
      <span className="text-[0.62rem] uppercase tracking-[0.18em] text-paper-mute">
        {hero.alias}
      </span>
    </span>
  );
}
