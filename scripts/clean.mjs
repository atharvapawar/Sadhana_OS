import { rmSync, existsSync } from 'node:fs';

const targets = ['node_modules', 'dist', '.vite'];
for (const target of targets) {
  if (existsSync(target)) {
    rmSync(target, { recursive: true, force: true });
    console.log(`removed ${target}`);
  }
}
console.log('clean complete');
