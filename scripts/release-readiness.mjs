#!/usr/bin/env node
import { existsSync, readFileSync, readdirSync, statSync, writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import crypto from 'node:crypto';

const failures = [];
const warnings = [];
const root = process.cwd();
const dist = join(root, 'dist');

function read(path) {
  return existsSync(path) ? readFileSync(path, 'utf8') : '';
}

function requireFile(path) {
  if (!existsSync(path)) failures.push(`Missing required release file: ${path}`);
}

function requireText(path, text, label = text) {
  const content = read(path);
  if (!content.includes(text)) failures.push(`${path} is missing ${label}`);
}

function rejectText(path, patterns) {
  const content = read(path).toLowerCase();
  for (const pattern of patterns) {
    if (content.includes(pattern.toLowerCase())) failures.push(`${path} contains blocked release text: ${pattern}`);
  }
}

function fileSize(path) {
  return existsSync(path) ? statSync(path).size : 0;
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

const requiredFiles = [
  'package.json',
  '.npmrc',
  '.nvmrc',
  'vite.config.ts',
  'vercel.json',
  'netlify.toml',
  '.replit',
  '.github/workflows/build-check.yml',
  'DEPLOYMENT_CHECKLIST.md',
  'README.md',
  'docs/IMPLEMENTATION_PHASES.md',
  'docs/PRODUCTION_QA_CONTENT_INTEGRITY.md',
  'docs/PERFORMANCE_DEPLOYMENT_HARDENING.md',
  'docs/SEO_ACCESSIBILITY_METADATA_HARDENING.md',
  'docs/MAINTENANCE_VERSIONING_GUARDRAILS.md',
  'docs/AI_CONTINUATION_PROMPT.md',
  '.github/PULL_REQUEST_TEMPLATE.md',
  'public/manifest.webmanifest',
  'public/robots.txt',
  'public/sitemap.xml',
  '.env.example',
];
requiredFiles.forEach(requireFile);

const packageJson = JSON.parse(read('package.json') || '{}');
const scripts = packageJson.scripts || {};
const releaseScripts = ['doctor', 'content:check', 'sitemap:generate', 'metadata:check', 'performance', 'route:smoke', 'qa', 'check', 'release:check', 'release:report', 'handoff:check', 'handoff:manifest', 'dependency:check', 'env:check', 'deploy:smoke', 'version:check', 'maintenance:check', 'continuation:plan', 'launch:readiness', 'safety:scope:check'];
for (const script of releaseScripts) {
  if (!scripts[script]) failures.push(`package.json is missing release script: ${script}`);
}

requireText('.npmrc', 'registry=https://registry.npmjs.org/', 'public npm registry');
requireText('.nvmrc', '18', 'Node 18 pin');
requireText('vercel.json', '"buildCommand": "npm run build"', 'Vercel build command');
requireText('vercel.json', '"outputDirectory": "dist"', 'Vercel output directory');
requireText('netlify.toml', 'command = "npm run build"', 'Netlify build command');
requireText('netlify.toml', 'publish = "dist"', 'Netlify publish directory');
requireText('.github/workflows/build-check.yml', 'npm ci', 'CI clean install');
requireText('.github/workflows/build-check.yml', 'npm run release:check', 'CI release gate');
requireText('DEPLOYMENT_CHECKLIST.md', 'Vercel', 'Vercel checklist section');
requireText('DEPLOYMENT_CHECKLIST.md', 'Netlify', 'Netlify checklist section');
requireText('DEPLOYMENT_CHECKLIST.md', 'GitHub', 'GitHub checklist section');
requireText('README.md', 'npm run release:check', 'release check instructions');
requireText('README.md', 'Safety & Scope', 'safety scope section');
requireText('README.md', 'npm run dependency:check', 'dependency hygiene instructions');
requireText('README.md', 'npm run env:check', 'environment readiness instructions');
requireText('README.md', 'npm run deploy:smoke', 'deployment smoke instructions');
requireText('README.md', 'Handoff Kit', 'handoff kit instructions');
requireText('README.md', 'Maintenance & Versioning Guardrails', 'maintenance guardrails instructions');
requireText('README.md', 'npm run version:check', 'version check instructions');
requireText('README.md', 'npm run maintenance:check', 'maintenance check instructions');
requireText('index.html', 'The Yogic River from Misidentification to Living Awareness', 'final metadata title phrase');
requireText('public/robots.txt', 'Sitemap:', 'robots sitemap pointer');
requireText('public/sitemap.xml', '/stage/18', 'full stage sitemap coverage');
requireText('docs/HANDOFF_KIT.md', 'Non-Negotiable Project Rules', 'handoff guardrails');
requireText('CONTRIBUTING.md', 'Do not add new main pages casually', 'contribution guardrails');
requireText('CHANGELOG.md', 'Phase 13', 'Phase 13 changelog entry');
requireText('CHANGELOG.md', 'Phase 20', 'Phase 20 changelog entry');

rejectText('package.json', ['applied-caas-gateway', 'artifactory', 'internal.openai']);
rejectText('.npmrc', ['artifactory', 'internal.openai', 'applied-caas-gateway']);

const distIndex = join(dist, 'index.html');
if (!existsSync(distIndex)) failures.push('dist/index.html is missing. Run npm run build before release readiness.');
else {
  const html = read('dist/index.html');
  if (!html.includes('<div id="root">')) failures.push('dist/index.html does not look like the built React shell.');
  const assetRefs = [...html.matchAll(/(?:src|href)="([^"?#]+)[^" ]*"/g)].map((m) => m[1]).filter((href) => href.startsWith('/assets/') || href.startsWith('assets/'));
  if (!assetRefs.length) failures.push('dist/index.html has no built asset references.');
  for (const ref of assetRefs) {
    const assetPath = join(dist, ref.replace(/^\//, ''));
    if (!existsSync(assetPath)) failures.push(`dist/index.html references missing asset: ${ref}`);
  }
}

const distFiles = walk(dist);
const totalDistBytes = distFiles.reduce((sum, file) => sum + fileSize(file), 0);
if (totalDistBytes > 5 * 1024 * 1024) warnings.push(`dist is ${(totalDistBytes / 1024 / 1024).toFixed(2)} MB. Keep the static site lightweight.`);

const reportDir = 'release';
mkdirSync(reportDir, { recursive: true });
const lockHash = existsSync('package-lock.json')
  ? crypto.createHash('sha256').update(readFileSync('package-lock.json')).digest('hex')
  : existsSync('../../pnpm-lock.yaml')
  ? 'pnpm-workspace-lockfile'
  : 'missing';
const report = `# Sadhana OS Release Readiness Report\n\nGenerated: ${new Date().toISOString()}\n\n## Verified Release Surface\n\n- Package: ${packageJson.name || 'unknown'}@${packageJson.version || 'unknown'}\n- Node engine: ${packageJson.engines?.node || 'missing'}\n- Lockfile SHA-256: ${lockHash}\n- dist files: ${distFiles.length}\n- dist size: ${(totalDistBytes / 1024).toFixed(1)} KB\n\n## Required Commands\n\n\`\`\`bash\nnpm ci\nnpm run release:check\nnpm run preview\n\`\`\`\n\n## Deployment Settings\n\n- Vercel build command: npm run build\n- Vercel output directory: dist\n- Netlify build command: npm run build\n- Netlify publish directory: dist\n- Replit run command: npm run dev\n\n## Result\n\n${failures.length ? 'FAILED' : 'PASSED'}\n\n${warnings.length ? `## Warnings\n\n${warnings.map((warning) => `- ${warning}`).join('\n')}\n` : ''}`;
writeFileSync(join(reportDir, 'RELEASE_READINESS_REPORT.md'), report);

if (failures.length) {
  console.error('\nSadhana OS release readiness failed:\n');
  for (const failure of failures) console.error(`- ${failure}`);
  if (warnings.length) {
    console.warn('\nWarnings:');
    for (const warning of warnings) console.warn(`- ${warning}`);
  }
  process.exit(1);
}

console.log('Sadhana OS release readiness passed.');
console.log('Release report written to release/RELEASE_READINESS_REPORT.md');
if (warnings.length) {
  console.warn('\nWarnings:');
  for (const warning of warnings) console.warn(`- ${warning}`);
}
