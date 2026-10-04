# BACKLOG: AI Developer Lab — Personal Portfolio

> Derived from the approved `PRD.md` (unchanged). No implementation has started. No effort estimates yet.
> Revision 2: consolidated from 102 fine-grained items into product-level items.

## How to read this backlog

**Priorities**
- **P0** — essential for the portfolio MVP.
- **P1** — important; part of the MVP, cut last.
- **P2** — optional polish; only if time remains.

**MVP = all P0 + P1 items.** P2 items are optional. A short **Future** section at the end lists ideas outside the MVP (PRD §14).

**Common Definition of Done (applies to every item, in addition to its own):** it builds, and `npm run lint` and `npm run typecheck` pass; it renders with no console errors; it uses the design tokens (FND-01) and reads its copy from the content files (FND-02) wherever it shows content; where it uses motion or 3D it degrades gracefully with reduced motion or without WebGL.

**Scope guardrails (from the PRD):** no accounts, CMS, database, analytics or tracking, enterprise or SaaS features, and no avatar. The site is static.

**Input needed from you (content, not code):** core copy (FND-02), 3–5 projects (WORK-01), stack list review (TECH-01), accent colour (FND-01), résumé file (CON-01), hosting choice (REL-02).

---

## 1. Foundation

### FND-01 · Portfolio shell and design system
- **Area:** Foundation · **Priority:** P0 · **Depends on:** —
- **User-facing feature:** The site loads as a dark, futuristic AI Developer Lab page with a consistent look.
- **Description:** Turn the web app into the portfolio shell: a single page with the seven section containers and anchors in PRD order, design tokens (near-black background, one primary and one secondary accent, spacing, radius, glow, borders), three font roles (display, body sans, mono) and shared primitives (glass panel, section heading, button/link, mono label, tag chip). The shell must not import or show any of the existing dashboard UI; existing files stay where they are (restructure approach confirmed with you first, PRD open question 6). Lint, typecheck and build work with the portfolio.
- **Definition of Done:** `npm run dev` shows the themed page with seven anchored sections; tokens live in one place and the accent colour is confirmed by you; fonts load with fallbacks; primitives are typed and used by at least one section; no old dashboard screens, routes or API calls are reachable; no existing file is deleted; `npm run build` passes.

### FND-02 · Content model and core content
- **Area:** Foundation · **Priority:** P0 · **Depends on:** FND-01
- **User-facing feature:** All site text comes from one place, and the core copy is real.
- **Description:** Strict TypeScript types and content files for profile, hero strings, the four capabilities, About, contact links, projects, tech stack and the assistant knowledge base. Write and enter the core copy (hero, capabilities, About bio, experience summary, contact details); projects and stack data are authored in their own items. Needs your input.
- **Definition of Done:** One content module per concern, no `any`; the core copy has no placeholder text and is approved by you; changing content requires no component edits.

### FND-03 · 3D and motion infrastructure
- **Area:** Foundation · **Priority:** P0 · **Depends on:** FND-01
- **User-facing feature:** (Internal) the base for every 3D visual and animation.
- **Description:** Add Three.js with React Three Fiber and a lightweight animation library; a lazy-loaded, code-split canvas wrapper that handles resize and pixel ratio and detects WebGL; shared easing/duration tokens, a scroll-progress hook and a single reduced-motion switch.
- **Definition of Done:** A placeholder 3D object renders inside the wrapper; the canvas code is outside the initial bundle; the wrapper reports "WebGL unavailable"; one shared module provides easing, durations, scroll progress and the reduced-motion flag.

### FND-04 · Retire unused dashboard code
- **Area:** Foundation · **Priority:** P2 · **Depends on:** REL-02
- **User-facing feature:** None (repository tidiness).
- **Description:** After the portfolio is live, and only with your explicit approval, archive or remove the unused dashboard code and docs, including `PRD.legacy-dashboard.md`. Not done before then.
- **Definition of Done:** You approved the exact list; removed material is recoverable from git or an archive; the build still passes.

---

## 2. Hero / AI Core

### HERO-01 · Hero with animated grid and AI Core
- **Area:** Hero / AI Core · **Priority:** P0 · **Depends on:** FND-01, FND-03
- **User-facing feature:** A cinematic first screen: "THANI / THANISHQ", "AI × SOFTWARE", "Building intelligent digital experiences." over a glowing AI Core.
- **Description:** Hero layout with the three strings and clear hierarchy; a subtle animated perspective grid; a procedural, original AI Core (orb with inner lattice and rings, emissive glow, no model files, no human figure) centred behind or beside the text, with a slow idle rotation and pulse.
- **Definition of Done:** All three strings are visible above the fold at 360 px and 1440 px without overlap and meet text contrast over the effects; the grid and Core animate smoothly at idle; copy comes from content files; no external model assets.

### HERO-02 · Interactive AI Core
- **Area:** Hero / AI Core · **Priority:** P1 · **Depends on:** HERO-01
- **User-facing feature:** The Core reacts to the cursor and to scrolling, and the scene introduces itself on load.
- **Description:** Pointer-driven tilt on desktop; scroll-linked scale, position and glow as the visitor leaves the hero (FR-4); a short intro sequence (background fades in, Core rises, name and tagline resolve); a scroll cue linking to the next section.
- **Definition of Done:** Core motion is smooth and bounded in both scroll directions, off on touch for pointer effects; the intro plays once and the content is readable if it is interrupted; the Core does not render when fully off-screen; the scroll cue is keyboard focusable.

---

## 3. What I Build

### BUILD-01 · Capability cards
- **Area:** What I Build · **Priority:** P0 · **Depends on:** FND-01, FND-02
- **User-facing feature:** Four cards: AI experiences, Modern web applications, Automation & software solutions, Intelligent developer tools.
- **Description:** Render the four capabilities as glass cards (title, one-line description, original inline-SVG icon or mini-visual) in a responsive grid with hover glow and a staggered entrance.
- **Definition of Done:** Exactly four cards from content; 4-up, 2-up and 1-up layouts work; icons are original and decorative ones are hidden from assistive tech; hover has an equivalent focus state.

---

## 4. Selected Work

### WORK-01 · Project panels and detail view
- **Area:** Selected Work · **Priority:** P0 · **Depends on:** FND-01, FND-02
- **User-facing feature:** 3–5 projects with a pitch, stack tags and an expanded case-study summary.
- **Description:** Choose 3–5 projects with you and write title, pitch, summary, role, stack and links. Render them as glass panels (title, one-line pitch, role, stack chips); clicking opens a detail view (summary, role, full stack, repo/demo links) that closes by click, Esc and backdrop. Touch and narrow screens use a simple stacked layout with no hover dependence (FR-7).
- **Definition of Done:** 3–5 complete project entries approved by you with links verified; adding a project needs only a content edit; the detail view is a labelled dialog that moves focus in, traps it, returns it to the opener on close; external links use `rel="noopener"`; at 360 px everything is reachable by tap.

### WORK-02 · Floating project panels
- **Area:** Selected Work · **Priority:** P1 · **Depends on:** WORK-01, FND-03
- **User-facing feature:** Project panels float in 3D space and tilt toward the cursor.
- **Description:** Offset panels in depth with perspective and a slow float, plus pointer-driven tilt and glow on pointer devices (FR-7), so the section feels part of the lab.
- **Definition of Done:** Depth and float look intentional at desktop and tablet widths with text staying crisp; tilt is bounded and disabled on touch and under reduced motion; touch layout from WORK-01 is unchanged.

---

## 5. Tech Universe

### TECH-01 · Interactive tech universe
- **Area:** Tech Universe · **Priority:** P0 · **Depends on:** FND-01, FND-02, FND-03
- **User-facing feature:** My technologies as labelled nodes clustered around the core by category, with hover or tap detail and a category filter.
- **Description:** Author the stack list with categories (AI/LLM, Frontend, Backend, Tooling/Cloud) and a one-line "what I use it for" per technology. Render a 3D (or 2.5D) cluster visual from that data: hovering or tapping a node shows its description (FR-8); category chips highlight matching nodes and dim the rest, with "All" to reset (FR-9). A simplified layout for small screens makes every node tappable with legible labels.
- **Definition of Done:** Every technology has a category and description, reviewed by you; all appear as nodes in category groups; detail opens and closes on both pointer and touch with one open at a time; the active filter is visible and keyboard operable; at 360 px labels do not overlap and the scene stays smooth.

### TECH-02 · Universe motion and interaction
- **Area:** Tech Universe · **Priority:** P1 · **Depends on:** TECH-01
- **User-facing feature:** The universe slowly drifts and can be dragged to rotate.
- **Description:** Slow orbital drift of clusters; mouse and touch drag-to-rotate with inertia and bounds that never hijacks page scrolling.
- **Definition of Done:** Drift pauses while a node is hovered or focused and stops under reduced motion; vertical page scroll on touch still works; rotation is bounded.

---

## 6. About

### ABOUT-01 · About section
- **Area:** About · **Priority:** P0 · **Depends on:** FND-01, FND-02
- **User-facing feature:** A short bio, what drives me, my current focus and a brief experience summary.
- **Description:** Text-led layout (no avatar) with the bio and how I work, a few focus-area chips, and a compact experience list or timeline. The assistant answers experience questions from the same data.
- **Definition of Done:** Everything renders from content and is accurate per you; readable line length and hierarchy at all widths; the experience summary is scannable in seconds.

---

## 7. AI Portfolio Assistant

### AST-01 · Assistant knowledge and answering
- **Area:** AI Portfolio Assistant · **Priority:** P0 · **Depends on:** FND-02, WORK-01, TECH-01, ABOUT-01
- **User-facing feature:** (Behind the scenes) the assistant gives correct, in-scope answers about my work.
- **Description:** A typed knowledge file (skills, projects, experience, technologies, capabilities, contact) with keywords, example questions, answers and optional link targets, reusing project, stack and profile content instead of duplicating it. A deterministic client-side matcher (normalisation, keyword/phrase scoring, confidence threshold) returns the best entry, or a polite out-of-scope reply with suggested prompts (FR-13, FR-15).
- **Definition of Done:** Covers skills, projects, experience, technologies, capabilities and contact; every answer is factual per you with no invented claims; same input gives the same output; works with the network disabled; low-confidence and empty input give a graceful redirect.

### AST-02 · Assistant interface
- **Area:** AI Portfolio Assistant · **Priority:** P0 · **Depends on:** AST-01, FND-01
- **User-facing feature:** An "Ask the Lab" chat panel with starter questions.
- **Description:** The assistant section with message list, text input (Enter and button), 4–6 suggested prompt chips drawn from the knowledge base, a visible reset that clears the chat and restores the chips, and lab-themed terminal/glass styling with mono labels and a small Core-style status indicator.
- **Definition of Done:** Typed and chip questions produce answers; each chip returns a correct answer; user and assistant messages are visually distinct; reset clears everything and nothing is stored beyond the page session; works from 360 px up.

### AST-03 · Assistant polish
- **Area:** AI Portfolio Assistant · **Priority:** P1 · **Depends on:** AST-02, WORK-01
- **User-facing feature:** Answers feel generated and link to the relevant part of the site.
- **Description:** A brief thinking indicator and a typed/streamed reveal of answers; deep-links in answers that scroll to a section or open the matching project detail (FR-14); the engine and knowledge base are code-split so they load when the assistant is near or opened.
- **Definition of Done:** The reveal takes a couple of seconds at most, can be skipped and appears instantly under reduced motion; every entry with a target links correctly and project links open the right detail view; assistant code is absent from the initial bundle with no visible delay on open.

### AST-04 · Question coverage pass
- **Area:** AI Portfolio Assistant · **Priority:** P1 · **Depends on:** AST-02
- **User-facing feature:** The assistant handles realistic visitor questions well.
- **Description:** Write about 20 realistic visitor questions, ask them in the live assistant, and extend keywords and entries until at least 90 % get a correct, in-scope answer (PRD §15).
- **Definition of Done:** ≥ 90 % of the ~20 questions answered correctly; none produce an invented fact; the question list is kept in the repo for reference.

---

## 8. Contact

### CON-01 · Contact section and footer
- **Area:** Contact · **Priority:** P0 · **Depends on:** FND-01, FND-02
- **User-facing feature:** A clear invitation to get in touch with email, GitHub, LinkedIn and résumé links.
- **Description:** Contact section with heading and short copy, a `mailto:` link plus GitHub and LinkedIn links, and a résumé link to a PDF in the public assets (needs the file from you; hidden if none is configured); a minimal footer with name, year and a back-to-top link. No form in the MVP (FR-11; see Future).
- **Definition of Done:** All links work and open correctly with `rel="noopener"` on external ones; link labels are clear; the résumé link opens the current PDF; the footer back-to-top scrolls to the hero; renders from content at all widths.

---

## 9. Navigation / Responsive

### NAV-01 · Responsive navigation
- **Area:** Navigation / Responsive · **Priority:** P0 · **Depends on:** FND-01
- **User-facing feature:** A minimal nav that takes me to any section and shows where I am.
- **Description:** A sticky top bar with the site mark and anchor links to each section (FR-1, FR-2); smooth scrolling (instant under reduced motion) with the hash updating and a scroll offset so headings are not covered; active-section highlighting while scrolling; a collapsed menu on phones that opens and closes by tap, Esc and link selection.
- **Definition of Done:** Every link scrolls to the correct section; exactly one link is active at a time, including scrolling up; the mobile menu manages focus and is usable at 360 px; smooth scroll falls back to instant under reduced motion.

### NAV-02 · Responsive layout pass
- **Area:** Navigation / Responsive · **Priority:** P0 · **Depends on:** HERO-01, BUILD-01, WORK-01, TECH-01, ABOUT-01, AST-02, CON-01
- **User-facing feature:** The whole site works from phone to large desktop, smoothly.
- **Description:** Verify and fix every section's layout across phone, tablet and large desktop; remove horizontal scroll, clipping and overlap; use lower pixel ratio and lighter scenes (fewer nodes) on small or low-power devices so the 3D stays smooth on phones.
- **Definition of Done:** No horizontal scroll or clipped content at 360, 768, 1280 and 1920 px; touch targets are comfortably tappable; the Core and tech universe render smoothly on a phone with all content available.

---

## 10. Motion / Visual Polish

### MOT-01 · Scroll motion and transitions
- **Area:** Motion / Visual Polish · **Priority:** P1 · **Depends on:** HERO-02, NAV-01, WORK-01
- **User-facing feature:** Scrolling feels like moving through one continuous 3D space.
- **Description:** A consistent reveal (fade, rise, slight depth) for headings and panels as they enter the viewport; scroll-linked parallax linking the grid, Core and panel depth into one camera move; gradual background glow and grid shifts between sections so there are no hard seams.
- **Definition of Done:** All sections share the same reveal and each reveals once; parallax layers move smoothly at different rates with scrolling never hijacked or slowed; no visible seams between sections; all of it is static under reduced motion.

### MOT-02 · Visual consistency and performance pass
- **Area:** Motion / Visual Polish · **Priority:** P1 · **Depends on:** BUILD-01, WORK-01, TECH-01, ABOUT-01, AST-02, CON-01
- **User-facing feature:** The site looks cohesive, premium and stays smooth.
- **Description:** Unify border, glow, hover, focus and press states across cards, project panels, the assistant and tags; review spacing, alignment, type scale and focal points (one per viewport); pause 3D rendering when off-screen, cap pixel ratio, reuse geometry and materials, and lazy-load heavy parts.
- **Definition of Done:** One shared set of panel states with no one-off styles; spacing and type follow the tokens everywhere, reviewed section by section with you; off-screen scenes do not render; scrolling stays smooth on a mid-range laptop and initial JS is lean (3D and assistant split out).

### MOT-03 · Atmosphere extras
- **Area:** Motion / Visual Polish · **Priority:** P2 · **Depends on:** HERO-01
- **User-facing feature:** Extra atmosphere: faint particles, a cursor glow and gentle per-section accent shifts.
- **Description:** A sparse particle or haze layer behind the Core, a soft cursor-following glow on desktop, and subtle variation between the two accent colours per section.
- **Definition of Done:** Effects never reduce text contrast or frame rate; particles are removed on small devices; everything is disabled on touch where relevant and under reduced motion.

---

## 11. Accessibility / Fallbacks

### A11Y-01 · Semantics, keyboard and focus
- **Area:** Accessibility / Fallbacks · **Priority:** P0 · **Depends on:** NAV-01, WORK-01, AST-02
- **User-facing feature:** The site makes sense to assistive tech and works fully by keyboard.
- **Description:** Landmarks (`header`, `nav`, `main`, `footer`), one `h1`, logical heading order, labelled sections and a skip link; a visible accent-colour focus ring and logical tab order across nav, cards, project panels, filters, the assistant and contact links; the project dialog and mobile menu keep focus correctly.
- **Definition of Done:** The heading outline is correct and each section is a labelled landmark; every interactive element can be reached and operated by keyboard with focus always visible; focus never escapes an open dialog or menu and returns to its opener on close.

### A11Y-02 · Reduced motion and no-WebGL fallbacks
- **Area:** Accessibility / Fallbacks · **Priority:** P0 · **Depends on:** HERO-01, TECH-01, FND-03
- **User-facing feature:** The site is still impressive and fully usable without 3D or with motion turned off.
- **Description:** Respect `prefers-reduced-motion` everywhere (no auto-motion, parallax or typing animation); when WebGL is unavailable or motion is reduced, show a static or CSS/SVG AI Core and a 2D grouped tech list with the same descriptions and category filter (FR-17).
- **Definition of Done:** With the OS setting on, nothing moves on its own and all content and interactions still work; with WebGL disabled the hero shows the fallback Core with all text and the stack shows every technology, category, description and working filter; no console errors in either case.

### A11Y-03 · Contrast and assistive-tech polish
- **Area:** Accessibility / Fallbacks · **Priority:** P1 · **Depends on:** A11Y-01, MOT-02, AST-02
- **User-facing feature:** Text is always readable over the glow, and screen-reader users get the full experience.
- **Description:** Check text against backgrounds and glows in every section and adjust tokens or scrims; add a live region so new assistant answers are announced; give every control an accessible name; add alt text for informative images and descriptive link text; make tech nodes keyboard-accessible (or make the list alternative the keyboard path).
- **Definition of Done:** Text meets WCAG AA contrast in every section; new answers are announced once; no unlabelled informative image or icon-only control; a keyboard user can read every technology's description and operate the filter.

---

## 12. SEO / Release

### REL-01 · Metadata and share card
- **Area:** SEO / Release · **Priority:** P0 · **Depends on:** FND-01
- **User-facing feature:** A proper tab title, icon and a good preview when the link is shared.
- **Description:** Page title, meta description, favicon, theme colour, Open Graph and Twitter tags, and an original 1200×630 share image in the lab style.
- **Definition of Done:** All tags are in the built HTML; the description matches the tagline; the share image is original and its URL resolves on the deployed site.

### REL-02 · Production build and deployment
- **Area:** SEO / Release · **Priority:** P0 · **Depends on:** REL-01, NAV-02, A11Y-01, A11Y-02, AST-02, CON-01
- **User-facing feature:** The portfolio is live at a public HTTPS URL.
- **Description:** Confirm a clean production build, preview it locally, check bundle sizes and asset paths; confirm the shipped site sets no tracking cookies, loads no analytics and exposes no secrets or private data; deploy to a free static host (Vercel, Netlify or Cloudflare Pages — your choice, PRD open question 4) with build settings configured and redeploy steps documented.
- **Definition of Done:** `npm run build` succeeds from a clean install; the previewed build works with no console errors or missing assets; built output has no analytics scripts or keys; the public URL serves the latest build over HTTPS.

### REL-03 · Performance tuning
- **Area:** SEO / Release · **Priority:** P1 · **Depends on:** REL-02, MOT-02
- **User-facing feature:** Fast load and a smooth page.
- **Description:** Measure the deployed site against the PRD targets and fix the largest issues (images, fonts, JS size).
- **Definition of Done:** Lighthouse desktop Performance ≥ 85 and Accessibility ≥ 95 on the deployed site.

### REL-04 · Portfolio README
- **Area:** SEO / Release · **Priority:** P1 · **Depends on:** FND-01
- **User-facing feature:** (Internal) a repo that explains itself.
- **Description:** Replace the old README with a short description of the portfolio, how to run and build it, how to edit content, and how it deploys.
- **Definition of Done:** README describes only the portfolio; a new reader can run it and add a project by following it.

### REL-05 · Custom domain and search files
- **Area:** SEO / Release · **Priority:** P2 · **Depends on:** REL-02
- **User-facing feature:** A personal web address and indexable site.
- **Description:** Attach a custom domain with HTTPS if you want one; add a simple `robots.txt` and one-page sitemap.
- **Definition of Done:** Domain serves the site over HTTPS and the host's default URL redirects to it; both files are served from the deployed root with the correct URL.

---

## MVP backlog

The MVP is every **P0** and **P1** item: 17 P0 + 10 P1 = 27 items. The 3 **P2** items are optional polish.

### P0 (17)

- **FND-01** — Portfolio shell and design system
- **FND-02** — Content model and core content
- **FND-03** — 3D and motion infrastructure
- **HERO-01** — Hero with animated grid and AI Core
- **BUILD-01** — Capability cards
- **WORK-01** — Project panels and detail view
- **TECH-01** — Interactive tech universe
- **ABOUT-01** — About section
- **AST-01** — Assistant knowledge and answering
- **AST-02** — Assistant interface
- **CON-01** — Contact section and footer
- **NAV-01** — Responsive navigation
- **NAV-02** — Responsive layout pass
- **A11Y-01** — Semantics, keyboard and focus
- **A11Y-02** — Reduced motion and no-WebGL fallbacks
- **REL-01** — Metadata and share card
- **REL-02** — Production build and deployment

### P1 (10)

- **HERO-02** — Interactive AI Core
- **WORK-02** — Floating project panels
- **TECH-02** — Universe motion and interaction
- **AST-03** — Assistant polish
- **AST-04** — Question coverage pass
- **MOT-01** — Scroll motion and transitions
- **MOT-02** — Visual consistency and performance pass
- **A11Y-03** — Contrast and assistive-tech polish
- **REL-03** — Performance tuning
- **REL-04** — Portfolio README

### Optional polish — P2 (3)

- **FND-04** — Retire unused dashboard code
- **MOT-03** — Atmosphere extras
- **REL-05** — Custom domain and search files

---

## Dependency / order summary

Build the foundation first, then each section's core, then interactions, then polish and release. Items in the same phase do not depend on one another.

| Phase | Goal | Items |
|---|---|---|
| **1 — Foundation** | A themed, content-driven shell with 3D and motion ready | FND-01 → FND-02, FND-03 |
| **2 — Hero and core sections** | The page reads end to end | HERO-01, BUILD-01, WORK-01\*, TECH-01\*, ABOUT-01, CON-01 |
| **3 — Navigation** | Move through the page | NAV-01 |
| **4 — Assistant** | The interactive centrepiece | AST-01 → AST-02 |
| **5 — Fallbacks and responsive** | Works on phones, without WebGL, by keyboard | A11Y-02, A11Y-01, NAV-02 |
| **6 — Release v1** | A live, shareable MVP of all P0 items | REL-01, REL-02 |
| **7 — P1 features** | Interactions and quality | HERO-02, WORK-02, TECH-02, AST-03, AST-04, MOT-01, MOT-02, A11Y-03, REL-03, REL-04 |
| **8 — Optional (P2)** | Only if time remains | MOT-03, REL-05, FND-04 |

\* Needs your content (projects for WORK-01, stack review for TECH-01); FND-02 also needs your core copy.

### Critical paths

- **Assistant:** FND-02 + WORK-01 + TECH-01 + ABOUT-01 → AST-01 → AST-02 → AST-03 / AST-04
- **Hero:** FND-01 → FND-03 → HERO-01 → HERO-02 → MOT-01
- **Release:** all P0 sections + NAV-02 + A11Y-01/02 → REL-02 → REL-03

### Cross-cutting rules

- **No P0 item depends on a P1 or P2 item**, so the P0 set alone is a complete, shippable portfolio (release v1 in phase 6).
- **FND-03** is the single prerequisite for both 3D visuals (HERO-01, TECH-01), and A11Y-02 gives both a mandatory fallback.
- **The assistant knowledge base (AST-01)** reuses project, stack, About and profile content, so it can only be finished after that content exists.
- **FND-04** (retiring the old dashboard code) is last and needs your explicit approval; nothing is deleted before then.

---

## Future (outside the MVP)

Ideas from PRD §14 and the old backlog; each needs separate approval before work starts. Not counted in the MVP.

| ID | Idea | Depends on | Notes |
|---|---|---|---|
| FUT-01 | LLM-backed assistant (optionally with voice input/output) | AST-02 | Small serverless endpoint grounded in the portfolio content; API key server-side only; rate limiting; automatic fallback to the deterministic assistant. |
| FUT-02 | Case-study pages, project media and a "lab notes" writing section | WORK-01 | Deeper write-ups with diagrams, screenshots or short clips, plus simple posts as content files. |
| FUT-03 | Theme and delight: light theme or accent switcher, easter eggs, opt-in sound | FND-01, FND-03 | Sound is off by default; none of it may interfere with accessibility. |
| FUT-04 | Live GitHub data in the Tech Universe | TECH-01 | Static fallback when unavailable; no tokens in the client. |
| FUT-05 | Working contact form | CON-01 | Third-party form endpoint (FR-11 optional form; the PRD puts the form backend outside the MVP); needs spam protection. |
