import { useEffect, useState, type RefObject } from 'react';

/** Whether an element is on screen now, and whether it has ever been near the viewport. */
export function useInView(
  ref: RefObject<Element | null>,
  rootMargin = '200px',
): { inView: boolean; seen: boolean } {
  const [state, setState] = useState({ inView: false, seen: false });

  useEffect(() => {
    const element = ref.current;
    if (element === null) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry === undefined) return;
        setState((prev) => ({
          inView: entry.isIntersecting,
          seen: prev.seen || entry.isIntersecting,
        }));
      },
      { rootMargin },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [ref, rootMargin]);

  return state;
}
