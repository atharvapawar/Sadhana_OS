#!/usr/bin/env node
import { existsSync, readFileSync, writeFileSync, mkdirSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import crypto from 'node:crypto';

const dist = 'dist';
const releaseDir = 'release';
mkdirSync(releaseDir, { recursive: true });

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

function sha256(path) {
  return existsSync(path) ? crypto.createHash('sha256').update(readFileSync(path)).digest('hex') : 'missing';
}

const packageJson = JSON.parse(readFileSync('package.json', 'utf8'));
const files = walk(dist);
const total = files.reduce((sum, file) => sum + statSync(file).size, 0);
const lines = [
  '# Sadhana OS Release Report',
  '',
  `Generated: ${new Date().toISOString()}`,
  '',
  '## Project',
  '',
  `- Name: ${packageJson.name}`,
  `- Version: ${packageJson.version}`,
  `- Node engine: ${packageJson.engines?.node || 'missing'}`,
  `- Lockfile SHA-256: ${sha256('package-lock.json')}`,
  '',
  '## Build Output',
  '',
  `- dist exists: ${existsSync(dist) ? 'yes' : 'no'}`,
  `- dist file count: ${files.length}`,
  `- dist total size: ${(total / 1024).toFixed(1)} KB`,
  '',
  '## Release Commands',
  '',
  '```bash',
  'npm ci',
  'npm run release:check',
  'npm run preview',
  '```',
  '',
  '## Platform Settings',
  '',
  '- GitHub Actions: .github/workflows/build-check.yml',
  '- Vercel: build command `npm run build`, output directory `dist`',
  '- Netlify: build command `npm run build`, publish directory `dist`',
  '- Replit: `.replit` uses `npm run dev` locally and build/preview for deployment',
  '',
];
writeFileSync(join(releaseDir, 'RELEASE_REPORT.md'), lines.join('\n'));
console.log('Release report written to release/RELEASE_REPORT.md');
