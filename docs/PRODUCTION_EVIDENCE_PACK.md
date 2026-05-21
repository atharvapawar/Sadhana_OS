# Phase 19 — Production Evidence Pack + One-Command Release Gate

This phase adds a final proof layer for Sadhana OS releases. It does not change sacred content, routes, UI structure, roadmap naming, practice safety, or deployment platform choices.

## Purpose

The project already has many individual checks. The production evidence pack gathers the final release state into machine-readable and human-readable files so future uploads are not based on memory or trust alone.

## New Command

```bash
npm run production:evidence
```

This writes:

```text
release/PRODUCTION_EVIDENCE.md
release/PRODUCTION_EVIDENCE.json
```

## Final Gate

Use this before uploading to GitHub, Vercel, Netlify, or Replit:

```bash
npm ci
npm run release:check
npm run preview
```

Or use the convenience command:

```bash
npm run final:gate
```

## What the Evidence Pack Confirms

- Package identity and Node engine
- Approved river title and five main sections
- Release report, final release snapshot, and handoff manifest exist
- `dist` exists after production build
- required static files exist:
  - `index.html`
  - `robots.txt`
  - `sitemap.xml`
  - `manifest.webmanifest`
  - `sw.js`
  - `offline.html`
- expected static routes are documented
- largest JS bundle size is recorded
- package/deployment config hashes are recorded
- private/internal registry strings are absent from lockfile
- release gate still includes all major checks

## Release Rule

Do not deploy if `npm run release:check` fails.

If the evidence pack fails, read the failure list at the end of the command output and fix the missing file, stale build, private registry reference, or release-gate regression before trying again.
