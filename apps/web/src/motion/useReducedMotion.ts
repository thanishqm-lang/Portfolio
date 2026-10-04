import { useSyncExternalStore } from 'react';
import { getMotionPaused, setMotionPaused, subscribeMotionPaused } from './preference';

const QUERY = '(prefers-reduced-motion: reduce)';

function subscribeSystem(onChange: () => void): () => void {
  const media = window.matchMedia(QUERY);
  media.addEventListener('change', onChange);
  return () => media.removeEventListener('change', onChange);
}

function getSystem(): boolean {
  return window.matchMedia(QUERY).matches;
}

/**
 * The single reduced-motion switch: every animation and 3D scene reads this (NS-15, NS-16). It is
 * true when the operating system asks for reduced motion OR the visitor paused animations on the page.
 */
export function useReducedMotion(): boolean {
  const system = useSyncExternalStore(subscribeSystem, getSystem, () => false);
  const paused = useSyncExternalStore(subscribeMotionPaused, getMotionPaused, () => false);
  return system || paused;
}

/** The on-page pause control's state and toggle. */
export function useMotionPause(): { paused: boolean; toggle: () => void } {
  const paused = useSyncExternalStore(subscribeMotionPaused, getMotionPaused, () => false);
  return { paused, toggle: () => setMotionPaused(!paused) };
}
