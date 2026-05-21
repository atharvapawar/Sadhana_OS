# Sadhana OS Handoff Kit

This document is the first file a future AI agent, developer, or deployment helper should read before changing Sadhana OS.

## Purpose

Sadhana OS is a static, content-first Yogic Science portal organized as a sacred river:

**The Yogic River from Misidentification to Living Awareness**

The site must remain fast, safe, sequential, beautiful, and deployable without manual recovery work.

## Non-Negotiable Project Rules

1. Do not add new main pages casually.
2. Do not redesign before the user explicitly asks for a design phase.
3. Do not break the five main knowledge homes:
   - Doctrine
   - Knowledge Roadmap
   - Inner Science
   - Path & Practice
   - Glossary
4. Do not change the 18-stage river unless the user explicitly approves the naming/structure.
5. Do not teach unsafe advanced practices as casual DIY instructions.
6. Do not remove deployment automation, QA scripts, or release checks.
7. Do not introduce private registry dependencies, `workspace:`, `catalog:`, `file:`, or Replit-only package assumptions.
8. Prefer incremental patches over rewrites.

## One-command final check

Before handoff, push, zip export, Vercel deploy, Netlify deploy, or Replit handoff, run:

```bash
npm ci
npm run release:check
npm run preview
```

`npm run release:check` runs the quality chain:

```bash
npm run qa
npm run release:readiness
npm run release:report
npm run handoff:check
npm run handoff:manifest
```

## Current Knowledge Architecture

The 18 stages are grouped into five arcs:

1. Right Seeing
2. Purification & Foundation
3. Body-Prana Stabilization
4. Interiorization & Meditation
5. Living Realization

Each future content addition must clearly belong to one of the five main site homes and support one or more stages of the river.

## Safe Future Workflow

For any future upgrade:

1. Read `docs/MASTER_CONTENT_BLUEPRINT.md`.
2. Read `docs/IMPLEMENTATION_PHASES.md`.
3. Decide the smallest safe change.
4. Avoid touching `src/` unless the change requires UI/data rendering.
5. Run `npm run release:check`.
6. Record what changed and why.

## Deployment Surface

The project is meant to be plug-and-play:

- Local: `npm ci`, `npm run dev`
- Production build: `npm run build`
- Production preview: `npm run preview`
- Final gate: `npm run release:check`
- Vercel: build command `npm run build`, output directory `dist`
- Netlify: build command `npm run build`, publish directory `dist`
- GitHub Actions: `.github/workflows/build-check.yml`
- Replit: `.replit`

## Handoff Outputs

When `npm run release:check` succeeds, it generates:

- `release/RELEASE_READINESS_REPORT.md`
- `release/RELEASE_REPORT.md`
- `release/HANDOFF_MANIFEST.md`

The `release/` folder is intentionally ignored by Git because reports are generated artifacts.

## What to do if something breaks

If `vite` is not recognized:

```bash
npm run fresh
```

If deployment fails:

```bash
npm ci
npm run release:check
npm run preview
```

Then inspect:

- `package-lock.json` for private registry URLs
- `vercel.json` for `outputDirectory: dist`
- `netlify.toml` for `publish = "dist"`
- `.github/workflows/build-check.yml` for `npm run release:check`
