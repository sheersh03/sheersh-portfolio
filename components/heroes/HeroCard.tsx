"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { Hero } from "@/lib/characters";
import { Emblem } from "./Emblem";
import { playSting } from "@/lib/sound";

export function HeroCard({
  hero,
  active,
  onToggle,
}: {
  hero: Hero;
  active: boolean;
  onToggle: () => void;
}) {
  const reduce = useReducedMotion();

  const handle = () => {
    if (!active) playSting(hero.id);
    onToggle();
  };

  return (
    <motion.button
      type="button"
      onClick={handle}
      aria-pressed={active}
      aria-label={`${hero.name} — ${hero.domain}`}
      layout={!reduce}
      whileHover={reduce ? undefined : { y: -4 }}
      className="group relative flex flex-col items-center overflow-hidden rounded-2xl border bg-panel/50 p-6 text-center backdrop-blur-sm transition-colors"
      style={{
        borderColor: active ? hero.color : "var(--line)",
        boxShadow: active
          ? `0 0 0 1px ${hero.color}, 0 18px 50px -20px ${hero.color}`
          : "none",
        ["--c" as string]: hero.color,
        ["--c2" as string]: hero.colorAlt,
      }}
    >
      {/* color wash on hover/active */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          opacity: active ? 0.16 : undefined,
          background: `radial-gradient(circle at 50% 30%, ${hero.color}, transparent 70%)`,
        }}
      />

      <div className="relative z-10 flex flex-col items-center">
        <div
          className="transition-all duration-500"
          style={{
            filter: active
              ? "none"
              : "grayscale(0.7) brightness(0.85)",
            opacity: active ? 1 : 0.85,
          }}
        >
          <Emblem
            kind={hero.emblem}
            color={hero.color}
            colorAlt={hero.colorAlt}
            active={active}
          />
        </div>

        <span
          className="mt-3 font-serif text-[0.58rem] uppercase tracking-[0.28em]"
          style={{ color: hero.color }}
        >
          {hero.alias}
        </span>
        <h3 className="titlecard mt-1 text-2xl leading-none text-paper md:text-3xl">
          {hero.name}
        </h3>
        <p className="mt-2 text-[0.72rem] uppercase tracking-[0.14em] text-paper-mute">
          {hero.domain}
        </p>
      </div>

      <AnimatePresence initial={false}>
        {active && (
          <motion.div
            key="body"
            initial={reduce ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={reduce ? undefined : { height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 w-full overflow-hidden"
          >
            <div className="mt-5 border-t border-line pt-5 text-left">
              {hero.clip && (
                <div
                  className="relative mb-4 overflow-hidden rounded-xl border"
                  style={{ borderColor: `${hero.color}55` }}
                >
                  <video
                    className="aspect-video h-full w-full object-cover"
                    src={hero.clip}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                  />
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0"
                    style={{
                      background: `linear-gradient(to top, var(--ink), transparent 55%), radial-gradient(circle at 50% 120%, ${hero.color}33, transparent 60%)`,
                    }}
                  />
                  <span
                    className="absolute bottom-2 left-3 font-impact font-bold text-[0.6rem] uppercase tracking-[0.22em]"
                    style={{ color: hero.color }}
                  >
                    {hero.name} · Reel
                  </span>
                </div>
              )}
              <p className="font-serif text-sm italic" style={{ color: hero.colorAlt }}>
                &ldquo;{hero.quote}&rdquo;
              </p>
              <ul className="mt-4 flex flex-wrap gap-1.5">
                {hero.abilities.map((ab) => (
                  <li
                    key={ab}
                    className="rounded-md border px-2 py-1 text-[0.66rem] text-paper-dim"
                    style={{ borderColor: `${hero.color}55` }}
                  >
                    {ab}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-[0.66rem] uppercase tracking-[0.18em] text-paper-mute">
                Featured in
                <span className="ml-2 font-semibold" style={{ color: hero.color }}>
                  {hero.projectLabel}
                </span>
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!active && (
        <span className="relative z-10 mt-4 text-[0.6rem] uppercase tracking-[0.22em] text-paper-mute transition-colors group-hover:text-[color:var(--c)]">
          Tap to power up
        </span>
      )}
    </motion.button>
  );
}
