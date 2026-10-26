// session-03_selectors-test.js  (run: node session-03_selectors-test.js)
const { loadPage } = require('./test-helper');

(async () => {
  const w = await loadPage('session-03_selectors.html');
  const $ = w.jQuery;
  const selectors = [
    'tbody tr', 'tr.pass', '#students td:first-child', 'tbody tr:first', 'tbody tr:last',
    'tbody tr:even', 'tbody tr:odd', 'tbody tr:eq(2)', 'tbody tr:gt(2)',
    'td:contains("Karachi")', 'tr:has(td:contains("Lahore"))',
    '[type="email"]', 'a[href^="https"]', 'a[href^="#"]', ':checkbox:checked',
    'select option:selected', 'button:disabled', 'input[required]',
  ];
  for (const sel of selectors) {
    const $m = $(sel);
    const sample = $m.map((i, el) => $(el).text().trim().replace(/\s+/g, ' ') || el.name || el.getAttribute('href') || el.tagName.toLowerCase())
                     .get().slice(0, 3).join(' | ');
    console.log(`${sel.padEnd(30)} -> ${String($m.length).padStart(2)}  ${sample}`);
  }
})();
