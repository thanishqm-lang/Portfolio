import type { ReactNode } from 'react';

/** A pill used for stack tags and focus-area chips. */
export function TagChip({ children }: { children: ReactNode }) {
  return <span className="tag-chip">{children}</span>;
}
