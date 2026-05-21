#!/usr/bin/env node
import { existsSync, readFileSync } from 'node:fs';

const failures = [];
const warnings = [];

function read(path) {
  return existsSync(path) ? readFileSync(path, 'utf8') : '';
}

function requireFile(path) {
  if (!existsSync(path)) failures.push(`Missing versioning file: ${path}`);
}

function requireText(path, text, label = text) {
  const content = read(path);
  if (!content.includes(text)) failures.push(`${path} is missing ${label}`);
}

function rejectText(path, patterns) {
  const content = read(path).toLowerCase();
  for (const pattern of patterns) {
    if (content.includes(pattern.toLowerCase())) failures.push(`${path} contains blocked versioning text: ${pattern}`);
  }
}

requireFile('package.json');
requireFile('CHANGELOG.md');
requireFile('docs/MAINTENANCE_VERSIONING_GUARDRAILS.md');
requireFile('docs/AI_CONTINUATION_PROMPT.md');
requireFile('.github/PULL_REQUEST_TEMPLATE.md');

const packageJson = JSON.parse(read('package.json') || '{}');
const version = packageJson.version || '';
const semver = /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-[0-9A-Za-z.-]+)?(?:\+[0-9A-Za-z.-]+)?$/;
if (!semver.test(version)) failures.push(`package.json version is not valid SemVer: ${version || 'missing'}`);

requireText('CHANGELOG.md', 'Phase 20 — Maintenance, Versioning & Future Upgrade Guardrails', 'Phase 20 changelog entry');
requireText('docs/MAINTENANCE_VERSIONING_GUARDRAILS.md', 'Semantic versioning policy', 'semantic versioning policy');
requireText('docs/MAINTENANCE_VERSIONING_GUARDRAILS.md', 'Safe future-upgrade protocol', 'safe future-upgrade protocol');
requireText('docs/AI_CONTINUATION_PROMPT.md', 'Do not add new main pages casually', 'AI continuation guardrail');
requireText('.github/PULL_REQUEST_TEMPLATE.md', 'Sacred architecture safety', 'PR sacred architecture checklist');
requireText('README.md', 'Maintenance & Versioning Guardrails', 'maintenance README section');
requireText('README.md', 'npm run version:check', 'version check README command');
requireText('README.md', 'npm run maintenance:check', 'maintenance check README command');

const scripts = packageJson.scripts || {};
if (scripts['version:check'] !== 'node scripts/versioning-check.mjs') failures.push('package.json version:check script is missing or incorrect');
if (scripts['maintenance:check'] !== 'node scripts/maintenance-check.mjs') failures.push('package.json maintenance:check script is missing or incorrect');
if (scripts['continuation:plan'] !== 'node scripts/continuation-plan.mjs') failures.push('package.json continuation:plan script is missing or incorrect');
if (!scripts['release:check']?.includes('npm run version:check')) failures.push('release:check must include version:check');
if (!scripts['release:check']?.includes('npm run maintenance:check')) failures.push('release:check must include maintenance:check');
if (!scripts['release:check']?.includes('npm run continuation:plan')) failures.push('release:check must include continuation:plan');

rejectText('package.json', ['catalog:', 'workspace:', 'applied-caas-gateway', 'artifactory', 'internal.openai']);
rejectText('package-lock.json', ['catalog:', 'workspace:', 'applied-caas-gateway', 'artifactory', 'internal.openai']);
rejectText('.npmrc', ['artifactory', 'internal.openai', 'applied-caas-gateway']);

if (packageJson.private !== true) warnings.push('package.json private should remain true unless this becomes a real package intended for npm publishing.');

if (failures.length) {
  console.error('\nSadhana OS versioning check failed:\n');
  for (const failure of failures) console.error(`- ${failure}`);
  if (warnings.length) {
    console.warn('\nWarnings:');
    for (const warning of warnings) console.warn(`- ${warning}`);
  }
  process.exit(1);
}

console.log(`Sadhana OS versioning check passed for ${packageJson.name || 'package'}@${version}.`);
if (warnings.length) {
  console.warn('\nWarnings:');
  for (const warning of warnings) console.warn(`- ${warning}`);
}
