# Decision log

One row per technology decision. The ADR holds the full reasoning; this
table is the index. `tech-decision` maintains it.

| Date | Key | Choice | Recommended | Why it was chosen | ADR | Status |
| --- | --- | --- | --- | --- | --- | --- |
| 2026-10-03 | assistant approach | Deterministic client-side matcher | Deterministic client-side matcher | Works offline with no server or key (NS-15, NS-20, NS-22); already sized in ESTIMATE.md | ADR-0001 | Accepted |
| 2026-10-03 | 3D and animation stack | React Three Fiber + drei + Motion | React Three Fiber + drei + Motion | React-idiomatic, lazy-loaded outside the initial bundle, scroll motion without hijacking scroll (NS-17, NS-18) | ADR-0002 | Accepted |
| 2026-10-03 | hosting | Vercel | Cloudflare Pages | User chose Vercel for the smoothest Vite deploy and branch previews; accepts Hobby plan personal-use terms | ADR-0003 | Accepted |
