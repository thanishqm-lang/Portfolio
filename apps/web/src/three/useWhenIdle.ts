import { useEffect, useState } from 'react';

/** How long a phone waits before loading the heavy 3D code, unless the visitor interacts first. */
const PHONE_DELAY_MS = 3500;

/**
 * True once the page has finished loading and the browser is idle. On phones it waits a few seconds
 * longer (or until the first touch, scroll or key press), so the 3D code never competes with the
 * page's own startup on a slow processor. Until then the static Core is shown (tenet 2).
 */
export function useWhenIdle(): boolean {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const phone = window.matchMedia('(max-width: 47.99rem)').matches;
    let cancelled = false;
    let timer = 0;
    let idle = 0;
    const events = ['pointerdown', 'scroll', 'keydown'] as const;

    const finish = () => {
      if (!cancelled) setReady(true);
    };
    const afterIdle = () => {
      if (!phone) {
        finish();
        return;
      }
      // Phones: wait a few seconds, or until the visitor interacts, whichever comes first.
      timer = window.setTimeout(finish, PHONE_DELAY_MS);
      events.forEach((name) => window.addEventListener(name, finish, { once: true, passive: true }));
    };
    const start = () => {
      // Older Safari has no requestIdleCallback; a short timer is the fallback.
      if (typeof window.requestIdleCallback === 'function') {
        idle = window.requestIdleCallback(afterIdle, { timeout: 2000 });
      } else {
        timer = window.setTimeout(afterIdle, 200);
      }
    };

    if (document.readyState === 'complete') start();
    else window.addEventListener('load', start, { once: true });

    return () => {
      cancelled = true;
      window.removeEventListener('load', start);
      events.forEach((name) => window.removeEventListener(name, finish));
      if (idle !== 0 && typeof window.cancelIdleCallback === 'function') window.cancelIdleCallback(idle);
      window.clearTimeout(timer);
    };
  }, []);

  return ready;
}
