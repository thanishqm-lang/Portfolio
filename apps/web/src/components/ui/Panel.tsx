import type { ComponentPropsWithoutRef } from 'react';

type PanelProps = ComponentPropsWithoutRef<'div'> & {
  /** The element to render, so a panel can be an article, a section or a plain div. */
  as?: 'div' | 'article' | 'section';
};

/** A flat, ruled container for the toolkit detail and the assistant. No glass, no glow. */
export function Panel({ as: Tag = 'div', className, children, ...rest }: PanelProps) {
  const classes = ['panel', className ?? ''].filter(Boolean).join(' ');
  return (
    <Tag className={classes} {...rest}>
      {children}
    </Tag>
  );
}
