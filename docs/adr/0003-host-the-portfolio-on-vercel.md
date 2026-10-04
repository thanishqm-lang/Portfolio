# ADR-0003: Host the portfolio on Vercel

- Status: Accepted
- Date: 2026-10-03
- Task: REL-02, REL-05
- Deciders: Thani (answered in the tech-decision conversation, choosing against the recommendation)
- Area: cloud (static hosting)
- Reversibility: cheap: the site is a static build, so moving to another static host only changes the deploy settings and DNS

## Context

- ADR-0001 makes the site fully static: no server and no API key.
- REL-02 calls for a free static host with HTTPS and documented redeploy steps; the PRD wants no paid services (§12) and no tracking cookies (NS-22).
- The repository has no remote yet; CI is GitHub Actions (`.github/workflows/ci.yml`).
- REL-05 (a custom domain) is optional.
- Not known: whether the repository will be public and whether a custom domain is wanted. Free-tier terms change often and must be checked at deploy time.

## What else was considered

| Option | Why not | Would suit |
| --- | --- | --- |
| Vercel (chosen) | Free Hobby plan is for personal, non-commercial use and has bandwidth limits | A personal portfolio that wants zero-setup Vite and React deploys and a preview URL per branch |
| Cloudflare Pages (recommended) | A less familiar dashboard | A static or edge site that wants generous free bandwidth |
| Netlify | Free-tier limits have changed recently and need checking | Easy deploys, previews and form handling |
| GitHub Pages | Needs a public repo on the free plan; no preview deploys; little header control | Keeping everything under one account |

## Decision

We will host the portfolio on Vercel as a static Vite build, because the user prefers it and it gives the smoothest deploy for a Vite and React app, with a preview URL for each branch.

## Consequences

- The repository must be pushed to a Git host that Vercel can connect to before REL-02 can deploy.
- Cache headers and the single-page fallback are configured in a `vercel.json` file when REL-02 is built.
- The Hobby plan is for personal, non-commercial use; check the current terms and bandwidth limits at deploy time, and again if the site is ever used for paid work.
- A custom domain (REL-05) is attached in Vercel.
- Revisit if the free-plan terms or limits stop fitting, or if the site needs to serve commercial work; moving is cheap.

## Commits us to

Vercel (static hosting), Vercel CLI or Git integration for deploys.
