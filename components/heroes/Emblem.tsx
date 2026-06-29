"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { EmblemKey } from "@/lib/characters";

/**
 * Original, hand-built SVG emblems — one per hero. No official artwork.
 * Each animates when `active` (powered up).
 */
export function Emblem({
  kind,
  color,
  colorAlt,
  active,
  size = 88,
}: {
  kind: EmblemKey;
  color: string;
  colorAlt: string;
  active: boolean;
  size?: number;
}) {
  const reduce = useReducedMotion();
  const a = active && !reduce;

  const common = {
    width: size,
    height: size,
    viewBox: "0 0 100 100",
    fill: "none",
    style: { overflow: "visible" as const },
  };

  if (kind === "reactor") {
    return (
      <svg {...common} aria-hidden>
        <motion.circle
          cx="50" cy="50" r="34"
          stroke={color} strokeWidth="3"
          animate={a ? { rotate: 360 } : { rotate: 0 }}
          transition={a ? { duration: 8, repeat: Infinity, ease: "linear" } : {}}
          style={{ transformOrigin: "50% 50%" }}
        />
        {[...Array(8)].map((_, i) => (
          <line
            key={i}
            x1="50" y1="22" x2="50" y2="34"
            stroke={colorAlt} strokeWidth="3" strokeLinecap="round"
            transform={`rotate(${i * 45} 50 50)`}
            opacity={a ? 0.9 : 0.5}
          />
        ))}
        <motion.circle
          cx="50" cy="50" r="16"
          fill={colorAlt}
          animate={a ? { scale: [1, 1.18, 1], opacity: [0.85, 1, 0.85] } : { scale: 1, opacity: 0.7 }}
          transition={a ? { duration: 1.6, repeat: Infinity } : {}}
          style={{ transformOrigin: "50% 50%", filter: `drop-shadow(0 0 10px ${colorAlt})` }}
        />
        <circle cx="50" cy="50" r="8" fill="#fff" opacity={a ? 0.95 : 0.6} />
      </svg>
    );
  }

  if (kind === "web") {
    return (
      <svg {...common} aria-hidden>
        {[...Array(8)].map((_, i) => (
          <line
            key={i}
            x1="50" y1="50" x2="50" y2="8"
            stroke={colorAlt} strokeWidth="2" strokeLinecap="round"
            transform={`rotate(${i * 45} 50 50)`}
            opacity={a ? 0.8 : 0.4}
          />
        ))}
        {[16, 26, 36].map((r, i) => (
          <motion.circle
            key={r}
            cx="50" cy="50" r={r}
            stroke={color} strokeWidth="2" fill="none"
            initial={false}
            animate={a ? { pathLength: [0, 1], opacity: 0.9 } : { pathLength: 1, opacity: 0.45 }}
            transition={a ? { duration: 0.5, delay: i * 0.12 } : {}}
          />
        ))}
        <circle cx="50" cy="50" r="5" fill={color} />
      </svg>
    );
  }

  if (kind === "smash") {
    return (
      <svg {...common} aria-hidden>
        <motion.g
          animate={a ? { scale: [1, 1.12, 1] } : { scale: 1 }}
          transition={a ? { duration: 0.5, repeat: Infinity, repeatDelay: 0.6 } : {}}
          style={{ transformOrigin: "50% 50%" }}
        >
          <polygon
            points="50,8 60,38 92,40 64,58 74,90 50,68 26,90 36,58 8,40 40,38"
            fill={color} opacity={a ? 0.95 : 0.6}
            style={a ? { filter: `drop-shadow(0 0 12px ${color})` } : undefined}
          />
          <polygon points="50,28 56,46 74,47 58,58 64,78 50,64 36,78 42,58 26,47 44,46" fill={colorAlt} opacity="0.9" />
        </motion.g>
      </svg>
    );
  }

  if (kind === "bolt") {
    return (
      <svg {...common} aria-hidden>
        <motion.path
          d="M58 8 L30 54 L48 54 L42 92 L74 42 L54 42 Z"
          fill={color} stroke={colorAlt} strokeWidth="2" strokeLinejoin="round"
          animate={a ? { opacity: [1, 0.4, 1], scale: [1, 1.06, 1] } : { opacity: 0.7, scale: 1 }}
          transition={a ? { duration: 0.35, repeat: Infinity, repeatDelay: 0.5 } : {}}
          style={{ transformOrigin: "50% 50%", filter: a ? `drop-shadow(0 0 14px ${color})` : undefined }}
        />
      </svg>
    );
  }

  // horns (Loki)
  return (
    <svg {...common} aria-hidden>
      <motion.g
        animate={a ? { rotate: [0, -3, 3, 0] } : { rotate: 0 }}
        transition={a ? { duration: 2.4, repeat: Infinity } : {}}
        style={{ transformOrigin: "50% 60%" }}
      >
        <path
          d="M50 88 C40 70 38 56 40 44 C30 40 22 28 24 12 C40 18 48 30 50 42 C52 30 60 18 76 12 C78 28 70 40 60 44 C62 56 60 70 50 88 Z"
          fill={color} stroke={colorAlt} strokeWidth="2.5" strokeLinejoin="round"
          opacity={a ? 0.95 : 0.6}
          style={a ? { filter: `drop-shadow(0 0 10px ${colorAlt})` } : undefined}
        />
        <circle cx="50" cy="54" r="6" fill={colorAlt} opacity={a ? 1 : 0.6} />
      </motion.g>
    </svg>
  );
}
