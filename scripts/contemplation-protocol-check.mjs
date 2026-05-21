import { existsSync, readFileSync } from 'node:fs';

const failures = [];

function read(path) {
  return existsSync(path) ? readFileSync(path, 'utf8') : '';
}

function requireText(path, text, label = text) {
  const content = read(path);
  if (!content.includes(text)) failures.push(`${path} is missing ${label}`);
}

const data = read('src/data/stage-contemplation.ts');
const component = read('src/components/stage-contemplation-protocol.tsx');
const stageDetail = read('src/pages/stage-detail.tsx');

for (let stage = 1; stage <= 18; stage += 1) {
  requireText('src/data/stage-contemplation.ts', `${stage}: {`, `stage ${stage} contemplation entry`);
}

for (const field of ['observe:', 'release:', 'integrate:', 'journalPrompt:', 'dailyMicroPractice:', 'safetyReminder:']) {
  const escaped = field.replace(':', '');
  const matches = data.match(new RegExp(`\\n\\s{4}${escaped}:`, 'g')) ?? [];
  if (matches.length !== 18) failures.push(`Expected 18 ${field} entries, found ${matches.length}`);
}

requireText('src/components/stage-contemplation-protocol.tsx', 'role="tablist"', 'tablist role');
requireText('src/components/stage-contemplation-protocol.tsx', 'role="tab"', 'tab role');
requireText('src/components/stage-contemplation-protocol.tsx', 'role="tabpanel"', 'tabpanel role');
requireText('src/components/stage-contemplation-protocol.tsx', 'aria-selected', 'aria-selected state');
requireText('src/components/stage-contemplation-protocol.tsx', 'aria-controls', 'aria-controls relationship');
requireText('src/components/stage-contemplation-protocol.tsx', 'ArrowRight', 'arrow-key tab navigation');
requireText('src/components/stage-contemplation-protocol.tsx', 'Home', 'Home key tab navigation');
requireText('src/components/stage-contemplation-protocol.tsx', 'End', 'End key tab navigation');
requireText('src/pages/stage-detail.tsx', '<StageContemplationProtocol stageNum={stageNum} />', 'stage detail renders contemplation protocol');
requireText('src/pages/stage-detail.tsx', 'stage-contemplation-protocol', 'stage contemplation import');

const blockedUnsafe = [
  'force kundalini',
  'activate kundalini now',
  'hold your breath as long as possible',
  'do advanced kriya alone',
];
for (const blocked of blockedUnsafe) {
  if (data.toLowerCase().includes(blocked)) failures.push(`Unsafe phrase found in contemplation data: ${blocked}`);
  if (component.toLowerCase().includes(blocked)) failures.push(`Unsafe phrase found in contemplation component: ${blocked}`);
}

if (failures.length) {
  console.error('Contemplation protocol check failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('Contemplation protocol check passed.');
