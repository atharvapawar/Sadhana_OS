# Phase 26 — Contemplation Protocol & Reflective Practice Rhythm

Status: Implemented.

## Purpose

Phase 26 adds a gentle reflection layer to each existing stage detail page. The goal is to help a seeker move from reading into lived understanding without adding unsafe practice instructions or creating a new main page.

The protocol follows a simple rhythm:

1. **Observe** — see the pattern clearly without forcing.
2. **Release** — soften the old movement without shame or aggression.
3. **Integrate** — express the stage through one grounded action.

## Implementation

Added files:

- `src/data/stage-contemplation.ts`
- `src/components/stage-contemplation-protocol.tsx`
- `scripts/contemplation-protocol-check.mjs`

Updated files:

- `src/pages/stage-detail.tsx`
- `package.json`
- `scripts/doctor.mjs`
- `README.md`
- `CHANGELOG.md`
- `docs/IMPLEMENTATION_PHASES.md`

## Accessibility

The contemplation selector uses accessible tab semantics:

- `role="tablist"`
- `role="tab"`
- `role="tabpanel"`
- `aria-selected`
- `aria-controls`
- Arrow-key, Home, and End keyboard support

## Safety

This is not a diagnosis tool, therapy replacement, medical treatment, or advanced practice manual. It avoids unsafe instructions around kundalini, kriya, strong kumbhaka, advanced bandha, mudra, shatkarma, and chakra activation.

## Check command

```bash
npm run contemplation:check
```
