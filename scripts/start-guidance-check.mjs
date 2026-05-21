#!/usr/bin/env node
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const read = (path) => readFileSync(join(root, path), 'utf8');
const fail = (message) => {
  console.error(`❌ ${message}`);
  process.exitCode = 1;
};
const pass = (message) => console.log(`✅ ${message}`);

const requiredFiles = [
  'src/data/start-guidance.ts',
  'src/components/starting-guidance.tsx',
  'src/pages/home.tsx',
  'src/pages/practice.tsx',
  'src/pages/stage-detail.tsx',
];

for (const file of requiredFiles) {
  existsSync(join(root, file)) ? pass(`Required file exists: ${file}`) : fail(`Missing required file: ${file}`);
}

const guidance = read('src/data/start-guidance.ts');
const component = read('src/components/starting-guidance.tsx');
const home = read('src/pages/home.tsx');
const practice = read('src/pages/practice.tsx');
const stageDetail = read('src/pages/stage-detail.tsx');
const pkg = JSON.parse(read('package.json'));

const requiredSignals = ['new', 'confused', 'unstable', 'practice', 'advanced'];
for (const signal of requiredSignals) {
  guidance.includes(`id: "${signal}"`) ? pass(`Start guidance signal exists: ${signal}`) : fail(`Missing start guidance signal: ${signal}`);
}

const requiredFields = ['startWith', 'nextSteps', 'avoid', 'dailyAnchor'];
for (const field of requiredFields) {
  guidance.includes(`${field}:`) ? pass(`Start guidance field exists: ${field}`) : fail(`Missing start guidance field: ${field}`);
}

component.includes('role="radiogroup"') ? pass('Starting guidance uses radiogroup semantics') : fail('Starting guidance missing radiogroup semantics');
component.includes('role="radio"') ? pass('Starting guidance options use radio semantics') : fail('Starting guidance options missing radio semantics');
component.includes('aria-checked={checked}') ? pass('Starting guidance exposes checked state') : fail('Starting guidance missing aria-checked');
component.includes('aria-live="polite"') ? pass('Starting guidance updates are announced politely') : fail('Starting guidance missing aria-live polite');

home.includes('<StartingGuidance />') ? pass('Home renders StartingGuidance') : fail('Home does not render StartingGuidance');
practice.includes('id="protected-zone"') ? pass('Protected practice anchor exists') : fail('Missing protected-zone anchor');
stageDetail.includes('id="integrated-yogic-ascent-matrix"') ? pass('Integrated ascent matrix anchor exists') : fail('Missing integrated-yogic-ascent-matrix anchor');

guidance.includes('/practice#protected-zone') ? pass('Advanced guidance links to protected zone') : fail('Advanced guidance missing protected-zone link');
guidance.includes('/stage/11#integrated-yogic-ascent-matrix') ? pass('Advanced guidance links to ascent matrix') : fail('Advanced guidance missing ascent matrix link');

pkg.scripts?.['start:guide:check'] === 'node scripts/start-guidance-check.mjs'
  ? pass('package.json start guidance check script exists')
  : fail('package.json missing start:guide:check script');

if (process.exitCode) {
  console.error('\nStart guidance check failed.');
  process.exit(process.exitCode);
}
console.log('\nStart guidance check passed.');
