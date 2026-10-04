# Motion: Quality Lab portfolio

Written with the Bearing `motion-design` skill. Approach: **intentional**: one orchestrated moment (the hero intro), everything else quiet. The tokens in `apps/web/src/styles/tokens.css` win over any value written here.

## Principles

1. Every animation says what changed, where something came from, or that the system is working; anything else is cut.
2. One orchestrated moment per page: **the hero intro**. Everything else is quiet: hover and press at `instant`/`fast`, entrances at `base`.
3. Opacity first; transform only where position carries meaning. Only `transform` and `opacity` are ever animated (individual `translate` and `scale` count as transform).
4. Text is read, not watched: the hero intro finishes in about one second, and the assistant's answer text is in the page from the first moment (the reveal is visual only).
5. Motion is a preference: the OS setting `prefers-reduced-motion` and the on-page **Pause animations** control both stop everything; end states and meaning stay.

## Tokens

| Token | Value | Use |
| --- | --- | --- |
| `--duration-instant` | 80 ms | button press |
| `--duration-fast` | 150 ms | menu, chat message, colour changes |
| `--duration-base` | 300 ms | section reveals, dialog, card hover |
| `--duration-slow` | 600 ms | hero text |
| `--duration-deliberate` | 700 ms | the hero intro (grid, Core) |
| `--stagger` | 40 ms | gap between siblings; at most 8 |
| `--ease-out` | cubic-bezier(0.22, 1, 0.36, 1) | everything that enters |

Reduced motion zeroes every duration and sets `animation: none` and `transition: none` (media query and `html[data-motion='paused']`, both in `tokens.css`). JavaScript reads one function, `useReducedMotion()` (`src/motion/useReducedMotion.ts`): OS setting OR the on-page pause (`src/motion/preference.ts`).

## Applied in this product

| Where | Pattern | How | Reduced-motion path |
| --- | --- | --- | --- |
| Hero (name, headline, tagline, button, grid, Core) | Orchestrated intro, staggered rise/fade, Core rises and scales in | CSS keyframes with `backwards` fill (default CSS is the end state) | No animation; everything simply shown |
| Hero grid | Ambient loop (5 s, seamless, `transform`) | CSS keyframes | Static grid; **Pause animations** control (loop > 5 s) |
| Hero Core (3D) | Idle rotation and pulse; follows the cursor; shrinks and drifts as the hero scrolls away | React Three Fiber `useFrame`, CSS `translate`/`scale` from `--parallax` | Static SVG Core instead of the 3D scene |
| Section headings, cards, project panels, toolkit, About, assistant, Contact | Reveal once on scroll: fade and rise 1 rem, 40 ms stagger | `Reveal` component (IntersectionObserver); only content below the fold gets a start state | Shown at once |
| Cards | Lift 0.25 rem on hover | CSS `transform` at `base` | No movement |
| Buttons | Press feedback (scale 0.97) | CSS `transform` at `instant` | No movement |
| Project dialog | Fade and rise on open; backdrop fades | CSS keyframes at `base` | Appears at once |
| Mobile menu | Fade and slide down on open | CSS keyframes at `fast` | Appears at once |
| Assistant | Thinking dots (450 ms), word-by-word fade reveal (at most 1.8 s, Skip button), message entrance | State + CSS; full text always in the DOM | No dots, no reveal; answer at once |
| Toolkit universe (3D) | Slow drift that pauses on hover | React Three Fiber `useFrame` | The 3D view is not shown; the list is the whole interface |

## Rules every animation obeys

- `transform` and `opacity` only (`scripts/motion_check.py` fails anything else, including `transition: all`).
- No loop over 5 seconds without a visible pause control: the **Pause animations** button in the navigation (`aria-pressed`) covers the grid, the Core and the toolkit drift.
- Nothing flashes; motion never blocks input.
- Scrolling is never hijacked (tenet 4); parallax only reads scroll position.

## Gate

`npm run check:motion` runs `scripts/motion_check.py` (from Bearing) over the styles and the motion, component and assistant folders. It needs Python 3 (`python`).
