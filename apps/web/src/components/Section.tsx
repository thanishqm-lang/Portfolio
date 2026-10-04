import type { ReactNode } from 'react';
import { Reveal } from './Reveal';
import { SectionHeading } from './ui';

interface SectionProps {
  id: string;
  eyebrow: string;
  title: string;
  isFirst: boolean;
  /** Decorative layers drawn behind the section content (the hero's grid and AI Core). */
  background?: ReactNode;
  children: ReactNode;
}

/** An anchored page section, labelled by its heading. The first one carries the page's h1. */
export function Section({ id, eyebrow, title, isFirst, background, children }: SectionProps) {
  const headingId = `${id}-heading`;
  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={isFirst ? 'section section--hero' : 'section'}
    >
      {background}
      <div className="section__inner">
        {isFirst ? (
          <SectionHeading id={headingId} eyebrow={eyebrow} title={title} level={1} />
        ) : (
          // The hero has its own intro; every other heading reveals quietly as it scrolls in.
          <Reveal>
            <SectionHeading id={headingId} eyebrow={eyebrow} title={title} level={2} />
          </Reveal>
        )}
        {children}
      </div>
    </section>
  );
}
