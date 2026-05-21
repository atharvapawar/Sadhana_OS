#!/usr/bin/env node
import { existsSync, readFileSync } from 'node:fs';

const failures = [];
const warnings = [];

function read(path) {
  return existsSync(path) ? readFileSync(path, 'utf8') : '';
}

function requireFile(path) {
  if (!existsSync(path)) failures.push(`Missing handoff file: ${path}`);
}

function requireText(path, text, label = text) {
  const content = read(path);
  if (!content.includes(text)) failures.push(`${path} is missing ${label}`);
}

function rejectText(path, patterns) {
  const content = read(path).toLowerCase();
  for (const pattern of patterns) {
    if (content.includes(pattern.toLowerCase())) failures.push(`${path} contains blocked handoff text: ${pattern}`);
  }
}

const requiredHandoffFiles = [
  'README.md',
  'DEPLOYMENT_CHECKLIST.md',
  'CONTRIBUTING.md',
  'CHANGELOG.md',
  'docs/HANDOFF_KIT.md',
  'docs/IMPLEMENTATION_PHASES.md',
  'docs/MASTER_CONTENT_BLUEPRINT.md',
  'docs/MAINTENANCE_VERSIONING_GUARDRAILS.md',
  'docs/AI_CONTINUATION_PROMPT.md',
  '.github/PULL_REQUEST_TEMPLATE.md',
  'scripts/handoff-check.mjs',
  'scripts/handoff-manifest.mjs',
  'scripts/release-readiness.mjs',
  'scripts/release-report.mjs',
  'scripts/dependency-hygiene.mjs',
  'scripts/environment-readiness.mjs',
  'scripts/deploy-smoke-kit.mjs',
  'scripts/production-evidence.mjs',
  'scripts/versioning-check.mjs',
  'scripts/maintenance-check.mjs',
  'scripts/continuation-plan.mjs',
  'scripts/launch-readiness.mjs',
  '.github/workflows/build-check.yml',
  '.gitignore',
  '.npmrc',
  '.nvmrc',
  'vercel.json',
  'netlify.toml',
  '.replit',
];
requiredHandoffFiles.forEach(requireFile);

const packageJson = JSON.parse(read('package.json') || '{}');
const scripts = packageJson.scripts || {};
const expectedScripts = {
  'handoff:check': 'node scripts/handoff-check.mjs',
  'handoff:manifest': 'node scripts/handoff-manifest.mjs',
  'release:check': 'npm run qa && npm run release:readiness && npm run release:report && npm run release:snapshot && npm run handoff:check && npm run handoff:manifest && npm run production:evidence && npm run version:check && npm run maintenance:check && npm run continuation:plan && npm run launch:readiness',
  'production:evidence': 'node scripts/production-evidence.mjs',
  'version:check': 'node scripts/versioning-check.mjs',
  'maintenance:check': 'node scripts/maintenance-check.mjs',
  'continuation:plan': 'node scripts/continuation-plan.mjs',
  'launch:readiness': 'node scripts/launch-readiness.mjs',
  'final:gate': 'npm ci && npm run release:check && npm run preview',
  'dependency:check': 'node scripts/dependency-hygiene.mjs',
  'env:check': 'node scripts/environment-readiness.mjs',
  'deploy:smoke': 'node scripts/deploy-smoke-kit.mjs',
  preflight: 'npm run release:check',
};
for (const [name, expected] of Object.entries(expectedScripts)) {
  if (scripts[name] !== expected) failures.push(`package.json script "${name}" should be "${expected}"`);
}

requireText('README.md', 'Handoff Kit', 'Handoff Kit section');
requireText('README.md', 'npm run release:check', 'release check command');
requireText('README.md', 'npm run dependency:check', 'dependency hygiene command');
requireText('README.md', 'npm run env:check', 'environment readiness command');
requireText('README.md', 'npm run deploy:smoke', 'deployment smoke command');
requireText('README.md', 'npm run final:gate', 'final gate command');
requireText('README.md', 'PRODUCTION_EVIDENCE', 'production evidence output');
requireText('CONTRIBUTING.md', 'Do not add new main pages casually', 'contribution guardrails');
requireText('CHANGELOG.md', 'Phase 13', 'Phase 13 changelog entry');
requireText('CHANGELOG.md', 'Phase 19', 'Phase 19 changelog entry');
requireText('CHANGELOG.md', 'Phase 20', 'Phase 20 changelog entry');
requireText('CHANGELOG.md', 'Phase 21', 'Phase 21 changelog entry');
requireText('docs/HANDOFF_KIT.md', 'Non-Negotiable Project Rules', 'handoff guardrails');
requireText('docs/HANDOFF_KIT.md', 'One-command final check', 'final check instructions');
requireText('docs/IMPLEMENTATION_PHASES.md', 'Phase 13 — Repository Hygiene + Handoff Kit', 'Phase 13 implementation note');
requireText('docs/IMPLEMENTATION_PHASES.md', 'Phase 19 — Production Evidence Pack', 'Phase 19 implementation note');
requireText('docs/IMPLEMENTATION_PHASES.md', 'Phase 20 — Maintenance, Versioning & Future Upgrade Guardrails', 'Phase 20 implementation note');
requireText('docs/IMPLEMENTATION_PHASES.md', 'Phase 21 — Launch, Domain & Monitoring Runbook', 'Phase 21 implementation note');
requireText('docs/LAUNCH_DOMAIN_MONITORING_RUNBOOK.md', 'Post-deploy smoke test', 'launch runbook smoke test');
requireText('docs/MAINTENANCE_VERSIONING_GUARDRAILS.md', 'Non-negotiable maintenance rules', 'maintenance guardrails rules');
requireText('docs/AI_CONTINUATION_PROMPT.md', 'Do not add new main pages casually', 'AI continuation no-new-pages guardrail');
requireText('.github/PULL_REQUEST_TEMPLATE.md', 'Verification evidence', 'PR template verification evidence');
requireText('DEPLOYMENT_CHECKLIST.md', 'npm run release:check', 'release check checklist command');
requireText('.gitignore', 'release/', 'release output ignored');
requireText('.gitignore', 'node_modules/', 'node_modules ignored');
requireText('.gitignore', 'dist/', 'dist ignored');
requireText('.github/workflows/build-check.yml', 'npm run release:check', 'CI release check');

const blocked = ['applied-caas-gateway', 'artifactory', 'internal.openai', 'workspace:', 'catalog:'];
for (const file of ['package.json', 'package-lock.json', '.npmrc', 'README.md', 'DEPLOYMENT_CHECKLIST.md']) rejectText(file, blocked);

for (const generated of ['node_modules', 'dist']) {
  if (existsSync(generated)) warnings.push(`${generated}/ exists locally. It is ignored and should not be committed; this is okay after running installs/builds.`);
}

if (failures.length) {
  console.error('\nSadhana OS handoff check failed:\n');
  for (const failure of failures) console.error(`- ${failure}`);
  if (warnings.length) {
    console.warn('\nWarnings:');
    for (const warning of warnings) console.warn(`- ${warning}`);
  }
  process.exit(1);
}

console.log('Sadhana OS handoff check passed.');
if (warnings.length) {
  console.warn('\nWarnings:');
  for (const warning of warnings) console.warn(`- ${warning}`);
}
