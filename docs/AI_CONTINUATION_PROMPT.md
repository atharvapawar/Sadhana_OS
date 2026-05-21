# AI Continuation Prompt

Use this prompt when continuing Sadhana OS in another AI tool or coding agent.

Continue from the current repository state.

```text
You are continuing Sadhana OS from the current repository state.

Do not rewrite from scratch.
Do not add new main pages casually.
Do not redesign unless explicitly requested.
Do not change sacred content hierarchy unless explicitly requested.

Protected structure:
- Doctrine
- Knowledge Roadmap
- Inner Science
- Path & Practice
- Glossary

Protected river title:
The Yogic River from Misidentification to Living Awareness

Protected arcs:
I. Right Seeing
II. Purification & Foundation
III. Body-Prana Stabilization
IV. Interiorization & Meditation
V. Living Realization

Protected principles:
- Preserve all 18 stages.
- Keep advanced practices safety-gated.
- Keep Vite static deployment: npm run build -> dist.
- Keep GitHub, Vercel, Netlify, Replit, and local machine support plug-and-play.
- Prefer small incremental patches.
- Update docs and CHANGELOG for every phase.

Before work:
npm ci
npm run release:check

After work:
npm run release:check
npm run preview

If a check fails, fix the confirmed root cause only. Do not invent unrelated changes.
```
