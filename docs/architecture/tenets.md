# System design tenets: AI Developer Lab

Rules this project holds itself to. Each is here because somebody could plausibly do the opposite, and a reviewer can point at a breach.

## 1. Copy and data live in typed content files, never in components

**No portfolio content (copy, projects, stack items, assistant answers) is written inside a component; it is read from the typed content modules, and short interface strings (labels, error messages, aria text) are read from a `ui.ts` module.**

Adding a project must be a content-only edit (NS-21, FR-16). Hard-coded copy makes the assistant and the page disagree, because the assistant reuses the same content.

_A breach looks like:_ a merge request that adds a project title and pitch directly in the JSX of the project panel instead of in the projects content file, or a new "try again" message typed inline instead of added to `ui.ts`.

## 2. Every 3D or motion feature ships with its fallback in the same merge request

**A scene or animation is not merged unless the no-WebGL and reduced-motion version exists and shows the same content. HERO-01 and TECH-01 each ship with their fallback; A11Y-02 then covers the cross-cutting checks.**

NS-14 and NS-15 say content works without enhancement; a fallback added "later" is the one that never gets written (A11Y-02, and the release v1 definition in the design, section 12).

_A breach looks like:_ a merge request adding a new node cluster to the tech universe canvas with no matching entry in the 2D list, or an animation with no `prefers-reduced-motion` branch.

## 3. The initial bundle never imports three.js, drei or the assistant

**Everything 3D and the assistant are loaded through dynamic `import()` behind the lazy canvas wrapper; no top-level import pulls them into the entry chunk.**

ADR-0002 and FND-03 depend on the 3D code staying outside the initial load to meet the NS-18 budget. It is enforced by an ESLint `no-restricted-imports` rule on the entry files and a build check that fails if `three` appears in the entry chunk (FND-03).

_A breach looks like:_ a merge request that adds `import * as THREE from 'three'` to `App.tsx`, or a static import of the assistant engine from the page shell.

## 4. Scrolling is never hijacked

**No code takes over the scroll: no drei `ScrollControls`, no `preventDefault` on wheel or touch to drive a scene, no scroll-jacking libraries.**

NS-17 and ADR-0002; scroll-linked motion must read scroll position, not own it.

_A breach looks like:_ a merge request that wraps the page in `ScrollControls` to drive the camera, or adds a wheel listener that calls `preventDefault`.

## 5. The site makes no runtime request except for its own static files

**No analytics, no third-party scripts, no remote fonts and no API calls at runtime; fonts and assets are served from the site itself.**

NS-22 and ADR-0001: the site has no server and collects nothing, so any third-party request is both a privacy breach and a hidden dependency.

_A breach looks like:_ a merge request that adds a Google Fonts `<link>`, an analytics snippet in `index.html`, or a `fetch` to an external API in the assistant.

## 6. The assistant only returns text written in its knowledge entries

**Answers come from the curated knowledge entries; a low-confidence match returns the redirect, never a composed or guessed answer.**

NS-20 and ADR-0001: the assistant must never invent a fact, and a deterministic matcher is only safe if it never improvises.

_A breach looks like:_ a merge request that, on a partial keyword match, builds a sentence by joining fragments of two entries, or that calls a language-model API as a fallback.

## 7. Visual values come from design tokens

**Colours, spacing, radius, glow and durations are referenced from the tokens defined in FND-01 and FND-03; no new hex values or magic durations in components.**

The look must stay cohesive (NS-13) and the accent colour must change in one place. A lint or grep rule that fails on hex colour literals outside the tokens file enforces it (FND-01).

_A breach looks like:_ a merge request that styles a card with `#00e5ff` or `transition: 0.35s` inline instead of the accent token and the shared easing and duration values.
