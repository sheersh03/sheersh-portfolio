"use client";

import { useState } from "react";
import { MarvelIntro } from "@/components/intro/MarvelIntro";
import { TopBar } from "@/components/TopBar";
import { Hero } from "@/components/sections/Hero";
import { StorySoFar } from "@/components/sections/StorySoFar";
import { Phase } from "@/components/sections/Phase";
import { Reel } from "@/components/sections/Reel";
import { Skills } from "@/components/sections/Skills";
import { Contact } from "@/components/sections/Contact";
import { InfinityStones } from "@/components/effects/InfinityStones";
import { KonamiEasterEgg } from "@/components/effects/KonamiEasterEgg";
import { SpineSection } from "@/components/effects/ConnectiveSpine";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { PERSON, PHASES } from "@/lib/data";

export default function Home() {
  const [introDone, setIntroDone] = useState(false);

  return (
    <>
      <MarvelIntro onDone={() => setIntroDone(true)} />
      <TopBar show={introDone} />
      <InfinityStones show={introDone} />
      <KonamiEasterEgg />

      <main id="top">
        <Hero />

        {/* Reel 1 — Thor: the origin recap. */}
        <StorySoFar />

        {/* Thor → Hulk: ethos + Phase One, threaded on the spine rail. */}
        <SpineSection>
          <RevealOnScroll
            delay={0.1}
            className="mx-auto max-w-2xl px-6 py-20 text-center"
          >
            <p className="font-serif text-lg italic text-paper md:text-xl">
              {PERSON.ethos}
            </p>
          </RevealOnScroll>
          <Phase phase={PHASES[0]} />
        </SpineSection>

        {/* Reel 2 — Spider-Man: frontend / UX. */}
        <Reel heroId="spiderman" />

        {/* Hulk → Spider-Man: Phase Two on the rail. */}
        <SpineSection>
          <Phase phase={PHASES[1]} />
        </SpineSection>

        {/* Reel 3 — Thor vs Hulk: the arena. */}
        <Reel
          id="reel-arena"
          clip="/reels/thor-arena.mp4"
          eyebrow="Interlude"
          headline="Find the thunder."
          details={[
            "The best systems reveal themselves under pressure, when the load spikes and the arena gets loud.",
            "Stay calm in the fight: health checks, runbooks, and a rollback plan ready before it's needed.",
            "Power isn't the hammer. It's knowing the system holds when it counts.",
          ]}
        />

        {/* Spider-Man → Iron Man: Phase Three on the rail. */}
        <SpineSection>
          <Phase phase={PHASES[2]} />
        </SpineSection>

        {/* Reel 4 — Avengers assemble: a team beat. */}
        <Reel
          id="reel-assemble"
          clip="/reels/assemble.mp4"
          eyebrow="Assemble"
          headline="One engineer. A whole team."
          details={[
            "Architecture, backend, frontend, infra, and the AI layer: every discipline, one builder.",
            "The hard problems need the whole kit assembled at once.",
            "Wear every hat, and still ship.",
          ]}
        />

        {/* Iron Man → finale: the arsenal on the rail. */}
        <SpineSection>
          <Skills />
        </SpineSection>

        {/* Reel 5 — Iron Man: the architect (Tony & Peter). */}
        <Reel
          heroId="ironman"
          clip="/reels/ironman-mentor.mp4"
          scrollCue={false}
        />

        <Contact />
      </main>
    </>
  );
}
