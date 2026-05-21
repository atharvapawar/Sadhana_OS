# Phase 9 — Performance + Deployment Hardening

This phase protects Sadhana OS as a plug-and-play static Vite application while keeping the sacred content, page hierarchy, and 18-stage river unchanged.

## What was hardened

### 1. Route-level code splitting

`src/App.tsx` now lazy-loads each main page with `React.lazy` and `Suspense`.

This keeps heavy route-specific content out of the first JavaScript bundle:

- Home
- Knowledge Roadmap
- Stage Detail
- Inner Science
- Path & Practice
- Glossary
- Experience
- Not Found

When future pages or heavy modules are added, they should follow the same lazy route pattern.

### 2. Production performance budget

`scripts/performance-budget.mjs` checks generated production assets after `npm run build`.

Run it with:

```bash
npm run performance
```

It confirms:

- `dist/index.html` exists
- JavaScript assets exist
- no single JS chunk is dangerously large
- likely initial JS remains visible in terminal output

### 3. Stronger CI

`.github/workflows/build-check.yml` now runs:

```bash
npm ci
npm run check
```

`npm run check` performs:

```bash
npm run doctor
npm run build
npm run performance
```

This prevents broken deployment files, broken build output, and accidental performance regressions from silently reaching GitHub/Vercel/Netlify.

## Deployment invariants

Do not break these values:

```text
Build command: npm run build
Output directory: dist
Node: >=18
Registry: https://registry.npmjs.org/
```

## What was not changed

- No new pages
- No redesign
- No content rewrite
- No 18-stage naming changes
- No roadmap arc changes
- No unsafe advanced practice instructions

## Future performance notes

If the site grows much larger, the next safe optimization is data-level splitting for very large knowledge datasets, followed by route-prefetch on hover/focus. Do not add complex runtime state or server dependencies unless the static model becomes insufficient.
