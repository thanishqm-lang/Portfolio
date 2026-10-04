/** Shared motion values; they mirror the CSS tokens in styles/tokens.css (tenet 7). */
export const DURATION = {
  fast: 0.15,
  base: 0.3,
  slow: 0.6,
} as const;

export const EASE_OUT = [0.22, 1, 0.36, 1] as const;

/** Reveal timing for sections as they enter the screen; mirrors --stagger and is capped at 8 siblings. */
export const REVEAL = {
  staggerMs: 40,
  maxStaggered: 8,
} as const;

/** Timing of the assistant's brief "thinking" pause and its word-by-word answer reveal. */
export const ASSISTANT_MOTION = {
  /** How long the thinking dots show before an answer appears. */
  thinkMs: 450,
  /** Each word's stagger, shortened for long answers so a reveal never exceeds `revealMaxMs`. */
  revealWordMs: 45,
  revealMaxMs: 1800,
} as const;
