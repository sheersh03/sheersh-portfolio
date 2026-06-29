"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { isEnabled, setEnabled, subscribe } from "@/lib/sound";

/**
 * Master sound control. Toggles the shared sound manager (so per-hero stings
 * respect it) and plays an ambient orchestral loop. No-ops gracefully if the
 * audio file is absent (placeholder until a royalty-free track is dropped at
 * /public/audio/intro-sting.mp3).
 */
export function SoundToggle({ className }: { className?: string }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [on, setOn] = useState(isEnabled);

  useEffect(() => {
    const a = new Audio("/audio/intro-sting.mp3");
    a.loop = true;
    a.volume = 0.4;
    audioRef.current = a;
    const unsub = subscribe(setOn);
    return () => {
      a.pause();
      audioRef.current = null;
      unsub();
    };
  }, []);

  const toggle = async () => {
    const next = !on;
    setEnabled(next);
    const a = audioRef.current;
    if (a) {
      try {
        if (next) await a.play();
        else a.pause();
      } catch {
        /* file may be absent — sound manager still tracks the flag */
      }
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={on ? "Mute soundtrack" : "Play soundtrack"}
      aria-pressed={on}
      title="Soundtrack"
      className={cn(
        "group flex items-center gap-2 rounded-full border border-line-strong bg-ink/60 px-3.5 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-paper-dim backdrop-blur transition-colors hover:border-gold/50 hover:text-gold",
        className
      )}
    >
      <span className="flex h-3 items-end gap-[2px]" aria-hidden>
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className={cn(
              "w-[2px] rounded-full bg-current transition-all duration-300",
              on ? "animate-pulse" : ""
            )}
            style={{
              height: on ? `${[10, 6, 12][i]}px` : "4px",
              animationDelay: `${i * 120}ms`,
            }}
          />
        ))}
      </span>
      {on ? "Sound off" : "Sound on"}
    </button>
  );
}
