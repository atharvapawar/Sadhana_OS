#!/usr/bin/env node
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const failures = [];
const warnings = [];

function read(path) {
  return existsSync(path) ? readFileSync(path, 'utf8') : '';
}

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
    else if (/\.(tsx|ts|html)$/.test(full)) results.push(full);
  }
  return results;
}

const indexHtml = read('index.html');
if (!/<html[^>]+lang="en"/.test(indexHtml)) failures.push('index.html should set lang="en".');
if (!/<meta\s+name="viewport"/i.test(indexHtml)) failures.push('index.html should include a viewport meta tag.');
if (!/<title>[^<]+<\/title>/i.test(indexHtml)) failures.push('index.html should include a title.');

requireText('src/components/layout.tsx', 'Skip to main content', 'keyboard skip link');
requireText('src/components/layout.tsx', 'href="#main-content"', 'skip link target');
requireText('src/components/layout.tsx', 'id="main-content"', 'main content landmark target');
requireText('src/components/layout.tsx', 'tabIndex={-1}', 'focusable main landmark');
requireText('src/components/layout.tsx', 'aria-current', 'active navigation aria-current');
requireText('src/components/layout.tsx', 'aria-expanded', 'mobile menu expanded state');
requireText('src/components/layout.tsx', 'aria-controls="mobile-navigation"', 'mobile menu controls relation');
requireText('src/components/layout.tsx', 'event.key === "Escape"', 'Escape key close behavior');
requireText('src/components/back-to-top.tsx', 'aria-label="Back to top"', 'Back to Top accessible label');
requireText('src/components/scroll-manager.tsx', 'scrollRestoration', 'manual scroll restoration');
requireText('src/components/route-error-boundary.tsx', 'This chamber did not open cleanly', 'route error recovery copy');

const sourceFiles = ['index.html', ...walk('src')];
for (const file of sourceFiles) {
  const content = read(file);
  if (/href=["']\s*["']/.test(content)) failures.push(`${file} contains an empty href.`);
  if (/href=["']javascript:/i.test(content)) failures.push(`${file} contains a javascript: href.`);
  const imgTags = [...content.matchAll(/<img\b[^>]*>/gi)];
  for (const tag of imgTags) {
    if (!/\balt=/.test(tag[0])) failures.push(`${file} contains an img tag without alt text: ${tag[0].slice(0, 120)}`);
  }
  const iconOnlyButtons = [...content.matchAll(/<button\b([^>]*)>(\s*<[^>]+[^]*?<\/[^>]+>\s*)<\/button>/gi)];
  for (const match of iconOnlyButtons) {
    const attrs = match[1];
    const inner = match[2].replace(/<[^>]+>/g, '').trim();
    if (!inner && !/aria-label=/.test(attrs) && !/aria-labelledby=/.test(attrs)) {
      warnings.push(`${file} may contain an icon-only button without an accessible label.`);
    }
  }
}

if (failures.length) {
  console.error('\nAccessibility QA failed:\n');
  for (const failure of failures) console.error(`- ${failure}`);
  if (warnings.length) {
    console.warn('\nWarnings:');
    for (const warning of warnings) console.warn(`- ${warning}`);
  }
  process.exit(1);
}

console.log('Accessibility QA passed.');
if (warnings.length) {
  console.warn('\nWarnings:');
  for (const warning of warnings) console.warn(`- ${warning}`);
}
