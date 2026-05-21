#!/usr/bin/env node
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
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

requireText('vercel.json', '"buildCommand": "npm run build"', 'Vercel build command');
requireText('vercel.json', '"outputDirectory": "dist"', 'Vercel output directory');
requireText('netlify.toml', 'command = "npm run build"', 'Netlify build command');
requireText('netlify.toml', 'publish = "dist"', 'Netlify publish directory');
requireText('.replit', 'npm run dev', 'Replit dev run command');
requireText('DEPLOYMENT_CHECKLIST.md', 'Build command', 'deployment checklist build command');
requireText('README.md', 'npm run release:check', 'README release check command');

if (!existsSync('dist/index.html')) failures.push('dist/index.html is missing. Run npm run build before deployment smoke packaging.');
if (!existsSync('dist/sitemap.xml')) warnings.push('dist/sitemap.xml is missing. Run npm run sitemap:generate before npm run build if needed.');
if (!existsSync('dist/robots.txt')) warnings.push('dist/robots.txt is missing in dist.');
if (!existsSync('dist/manifest.webmanifest')) warnings.push('dist/manifest.webmanifest is missing in dist.');

const outDir = 'release';
mkdirSync(outDir, { recursive: true });
const smoke = `# Sadhana OS Deployment Smoke Kit\n\nGenerated: ${new Date().toISOString()}\n\n## Local Smoke\n\n\`\`\`bash\nnpm ci\nnpm run release:check\nnpm run preview\n\`\`\`\n\nOpen or curl:\n\n- http://localhost:4173/\n- http://localhost:4173/roadmap\n- http://localhost:4173/stage/18\n- http://localhost:4173/sitemap.xml\n- http://localhost:4173/manifest.webmanifest\n\n## GitHub\n\n1. Push this folder to a GitHub repo.\n2. Confirm the Build Check workflow runs.\n3. The workflow must run \`npm ci\` and \`npm run release:check\`.\n\n## Vercel\n\n- Framework: Vite\n- Install command: npm ci\n- Build command: npm run build\n- Output directory: dist\n\n## Netlify\n\n- Install command: npm ci\n- Build command: npm run build\n- Publish directory: dist\n\n## Replit\n\n- Run: npm run dev\n- Build check: npm run release:check\n\n## Required Result\n\nEvery route should return HTTP 200 and the site should load without private registry, missing Vite binary, missing dist assets, or static-host fallback errors.\n`;
writeFileSync(join(outDir, 'DEPLOYMENT_SMOKE_KIT.md'), smoke);

if (failures.length) {
  console.error('\nSadhana OS deployment smoke kit failed:\n');
  for (const failure of failures) console.error(`- ${failure}`);
  if (warnings.length) {
    console.warn('\nWarnings:');
    for (const warning of warnings) console.warn(`- ${warning}`);
  }
  process.exit(1);
}

console.log('Sadhana OS deployment smoke kit passed.');
console.log('Deployment smoke kit written to release/DEPLOYMENT_SMOKE_KIT.md');
if (warnings.length) {
  console.warn('\nWarnings:');
  for (const warning of warnings) console.warn(`- ${warning}`);
}
