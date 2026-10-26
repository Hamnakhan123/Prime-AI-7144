// session-04_gallery-test.js  (run: node session-04_gallery-test.js)
// jQuery UI is not loaded in the test, so the page's "if ($.fn.dialog)" guards skip the dialog itself –
// we test the filtering and traversal logic that drives it.
const { loadPage, shown } = require('./test-helper');

(async () => {
  const w = await loadPage('session-04_mini-project-gallery.html');
  const $ = w.jQuery;
  const visible = () => $('#grid .item').filter((i, el) => shown(w, el)).length;

  console.log('All items visible     :', visible());
  $('#cats [data-cat="mobile"]').trigger('click');
  console.log('After "Mobile" filter :', visible(), '->', $('#grid .item').filter((i, el) => shown(w, el)).find('img').map((i, im) => im.alt).get().join(', '));
  $('#grid .item[data-cat="mobile"] .thumb').first().trigger('click');
  console.log('Opened                :', $('#lightbox .caption').text(), '|', $('#lightbox img').attr('src'));
  w.galleryStep(1);  console.log('Next                  :', $('#lightbox .caption').text());
  w.galleryStep(1);  console.log('Next                  :', $('#lightbox .caption').text());
  w.galleryStep(1);  console.log('Next (wraps around)   :', $('#lightbox .caption').text());
  w.galleryStep(-1); console.log('Previous (wraps back) :', $('#lightbox .caption').text());
})();
