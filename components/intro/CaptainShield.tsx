"use client";

/**
 * Original concentric-ring shield (homage, not the trademarked artwork) with a
 * gold play triangle at its center.
 */
export function CaptainShield({ size = 132 }: { size?: number | string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden>
      <defs>
        <radialGradient id="shieldSheen" cx="38%" cy="32%" r="75%">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.22" />
          <stop offset="55%" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="50" cy="50" r="49" fill="#9e1b22" />
      <circle cx="50" cy="50" r="39" fill="#f3efe4" />
      <circle cx="50" cy="50" r="29" fill="#9e1b22" />
      <circle cx="50" cy="50" r="19" fill="#16306b" />

      {/* play triangle */}
      <path
        d="M44.5 39.5 L63 50 L44.5 60.5 Z"
        fill="var(--gold-bright)"
        style={{ filter: "drop-shadow(0 0 4px rgba(233,203,123,0.6))" }}
      />

      {/* gloss */}
      <circle cx="50" cy="50" r="49" fill="url(#shieldSheen)" />
      {/* thin separating rings for crispness */}
      <circle cx="50" cy="50" r="49" fill="none" stroke="rgba(0,0,0,0.25)" strokeWidth="0.6" />
      <circle cx="50" cy="50" r="39" fill="none" stroke="rgba(0,0,0,0.12)" strokeWidth="0.4" />
    </svg>
  );
}
