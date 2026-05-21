# Changelog

## Phase 21 — Launch, Domain & Monitoring Runbook

- Added `docs/LAUNCH_DOMAIN_MONITORING_RUNBOOK.md`.
- Added `scripts/launch-readiness.mjs`.
- Added `npm run launch:readiness`.
- Added launch readiness report generation to `release/`.
- Integrated launch readiness into `npm run release:check`.
- No sacred content, route, roadmap, or UI structure changes.


## Phase 19 — Production Evidence Pack + One-Command Release Gate

- Added `scripts/production-evidence.mjs`.
- Added `npm run production:evidence` and `npm run final:gate`.
- Upgraded `npm run release:check` to generate `release/PRODUCTION_EVIDENCE.md` and `release/PRODUCTION_EVIDENCE.json`.
- Added `docs/PRODUCTION_EVIDENCE_PACK.md`.
- Updated doctor checks to protect the new evidence layer.
- No sacred content, UI, roadmap, naming, routes, or practice-safety structure was changed.


## Phase 16 — Security, Privacy & Header Hardening

- Added global Vercel and Netlify security headers.
- Added Content Security Policy, Referrer Policy, Permissions Policy, MIME sniffing protection, and frame protection.
- Added `scripts/security-headers-check.mjs` and `npm run security:check`.
- Integrated security validation into `npm run qa`.
- Added security/privacy documentation.


## Phase 13 — Repository Hygiene + Handoff Kit

- Added `docs/HANDOFF_KIT.md` as the first-read file for future developers and AI agents.
- Added `CONTRIBUTING.md` with project guardrails and safe-change protocol.
- Added `CHANGELOG.md` to preserve upgrade history.
- Added `scripts/handoff-check.mjs` to verify handoff readiness.
- Added `scripts/handoff-manifest.mjs` to generate a critical-file manifest and hashes.
- Added `npm run handoff:check` and `npm run handoff:manifest`.
- Upgraded `npm run release:check` so release verification now includes handoff readiness and manifest generation.
- No UI, route, content hierarchy, or 18-stage naming changes were made.

## Phase 12 — Deployment Automation + Release Readiness

- Added release readiness and release report automation.
- Strengthened GitHub Actions release gate.
- Preserved GitHub, Vercel, Netlify, and Replit deployment readiness.

## Phase 11 — Production QA + Content Integrity

- Added content integrity and route smoke tests.
- Protected the 18-stage river, glossary fields, static route fallback, and generated build assets.

## Phase 10 — Final Temple Polish

- Added final UX polish, route error boundary, River Compass, Back to Top, skip link, active nav semantics, and reduced-motion support.

## Phase 9 — Performance + Deployment Hardening

- Added route-level code splitting and performance budget checks.

## Phase 8 — Path & Practice Safety System

- Added readiness-based practice lanes and protected advanced-practice explanations.

## Phase 7 — Glossary Relationship System

- Added related terms, not-the-same-as distinctions, safety labels, and stage links.

## Phase 6 — Inner Science Concept Map

- Connected Sharira, Kosha, Tattva, Prana, Vayu, Nadi, Chakra, Guna, Dosha, Antahkarana, Sakshi, and Atman.

## Phase 5 — 18 Stage Intelligence Cards

- Added consistent intelligence fields for all 18 stages.

## Phase 4 — Master Content Blueprint

- Added content placement and anti-overlap architecture.

## Phase 3 — UX Stability + Responsive Perfection

- Added scroll-to-top route behavior and responsive layout fixes.

## Earlier phases

- Deployment readiness, naming upgrade, five-arc roadmap organization, and plug-and-play Vite setup.

## Phase 14 — SEO, Accessibility & Metadata Hardening

- Replaced placeholder app metadata with final Sadhana OS metadata.
- Added manifest metadata for app-like installation behavior.
- Added sitemap and robots generation.
- Added metadata QA checks to the normal release gate.
- Kept sacred content, routes, and UI structure unchanged.

## Phase 15 — Static Resilience & Deployment Polish

- Added production-only service worker registration.
- Added `public/sw.js` and `public/offline.html` for graceful offline navigation fallback.
- Added Vercel and Netlify cache headers for hashed assets, service worker, and manifest.
- Added `scripts/static-resilience-check.mjs` and `npm run static:check`.
- Added static resilience validation into `npm run qa`.
- No sacred content, UI hierarchy, routes, stage names, or roadmap arcs were changed.

## Phase 17 — Visual QA, Accessibility QA & Release Snapshot

- Added `scripts/accessibility-qa.mjs`.
- Added `scripts/visual-qa.mjs`.
- Added `scripts/release-snapshot.mjs`.
- Added `docs/VISUAL_ACCESSIBILITY_RELEASE_QA.md`.
- Added `npm run a11y:qa`, `npm run visual:qa`, and `npm run release:snapshot`.
- Added these checks to the full QA/release gate.
- No UI, sacred content, roadmap, or 5-arc structure changes.

## Phase 18 — Dependency, Environment & Deploy Smoke Hardening

- Added dependency hygiene validation for public npm registry, portable dependency specifiers, lockfile consistency, and local Vite binary presence.
- Added environment readiness validation for Node/npm, `.nvmrc`, `.npmrc`, `.env.example`, and Vite portability.
- Added deployment smoke kit generation for GitHub, Vercel, Netlify, Replit, and local preview verification.
- Added `.env.example` with `SITE_URL` guidance for production sitemap generation.
- Integrated the new checks into the QA/release flow without changing sacred content or UI structure.

## Phase 20 — Maintenance, Versioning & Future Upgrade Guardrails

- Added `docs/MAINTENANCE_VERSIONING_GUARDRAILS.md`.
- Added `docs/AI_CONTINUATION_PROMPT.md`.
- Added `.github/PULL_REQUEST_TEMPLATE.md`.
- Added `scripts/versioning-check.mjs` and `npm run version:check`.
- Added `scripts/maintenance-check.mjs` and `npm run maintenance:check`.
- Added `scripts/continuation-plan.mjs` and `npm run continuation:plan`.
- Upgraded `npm run release:check` to include versioning, maintenance, and continuation-plan validation.
- Added generation of `release/CONTINUATION_PLAN.md` and `release/CONTINUATION_PLAN.json`.
- No sacred content, UI, routes, roadmap, stage naming, five-arc structure, or practice-safety system was changed.

## Phase 22 — Stage Depth & Integrated Yogic Ascent Matrix

Added a deeper 18-stage data layer and rendered it inside existing stage detail pages. Each stage now includes deep stage architecture plus an integrated ascent matrix connecting kosha, bhuta, chakra language, vayu, body-practice direction, purification/healing target, safety gate, and glossary terms. No new main pages, no redesign, and no unsafe DIY advanced instructions were added.


## Phase 23 — Cross-Linking Intelligence

- Added stage-by-stage cross-linking intelligence.
- Added stable glossary anchors for direct term linking.
- Added related-stage, doctrine, inner-science, practice, glossary, and integration-prompt connections.
- Added `npm run crosslink:check` and included it in QA/release checks.
- No new main pages, no roadmap renaming, no unsafe advanced instructions.

## Phase 25 — Progressive Study Layers

- Added guided five-layer reading mode inside each stage detail page.
- Added accessible accordion-style controls using `aria-expanded` and `aria-controls`.
- Added stable anchors for stage intelligence, deep architecture, ascent matrix, cross-linking, and practice safety.
- Added `npm run study:layers:check` to protect the feature in release QA.

## Phase 24 — Starting Guidance & Seeker Orientation

- Added readiness-based starting guidance to the existing homepage.
- Added five seeker signals: new, confused, unstable, practice-seeking, and advanced-curious.
- Added recommended first movement, next steps, avoid list, and daily anchor for each signal.
- Added protected anchors for `/practice#protected-zone` and `/stage/11#integrated-yogic-ascent-matrix`.
- Added `scripts/start-guidance-check.mjs` and `npm run start:guide:check`.
- Added the start guidance check into the QA gate.
- No new main pages, no roadmap changes, no unsafe advanced instructions.


## Phase 26 — Contemplation Protocol & Reflective Practice Rhythm

- Added stage-by-stage contemplation data for all 18 stages.
- Added accessible Observe / Release / Integrate tab interface to stage detail pages.
- Added daily micro-practice, journal prompt, and safety reminder for every stage.
- Added automated `npm run contemplation:check` quality gate.
- Preserved existing five-section architecture, 18-stage naming, and safety boundaries.


## Phase 27 — River Navigation Compass

- Added a stage-level River Stage Navigator.
- Added previous/current/next stage context and same-arc companion links.
- Added fast jumps to existing stage sections without adding new pages.
- Added `npm run river:navigator:check` into the release gate.

## Phase 28 — Responsive QA Cleanroom & Active Route Guard

- Added `scripts/responsive-route-check.mjs`.
- Added `npm run responsive:check`.
- Integrated active-route responsive checks into the full QA/release gate.
- Refined visual QA so generic unused UI helper primitives do not produce misleading fixed-min-width warnings.
- Preserved sacred content, 18-stage naming, five-arc roadmap, routes, and safety boundaries.

## Phase 29 — Tradition Source Integrity & Non-Claim Guardrails

- Added `src/data/tradition-source-map.ts`.
- Added `src/components/stage-source-lens.tsx`.
- Added `scripts/tradition-source-check.mjs`.
- Added `npm run tradition:check`.
- Integrated tradition/source integrity into the full QA/release gate.
- Added stage-level source logic, integration rules, guardrails, and non-claim language for all 18 stages.

## Phase 30 — Safety, Scope & Non-Medical Clarity

- Added a public-facing Safety & Scope layer without changing the five-section architecture.
- Added compact global footer disclosure and full Path & Practice safety panel.
- Clarified that Sadhana OS is educational, not medical advice, mental-health treatment, initiation, emergency support, or a guarantee of realization.
- Added `npm run safety:scope:check` and included it in the QA/release gate.
