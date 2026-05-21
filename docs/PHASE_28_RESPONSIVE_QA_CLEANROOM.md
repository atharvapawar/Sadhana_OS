# Phase 28 — Responsive QA Cleanroom & Active Route Guard

## Status

Implemented.

## Purpose

Phase 28 cleans up the remaining non-blocking responsive QA warning by separating active Sadhana OS route surfaces from unused/generic UI helper components. The site already had mobile overflow guards; this phase makes the automated QA signal cleaner and more accurate.

## What changed

- Added `scripts/responsive-route-check.mjs`.
- Added `npm run responsive:check`.
- Added the responsive active-route check into `npm run qa` and therefore `npm run release:check`.
- Updated `scripts/visual-qa.mjs` so generic `src/components/ui/*` helper primitives do not create misleading fixed-min-width warnings when they are not part of active route surfaces.
- Kept the existing full visual QA checks for the actual app shell, pages, stage components, and global CSS.

## What the new check protects

The active-route responsive check verifies that the live Sadhana OS surfaces preserve:

- global horizontal overflow protection
- long Sanskrit/stage-title wrapping
- safe card utilities
- safe tap-target utilities
- reduced-motion protection
- mobile-first grids on deep stage components
- roadmap overflow guards
- no `w-screen` in active route surfaces
- no arbitrary fixed `min-w-[...]` in active route surfaces

## What did not change

- No sacred content rewrite
- No new main pages
- No navigation change
- No 18-stage naming change
- No 5-arc roadmap change
- No visual redesign
- No unsafe advanced practice instructions

## Verification

Run:

```bash
npm run responsive:check
npm run visual:qa
npm run release:check
```

The full release gate now includes this responsive active-route check before visual QA.
