import { useEffect, useId, useRef, useState } from 'react';
import { SECTIONS, UI } from '../content/ui';
import { useActiveSection } from '../motion/useActiveSection';

const SECTION_IDS = SECTIONS.map((section) => section.id);
// A section counts as current once its top is within this distance of the viewport top (nav height plus margin).
const ACTIVE_OFFSET_PX = 120;

/**
 * Sticky top bar: the site mark and anchor links to every section. The current section is marked
 * with aria-current. On phones the links collapse behind a menu button that opens by tap, closes
 * on Esc or when a link is chosen, and moves focus in and back out.
 */
export function SiteNav() {
  const active = useActiveSection(SECTION_IDS, ACTIVE_OFFSET_PX);
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const menu = useRef<HTMLElement>(null);
  const menuId = useId();

  useEffect(() => {
    if (!open) return;
    menu.current?.querySelector('a')?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header className="site-nav">
      <div className="site-nav__inner">
        <a className="site-nav__mark" href="#hero">
          {UI.siteMark}
        </a>
        <button
          ref={toggle}
          type="button"
          className="site-nav__toggle"
          aria-expanded={open}
          aria-controls={menuId}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? UI.menuClose : UI.menuOpen}
        </button>
        <nav
          ref={menu}
          id={menuId}
          aria-label={UI.navLabel}
          className={open ? 'site-nav__menu site-nav__menu--open' : 'site-nav__menu'}
        >
          <ul className="site-nav__list">
            {SECTIONS.map((section) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  aria-current={active === section.id ? 'location' : undefined}
                  onClick={() => setOpen(false)}
                >
                  {section.navLabel}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
