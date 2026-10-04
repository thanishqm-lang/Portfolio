import type { ReactNode } from 'react';

/** Small uppercase monospace label used for "lab" captions and section eyebrows. */
export function MonoLabel({ children }: { children: ReactNode }) {
  return <span className="mono-label">{children}</span>;
}
