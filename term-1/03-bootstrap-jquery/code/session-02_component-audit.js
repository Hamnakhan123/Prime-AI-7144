// session-02_component-audit.js
// Loads HTML files with jsdom and reports Bootstrap components and broken data-bs-target links.
// Run: npm install   (once)   then   node session-02_component-audit.js
const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

const FILES = ['session-02_components-gallery.html', 'session-02_navbar-header.html', 'session-02_interactive-components.html'];
const COMPONENTS = ['navbar', 'card', 'alert', 'badge', 'modal', 'carousel', 'accordion', 'list-group', 'progress', 'breadcrumb', 'pagination', 'dropdown'];

for (const file of FILES) {
  const html = fs.readFileSync(path.join(__dirname, file), 'utf8');
  const doc = new JSDOM(html).window.document;          // scripts are NOT run – we only inspect markup

  // 1. Count each component by its root class
  const counts = COMPONENTS
    .map(c => [c, doc.querySelectorAll('.' + c).length])
    .filter(([, n]) => n > 0)
    .map(([c, n]) => `${c}×${n}`);

  // 2. Every data-bs-toggle should point at an existing element (except dropdown/tab-less cases)
  const triggers = [...doc.querySelectorAll('[data-bs-toggle]')];
  const broken = triggers.filter(t => {
    const target = t.getAttribute('data-bs-target');
    return target && !doc.querySelector(target);
  });

  // 3. Accessibility quick checks
  const imgsNoAlt = [...doc.querySelectorAll('img')].filter(i => !i.hasAttribute('alt')).length;
  const hasViewport = !!doc.querySelector('meta[name="viewport"]');

  console.log(`\n${file}`);
  console.log(`  components : ${counts.join(', ') || 'none'}`);
  console.log(`  triggers   : ${triggers.length} (${[...new Set(triggers.map(t => t.dataset.bsToggle))].join(', ')})`);
  console.log(`  broken     : ${broken.length}`);
  console.log(`  viewport   : ${hasViewport ? 'yes' : 'MISSING'} · images without alt: ${imgsNoAlt}`);
}
