// session-04_gradebook.js – behaviour for session-04_gradebook.html
$(function () {
  const $tbody = $('#grades tbody');

  // Build one row. Marks live in data-marks so we never parse visible text.
  function makeRow(name, marks) {
    const $tr = $('<tr>').data('marks', marks);
    $('<td class="name">').text(name).appendTo($tr);
    $('<td class="marks">').text(marks).appendTo($tr);
    $('<td>').append('<span class="badge"></span>').appendTo($tr);
    $('<td class="text-end">')
      .append('<button class="btn btn-sm btn-outline-primary edit">Edit marks</button> ')
      .append('<button class="btn btn-sm btn-outline-danger del">Delete</button>')
      .appendTo($tr);
    return $tr;
  }

  function validMarks(v) { return v !== '' && !isNaN(v) && v >= 0 && v <= 100; }

  function refresh() {
    const marks = $tbody.find('tr').map((i, tr) => $(tr).data('marks')).get();
    $tbody.find('tr').each(function () {
      const m = $(this).data('marks');
      $(this).toggleClass('table-danger', m < 50)
             .find('.badge').text(m < 50 ? 'Fail' : m >= 85 ? 'Distinction' : 'Pass')
             .attr('class', 'badge ' + (m < 50 ? 'text-bg-danger' : m >= 85 ? 'text-bg-success' : 'text-bg-secondary'));
    });
    const avg = marks.length ? marks.reduce((a, b) => a + b, 0) / marks.length : 0;
    $('#avg').text(avg.toFixed(1));
    $('#max').text(marks.length ? Math.max(...marks) : '–');
    $('#rate').text(marks.length ? Math.round(marks.filter(m => m >= 50).length / marks.length * 100) + '%' : '–');
    applyFilter();
  }

  function applyFilter() {
    const failOnly = $('#failOnly').prop('checked');
    $tbody.find('tr').each(function () {
      const pass = $(this).data('marks') >= 50;
      if (failOnly && pass) $(this).slideUp(200); else $(this).slideDown(200);
    });
  }

  $('#add-form').on('submit', function (e) {
    e.preventDefault();
    const name = $('#name').val().trim();
    const marksText = $('#marks').val().trim();
    $('#name').toggleClass('is-invalid', name === '');
    $('#marks').toggleClass('is-invalid', !validMarks(marksText));
    if (name === '' || !validMarks(marksText)) return;
    $tbody.append(makeRow(name, Number(marksText)));
    this.reset();
    refresh();
  });

  // Edit: swap the marks cell for an input; save on Enter
  $tbody.on('click', '.edit', function () {
    const $tr = $(this).closest('tr');
    const $cell = $tr.find('.marks');
    const $input = $('<input type="number" class="form-control form-control-sm" style="width:90px">').val($tr.data('marks'));
    $cell.empty().append($input);
    $input.trigger('focus');
  });
  $tbody.on('keydown', '.marks input', function (e) {
    if (e.key !== 'Enter') return;
    const v = $(this).val();
    if (!validMarks(v)) { $(this).addClass('is-invalid'); return; }
    const $tr = $(this).closest('tr');
    $tr.data('marks', Number(v)).find('.marks').text(v);
    refresh();
  });

  $tbody.on('click', '.del', function () {
    $(this).closest('tr').remove();
    refresh();
  });

  $('#failOnly').on('change', applyFilter);

  // Seed with a few students so the page is not empty
  [['Ali Raza', 72], ['Sana Javed', 41], ['Hassan Mirza', 88]].forEach(([n, m]) => $tbody.append(makeRow(n, m)));
  refresh();
});
