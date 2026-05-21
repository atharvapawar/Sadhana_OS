# Phase 18 — Dependency, Environment & Deploy Smoke Hardening

Status: Implemented.

Purpose: make Sadhana OS easier to clone, install, verify, and deploy without repeating local-machine fixes such as missing `vite`, private registry lockfile entries, or unclear provider settings.

This phase does not change sacred content, pages, routes, roadmap naming, or UI structure.

## Added Quality Gates

```bash
npm run dependency:check
npm run env:check
npm run deploy:smoke
```

## What They Check

### Dependency Hygiene

- `package.json`, `package-lock.json`, and `.npmrc` avoid private/internal registry references.
- No `catalog:`, `workspace:`, `link:`, or `file:` dependency specifiers are used.
- `vite`, `react`, and `react-dom` remain locally declared dependencies.
- `package-lock.json` contains package entries for declared dependencies.
- The project standardizes on npm + `package-lock.json`.
- If `node_modules/` exists, `node_modules/.bin/vite` must exist.

### Environment Readiness

- Node version is 18 or newer.
- npm is available.
- `.nvmrc` pins Node 18.
- `.npmrc` uses the public npm registry.
- `.env.example` documents `SITE_URL` for sitemap generation.
- Vite config has no required `PORT` / `BASE_PATH` crash logic.

### Deployment Smoke Kit

- Vercel config uses `npm run build` and `dist`.
- Netlify config uses `npm run build` and `dist`.
- Replit run command uses `npm run dev`.
- `dist/index.html` exists after build.
- A release smoke checklist is generated at `release/DEPLOYMENT_SMOKE_KIT.md`.

## Final Release Command

```bash
npm ci
npm run release:check
npm run preview
```

