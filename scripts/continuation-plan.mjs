#!/usr/bin/env node
import { mkdirSync, writeFileSync, readFileSync, existsSync } from 'node:fs';
import crypto from 'node:crypto';

const now = new Date().toISOString();
const packageJson = JSON.parse(readFileSync('package.json', 'utf8'));
const files = [
  'package.json',
  'src/data/stages.ts',
  'src/data/stage-intelligence.ts',
  'src/data/inner-science-map.ts',
  'src/data/glossary-relationships.ts',
  'src/data/practice-safety.ts',
  'docs/MASTER_CONTENT_BLUEPRINT.md',
  'docs/MAINTENANCE_VERSIONING_GUARDRAILS.md',
  'docs/AI_CONTINUATION_PROMPT.md',
];

function hash(path) {
  return existsSync(path)
    ? crypto.createHash('sha256').update(readFileSync(path)).digest('hex').slice(0, 16)
    : 'missing';
}

const manifest = files.map((file) => `- ${file}: ${hash(file)}`).join('\n');
const markdown = `# Sadhana OS Continuation Plan\n\nGenerated: ${now}\n\nPackage: ${packageJson.name}@${packageJson.version}\n\n## Current safe continuation rule\n\nContinue from the current repository state. Do not rewrite from scratch. Do not add new main pages casually. Preserve the five main sections, the 18-stage river, the five arcs, safety gates, deployment automation, and release evidence flow.\n\n## First command before future work\n\n\`\`\`bash\nnpm ci\nnpm run release:check\n\`\`\`\n\n## Future work order\n\n1. Plan the next change in writing.\n2. Make the smallest safe patch.\n3. Run \`npm run release:check\`.\n4. Preview with \`npm run preview\`.\n5. Update changelog and relevant docs.\n6. Generate fresh release evidence.\n\n## Do not change without explicit approval\n\n- Main section architecture: Doctrine, Knowledge Roadmap, Inner Science, Path & Practice, Glossary.\n- River title: The Yogic River from Misidentification to Living Awareness.\n- Five arcs and 18 stage names.\n- Advanced-practice safety gate language.\n- Vite static deployment assumptions: \`npm run build\` -> \`dist\`.\n\n## Critical file fingerprints\n\n${manifest}\n`;

mkdirSync('release', { recursive: true });
writeFileSync('release/CONTINUATION_PLAN.md', markdown);
writeFileSync('release/CONTINUATION_PLAN.json', JSON.stringify({ generatedAt: now, package: { name: packageJson.name, version: packageJson.version }, files: files.map((file) => ({ file, hash: hash(file) })) }, null, 2));

console.log('Continuation plan written to release/CONTINUATION_PLAN.md and release/CONTINUATION_PLAN.json');
