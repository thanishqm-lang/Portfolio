import { lazy, useRef } from 'react';
import { HERO } from '../content/hero';
import { useHeroParallax } from '../motion/useHeroParallax';
import { LazyScene } from '../three/LazyScene';
import { CoreFallback } from './CoreFallback';
import { Button } from './ui';

// The 3D chunk loads on demand; it is never part of the entry bundle (tenet 3).
const AiCoreScene = lazy(() => import('../scenes/AiCoreScene'));

/** The hero's text, scroll cue and the background layers: perspective grid and the AI Core. */
export function HeroBody({ nextId }: { nextId: string }) {
  return (
    <>
      <div className="hero__copy">
        <p className="hero__headline">{HERO.headline}</p>
        <p className="hero__tagline">{HERO.tagline}</p>
        <Button href={`#${nextId}`}>{HERO.scrollCue}</Button>
      </div>
    </>
  );
}

/** Decorative layers behind the hero text. Rendered by the section as its background. */
export function HeroBackground() {
  const ref = useRef<HTMLDivElement>(null);
  useHeroParallax(ref);

  return (
    <div ref={ref} className="hero__bg" aria-hidden="true">
      <div className="hero__grid" />
      <LazyScene
        render={(active) => <AiCoreScene active={active} />}
        fallback={<CoreFallback />}
        className="hero__core"
      />
    </div>
  );
}
