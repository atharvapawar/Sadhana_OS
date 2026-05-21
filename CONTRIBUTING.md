# Contributing to Sadhana OS

Sadhana OS should be changed slowly, safely, and incrementally.

## Guardrails

- Do not add new main pages casually.
- Do not redesign without explicit approval.
- Do not change the 18-stage river without explicit approval.
- Do not weaken safety language around pranayama, bandha, mudra, kriya, kundalini, shatkarma, fasting, or teacher-guided practice.
- Do not remove QA, release, or handoff scripts.
- Do not introduce private registry URLs or non-portable dependency references.

## Main Knowledge Homes

All content must belong clearly to one of these homes:

1. Doctrine
2. Knowledge Roadmap
3. Inner Science
4. Path & Practice
5. Glossary

## Before changing content

Read:

```text
docs/MASTER_CONTENT_BLUEPRINT.md
docs/CONTENT_PLACEMENT_MATRIX.md
docs/IMPLEMENTATION_PHASES.md
docs/HANDOFF_KIT.md
```

## Before pushing or exporting

Run:

```bash
npm ci
npm run release:check
npm run preview
```

## Commit style

Use small, descriptive commits:

```text
fix: repair mobile roadmap overflow
docs: add glossary relationship notes
chore: strengthen release handoff checks
```

## Safe change priority

1. Fix bugs without changing content.
2. Improve clarity without changing structure.
3. Add data before adding UI.
4. Add UI only when existing sections cannot express the content well.
5. Add new pages only after explicit approval.
