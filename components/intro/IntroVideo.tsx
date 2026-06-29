"use client";

import { useEffect, useRef } from "react";
import { setEnabled } from "@/lib/sound";
import { asset } from "@/lib/asset";

/**
 * The MARVEL intro clip — rotated landscape (1280×720), full-bleed cover.
 *
 * Audio is ON by default. Browsers block sound-on autoplay until the page has
 * a user gesture, so: we try to play unmuted immediately; if the browser
 * blocks it, we play silently and unmute on the very first interaction
 * (pointer / key / touch) anywhere — no button, no prompt.
 */
export function IntroVideo({
  onEnded,
  onError,
}: {
  onEnded?: () => void;
  onError?: () => void;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;

    v.volume = 0.85;
    v.muted = false;

    void v.play().catch(() => {
      // sound-on autoplay blocked → play silently, unmute on first gesture
      v.muted = true;
      void v.play().catch(() => {});
    });

    const unlock = () => {
      if (v.muted) {
        v.muted = false;
        v.volume = 0.85;
        setEnabled(true);
        void v.play().catch(() => {});
      }
    };
    const opts = { passive: true } as AddEventListenerOptions;
    window.addEventListener("pointerdown", unlock, opts);
    window.addEventListener("keydown", unlock, opts);
    window.addEventListener("touchend", unlock, opts);
    return () => {
      window.removeEventListener("pointerdown", unlock);
      window.removeEventListener("keydown", unlock);
      window.removeEventListener("touchend", unlock);
    };
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-ink">
      <video
        ref={ref}
        className="absolute inset-0 h-full w-full object-cover"
        src={asset("/intro/marvel-intro-landscape.mp4")}
        playsInline
        preload="auto"
        onEnded={onEnded}
        onError={onError}
      />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(8,8,10,0.18) 0%, rgba(8,8,10,0.75) 100%)",
        }}
      />
    </div>
  );
}
