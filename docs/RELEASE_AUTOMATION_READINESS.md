# Phase 12 — Deployment Automation + Release Readiness

Phase 12 makes Sadhana OS easier to hand off, clone, verify, and deploy without changing the sacred UI/content system.

## What this phase protects

- A fresh clone can run through one release gate.
- GitHub Actions verifies the same release gate used locally.
- Vercel and Netlify keep the same static Vite deployment settings.
- Replit keeps a simple run/build path.
- Release reports are generated locally so the exact package health is visible before upload.

## Commands

```bash
npm ci
npm run release:check
npm run preview
```

`npm run release:check` runs:

```bash
npm run qa
npm run release:readiness
npm run release:report
```

The lower-level gates remain available:

```bash
npm run doctor
npm run content:check
npm run build
npm run performance
npm run route:smoke
```

## Generated release files

The release scripts write reports into `release/`:

- `release/RELEASE_READINESS_REPORT.md`
- `release/RELEASE_REPORT.md`

The `release/` folder is intentionally ignored by Git because reports are generated artifacts.

## Platform settings

### GitHub

GitHub Actions runs:

```bash
npm ci
npm run release:check
```

### Vercel

- Build command: `npm run build`
- Output directory: `dist`
- Framework: Vite

### Netlify

- Build command: `npm run build`
- Publish directory: `dist`
- SPA fallback: `/* -> /index.html`

### Replit

- Local run: `npm run dev`
- Deployment build: `npm ci && npm run build`
- Deployment run: `npm run preview`

## Release acceptance

A release is ready only when this passes:

```bash
npm ci
npm run release:check
npm run preview
```

No content phase should be shipped if this gate fails.
