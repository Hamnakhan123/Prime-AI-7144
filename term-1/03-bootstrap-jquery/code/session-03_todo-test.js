// session-03_todo-test.js  (run: node session-03_todo-test.js)
const { loadPage, shown } = require('./test-helper');

(async () => {
  const w = await loadPage('session-03_todo.html');
  const $ = w.jQuery;
  const show = step => console.log(`${step.padEnd(32)} items=[${$('#todo-list li').map((i, li) =>
    ($(li).hasClass('done') ? '✔ ' : '') + $(li).find('.label').text()).get().join(', ')}]  ${$('#count').text()}  emptyMsg=${shown(w, $('#empty')[0])}`);

  show('Start');
  $('#task').val('Buy printer paper'); $('#add').trigger('click');
  show('Add by clicking');
  $('#task').val('Mark lab reports');
  $('#task').trigger($.Event('keydown', { key: 'Enter' }));
  show('Add by pressing Enter');
  $('#task').val('<b>Email HOD</b>'); $('#add').trigger('click');
  show('Add text containing HTML');
  $('#todo-list li').eq(0).find('.label').trigger('click');
  show('Click first task (done)');
  $('#todo-list li').eq(1).find('.delete').trigger('click');
  show('Delete second task');
  $('#task').val('   '); $('#add').trigger('click');
  console.log(`${'Add empty task'.padEnd(32)} input has is-invalid: ${$('#task').hasClass('is-invalid')}`);
  console.log('HTML inside the 2nd label is escaped:', $('#todo-list li').eq(1).find('.label').html());
})();
