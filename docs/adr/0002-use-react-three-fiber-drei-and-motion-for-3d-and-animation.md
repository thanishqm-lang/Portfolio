# ADR-0002: Use React Three Fiber, drei and Motion for 3D and animation

- Status: Accepted
- Date: 2026-10-03
- Task: FND-03, HERO-01, TECH-01, MOT-01
- Deciders: Thani (answered in the tech-decision conversation)
- Area: frontend (3D and animation stack; not a catalogue default)
- Reversibility: awkward: scenes are written as React Three Fiber components, so switching 3D libraries means rewriting the scenes; the DOM animation layer is cheap to change

## Context

- PRD §12 names Three.js with React Three Fiber (and drei) plus an animation library such as Motion or GSAP as likely additions; the frontend is already React 19 with Vite in `apps/web` (settled by the PRD and the repository).
- FND-03 requires a lazy-loaded canvas outside the initial bundle; PRD §12 requires procedural geometry, with no model files.
- North-stars that bear on it: NS-14 and NS-15 (content works without 3D; no-WebGL and reduced-motion fallbacks), NS-17 (scrolling is never hijacked), NS-18 (performance budget), NS-19 (original work).
- MOT-01 (scroll-linked camera feel) is one of the highest-risk items in `ESTIMATE.md`.
- Not known: target devices (assumed a mid-range phone and laptop) and prior GSAP experience (assumed willing to learn either library).

## What else was considered

| Option | Why not | Would suit |
| --- | --- | --- |
| React Three Fiber + drei + Motion (chosen) | Three.js is large, roughly 150–170 KB gzipped (estimate); stays lazy-loaded. Long multi-element timelines are clumsier. | A React and TypeScript showcase with scroll-linked motion that must not hijack scrolling |
| React Three Fiber + drei + GSAP | Imperative animation inside a declarative React scene; a second paradigm to keep in sync | MOT-01 turning into a long, multi-element timeline |
| Plain Three.js + GSAP | More boilerplate and manual cleanup; weaker React showcase | Full control without a React binding layer |
| OGL + CSS or Motion | Labels and picking are hand-built; smaller community | A shader-led scene that misses the performance budget on a mid-range phone |

## Decision

We will use React Three Fiber with drei for the 3D scenes and Motion for DOM and scroll-linked animation, because it is React-idiomatic with strict types, keeps the heavy 3D code lazy-loaded outside the initial bundle (FND-03, NS-18), and handles scroll-linked motion without taking over scrolling. We will not use drei's `ScrollControls`, because it hijacks scrolling and breaks NS-17.

## Consequences

- The Core and the tech universe are written as React components, so the no-WebGL fallback (A11Y-02) must be a separate 2D rendering of the same data.
- Import only the drei helpers that are used, to keep the lazy bundle small.
- Revisit if MOT-01's choreography becomes a long multi-element timeline (add GSAP, which is cheap), or if the Core or the tech universe misses the performance budget on a mid-range phone (consider OGL).

## Commits us to

three, @react-three/fiber (v9, for React 19), @react-three/drei, motion (the Motion animation library; formerly Framer Motion).
