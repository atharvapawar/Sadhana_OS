#!/usr/bin/env node
import { existsSync, readFileSync, writeFileSync, mkdirSync, readdirSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';
import crypto from 'node:crypto';

const releaseDir = 'release';
const distDir = 'dist';
mkdirSync(releaseDir, { recursive: true });

const requiredFiles = [
  'package.json',
  '.npmrc',
  '.nvmrc',
  'vite.config.ts',
  'vercel.json',
  'netlify.toml',
  '.replit',
  '.github/workflows/build-check.yml',
  'README.md',
  'DEPLOYMENT_CHECKLIST.md',
  'docs/MASTER_CONTENT_BLUEPRINT.md',
  'docs/IMPLEMENTATION_PHASES.md',
  'docs/HANDOFF_KIT.md',
  'release/RELEASE_REPORT.md',
  'release/FINAL_RELEASE_SNAPSHOT.md',
  'release/HANDOFF_MANIFEST.md',
];

const expectedDistFiles = [
  'dist/index.html',
  'dist/robots.txt',
  'dist/sitemap.xml',
  'dist/manifest.webmanifest',
  'dist/sw.js',
  'dist/offline.html',
];

const expectedRoutes = ['/', '/roadmap', '/stage/1', '/stage/18', '/inner-science', '/practice', '/glossary', '/experience'];

function read(path) {
  return existsSync(path) ? readFileSync(path, 'utf8') : '';
}

function sha256(path) {
  return existsSync(path) ? crypto.createHash('sha256').update(readFileSync(path)).digest('hex') : 'missing';
}

function walk(dir, results = []) {
  if (!existsSync(dir)) return results;
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const stat = statSync(full);
    if (stat.isDirectory()) walk(full, results);
    else results.push(full);
  }
  return results;
}

function sizeKb(bytes) {
  return `${(bytes / 1024).toFixed(1)} KB`;
}

const pkg = JSON.parse(read('package.json') || '{}');
const indexHtml = read('dist/index.html');
const distFiles = walk(distDir);
const distTotalBytes = distFiles.reduce((sum, file) => sum + statSync(file).size, 0);
const jsFiles = distFiles.filter((file) => extname(file) === '.js');
const largestJs = jsFiles
  .map((file) => ({ file, bytes: statSync(file).size }))
  .sort((a, b) => b.bytes - a.bytes)[0] || { file: 'none', bytes: 0 };

const missingRequired = requiredFiles.filter((file) => !existsSync(file));
const missingDist = expectedDistFiles.filter((file) => !existsSync(file));

const lock = read('package-lock.json');
const privateRegistryPatterns = [
  'applied-caas-gateway',
  'artifactory',
  'internal.openai',
  'internal.api.openai',
  'registry.npmjs.org._authToken',
];
const privateRegistryHits = privateRegistryPatterns.filter((pattern) => lock.includes(pattern));

const scripts = pkg.scripts || {};
const releaseGate = scripts['release:check'] || '';
const expectedGatePieces = [
  'npm run qa',
  'npm run release:readiness',
  'npm run release:report',
  'npm run release:snapshot',
  'npm run handoff:check',
  'npm run handoff:manifest',
];
const missingGatePieces = expectedGatePieces.filter((piece) => !releaseGate.includes(piece));

const evidence = {
  generatedAt: new Date().toISOString(),
  project: {
    name: pkg.name || 'unknown',
    version: pkg.version || 'unknown',
    nodeEngine: pkg.engines?.node || 'missing',
    river: 'The Yogic River from Misidentification to Living Awareness',
    architecture: ['Doctrine', 'Knowledge Roadmap', 'Inner Science', 'Path & Practice', 'Glossary'],
  },
  commands: {
    finalGate: 'npm ci && npm run release:check && npm run preview',
    releaseCheck: releaseGate,
  },
  files: {
    missingRequired,
    missingDist,
    packageLockSha256: sha256('package-lock.json'),
    packageJsonSha256: sha256('package.json'),
    vercelSha256: sha256('vercel.json'),
    netlifySha256: sha256('netlify.toml'),
  },
  build: {
    distExists: existsSync(distDir),
    distFileCount: distFiles.length,
    distTotalBytes,
    distTotalHuman: sizeKb(distTotalBytes),
    largestJsFile: largestJs.file,
    largestJsBytes: largestJs.bytes,
    largestJsHuman: sizeKb(largestJs.bytes),
    indexHasRoot: indexHtml.includes('<div id="root">'),
  },
  routes: expectedRoutes,
  deployment: {
    vite: 'npm run build outputs dist; npm run preview checks dist locally.',
    vercel: 'buildCommand npm run build; outputDirectory dist.',
    netlify: 'command npm run build; publish dist.',
    replit: 'npm ci then npm run dev; build/preview available for static output.',
  },
  risks: {
    privateRegistryHits,
    missingGatePieces,
  },
};

const failed = [
  missingRequired.length ? `missing required files: ${missingRequired.join(', ')}` : null,
  missingDist.length ? `missing dist files: ${missingDist.join(', ')}` : null,
  privateRegistryHits.length ? `private/internal registry patterns found: ${privateRegistryHits.join(', ')}` : null,
  missingGatePieces.length ? `release:check missing expected gates: ${missingGatePieces.join(', ')}` : null,
  !evidence.build.indexHasRoot ? 'dist/index.html does not contain React root' : null,
].filter(Boolean);

const markdown = [
  '# Sadhana OS Production Evidence Pack',
  '',
  `Generated: ${evidence.generatedAt}`,
  '',
  '## Final Release Gate',
  '',
  'Run this before GitHub/Vercel/Netlify/Replit handoff:',
  '',
  '```bash',
  evidence.commands.finalGate,
  '```',
  '',
  '## Project Identity',
  '',
  `- Name: ${evidence.project.name}`,
  `- Version: ${evidence.project.version}`,
  `- Node engine: ${evidence.project.nodeEngine}`,
  `- River: ${evidence.project.river}`,
  `- Main sections: ${evidence.project.architecture.join(', ')}`,
  '',
  '## Build Evidence',
  '',
  `- dist exists: ${evidence.build.distExists ? 'yes' : 'no'}`,
  `- dist files: ${evidence.build.distFileCount}`,
  `- dist size: ${evidence.build.distTotalHuman}`,
  `- largest JS chunk: ${evidence.build.largestJsHuman}`,
  `- React root present in dist/index.html: ${evidence.build.indexHasRoot ? 'yes' : 'no'}`,
  '',
  '## Expected Static Routes',
  '',
  ...expectedRoutes.map((route) => `- ${route}`),
  '',
  '## Platform Settings',
  '',
  '- GitHub Actions: `.github/workflows/build-check.yml` runs the release gate.',
  '- Vercel: build command `npm run build`, output directory `dist`.',
  '- Netlify: build command `npm run build`, publish directory `dist`.',
  '- Replit/local: `npm ci` then `npm run dev`; use `npm run preview` after build for production preview.',
  '',
  '## Integrity Hashes',
  '',
  `- package.json: ${evidence.files.packageJsonSha256}`,
  `- package-lock.json: ${evidence.files.packageLockSha256}`,
  `- vercel.json: ${evidence.files.vercelSha256}`,
  `- netlify.toml: ${evidence.files.netlifySha256}`,
  '',
  '## Evidence Status',
  '',
  failed.length ? failed.map((item) => `- ❌ ${item}`).join('\n') : '- ✅ Production evidence pack passed.',
  '',
  '## Release Rule',
  '',
  'Do not upload, merge, or deploy if `npm run release:check` fails.',
  '',
].join('\n');

writeFileSync(join(releaseDir, 'PRODUCTION_EVIDENCE.json'), `${JSON.stringify(evidence, null, 2)}\n`);
writeFileSync(join(releaseDir, 'PRODUCTION_EVIDENCE.md'), markdown);

if (failed.length) {
  console.error('❌ Production evidence pack failed:');
  for (const item of failed) console.error(`- ${item}`);
  process.exit(1);
}

console.log('✅ Production evidence pack passed.');
console.log('Evidence written to release/PRODUCTION_EVIDENCE.md and release/PRODUCTION_EVIDENCE.json');
