/**
 * The visitor's on-page motion preference ("Pause animations"). It is ORed with the operating system's
 * reduced-motion setting by `useReducedMotion`, so one function decides for every animation, and it
 * is mirrored on <html data-motion> so CSS animations stop too. Anything that moves for more than
 * 5 seconds needs this control (WCAG 2.2.2).
 *
 * Stored in localStorage as a convenience only (no tracking, never sent anywhere); if storage is
 * blocked the preference simply lasts for the page view.
 */
const KEY = 'awi-motion';
const listeners = new Set<() => void>();

function readStored(): boolean {
  try {
    return window.localStorage.getItem(KEY) === 'paused';
  } catch {
    return false;
  }
}

let paused = readStored();

function mirror(): void {
  document.documentElement.dataset['motion'] = paused ? 'paused' : 'full';
}

mirror();

export function getMotionPaused(): boolean {
  return paused;
}

export function setMotionPaused(next: boolean): void {
  paused = next;
  try {
    window.localStorage.setItem(KEY, next ? 'paused' : 'full');
  } catch {
    // Storage blocked: the preference applies to this page view only.
  }
  mirror();
  listeners.forEach((listener) => listener());
}

export function subscribeMotionPaused(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}
