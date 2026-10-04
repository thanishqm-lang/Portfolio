import type { ComponentPropsWithoutRef } from 'react';

type GlassPanelProps = ComponentPropsWithoutRef<'div'> & {
  /** The element to render, so a panel can be an article, a section or a plain div. */
  as?: 'div' | 'article' | 'section';
  padded?: boolean;
};

/** The shared frosted-glass container used by cards, project panels and the assistant. */
export function GlassPanel({
  as: Tag = 'div',
  padded = true,
  className,
  children,
  ...rest
}: GlassPanelProps) {
  const classes = ['glass-panel', padded ? 'glass-panel--padded' : '', className ?? '']
    .filter(Boolean)
    .join(' ');
  return (
    <Tag className={classes} {...rest}>
      {children}
    </Tag>
  );
}
