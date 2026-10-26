// session-06_order-modal-test.js  (run: node session-06_order-modal-test.js)
// Bootstrap's own JS is not loaded here, so we fire the events Bootstrap would fire.
const { loadPage } = require('./test-helper');

(async () => {
  const w = await loadPage('session-06_order-modal.html');
  const $ = w.jQuery;
  const open = cake => $('#orderModal').trigger($.Event('show.bs.modal', { relatedTarget: $(`[data-cake="${cake}"]`)[0] }));

  open('Red Velvet');
  console.log('Opened from Red Velvet  ->', $('#orderTitle').text(), '| total', $('#orderTotal').text());
  $('#qty').val(3).trigger('input');
  console.log('Quantity 3              -> total', $('#orderTotal').text());
  $('#orderForm').trigger('submit');
  console.log('Submitted               ->', $('#toastBody').text(), '| cart', $('#cartCount').text());

  open('Lotus Biscoff');
  console.log('Opened from Lotus       ->', $('#orderTitle').text(), '| qty reset to', $('#qty').val());
  $('#qty').val(25).trigger('input');
  $('#orderForm').trigger('submit');
  console.log('Quantity 25 submitted   -> is-invalid:', $('#qty').hasClass('is-invalid'), '| aria-invalid:', $('#qty').attr('aria-invalid'), '| cart still', $('#cartCount').text());
  console.log('Orders so far           ->', JSON.stringify(w.getOrders()));
})();
