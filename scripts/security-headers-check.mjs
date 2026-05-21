import { existsSync, readFileSync } from 'node:fs';

const failures = [];

function read(path) {
  return existsSync(path) ? readFileSync(path, 'utf8') : '';
}

function requireText(path, text, label = text) {
  const content = read(path);
  if (!content.includes(text)) failures.push(path + ' is missing ' + label);
}

function requireNoText(path, text, label = text) {
  const content = read(path);
  if (content.includes(text)) failures.push(path + ' contains blocked ' + label);
}

const requiredHeaders = [
  'X-Content-Type-Options',
  'nosniff',
  'Referrer-Policy',
  'strict-origin-when-cross-origin',
  'X-Frame-Options',
  'DENY',
  'Permissions-Policy',
  'camera=(), microphone=(), geolocation=(), payment=(), usb=(), fullscreen=(self)',
  'Content-Security-Policy',
  "default-src 'self'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  "script-src 'self'",
  'fonts.googleapis.com',
  'fonts.gstatic.com',
  'worker-src',
  'manifest-src',
];

for (const header of requiredHeaders) {
  requireText('vercel.json', header, 'Vercel security header ' + header);
  requireText('netlify.toml', header, 'Netlify security header ' + header);
}

requireText('vercel.json', '"source": "/(.*)"', 'global Vercel header source');
requireText('netlify.toml', 'for = "/*"', 'global Netlify header rule');
requireText('package.json', '"security:check": "node scripts/security-headers-check.mjs"', 'security check script');
requireText('package.json', 'npm run security:check', 'security check in QA');

for (const blocked of ['googletagmanager.com', 'google-analytics.com', 'facebook.net', 'hotjar.com', 'clarity.ms']) {
  requireNoText('index.html', blocked, blocked);
  requireNoText('src/App.tsx', blocked, blocked);
}

if (failures.length) {
  console.error('\nSadhana OS security headers check failed:\n');
  for (const failure of failures) console.error('- ' + failure);
  process.exit(1);
}

console.log('Sadhana OS security headers check passed.');
