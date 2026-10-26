// session-03_mini-project-report-card.js  (run: node session-03_mini-project-report-card.js)
// Grades each demo page on mobile basics, sitemap inclusion, structured data and snippet tags.
const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');
const SITE = path.join(__dirname, 'demo-site');

const sitemapPath = path.join(SITE, 'sitemap.xml');
const sitemap = fs.existsSync(sitemapPath) ? fs.readFileSync(sitemapPath, 'utf8') : '';

const pages = fs.readdirSync(SITE).filter(f => f.endsWith('.html')).sort();
console.log('page                   viewport imgDims sitemap schema title desc  points grade');
for (const f of pages) {
  const doc = new JSDOM(fs.readFileSync(path.join(SITE, f), 'utf8')).window.document;
  const c = {
    viewport: /width=device-width/.test(doc.querySelector('meta[name=viewport]')?.content ?? ''),
    imgDims: [...doc.images].every(i => i.getAttribute('width') && i.getAttribute('height')),
    sitemap: sitemap.includes(f === 'index.html' ? '<loc>https://karachitutors.pk/</loc>' : f),
    schema: !!doc.querySelector('script[type="application/ld+json"]'),
    title: doc.title.length >= 30 && doc.title.length <= 65,
    desc: (doc.querySelector('meta[name=description]')?.content ?? '').length >= 120,
  };
  const pts = Object.values(c).filter(Boolean).length;
  const grade = 'FEDCBAA'[pts];
  const yn = b => (b ? 'yes' : 'NO').padEnd(8);
  console.log(`${f.padEnd(22)} ${yn(c.viewport)} ${yn(c.imgDims)}${yn(c.sitemap)}${yn(c.schema)}${yn(c.title).slice(0, 6)}${yn(c.desc).slice(0, 6)}${String(pts).padStart(2)}/6   ${grade}`);
}
console.log('\nNext step for every page: add JSON-LD (Organization on home, BlogPosting on the article, LocalBusiness on contact).');
