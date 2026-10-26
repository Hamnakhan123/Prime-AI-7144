// session-03_todo.js – behaviour for session-03_todo.html
$(function () {
  const $input = $('#task');
  const $list = $('#todo-list');

  // Update the "N left" counter and the empty-state message
  function refresh() {
    const left = $list.children('li').not('.done').length;
    $('#count').text(`${left} task(s) left`);
    $('#empty').toggle($list.children().length === 0);   // toggle(boolean): show if true, hide if false
  }

  // Create one <li> safely: .text() never interprets HTML, so "<b>" is shown literally
  function addTask(text) {
    const $li = $('<li class="list-group-item d-flex justify-content-between align-items-center"></li>');
    $('<span class="label"></span>').text(text).appendTo($li);
    $('<button class="btn btn-sm btn-outline-danger delete" aria-label="Delete task">✕</button>').appendTo($li);
    $list.append($li);
  }

  // 1. Click on the Add button
  $('#add').on('click', function () {
    const text = $input.val().trim();
    if (text === '') {                       // validation
      $input.addClass('is-invalid');
      return;
    }
    $input.removeClass('is-invalid').val('').trigger('focus');
    addTask(text);
    refresh();
  });

  // 2. Pressing Enter in the input does the same as clicking Add
  $input.on('keydown', function (e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      $('#add').trigger('click');            // re-use the click handler
    }
  });

  // 3. DELEGATED: click a task's text to mark it done (works for future <li>s)
  $list.on('click', '.label', function () {
    $(this).closest('li').toggleClass('done text-decoration-line-through text-body-secondary');
    refresh();
  });

  // 4. DELEGATED: delete button. stopPropagation so the click doesn't also toggle "done"
  $list.on('click', '.delete', function (e) {
    e.stopPropagation();
    $(this).closest('li').remove();
    refresh();
  });

  refresh();
});
