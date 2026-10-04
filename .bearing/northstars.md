# North-stars — AI-Work-Intelligence

**This file is AUTHORITATIVE.** It outranks every other doc, comment, and any agent's own
inference. When a source conflicts with a north-star, **the north-star wins and that source is
stale** — say so rather than silently averaging the two.

---

## What earns a place here

A north-star is a fixed point someone would otherwise **re-litigate, re-derive, or contradict** —
and the cost of that is real. Four kinds earn a number:

- **Invariants** — what must always hold, and what breaks when it doesn't. The good ones name the
  incident: *"uninstall once deleted the user's own notes because the directory looked ours."*
- **Term meanings** — the word this project uses in a non-obvious way. If two people can read
  "active user" differently, one of them is writing the wrong query.
- **Settled decisions** — chosen, with the reason, so it stops being reopened every quarter.
- **Rejected ideas** — the graveyard. This is the half people skip and the half that pays: without
  it, a good-sounding idea that was already measured and killed comes back every six months.

**What does NOT earn one:** anything the code already says, anything a linter enforces, style
preferences, and anything you would happily change next week. A file of forty soft opinions
anchors nothing — the agent skims it and the real invariants drown.

## Format

Number them `NS-#`, one claim each, and lead with the claim itself:

```
- **NS-#** — **The headline claim, stated in one sentence.** Then the mechanism, the numbers, or
  the incident that makes it true. Cite what you measured, not what you assume.
```

Two rules make the difference between a doc and an anchor:

1. **Claim first.** The re-anchor hook re-injects only the opening sentence of each entry, so an
   entry that opens with background and buries the rule delivers a cliffhanger and nothing else.
2. **Never renumber.** A number is a citation; reusing one silently rewrites every reference to it.
   Retire an entry by moving it under a "Superseded" heading with a line saying what replaced it.

Group them under headings as they accumulate — invariants, evidence, settled, open, superseded.
The order does not matter to the tooling; it matters to the person reading at 2am.

## How they get used

- **Session start** — you are told to read this file before forming any premise.
- **Mid-session** — the anchor hook re-injects the claims every N tool calls and after you write a
  doc, because that is when a drifted premise gets written down and becomes "settled".
- **When work is delegated** — the relevant subset goes to every subagent, so a fan-out cannot
  quietly contradict a decision you already made.
- **In review** — a finding that cites a north-star is a finding you can act on without arguing.

## Writing the first few

You do not have to invent them. They already exist, as scar tissue:

- The last three bugs that were **the same bug** wearing different clothes.
- Whatever you explained twice in review this month.
- The decision you keep having to defend.
- The thing a new person always gets wrong in their first week.

Ask your agent to propose a set from the repository's own history — `git log` for the reverts and
the "actually, no" commits, the review threads, the incident notes — then **edit hard**. Something
proposed and never checked is not a fixed point, it is a guess with a number on it.

<!-- Add your first entry below. Delete the guidance above whenever you like — this file is yours,
     and bearing seeds it once and never overwrites it. -->

## Invariants — must always hold

*Project: **AI Developer Lab**, a cinematic single-page personal portfolio (`PRD.md`).*

- **NS-13** — **Premium but simple: one strong visual idea, executed consistently.** The AI Core and the lab around it are the idea; every effect must serve it, and each viewport has one focal point. Many small effects dilute it. (PRD §6, §9)
- **NS-14** — **The content works without any enhancement.** Every fact, project, stack item and link exists as real, readable text first; 3D, motion and the assistant are layers on top, never the only way to reach information.
- **NS-15** — **Every enhancement degrades to a working simpler version.** With no WebGL or with reduced motion, the Core and tech universe become static or 2D with all content intact; the assistant works with no network. A failure of a layer never leaves a broken page. (FR-15, FR-17)
- **NS-16** — **Accessibility is part of the design, not a final pass.** Semantic structure, full keyboard operation, visible focus, readable contrast over glows, and `prefers-reduced-motion` are built in from the first component.
- **NS-17** — **Scrolling is never hijacked, slowed or blocked.** Motion is eased and bounded, reveals happen once, and nothing prevents the visitor from reading or moving on.
- **NS-18** — **Performance is a feature with a budget.** First meaningful paint under about 2.5 s, a 60 fps target, Lighthouse Performance ≥ 85 and Accessibility ≥ 95; 3D and the assistant are lazy-loaded, pause when off-screen, and get lighter on small devices.
- **NS-19** — **Everything is original.** No copying of any reference site, video or asset; procedural geometry over model files; only original or properly licensed fonts and images; no human figure or avatar.
- **NS-20** — **The assistant speaks only from portfolio content and never invents a fact.** Out-of-scope questions get a polite redirect, whichever way the assistant is built.
- **NS-21** — **Content lives in typed content files.** Adding a project or stack item is a content-only edit with no component changes; copy is never hard-coded in components.
- **NS-22** — **The site is private by default.** No analytics, no tracking cookies, no secrets in the client bundle, and no personal data collected beyond an optional contact message.

## Settled — decided; do not relitigate

- **NS-23** — **The product is a single-page static portfolio with seven sections in a fixed order** (Hero, What I Build, Selected Work, Tech Universe, About, Assistant, Contact). No accounts, auth, CMS, database, blog or other app features in the MVP; it is a personal portfolio, not an enterprise product.
- **NS-24** — **Scope is governed by `BACKLOG.md`: MVP = P0 + P1; P2 is optional; FUT items each need separate approval.** The approved `ESTIMATE.md` sizes the 30 current items; nothing outside them is built without a new decision.
- **NS-25** — **Build on the existing toolchain: strict TypeScript, ESLint, Prettier, Vite + React 19 in `apps/web`, npm workspaces, Node ≥ 22.9.** Lint, typecheck and build must pass. The old dashboard code is out of scope and is not deleted without explicit approval (FND-04).
- **NS-30** — **The site presents Thani honestly as a QA and automation engineer, and the lab design is the craft showcase.** Every claim (role, dates, employer, client, skills, projects) comes from the résumé or from facts the owner states in chat; nothing is inferred or inflated, because the assistant repeats whatever the content says (`NS-20`). The 3D lab, the accessibility and the assistant are shown as evidence of care and engineering, not claimed as job experience. Decided by the owner on 2026-10-04 after the résumé review (option A).
- **NS-29** — **Settled: the MVP assistant is a deterministic client-side matcher, not LLM-backed.** Chosen in `ADR-0001` (2026-10-03) because it works offline with no server or key and cannot invent facts; the chat interface and answer format stay engine-independent so an LLM engine can be added later as FUT-01, which needs separate approval. Revisit only if the AST-04 coverage pass cannot reach 90%.

## Graveyard — tried or rejected; do not re-propose without new evidence

- **NS-27** — **Rejected: the AI Work Intelligence dashboard as the project** (usage analytics, a backend, a database, AI insights). Replaced by the portfolio; the old brief is kept only as `PRD.legacy-dashboard.md` and is not to be revived or mixed in.
- **NS-28** — **Rejected: a literal 3D human or avatar, and any design modelled on a specific reference site.** The distinctive element is the original AI Core.

## Open

- Final project list and contact method (mailto vs. form) (PRD §16). The accent colour is electric cyan (chosen 2026-10-04). The 3D and animation stack and the hosting are decided in `ADR-0002` and `ADR-0003` (see `docs/decisions.md`); the assistant is settled in `NS-29`.

## Superseded — kept so old citations still resolve

- **NS-1 – NS-6** — Retired: dashboard-era data, privacy and AI-grounding invariants. The project is now the portfolio; the nearest successors are `NS-14`, `NS-15`, `NS-20` and `NS-22`.
- **NS-7** — Retired: dashboard technology stack. Replaced by `NS-25`; technology choices are now Open.
- **NS-8** — Retired: dashboard scope and its "no testing" line. Replaced by `NS-23` and `NS-24`.
- **NS-26** — Retired 2026-10-04: "No QA or test-management concepts appear in the product or its copy." The owner's résumé is a QA and automation résumé, so the site now presents that honestly. Replaced by `NS-30`.
- **NS-9 – NS-10** — Retired: dashboard feature and insight rules. No successor.
- **NS-11 – NS-12** — Retired: dashboard graveyard entries. Replaced by `NS-27` and `NS-28`.
