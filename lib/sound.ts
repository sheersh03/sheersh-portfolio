"use client";

/**
 * Tiny module-singleton sound manager. Master mute flips via setEnabled().
 * playSting() lazily loads /audio/<id>.mp3 and no-ops gracefully if absent,
 * so the site works with zero audio files present.
 */

let enabled = true;
const cache = new Map<string, HTMLAudioElement>();
const listeners = new Set<(on: boolean) => void>();

export function isEnabled() {
  return enabled;
}

export function setEnabled(on: boolean) {
  enabled = on;
  listeners.forEach((l) => l(on));
  if (!on) {
    cache.forEach((a) => {
      try {
        a.pause();
      } catch {
        /* ignore */
      }
    });
  }
}

export function subscribe(fn: (on: boolean) => void) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

function get(id: string) {
  if (typeof Audio === "undefined") return null;
  let a = cache.get(id);
  if (!a) {
    a = new Audio(`/audio/${id}.mp3`);
    a.volume = 0.55;
    cache.set(id, a);
  }
  return a;
}

export function playSting(id: string) {
  if (!enabled) return;
  const a = get(id);
  if (!a) return;
  try {
    a.currentTime = 0;
    void a.play().catch(() => {});
  } catch {
    /* ignore */
  }
}
