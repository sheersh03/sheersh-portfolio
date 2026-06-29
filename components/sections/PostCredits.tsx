"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { CREDITS, SOCIALS } from "@/lib/data";
import { asset } from "@/lib/asset";

type Phase = "idle" | "rolling" | "end";

/**
 * MCU-style post-credits sequence: a "Roll the credits" button opens a
 * fullscreen film-credits crawl (Avengers theme reprising), then lands on the
 * signature "… WILL RETURN" card with a contact CTA.
 */
export function PostCredits() {
  const reduce = useReducedMotion();
  const [phase, setPhase] = useState<Phase>("idle");
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const open = () => setPhase(reduce ? "end" : "rolling");
  const close = () => setPhase("idle");

  // Music + scroll-lock + Esc while the sequence is open. Plays from the button
  // tap (the audio gesture) through the crawl and the end card; fades on close.
  useEffect(() => {
    if (phase === "idle") return;
    const a = new Audio(asset("/audio/avengers.mp3"));
    a.loop = true;
    a.volume = 0.7;
    audioRef.current = a;
    void a.play().catch(() => {});

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      const fade = setInterval(() => {
        if (a.volume > 0.08) a.volume -= 0.08;
        else {
          clearInterval(fade);
          a.pause();
        }
      }, 45);
      audioRef.current = null;
    };
    // Re-run only when crossing the idle boundary, so music continues
    // uninterrupted from "rolling" into "end".
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase === "idle"]);

  return (
    <>
      <button
        type="button"
        onClick={open}
        className="group mx-auto mt-16 inline-flex items-center gap-3 rounded-full border border-gold/50 bg-gold/5 px-6 py-3 font-impact font-bold text-sm uppercase tracking-[0.22em] text-paper transition-all hover:border-gold hover:bg-gold hover:text-ink"
      >
        <span className="text-gold transition-colors group-hover:text-ink">▶</span>
        Roll the credits
      </button>

      <AnimatePresence>
        {phase !== "idle" && (
          <motion.div
            key="credits"
            className="fixed inset-0 z-[120] overflow-hidden bg-ink"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* ---- the crawl ---- */}
            {phase === "rolling" && (
              <>
                <div
                  className="absolute inset-x-0 mx-auto flex max-w-2xl flex-col items-center gap-12 px-6 text-center"
                  style={{ animation: "credits-roll 22s linear forwards" }}
                  onAnimationEnd={() => setPhase("end")}
                >
                  <p className="eyebrow !text-[0.7rem]">Marvel-grade engineering presents</p>
                  <h2 className="titlecard text-[clamp(1.6rem,5vw,3rem)] gold-text">
                    A Sheersh Atrishi Production
                  </h2>

                  <div className="flex flex-col gap-5">
                    {CREDITS.map((c) => (
                      <div key={c.role}>
                        <div className="font-serif text-[0.62rem] uppercase tracking-[0.3em] text-paper-mute">
                          {c.role}
                        </div>
                        <div className="titlecard mt-1 text-xl text-paper md:text-2xl">
                          {c.name}
                        </div>
                      </div>
                    ))}
                  </div>

                  <CreditBlock label="Filmed on location at">
                    Audena · Cavebeat · the origin builds
                  </CreditBlock>
                  <CreditBlock label="Built with">
                    Next.js · React · Framer Motion · Tailwind · TypeScript
                  </CreditBlock>
                  <CreditBlock label="Special thanks">
                    The open-source community, far too much coffee, and a certain
                    Studio for the inspiration.
                  </CreditBlock>

                  <p className="max-w-md font-serif text-sm italic text-paper-dim">
                    No em-dashes were harmed in the making of this portfolio.
                  </p>

                  {/* mid-credits stinger */}
                  <div className="mt-4 rounded-2xl border border-gold/30 bg-panel/40 px-6 py-5">
                    <div className="eyebrow !text-[0.6rem]">Mid-credits</div>
                    <p className="mt-2 font-serif text-base italic text-paper md:text-lg">
                      Wondering what he builds next? So is he.
                    </p>
                  </div>
                </div>

                {/* top/bottom fades for the film look */}
                <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-ink to-transparent" />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-ink to-transparent" />

                <button
                  type="button"
                  onClick={() => setPhase("end")}
                  className="absolute bottom-6 right-6 rounded-full border border-line px-4 py-1.5 text-[0.62rem] uppercase tracking-[0.22em] text-paper-mute transition-colors hover:border-gold hover:text-gold"
                >
                  Skip ⏭
                </button>
              </>
            )}

            {/* ---- post-credits stinger ---- */}
            {phase === "end" && (
              <motion.div
                className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
                initial={{ opacity: 0, scale: reduce ? 1 : 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="eyebrow">Post-credits</span>
                <h2 className="titlecard mt-4 text-[clamp(2rem,7vw,5rem)] leading-[0.9]">
                  <span className="gold-text">Sheersh Atrishi</span>
                  <span className="block text-paper">will return</span>
                </h2>
                <p className="mx-auto mt-6 max-w-md font-serif text-base italic text-paper-dim md:text-lg">
                  …but you don&apos;t have to wait for the sequel. Let&apos;s talk.
                </p>

                <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
                  {SOCIALS.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target={s.href.startsWith("http") ? "_blank" : undefined}
                      rel={s.href.startsWith("http") ? "noreferrer" : undefined}
                      className="rounded-full border border-gold/50 px-5 py-2 font-impact font-bold text-xs uppercase tracking-[0.18em] text-paper transition-all hover:border-gold hover:bg-gold hover:text-ink"
                    >
                      {s.label}
                    </a>
                  ))}
                </div>

                <div className="mt-10 flex items-center gap-5 text-[0.62rem] uppercase tracking-[0.24em] text-paper-mute">
                  <button
                    type="button"
                    onClick={() => {
                      close();
                      window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
                    }}
                    className="transition-colors hover:text-gold"
                  >
                    ↑ Back to top
                  </button>
                  <span className="text-line">·</span>
                  <button
                    type="button"
                    onClick={close}
                    className="transition-colors hover:text-gold"
                  >
                    Close
                  </button>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function CreditBlock({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-md">
      <div className="font-serif text-[0.62rem] uppercase tracking-[0.3em] text-gold">
        {label}
      </div>
      <p className="mt-2 text-sm leading-relaxed text-paper-dim md:text-base">
        {children}
      </p>
    </div>
  );
}
