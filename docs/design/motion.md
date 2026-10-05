# Motion: portfolio

Written with the Bearing `motion-design` skill; revised on 2026-10-05 for the redesign (see "Redesign note"). Approach: **intentional**: one orchestrated moment (the hero intro), everything else quiet. The tokens in `apps/web/src/styles/tokens.css` win over any value written here.

## Principles

1. Every animation says what changed, where something came from, or that the system is working; anything else is cut.
2. One orchestrated moment per page: **the hero intro**. Everything else is quiet: hover and press at `instant`/`fast`, entrances at `base`.
3. Opacity first; transform only where position carries meaning. Only `transform` and `opacity` are ever animated (individual `translate` and `scale` count as transform).
4. Text is read, not watched: the hero intro finishes in about one second, and the assistant's answer text is in the page from the first moment (the reveal is visual only).
5. Motion is a preference: the OS setting `prefers-reduced-motion` stops everything; end states and meaning stay.

## Tokens

| Token | Value | Use |
| --- | --- | --- |
| `--duration-instant` | 80 ms | button press |
| `--duration-fast` | 150 ms | menu, chat message, colour changes, arrow nudge |
| `--duration-base` | 300 ms | section reveals, dialog |
| `--duration-slow` | 600 ms | hero text |
| `--duration-deliberate` | 700 ms | the hero intro (Core) |
| `--stagger` | 40 ms | gap between siblings; at most 8 |
| `--ease-out` | cubic-bezier(0.22, 1, 0.36, 1) | everything that enters |

Reduced motion zeroes every duration and sets `animation: none` and `transition: none` (media query in `tokens.css`). JavaScript reads one function, `useReducedMotion()` (`src/motion/useReducedMotion.ts`), which is the OS setting.

## Applied in this product

| Where | Pattern | How | Reduced-motion path |
| --- | --- | --- | --- |
| Hero (name, role, tagline, actions, Core) | Orchestrated intro: the name lifts into view line by line from a mask, the rest rises in a stagger, the Core fades and scales in | CSS keyframes with `backwards` fill (default CSS is the end state) | No animation; everything simply shown |
| Hero Core (3D) | Spins and pulses for about 5 seconds, then settles; follows the cursor; shrinks and drifts as the hero scrolls away | React Three Fiber `useFrame` with `idleSpeed()`, CSS `translate`/`scale` from `--parallax` | Static SVG Core instead of the 3D scene |
| Section headings, rows, toolkit, About, assistant, Contact | Reveal once on scroll: fade and rise 1 rem, 40 ms stagger | `Reveal` component (IntersectionObserver); only content below the fold gets a start state | Shown at once |
| Reading progress line | A 2 px line across the top fills as you scroll (scroll position only) | ScrollProgress, one 	ransform per frame | Still shown; it is an indicator, not movement |
| About paragraphs | Words brighten one after another as the paragraph scrolls up the screen (opacity only; text is real from the start) | ScrollWords | Everything fully visible |
| Work rows | The other rows dim while one is hovered or focused | CSS :has(), opacity at ase | No transition |
| Work rows, contact links, buttons | Arrow nudges 0.2 rem on hover; colour change | CSS `translate` and colour at `fast` | No movement |
| Project dialog | Fade and rise on open; backdrop fades | CSS keyframes at `base` | Appears at once |
| Mobile menu | Fade and slide down on open | CSS keyframes at `fast` | Appears at once |
| Assistant | Thinking dots (450 ms), word-by-word fade reveal (at most 1.8 s, Skip button), message entrance | State + CSS; full text always in the DOM | No dots, no reveal; answer at once |
| Toolkit universe (3D) | Slow drift for about 5 seconds, then settles; never moves while a node is hovered | React Three Fiber `useFrame` with `idleSpeed()` | The 3D view is not shown; the list is the whole interface |

## Rules every animation obeys

- `transform` and `opacity` only (`scripts/motion_check.py` fails anything else, including `transition: all`).
- Nothing moves on its own for more than five seconds (WCAG 2.2.2): the 3D scenes use `src/three/idleSpeed.ts`, which eases automatic movement to rest after 3.5 s plus a 1.5 s ease. Movement the visitor causes (cursor tilt, hover, scroll) is not automatic and stays live.
- Nothing flashes; motion never blocks input.
- Scrolling is never hijacked (tenet 4); parallax only reads scroll position.

## Redesign note (2026-10-05)

The owner asked for the on-page **Pause animations** button to be removed. WCAG 2.2.2 asks for a way to stop moving content that starts by itself and lasts more than five seconds, so the loops that needed the button were removed instead: the perspective grid was deleted, and the Core and toolkit spins now settle on their own. With no looping content the control is not needed, and the OS reduced-motion setting still stops everything.

## Look (2026-10-05, second redesign)

The owner chose dark and cinematic but refined: warm black, ivory type, one vermilion signal colour, no glows. The 3D scenes fade in once ready instead of swapping from a flat fallback. Display type is Bricolage Grotesque at 75-80% width.

## Gate

`npm run check:motion` runs `scripts/motion_check.py` (from Bearing) over the styles and the motion, component and assistant folders. It needs Python 3 (`python`).
