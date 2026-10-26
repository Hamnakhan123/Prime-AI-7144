// session-03_hello-test.js  (run: node session-03_hello-test.js)
const { loadPage } = require('./test-helper');

(async () => {
  const w = await loadPage('session-03_hello-jquery.html');
  const $ = w.jQuery;
  const state = label => console.log(`${label.padEnd(14)} h1="${$('#title').text()}" class="${$('#title').attr('class') || ''}" greetDisabled=${$('#greet').prop('disabled')}`);

  state('On load:');
  $('#greet').trigger('click');
  state('After Greet:');
  console.log(`${''.padEnd(14)} p="${$('.intro').text()}"`);
  $('#reset').trigger('click');
  state('After Reset:');
  console.log('jQuery version:', $.fn.jquery);
})();
