// session-04_plugin-test.js  (run: node session-04_plugin-test.js)
const { loadPage, type } = require('./test-helper');

(async () => {
  const w = await loadPage('session-04_plugin-demo.html');
  const $ = w.jQuery;
  const c = sel => $(sel).next('.char-limit');

  console.log('headline counter :', c('#headline').text(), '| maxlength =', $('#headline').attr('maxlength'));
  console.log('body counter     :', c('#body').text(), '| chained class border-primary:', $('#body').hasClass('border-primary'));
  type(w, '#headline', 'Admissions open for Spring 2026 at KHI');   // 38 chars
  console.log('after 38 chars   :', c('#headline').text(), '| warning:', c('#headline').hasClass('text-danger'));
  type(w, '#body', 'x'.repeat(125));
  console.log('body 125 chars   :', c('#body').text(), '| warning:', c('#body').hasClass('text-danger'), '| status:', $('#status').text());
  $('#headline').charLimit();                                          // second call must be ignored
  console.log('counters after re-init:', $('.char-limit').length);
  console.log('defaults         :', JSON.stringify({ max: $.fn.charLimit.defaults.max, warnAt: $.fn.charLimit.defaults.warnAt }));
})();
