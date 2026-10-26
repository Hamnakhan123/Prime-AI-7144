// session-05_pricing.test.js – run: node --test session-05_pricing.test.js
const test = require('node:test');
const assert = require('node:assert/strict');
const { formatPKR, deliveryFee } = require('./session-05_pricing.js');

test('formats thousands with commas', () => assert.equal(formatPKR(2400), 'Rs 2,400'));
test('rounds paisa away', () => assert.equal(formatPKR(999.6), 'Rs 1,000'));
test('rejects non-numbers', () => assert.throws(() => formatPKR('2400'), TypeError));
test('Rs 250 below the threshold', () => assert.equal(deliveryFee(3000), 250));
test('exactly Rs 5,000 is NOT above the threshold', () => assert.equal(deliveryFee(5000), 250));
test('free above Rs 5,000', () => assert.equal(deliveryFee(5001), 0));
test('empty cart has no delivery fee', () => assert.equal(deliveryFee(0), 0));
test('negative subtotal is rejected', () => assert.throws(() => deliveryFee(-10), RangeError));
