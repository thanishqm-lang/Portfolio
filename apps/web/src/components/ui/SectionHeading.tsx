import { Fragment } from 'react';

interface SectionHeadingProps {
  id: string;
  title: string;
  /** The first section on the page is the h1; every other section is an h2. */
  level: 1 | 2;
}

/**
 * A section's heading, with an id the section can be labelled by. The page's h1 is set on two
 * masked lines (the last word on its own) so the hero intro can lift each line into view; a space
 * between the lines keeps the accessible name a normal sentence.
 */
export function SectionHeading({ id, title, level }: SectionHeadingProps) {
  if (level === 1) {
    const words = title.split(' ');
    const lastWord = words.pop() ?? '';
    const lines = [words.join(' '), lastWord].filter((line) => line.length > 0);
    return (
      <h1 id={id} className="section__title">
        {lines.map((line, index) => (
          <Fragment key={line}>
            <span className="title-line">
              <span className="title-line__in">{line}</span>
            </span>
            {index < lines.length - 1 ? ' ' : ''}
          </Fragment>
        ))}
      </h1>
    );
  }
  return (
    <h2 id={id} className="section__title">
      {title}
    </h2>
  );
}
