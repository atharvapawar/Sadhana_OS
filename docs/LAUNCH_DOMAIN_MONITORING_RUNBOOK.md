# Sadhana OS Launch, Domain & Monitoring Runbook

This runbook is for the final public launch of Sadhana OS after the release gate passes. It does not change the sacred architecture, the five main knowledge homes, the five-arc river, or the 18-stage sequence.

## Pre-launch command

Run the full local release gate before uploading or connecting to a host:

```bash
npm ci
npm run release:check
npm run preview
```

The release gate proves content integrity, route smoke tests, metadata, security headers, static resilience, accessibility/source QA, performance budget, handoff materials, and production evidence generation.

## GitHub launch sequence

1. Create a clean repository.
2. Upload this project root, not the parent zip folder.
3. Commit only source/config/docs files. Do not commit `node_modules`, `dist`, or `release`.
4. Push to `main`.
5. Confirm GitHub Actions runs `npm ci` and `npm run release:check`.
6. Do not connect Vercel or Netlify until the GitHub check is green.

Recommended commands:

```bash
git init
git add .
git commit -m "Launch Sadhana OS"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git push -u origin main
```

## Vercel launch sequence

1. Import the GitHub repository into Vercel.
2. Keep the framework as Vite.
3. Use build command `npm run build`.
4. Use output directory `dist`.
5. Deploy.
6. Open the production URL and run the post-deploy smoke test below.
7. Add the custom domain only after the production deployment works.

Vercel domain setup should be verified inside the project domain settings. Vercel documents adding a domain to a project, inspecting required DNS records, and using an A record for apex domains or CNAME for subdomains when appropriate.

## Netlify launch sequence

1. Import the GitHub repository into Netlify.
2. Use build command `npm run build`.
3. Use publish directory `dist`.
4. Deploy.
5. Open the production URL and run the post-deploy smoke test below.
6. Add the custom domain only after the production deployment works.

Netlify external DNS setup depends on whether you use a subdomain or apex domain. Netlify recommends checking the project Domain management panel for exact DNS details and notes that apex domains may need ALIAS, ANAME, flattened CNAME, or fallback A record support depending on the DNS provider.

## Replit launch sequence

1. Import the repository or upload the project root.
2. Run `npm ci`.
3. Run `npm run dev` for local Replit preview.
4. Run `npm run build` to confirm the static output.
5. If using a static deployment, publish the `dist` output.

## Domain and DNS checklist

Before changing DNS:

- Decide the primary domain: apex domain like `example.com` or `www.example.com`.
- Use only one platform as the active production host.
- Add both apex and `www` handling where the platform supports it.
- Follow the host-specific DNS records shown by Vercel or Netlify, not guessed records.
- Wait for DNS propagation before judging failure.
- After DNS resolves, regenerate sitemap with the final domain.

```bash
SITE_URL=https://your-final-domain.com npm run sitemap:generate
npm run release:check
```

## Post-deploy smoke test

Run these against the deployed URL:

```bash
BASE_URL=https://your-final-domain.com
curl -I "$BASE_URL/"
curl -I "$BASE_URL/roadmap"
curl -I "$BASE_URL/stage/18"
curl -I "$BASE_URL/sitemap.xml"
curl -I "$BASE_URL/robots.txt"
curl -I "$BASE_URL/manifest.webmanifest"
curl -I "$BASE_URL/sw.js"
curl -I "$BASE_URL/offline.html"
```

Expected result: each route should return a successful status. SPA routes such as `/stage/18` must not return a hard 404.

## Search indexing checklist

After the final domain is live:

1. Regenerate sitemap with `SITE_URL` set to the final domain.
2. Redeploy after sitemap regeneration.
3. Open `/robots.txt` and confirm the sitemap points to the final domain.
4. Submit the sitemap in Google Search Console.
5. Inspect the homepage and a stage URL.
6. Do not change the domain repeatedly after submission unless necessary.

## Monitoring checklist

For the first 24 to 72 hours after launch:

- Check Vercel or Netlify deploy logs after every push.
- Confirm `/`, `/roadmap`, `/stage/18`, `/glossary`, `/practice`, and `/inner-science` work on mobile and desktop.
- Confirm no browser console errors on first load.
- Confirm service worker does not block fresh updates.
- Confirm sitemap, robots, manifest, and offline page remain accessible.
- Confirm custom domain SSL is active.

## Rollback plan

If production breaks:

1. Do not make multiple random fixes.
2. Roll back to the last green deployment in Vercel or Netlify.
3. Run locally:

```bash
npm ci
npm run release:check
npm run preview
```

4. Fix only the confirmed root cause.
5. Push a small patch and wait for the release gate to pass.

## Sacred architecture reminder

A launch or deployment fix must not modify:

- Doctrine
- Knowledge Roadmap
- Inner Science
- Path & Practice
- Glossary
- The five-arc river
- The 18 stages
- Safety-gated advanced practice language

