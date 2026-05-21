#!/usr/bin/env node
import { existsSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs';

const failures = [];
const warnings = [];
const releaseDir = 'release';
mkdirSync(releaseDir, { recursive: true });

function read(path) {
  return existsSync(path) ? readFileSync(path, 'utf8') : '';
}

function requireFile(path) {
  if (!existsSync(path)) failures.push(`Missing required launch file: ${path}`);
}

function requireText(path, text, label = text) {
  const content = read(path);
  if (!content.includes(text)) failures.push(`${path} is missing ${label}`);
}

const requiredFiles = [
  'docs/LAUNCH_DOMAIN_MONITORING_RUNBOOK.md',
  'DEPLOYMENT_CHECKLIST.md',
  'README.md',
  'vercel.json',
  'netlify.toml',
  'public/robots.txt',
  'public/sitemap.xml',
  'public/manifest.webmanifest',
  'package.json',
];
requiredFiles.forEach(requireFile);

const pkg = JSON.parse(read('package.json') || '{}');
const scripts = pkg.scripts || {};

const requiredScriptTexts = {
  'launch:readiness': 'node scripts/launch-readiness.mjs',
  'final:gate': 'npm ci && npm run release:check && npm run preview',
};

for (const [name, expected] of Object.entries(requiredScriptTexts)) {
  if (scripts[name] !== expected) failures.push(`package.json script "${name}" should be "${expected}"`);
}

const releaseCheck = scripts['release:check'] || '';
if (!releaseCheck.includes('npm run launch:readiness')) {
  failures.push('release:check should include npm run launch:readiness');
}

const runbookChecks = [
  ['docs/LAUNCH_DOMAIN_MONITORING_RUNBOOK.md', 'GitHub launch sequence', 'GitHub launch sequence'],
  ['docs/LAUNCH_DOMAIN_MONITORING_RUNBOOK.md', 'Vercel launch sequence', 'Vercel launch sequence'],
  ['docs/LAUNCH_DOMAIN_MONITORING_RUNBOOK.md', 'Netlify launch sequence', 'Netlify launch sequence'],
  ['docs/LAUNCH_DOMAIN_MONITORING_RUNBOOK.md', 'Replit launch sequence', 'Replit launch sequence'],
  ['docs/LAUNCH_DOMAIN_MONITORING_RUNBOOK.md', 'Domain and DNS checklist', 'Domain and DNS checklist'],
  ['docs/LAUNCH_DOMAIN_MONITORING_RUNBOOK.md', 'Post-deploy smoke test', 'Post-deploy smoke test'],
  ['docs/LAUNCH_DOMAIN_MONITORING_RUNBOOK.md', 'Search indexing checklist', 'Search indexing checklist'],
  ['docs/LAUNCH_DOMAIN_MONITORING_RUNBOOK.md', 'Rollback plan', 'Rollback plan'],
  ['DEPLOYMENT_CHECKLIST.md', 'Launch Runbook', 'launch runbook pointer'],
  ['README.md', 'Launch readiness', 'launch readiness section'],
  ['public/robots.txt', 'Sitemap:', 'robots sitemap pointer'],
];
runbookChecks.forEach(([path, text, label]) => requireText(path, text, label));

const sitemap = read('public/sitemap.xml');
if (!sitemap.includes('<loc>')) failures.push('public/sitemap.xml should include URL <loc> entries');
if (sitemap.includes('your-domain.com')) warnings.push('Sitemap still uses placeholder domain. Set SITE_URL before public deployment.');

const report = [
  '# Sadhana OS Launch Readiness Report',
  '',
  `Generated: ${new Date().toISOString()}`,
  '',
  '## Checked Launch Surfaces',
  '',
  '- GitHub upload/handoff sequence',
  '- Vercel launch sequence',
  '- Netlify launch sequence',
  '- Replit launch sequence',
  '- Domain and DNS checklist',
  '- Post-deploy smoke test checklist',
  '- Search indexing checklist',
  '- Rollback plan',
  '',
  '## Result',
  '',
  failures.length ? 'FAILED' : 'PASSED',
  '',
  '## Warnings',
  '',
  warnings.length ? warnings.map((warning) => `- ${warning}`).join('\n') : '- None',
  '',
  '## Failures',
  '',
  failures.length ? failures.map((failure) => `- ${failure}`).join('\n') : '- None',
  '',
].join('\n');

writeFileSync(`${releaseDir}/LAUNCH_READINESS_REPORT.md`, report);
writeFileSync(`${releaseDir}/LAUNCH_READINESS_REPORT.json`, JSON.stringify({
  generatedAt: new Date().toISOString(),
  status: failures.length ? 'failed' : 'passed',
  warnings,
  failures,
}, null, 2));

if (failures.length) {
  console.error('\nLaunch readiness check failed:\n');
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log('Launch readiness check passed.');
if (warnings.length) {
  console.warn('\nWarnings:');
  warnings.forEach((warning) => console.warn(`- ${warning}`));
}
