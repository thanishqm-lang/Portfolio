# PRD: AI Developer Lab — Personal Portfolio

> Status: Draft v1 for approval. No implementation has started.

> **Amendment after the résumé review (owner chose option A).** The owner's résumé shows a QA and automation engineer, so the site presents that honestly, with the same dark 3D lab design (north-star NS-30; NS-26 is retired). Where this amendment and the text below disagree, **the amendment wins**:
> - **Identity:** the owner is a QA and automation engineer, not an "AI × software developer". The vision paragraph, §4 goal 2 and the "What I Build" capabilities below describe the original AI-developer positioning and are replaced as follows.
> - **Hero (§7):** the headline is "QA × AUTOMATION" and the tagline is "Making software reliable, release after release." (draft copy for the owner to approve). The name line is "THANISHQ" (the owner removed "Thani" after the first draft).
> - **What I Build (§7):** the four cards become Manual testing, Test automation, CI/CD and tooling, and Quality in Agile teams, written from the résumé only.
> - **Tech Universe categories (§7):** Testing types, Automation tools, Languages, Version control and CI/CD, Tracking and methodology (replacing AI/LLM, Frontend, Backend, Tooling/Cloud).
> - **Selected Work (§7):** projects are the owner's real projects from the résumé, plus this portfolio as a personal project; client work has no public links.
> - **§5 non-goal "No QA/test-management concepts"** no longer applies.
> - **The 3D lab, the assistant, accessibility and performance targets are unchanged.**

## 1. Product Vision

**AI Developer Lab** is a cinematic, single-page personal portfolio for Thani (Thanishq), an AI × software developer. A visitor lands in a dark, futuristic "lab" with a glowing AI Core at its centre, scrolls through floating project panels and an interactive technology universe, and can talk to a small AI assistant that answers questions about my work.

The site should feel like a product, not a résumé: it *shows* that I build intelligent digital experiences instead of just claiming it.

**Tagline:** "Building intelligent digital experiences."

## 2. Problem

- A plain list of projects on a CV or GitHub profile does not convey craft, taste or range.
- Managers and recruiters skim; they need a strong impression and the key facts within seconds.
- Generic template portfolios look the same and say nothing distinctive about an AI-focused developer.
- I have no single, polished place to point people at.

## 3. Target Users

| User | Needs from the site |
|---|---|
| **My manager / colleagues** (primary) | Quick, credible view of what I build and my technical range; something worth sharing internally. |
| **Recruiters / hiring managers** | Skills, selected work, and a clear way to contact me. |
| **Fellow developers / collaborators** | Project details, stack, links to code and demos. |
| **Me** | A site I can maintain by editing one content file and be proud to link. |

## 4. Product Goals

1. Make a strong first impression within the first 5 seconds (hero + AI Core).
2. Communicate four things clearly: I build **AI experiences**, **modern web apps**, **automation/software solutions** and **intelligent developer tools**.
3. Present 3–5 selected projects with enough substance to be credible.
4. Show my stack as an explorable, memorable visual rather than a badge list.
5. Offer a small AI Portfolio Assistant that makes the site interactive and demonstrates AI skills first-hand.
6. Stay simple to build, host and maintain; content lives in one place.
7. Be original: inspired by modern cinematic 3D portfolios, copying none.

## 5. Non-Goals

- Not an enterprise application or SaaS product.
- No user accounts, authentication, admin panel or CMS.
- No analytics or visitor tracking, and no file or data imports.
- No database in the MVP (content is static).
- No blog, e-commerce, comments or multi-language support in the MVP.
- No literal 3D human/avatar and no copying of any reference site, video or asset.
- No QA/test-management concepts anywhere in the product or its copy.
- Not a general-purpose chatbot: the assistant only discusses me and my work.

## 6. Core User Experience

1. **Arrive**: a dark scene fades in; the grid drifts; the AI Core pulses; the name and headline resolve.
2. **Scroll**: smooth, scroll-linked camera/parallax motion moves the visitor through the lab section by section. Transitions are elegant, never gimmicky.
3. **Explore**: project panels float in 3D space and respond to pointer movement; the tech universe can be hovered/dragged and filtered.
4. **Ask**: the visitor opens the assistant, taps a suggested question or types their own, and gets a concise, accurate answer.
5. **Connect**: a clear contact section with links and a short message path.

Principle: **premium but simple**. One strong visual idea (the AI Core and its surrounding lab), executed consistently, instead of many effects.

## 7. Main Portfolio Sections

1. **Hero** — "THANI / THANISHQ", "AI × SOFTWARE", "Building intelligent digital experiences." Central AI Core visual over an animated grid; scroll cue.
2. **What I Build** — four capability cards: AI experiences · Modern web applications · Automation & software solutions · Intelligent developer tools. Each has a one-line description and an icon/mini-visual.
3. **Selected Work** — 3–5 floating project panels (title, one-line pitch, stack tags, role, links). Click opens an expanded view with a short case-study summary.
4. **My Stack / Tech Universe** — technologies as nodes orbiting or clustered around the core, grouped by category (AI/LLM, Frontend, Backend, Tooling/Cloud). Hover reveals what I use it for; categories can be filtered.
5. **About** — short bio, what drives me, how I work, current focus. Text-led; no avatar.
6. **AI Portfolio Assistant** — conversational panel (see §8).
7. **Contact** — email, GitHub, LinkedIn, résumé link, optional simple contact form/mailto.

Persistent: minimal top navigation with section anchors, and a footer.

## 8. AI Portfolio Assistant — Concept

A small AI-style interface where visitors ask about my skills, projects, experience and technologies.

**Behaviour**
- Opens as a panel/terminal-style interface themed to the lab ("Ask the Lab").
- Shows 4–6 suggested prompts (e.g. "What do you build?", "Which AI projects have you shipped?", "What's your strongest stack?", "How can I contact you?").
- Streams or types out answers with a subtle thinking animation.
- Answers are **grounded only in my portfolio content** (a structured knowledge file). If a question is out of scope, it says so politely and redirects.
- Where relevant, answers link to or highlight the matching section/project.

**Implementation approach (decision for the next step, not now)**
- *Baseline (MVP, required):* a deterministic, client-side assistant that matches questions to curated Q&A / content entries. Works offline, free, no secrets, cannot hallucinate.
- *Optional upgrade:* a thin serverless endpoint calling an LLM with the portfolio content as grounding, with the API key kept server-side, rate limiting, and automatic fallback to the baseline.

The site must remain fully functional if the LLM path is absent or fails.

## 9. Visual / Design Direction

- **Mood:** dark, futuristic, cinematic; deep near-black background with restrained neon accent glow (one primary accent, one secondary).
- **Background:** subtle animated grid with depth/perspective, faint particles/haze.
- **Centrepiece:** an abstract AI Core — a glowing orb/lattice/rings structure that reacts to scroll and pointer. Original geometry; no human figure.
- **Motion:** smooth eased scroll-linked 3D movement, floating panels, soft parallax; transitions between sections feel like moving through one space.
- **Panels:** glassy, thin-bordered cards with soft glow, consistent radius and spacing.
- **Typography:** a modern geometric/grotesk display face for headings plus a clean sans body and a mono accent for "lab" labels. Strong scale contrast and hierarchy.
- **Hierarchy & restraint:** generous whitespace, one focal point per viewport, limited palette.
- **Originality:** may share a *genre* with cinematic 3D portfolios; layout, core visual, copy and assets are my own.
- **Accessibility of the style:** sufficient text contrast over effects, visible focus states, `prefers-reduced-motion` support.

## 10. Functional Requirements

**Layout & navigation**
- FR-1: Single-page site with the seven sections in order, anchor navigation and smooth scroll.
- FR-2: Sticky minimal nav highlighting the current section; usable on mobile (collapsed menu).

**Hero & AI Core**
- FR-3: Hero shows the name, "AI × SOFTWARE" and the tagline, with an animated 3D AI Core and animated grid background.
- FR-4: The Core responds to pointer movement (desktop) and scroll progress.

**What I Build / Selected Work**
- FR-5: Capability cards render from content data.
- FR-6: Projects render as floating panels from content data; each opens a detail view (title, summary, my role, stack, links).
- FR-7: Panel hover/tilt interaction on pointer devices; simple stacked layout on touch.

**Tech Universe**
- FR-8: Interactive visual of technologies grouped by category; hover/tap shows a short description.
- FR-9: Category filter highlights the relevant nodes.

**About & Contact**
- FR-10: About section renders bio and focus areas from content data.
- FR-11: Contact section provides email (mailto), GitHub, LinkedIn and résumé links; optional simple form via a third-party form endpoint.

**AI Portfolio Assistant**
- FR-12: Chat-style UI with suggested prompts, free-text input, typed/streamed response animation and a visible reset.
- FR-13: Answers drawn only from portfolio content; out-of-scope questions get a graceful redirect.
- FR-14: Answers may deep-link to a section or project.
- FR-15: Works with no network/LLM (deterministic baseline).

**Content**
- FR-16: All copy, projects, stack and assistant knowledge live in typed content files, so updates need no component changes.

**Fallbacks**
- FR-17: If WebGL is unavailable or reduced-motion is set, show a static/2D version of the Core and tech universe with all content intact.

## 11. Non-Functional Requirements

- **Performance:** first meaningful paint under ~2.5 s on a mid-range laptop on broadband; 60 fps target on typical hardware; lazy-load 3D assets and the assistant; keep initial JS lean and total transfer modest.
- **Responsiveness:** works from ~360 px mobile to large desktop; 3D scenes scale down or simplify on small/low-power devices.
- **Accessibility:** semantic HTML, keyboard-navigable, visible focus, adequate contrast, alt text, `prefers-reduced-motion`, readable without WebGL.
- **Browser support:** current Chrome, Edge, Safari, Firefox.
- **SEO & sharing:** proper title/meta description, Open Graph image, sensible heading structure.
- **Privacy & security:** no tracking cookies; no secrets in the client bundle; any LLM key is server-side only; no collection of personal data beyond an optional contact message.
- **Maintainability:** strict TypeScript, content-driven components, lint/typecheck/build passing, small readable codebase.
- **Resilience:** every enhancement (3D, LLM) degrades to a working simpler version.

## 12. Technical Constraints

- **Reuse the existing repo scaffold:** npm workspaces monorepo, TypeScript (strict), ESLint, Prettier, Node ≥ 22.9, Vite + React 19 in `apps/web`.
- **Likely additions (to be confirmed in the architecture step):** Three.js via React Three Fiber (+ drei) for 3D; a lightweight animation library (e.g. Motion/GSAP) for transitions; CSS variables for theming.
- **Backend:** none required for MVP. A single serverless function is added only if the optional LLM-backed assistant needs a server-side proxy.
- **Existing code:** the current repository contents are out of scope for this PRD. How the repo is restructured for the portfolio is decided in a later, approved step.
- **Hosting:** static hosting (e.g. Vercel/Netlify/Cloudflare Pages) with a free tier.
- **Assets:** only original or properly licensed models, fonts and images; prefer procedural geometry/shaders over heavy model files.
- **Budget:** no paid services required for MVP.

## 13. MVP Scope

**In scope**
- All seven sections, content-driven.
- Hero with animated grid + AI Core (procedural 3D).
- 4 capability cards, 3–5 project panels with detail view.
- Interactive tech universe with categories.
- Deterministic AI Portfolio Assistant with suggested prompts and section deep-links.
- Contact links (+ mailto).
- Responsive layout, reduced-motion and no-WebGL fallbacks.
- Basic SEO/OG metadata, deployable to static hosting.

**Out of scope for MVP**
- LLM-backed assistant, contact form backend, blog, CMS, analytics, i18n, theming toggle, case-study subpages.

## 14. Future Ideas

- LLM-backed assistant with grounded retrieval, streaming and rate limiting.
- Voice input/output for the assistant.
- Full case-study pages per project with diagrams and metrics.
- Light theme or accent-colour switcher.
- Easter eggs inside the lab (keyboard shortcuts, hidden terminal commands).
- Live GitHub activity/stars integration in the tech universe.
- Writing/blog or "lab notes" section.
- Sound design (opt-in, off by default).

## 15. Success Criteria

- **Impression:** my manager can open the site, understand within ~10 seconds what I do, and would be comfortable sharing it.
- **Clarity:** the four build areas, the selected projects and my contact options are findable without instruction.
- **Distinctiveness:** the design reads as original; no direct resemblance to any specific reference site.
- **Assistant:** answers the suggested prompts and ≥ 90 % of a self-written set of ~20 realistic visitor questions correctly and in scope; never invents facts not in my content.
- **Quality:** Lighthouse Performance ≥ 85 and Accessibility ≥ 95 on desktop; no console errors; `npm run lint`, `typecheck` and `build` pass.
- **Robustness:** usable on a phone, with reduced motion, and with WebGL disabled.
- **Maintainability:** adding a project or stack item requires editing only the content file.

## 16. Open Questions (for approval)

1. Final project list and exact copy for "Selected Work" (which 3–5 projects, and links/screenshots available?).
2. Accent colour preference (e.g. electric cyan, violet, or cyan + magenta)?
3. Is a real LLM-backed assistant desired for v1, or is the deterministic baseline acceptable?
4. Hosting target and custom domain, if any.
5. Contact: mailto only, or a working form?
6. How should the existing repository contents be restructured for the portfolio (decide in a later step)?
