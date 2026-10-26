// session-05_slugify-ai-draft.js – the kind of first draft an assistant might suggest.
// Looks reasonable... but run the tests.
function slugify(text) {
  return text.toLowerCase().replace(/ /g, '-').replace(/[^a-z0-9-]/g, '');
}
module.exports = slugify;
