// session-06_final-site-test.js  (run: node session-06_final-site-test.js)
const { loadPage, shown } = require('./test-helper');

(async () => {
  const w = await loadPage('session-06_final-site/index.html');
  const $ = w.jQuery;

  // Services: open and close a details panel
  const $first = $('.toggle-details').first();
  $first.trigger('click');
  console.log('Details toggle  :', $first.text(), '| aria-expanded', $first.attr('aria-expanded'), '| panel shown', shown(w, $first.siblings('.details')[0]));

  // Counters (fx.off makes the animation finish instantly)
  w.runCounters();
  console.log('Counters        :', $('.counter').map((i, c) => $(c).text()).get().join(' · '));

  // Tracking: invalid, unknown, known
  for (const code of ['12345', 'IL-999999', 'il-204518']) {
    $('#trackNo').val(code); $('#trackForm').trigger('submit');
    const result = $('#trackResult').find('h3, p, .progress-bar, .alert').map((i, el) => $(el).text()).get().join(' | ') || '(no result)';
    console.log(`Track ${code.padEnd(10)}:`, $('#trackNo').hasClass('is-invalid') ? 'invalid format' : result);
  }

  // Quote modal: Lahore, 3.5 kg -> 650 + ceil(2.5)*100 = 950
  $('#qCity').val('650'); $('#qWeight').val('3.5').trigger('input');
  console.log('Quote           :', $('#quoteAmount').text());

  // Contact form: empty submit, then valid
  $('#contactForm').trigger('submit');
  console.log('Contact empty   :', $('#contactForm .is-invalid').map((i, e) => e.id).get().join(', '), '| focus on', w.document.activeElement.id);
  $('#cName').val('Sadia Malik'); $('#cEmail').val('sadia@shop.pk'); $('#cMsg').val('Please call me about COD rates for 300 parcels a month.');
  $('#contactForm').trigger('submit');
  console.log('Contact valid   :', $('#contactSuccess').text());

  // Dark mode toggle
  $('#themeToggle').trigger('click');
  console.log('Theme           :', $('html').attr('data-bs-theme'), '| button', $('#themeToggle').text(), '| saved', w.localStorage.getItem('theme'));
})();
