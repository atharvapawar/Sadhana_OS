# Phase 24 — Starting Guidance & Seeker Orientation

Phase 24 adds a readiness-based starting compass to the existing homepage without adding new main pages or changing the sacred roadmap.

## Purpose

The site now helps a first-time visitor choose the next safe chamber by current condition instead of spiritual curiosity.

The five signals are:

1. I am new to the whole map.
2. I know many terms but feel confused.
3. My routine, sleep, food, or emotions are unstable.
4. I want a safe practical starting routine.
5. I am attracted to advanced kriya, chakra, kundalini, bandha, or mudra.

## What each signal returns

Each signal gives:

- recommended first movement
- reason for starting there
- two next steps
- what to avoid for now
- daily anchor

## Safety logic

The advanced-curiosity signal routes the user toward the protected practice zone and Stage 11 without giving unsafe DIY instructions. It reinforces prerequisite foundations and teacher-guided safety.

## Accessibility logic

The selector uses button-based radio semantics:

- `role="radiogroup"`
- `role="radio"`
- `aria-checked`
- `aria-live="polite"`

This keeps the interaction keyboard-friendly and screen-reader clearer while avoiding heavy dependency additions.

## Files added

- `src/data/start-guidance.ts`
- `src/components/starting-guidance.tsx`
- `scripts/start-guidance-check.mjs`

## Files updated

- `src/pages/home.tsx`
- `src/pages/practice.tsx`
- `src/pages/stage-detail.tsx`
- `package.json`
- `scripts/doctor.mjs`
- `README.md`
- `CHANGELOG.md`
- `docs/IMPLEMENTATION_PHASES.md`

## Verification

Run:

```bash
npm run start:guide:check
npm run release:check
```
