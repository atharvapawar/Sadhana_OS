#!/usr/bin/env node
import { existsSync, readFileSync } from 'node:fs';

const failures = [];
const warnings = [];
const read = (path) => (existsSync(path) ? readFileSync(path, 'utf8') : '');
const requireFile = (path) => { if (!existsSync(path)) failures.push(`Missing metadata file: ${path}`); };
const requireText = (path, text, label = text) => {
  const content = read(path);
  if (!content.includes(text)) failures.push(`${path} is missing ${label}`);
};
const rejectText = (path, text, label = text) => {
  const content = read(path).toLowerCase();
  if (content.includes(text.toLowerCase())) failures.push(`${path} still contains blocked metadata text: ${label}`);
};

requireFile('index.html');
requireFile('public/favicon.svg');
requireFile('public/opengraph.jpg');
requireFile('public/manifest.webmanifest');
requireFile('public/robots.txt');
requireFile('public/sitemap.xml');

requireText('index.html', '<html lang="en">', 'HTML language attribute');
requireText('index.html', '<title>Sadhana OS — The Yogic River from Misidentification to Living Awareness</title>', 'final SEO title');
requireText('index.html', 'The Yogic River from Misidentification to Living Awareness', 'final title phrase');
requireText('index.html', '<meta name="description"', 'meta description');
requireText('index.html', '<meta property="og:title"', 'Open Graph title');
requireText('index.html', '<meta property="og:description"', 'Open Graph description');
requireText('index.html', '<meta property="og:image" content="/opengraph.jpg"', 'Open Graph image');
requireText('index.html', '<meta name="twitter:card" content="summary_large_image"', 'Twitter large card');
requireText('index.html', '<link rel="manifest" href="/manifest.webmanifest"', 'web manifest link');
requireText('index.html', '<meta name="theme-color" content="#0a0704"', 'theme color');
requireText('index.html', '<link rel="apple-touch-icon" href="/favicon.svg"', 'Apple touch icon');
rejectText('index.html', 'built on Replit', 'Replit placeholder description');
rejectText('index.html', 'Update this description', 'description TODO');

requireText('public/manifest.webmanifest', 'Sadhana OS', 'manifest app name');
requireText('public/manifest.webmanifest', 'standalone', 'standalone display mode');
requireText('public/robots.txt', 'User-agent: *', 'robots user-agent');
requireText('public/robots.txt', 'Allow: /', 'robots allow root');
requireText('public/robots.txt', 'Sitemap:', 'robots sitemap pointer');
requireText('public/sitemap.xml', '<urlset', 'sitemap urlset');
requireText('public/sitemap.xml', '<loc>', 'sitemap loc entries');
requireText('public/sitemap.xml', '/stage/18', 'all stage routes in sitemap');

const sitemap = read('public/sitemap.xml');
const locCount = (sitemap.match(/<loc>/g) || []).length;
if (locCount < 24) failures.push(`public/sitemap.xml should include at least 24 route URLs; found ${locCount}`);

const html = read('index.html');
const description = html.match(/<meta name="description" content="([^"]+)"/i)?.[1] || '';
if (description.length < 90) warnings.push('Meta description is short; keep it descriptive for search snippets.');
if (description.length > 180) warnings.push('Meta description is long; many search snippets truncate around 150-160 characters.');

if (failures.length) {
  console.error('\nSadhana OS metadata check failed:\n');
  failures.forEach((failure) => console.error(`- ${failure}`));
  if (warnings.length) {
    console.warn('\nWarnings:');
    warnings.forEach((warning) => console.warn(`- ${warning}`));
  }
  process.exit(1);
}

console.log('Sadhana OS metadata check passed.');
if (warnings.length) {
  console.warn('\nWarnings:');
  warnings.forEach((warning) => console.warn(`- ${warning}`));
}
