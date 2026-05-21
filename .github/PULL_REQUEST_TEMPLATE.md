# Sadhana OS Pull Request

## Purpose

Describe the smallest safe change made in this PR.

## Sacred architecture safety

- [ ] No new main pages were added casually.
- [ ] The five main sections remain intact: Doctrine, Knowledge Roadmap, Inner Science, Path & Practice, Glossary.
- [ ] The 18-stage river remains intact.
- [ ] The five arcs remain intact.
- [ ] Advanced practices remain safety-gated and do not become unsafe DIY instructions.
- [ ] Stage names, Sanskrit labels, and roadmap sequence were not changed without explicit approval.

## Technical safety

- [ ] No private/internal npm registry references were introduced.
- [ ] No `catalog:`, `workspace:`, `link:`, or `file:` dependency specifiers were introduced.
- [ ] Vite static deployment remains `npm run build` -> `dist`.
- [ ] Vercel and Netlify configs still publish `dist`.
- [ ] Service worker/offline/static asset checks still pass.

## Verification evidence

Paste the commands and result summary:

```bash
npm ci
npm run release:check
npm run preview
```

Preview routes checked:

- [ ] `/`
- [ ] `/roadmap`
- [ ] `/stage/18`
- [ ] `/inner-science`
- [ ] `/practice`
- [ ] `/glossary`

## Documentation updated

- [ ] `CHANGELOG.md`
- [ ] relevant file in `docs/`
- [ ] README if user-facing commands or deployment behavior changed

## Rollback notes

Explain how to safely revert this change if needed.
