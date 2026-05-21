# Phase 11 — Production QA + Content Integrity

This phase adds automated checks that protect Sadhana OS from silent regressions before pushing to GitHub, Vercel, Netlify, or Replit.

## Purpose

Sadhana OS is now both a sacred knowledge system and a deployable static product. The risk after many upgrades is not only build failure; it is silent drift:

- a missing stage intelligence card
- a renamed stage that breaks the 18-stage river
- a missing route
- a generated `dist` folder with broken asset references
- a route that works in dev but fails after static deployment
- a private/internal npm registry leaking back into the lockfile

Phase 11 adds guardrails for those risks without changing site content, routes, or visual design.

## New checks

### `npm run content:check`

Validates:

- all required files exist
- exactly 18 stages are present
- the approved 5 arcs are present
- every stage title, Sanskrit/subtitle, and arc label remain intact
- every stage has a Stage Intelligence card
- all core routes are registered
- glossary relationship fields still exist
- package files do not contain private/internal registry references
- dependency versions do not use non-portable `catalog:`, `workspace:`, `link:`, or `file:` references

### `npm run route:smoke`

Validates after build:

- `dist/index.html` exists
- assets referenced by `dist/index.html` exist
- key SPA routes return HTTP 200 from a local static server with fallback routing

Routes checked:

- `/`
- `/roadmap`
- `/stage/1`
- `/stage/18`
- `/inner-science`
- `/practice`
- `/glossary`
- `/experience`

### `npm run qa`

Runs the full production quality gate:

```bash
npm run doctor
npm run content:check
npm run build
npm run performance
npm run route:smoke
```

### `npm run check`

Now points to `npm run qa`, so GitHub Actions and local verification use the same full quality gate.

## Shipping rule

Before uploading a new zip or pushing to GitHub, run:

```bash
npm ci
npm run check
```

If either command fails, do not ship the build.
