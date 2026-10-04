import { useEffect, useState } from 'react';

/**
 * The id of the section the reader is in: the last one whose top has reached `offset` pixels from
 * the top of the viewport, or the last section once the page is scrolled to the bottom. It only
 * reads scroll position (tenet 4) and is throttled to one update per animation frame.
 */
export function useActiveSection(ids: readonly string[], offset: number): string {
  const [active, setActive] = useState(ids[0] ?? '');

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      if (atBottom) {
        setActive(ids[ids.length - 1] ?? '');
        return;
      }
      let current = ids[0] ?? '';
      for (const id of ids) {
        const element = document.getElementById(id);
        if (element !== null && element.getBoundingClientRect().top <= offset) current = id;
      }
      setActive(current);
    };
    let settle = 0;
    const schedule = () => {
      if (frame === 0) frame = window.requestAnimationFrame(update);
      // Sections far down are laid out lazily, so their real size only appears after a jump lands:
      // measure once more when scrolling has stopped.
      window.clearTimeout(settle);
      settle = window.setTimeout(update, 180);
    };
    schedule(); // first measurement waits for a frame, so startup never forces a layout
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    window.addEventListener('hashchange', schedule);
    return () => {
      if (frame !== 0) window.cancelAnimationFrame(frame);
      window.clearTimeout(settle);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      window.removeEventListener('hashchange', schedule);
    };
  }, [ids, offset]);

  return active;
}
