"use client";

/**
 * Original, stylized line-art (wireframe) of a heroic figure in a power stance,
 * one arm extended to hold a round shield. Stroke-only homage — NOT a copy of
 * the real Captain America suit/likeness. The shield position is left empty so
 * the interactive shield play-button overlays it (see SHIELD below).
 */
export const SHIELD = { cx: "71%", cy: "49%", d: "44%" };

export function CapOutline({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 300 400"
      fill="none"
      className={className}
      aria-hidden
      stroke="var(--gold)"
      strokeWidth={3}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ opacity: 0.5 }}
    >
      {/* head + cowl line */}
      <circle cx="120" cy="58" r="20" />
      <path d="M103 53 q17 -15 34 0" opacity="0.55" />
      <path d="M120 50 l0 8" opacity="0.5" />

      {/* neck */}
      <path d="M112 76 l-3 13 M128 76 l3 13" />

      {/* torso (athletic V) */}
      <path d="M97 95 C92 130 100 174 109 210 L141 210 C150 174 158 130 153 95" />
      <path d="M97 95 q23 -11 56 0" />
      {/* chest + belt accents */}
      <path d="M118 100 l0 96" opacity="0.4" />
      <path d="M107 204 l38 0" />

      {/* left arm (at side, fist by hip) */}
      <path d="M99 99 C84 128 82 163 92 198" />
      <circle cx="93" cy="203" r="5" />

      {/* right arm extended outward to the shield */}
      <path d="M151 99 C176 116 194 144 206 174" />
      <circle cx="208" cy="180" r="6" />

      {/* legs (power stance) */}
      <path d="M111 210 C105 258 101 300 97 354" />
      <path d="M139 210 C146 256 152 300 157 358" />
      {/* boots */}
      <path d="M97 354 l-15 7 M157 358 l17 7" />
      <path d="M82 361 l16 2 M174 365 l-17 1" opacity="0.6" />
    </svg>
  );
}
