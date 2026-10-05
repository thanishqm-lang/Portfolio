interface SectionHeadingProps {
  id: string;
  title: string;
  /** The first section on the page is the h1; every other section is an h2. */
  level: 1 | 2;
}

/** A section's heading, with an id the section can be labelled by. */
export function SectionHeading({ id, title, level }: SectionHeadingProps) {
  const Heading = level === 1 ? 'h1' : 'h2';
  return (
    <Heading id={id} className="section__title">
      {title}
    </Heading>
  );
}
