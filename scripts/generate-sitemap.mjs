#!/usr/bin/env node
import { writeFileSync } from 'node:fs';

const rawBase = process.env.SITE_URL || process.env.VITE_SITE_URL || 'https://sadhana-os.vercel.app';
const siteUrl = rawBase.replace(/\/$/, '');

if (!/^https?:\/\//.test(siteUrl)) {
  console.error('SITE_URL must start with http:// or https://');
  process.exit(1);
}

const now = new Date().toISOString().slice(0, 10);
const baseRoutes = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/roadmap', priority: '0.95', changefreq: 'weekly' },
  { path: '/inner-science', priority: '0.9', changefreq: 'weekly' },
  { path: '/practice', priority: '0.9', changefreq: 'weekly' },
  { path: '/glossary', priority: '0.85', changefreq: 'weekly' },
  { path: '/experience', priority: '0.75', changefreq: 'monthly' },
];
const stageRoutes = Array.from({ length: 18 }, (_, index) => ({
  path: `/stage/${index + 1}`,
  priority: '0.8',
  changefreq: 'monthly',
}));
const routes = [...baseRoutes, ...stageRoutes];

const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${routes.map((route) => `  <url>\n    <loc>${siteUrl}${route.path}</loc>\n    <lastmod>${now}</lastmod>\n    <changefreq>${route.changefreq}</changefreq>\n    <priority>${route.priority}</priority>\n  </url>`).join('\n')}\n</urlset>\n`;

const robots = `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`;

writeFileSync('public/sitemap.xml', xml);
writeFileSync('public/robots.txt', robots);
console.log(`Generated public/sitemap.xml and public/robots.txt for ${siteUrl}`);
