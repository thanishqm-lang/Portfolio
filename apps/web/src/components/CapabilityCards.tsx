import { CAPABILITIES } from '../content/capabilities';
import { CapabilityIcon } from './icons';
import { Reveal } from './Reveal';
import { GlassPanel } from './ui';

/** The four "What I do" cards, rendered from content; they reveal in a short stagger. */
export function CapabilityCards() {
  return (
    <ul className="card-grid">
      {CAPABILITIES.map((capability, index) => (
        <li key={capability.id}>
          <Reveal index={index} className="reveal--fill">
            <GlassPanel as="article" className="card">
              <CapabilityIcon icon={capability.icon} />
              <h3 className="card__title">{capability.title}</h3>
              <p className="card__text">{capability.description}</p>
            </GlassPanel>
          </Reveal>
        </li>
      ))}
    </ul>
  );
}
