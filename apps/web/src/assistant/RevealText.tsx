import { ASSISTANT_MOTION } from '../motion/tokens';

function words(text: string): string[] {
  return text.split(' ').filter((word) => word.length > 0);
}

function perWordMs(count: number): number {
  return Math.min(ASSISTANT_MOTION.revealWordMs, Math.floor(ASSISTANT_MOTION.revealMaxMs / Math.max(count, 1)));
}

/** How long a reveal of this text takes, never more than the cap. */
export function revealDuration(text: string): number {
  const count = words(text).length;
  return Math.min(ASSISTANT_MOTION.revealMaxMs, count * perWordMs(count));
}

/**
 * Shows an answer. The whole text is in the page immediately, so a screen reader reads it once, and
 * the markup never changes shape when the reveal ends (nothing in the live region is rewritten).
 * While `revealing`, each word fades in on its own short delay (opacity and a small move only).
 */
export function RevealText({ text, revealing }: { text: string; revealing: boolean }) {
  const list = words(text);
  const step = perWordMs(list.length);
  return (
    <p>
      {list.map((word, index) => (
        <span key={`${index}-${word}`}>
          <span
            className={revealing ? 'reveal-word reveal-word--animate' : 'reveal-word'}
            style={revealing ? { animationDelay: `${index * step}ms` } : undefined}
          >
            {word}
          </span>{' '}
        </span>
      ))}
    </p>
  );
}
