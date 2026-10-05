import { EXPERIENCE } from '../content/experience';
import { PROFILE } from '../content/profile';
import { UI } from '../content/ui';
import { Label } from './ui';

/** Bio, focus areas, experience and education, all from content. Set as text, no avatar. */
export function AboutBody() {
  const { about } = PROFILE;
  return (
    <div className="about">
      <div className="about__bio">
        {about.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
        <div className="about__focus">
          <Label>{UI.focusHeading}</Label>
          <p className="about__focus-list">{about.focusAreas.join(', ')}</p>
        </div>
      </div>

      <div className="about__record">
        <section aria-label={UI.experienceHeading} className="about__block">
          <Label>{UI.experienceHeading}</Label>
          <ul className="timeline">
            {EXPERIENCE.map((entry) => (
              <li key={entry.id} className="timeline__item">
                <h3 className="timeline__role">{entry.role}</h3>
                <p className="timeline__meta">
                  {entry.company}, {entry.period}
                </p>
                <ul className="timeline__list">
                  {entry.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </section>
        <section aria-label={UI.educationHeading} className="about__block">
          <Label>{UI.educationHeading}</Label>
          <p className="timeline__role">{about.education.degree}</p>
          <p className="timeline__meta">
            {about.education.school}, {about.education.period}
          </p>
        </section>
      </div>
    </div>
  );
}
