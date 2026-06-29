"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { useEffect, useState, type RefObject } from "react";

/**
 * Arc-reactor-style gold glow that trails the pointer within a target element.
 * Fine-pointer + motion-allowed only; invisible on touch / reduced-motion.
 */
export function CursorGlow({
  targetRef,
}: {
  targetRef: RefObject<HTMLElement | null>;
}) {
  const reduce = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 180, damping: 24, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 180, damping: 24, mass: 0.5 });

  useEffect(() => {
    const fine =
      typeof window !== "undefined" &&
      window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    setEnabled(fine && !reduce);
  }, [reduce]);

  useEffect(() => {
    const el = targetRef.current;
    if (!el || !enabled) return;

    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      x.set(e.clientX - r.left);
      y.set(e.clientY - r.top);
    };
    const enter = () => setVisible(true);
    const leave = () => setVisible(false);

    el.addEventListener("pointermove", move);
    el.addEventListener("pointerenter", enter);
    el.addEventListener("pointerleave", leave);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerenter", enter);
      el.removeEventListener("pointerleave", leave);
    };
  }, [enabled, targetRef, x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute z-0 h-[26rem] w-[26rem] rounded-full mix-blend-screen"
      style={{
        left: sx,
        top: sy,
        x: "-50%",
        y: "-50%",
        background:
          "radial-gradient(circle, rgba(255,75,75,0.22) 0%, rgba(237,29,36,0.12) 35%, transparent 70%)",
      }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.4 }}
    />
  );
}
