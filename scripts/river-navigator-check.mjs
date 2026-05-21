#!/usr/bin/env node
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const fail = (message) => {
  console.error(`❌ ${message}`);
  process.exitCode = 1;
};
const pass = (message) => console.log(`✅ ${message}`);
const read = (file) => readFileSync(join(root, file), 'utf8');

const componentPath = 'src/components/stage-river-navigator.tsx';
const stageDetailPath = 'src/pages/stage-detail.tsx';
const packagePath = 'package.json';

existsSync(join(root, componentPath)) ? pass(`Required file exists: ${componentPath}`) : fail(`Missing required file: ${componentPath}`);

const component = existsSync(join(root, componentPath)) ? read(componentPath) : '';
const stageDetail = existsSync(join(root, stageDetailPath)) ? read(stageDetailPath) : '';
const packageJson = JSON.parse(read(packagePath));

const requiredComponentSignals = [
  'River Stage Navigator',
  'Know where you are in the river.',
  'aria-current',
  'aria-label="Stage detail sections"',
  '#guided-study-layers',
  '#contemplation-protocol',
  '#integrated-yogic-ascent-matrix',
  '#cross-linking-intelligence',
  '#practice-safety-gate',
  '/roadmap',
];

for (const signal of requiredComponentSignals) {
  component.includes(signal) ? pass(`River navigator signal present: ${signal}`) : fail(`River navigator signal missing: ${signal}`);
}

stageDetail.includes('StageRiverNavigator')
  ? pass('Stage detail renders StageRiverNavigator')
  : fail('Stage detail does not render StageRiverNavigator');

packageJson.scripts?.['river:navigator:check'] === 'node scripts/river-navigator-check.mjs'
  ? pass('river:navigator:check script registered')
  : fail('river:navigator:check script missing from package.json');

if (process.exitCode) {
  console.error('\nRiver navigator check failed. Fix the items above before shipping.');
  process.exit(process.exitCode);
}

console.log('\nRiver navigator check passed.');
