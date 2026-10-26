// session-05_slugify.js – reviewed version after tests exposed the draft's bugs.
/**
 * Convert a title into a URL slug.
 * slugify("Karachi Bakes – Fresh Cakes!") -> "karachi-bakes-fresh-cakes"
 * @param {string} text
 * @returns {string}
 */
function slugify(text) {
  if (typeof text !== 'string') throw new TypeError('slugify expects a string');
  return text
    .normalize('NFKD').replace(/[\u0300-\u036f]/g, '')   // é -> e
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')                          // any run of other characters -> one hyphen
    .replace(/^-+|-+$/g, '');                             // no leading/trailing hyphens
}
module.exports = slugify;
