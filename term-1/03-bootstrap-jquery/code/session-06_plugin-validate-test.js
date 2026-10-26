// session-06_plugin-validate-test.js  (run: node session-06_plugin-validate-test.js)
const { loadPage } = require('./test-helper');

(async () => {
  const w = await loadPage('session-06_plugin-validate.html');
  const $ = w.jQuery;
  const errors = () => $('#workshop div.invalid-feedback').filter((i, e) => $(e).text() && e.style.display !== 'none')
    .map((i, e) => `${$(e).attr('id')?.replace('-error', '')}: ${$(e).text()}`).get();

  console.log('plugin loaded: $.validator exists =', typeof $.validator === 'function');
  // jsdom has no layout engine, so every field counts as ":hidden" – and the plugin skips hidden fields by default.
  // In a real browser this line is not needed.
  $('#workshop').validate().settings.ignore = [];
  $('#workshop').trigger('submit');
  console.log('Empty submit ->'); errors().forEach(e => console.log('   ' + e));
  $('#wName').val('Bilal'); $('#wEmail').val('bilal@example.com'); $('#wSeats').val('6'); $('#wCode').val('khi-2041');
  $('#workshop').trigger('submit');
  console.log('Second try ->'); errors().forEach(e => console.log('   ' + e));
  console.log('   classes: wName=' + $('#wName').attr('class') + ' | wSeats=' + $('#wSeats').attr('class'));
  $('#wSeats').val('2'); $('#wCode').val('KHI-2041');
  $('#workshop').trigger('submit');
  console.log('Fixed ->', $('#done').text(), '| valid():', $('#workshop').valid());
})();
