// session-04_gradebook-test.js  (run: node session-04_gradebook-test.js)
const { loadPage, shown } = require('./test-helper');

(async () => {
  const w = await loadPage('session-04_gradebook.html');
  const $ = w.jQuery;
  const table = () => $('#grades tbody tr').map((i, tr) =>
    `${$(tr).find('.name').text()}=${$(tr).data('marks')}(${$(tr).find('.badge').text()}${shown(w, tr) ? '' : ',hidden'})`).get().join(' ');
  const stats = () => `avg=${$('#avg').text()} max=${$('#max').text()} pass=${$('#rate').text()}`;
  const show = step => console.log(`${step.padEnd(24)} ${stats().padEnd(28)} ${table()}`);

  show('Seeded');
  $('#name').val('Nida Khan'); $('#marks').val('120'); $('#add-form').trigger('submit');
  console.log(`${'Add marks=120'.padEnd(24)} rejected: marks is-invalid=${$('#marks').hasClass('is-invalid')}`);
  $('#marks').val('49'); $('#add-form').trigger('submit');
  show('Add Nida 49');
  const $sana = $('#grades tbody tr').filter((i, tr) => $(tr).find('.name').text() === 'Sana Javed');
  $sana.find('.edit').trigger('click');
  $sana.find('.marks input').val('63').trigger($.Event('keydown', { key: 'Enter' }));
  show('Edit Sana -> 63');
  $('#failOnly').prop('checked', true).trigger('change');
  show('Failing only ON');
  $('#grades tbody tr').first().find('.del').trigger('click');
  show('Delete first row');
})();
