#!/usr/bin/env node
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const file = 'src/data/stage-depth-ascent.ts';
const page = 'src/pages/stage-detail.tsx';
const fail = (message) => {
  console.error(`❌ ${message}`);
  process.exitCode = 1;
};
const pass = (message) => console.log(`✅ ${message}`);

if (!existsSync(join(root, file))) fail(`Missing ${file}`);
if (!existsSync(join(root, page))) fail(`Missing ${page}`);
if (process.exitCode) process.exit(process.exitCode);

const source = readFileSync(join(root, file), 'utf8');
const pageSource = readFileSync(join(root, page), 'utf8');

for (let i = 1; i <= 18; i += 1) {
  const block = new RegExp(`\\n\\s*${i}:\\s*\\{[\\s\\S]*?stageIdentity:[\\s\\S]*?ascentMatrix:[\\s\\S]*?glossaryTerms:`);
  block.test(source) ? pass(`Stage ${i} depth/ascent entry exists`) : fail(`Stage ${i} depth/ascent entry missing`);
}

for (const field of [
  'primaryKosha',
  'bhutaElement',
  'chakraLanguage',
  'vayuRelation',
  'bodyPracticeDirection',
  'purificationTarget',
  'healingMeaning',
  'safetyLevel',
  'safetyNote',
]) {
  source.includes(field) ? pass(`Ascent matrix field present: ${field}`) : fail(`Missing ascent matrix field: ${field}`);
}

for (const term of ['Annamaya', 'Pranamaya', 'Manomaya', 'Vijnanamaya', 'Anandamaya', 'Apana', 'Samana', 'Udana', 'Muladhara', 'Sahasrara']) {
  source.includes(term) ? pass(`Integrated map term present: ${term}`) : fail(`Integrated map term missing: ${term}`);
}

pageSource.includes('Integrated Yogic Ascent Matrix')
  ? pass('Stage detail renders Integrated Yogic Ascent Matrix')
  : fail('Stage detail does not render Integrated Yogic Ascent Matrix');

pageSource.includes('Deep Stage Architecture')
  ? pass('Stage detail renders Deep Stage Architecture')
  : fail('Stage detail does not render Deep Stage Architecture');

if (process.exitCode) {
  console.error('\nAscent matrix check failed.');
  process.exit(process.exitCode);
}

console.log('\nAscent matrix check passed.');
