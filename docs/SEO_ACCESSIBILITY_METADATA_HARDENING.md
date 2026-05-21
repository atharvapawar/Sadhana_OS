# Phase 14 — SEO, Accessibility & Metadata Hardening

This phase strengthens the public shell of Sadhana OS without changing the sacred content hierarchy, routes, or UI structure.

## What was hardened

- Replaced placeholder Replit metadata with final Sadhana OS metadata.
- Added Open Graph and Twitter card metadata.
- Added theme color and web app metadata.
- Added `public/manifest.webmanifest` for installable-app metadata.
- Added `scripts/generate-sitemap.mjs` to generate `public/sitemap.xml` and update `public/robots.txt`.
- Added `scripts/metadata-check.mjs` to prevent placeholder metadata from returning.
- Added metadata checks into the normal QA gate.

## Commands

```bash
npm run sitemap:generate
npm run metadata:check
npm run qa
npm run release:check
```

## Site URL

By default, the sitemap uses:

```bash
https://sadhana-os.vercel.app
```

For a real deployment domain, regenerate before release:

```bash
SITE_URL=https://your-domain.com npm run sitemap:generate
npm run release:check
```

## Guardrails

- Do not add new main pages casually.
- Do not rename the 18-stage river casually.
- Do not remove the five knowledge homes.
- Do not return to placeholder descriptions like `built on Replit`.
- Keep metadata precise, sacred, and non-hype-based.
