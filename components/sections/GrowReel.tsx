"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { CharacterTag } from "@/components/heroes/CharacterTag";
import { isEnabled, subscribe } from "@/lib/sound";
import { asset } from "@/lib/asset";

/** Min fraction of the stage on-screen for the reel to count as "the screen". */
const IN_VIEW_AT = 0.6;

/**
 * A scroll-pinned reel that grows from a small framed panel to fullscreen, with
 * section-visibility audio (enter → play from the top with sound; leave → mute).
 * Shared by every cinematic clip (the Thor reel, the Hulk interlude, …) so they
 * all behave identically. `children` is the foreground content that fades out as
 * the reel takes over; `heroId` renders the owning character's tag, bottom-left.
 */
export function GrowReel({
  clip,
  heroId,
  id,
  children,
}: {
  clip: string;
  heroId?: string;
  id?: string;
  children?: React.ReactNode;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [soundOn, setSoundOn] = useState(false); // global master flag
  const [needGesture, setNeedGesture] = useState(false); // autoplay-with-sound blocked
  const [inView, setInView] = useState(false); // the reel is the on-screen "screen"

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  // Framed panel (right of centre) → fullscreen.
  const scale = useTransform(scrollYProgress, [0.05, 0.58], [0.5, 1]);
  const x = useTransform(scrollYProgress, [0.05, 0.58], ["16%", "0%"]);
  const radius = useTransform(scrollYProgress, [0.05, 0.58], ["24px", "0px"]);
  const frameOpacity = useTransform(scrollYProgress, [0.4, 0.58], [1, 0]);
  const scrim = useTransform(scrollYProgress, [0.05, 0.58], [0.5, 0.12]);

  // Foreground content fades as the reel grows.
  const contentOpacity = useTransform(scrollYProgress, [0, 0.32], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.32], ["0%", "-6%"]);

  // Master sound flag.
  useEffect(() => {
    setSoundOn(isEnabled());
    const unsub = subscribe(setSoundOn);
    return () => {
      unsub();
    };
  }, []);

  // Is the reel the screen the viewer is on? (drives audio start/stop)
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => setInView(e.intersectionRatio >= IN_VIEW_AT),
      { threshold: [0, IN_VIEW_AT, 0.95] }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Audio bound to "am I on this screen", not scroll position:
  //  • enter → play from the top, with sound (if enabled)
  //  • leave → stop the music (mute; the clip keeps looping silent)
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    if (inView) {
      // On screen: play from the top (with sound if enabled).
      v.currentTime = 0;
      v.muted = !soundOn;
      v.volume = 0.7;
      void v.play().then(
        () => setNeedGesture(false),
        () => {
          v.muted = true;
          void v.play().catch(() => {});
          setNeedGesture(soundOn);
        }
      );
    } else {
      // Off screen: pause entirely so only the visible reel decodes (smooth).
      v.pause();
      v.muted = true;
      setNeedGesture(false);
    }
  }, [inView, soundOn]);

  // The tap that satisfies the browser's autoplay-with-sound gesture rule.
  const tapForSound = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = false;
    v.volume = 0.7;
    void v.play().then(() => setNeedGesture(false)).catch(() => {});
  };

  return (
    <section id={id} className="relative">
      {/* Tall scroll track gives the pin its travel distance. */}
      <div ref={trackRef} className="relative h-[260vh]">
        {/* Pinned stage. */}
        <div
          ref={stageRef}
          className="sticky top-0 flex h-screen items-center overflow-hidden"
        >
          {/* The reel — grows from a framed panel to fullscreen. */}
          <motion.div
            className="absolute inset-0 origin-center overflow-hidden will-change-transform"
            style={{ scale, x, borderRadius: radius }}
          >
            <motion.div
              className="pointer-events-none absolute inset-0 z-10 rounded-[inherit] border border-gold/50 shadow-[0_0_70px_-12px_rgba(237,29,36,0.55)]"
              style={{ opacity: frameOpacity }}
            />
            <video
              ref={videoRef}
              className="h-full w-full object-cover"
              src={asset(clip)}
              muted
              loop
              playsInline
              preload="metadata"
            />
            {/* darkening scrim — heavier when framed, clears as it fills */}
            <motion.div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-ink"
              style={{ opacity: scrim }}
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent"
            />
            {heroId && (
              <motion.div
                className="absolute bottom-4 left-5"
                style={{ opacity: frameOpacity }}
              >
                <CharacterTag heroId={heroId} />
              </motion.div>
            )}
          </motion.div>

          {/* Foreground — fades out as the reel grows. */}
          {children && (
            <motion.div
              className="relative z-20 mx-auto w-full max-w-shell px-6"
              style={{ opacity: contentOpacity, y: contentY }}
            >
              {children}
            </motion.div>
          )}

          {/* Sound affordance when the browser blocked autoplay-with-audio. */}
          {inView && soundOn && needGesture && (
            <motion.button
              type="button"
              onClick={tapForSound}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute bottom-8 left-1/2 z-30 -translate-x-1/2 rounded-full border border-gold/50 bg-ink/70 px-5 py-2 text-xs uppercase tracking-[0.25em] text-paper backdrop-blur transition-colors hover:border-gold hover:text-gold"
            >
              ♪ Tap for sound
            </motion.button>
          )}
        </div>
      </div>
    </section>
  );
}
