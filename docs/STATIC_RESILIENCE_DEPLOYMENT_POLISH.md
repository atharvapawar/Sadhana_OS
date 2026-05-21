# Phase 15 — Static Resilience & Deployment Polish

Status: Implemented.

Purpose: improve production reliability on static hosts without changing the sacred content, UI structure, routes, or 18-stage roadmap.

## What changed

- Added a production-only service worker registration helper.
- Added `public/sw.js` as a small static-host-safe service worker.
- Added `public/offline.html` as a graceful offline fallback.
- Added immutable cache headers for Vite hashed assets.
- Added no-cache headers for the service worker file so updates are not trapped behind stale cache.
- Added `scripts/static-resilience-check.mjs`.
- Added `npm run static:check`.
- Added the static resilience check into the main `npm run qa` gate.

## Safety rules

- Service worker registration is production-only.
- No advanced spiritual practice content was changed.
- No main pages or routes were added.
- No sacred roadmap naming or 5-arc structure was changed.
- The offline page is informational only and does not pretend to provide full app state offline.

## Verification

Run:

```bash
npm ci
npm run release:check
npm run preview
```

The build should include:

```text
dist/offline.html
dist/sw.js
dist/manifest.webmanifest
dist/robots.txt
```

## Deployment notes

Vercel and Netlify now include cache headers for `/assets/*`, `/sw.js`, and `/manifest.webmanifest`.

- Hashed Vite assets: long immutable cache.
- Service worker: no-cache so updated releases can replace old worker logic.
- Manifest: short cache.

