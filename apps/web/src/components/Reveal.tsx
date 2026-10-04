import { useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';
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
 * content that is already on screen, or any content when motion is reduced or paused, is simply shown.
 * Only content below the fold gets a start state, and the observer removes it, so nothing can stay
 * hidden. Only opacity and transform change (motion-design rules).
 */
export function Reveal({ children, index = 0, className }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const [phase, setPhase] = useState<Phase>('static');

  useLayoutEffect(() => {
    const element = ref.current;
    if (element === null || reducedMotion) {
      setPhase('static');
      return;
    }
    // Already on screen (or above it): show it as it is; there is nothing to reveal.
    if (element.getBoundingClientRect().top < window.innerHeight * 0.92) {
      setPhase('static');
      return;
    }
    setPhase('hidden');
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting === true) {
          setPhase('in');
          observer.disconnect();
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
