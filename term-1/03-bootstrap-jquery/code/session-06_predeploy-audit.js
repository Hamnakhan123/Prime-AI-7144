// session-06_predeploy-audit.js  (run: node session-06_predeploy-audit.js [folder])
// Checks every .html file in a folder against a pre-deployment checklist.
const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

const folder = path.resolve(__dirname, process.argv[2] || 'session-06_final-site');
const htmlFiles = fs.readdirSync(folder).filter(f => f.endsWith('.html'));
let problems = 0;

for (const file of htmlFiles) {
  const doc = new JSDOM(fs.readFileSync(path.join(folder, file), 'utf8')).window.document;
  const checks = [];
  const add = (ok, label) => { checks.push(`${ok ? '✔' : '✘'} ${label}`); if (!ok) problems++; };

  add(!!doc.querySelector('meta[name="viewport"]'), 'viewport meta tag');
  const title = doc.title.trim();
  add(title.length >= 10 && title.length <= 60, `title length ${title.length} (10–60)`);
  const desc = doc.querySelector('meta[name="description"]')?.content ?? '';
  add(desc.length >= 50 && desc.length <= 160, `meta description length ${desc.length} (50–160)`);
  add(doc.querySelectorAll('h1').length === 1, `exactly one h1 (found ${doc.querySelectorAll('h1').length})`);

  const noAlt = [...doc.images].filter(i => !i.hasAttribute('alt'));
  add(noAlt.length === 0, `all ${doc.images.length} images have alt text`);

  const inputs = [...doc.querySelectorAll('input:not([type=hidden]), select, textarea')];
  const unlabeled = inputs.filter(i => !(i.id && doc.querySelector(`label[for="${i.id}"]`)) && !i.getAttribute('aria-label'));
  add(unlabeled.length === 0, `all ${inputs.length} form fields are labelled`);

  const cdn = [...doc.querySelectorAll('script[src^="http"], link[rel=stylesheet][href^="http"]')];
  const noSri = cdn.filter(el => !el.hasAttribute('integrity'));
  add(noSri.length === 0, `${cdn.length} CDN files, ${noSri.length} without SRI`);

  const local = [...doc.querySelectorAll('script[src], link[href], img[src], a[href]')]
    .map(el => el.getAttribute('src') || el.getAttribute('href'))
    .filter(u => u && !/^(https?:|mailto:|tel:|#|data:)/.test(u));
  const missing = local.filter(u => !fs.existsSync(path.join(folder, u.split('#')[0])));
  add(missing.length === 0, `${local.length} local links/assets, ${missing.length} missing${missing.length ? ': ' + missing.join(', ') : ''}`);

  const kb = (fs.statSync(path.join(folder, file)).size / 1024).toFixed(1);
  console.log(`\n${file} (${kb} KB)`);
  checks.forEach(c => console.log('  ' + c));
}

const assets = ['css/style.css', 'js/main.js'].filter(f => fs.existsSync(path.join(folder, f)))
  .map(f => `${f} ${(fs.statSync(path.join(folder, f)).size / 1024).toFixed(1)} KB`);
console.log(`\nAssets: ${assets.join(' · ')}`);
console.log(problems === 0 ? 'READY TO DEPLOY ✅' : `${problems} problem(s) to fix before deploying ❌`);
