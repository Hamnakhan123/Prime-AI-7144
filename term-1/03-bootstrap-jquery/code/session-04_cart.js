// session-04_cart.js – shopping cart for session-04_cart.html
$(function () {
  const $body = $('#cart tbody');
  const money = n => 'Rs ' + n.toLocaleString('en-US');

  function recalc() {
    let total = 0, items = 0;
    $body.find('tr').each(function () {
      const $row = $(this);
      const qty = Number($row.find('.qty').text());
      const line = qty * $row.data('price');             // .data() returns a number already
      $row.find('.line').text(money(line));
      total += line; items += qty;
    });
    $('#total').text(money(total));
    $('#items').text(items);
    $('#empty').toggle(items === 0);
    $('#checkout').prop('disabled', items === 0);     // prop for live state
  }

  // Add to cart (delegated on the product list)
  $('#products').on('click', '.add', function () {
    const $card = $(this).closest('.product');        // traverse UP to the product card
    const name = $card.data('name');
    const price = $card.data('price');
    const $existing = $body.find(`tr[data-name="${name}"]`);

    if ($existing.length) {                           // already in cart → increase qty
      const $q = $existing.find('.qty');
      $q.text(Number($q.text()) + 1);
    } else {                                          // create a new row
      const $row = $('<tr>').attr('data-name', name).data('price', price);
      $('<td>').text(name).appendTo($row);
      $('<td>').addClass('qty').text(1).appendTo($row);
      $('<td>').addClass('line').appendTo($row);
      $('<td>').append('<button class="btn btn-sm btn-outline-secondary minus" aria-label="One less">−</button> ')
               .append('<button class="btn btn-sm btn-outline-danger remove" aria-label="Remove">✕</button>')
               .appendTo($row);
      $body.append($row);
    }
    recalc();
  });

  // Minus one (remove the row when qty reaches 0)
  $body.on('click', '.minus', function () {
    const $row = $(this).closest('tr');
    const $q = $row.find('.qty');
    const n = Number($q.text()) - 1;
    n > 0 ? $q.text(n) : $row.remove();
    recalc();
  });

  // Remove the whole row
  $body.on('click', '.remove', function () {
    $(this).closest('tr').remove();
    recalc();
  });

  $('#clear').on('click', () => { $body.empty(); recalc(); });
  recalc();
});
