# PRD: AI Work Intelligence Dashboard

> Authoritative constraints live in `.bearing/northstars.md` (NS-#). This PRD defers to them.

## 1. Problem
Teams adopt AI tools but cannot see where AI saves time, what it costs, or where it is underused. Usage data is scattered and anecdotes replace evidence.

## 2. Goal
One dashboard that turns AI-usage data into clear, grounded insight on productivity, cost and adoption, and lets people ask questions of the data in plain language.

**Portfolio goal:** demonstrate AI architecture, React, TypeScript, backend, database design, professional engineering and product thinking (NS-8).

## 3. Users
- **Team lead** (primary): adoption, ROI, risk.
- **Individual contributor**: own usage patterns.
- **Finance/ops** (secondary): spend by tool and team.

## 4. MVP Scope
1. **Overview**: KPIs (active users, sessions, estimated hours saved, spend) with period-over-period trend.
2. **Usage explorer**: by tool, team and task category; date, team and tool filters; drill-down.
3. **Cost & ROI**: spend vs. estimated hours saved; assumptions visible and adjustable (NS-5).
4. **Data import**: CSV upload with schema validation and clear errors, plus a seeded demo dataset.
5. **AI Insights**: statistics computed deterministically, narrated by the LLM, each linked to its numbers (NS-1, NS-10).
6. **Ask the data**: natural-language question -> validated query spec -> chart plus the query shown (NS-2, NS-9).

Stretch: Admin/Viewer roles, CSV export, dark mode.
Out of scope: live vendor integrations, billing, mobile app, prompt/response content storage (NS-3).

## 5. Architecture (summary)
React SPA -> Fastify API (routes -> services -> repositories) -> SQLite (Drizzle). Analytics service computes all numbers; AI service calls the Anthropic API for narration and query-spec generation. Shared zod schemas in `packages/shared` define every contract (NS-4). The dashboard works without AI (NS-6).

## 6. Phases
1. Foundation: monorepo, strict TypeScript, lint, shared schemas, API and web shells, CI (lint, typecheck, build).
2. Data layer: schema, seed generator, CSV import, analytics service.
3. Dashboard UI: Overview, Usage explorer, Cost & ROI.
4. AI layer: Insights, then Ask the data, with grounding checks on model output.
5. Ship: deploy, demo GIF, architecture diagram, README written as a case study.

## 7. Open Questions
- Definitions of "active user" and "session" (see NS Open section).
