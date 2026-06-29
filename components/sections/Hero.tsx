"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect, useRef } from "react";
import { PERSON } from "@/lib/data";
import { GoldText } from "@/components/ui/GoldText";
import { CursorGlow } from "@/components/effects/CursorGlow";
import { asset } from "@/lib/asset";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // pointer tilt on the name
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 150, damping: 18 });
  const sry = useSpring(ry, { stiffness: 150, damping: 18 });

  useEffect(() => {
    const el = ref.current;
    if (!el || reduce) return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!fine) return;
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const nx = (e.clientX - r.left) / r.width - 0.5;
      const ny = (e.clientY - r.top) / r.height - 0.5;
      ry.set(nx * 10);
      rx.set(-ny * 10);
    };
    const reset = () => {
      rx.set(0);
      ry.set(0);
    };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", reset);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", reset);
    };
  }, [reduce, rx, ry]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-6"
    >
      <CursorGlow targetRef={ref} />

      {/* Left cinematic accent — the reveal, emerging from the dark beside the name */}
      <motion.div
        aria-hidden
        style={reduce ? undefined : { y, opacity }}
        className="pointer-events-none absolute inset-y-0 left-0 z-0 hidden w-[clamp(240px,28vw,440px)] md:block"
      >
        <motion.div
          className="relative h-full w-full"
          initial={reduce ? false : { opacity: 0, x: -48 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.3, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          <video
            className="h-full w-full object-cover opacity-[0.82]"
            src={asset("/hero/doom-reveal.mp4")}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          />
          {/* melt the inner (right) edge + top/bottom into the page */}
          <div className="absolute inset-0 bg-gradient-to-r from-ink/0 via-ink/25 to-ink" />
          <div className="absolute inset-0 bg-gradient-to-b from-ink via-transparent to-ink" />
          {/* faint red wash to bind it to the palette */}
          <div className="absolute inset-0 bg-gold/10 mix-blend-overlay" />
        </motion.div>
      </motion.div>

      {/* gold glow backdrop */}
      <motion.div
        aria-hidden
        style={reduce ? undefined : { y }}
        className="pointer-events-none absolute inset-0"
      >
        <div
          className="absolute left-1/2 top-1/2 h-[120vmin] w-[120vmin] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.18] blur-3xl"
          style={{
            background:
              "radial-gradient(circle, var(--gold) 0%, transparent 60%)",
          }}
        />
      </motion.div>

      <motion.div
        style={reduce ? undefined : { opacity }}
        className="relative z-10 flex flex-col items-center text-center"
      >
        <motion.span
          className="eyebrow"
          initial={reduce ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          The Cinematic Portfolio of
        </motion.span>

        <motion.h1
          className="titlecard mt-4 text-[clamp(3.4rem,16vw,13rem)] leading-[0.82]"
          style={
            reduce
              ? undefined
              : { rotateX: srx, rotateY: sry, transformPerspective: 900 }
          }
          initial={reduce ? false : { opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="block">{PERSON.firstName}</span>
          <GoldText className="block">{PERSON.lastName}</GoldText>
        </motion.h1>

        <motion.p
          className="mt-7 max-w-2xl font-impact font-bold uppercase tracking-[0.07em] text-lg text-gold-bright/90 md:text-2xl"
          initial={reduce ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          &ldquo;{PERSON.tagline}&rdquo;
        </motion.p>

      </motion.div>

      {/* scroll cue */}
      <motion.div
        aria-hidden
        className="absolute bottom-8 right-8 text-paper-mute md:bottom-10 md:right-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 1 }}
      >
        <motion.div
          className="flex flex-col items-center gap-2"
          animate={reduce ? undefined : { y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="font-impact font-bold text-[0.72rem] uppercase tracking-[0.4em]">
            Let&rsquo;s Begin the Action
          </span>
          <span className="text-lg text-gold">↓</span>
        </motion.div>
      </motion.div>
    </section>
  );
}
