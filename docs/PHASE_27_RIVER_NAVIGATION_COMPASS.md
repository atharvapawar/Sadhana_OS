# Phase 27 — River Navigation Compass

Phase 27 adds a stage-level navigation compass so seekers can move through the eighteen-stage river without losing sequence, context, or safety anchors.

## What changed

- Added `src/components/stage-river-navigator.tsx`.
- Added `scripts/river-navigator-check.mjs`.
- Added `npm run river:navigator:check`.
- Added the river navigator check into the full QA/release gate.
- Rendered the navigator on every existing stage detail page.

## What the navigator shows

- Current stage progress out of eighteen.
- Previous, current, and next stage cards.
- Companion stages inside the same arc.
- Fast jumps to existing sections:
  - Progressive Study Mode
  - Contemplation Protocol
  - Integrated Yogic Ascent Matrix
  - Cross-Linking Intelligence
  - Practice Safety Gate

## Guardrails

This phase does not add a new main page, does not rename the stages, does not change the five-arc roadmap, and does not weaken the protected-practice safety system.

## Verification

Run:

```bash
npm run river:navigator:check
npm run release:check
npm run preview
```
