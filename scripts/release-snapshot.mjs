#!/usr/bin/env node
import { existsSync, readFileSync, writeFileSync, mkdirSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import crypto from 'node:crypto';

const releaseDir = 'release';
mkdirSync(releaseDir, { recursive: true });

function read(path) { return existsSync(path) ? readFileSync(path, 'utf8') : ''; }
function sha256(path) {
  return existsSync(path) ? crypto.createHash('sha256').update(readFileSync(path)).digest('hex') : 'missing';
}
function walk(dir, results = []) {
  if (!existsSync(dir)) return results;
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const stat = statSync(full);
    if (stat.isDirectory()) walk(full, results);
    else results.push(full);
  }
  return results;
}

const pkg = JSON.parse(read('package.json') || '{}');
const distFiles = walk('dist');
const distSize = distFiles.reduce((sum, file) => sum + statSync(file).size, 0);
const routes = ['/', '/roadmap', '/stage/1', '/stage/18', '/inner-science', '/practice', '/glossary', '/experience'];
const checks = [
  ['Doctor', 'npm run doctor'],
  ['Content integrity', 'npm run content:check'],
  ['Sitemap generation', 'npm run sitemap:generate'],
  ['Metadata check', 'npm run metadata:check'],
  ['Security headers check', 'npm run security:check'],
  ['Accessibility QA', 'npm run a11y:qa'],
  ['Visual/responsive QA', 'npm run visual:qa'],
  ['Production build', 'npm run build'],
  ['Static resilience check', 'npm run static:check'],
  ['Performance budget', 'npm run performance'],
  ['Route smoke', 'npm run route:smoke'],
  ['Release readiness', 'npm run release:readiness'],
  ['Release report', 'npm run release:report'],
  ['Handoff check', 'npm run handoff:check'],
  ['Handoff manifest', 'npm run handoff:manifest'],
];

const lines = [
  '# Sadhana OS Final Release Snapshot',
  '',
  `Generated: ${new Date().toISOString()}`,
  '',
  '## Identity',
  '',
  '- Project: Sadhana OS',
  '- River: The Yogic River from Misidentification to Living Awareness',
  '- Structure: Doctrine, Knowledge Roadmap, Inner Science, Path & Practice, Glossary',
  `- Package: ${pkg.name || 'unknown'} ${pkg.version || ''}`.trim(),
  `- Node engine: ${pkg.engines?.node || 'missing'}`,
  '',
  '## Verification Gate',
  '',
  'Run before deployment:',
  '',
  '```bash',
  'npm ci',
  'npm run release:check',
  'npm run preview',
  '```',
  '',
  '| Gate | Command |',
  '|---|---|',
  ...checks.map(([label, command]) => `| ${label} | \`${command}\` |`),
  '',
  '## Static Routes Expected to Serve',
  '',
  ...routes.map((route) => `- ${route}`),
  '',
  '## Build Output Snapshot',
  '',
  `- dist exists: ${existsSync('dist') ? 'yes' : 'no'}`,
  `- dist files: ${distFiles.length}`,
  `- dist size: ${(distSize / 1024).toFixed(1)} KB`,
  `- package-lock SHA-256: ${sha256('package-lock.json')}`,
  `- vercel.json SHA-256: ${sha256('vercel.json')}`,
  `- netlify.toml SHA-256: ${sha256('netlify.toml')}`,
  '',
  '## Deployment Settings',
  '',
  '- Vercel: build command `npm run build`, output directory `dist`',
  '- Netlify: build command `npm run build`, publish directory `dist`',
  '- Replit/local: `npm ci` then `npm run dev`',
  '',
  '## Release Rule',
  '',
  'Do not merge or upload if `npm run release:check` fails.',
  '',
];

writeFileSync(join(releaseDir, 'FINAL_RELEASE_SNAPSHOT.md'), lines.join('\n'));
console.log('Final release snapshot written to release/FINAL_RELEASE_SNAPSHOT.md');
