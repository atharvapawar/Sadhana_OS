# Phase 29 — Tradition Source Integrity & Non-Claim Guardrails

Phase 29 adds a source-integrity layer to the existing Sadhana OS stage pages. It does not add new main pages, change the 18-stage river, rename stages, redesign the UI, or publish unsafe advanced practice instructions.

## Purpose

As Sadhana OS becomes deeper, each stage needs a clear traditional source lens so future content expansion stays grounded and does not become random, exaggerated, or unsafe.

The source lens connects each stage to one or more streams:

- Patanjali / Raja Yoga
- Bhagavad Gita / Karma Yoga
- Vedanta / Upanishadic Self-Knowledge
- Hatha Yoga / Body-Prana Technology
- Ayurveda & Inner Science Lens
- Modern Safety & Accessibility Lens

## What was added

- `src/data/tradition-source-map.ts`
- `src/components/stage-source-lens.tsx`
- `scripts/tradition-source-check.mjs`
- `npm run tradition:check`
- Stage-detail rendering of `Traditional Source Lens`

## What each stage now has

Each of the 18 stages has:

- `primaryStreams`
- `sourceLogic`
- `integrationRule`
- `guardrail`
- `notAClaim`

## Why the “Not a Claim” field matters

The site may describe deep terms such as samadhi, Atman, kriya, kundalini, kosha, vayu, chakra, and living realization. These terms must not be presented as a diagnosis, certification, initiation, or claim of attainment.

The source lens protects the site from:

- pretending every tradition says the exact same thing
- turning source language into rigid one-to-one charts
- teaching advanced techniques as casual DIY
- using mystical language as proof of attainment
- confusing traditional maps with modern medical claims

## Safety rule

The site may say:

> This exists in tradition. This is its purpose. This is why it matters. This is why it is protected. This is the safer beginner alternative.

The site must not say:

> Do this secret advanced practice by yourself. This will awaken kundalini. This proves enlightenment. This replaces medical or psychological care.

## Verification

Run:

```bash
npm run tradition:check
npm run release:check
```
