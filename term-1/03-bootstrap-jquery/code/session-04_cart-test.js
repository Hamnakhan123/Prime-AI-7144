// session-04_cart-test.js  (run: node session-04_cart-test.js)
const { loadPage } = require('./test-helper');

(async () => {
  const w = await loadPage('session-04_cart.html');
  const $ = w.jQuery;
  const rows = () => $('#cart tbody tr').map((i, tr) => `${$(tr).children().eq(0).text()} x${$(tr).find('.qty').text()}`).get().join(', ') || '(empty)';
  const show = step => console.log(`${step.padEnd(28)} ${rows().padEnd(42)} total=${$('#total').text().padEnd(9)} checkoutDisabled=${$('#checkout').prop('disabled')}`);
  const add = name => $(`.product[data-name="${name}"] .add`).trigger('click');

  show('Start');
  add('Notebook'); show('Add Notebook');
  add('Gel pen'); add('Gel pen'); add('Gel pen'); show('Add Gel pen x3');
  add('Geometry box'); show('Add Geometry box');
  $('#cart tr[data-name="Gel pen"] .minus').trigger('click'); show('Minus one Gel pen');
  $('#cart tr[data-name="Notebook"] .remove').trigger('click'); show('Remove Notebook');
  $('#clear').trigger('click'); show('Clear cart');
})();
