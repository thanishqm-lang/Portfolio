import { useEffect, useRef, type CSSProperties } from 'react';
import { useReducedMotion } from '../motion/useReducedMotion';

/**
 * A paragraph whose words brighten one after another as it scrolls up the screen, so reading
 * keeps pace with scrolling. The words are real text from the first moment (screen readers read the
 * paragraph normally), the default state is fully visible, and with reduced motion nothing changes.
 * It only reads scroll position (tenet 4); only opacity changes (motion-design rules).
 */
export function ScrollWords({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reducedMotion = useReducedMotion();
  const words = text.split(' ');

  useEffect(() => {
    const element = ref.current;
    if (element === null || reducedMotion) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = element.getBoundingClientRect();
      const viewport = window.innerHeight;
      // 0 while the paragraph is still below the lower part of the screen, 1 once it has risen to the upper part.
      const start = viewport * 0.9;
      const end = viewport * 0.35;
      const progress = (start - rect.top) / Math.max(start - end + rect.height * 0.5, 1);
      element.style.setProperty('--p', Math.min(1, Math.max(0, progress)).toFixed(3));
    };
    const onScroll = () => {
      if (frame === 0) frame = window.requestAnimationFrame(update);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      if (frame !== 0) window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      element.style.removeProperty('--p');
    };
  }, [reducedMotion]);

  return (
    <p ref={ref} className="scroll-words" data-live={!reducedMotion}>
      {words.map((word, index) => (
        <span
          key={`${index}-${word}`}
          className="scroll-word"
          style={{ '--i': (index / words.length).toFixed(3) } as CSSProperties}
        >
          {word}
          {index < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </p>
  );
}
