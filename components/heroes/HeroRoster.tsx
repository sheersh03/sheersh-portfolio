"use client";

import { useState } from "react";
import { HEROES } from "@/lib/characters";
import { HeroCard } from "./HeroCard";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

export function HeroRoster() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <section
      id="assemble"
      className="relative mx-auto max-w-shell px-6 py-28 md:py-36"
    >
      <RevealOnScroll className="text-center">
        <span className="eyebrow">Assemble the Team</span>
        <h2 className="titlecard mt-3 text-[clamp(2.2rem,8vw,6rem)]">
          <span className="gold-text">The Roster</span>
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-paper-dim">
          Every engineer is really a team of specialists. Power up a hero to
          see the side of the craft they stand for.
        </p>
      </RevealOnScroll>

      <div className="mt-14 grid grid-cols-1 items-start gap-5 sm:grid-cols-2 lg:grid-cols-5">
        {HEROES.map((hero, i) => (
          <RevealOnScroll key={hero.id} delay={i * 0.06} as="div" className="h-full">
            <HeroCard
              hero={hero}
              active={active === hero.id}
              onToggle={() =>
                setActive((cur) => (cur === hero.id ? null : hero.id))
              }
            />
          </RevealOnScroll>
        ))}
      </div>
    </section>
  );
}
