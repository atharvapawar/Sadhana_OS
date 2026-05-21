import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const failures = [];
const requiredFiles = [
  'public/offline.html',
  'public/sw.js',
  'src/lib/register-service-worker.ts',
];

function read(path) {
  return existsSync(path) ? readFileSync(path, 'utf8') : '';
}

for (const file of requiredFiles) {
  if (!existsSync(file)) failures.push(`Missing static resilience file: ${file}`);
}

const main = read('src/main.tsx');
if (!main.includes('registerServiceWorker')) failures.push('src/main.tsx should register the production service worker helper.');

const helper = read('src/lib/register-service-worker.ts');
if (!helper.includes('import.meta.env.PROD')) failures.push('service worker registration must be production-only.');
if (!helper.includes('/sw.js') && !helper.includes('"/sw.js"')) failures.push('service worker helper should register /sw.js.');

const sw = read('public/sw.js');
if (!sw.includes('/offline.html')) failures.push('public/sw.js should cache /offline.html.');
if (!sw.includes('event.request.mode === "navigate"')) failures.push('public/sw.js should handle navigation requests safely.');
if (!sw.includes('navigationPreload')) failures.push('public/sw.js should enable/use navigation preload when available.');
if (!sw.includes('sadhana-os-v15-static-resilience')) failures.push('public/sw.js should use a versioned cache name.');

const offline = read('public/offline.html');
if (!offline.includes('Sadhana OS')) failures.push('offline.html should identify Sadhana OS.');
if (!offline.includes('viewport')) failures.push('offline.html should include mobile viewport metadata.');

const vercel = read('vercel.json');
if (!vercel.includes('/assets/(.*)')) failures.push('vercel.json should define immutable cache headers for assets.');
if (!vercel.includes('/sw.js')) failures.push('vercel.json should define no-cache headers for sw.js.');

const netlify = read('netlify.toml');
if (!netlify.includes('for = "/assets/*"')) failures.push('netlify.toml should define immutable cache headers for assets.');
if (!netlify.includes('for = "/sw.js"')) failures.push('netlify.toml should define no-cache headers for sw.js.');

if (existsSync('dist')) {
  for (const builtFile of ['dist/offline.html', 'dist/sw.js', 'dist/manifest.webmanifest', 'dist/robots.txt']) {
    if (!existsSync(builtFile)) failures.push(`Built dist is missing copied static file: ${builtFile}`);
  }
  const index = read('dist/index.html');
  if (!index.includes('/assets/')) failures.push('dist/index.html should reference built Vite assets.');
}

if (failures.length) {
  console.error('\nStatic resilience check failed:\n');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('Static resilience check passed.');
