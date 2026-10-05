import { CAPABILITIES } from '../content/capabilities';
import { Reveal } from './Reveal';

/** The four "What I do" rows, ruled like a printed form and rendered from content. */
export function CapabilityCards() {
  return (
    <ul className="capabilities">
      {CAPABILITIES.map((capability, index) => (
        <li key={capability.id}>
          <Reveal index={index}>
            <article className="capability">
              <h3 className="capability__title">{capability.title}</h3>
              <p className="capability__text">{capability.description}</p>
            </article>
          </Reveal>
        </li>
      ))}
    </ul>
  );
}
