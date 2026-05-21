#!/usr/bin/env node
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const failures = [];
const warnings = [];

function read(path) { return existsSync(path) ? readFileSync(path, 'utf8') : ''; }
function requireText(path, text, label = text) {
  const content = read(path);
  if (!content.includes(text)) failures.push(`${path} is missing ${label}`);
}
function walk(dir, results = []) {
  if (!existsSync(dir)) return results;
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const stat = statSync(full);
    if (stat.isDirectory()) walk(full, results);
    else if (/\.tsx$/.test(full)) results.push(full);
  }
  return results;
}

requireText('src/index.css', 'overflow-x: hidden', 'global horizontal overflow guard');
requireText('src/index.css', 'min-width: 0', 'min-width responsive guard');
requireText('src/index.css', 'overflow-wrap: anywhere', 'long text wrapping guard');
requireText('src/index.css', '.safe-card', 'safe-card utility');
requireText('src/index.css', '.safe-title', 'safe-title utility');
requireText('src/index.css', '.safe-copy', 'safe-copy utility');
requireText('src/index.css', '.safe-tap-target', 'safe tap target utility');
requireText('src/index.css', 'prefers-reduced-motion: reduce', 'reduced motion protection');
requireText('src/pages/roadmap.tsx', 'overflow-x-hidden', 'roadmap horizontal overflow guard');
requireText('src/pages/roadmap.tsx', 'ml-12 sm:ml-14', 'mobile roadmap card offset');
requireText('src/pages/roadmap.tsx', 'w-10 h-10 sm:w-12 sm:h-12', 'responsive stage number badge');
requireText('src/pages/roadmap.tsx', 'safe-card', 'roadmap safe-card usage');
requireText('src/pages/roadmap.tsx', 'safe-title', 'roadmap safe-title usage');
requireText('src/pages/roadmap.tsx', 'safe-copy', 'roadmap safe-copy usage');
requireText('src/components/layout.tsx', 'max-h-[calc(100vh-5rem)] overflow-y-auto', 'mobile menu vertical overflow guard');
requireText('src/components/layout.tsx', 'min-w-0', 'layout min-width guard');

for (const file of walk('src/pages')) {
  const content = read(file);
  if (!content.includes('min-w-0') && !content.includes('safe-card') && !content.includes('overflow-x-hidden')) {
    warnings.push(`${file} has no obvious responsive min-width/safe-card/overflow guard.`);
  }
  if (/text-7xl|text-8xl|text-9xl/.test(content) && !/sm:|md:|lg:/.test(content)) {
    warnings.push(`${file} contains very large text without obvious breakpoint controls.`);
  }
}

const forbiddenLayoutPatterns = [
  [/w-screen/g, 'w-screen can create horizontal overflow on mobile when combined with scrollbars.'],
  [/min-w-\[/g, 'fixed arbitrary min-width can create mobile overflow.'],
];
for (const file of walk('src')) {
  if (file.includes('/components/ui/') || file.includes('\\components\\ui\\')) continue;
  const content = read(file);
  for (const [pattern, message] of forbiddenLayoutPatterns) {
    if (pattern.test(content)) warnings.push(`${file}: ${message}`);
  }
}

if (failures.length) {
  console.error('\nVisual/responsive QA failed:\n');
  for (const failure of failures) console.error(`- ${failure}`);
  if (warnings.length) {
    console.warn('\nWarnings:');
    for (const warning of warnings) console.warn(`- ${warning}`);
  }
  process.exit(1);
}

console.log('Visual/responsive QA passed.');
if (warnings.length) {
  console.warn('\nWarnings:');
  for (const warning of warnings) console.warn(`- ${warning}`);
}
