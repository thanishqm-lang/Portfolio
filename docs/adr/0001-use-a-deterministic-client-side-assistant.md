# ADR-0001: Use a deterministic client-side assistant for the MVP

- Status: Accepted
- Date: 2026-10-03
- Task: AST-01, AST-02
- Deciders: Thani (answered in the tech-decision conversation)
- Area: llm provider and models (assistant approach)
- Reversibility: cheap: the chat interface and answer format stay the same, so an LLM-backed engine can be added later as FUT-01 without redoing the UI

## Context

- PRD §8 requires a deterministic, client-side baseline and treats an LLM-backed assistant as an optional upgrade with automatic fallback; PRD §16 question 3 and north-star NS-29 left the choice open.
- North-stars that bear on it: NS-15 (works with no network), NS-20 (never invents a fact), NS-22 (no secrets in the client, no tracking), NS-18 (performance budget).
- `BACKLOG.md` AST-01 and AST-02 are approved on a deterministic matcher and sized at 6–10 h and 5–8 h in `ESTIMATE.md`.
- The knowledge base is small: seven sections, 3–5 projects and about 30 stack items, roughly 5–8k tokens (estimate, not measured).
- Not known: expected traffic and spend if an LLM were used. Assumed fewer than 100 questions a day and a cap of a few dollars a month.

## What else was considered

| Option | Why not | Would suit |
| --- | --- | --- |
| Deterministic client-side matcher (chosen) | Weaker on freely-phrased questions; needs the AST-04 coverage pass to reach 90% of about 20 questions | A static site that must work offline, cost nothing and never invent facts |
| LLM-backed via a serverless proxy, with the deterministic fallback | Adds a serverless function, a server-side key, rate limiting, a spend cap and a prompt-injection check; about +8–14 h (estimate, FUT-01); constrains hosting | A launch where a live LLM call is essential to the pitch, or where the matcher cannot reach 90% coverage |
| Hybrid: matcher first, LLM for low-confidence misses | Needs the same server pieces as the LLM option plus two engines kept in sync | Cheap natural-language fallback once a server exists |
| Small model running in the browser | Hundreds of MB to download; breaks the NS-18 performance budget | A product where the model download is acceptable |

## Decision

We will build the MVP assistant as a deterministic, client-side matcher over curated portfolio content, because it meets NS-15, NS-20 and NS-22 with no server and no secret, release v1 then depends on no server or vendor, and the approved estimate already assumes it. The chat interface and the answer format are kept independent of the engine so an LLM-backed engine can be added later.

## Consequences

- No server, API key or rate limiting is needed for the MVP; hosting can be fully static.
- Free-form phrasing is handled only as well as the curated keywords and entries allow; AST-04 is the check on this.
- Revisit if AST-04 cannot reach 90% correct answers on about 20 realistic visitor questions, or if you decide a live LLM call is essential to the portfolio's pitch (then open FUT-01).

## Commits us to

No new libraries: a plain TypeScript matcher in `apps/web`.
