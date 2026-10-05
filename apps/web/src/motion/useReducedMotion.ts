import { useSyncExternalStore } from 'react';

const QUERY = '(prefers-reduced-motion: reduce)';

function subscribe(onChange: () => void): () => void {
  const media = window.matchMedia(QUERY);
  media.addEventListener('change', onChange);
  return () => media.removeEventListener('change', onChange);
}

function getSnapshot(): boolean {
  return window.matchMedia(QUERY).matches;
}

/**
 * The single reduced-motion switch: every animation and 3D scene reads this (NS-15, NS-16). It is
 * true when the visitor's device asks for reduced motion. Nothing on the page keeps moving by itself
 * for more than a few seconds (see `three/idleSpeed.ts`), so no on-page pause control is needed.
 */
export function useReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}
