# Phase 23 — Cross-Linking Intelligence

Phase 23 turns each stage detail page into a connected spiritual knowledge hub without adding new main pages or changing the sacred roadmap.

## What was added

- `src/data/cross-linking.ts`
- `src/lib/slug.ts`
- `scripts/cross-link-check.mjs`
- `npm run crosslink:check`
- A new `Cross-Linking Intelligence` section on every stage detail page
- Stable glossary term anchors such as `/glossary#term-prana`
- Query-ready glossary entry via `?q=` for future direct search links

## What each stage now connects

Each stage now links to:

- Doctrine connection
- Inner Science connection
- Path & Practice connection
- Glossary bridge terms
- Related stages in the 18-stage river
- A practical integration prompt

## Safety rule

This phase does not add unsafe advanced practice instructions. It only improves navigation, relationship clarity, and content intelligence.

## Why this matters

The site should not feel like separate pages. Doctrine, Roadmap, Inner Science, Path & Practice, and Glossary now reinforce one another from every stage.

## Verification

Run:

```bash
npm run crosslink:check
npm run release:check
```
