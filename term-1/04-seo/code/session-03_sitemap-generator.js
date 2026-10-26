// session-03_sitemap-generator.js  (run: node session-03_sitemap-generator.js)
// Builds sitemap.xml for indexable, canonical pages of the demo site.
const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

const SITE = path.join(__dirname, 'demo-site');
const BASE = 'https://karachitutors.pk/';
const LASTMOD = '2026-10-20';                          // fixed for reproducible output
const blocked = fs.readFileSync(path.join(SITE, 'robots.txt'), 'utf8')
  .split('\n').filter(l => /^disallow:\s*\/\S+/i.test(l.trim())).map(l => l.split(':')[1].trim());

function walk(dir) {
  return fs.readdirSync(dir).flatMap(f => {
    const p = path.join(dir, f);
    return fs.statSync(p).isDirectory() ? walk(p) : f.endsWith('.html') ? [path.relative(SITE, p).split(path.sep).join('/')] : [];
  });
}

const entries = [], skipped = [];
for (const rel of walk(SITE).sort()) {
  const doc = new JSDOM(fs.readFileSync(path.join(SITE, rel), 'utf8')).window.document;
  const robots = doc.querySelector('meta[name="robots"]')?.content ?? '';
  const canonical = doc.querySelector('link[rel="canonical"]')?.href ?? BASE + rel;
  if (blocked.some(b => ('/' + rel).startsWith(b))) { skipped.push(`${rel} (blocked by robots.txt)`); continue; }
  if (/noindex/i.test(robots)) { skipped.push(`${rel} (noindex)`); continue; }
  if (canonical !== BASE + rel && !(rel === 'index.html' && canonical === BASE)) { skipped.push(`${rel} (canonical points elsewhere)`); continue; }
  entries.push({ loc: canonical, priority: rel === 'index.html' ? '1.0' : '0.8' });
}

const xml = ['<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...entries.map(e => `  <url>\n    <loc>${e.loc}</loc>\n    <lastmod>${LASTMOD}</lastmod>\n  </url>`),
  '</urlset>'].join('\n');
fs.writeFileSync(path.join(SITE, 'sitemap.xml'), xml + '\n');

console.log(xml);
console.log(`\n${entries.length} URLs written to demo-site/sitemap.xml`);
console.log('Skipped:', skipped.join('; ') || 'none');
