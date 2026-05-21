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
  'src/data/tradition-source-map.ts',
  'src/components/stage-source-lens.tsx',
  'src/pages/stage-detail.tsx',
  'docs/PHASE_29_TRADITION_SOURCE_INTEGRITY.md',
];
for (const file of requiredFiles) {
  existsSync(join(root, file)) ? pass(`Required file exists: ${file}`) : fail(`Missing required file: ${file}`);
}

const source = read('src/data/tradition-source-map.ts');
const component = read('src/components/stage-source-lens.tsx');
const stageDetail = read('src/pages/stage-detail.tsx');
const pkg = JSON.parse(read('package.json'));

for (const stream of [
  'yoga-sutra',
  'gita-karma-yoga',
  'vedanta-upanishad',
  'hatha-yoga',
  'ayurveda-inner-science',
  'safety-modern',
]) {
  source.includes(`"${stream}"`) ? pass(`Source stream exists: ${stream}`) : fail(`Missing source stream: ${stream}`);
}

for (let stage = 1; stage <= 18; stage += 1) {
  const block = new RegExp(String.raw`\n\s*${stage}:\s*\{[\s\S]*?primaryStreams:\s*\[[\s\S]*?sourceLogic:[\s\S]*?integrationRule:[\s\S]*?guardrail:[\s\S]*?notAClaim:`);
  block.test(source) ? pass(`Stage ${stage} source lens exists`) : fail(`Stage ${stage} source lens missing or incomplete`);
}

component.includes('Traditional Source Lens') ? pass('Stage source lens component renders title') : fail('Stage source lens component missing title');
component.includes('Not a Claim') ? pass('Stage source lens includes non-claim field') : fail('Stage source lens missing non-claim field');
stageDetail.includes('StageSourceLens') ? pass('Stage detail renders StageSourceLens') : fail('Stage detail missing StageSourceLens');
pkg.scripts?.['tradition:check'] === 'node scripts/tradition-source-check.mjs'
  ? pass('tradition:check script registered')
  : fail('tradition:check script missing from package.json');
(pkg.scripts?.qa || '').includes('npm run tradition:check')
  ? pass('tradition:check included in QA gate')
  : fail('tradition:check missing from QA gate');

if (process.exitCode) {
  console.error('\nTradition source integrity check failed.');
  process.exit(process.exitCode);
}
console.log('\nTradition source integrity check passed.');
