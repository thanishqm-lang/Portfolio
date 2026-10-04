# ESTIMATE: AI Developer Lab — Personal Portfolio

> Based only on `PRD.md` and `BACKLOG.md` (both unchanged). Covers the 30 current backlog items. The 5 FUT items are listed separately at the end and are **not** estimated or counted. No implementation has started.

## How to read this

**Assumptions**
- One developer working solo, comfortable with React and TypeScript, using AI assistance while building.
- Hours are focused working hours. They include building the item and meeting its Definition of Done. They do **not** include calendar time spent waiting on you (choosing projects, approving copy, picking a host or domain).
- Ranges are deliberately wide. They are planning figures for a personal portfolio, not commitments.
- The 3D work uses procedural geometry only (no model files), as the PRD requires.

**Size guide**
- **S**: small, straightforward work.
- **M**: moderate work with some interaction or integration.
- **L**: complex work involving 3D, animation, responsive behaviour, or several moving parts.

---

## P0: essential (17 items)

| ID | Title | Priority | Size | Hours | Main reason for the estimate | Dependencies |
|---|---|---|---|---|---|---|
| FND-01 | Portfolio shell and design system | P0 | M | 5–8 | Design tokens, three font roles and shared primitives; the shell must sit beside the existing code without touching it | — |
| FND-02 | Content model and core content | P0 | M | 5–8 | Typed content modules are quick; entering real, approved copy takes the time | FND-01 |
| FND-03 | 3D and motion infrastructure | P0 | M | 4–7 | Library setup, lazy canvas wrapper, WebGL detection, scroll and reduced-motion hooks; no visuals yet | FND-01 |
| HERO-01 | Hero with animated grid and AI Core | P0 | L | 8–14 | Original procedural Core plus a perspective grid; much of the time goes into getting the look right | FND-01, FND-03 |
| BUILD-01 | Capability cards | P0 | S | 3–5 | Four content-driven cards, a responsive grid and original SVG icons | FND-01, FND-02 |
| WORK-01 | Project panels and detail view | P0 | M | 7–11 | Panels plus a dialog with correct focus handling; includes choosing and writing 3–5 projects | FND-01, FND-02 |
| TECH-01 | Interactive tech universe | P0 | L | 10–16 | Data-driven 3D cluster, hover and tap detail, category filter, and a simplified small-screen layout | FND-01, FND-02, FND-03 |
| ABOUT-01 | About section | P0 | S | 3–5 | Text-led layout with chips and a short experience list | FND-01, FND-02 |
| AST-01 | Assistant knowledge and answering | P0 | M | 6–10 | Knowledge file reusing other content plus a keyword matcher with a confidence threshold | FND-02, WORK-01, TECH-01, ABOUT-01 |
| AST-02 | Assistant interface | P0 | M | 5–8 | Chat panel, suggestion chips, reset and themed styling | AST-01, FND-01 |
| CON-01 | Contact section and footer | P0 | S | 2–4 | Links, a résumé link and a minimal footer | FND-01, FND-02 |
| NAV-01 | Responsive navigation | P0 | M | 5–8 | Sticky bar, active-section tracking, smooth scroll with offset, and a mobile menu that manages focus | FND-01 |
| NAV-02 | Responsive layout pass | P0 | L | 6–10 | Fixes across every section at four widths, plus lighter 3D on phones | HERO-01, BUILD-01, WORK-01, TECH-01, ABOUT-01, AST-02, CON-01 |
| A11Y-01 | Semantics, keyboard and focus | P0 | M | 4–7 | Landmarks, skip link, focus ring and tab order across several interactive parts | NAV-01, WORK-01, AST-02 |
| A11Y-02 | Reduced motion and no-WebGL fallbacks | P0 | L | 8–12 | A second rendering of the Core and of the tech universe, kept in step with the 3D versions | HERO-01, TECH-01, FND-03 |
| REL-01 | Metadata and share card | P0 | S | 3–5 | Meta tags are quick; the original 1200×630 share image takes the time | FND-01 |
| REL-02 | Production build and deployment | P0 | S | 3–5 | Clean build, preview checks, host setup and documented redeploys | REL-01, NAV-02, A11Y-01, A11Y-02, AST-02, CON-01 |

**P0 subtotal: 87–143 hours** (S: 4 items, M: 9 items, L: 4 items)

---

## P1: important, part of the MVP (10 items)

| ID | Title | Priority | Size | Hours | Main reason for the estimate | Dependencies |
|---|---|---|---|---|---|---|
| HERO-02 | Interactive AI Core | P1 | M | 5–8 | Pointer tilt, scroll-linked motion and an intro sequence on top of the existing Core | HERO-01 |
| WORK-02 | Floating project panels | P1 | M | 5–8 | Depth, float and tilt that must stay crisp and be switched off on touch | WORK-01, FND-03 |
| TECH-02 | Universe motion and interaction | P1 | M | 5–8 | Drag-to-rotate with inertia and bounds that must not hijack page scroll | TECH-01 |
| AST-03 | Assistant polish | P1 | M | 5–8 | Typed reveal, deep-links that open project details, and code-splitting | AST-02, WORK-01 |
| AST-04 | Question coverage pass | P1 | S | 3–5 | Write about 20 questions and iterate on keywords; simple but repetitive | AST-02 |
| MOT-01 | Scroll motion and transitions | P1 | L | 8–13 | One scroll-linked camera feel across all sections without hijacking scroll | HERO-02, NAV-01, WORK-01 |
| MOT-02 | Visual consistency and performance pass | P1 | L | 6–10 | Unify states and spacing across all sections, plus off-screen rendering and bundle splitting | BUILD-01, WORK-01, TECH-01, ABOUT-01, AST-02, CON-01 |
| A11Y-03 | Contrast and assistive-tech polish | P1 | M | 4–6 | Contrast checks over glows, a live region and accessible names | A11Y-01, MOT-02, AST-02 |
| REL-03 | Performance tuning | P1 | M | 4–8 | Open-ended: depends on what the deployed measurements show | REL-02, MOT-02 |
| REL-04 | Portfolio README | P1 | S | 1–3 | Short README for the portfolio | FND-01 |

**P1 subtotal: 46–77 hours** (S: 2 items, M: 6 items, L: 2 items)

---

## P2: optional polish (3 items)

| ID | Title | Priority | Size | Hours | Main reason for the estimate | Dependencies |
|---|---|---|---|---|---|---|
| FND-04 | Retire unused dashboard code | P2 | S | 1–2 | Archive or remove an approved list of files | REL-02 |
| MOT-03 | Atmosphere extras | P2 | M | 4–7 | Particles, cursor glow and accent shifts, each switched off on small devices and under reduced motion | HERO-01 |
| REL-05 | Custom domain and search files | P2 | S | 1–3 | Domain and HTTPS settings plus two small files; DNS waiting time is not counted | REL-02 |

**P2 subtotal: 6–12 hours**

---

## Totals

| Scope | Hours |
|---|---|
| 1. P0 (17 items) | **87–143** |
| 2. P1 (10 items) | **46–77** |
| 3. P2 (3 items, optional) | **6–12** |
| 4. **MVP = P0 + P1 (27 items)** | **133–220** (about 175 as a planning midpoint) |
| P0 + P1 + P2 (everything current) | 139–232 |

Rough calendar guide for the MVP: at about 10 focused hours a week, roughly 4 months; at about 20 hours a week, roughly 2 months. This excludes time waiting on your decisions.

---

## 5. Recommended build sequence

The backlog phases are sound. Two changes make the order more realistic: prove the 3D early, and leave room for your content decisions.

1. **Foundation:** FND-01, then FND-03. Do FND-03 early because both 3D sections depend on it.
2. **First look at the hard visual:** HERO-01. If the Core looks right early, the whole site's identity is settled.
3. **Content:** FND-02 and REL-04. Hand over your core copy at this point, because later items need it.
4. **Simple sections:** BUILD-01, ABOUT-01, CON-01, NAV-01. These are quick and make the page read end to end.
5. **Work and stack:** WORK-01, then TECH-01. These need your project list and stack review.
6. **Assistant:** AST-01, then AST-02. It can only be finished once projects, stack and About content exist.
7. **Robustness:** A11Y-02, A11Y-01, then NAV-02. Do these as one block, once every section exists.
8. **Release v1:** REL-01, then REL-02. The P0 set is now a live, shareable portfolio (about 87–143 hours in).
9. **P1 interactions:** HERO-02, WORK-02, TECH-02, then AST-03 and AST-04.
10. **P1 cohesion:** MOT-01, MOT-02, A11Y-03, then REL-03 against the deployed site.
11. **Optional (P2):** MOT-03, REL-05, and FND-04 last with your approval.

---

## 6. Highest implementation risk

1. **TECH-01, Interactive tech universe.** The largest single item. It combines 3D layout, labels that must stay legible, filtering, and a phone layout in one piece, and TECH-02 builds on it.
2. **HERO-01, Hero with animated grid and AI Core.** It is the site's identity and has to be original. The risk is art direction: the time goes into iterating until it looks premium, so it could overrun.
3. **A11Y-02, Reduced motion and no-WebGL fallbacks.** Two renderings of the Core and the tech universe have to be kept in step. If the 3D designs change late, the fallbacks change too.
4. **MOT-01, Scroll motion and transitions.** A continuous scroll-linked camera feel is easy to get wrong. It must not hijack or slow scrolling, and it touches every section.
5. **NAV-02, Responsive layout pass.** It depends on seven items, so any earlier slip lands here. Keeping 3D smooth on a phone is the uncertain part.

---

## 7. Estimates that depend on information from you

| Item | What I need from you | Effect on the estimate |
|---|---|---|
| FND-01 | Accent colour; confirmation of how the repo is restructured (PRD open question 6) | Low. The restructure approach could add an hour or two. |
| FND-02 | Core copy: hero, capabilities, About, experience, contact details | Medium. Time is mostly waiting on copy; a heavy rewrite adds hours. |
| WORK-01 | Which 3–5 projects, with links and descriptions | Medium. The range assumes the projects are chosen. Missing links or material push it to the top of the range or beyond. |
| TECH-01 | Review of the stack list and descriptions | Low to medium. |
| ABOUT-01 and AST-01 | Bio and experience facts you approve as accurate | Medium. Corrections after the assistant is built mean rework in AST-01 and AST-04. |
| CON-01 | Résumé PDF and final link URLs | Low. |
| REL-01 | Public URL for the share card (needs the host or domain); preference on the image style | Low. |
| REL-02 | Hosting choice (PRD open question 4) | Low. A host you have not used adds an hour or two. |
| REL-03 | The deployed measurements | High uncertainty. It is open-ended by nature, which is why the range is wide. |
| REL-05 | Whether you want a custom domain, and which | Low. |
| MOT-02 | Your section-by-section review of the look | Medium. Review rounds add elapsed time. |

---

## Outside this estimate: Future items (not counted)

FUT-01 LLM-backed assistant (optionally with voice) · FUT-02 Case-study pages, project media and lab notes · FUT-03 Theme and delight extras · FUT-04 Live GitHub data in the tech universe · FUT-05 Working contact form.

Each needs its own approval and estimate before any work starts.
