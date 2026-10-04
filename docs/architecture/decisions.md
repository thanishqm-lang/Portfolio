# Architecture decisions: AI Developer Lab

One row per decision, and every contradiction settled once so it is not settled again, differently, in each file that runs into it. The log of technology keys is `docs/decisions.md`.

## Decisions

| Id | Title | Area | Status | Reversibility |
| --- | --- | --- | --- | --- |
| ADR-0001 | Use a deterministic client-side assistant for the MVP | assistant approach | Accepted | cheap: the chat interface and answer format stay the same, so an LLM engine can be added later as FUT-01 |
| ADR-0002 | Use React Three Fiber, drei and Motion for 3D and animation | frontend | Accepted | awkward: scenes are React Three Fiber components, so switching 3D libraries means rewriting them |
| ADR-0003 | Host the portfolio on Vercel | cloud | Accepted | cheap: a static build moves to another host by changing deploy settings and DNS |

## Conflicts that were settled

### Whether the assistant approach is settled or still Open

**Between:** ADR-0001 (Accepted: deterministic client-side assistant) and north-star NS-29 in `.bearing/northstars.md` (still lists the approach as Open).

**Decision.** ADR-0001 stands. NS-29 should move to Settled, citing ADR-0001, as NS-29 itself instructs. North-stars outrank other documents, so it is not edited without the owner's approval.

**Why.** NS-29 says the Tech Decision step must record the choice there as a Settled entry; the choice has been made and recorded in ADR-0001 and `docs/decisions.md`.

**Settled by:** Thani (approved "yes to all", 2026-10-04)

**What now has to change to match:**
- `.bearing/northstars.md`: replace Open entry NS-29 with a Settled entry citing ADR-0001, and update the Open list (done 2026-10-04).
