#!/usr/bin/env node
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const fail = (message) => {
  console.error(`❌ ${message}`);
  process.exitCode = 1;
};
const pass = (message) => console.log(`✅ ${message}`);
const warn = (message) => console.warn(`⚠️  ${message}`);
const read = (path) => readFileSync(join(root, path), 'utf8');

const requiredFiles = [
  'src/data/stages.ts',
  'src/data/stage-intelligence.ts',
  'src/data/stage-depth-ascent.ts',
  'src/data/tradition-source-map.ts',
  'src/data/safety-scope.ts',
  'src/data/inner-science-map.ts',
  'src/data/glossary-relationships.ts',
  'src/data/practice-safety.ts',
  'src/App.tsx',
  'src/components/scroll-manager.tsx',
  'src/components/route-error-boundary.tsx',
  'src/components/stage-river-navigator.tsx',
  'src/components/stage-source-lens.tsx',
  'src/components/safety-scope-notice.tsx',
  'public/robots.txt',
  'index.html',
  'vercel.json',
  'netlify.toml',
  '.github/workflows/build-check.yml',
];

for (const file of requiredFiles) {
  existsSync(join(root, file)) ? pass(`Required file exists: ${file}`) : fail(`Missing required file: ${file}`);
}

const stagesSource = read('src/data/stages.ts');
const intelligenceSource = read('src/data/stage-intelligence.ts');
const ascentSource = read('src/data/stage-depth-ascent.ts');
const traditionSource = read('src/data/tradition-source-map.ts');
const safetyScopeSource = read('src/data/safety-scope.ts');
const crossLinkSource = read('src/data/cross-linking.ts');
const glossarySource = read('src/data/glossary-relationships.ts');
const appSource = read('src/App.tsx');
const stageDetailSource = read('src/pages/stage-detail.tsx');
if (!safetyScopeSource.includes('not medical') || !safetyScopeSource.includes('not initiation')) {
  fail('Safety scope data must include non-medical and non-initiation guardrails');
} else {
  pass('Safety scope guardrails intact');
}

const packageJson = JSON.parse(read('package.json'));
const lockfile = existsSync(join(root, 'package-lock.json')) ? read('package-lock.json') : '';
const npmrc = existsSync(join(root, '.npmrc')) ? read('.npmrc') : '';

const expectedStages = [
  ['1', 'Right View', 'Samyak Darshana', 'I. Right Seeing'],
  ['2', 'Human Architecture', 'Sharira, Prana & Chitta', 'I. Right Seeing'],
  ['3', 'Yama', 'Ethical Purification', 'II. Purification & Foundation'],
  ['4', 'Niyama', 'Sacred Alignment', 'II. Purification & Foundation'],
  ['5', 'Lifestyle Foundation', 'Ahara, Nidra & Brahmacharya', 'II. Purification & Foundation'],
  ['6', 'Shatkarma', 'Yogic Cleansing', 'II. Purification & Foundation'],
  ['7', 'Asana', 'The Steady Body-Temple', 'III. Body-Prana Stabilization'],
  ['8', 'Pranayama', 'Pranic Harmonization', 'III. Body-Prana Stabilization'],
  ['9', 'Bandha', 'Energetic Lock', 'III. Body-Prana Stabilization'],
  ['10', 'Mudra', 'Conscious Energy Seal', 'III. Body-Prana Stabilization'],
  ['11', 'Antar Kriya', 'Inner Yogic Technology', 'III. Body-Prana Stabilization'],
  ['12', 'Mantra', 'Sacred Sound Current', 'IV. Interiorization & Meditation'],
  ['13', 'Pratyahara', 'Return of the Senses', 'IV. Interiorization & Meditation'],
  ['14', 'Dharana', 'One-Pointed Holding', 'IV. Interiorization & Meditation'],
  ['15', 'Dhyana', 'Unbroken Meditation', 'IV. Interiorization & Meditation'],
  ['16', 'Samadhi', 'Absorption Beyond the Separate Knower', 'IV. Interiorization & Meditation'],
  ['17', 'Sacred Integration', 'Samadhi in Life', 'V. Living Realization'],
  ['18', 'Sahaja Karma Yoga', 'Life as Living Awareness', 'V. Living Realization'],
];

for (const [num, title, sanskrit, arc] of expectedStages) {
  const stageBlock = new RegExp(`num:\\s*${num},[\\s\\S]*?title:\\s*"${escapeRegExp(title)}",[\\s\\S]*?sanskrit:\\s*"${escapeRegExp(sanskrit)}",[\\s\\S]*?arc:\\s*"${escapeRegExp(arc)}"`);
  stageBlock.test(stagesSource)
    ? pass(`Stage ${num} title/sanskrit/arc intact`)
    : fail(`Stage ${num} title/sanskrit/arc mismatch`);

  const intelligenceBlock = new RegExp(`\\n\\s*${num}:\\s*\\{[\\s\\S]*?essence:[\\s\\S]*?supportsNext:`);
  intelligenceBlock.test(intelligenceSource)
    ? pass(`Stage ${num} intelligence card exists`)
    : fail(`Stage ${num} intelligence card missing`);

  const ascentBlock = new RegExp(`\\n\\s*${num}:\\s*\\{[\\s\\S]*?stageIdentity:[\\s\\S]*?ascentMatrix:[\\s\\S]*?glossaryTerms:`);
  ascentBlock.test(ascentSource)
    ? pass(`Stage ${num} depth/ascent matrix exists`)
    : fail(`Stage ${num} depth/ascent matrix missing`);
}


for (let num = 1; num <= 18; num += 1) {
  const crossLinkBlock = new RegExp(String.raw`\n\s*${num}:\s*\{[\s\S]*?stageSignal:[\s\S]*?doctrine:[\s\S]*?innerScience:[\s\S]*?practice:[\s\S]*?glossaryTerms:[\s\S]*?relatedStages:[\s\S]*?integrationPrompt:`);
  crossLinkBlock.test(crossLinkSource)
    ? pass(`Stage ${num} cross-link intelligence exists`)
    : fail(`Stage ${num} cross-link intelligence missing`);
}

for (let num = 1; num <= 18; num += 1) {
  const sourceLensBlock = new RegExp(String.raw`\n\s*${num}:\s*\{[\s\S]*?primaryStreams:[\s\S]*?sourceLogic:[\s\S]*?integrationRule:[\s\S]*?guardrail:[\s\S]*?notAClaim:`);
  sourceLensBlock.test(traditionSource)
    ? pass(`Stage ${num} tradition source lens exists`)
    : fail(`Stage ${num} tradition source lens missing`);
}

const stageCount = (stagesSource.match(/\n\s*\{\n\s*num:\s*\d+/g) || []).length;
stageCount === 18 ? pass('Exactly 18 roadmap stages found') : fail(`Expected 18 stages, found ${stageCount}`);

const requiredArcs = [
  'I. Right Seeing',
  'II. Purification & Foundation',
  'III. Body-Prana Stabilization',
  'IV. Interiorization & Meditation',
  'V. Living Realization',
];
for (const arc of requiredArcs) {
  stagesSource.includes(`arc: "${arc}"`) ? pass(`Arc present: ${arc}`) : fail(`Missing arc: ${arc}`);
}

const requiredRoutes = ['/', '/roadmap', '/stage/:num', '/inner-science', '/practice', '/glossary', '/experience'];
for (const route of requiredRoutes) {
  appSource.includes(`path="${route}"`) ? pass(`Route registered: ${route}`) : fail(`Route missing: ${route}`);
}

stageDetailSource.includes('StageRiverNavigator') ? pass('Stage detail renders river navigator') : fail('Stage detail missing river navigator');
stageDetailSource.includes('StageSourceLens') ? pass('Stage detail renders tradition source lens') : fail('Stage detail missing tradition source lens');

for (const field of ['primaryKosha', 'bhutaElement', 'chakraLanguage', 'vayuRelation', 'purificationTarget', 'healingMeaning', 'safetyLevel']) {
  ascentSource.includes(field) ? pass(`Stage ascent matrix field present: ${field}`) : fail(`Stage ascent matrix field missing: ${field}`);
}

for (const term of ['related', 'notSameAs', 'stages', 'beginner', 'deeper']) {
  glossarySource.includes(term) ? pass(`Glossary relationship field present: ${term}`) : fail(`Glossary relationship field missing: ${term}`);
}

const forbiddenRegistryFragments = ['applied-caas-gateway', 'artifactory', 'internal.openai', 'internal.api.openai', 'registry.yarnpkg.com'];
for (const fragment of forbiddenRegistryFragments) {
  if (lockfile.includes(fragment) || npmrc.includes(fragment) || JSON.stringify(packageJson).includes(fragment)) {
    fail(`Private or nonstandard registry fragment found: ${fragment}`);
  }
}

npmrc.includes('registry=https://registry.npmjs.org/')
  ? pass('Public npm registry pinned in .npmrc')
  : warn('.npmrc does not explicitly pin registry=https://registry.npmjs.org/');

for (const depSection of ['dependencies', 'devDependencies']) {
  const deps = packageJson[depSection] || {};
  for (const [name, version] of Object.entries(deps)) {
    if (/^(catalog:|workspace:|link:|file:)/.test(version)) {
      fail(`${depSection}.${name} uses non-portable version specifier: ${version}`);
    }
  }
}

packageJson.scripts?.doctor ? pass('doctor script exists') : fail('doctor script missing');
packageJson.scripts?.build === 'vite build' ? pass('build script is standard Vite build') : fail('build script is not vite build');
packageJson.engines?.node ? pass(`Node engine declared: ${packageJson.engines.node}`) : fail('Node engine missing');

if (process.exitCode) {
  console.error('\nContent integrity check failed. Fix the items above before shipping.');
  process.exit(process.exitCode);
}

console.log('\nContent integrity check passed.');

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
