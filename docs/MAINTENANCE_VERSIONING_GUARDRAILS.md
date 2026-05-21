# Maintenance, Versioning & Future Upgrade Guardrails

Phase 20 makes future continuation safer. It does not change sacred content, UI structure, routes, the 18-stage river, or the five-arc roadmap.

## Non-negotiable maintenance rules

1. Do not rewrite from scratch.
2. Do not add new main pages casually.
3. Preserve the five main sections: Doctrine, Knowledge Roadmap, Inner Science, Path & Practice, Glossary.
4. Preserve the river title: **The Yogic River from Misidentification to Living Awareness**.
5. Preserve the five arcs and 18 stages unless the user explicitly approves a naming/sequence update.
6. Keep advanced practices visible as traditional knowledge but safety-gated.
7. Keep Vite static deployment portable: `npm run build` outputs `dist`.
8. Keep GitHub, Vercel, Netlify, Replit, and local machine support plug-and-play.
9. Run the release gate before every zip export, GitHub push, Vercel deploy, or Netlify deploy.

## Semantic versioning policy

The package version follows SemVer shape: `MAJOR.MINOR.PATCH`.

- Patch: deployment scripts, docs, QA checks, small fixes, typo fixes, no content architecture change.
- Minor: additive safe features, new data layers, non-breaking content expansion inside existing sections.
- Major: approved changes to main architecture, routing model, or public content contract.

Because this is a private static site package, versioning is mainly for handoff clarity and release tracking, not npm publishing.

## Safe future-upgrade protocol

Before changing anything:

```bash
npm ci
npm run release:check
```

Then:

1. Write the intended phase and goal.
2. Identify protected files and concepts.
3. Make the smallest safe patch.
4. Run:

```bash
npm run release:check
npm run preview
```

5. Update docs and changelog.
6. Export the new zip only after checks pass.

## One-command release gate

Use this before final delivery:

```bash
npm run final:gate
```

For non-interactive CI or local final verification without leaving preview open:

```bash
npm ci
npm run release:check
```

## Rollback protocol

If a future change breaks the project:

1. Restore the previous zip or Git commit.
2. Run `npm ci`.
3. Run `npm run release:check`.
4. Confirm preview routes.
5. Re-apply only the smallest confirmed-safe part of the failed change.

Never pile new fixes on top of an unknown broken state.

## Future AI agent rule

Future AI/developer work should begin by reading:

1. `docs/HANDOFF_KIT.md`
2. `docs/MASTER_CONTENT_BLUEPRINT.md`
3. `docs/MAINTENANCE_VERSIONING_GUARDRAILS.md`
4. `docs/AI_CONTINUATION_PROMPT.md`
5. `CHANGELOG.md`
