// session-05_slugify.test.js – run: node --test session-05_slugify.test.js
// SLUGIFY_IMPL selects which implementation to test (default: the reviewed one).
const test = require('node:test');
const assert = require('node:assert/strict');
const slugify = require(process.env.SLUGIFY_IMPL || './session-05_slugify.js');

test('simple title', () => assert.equal(slugify('Hello World'), 'hello-world'));
test('punctuation is removed', () => assert.equal(slugify('Fresh Cakes!'), 'fresh-cakes'));
test('multiple spaces collapse to one hyphen', () => assert.equal(slugify('Order   Online'), 'order-online'));
test('dashes and symbols in titles', () => assert.equal(slugify('Karachi Bakes – Fresh Cakes'), 'karachi-bakes-fresh-cakes'));
test('accents become plain letters', () => assert.equal(slugify('Café Menu'), 'cafe-menu'));
test('no leading or trailing hyphens', () => assert.equal(slugify('  Hi there  '), 'hi-there'));
