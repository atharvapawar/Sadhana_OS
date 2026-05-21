#!/usr/bin/env node
import { existsSync, readFileSync } from 'node:fs';

const failures = [];
const read = (path) => existsSync(path) ? readFileSync(path, 'utf8') : '';
const requireFile = (path) => { if (!existsSync(path)) failures.push(`Missing file: ${path}`); };
const requireText = (path, text, label = text) => {
  const content = read(path);
  if (!content.includes(text)) failures.push(`${path} is missing ${label}`);
};

const files = [
  'src/data/safety-scope.ts',
  'src/components/safety-scope-notice.tsx',
  'src/components/layout.tsx',
  'src/pages/practice.tsx',
  'docs/PHASE_30_SAFETY_SCOPE_CLARITY.md',
];
files.forEach(requireFile);

requireText('src/data/safety-scope.ts', 'not medical', 'not-medical scope language');
requireText('src/data/safety-scope.ts', 'not initiation', 'not-initiation scope language');
requireText('src/data/safety-scope.ts', 'No guarantee of realization', 'no-guarantee guardrail');
requireText('src/data/safety-scope.ts', 'Stop and seek qualified support', 'red-flag stop guidance');
requireText('src/components/safety-scope-notice.tsx', 'Safety & Scope', 'Safety & Scope component label');
requireText('src/components/safety-scope-notice.tsx', 'variant === "full"', 'full safety notice variant');
requireText('src/components/safety-scope-notice.tsx', '<details', 'compact disclosure safety notice');
requireText('src/components/layout.tsx', '<SafetyScopeNotice variant="compact" id="global-safety-scope" />', 'global footer safety notice');
requireText('src/pages/practice.tsx', '<SafetyScopeNotice variant="full" id="practice-safety-scope" />', 'full practice safety notice');
requireText('package.json', '"safety:scope:check": "node scripts/safety-scope-check.mjs"', 'safety scope check script');
requireText('package.json', 'npm run safety:scope:check', 'safety scope in QA gate');
requireText('README.md', 'Safety & Scope', 'README safety scope note');
requireText('CHANGELOG.md', 'Phase 30', 'Phase 30 changelog entry');
requireText('docs/IMPLEMENTATION_PHASES.md', 'Phase 30 — Safety, Scope & Non-Medical Clarity', 'Phase 30 implementation note');

if (failures.length) {
  console.error('\nSadhana OS safety/scope check failed:\n');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('Sadhana OS safety/scope clarity check passed.');
