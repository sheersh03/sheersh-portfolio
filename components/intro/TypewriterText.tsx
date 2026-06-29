"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Types text out one character at a time with a blinking caret.
 * Reduced-motion users get the full text immediately.
 */
export function TypewriterText({
  text,
  speed = 65,
  startDelay = 250,
  className,
}: {
  text: string;
  speed?: number;
  startDelay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (reduce) {
      setCount(text.length);
      return;
    }
    setCount(0);
    let i = 0;
    let interval: ReturnType<typeof setInterval> | undefined;
    const start = setTimeout(() => {
      interval = setInterval(() => {
        i += 1;
        setCount(i);
        if (i >= text.length && interval) clearInterval(interval);
      }, speed);
    }, startDelay);
    return () => {
      clearTimeout(start);
      if (interval) clearInterval(interval);
    };
  }, [text, speed, startDelay, reduce]);

  return (
    <span className={className} aria-label={text}>
      <span aria-hidden>{text.slice(0, count)}</span>
      <span aria-hidden className="tw-caret">
        _
      </span>
    </span>
  );
}
