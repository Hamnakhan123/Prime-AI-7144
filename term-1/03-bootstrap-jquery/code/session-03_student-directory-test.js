// session-03_student-directory-test.js  (run: node session-03_student-directory-test.js)
const { loadPage, shown, type } = require('./test-helper');

(async () => {
  const w = await loadPage('session-03_student-directory.html');
  const $ = w.jQuery;
  const visible = () => $('#directory li').filter((i, li) => shown(w, li)).map((i, li) => $(li).text().split(' – ')[0]).get();
  const report = step => console.log(`${step.padEnd(22)} ${$('#count').text().padEnd(16)} ${visible().join(', ') || '(none)'}  warning=${shown(w, $('#none')[0])}`);

  report('Page load');
  type(w, '#search', 'an');
  report('Type "an"');
  $('#filters button[data-filter="BSCS"]').trigger('click');
  report('Click BSCS');
  type(w, '#search', 'zz');
  report('Type "zz"');
  type(w, '#search', '');
  $('#filters button[data-filter="all"]').trigger('click');
  report('Clear + All');
})();
