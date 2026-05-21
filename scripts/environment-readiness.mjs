#!/usr/bin/env node
import { existsSync, readFileSync } from 'node:fs';
import { execSync } from 'node:child_process';

const failures = [];
const warnings = [];

function read(path) {
  return existsSync(path) ? readFileSync(path, 'utf8') : '';
}

function get(command) {
  try {
    return execSync(command, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trim();
  } catch {
    return '';
  }
}

const nodeVersion = process.versions.node;
const major = Number(nodeVersion.split('.')[0]);
if (major < 18) failures.push(`Node ${nodeVersion} is too old. Use Node 18 or newer.`);

const npmVersion = get('npm --version');
if (!npmVersion) failures.push('npm is not available on PATH. Install Node.js LTS with npm.');

const packageJson = JSON.parse(read('package.json') || '{}');
if (!packageJson.scripts?.dev?.includes('vite')) failures.push('package.json dev script must use vite.');
if (!packageJson.scripts?.build?.includes('vite build')) failures.push('package.json build script must use vite build.');
if (!packageJson.scripts?.preview?.includes('vite preview')) failures.push('package.json preview script must use vite preview.');

const nvmrc = read('.nvmrc').trim();
if (nvmrc !== '18') failures.push('.nvmrc should contain exactly 18 for predictable LTS setup.');

const npmrc = read('.npmrc');
if (!npmrc.includes('registry=https://registry.npmjs.org/')) failures.push('.npmrc must use the public npm registry.');

const viteConfig = read('vite.config.ts');
if (!viteConfig.includes('host: "0.0.0.0"')) warnings.push('vite.config.ts does not explicitly expose dev/preview host 0.0.0.0; package scripts still do, so this may be okay.');
if (/throw new Error\([^)]*(PORT|BASE_PATH)/i.test(viteConfig)) failures.push('vite.config.ts contains required PORT/BASE_PATH crash logic.');

if (!existsSync('.env.example')) failures.push('.env.example is missing. Include SITE_URL guidance for sitemap generation.');
const envExample = read('.env.example');
if (!envExample.includes('SITE_URL=')) failures.push('.env.example should document SITE_URL for sitemap generation.');

if (existsSync('node_modules') && !existsSync('node_modules/.bin/vite')) {
  failures.push('node_modules exists but Vite binary is missing. Run npm run fresh.');
}

if (failures.length) {
  console.error('\nSadhana OS environment readiness failed:\n');
  for (const failure of failures) console.error(`- ${failure}`);
  if (warnings.length) {
    console.warn('\nWarnings:');
    for (const warning of warnings) console.warn(`- ${warning}`);
  }
  process.exit(1);
}

console.log('Sadhana OS environment readiness passed.');
console.log(`Node: ${nodeVersion}`);
console.log(`npm: ${npmVersion}`);
if (warnings.length) {
  console.warn('\nWarnings:');
  for (const warning of warnings) console.warn(`- ${warning}`);
}
