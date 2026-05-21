# Visual QA, Accessibility QA & Release Snapshot

Phase 17 adds a final automated quality layer before public deployment.

## Commands

```bash
npm run a11y:qa
npm run visual:qa
npm run release:snapshot
npm run release:check
```

## Accessibility QA

The accessibility QA check confirms that the app keeps core keyboard and semantic protections:

- `index.html` has `lang="en"`, viewport metadata, and title metadata.
- The layout has a skip link to `#main-content`.
- The main landmark is focusable for skip-link usage.
- Desktop and mobile navigation use `aria-current` for the active route.
- The mobile menu exposes `aria-expanded` and `aria-controls`.
- Escape closes the mobile menu.
- Back-to-top has an accessible label.
- Route scroll restoration is controlled.
- Image tags must include `alt` text if images are added later.
- Empty links and `javascript:` links are blocked.

## Visual / Responsive QA

The visual QA check verifies source-level protections for the current static app:

- global horizontal overflow guard
- `min-width: 0` responsive guard
- long Sanskrit/stage title wrapping
- `safe-card`, `safe-title`, `safe-copy`, and tap-target utilities
- reduced-motion protection
- Knowledge Roadmap mobile stage number sizing
- mobile menu vertical overflow safety

This does not replace manual visual review on real devices, but it catches the most likely regression patterns before release.

## Release Snapshot

`npm run release:snapshot` writes:

```text
release/FINAL_RELEASE_SNAPSHOT.md
```

The snapshot records:

- project identity
- final release commands
- quality gates
- expected static routes
- build output size/count
- critical file hashes
- platform deployment settings

## Manual final review still recommended

Before public launch, manually open the production preview on:

- 320px mobile
- 375px mobile
- 390px mobile
- 414px mobile
- 768px tablet
- 1024px laptop
- 1440px desktop

Check that the Knowledge Roadmap stage numbers never clip and that every route starts at the top unless an intentional hash anchor is used.
