import { lazy, useState } from 'react';
import { STACK, STACK_CATEGORIES } from '../content/stack';
import type { StackCategory } from '../content/types';
import { UI } from '../content/ui';
import { useMediaQuery } from '../motion/useMediaQuery';
import { useReducedMotion } from '../motion/useReducedMotion';
import { LazyScene } from '../three/LazyScene';
import { detectWebGL } from '../three/webgl';
import { GlassPanel, MonoLabel } from './ui';

// The 3D chunk loads on demand; it is never part of the entry bundle (tenet 3).
const TechUniverseScene = lazy(() => import('../scenes/TechUniverseScene'));

type Filter = StackCategory | 'All';

/**
 * The toolkit. The grouped list and the filter are the real interface (keyboard and screen-reader
 * friendly, and the only version without WebGL); the 3D universe is an interactive layer that
 * shares the same selection (tenet 2, NS-14).
 */
export function TechUniverse() {
  const [filter, setFilter] = useState<Filter>('All');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const wide = useMediaQuery('(min-width: 48rem)');
  const reducedMotion = useReducedMotion();
  // Without 3D (small screen, no WebGL or reduced motion) the list above is the whole interface;
  // nothing decorative takes the visual's place (FR-17, NS-14).
  const show3D = wide && !reducedMotion && detectWebGL();

  const selected = STACK.find((item) => item.id === selectedId) ?? null;
  const filters: readonly Filter[] = ['All', ...STACK_CATEGORIES.map((category) => category.name)];

  return (
    <div className="tech">
      <div className="tech__controls">
        <div role="group" aria-label={UI.filterLabel} className="tag-list">
          {filters.map((name) => (
            <button
              key={name}
              type="button"
              className="chip-button"
              aria-pressed={filter === name}
              onClick={() => setFilter(name)}
            >
              {name === 'All' ? UI.filterAll : name}
            </button>
          ))}
        </div>

        <div className="tech__groups" aria-label={UI.toolkitList} role="group">
          {STACK_CATEGORIES.map((category, index) => {
            const members = STACK.filter((item) => item.category === category.name);
            const headingId = `tech-group-${index}`;
            const dimGroup = filter !== 'All' && filter !== category.name;
            return (
              <div
                key={category.name}
                role="group"
                aria-labelledby={headingId}
                className={dimGroup ? 'tech__group tech__group--dim' : 'tech__group'}
                data-cat={index}
              >
                <h3 id={headingId} className="tech__group-title">
                  {category.name}
                </h3>
                <ul className="tag-list">
                  {members.map((item) => (
                    <li key={item.id}>
                      <button
                        type="button"
                        className="tech-item"
                        aria-pressed={selectedId === item.id}
                        onClick={() => setSelectedId(item.id)}
                        onMouseEnter={() => setHoveredId(item.id)}
                        onMouseLeave={() => setHoveredId(null)}
                        onFocus={() => setHoveredId(item.id)}
                        onBlur={() => setHoveredId(null)}
                      >
                        {item.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <GlassPanel className="tech__detail" aria-live="polite">
          {selected === null ? (
            <p>{UI.detailEmpty}</p>
          ) : (
            <>
              <h3 className="tech__detail-title">{selected.name}</h3>
              <MonoLabel>{UI.detailCategory}</MonoLabel>
              <p>{selected.category}</p>
              <MonoLabel>{UI.detailUsedFor}</MonoLabel>
              <p>{selected.usedFor}</p>
            </>
          )}
        </GlassPanel>
      </div>

      {show3D && (
        <div className="tech__visual">
          <LazyScene
            className="tech__scene"
            render={(active) => (
              <TechUniverseScene
                active={active}
                items={STACK}
                activeCategory={filter}
                selectedId={selectedId}
                hoveredId={hoveredId}
                onSelect={setSelectedId}
                onHover={setHoveredId}
              />
            )}
            fallback={null}
          />
          <p className="tech__caption">{UI.universeCaption}</p>
        </div>
      )}
    </div>
  );
}
