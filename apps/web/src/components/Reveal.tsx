import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import { REVEAL } from '../motion/tokens';
import { useReducedMotion } from '../motion/useReducedMotion';

type Phase = 'static' | 'hidden' | 'in';

interface RevealProps {
  children: ReactNode;
  /** Position among siblings, so a row of cards staggers instead of appearing together. */
  index?: number;
  className?: string;
}

/**
 * Fades and lifts its content in once, when it scrolls into view. The default is the finished state:
 * content that is on screen at load, or any content when motion is reduced, is simply shown.
 * Only content that the observer reports as below the screen gets a start state, and the same observer
 * removes it, so nothing can stay hidden. It never measures the page itself (no forced layout), which
 * keeps startup cheap. Only opacity and transform change (motion-design rules).
 */
export function Reveal({ children, index = 0, className }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const [phase, setPhase] = useState<Phase>('static');

  useEffect(() => {
    const element = ref.current;
    if (element === null || reducedMotion) {
      setPhase('static');
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            // Seen: reveal it if it was waiting; content already on screen at load stays as it is.
            setPhase((current) => (current === 'hidden' ? 'in' : current));
          } else if (
            entry.boundingClientRect.top > (entry.rootBounds?.height ?? window.innerHeight) ||
            // A section the browser has not laid out yet (far below the screen) reports an empty box.
            entry.boundingClientRect.height === 0
          ) {
            // Below the screen and not yet revealed: give it its start state.
            setPhase((current) => (current === 'static' ? 'hidden' : current));
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px' },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [reducedMotion]);

  const classes = ['reveal', phase === 'hidden' ? 'reveal--hidden' : '', phase === 'in' ? 'reveal--in' : '', className ?? '']
    .filter(Boolean)
    .join(' ');
  const style: CSSProperties | undefined =
    phase === 'in'
      ? { transitionDelay: `${Math.min(index, REVEAL.maxStaggered - 1) * REVEAL.staggerMs}ms` }
      : undefined;

  return (
    <div ref={ref} className={classes} style={style}>
      {children}
    </div>
  );
}
