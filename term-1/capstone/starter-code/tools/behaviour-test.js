// tools/behaviour-test.js – clicks and types through the starter site in jsdom (run: node tools/behaviour-test.js)
// Proves the jQuery features work before you start changing them. Needs: npm install (jsdom + jquery).
const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');
const SITE = path.join(__dirname, '..');
const JQ = fs.readFileSync(require.resolve('jquery/dist/jquery.min.js'), 'utf8');

async function load(file) {
  const dom = new JSDOM(fs.readFileSync(path.join(SITE, file), 'utf8'), { runScripts: 'outside-only', url: 'http://localhost/' + file });
  const w = dom.window;
  w.eval(JQ);
  w.$.fx.off = true;                                   // no animation delays in tests
  w.eval(fs.readFileSync(path.join(SITE, 'js/data.js'), 'utf8'));
  w.eval(fs.readFileSync(path.join(SITE, 'js/main.js'), 'utf8'));
  await new Promise(r => setTimeout(r, 50));           // let $(function) run
  return w;
}

(async () => {
  let w = await load('index.html');
  console.log('Home     : featured cards =', w.$('#featured .card').length, '| footer year =', w.$('#year').text());

  w = await load('catalogue.html');
  const $ = w.$;
  console.log('Catalogue: filters =', $('#filters button').map((i, b) => $(b).text()).get().join(', '));
  console.log('           ', $('#resultCount').text());
  $('#filters button:contains("Category B")').trigger('click');
  console.log('Filter B   ->', $('#resultCount').text(), '|', $('#catalogue h3').map((i, h) => $(h).text()).get().join(', '));
  $('#filters button:contains("All")').trigger('click');
  $('#search').val('fiv').trigger('input');
  console.log('Search fiv ->', $('#resultCount').text(), '|', $('#catalogue h3').text());
  $('#search').val('zzz').trigger('input');
  console.log('Search zzz ->', $('#resultCount').text(), '| "no results" shown:', !$('#noResults').hasClass('d-none'));
  $('#search').val('').trigger('input');
  $('.fav-btn[data-id=3]').trigger('click');
  console.log('Favourite 3->', $('.fav-btn[data-id=3]').text(), 'aria-pressed', $('.fav-btn[data-id=3]').attr('aria-pressed'),
              '| saved', w.localStorage.getItem('favs'));
  $('.details[data-id=2]').trigger('click');
  console.log('Details 2  -> modal title:', $('#itemModalTitle').text(), '|', $('#itemModalBody .fw-bold').text());

  w = await load('contact.html');
  const c = w.$;
  c('#contactForm').trigger('submit');
  console.log('Contact  : empty submit -> invalid:', c('.is-invalid').map((i, e) => e.id).get().join(', '),
              '| focused:', w.document.activeElement.id);
  c('#cName').val('Areeba Khan'); c('#cEmail').val('areeba@example.com'); c('#cPhone').val('0312-3456789');
  c('#cMsg').val('Do you deliver to Gulshan?').trigger('input');
  c('#contactForm').trigger('submit');
  console.log('           valid submit ->', c('#formSuccess').text(), '| counter reset:', c('#msgCount').text());
  c('#themeToggle').trigger('click');
  console.log('Theme    :', c('html').attr('data-bs-theme'), '| button', c('#themeToggle').text(), '| saved', w.localStorage.getItem('theme'));
})();
