# Sadhana OS Deployment Checklist

Use this checklist when pushing the project to GitHub, Vercel, Netlify, or Replit.

## 1. Fresh local verification

```bash
npm ci
npm run check
npm run dev
npm run preview
```

Expected result:

- `npm ci` installs from the public npm registry.
- `npm run doctor` passes.
- `npm run build` creates `dist/index.html` and `dist/assets`.
- `npm run dev` opens the local development server.
- `npm run preview` serves the production build locally.

## 2. GitHub repository setup

```bash
git init
git add .
git commit -m "Prepare Sadhana OS for deployment"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git push -u origin main
```

GitHub Actions will run `.github/workflows/build-check.yml` on push and pull request.

## 3. Vercel setup

Connect the GitHub repository to Vercel and use:

- Framework preset: Vite
- Install command: `npm ci`
- Build command: `npm run build`
- Output directory: `dist`

The included `vercel.json` already sets the build command and output directory.

## 4. Netlify setup

Connect the GitHub repository to Netlify and use:

- Build command: `npm run build`
- Publish directory: `dist`

The included `netlify.toml` already sets the build command, publish directory, and SPA fallback redirect.

## 5. Replit setup

Import the repository into Replit. The included `.replit` runs the Vite dev server and has a deployment build command.

## 6. Common recovery commands

If `vite` is not recognized:

```bash
npm run clean
npm ci
npm run dev
```

If deployment fails because dependencies changed:

```bash
npm run clean
npm ci
npm run check
```

If a private registry appears in the lockfile, regenerate the lockfile with the included `.npmrc`:

```bash
rm -rf node_modules package-lock.json
npm install
npm run check
```

On Windows PowerShell, replace `rm -rf` with:

```powershell
Remove-Item -Recurse -Force node_modules, dist -ErrorAction SilentlyContinue
Remove-Item -Force package-lock.json -ErrorAction SilentlyContinue
npm install
npm run check
```


## Release Gate

Run this before every upload or platform connection:

```bash
npm ci
npm run release:check
npm run preview
```

Do not deploy if the release gate fails. Fix the failing doctor, content, build, performance, route, or release readiness check first.

## Phase 13 Handoff Checklist

Before sharing the zip, pushing to GitHub, or asking another AI/developer to continue:

```bash
npm ci
npm run release:check
npm run preview
```

Then verify these generated files exist locally:

```text
release/RELEASE_READINESS_REPORT.md
release/RELEASE_REPORT.md
release/HANDOFF_MANIFEST.md
```

Read-first files for the next developer or AI agent:

```text
docs/HANDOFF_KIT.md
CONTRIBUTING.md
CHANGELOG.md
docs/MASTER_CONTENT_BLUEPRINT.md
docs/IMPLEMENTATION_PHASES.md
```

Non-negotiable handoff rule: do not redesign, add new main pages, alter the 18-stage river, or weaken safety gates unless the user explicitly asks for that phase.

## Launch Runbook

Before public launch or custom domain setup, read `docs/LAUNCH_DOMAIN_MONITORING_RUNBOOK.md` and run:

```bash
npm ci
npm run release:check
npm run preview
```

After assigning a final domain, regenerate the sitemap with:

```bash
SITE_URL=https://your-final-domain.com npm run sitemap:generate
npm run release:check
```
