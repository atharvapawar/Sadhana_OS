# Phase 30 — Safety, Scope & Non-Medical Clarity

Phase 30 adds a public-facing safety and scope layer without changing the sacred roadmap, adding new main pages, or weakening the depth of the Yogic Science content.

## What changed

- Added `src/data/safety-scope.ts`.
- Added `src/components/safety-scope-notice.tsx`.
- Added a compact global Safety & Scope disclosure in the footer.
- Added a full Safety & Scope panel to the existing Path & Practice page.
- Added `scripts/safety-scope-check.mjs`.
- Added `npm run safety:scope:check` into the full QA/release gate.

## Scope boundaries

Sadhana OS is:

- An educational Yogic Science and Sanatana/Vedantic study map.
- A sequential practice-orientation system.
- A safety-gated content portal.

Sadhana OS is not:

- Medical advice.
- Mental-health treatment.
- Emergency support.
- Personal diagnosis.
- Formal initiation.
- A guarantee of enlightenment or realization.

## Protected practice language

Advanced topics remain visible as traditional knowledge but not as casual DIY instruction:

- Forced kumbhaka and strong pranayama ratios.
- Bandha-mudra combinations.
- Strong shatkarma.
- Kundalini/chakra activation attempts.
- Formal kriya sequences.

## Release check

```bash
npm run safety:scope:check
npm run release:check
```
