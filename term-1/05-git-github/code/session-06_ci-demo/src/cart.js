// src/cart.js – business logic tested by CI
const FREE_ABOVE = 5000;
const FEE = 250;

function subtotal(items) {
  return items.reduce((sum, item) => sum + item.price * item.qty, 0);
}

function delivery(subtotal) {
  if (subtotal === 0) return 0;
  return subtotal > FREE_ABOVE ? 0 : FEE;
}

function total(items) {
  const s = subtotal(items);
  return s + delivery(s);
}

module.exports = { subtotal, delivery, total, FREE_ABOVE, FEE };
