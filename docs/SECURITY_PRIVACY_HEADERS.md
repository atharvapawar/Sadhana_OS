# Phase 16 — Security, Privacy & Header Hardening

This phase keeps the sacred content and UI untouched while strengthening production hosting behavior for GitHub-connected Vercel and Netlify deployments.

## Added protections

- `X-Content-Type-Options: nosniff` to reduce MIME-sniffing risk.
- `Referrer-Policy: strict-origin-when-cross-origin` to avoid leaking full page paths to external origins.
- `X-Frame-Options: DENY` plus CSP `frame-ancestors 'none'` to protect the static portal from clickjacking-style embedding.
- `Permissions-Policy` to disable camera, microphone, geolocation, payment, and USB by default.
- A conservative `Content-Security-Policy` that allows only this static app, Google Fonts stylesheet/font loading, local images, the service worker, and the manifest.

## CSP shape

The site currently loads Google Fonts from `fonts.googleapis.com` and `fonts.gstatic.com`, so those two origins are explicitly allowed. The policy also allows inline styles because Vite/Tailwind static builds and browser style handling can require it. Scripts remain limited to `self`.

## New command

```bash
npm run security:check
```

This command validates the Vercel and Netlify security headers and confirms no common analytics/tracking SDKs were added by default.

## Release gate

`npm run qa` now includes:

```bash
npm run security:check
```

So missing security headers block release before deployment.
