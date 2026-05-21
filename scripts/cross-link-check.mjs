import { existsSync, readFileSync } from 'node:fs';

const failures = [];
const passes = [];

function read(path) {
  return existsSync(path) ? readFileSync(path, 'utf8') : '';
}
function pass(message) { passes.push(message); console.log(`PASS ${message}`); }
function fail(message) { failures.push(message); console.error(`FAIL ${message}`); }

const cross = read('src/data/cross-linking.ts');
const stageDetail = read('src/pages/stage-detail.tsx');
const glossary = read('src/pages/glossary.tsx');
const packageJson = JSON.parse(read('package.json') || '{}');

if (!cross) fail('src/data/cross-linking.ts missing'); else pass('cross-linking data file exists');

for (let stage = 1; stage <= 18; stage += 1) {
  const block = new RegExp(`\\n\\s*${stage}:\\s*\\{[\\s\\S]*?stageSignal:[\\s\\S]*?doctrine:[\\s\\S]*?innerScience:[\\s\\S]*?practice:[\\s\\S]*?glossaryTerms:[\\s\\S]*?relatedStages:[\\s\\S]*?integrationPrompt:`);
  block.test(cross) ? pass(`Stage ${stage} cross-link block complete`) : fail(`Stage ${stage} cross-link block incomplete`);
}

for (const required of ['Doctrine', 'Inner Science', 'Path & Practice', 'Glossary', 'stageSignal', 'integrationPrompt']) {
  cross.includes(required) ? pass(`Cross-link term present: ${required}`) : fail(`Missing cross-link term: ${required}`);
}

for (const path of ['/inner-science', '/practice', '/glossary', '/stage/']) {
  cross.includes(path) || stageDetail.includes(path) ? pass(`Cross-link route present: ${path}`) : fail(`Missing cross-link route: ${path}`);
}

stageDetail.includes('Cross-Linking Intelligence') ? pass('Stage detail renders Cross-Linking Intelligence') : fail('Stage detail missing Cross-Linking Intelligence section');
stageDetail.includes('glossaryHash(term)') ? pass('Stage glossary links use stable term hashes') : fail('Stage glossary links do not use term hashes');
glossary.includes('id={glossaryHash(item.term)}') ? pass('Glossary terms expose stable hash anchors') : fail('Glossary term hash anchors missing');
glossary.includes('new URLSearchParams') ? pass('Glossary supports query-driven entry') : fail('Glossary query support missing');
packageJson.scripts?.['crosslink:check'] === 'node scripts/cross-link-check.mjs'
  ? pass('crosslink:check script registered')
  : fail('crosslink:check script missing or incorrect');

if (failures.length) {
  console.error(`\nCross-link check failed with ${failures.length} issue(s).`);
  process.exit(1);
}

console.log(`\nCross-link check passed with ${passes.length} confirmations.`);
