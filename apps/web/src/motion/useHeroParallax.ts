import { useEffect, type RefObject } from 'react';
import { useReducedMotion } from './useReducedMotion';

/**
 * Publishes how far the hero has scrolled (0 at the top, 1 once it has left) as the CSS variable
 * `--parallax` on the element, so the grid and the Core can drift at different rates. It only reads
 * scroll position (tenet 4); the CSS moves things with `translate`, never layout properties. With reduced
 * motion or paused animations the variable is removed and everything sits at its resting position.
 */
export function useHeroParallax(ref: RefObject<HTMLElement | null>): void {
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const element = ref.current;
    if (element === null) return;
    if (reducedMotion) {
      element.style.removeProperty('--parallax');
      return;
    }
    let frame = 0;
    let last = -1;
    const update = () => {
      frame = 0;
      const height = element.parentElement?.getBoundingClientRect().height ?? window.innerHeight;
      const progress = Math.min(1, Math.max(0, window.scrollY / Math.max(height, 1)));
      const rounded = Math.round(progress * 1000) / 1000;
      if (rounded !== last) {
        last = rounded;
        element.style.setProperty('--parallax', String(rounded));
      }
    };
    const onScroll = () => {
      if (frame === 0) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      if (frame !== 0) window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      element.style.removeProperty('--parallax');
    };
  }, [ref, reducedMotion]);
}
