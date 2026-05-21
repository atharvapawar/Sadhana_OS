# Sadhana OS — Deployment Ready

This package is a conservative deployment-fix build. No UI redesign, no new pages, and no sacred content hierarchy changes were made in this pass.

The fixed structure is intended to run with the normal Vite static workflow:

- install dependencies
- run the local dev server
- build to `dist`
- preview the production build
- deploy `dist` to Vercel or Netlify

## Requirements

- Node.js 18 or newer
- npm 9 or newer recommended

The repository includes `.nvmrc` with Node `18` for consistent local and CI setup.

## Fresh local install

```bash
npm ci
```

If you are recovering from a broken local install where `vite` is not recognized, delete local generated folders first:

```bash
rm -rf node_modules dist
npm ci
```

On Windows PowerShell:

```powershell
Remove-Item -Recurse -Force node_modules, dist -ErrorAction SilentlyContinue
npm ci
```

## Run locally

```bash
npm run dev
```

Open:

````text
http://localhost:5173/

Or run a single command that installs dependencies (if needed) and starts the dev server:

```bash
npm run local
````

````

## Build for production

```bash
npm run build
````

The production output is generated in:

```text
dist
```

## Preview the production build

```bash
npm run preview
```

Open the local preview URL shown in the terminal.

## One-command health check

Run this before pushing to GitHub, Vercel, or Netlify:

```bash
npm run check
```

This now runs the full production QA gate:

```bash
npm run doctor
npm run content:check
npm run build
npm run performance
npm run route:smoke
```

The checks verify deployment files, public npm registry usage, content integrity for the 18-stage river, production build output, performance budget, generated asset references, and static SPA route fallback behavior.

## Full fresh recovery

Use this when a machine has a broken `node_modules` folder or `vite` is not recognized:

```bash
npm run fresh
```

This removes generated folders, reinstalls dependencies with `npm ci`, runs the full QA gate, and builds/verifies the project.

## Production QA commands

Use these before any GitHub push, Vercel deploy, Netlify deploy, or Replit handoff:

```bash
npm run content:check
npm run route:smoke   # run after npm run build
npm run qa
```

`npm run content:check` protects the 18-stage river, glossary relationship system, route registry, and portable npm setup. `npm run route:smoke` serves the built `dist` folder through a local static fallback server and confirms the important SPA routes return HTTP 200.

See `docs/PRODUCTION_QA_CONTENT_INTEGRITY.md` for details.

## Responsive QA cleanroom

Phase 28 adds an active-route responsive check so the live Sadhana OS pages and stage components are protected separately from generic UI helper primitives.

Run:

```bash
npm run responsive:check
npm run visual:qa
```

The full release gate already includes both checks. This protects the active app from horizontal overflow, unsafe fixed minimum widths, long Sanskrit label clipping, and mobile-first grid regressions.

## Deployment checklist

See `DEPLOYMENT_CHECKLIST.md` for the exact GitHub, Vercel, Netlify, and Replit connection steps.

## Vercel deployment

Use these settings:

- Framework: Vite
- Build command: `npm run build`
- Output directory: `dist`

The included `vercel.json` contains:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

## Netlify deployment

Use these settings:

- Build command: `npm run build`
- Publish directory: `dist`

The included `netlify.toml` contains the build settings and SPA redirect fallback.

## Replit

The included `.replit` runs:

```bash
npm run dev
```

For deployment it builds with:

```bash
npm install && npm run build
```

and serves the production preview.

## GitHub Actions

The included workflow `.github/workflows/build-check.yml` runs:

```bash
npm ci
npm run check
```

on push and pull request. This verifies deployment files, sacred content integrity, production output, generated asset references, static SPA routes, and the JavaScript asset budget.

## Troubleshooting: `'vite' is not recognized`

This usually means dependencies were not installed correctly or `node_modules/.bin` is missing. Fix it with:

```bash
rm -rf node_modules dist
npm ci
npm run dev
```

On Windows PowerShell:

```powershell
Remove-Item -Recurse -Force node_modules, dist -ErrorAction SilentlyContinue
npm ci
npm run dev
```

## Troubleshooting: private registry in package-lock

This package includes `.npmrc`:

```text
registry=https://registry.npmjs.org/
```

The `package-lock.json` has been cleaned so package tarballs resolve from the public npm registry instead of private/internal registry URLs. This prevents fresh installs from failing on another machine.

## Performance hardening

Phase 9 adds route-level lazy loading so each main page is split into its own production chunk instead of forcing every page into the first JavaScript download. Keep `React.lazy` route imports in `src/App.tsx` intact when adding future pages or heavy sections.

After a production build, run:

```bash
npm run performance
```

This prints the largest generated JavaScript files and fails only if a chunk becomes dangerously large.

## Final temple polish

Phase 10 adds a final UX-quality layer while preserving the same sacred information architecture:

- Keyboard skip link to the main content.
- Active navigation semantics with `aria-current`.
- Escape-key close behavior for the mobile menu.
- Route error boundary for lazy-loaded page chunks.
- River Compass guidance for first-time visitors.
- Back-to-top control for long pages.
- Reduced-motion CSS protection for motion-sensitive users.

See `docs/FINAL_TEMPLE_POLISH.md` for the implementation notes.

## Verified commands for this build

```bash
npm ci
npm run doctor
npm run build
npm run performance
npm run check
npm run preview
```

## Release readiness

Before pushing to GitHub, Vercel, Netlify, or Replit, run the full release gate:

```bash
npm ci
npm run release:check
npm run preview
```

This runs deployment doctor checks, content integrity checks, production build, performance budget, static route smoke tests, and release readiness/report generation. Generated reports are written to `release/` and are intentionally ignored by Git.

For platform deployment, keep these settings:

- GitHub Actions: `npm ci` then `npm run release:check`
- Vercel: build command `npm run build`, output directory `dist`
- Netlify: build command `npm run build`, publish directory `dist`
- Replit: run `npm run dev`, deploy with build + preview commands from `.replit`

## Handoff Kit

Phase 13 adds repository hygiene and handoff protection for future AI agents, developers, and deployment helpers.

Read first before future changes:

```text
docs/HANDOFF_KIT.md
CONTRIBUTING.md
CHANGELOG.md
```

New handoff commands:

```bash
npm run handoff:check
npm run handoff:manifest
```

The final release gate now includes handoff verification:

```bash
npm ci
npm run release:check
npm run preview
```

Generated handoff outputs are written to `release/`:

```text
release/RELEASE_READINESS_REPORT.md
release/RELEASE_REPORT.md
release/HANDOFF_MANIFEST.md
```

The `release/` folder is ignored by Git because these files are generated for each local release/export.

## SEO / Metadata Hardening

Before a public deployment, regenerate the sitemap with your real domain:

```bash
SITE_URL=https://your-domain.com npm run sitemap:generate
npm run release:check
```

Metadata quality is protected by:

```bash
npm run metadata:check
```

This prevents placeholder descriptions, missing Open Graph tags, missing manifest metadata, and incomplete sitemap coverage from slipping into release.

## Static resilience

This project includes a production-only service worker and offline fallback. It does not change the sacred content or page structure; it only gives users a graceful offline screen instead of a broken blank page when navigation fails offline.

Run the static resilience gate with:

```bash
npm run static:check
```

Full release gate:

```bash
npm ci
npm run release:check
npm run preview
```

Static host cache rules are configured for Vercel and Netlify:

- `/assets/*` uses long immutable cache for hashed Vite assets.
- `/sw.js` uses `no-cache` so releases can update the service worker safely.
- `/manifest.webmanifest` uses a short cache.

## Security and privacy hardening

This static portal includes deploy-provider security headers for Vercel and Netlify:

- Content Security Policy
- X-Content-Type-Options
- Referrer-Policy
- X-Frame-Options
- Permissions-Policy

Run before release:

```bash
npm run security:check
npm run release:check
```

Details are documented in `docs/SECURITY_PRIVACY_HEADERS.md`.

## Phase 17 QA Commands

Final visual, accessibility, and release snapshot checks are included in the release gate.

```bash
npm run a11y:qa
npm run visual:qa
npm run release:snapshot
npm run release:check
```

`npm run release:snapshot` writes `release/FINAL_RELEASE_SNAPSHOT.md` after the build exists.

The strongest pre-deployment command remains:

```bash
npm ci
npm run release:check
npm run preview
```

## Phase 18 Dependency, Environment, and Deploy Smoke Checks

Use these when moving the project between machines, GitHub, Vercel, Netlify, or Replit:

```bash
npm run dependency:check
npm run env:check
npm run deploy:smoke
```

These checks protect against the common setup failures:

- private/internal npm registry entries in `package-lock.json`
- missing local Vite binary in `node_modules/.bin`
- unsupported Node versions
- missing `.env.example` / `SITE_URL` guidance
- unclear Vercel, Netlify, Replit, or local preview smoke steps

The full release gate now includes these checks automatically:

```bash
npm ci
npm run release:check
npm run preview
```

For production sitemap generation, copy `.env.example` guidance and run:

```bash
SITE_URL=https://your-domain.com npm run sitemap:generate
npm run release:check
```

## Production Evidence Pack

Before final upload or handoff, run:

```bash
npm ci
npm run release:check
npm run preview
```

This generates `release/PRODUCTION_EVIDENCE.md` and `release/PRODUCTION_EVIDENCE.json`, proving the build, route, metadata, security, performance, handoff, and deployment-readiness gates passed.

Convenience command:

```bash
npm run final:gate
```

Do not deploy if `npm run release:check` fails.

## Maintenance & Versioning Guardrails

Phase 20 adds future-upgrade safety so Sadhana OS can be continued without accidentally damaging the sacred architecture or deployment pipeline.

Useful maintenance commands:

```bash
npm run version:check
npm run maintenance:check
npm run continuation:plan
```

The full release gate now includes these checks automatically:

```bash
npm ci
npm run release:check
npm run preview
```

The project also includes an AI continuation prompt for future coding agents:

- `docs/AI_CONTINUATION_PROMPT.md`

Before any future agent changes the project, it should read:

1. `docs/HANDOFF_KIT.md`
2. `docs/MASTER_CONTENT_BLUEPRINT.md`
3. `docs/MAINTENANCE_VERSIONING_GUARDRAILS.md`
4. `docs/AI_CONTINUATION_PROMPT.md`
5. `CHANGELOG.md`

## Launch readiness

For public launch, domain setup, post-deploy smoke testing, search indexing, and rollback steps, use:

```bash
npm ci
npm run release:check
npm run preview
```

Then follow `docs/LAUNCH_DOMAIN_MONITORING_RUNBOOK.md`.

After choosing the final public domain, regenerate the sitemap:

```bash
SITE_URL=https://your-final-domain.com npm run sitemap:generate
npm run release:check
```

## Phase 22 — Stage Depth & Integrated Yogic Ascent Matrix

Added a deeper 18-stage data layer and rendered it inside existing stage detail pages. Each stage now includes deep stage architecture plus an integrated ascent matrix connecting kosha, bhuta, chakra language, vayu, body-practice direction, purification/healing target, safety gate, and glossary terms. No new main pages, no redesign, and no unsafe DIY advanced instructions were added.

## Phase 23 — Cross-Linking Intelligence

Each stage detail page now connects the 18-stage river back into Doctrine, Inner Science, Path & Practice, and Glossary. Glossary terms also expose stable hash anchors such as `/glossary#term-prana`, making the site feel like one integrated system instead of isolated sections.

New command:

```bash
npm run crosslink:check
```

## Phase 24: Starting Guidance

The homepage now includes a readiness-based starting guide. It helps visitors choose the correct first chamber by current condition:

- new to the path
- confused by many terms
- unstable routine or emotions
- seeking safe practice
- attracted to advanced methods

Run the check with:

```bash
npm run start:guide:check
```

### Phase 25: Progressive Study Layers

Each stage detail page now includes a five-layer study guide so visitors can move from quick orientation to sequence logic, ascent matrix, safe practice, and integration without feeling overwhelmed. Run `npm run study:layers:check` or the full `npm run release:check` before deployment.

## Phase 26 — Contemplation Protocol

Each stage now includes a gentle **Observe → Release → Integrate** reflection protocol, with a daily micro-practice, journal prompt, and safety reminder.

Check it with:

```bash
npm run contemplation:check
npm run release:check
```

## Phase 27 — River Navigation Compass

Each stage detail page now includes a River Stage Navigator so users can see previous/current/next stage context, companion stages inside the same arc, overall progress through the 18-stage river, and safe jumps to the existing study, contemplation, ascent, cross-linking, and practice sections. Run `npm run river:navigator:check` or the full `npm run release:check` before deployment.

### Phase 29: Tradition Source Integrity

Each stage now includes a Traditional Source Lens that connects it to appropriate source streams while preserving safety and non-claim language. Run:

```bash
npm run tradition:check
```

This check is included in `npm run release:check`.

## Safety & Scope

Sadhana OS is an educational Yogic Science and Sanatana/Vedantic study map. It is not medical advice, mental-health treatment, emergency support, formal initiation, or a guarantee of realization.

Advanced practices such as strong kumbhaka, advanced bandha-mudra combinations, strong shatkarma, kundalini/chakra activation attempts, and formal kriya sequences remain visible as traditional knowledge but protected from casual DIY instruction.

Safety/scope verification:

```bash
npm run safety:scope:check
npm run release:check
```
