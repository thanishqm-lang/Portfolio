import { EXPERIENCE } from '../content/experience';
import { PROFILE } from '../content/profile';
import { UI } from '../content/ui';
import { GlassPanel, MonoLabel, TagChip } from './ui';

/** Bio, focus areas, experience and education, all from content. Text-led, no avatar. */
export function AboutBody() {
  const { about } = PROFILE;
  return (
    <div className="about">
      <div className="about__bio">
        {about.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
        <div className="about__focus">
          <MonoLabel>{UI.focusHeading}</MonoLabel>
          <ul className="tag-list">
            {about.focusAreas.map((area) => (
              <li key={area}>
                <TagChip>{area}</TagChip>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <GlassPanel className="about__experience">
        <MonoLabel>{UI.experienceHeading}</MonoLabel>
        <ul className="timeline">
          {EXPERIENCE.map((entry) => (
            <li key={entry.id} className="timeline__item">
              <h3 className="timeline__role">{entry.role}</h3>
              <p className="timeline__meta">
                {entry.company} · {entry.period}
              </p>
              <ul className="timeline__list">
                {entry.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
        <MonoLabel>{UI.educationHeading}</MonoLabel>
        <p className="timeline__meta">
          {about.education.degree}
          <br />
          {about.education.school} · {about.education.period}
        </p>
      </GlassPanel>
    </div>
  );
}
