#!/usr/bin/env node
import { existsSync, readFileSync } from 'node:fs';

const failures = [];
const warnings = [];

function read(path) {
  return existsSync(path) ? readFileSync(path, 'utf8') : '';
}

function fail(message) {
  failures.push(message);
}

function warn(message) {
  warnings.push(message);
}

const packageText = read('package.json');
const npmrc = read('.npmrc');
const packageJson = packageText ? JSON.parse(packageText) : {};

// Accept pnpm workspace lockfile (at workspace root) or local npm lockfile
const hasPnpmWorkspace = existsSync('../../pnpm-workspace.yaml') || existsSync('../../../pnpm-workspace.yaml');
const hasLocalLock = existsSync('package-lock.json') || existsSync('pnpm-lock.yaml');
const lockText = read('package-lock.json');
const lockJson = lockText ? JSON.parse(lockText) : {};

if (!packageText) fail('package.json is missing.');
if (!hasLocalLock && !hasPnpmWorkspace) fail('No lockfile found. Run npm install or pnpm install.');
if (!npmrc.includes('registry=https://registry.npmjs.org/')) fail('.npmrc must pin registry=https://registry.npmjs.org/.');

const blockedRegistryTokens = ['applied-caas-gateway', 'artifactory', 'internal.openai'];
for (const [path, text] of [['package.json', packageText], ['package-lock.json', lockText], ['.npmrc', npmrc]]) {
  const lower = text.toLowerCase();
  for (const token of blockedRegistryTokens) {
    if (lower.includes(token.toLowerCase())) fail(`${path} contains private/internal registry token: ${token}`);
  }
}

for (const depSection of ['dependencies', 'devDependencies', 'optionalDependencies', 'peerDependencies']) {
  const deps = packageJson[depSection] || {};
  for (const [name, version] of Object.entries(deps)) {
    if (/^(catalog:|workspace:|link:|file:)/.test(String(version))) {
      fail(`${depSection}.${name} uses non-portable dependency specifier: ${version}`);
    }
  }
}

const allPackageDeps = {
  ...(packageJson.dependencies || {}),
  ...(packageJson.devDependencies || {}),
};

if (!allPackageDeps.vite) fail('vite must remain a local dependency/dev dependency so npm scripts can find node_modules/.bin/vite.');
if (!allPackageDeps.react || !allPackageDeps['react-dom']) fail('react and react-dom must remain declared dependencies.');
if (!packageJson.engines?.node?.includes('>=18')) fail('package.json must declare engines.node >=18 for Netlify/Vercel/Replit portability.');

// Lockfile consistency checks only apply when a local package-lock.json is present
if (lockText) {
  if (lockJson.lockfileVersion && lockJson.lockfileVersion < 3) {
    warn(`package-lock.json lockfileVersion is ${lockJson.lockfileVersion}; npm v9/v10 usually writes v3, but this is not fatal.`);
  }
  const lockPackages = lockJson.packages || {};
  const rootLockDeps = lockPackages['']?.dependencies || {};
  const rootLockDevDeps = lockPackages['']?.devDependencies || {};
  for (const dep of Object.keys(packageJson.dependencies || {})) {
    if (!(dep in rootLockDeps)) fail(`package-lock.json root package is missing dependency: ${dep}`);
  }
  for (const dep of Object.keys(packageJson.devDependencies || {})) {
    if (!(dep in rootLockDevDeps)) fail(`package-lock.json root package is missing devDependency: ${dep}`);
  }
  for (const dep of Object.keys(allPackageDeps)) {
    if (!lockPackages[`node_modules/${dep}`]) {
      fail(`package-lock.json is missing installed package entry for ${dep}. Run npm install with the public registry.`);
    }
  }
}

// In a pnpm workspace, yarn.lock and bun.lockb are still unwanted
const forbiddenLockfiles = ['yarn.lock', 'bun.lockb'];
for (const file of forbiddenLockfiles) {
  if (existsSync(file)) fail(`Remove ${file}; this project uses pnpm or npm for dependency management.`);
}

if (existsSync('node_modules') && !existsSync('node_modules/.bin/vite')) {
  fail('node_modules exists but node_modules/.bin/vite is missing. Run npm run fresh to rebuild dependencies.');
}

if (failures.length) {
  console.error('\nSadhana OS dependency hygiene failed:\n');
  for (const failure of failures) console.error(`- ${failure}`);
  if (warnings.length) {
    console.warn('\nWarnings:');
    for (const warning of warnings) console.warn(`- ${warning}`);
  }
  process.exit(1);
}

console.log('Sadhana OS dependency hygiene passed.');
if (warnings.length) {
  console.warn('\nWarnings:');
  for (const warning of warnings) console.warn(`- ${warning}`);
}
