import { existsSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const dist = 'dist';
const maxInitialJsKb = 450;
const maxAnyJsKb = 650;
const warnings = [];
const failures = [];

function walk(dir) {
  const files = [];
  for (const item of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, item.name);
    if (item.isDirectory()) files.push(...walk(path));
    else files.push(path);
  }
  return files;
}

if (!existsSync(dist)) {
  failures.push('dist folder does not exist. Run npm run build before npm run performance.');
} else if (!existsSync(join(dist, 'index.html'))) {
  failures.push('dist/index.html is missing. Production build output is incomplete.');
} else {
  const jsFiles = walk(dist).filter((file) => file.endsWith('.js'));
  if (!jsFiles.length) failures.push('No JavaScript assets were generated in dist.');

  const assetRows = jsFiles
    .map((file) => ({ file, kb: statSync(file).size / 1024 }))
    .sort((a, b) => b.kb - a.kb);

  const largest = assetRows[0];
  if (largest && largest.kb > maxAnyJsKb) {
    failures.push(`Largest JS chunk is ${largest.kb.toFixed(1)} KB (${relative(dist, largest.file)}), over ${maxAnyJsKb} KB.`);
  }

  const likelyInitial = assetRows.filter(({ file }) => /index-|vendor-|react-/.test(file));
  const initialKb = likelyInitial.reduce((sum, row) => sum + row.kb, 0);
  if (initialKb > maxInitialJsKb) {
    warnings.push(`Likely initial JS is ${initialKb.toFixed(1)} KB, above soft budget ${maxInitialJsKb} KB. Keep route-level lazy loading intact.`);
  }

  console.log('Sadhana OS production asset summary:');
  for (const row of assetRows.slice(0, 12)) {
    console.log(`- ${relative(dist, row.file)}: ${row.kb.toFixed(1)} KB`);
  }
  console.log(`Likely initial JS: ${initialKb.toFixed(1)} KB`);
}

if (failures.length) {
  console.error('\nPerformance budget failed:\n');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

if (warnings.length) {
  console.warn('\nPerformance warnings:');
  for (const warning of warnings) console.warn(`- ${warning}`);
}

console.log('Performance budget check passed.');
