# Phase 7 — Glossary Relationship System

Status: implemented inside the existing Glossary page.

## Purpose

The glossary is no longer only a list of definitions. It is a relationship system that prevents the seeker from confusing overlapping Sanatana/Yogic terms.

Every glossary card can now show:

1. Term
2. Category
3. Safety label
4. Core meaning
5. Beginner meaning
6. Deeper meaning
7. Related terms
8. Not the same as
9. Used in the 18-stage river

## Why this matters

Many terms point in the same direction but are not identical:

- Atman, Sakshi, Purusha, and Turiya
- Manas, Chitta, Ahamkara, and Buddhi
- Prana, Vayu, Nadi, and Chakra
- Dharana, Dhyana, and Samadhi
- Moksha, Kaivalya, Jivanmukti, and Sahaja

The glossary now makes those relationships visible without flattening the tradition into one vague meaning.

## Safety logic

Each term has a safety label:

- Concept
- Beginner-Safe
- Practice with Care
- Teacher-Guided

This keeps advanced terms visible as knowledge while avoiding unsafe DIY instructions.

## Implementation files

- `src/data/glossary-relationships.ts`
- `src/pages/glossary.tsx`
- `docs/GLOSSARY_RELATIONSHIP_SYSTEM.md`

## Current behavior

The existing Glossary page now includes:

- Search by term, stage, category, or relationship
- Category filters
- Relationship resolver cards
- Stage links back into the 18-stage river
- Mobile-safe card layout

## Future expansion rule

When adding a glossary term, do not add only a definition. Add the relationship context:

```ts
{
  term: "Example",
  category: "Doctrine",
  meaning: "...",
  beginner: "...",
  deeper: "...",
  related: ["..."],
  notSameAs: ["..."],
  stages: [1, 16],
  safety: "Concept"
}
```

This keeps Sadhana OS as an integrated river instead of a scattered encyclopedia.
