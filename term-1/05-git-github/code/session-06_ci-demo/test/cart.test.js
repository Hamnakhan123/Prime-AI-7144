// test/cart.test.js – run with: npm test
const test = require('node:test');
const assert = require('node:assert/strict');
const { subtotal, delivery, total } = require('../src/cart.js');

const cart = [{ price: 2400, qty: 1 }, { price: 300, qty: 2 }];

test('subtotal multiplies price by quantity', () => assert.equal(subtotal(cart), 3000));
test('delivery is Rs 250 up to Rs 5,000', () => assert.equal(delivery(5000), 250));
test('delivery is free above Rs 5,000', () => assert.equal(delivery(5200), 0));
test('empty cart costs nothing', () => assert.equal(total([]), 0));
test('total adds delivery', () => assert.equal(total(cart), 3250));
