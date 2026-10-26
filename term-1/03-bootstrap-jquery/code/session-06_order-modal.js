// session-06_order-modal.js – one modal, many buttons (Bootstrap 5 + jQuery)
$(function () {
  const $modal = $('#orderModal');
  const orders = [];                                    // in a real site this would be sent to a server

  // 1. Before the modal opens, fill it from the button that triggered it
  $modal.on('show.bs.modal', function (e) {
    const $btn = $(e.relatedTarget);                    // the clicked "Order" button
    const cake = $btn.data('cake');
    const price = $btn.data('price');
    $(this).find('.modal-title').text(`Order: ${cake}`);
    $('#cakeName').val(cake);
    $('#unitPrice').val(price);
    $('#qty').val(1).removeClass('is-invalid');
    updateTotal();
  });

  // 2. After it has opened, put the cursor in the quantity box (accessibility)
  $modal.on('shown.bs.modal', () => $('#qty').trigger('focus'));

  // 3. Live total as the quantity changes
  function updateTotal() {
    const total = Number($('#qty').val()) * Number($('#unitPrice').val());
    $('#orderTotal').text(Number.isFinite(total) && total > 0 ? `Rs ${total.toLocaleString('en-US')}` : '–');
  }
  $('#qty').on('input', updateTotal);

  // 4. Submit: validate, save, close with the Bootstrap API, show a toast
  $('#orderForm').on('submit', function (e) {
    e.preventDefault();
    const qty = Number($('#qty').val());
    const ok = Number.isInteger(qty) && qty >= 1 && qty <= 10;
    $('#qty').toggleClass('is-invalid', !ok).attr('aria-invalid', String(!ok));
    if (!ok) return;

    orders.push({ cake: $('#cakeName').val(), qty, total: qty * Number($('#unitPrice').val()) });
    if (window.bootstrap) bootstrap.Modal.getOrCreateInstance($modal[0]).hide();
    $modal.trigger('order:placed', [orders.at(-1)]);     // custom event for other code (and our test)
  });

  // 5. When the modal has fully closed, reset the form and show a toast
  $modal.on('hidden.bs.modal', function () {
    $('#orderForm')[0].reset();
  });
  $modal.on('order:placed', function (e, order) {
    $('#toastBody').text(`${order.qty} × ${order.cake} added (Rs ${order.total.toLocaleString('en-US')}).`);
    $('#cartCount').text(orders.reduce((n, o) => n + o.qty, 0));
    if (window.bootstrap) bootstrap.Toast.getOrCreateInstance('#orderToast').show();
  });

  // 6. Opt-in components: tooltips must be initialised by you
  if (window.bootstrap) {
    $('[data-bs-toggle="tooltip"]').each(function () { bootstrap.Tooltip.getOrCreateInstance(this); });
  }
  window.getOrders = () => orders.slice();               // handy for debugging in the console
});
