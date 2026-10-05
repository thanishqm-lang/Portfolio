import type { ReactNode } from 'react';

/** A small, quiet caption in sentence case. Not an eyebrow: it labels data, never a heading. */
export function Label({ children }: { children: ReactNode }) {
  return <span className="label">{children}</span>;
}
