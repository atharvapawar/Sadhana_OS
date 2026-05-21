#!/usr/bin/env node
import { existsSync, readFileSync } from 'node:fs';

const failures = [];
const warnings = [];

const activeFiles = [
  'src/App.tsx',
  'src/main.tsx',
  'src/index.css',
  'src/components/layout.tsx',
  'src/components/back-to-top.tsx',
  'src/components/river-compass.tsx',
  'src/components/starting-guidance.tsx',
  'src/components/stage-study-layers.tsx',
  'src/components/stage-contemplation-protocol.tsx',
  'src/components/stage-river-navigator.tsx',
  'src/pages/home.tsx',
  'src/pages/roadmap.tsx',
  'src/pages/stage-detail.tsx',
  'src/pages/inner-science.tsx',
  'src/pages/practice.tsx',
  'src/pages/glossary.tsx',
  'src/pages/experience.tsx',
  'src/pages/not-found.tsx',
];

function read(path) {
  return existsSync(path) ? readFileSync(path, 'utf8') : '';
}

function requireFile(path) {
  if (!existsSync(path)) failures.push(`Missing active route file: ${path}`);
}

function requireText(path, text, label = text) {
  const content = read(path);
  if (!content.includes(text)) failures.push(`${path} is missing ${label}`);
}

for (const file of activeFiles) requireFile(file);

requireText('src/index.css', 'overflow-x: hidden', 'global horizontal overflow guard');
requireText('src/index.css', 'overflow-wrap: anywhere', 'global long-text wrapping guard');
requireText('src/index.css', '.safe-card', 'safe-card utility');
requireText('src/index.css', '.safe-title', 'safe-title utility');
requireText('src/index.css', '.safe-copy', 'safe-copy utility');
requireText('src/index.css', '.safe-tap-target', 'safe tap-target utility');
requireText('src/index.css', 'prefers-reduced-motion: reduce', 'reduced-motion protection');
requireText('src/pages/roadmap.tsx', 'overflow-x-hidden', 'roadmap overflow guard');
requireText('src/pages/roadmap.tsx', 'safe-card', 'roadmap safe-card usage');
requireText('src/components/stage-river-navigator.tsx', 'grid grid-cols-1', 'river navigator mobile-first grid');
requireText('src/components/stage-contemplation-protocol.tsx', 'grid grid-cols-1', 'contemplation mobile-first grid');
requireText('src/components/stage-study-layers.tsx', 'min-w-0', 'study layers min-width guard');

const hardOverflowPatterns = [
  [/\bw-screen\b/g, 'w-screen can create viewport overflow when scrollbars are present.'],
  [/\bmin-w-\[/g, 'fixed arbitrary min-width is not allowed in active route surfaces.'],
  [/\bmax-w-none\b/g, 'max-w-none can make long content harder to constrain on mobile.'],
];

for (const file of activeFiles) {
  const content = read(file);
  for (const [pattern, message] of hardOverflowPatterns) {
    if (pattern.test(content)) failures.push(`${file}: ${message}`);
  }
  if (/grid-cols-[4-9]/.test(content) && !/(grid-cols-1|sm:grid-cols|md:grid-cols|lg:grid-cols)/.test(content)) {
    warnings.push(`${file}: dense grid detected without an obvious mobile-first fallback.`);
  }
  if (/text-7xl|text-8xl|text-9xl/.test(content) && !/(text-4xl|text-5xl|sm:text|md:text|lg:text)/.test(content)) {
    warnings.push(`${file}: very large text detected without obvious responsive sizing.`);
  }
}

if (failures.length) {
  console.error('\nResponsive active-route QA failed:\n');
  for (const failure of failures) console.error(`- ${failure}`);
  if (warnings.length) {
    console.warn('\nWarnings:');
    for (const warning of warnings) console.warn(`- ${warning}`);
  }
  process.exit(1);
}

console.log('Responsive active-route QA passed.');
if (warnings.length) {
  console.warn('\nWarnings:');
  for (const warning of warnings) console.warn(`- ${warning}`);
}
