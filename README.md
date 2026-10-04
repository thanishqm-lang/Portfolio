# THANISHQ: Quality Engineering Lab

The personal portfolio of **Sri Thanishq Manda**, QA and automation engineer in Hyderabad, India. A single-page, dark, 3D "lab": a glowing AI Core hero, selected work, an interactive toolkit, an About section, and an assistant that answers questions about the work. It is a static site with no server, no database and no tracking.

## What is in the site
- **Hero** with an animated 3D Core and perspective grid, and a short orchestrated intro.
- **What I do**, **Selected Work** (with a detail dialog), **My Toolkit** (an accessible list plus an interactive 3D universe), **About**, **Contact**.
- **Ask the Lab**: a small assistant that runs in your browser and answers only from what is written on the site. It uses no AI service, so it cannot make things up.
- Sticky navigation, a skip link, keyboard support, a **Pause animations** control, and reduced-motion and no-WebGL fallbacks.

## Tech
React 19, TypeScript (strict), Vite, React Three Fiber (three.js) and drei, Motion. Hosted as static files on Vercel. The decisions and their reasons are in [`docs/adr/`](docs/adr).

## Run it
Requires Node 22.9 or newer.

```bash
npm install
npm run dev        # http://localhost:5173
```

Other commands:

```bash
npm run lint             # eslint, tokens-only colours, accessibility gate (structure and contrast)
npm run typecheck
npm run build            # production build plus bundle-budget and lazy-loading checks
npm run check:assistant  # asks the assistant ~30 realistic questions (needs >= 90% correct)
npm run check:motion     # motion gate: transform/opacity only, reduced-motion path (needs Python)
node scripts/make-og-image.mjs   # regenerates the link-preview image (needs Edge or Chrome)
```

## Edit the content
All text lives in typed files in [`apps/web/src/content/`](apps/web/src/content), so changing the site never needs a component edit:

| File | What it holds |
| --- | --- |
| `hero.ts`, `ui.ts` | Hero lines, the section list, interface labels, navigation names |
| `profile.ts`, `experience.ts` | About text, focus areas, education, experience |
| `capabilities.ts`, `projects.ts`, `stack.ts` | The four "What I do" cards, projects, toolkit items |
| `contact.ts` | Contact intro and links |

The assistant builds its answers from the same files (`apps/web/src/assistant/`), so it never disagrees with the page. After editing, run `npm run check:assistant`.

## Layout
```
apps/web          the portfolio (React app)
apps/web/public   favicon and link-preview image
docs/             PRD-derived design, decisions (ADRs), motion spec, assistant question list
scripts/          the quality gates and the image generator
.bearing/         the project's north-stars (design rules)
```

`apps/api` and `packages/shared` are leftovers from an earlier, abandoned project idea. They are not part of the site and are kept untouched until they are removed deliberately.

## Deploy
The site is a static build: `npm run build` produces `apps/web/dist`. On Vercel set the **Root Directory** to `apps/web` (or build with `npm run build -w @awi/web`) and the output directory to `dist`. The link-preview tags pick up the site's address from Vercel's `VERCEL_PROJECT_PRODUCTION_URL`, or from `SITE_URL` if you set it.
