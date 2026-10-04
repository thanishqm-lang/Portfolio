import { MonoLabel } from './MonoLabel';

interface SectionHeadingProps {
  id: string;
  eyebrow: string;
  title: string;
  /** The first section on the page is the h1; every other section is an h2. */
  level: 1 | 2;
}

/** A section's mono eyebrow plus its heading, with an id the section can be labelled by. */
export function SectionHeading({ id, eyebrow, title, level }: SectionHeadingProps) {
  const Heading = level === 1 ? 'h1' : 'h2';
  return (
    <div className="section__heading">
      <MonoLabel>{eyebrow}</MonoLabel>
      <Heading id={id} className="section__title">
        {title}
      </Heading>
    </div>
  );
}
