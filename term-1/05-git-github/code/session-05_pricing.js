// session-05_pricing.js – reviewed helpers for the bakery site.
const FREE_DELIVERY_ABOVE = 5000;   // business rule: free delivery for orders ABOVE Rs 5,000
const DELIVERY_FEE = 250;

/** Format a number as Pakistani rupees, e.g. 2400 -> "Rs 2,400". */
function formatPKR(amount) {
  if (!Number.isFinite(amount)) throw new TypeError('amount must be a finite number');
  return 'Rs ' + Math.round(amount).toLocaleString('en-US');
}

/** Delivery fee for a cart subtotal (subtotal must be >= 0). */
function deliveryFee(subtotal) {
  if (!Number.isFinite(subtotal) || subtotal < 0) throw new RangeError('subtotal must be a number >= 0');
  if (subtotal === 0) return 0;                       // empty cart: nothing to deliver
  return subtotal > FREE_DELIVERY_ABOVE ? 0 : DELIVERY_FEE;
}

module.exports = { formatPKR, deliveryFee, FREE_DELIVERY_ABOVE, DELIVERY_FEE };
