#!/usr/bin/env node
import { existsSync, readFileSync } from 'node:fs';

const failures = [];
const warnings = [];

function read(path) {
  return existsSync(path) ? readFileSync(path, 'utf8') : '';
}

function requireFile(path) {
  if (!existsSync(path)) failures.push(`Missing maintenance file: ${path}`);
}

function requireText(path, text, label = text) {
  const content = read(path);
  if (!content.includes(text)) failures.push(`${path} is missing ${label}`);
}

const requiredFiles = [
  'docs/MAINTENANCE_VERSIONING_GUARDRAILS.md',
  'docs/AI_CONTINUATION_PROMPT.md',
  '.github/PULL_REQUEST_TEMPLATE.md',
  'scripts/versioning-check.mjs',
  'scripts/maintenance-check.mjs',
  'scripts/continuation-plan.mjs',
  'scripts/launch-readiness.mjs',
  'CHANGELOG.md',
  'CONTRIBUTING.md',
  'README.md',
  'docs/HANDOFF_KIT.md',
  'docs/MASTER_CONTENT_BLUEPRINT.md',
  'docs/IMPLEMENTATION_PHASES.md',
];
requiredFiles.forEach(requireFile);

requireText('docs/MAINTENANCE_VERSIONING_GUARDRAILS.md', 'Non-negotiable maintenance rules', 'maintenance rules');
requireText('docs/MAINTENANCE_VERSIONING_GUARDRAILS.md', 'One-command release gate', 'one-command release gate');
requireText('docs/MAINTENANCE_VERSIONING_GUARDRAILS.md', 'Rollback protocol', 'rollback protocol');
requireText('docs/AI_CONTINUATION_PROMPT.md', 'Continue from the current repository state', 'continuation starting instruction');
requireText('docs/AI_CONTINUATION_PROMPT.md', 'npm run release:check', 'continuation release check');
requireText('.github/PULL_REQUEST_TEMPLATE.md', 'Verification evidence', 'PR verification evidence section');
requireText('.github/PULL_REQUEST_TEMPLATE.md', 'No new main pages', 'PR no-new-pages guardrail');
requireText('CONTRIBUTING.md', 'Do not add new main pages casually', 'contributing page guardrail');
requireText('docs/HANDOFF_KIT.md', 'One-command final check', 'handoff one-command final check');
requireText('docs/IMPLEMENTATION_PHASES.md', 'Phase 20 — Maintenance, Versioning & Future Upgrade Guardrails', 'Phase 20 implementation note');
requireText('docs/IMPLEMENTATION_PHASES.md', 'Phase 21 — Launch, Domain & Monitoring Runbook', 'Phase 21 implementation note');
requireText('docs/LAUNCH_DOMAIN_MONITORING_RUNBOOK.md', 'Rollback plan', 'launch rollback plan');
requireText('README.md', 'AI continuation prompt', 'README AI continuation prompt note');

const packageJson = JSON.parse(read('package.json') || '{}');
const scripts = packageJson.scripts || {};
const expectedRelease = 'npm run qa && npm run release:readiness && npm run release:report && npm run release:snapshot && npm run handoff:check && npm run handoff:manifest && npm run production:evidence && npm run version:check && npm run maintenance:check && npm run continuation:plan && npm run launch:readiness';
if (scripts['release:check'] !== expectedRelease) failures.push('package.json release:check does not include the full Phase 20 maintenance gate in the expected order');
if (scripts.preflight !== 'npm run release:check') failures.push('package.json preflight should remain npm run release:check');
if (scripts['final:gate'] !== 'npm ci && npm run release:check && npm run preview') failures.push('package.json final:gate should remain the full install/release/preview gate');

if (existsSync('node_modules')) warnings.push('node_modules/ exists locally. It is ignored and should not be committed.');
if (existsSync('dist')) warnings.push('dist/ exists locally after build. It is ignored and should not be committed.');

if (failures.length) {
  console.error('\nSadhana OS maintenance check failed:\n');
  for (const failure of failures) console.error(`- ${failure}`);
  if (warnings.length) {
    console.warn('\nWarnings:');
    for (const warning of warnings) console.warn(`- ${warning}`);
  }
  process.exit(1);
}

console.log('Sadhana OS maintenance check passed.');
if (warnings.length) {
  console.warn('\nWarnings:');
  for (const warning of warnings) console.warn(`- ${warning}`);
}
