import { lazy, useRef } from 'react';
import { CONTACT } from '../content/contact';
import { HERO } from '../content/hero';
import { useHeroParallax } from '../motion/useHeroParallax';
import { LazyScene } from '../three/LazyScene';
import { CoreFallback } from './CoreFallback';
import { Button } from './ui';

// The 3D chunk loads on demand; it is never part of the entry bundle (tenet 3).
const AiCoreScene = lazy(() => import('../scenes/AiCoreScene'));

/** The hero's text and its two actions: email first, then the work. The name is the section's h1. */
export function HeroBody({ nextId }: { nextId: string }) {
  const email = CONTACT.links[0];
  return (
    <div className="hero__copy">
      <p className="hero__role">{HERO.role}</p>
      <p className="hero__tagline">{HERO.tagline}</p>
      <div className="hero__actions">
        {email !== undefined && (
          <Button href={email.href} arrow>
            {HERO.emailAction}
          </Button>
        )}
        <Button href={`#${nextId}`} variant="ghost">
          {HERO.workAction}
        </Button>
        <span className="hero__status">{HERO.status}</span>
      </div>
    </div>
  );
}

/** The Core, drawn large behind the hero name. Rendered by the section as its background. */
export function HeroBackground() {
  const ref = useRef<HTMLDivElement>(null);
  useHeroParallax(ref);

  return (
    <div ref={ref} className="hero__bg" aria-hidden="true">
      <LazyScene
        render={(active) => <AiCoreScene active={active} />}
        fallback={<CoreFallback />}
        className="hero__core"
      />
    </div>
  );
}
