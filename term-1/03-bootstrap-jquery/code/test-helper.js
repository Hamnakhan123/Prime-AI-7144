// test-helper.js – loads one of our HTML pages into a simulated browser (jsdom) so tests can interact with it.
// It swaps the jQuery CDN <script> for the locally installed copy (npm install), drops other CDN scripts
// (Bootstrap, jQuery UI) and inlines local <script src="file.js"> tags, then runs the page's own scripts.
const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

async function loadPage(file, { fxOff = true } = {}) {
  let html = fs.readFileSync(path.join(__dirname, file), 'utf8');
  const jquery = fs.readFileSync(require.resolve('jquery/dist/jquery.js'), 'utf8');
  html = html.replace(/<script[^>]*src="https:\/\/code\.jquery\.com\/jquery-[^"]+"[^>]*><\/script>/,
    () => `<script>${jquery}<\/script>`);
  // The jQuery Validation plugin (Session 6) is also swapped for its local npm copy
  html = html.replace(/<script[^>]*src="https:\/\/[^"]*jquery-validation[^"]*"[^>]*><\/script>/,
    () => `<script>${fs.readFileSync(require.resolve('jquery-validation/dist/jquery.validate.js'), 'utf8')}<\/script>`);
  html = html.replace(/<script[^>]*src="https:\/\/[^"]+"[^>]*><\/script>/g, '');
  // Local scripts are resolved relative to the HTML file (so sub-folders such as js/main.js work)
  const base = path.dirname(path.join(__dirname, file));
  html = html.replace(/<script src="([\w.\/-]+\.js)"><\/script>/g,
    (m, f) => `<script>${fs.readFileSync(path.join(base, f), 'utf8')}<\/script>`);
  // Local stylesheets are inlined too, so rules such as `.details { display: none }` apply in the test
  html = html.replace(/<link rel="stylesheet" href="([\w.\/-]+\.css)">/g,
    (m, f) => `<style>${fs.readFileSync(path.join(base, f), 'utf8')}</style>`);
  // A localhost URL gives the page a real origin, so localStorage works
  const dom = new JSDOM(html, { runScripts: 'dangerously', pretendToBeVisual: true, url: 'http://localhost/' });
  const w = dom.window;
  if (fxOff) w.jQuery.fx.off = true;                 // make effects instant unless a test wants real timing
  await new Promise(resolve => w.jQuery(() => setTimeout(resolve, 0)));   // wait for $(function(){...})
  return w;
}

// jsdom has no layout engine, so :visible cannot be used in tests. This checks the inline display style instead.
function shown(w, el) {
  return w.getComputedStyle(el).display !== 'none';
}

// Type text into an input and fire the 'input' event, like a user would
function type(w, selector, text) {
  const $ = w.jQuery;
  $(selector).val(text).trigger('input');
}

module.exports = { loadPage, shown, type };
