// tools/check-site.js – pre-submission checker (run: npm install, then npm run check)
// Checks every HTML page for the requirements in the capstone rubric.
const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

const SITE = path.join(__dirname, '..');
const pages = fs.readdirSync(SITE).filter(f => f.endsWith('.html')).sort();
let failures = 0, warnings = 0;

for (const file of pages) {
  const html = fs.readFileSync(path.join(SITE, file), 'utf8');
  const doc = new JSDOM(html).window.document;
  const results = [];
  const ok = (cond, msg, level = 'fail') => {
    results.push(`${cond ? '✔' : level === 'warn' ? '⚠' : '✘'} ${msg}`);
    if (!cond) level === 'warn' ? warnings++ : failures++;
  };
  const title = doc.title.trim();
  const desc = doc.querySelector('meta[name="description"]')?.content ?? '';
  ok(doc.documentElement.lang, 'html lang attribute');
  ok(/width=device-width/.test(doc.querySelector('meta[name="viewport"]')?.content ?? ''), 'responsive viewport meta');
  ok(title.length >= 30 && title.length <= 65, `title length ${title.length} (30–65)`);
  ok(desc.length >= 120 && desc.length <= 160, `meta description length ${desc.length} (120–160)`);
  ok(doc.querySelectorAll('h1').length === 1, `exactly one h1 (found ${doc.querySelectorAll('h1').length})`);
  ok(doc.querySelector('main') && doc.querySelector('nav') && doc.querySelector('footer'), 'semantic main, nav and footer');
  const imgs = [...doc.images];
  ok(imgs.every(i => i.hasAttribute('alt')), `alt attribute on all ${imgs.length} image(s)`);
  ok(imgs.every(i => i.getAttribute('width') && i.getAttribute('height')), 'width/height on images (prevents layout shift)', 'warn');
  const fields = [...doc.querySelectorAll('input:not([type=hidden]), textarea, select')];
  ok(fields.every(f => f.id && doc.querySelector(`label[for="${f.id}"]`)), `labels for all ${fields.length} form field(s)`);
  const cdn = [...doc.querySelectorAll('link[href^="http"][rel=stylesheet], script[src^="http"]')];
  ok(cdn.every(e => e.getAttribute('integrity')), `SRI integrity on ${cdn.length} CDN file(s)`);
  const local = [...doc.querySelectorAll('a[href], link[href], script[src], img[src]')]
    .map(e => e.getAttribute('href') || e.getAttribute('src'))
    .filter(u => u && !/^(https?:|mailto:|tel:|#|data:)/.test(u));
  const missing = [...new Set(local)].filter(u => !fs.existsSync(path.join(SITE, u.split('#')[0])));
  ok(missing.length === 0, `local links/assets exist (${missing.length} missing)${missing.length ? ': ' + missing.join(', ') : ''}`);
  const todos = (html.match(/TODO/g) || []).length;
  ok(todos === 0, `no TODO placeholders left (${todos} found)`, 'warn');
  console.log(`\n${file}`);
  results.forEach(r => console.log('  ' + r));
}
const js = fs.readFileSync(path.join(SITE, 'js', 'main.js'), 'utf8');
const dataItems = (fs.readFileSync(path.join(SITE, 'js', 'data.js'), 'utf8').match(/\bid:\s*\d+/g) || []).length;
console.log(`\njs/data.js: ${dataItems} catalogue item(s) ${dataItems >= 12 ? '✔' : '⚠ (rubric asks for at least 12)'}`);
console.log(`js/main.js: ${js.split('\n').length} lines, TODOs left: ${(js.match(/TODO/g) || []).length}`);
console.log(`\nSUMMARY: ${failures} failure(s), ${warnings} warning(s) → ${failures ? 'FIX BEFORE SUBMITTING' : 'ready for review'}`);
