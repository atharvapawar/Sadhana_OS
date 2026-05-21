#!/usr/bin/env node
import { createServer } from 'node:http';
import { readFileSync, existsSync, statSync } from 'node:fs';
import { join, extname, normalize } from 'node:path';

const root = process.cwd();
const dist = join(root, 'dist');
const indexPath = join(dist, 'index.html');
const routes = ['/', '/roadmap', '/stage/1', '/stage/18', '/inner-science', '/practice', '/glossary', '/experience'];

if (!existsSync(indexPath)) {
  console.error('❌ dist/index.html not found. Run npm run build before route smoke test.');
  process.exit(1);
}

const indexHtml = readFileSync(indexPath, 'utf8');
const assetRefs = [...indexHtml.matchAll(/(?:src|href)="([^"?#]+)[^" ]*"/g)].map((m) => m[1]).filter((href) => href.startsWith('/assets/') || href.startsWith('assets/'));
for (const ref of assetRefs) {
  const assetPath = join(dist, ref.replace(/^\//, ''));
  if (!existsSync(assetPath)) {
    console.error(`❌ Built asset referenced by index.html is missing: ${ref}`);
    process.exit(1);
  }
}
console.log(`✅ Built asset references verified (${assetRefs.length})`);

const server = createServer((req, res) => {
  const url = new URL(req.url || '/', 'http://127.0.0.1');
  const pathname = decodeURIComponent(url.pathname);
  const safePath = normalize(pathname).replace(/^([/\\])+/, '');
  let filePath = join(dist, safePath);

  if (pathname === '/' || !existsSync(filePath) || statSafe(filePath)?.isDirectory()) {
    filePath = indexPath;
  }

  if (!filePath.startsWith(dist)) {
    res.writeHead(403).end('Forbidden');
    return;
  }

  try {
    const body = readFileSync(filePath);
    res.writeHead(200, { 'content-type': contentType(filePath) });
    res.end(body);
  } catch {
    res.writeHead(404).end('Not found');
  }
});

server.listen(0, '127.0.0.1', async () => {
  const { port } = server.address();
  const base = `http://127.0.0.1:${port}`;
  try {
    for (const route of routes) {
      const response = await fetch(`${base}${route}`);
      const text = await response.text();
      if (response.status !== 200) throw new Error(`${route} returned ${response.status}`);
      if (!text.includes('<div id="root">')) throw new Error(`${route} did not serve SPA index.html`);
      console.log(`✅ Route smoke passed: ${route}`);
    }
    console.log('\nRoute smoke test passed.');
  } catch (error) {
    console.error(`❌ ${error.message}`);
    process.exitCode = 1;
  } finally {
    server.close(() => process.exit(process.exitCode || 0));
  }
});

function statSafe(path) {
  try { return statSync(path); } catch { return null; }
}

function contentType(filePath) {
  const ext = extname(filePath);
  if (ext === '.html') return 'text/html; charset=utf-8';
  if (ext === '.js') return 'application/javascript; charset=utf-8';
  if (ext === '.css') return 'text/css; charset=utf-8';
  if (ext === '.svg') return 'image/svg+xml';
  if (ext === '.png') return 'image/png';
  if (ext === '.jpg' || ext === '.jpeg') return 'image/jpeg';
  return 'application/octet-stream';
}
