#!/usr/bin/env node
import { existsSync, mkdirSync, readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import crypto from 'node:crypto';

const releaseDir = 'release';
mkdirSync(releaseDir, { recursive: true });

function sha256(path) {
  return existsSync(path) ? crypto.createHash('sha256').update(readFileSync(path)).digest('hex') : 'missing';
}

function walk(dir, results = []) {
  if (!existsSync(dir)) return results;
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const stat = statSync(full);
    if (stat.isDirectory()) walk(full, results);
    else results.push(full.replaceAll('\\\\', '/'));
  }
  return results;
}

const packageJson = JSON.parse(readFileSync('package.json', 'utf8'));
const criticalFiles = [
  'package.json',
  'package-lock.json',
  '.npmrc',
  '.nvmrc',
  'vite.config.ts',
  'vercel.json',
  'netlify.toml',
  '.replit',
  '.github/workflows/build-check.yml',
  'README.md',
  'DEPLOYMENT_CHECKLIST.md',
  'CONTRIBUTING.md',
  'CHANGELOG.md',
  'docs/HANDOFF_KIT.md',
  'docs/IMPLEMENTATION_PHASES.md',
  'scripts/doctor.mjs',
  'scripts/content-integrity.mjs',
  'scripts/route-smoke.mjs',
  'scripts/performance-budget.mjs',
  'scripts/release-readiness.mjs',
  'scripts/release-report.mjs',
  'scripts/handoff-check.mjs',
  'scripts/handoff-manifest.mjs',
];

const srcFiles = walk('src');
const docFiles = walk('docs');
const lines = [
  '# Sadhana OS Handoff Manifest',
  '',
  `Generated: ${new Date().toISOString()}`,
  '',
  '## Project Snapshot',
  '',
  `- Package: ${packageJson.name}@${packageJson.version}`,
  `- Node engine: ${packageJson.engines?.node || 'missing'}`,
  `- Source files: ${srcFiles.length}`,
  `- Documentation files: ${docFiles.length}`,
  `- Lockfile SHA-256: ${sha256('package-lock.json')}`,
  '',
  '## Required Final Verification',
  '',
  '```bash',
  'npm ci',
  'npm run release:check',
  'npm run preview',
  '```',
  '',
  '## Critical File Hashes',
  '',
  '| File | SHA-256 |',
  '|---|---|',
  ...criticalFiles.map((file) => `| ${file} | ${sha256(file)} |`),
  '',
  '## Safe Continuation Rule',
  '',
  'Future agents should read `docs/HANDOFF_KIT.md`, `docs/MASTER_CONTENT_BLUEPRINT.md`, and `docs/IMPLEMENTATION_PHASES.md` before changing content or architecture.',
  '',
];

writeFileSync(join(releaseDir, 'HANDOFF_MANIFEST.md'), lines.join('\n'));
console.log('Handoff manifest written to release/HANDOFF_MANIFEST.md');
