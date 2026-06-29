"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { IntroVideo } from "./IntroVideo";
import { WhatIfTitle } from "./WhatIfTitle";
import { CaptainShield } from "./CaptainShield";
import { CapOutline, SHIELD } from "./CapOutline";
import { TypewriterText } from "./TypewriterText";
import { ThoughtBubble } from "./ThoughtBubble";
import { setEnabled } from "@/lib/sound";

const SESSION_KEY = "sheersh_intro_played";

type Phase = "cover" | "gate" | "whatif" | "video" | "out" | "gone";

export function MarvelIntro({ onDone }: { onDone?: () => void }) {
  const [phase, setPhase] = useState<Phase>("cover");
  const reduce = useReducedMotion();

  const finish = useCallback(() => {
    try {
      sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      /* ignore */
    }
    setPhase("out");
  }, []);

  // user's tap to begin — grants the gesture the browser needs for audio
  const begin = useCallback(() => {
    setEnabled(true);
    setPhase("whatif");
  }, []);

  useEffect(() => {
    let played = false;
    try {
      played = sessionStorage.getItem(SESSION_KEY) === "1";
    } catch {
      /* ignore */
    }
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const isDev = process.env.NODE_ENV !== "production";

    if (reduce || (played && !isDev)) {
      try {
        sessionStorage.setItem(SESSION_KEY, "1");
      } catch {
        /* ignore */
      }
      setPhase("out");
    } else {
      setPhase("gate");
    }
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && phase !== "out" && phase !== "gone") {
        finish();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [phase, finish]);

  // lock scroll while the intro covers the page
  useEffect(() => {
    if (phase === "gone") return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [phase]);

  if (phase === "gone") return null;

  return (
    <AnimatePresence
      onExitComplete={() => {
        setPhase("gone");
        onDone?.();
      }}
    >
      {phase !== "out" && (
        <motion.div
          key="intro"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
        >
          {/* MARVEL clip — plays clean, end to end, with sound */}
          {phase === "video" && (
            <IntroVideo onEnded={finish} onError={finish} />
          )}

          {/* vignette on the non-video beats */}
          {(phase === "gate" || phase === "whatif") && (
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse at center, transparent 35%, rgba(0,0,0,0.9) 100%)",
              }}
            />
          )}

          {/* tap-to-begin gate — the gesture that unlocks audio */}
          {phase === "gate" && (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-5 px-6 py-12">
              <ThoughtBubble>
                Hi, this is Captain America &mdash;{" "}
                <span className="text-gold-bright">
                  without super soldier serum
                </span>{" "}
                😂
              </ThoughtBubble>

              <div className="relative w-[clamp(190px,30vh,320px)]">
                <CapOutline className="h-auto w-full" />

                {/* shield play-button — the ONLY clickable thing on the gate */}
                <motion.button
                  type="button"
                  onClick={begin}
                  aria-label="Begin the intro with sound"
                  className="absolute grid aspect-square -translate-x-1/2 -translate-y-1/2 cursor-pointer place-items-center rounded-full"
                  style={{ left: SHIELD.cx, top: SHIELD.cy, width: SHIELD.d }}
                  animate={
                    reduce
                      ? undefined
                      : {
                          boxShadow: [
                            "0 0 0 0 rgba(237,29,36,0.35)",
                            "0 0 0 22px rgba(237,29,36,0)",
                          ],
                        }
                  }
                  transition={{ duration: 1.9, repeat: Infinity, ease: "easeOut" }}
                >
                  <span className="block w-full transition-transform duration-300 hover:scale-105">
                    <CaptainShield size="100%" />
                  </span>
                </motion.button>

                {/* hand-drawn "click me" nudge, pointing at the shield */}
                <motion.div
                  aria-hidden
                  className="absolute left-full top-[34%] ml-1 flex -translate-y-1/2 items-center gap-1"
                  animate={reduce ? undefined : { x: [0, -7, 0] }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <svg width="54" height="38" viewBox="0 0 54 38" fill="none" className="rotate-12">
                    <path
                      d="M50 6 C36 4 14 8 8 27"
                      stroke="var(--gold-bright)"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M8 27 L18 25 M8 27 L13 34"
                      stroke="var(--gold-bright)"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                  </svg>
                  <span className="-rotate-3 whitespace-nowrap font-serif text-sm italic text-gold-bright">
                    Click me!
                  </span>
                </motion.div>
              </div>
              <TypewriterText
                text="Ready to relive something?"
                className="marvel-title text-4xl text-paper md:text-6xl"
              />
              <span className="marvel-title max-w-lg px-6 text-center text-base tracking-[0.08em] text-paper-dim md:text-lg">
                First time? Believe me &mdash; you&apos;re not ready for
                this&hellip;
              </span>
            </div>
          )}

          {phase === "whatif" && (
            <WhatIfTitle onComplete={() => setPhase("video")} />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
