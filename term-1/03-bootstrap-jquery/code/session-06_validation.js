// session-06_validation.js – real-time validation for session-06_validation.html
$(function () {
  const $form = $('#register');

  // One place for every rule: [test function, error message]
  const rules = {
    fullName: [v => v.trim().length >= 3, 'Please enter your full name (at least 3 letters).'],
    email: [v => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()), 'Enter a valid email such as name@example.com.'],
    phone: [v => /^03\d{2}-?\d{7}$/.test(v.trim()), 'Use a Pakistani mobile number like 0300-1234567.'],
    password: [v => v.length >= 8 && /\d/.test(v) && /[A-Za-z]/.test(v), 'At least 8 characters with letters and a number.'],
    confirm: [v => v === $('#password').val() && v !== '', 'Passwords do not match.'],
    programme: [v => v !== '', 'Please choose a programme.'],
    terms: [(v, el) => el.checked, 'You must accept the terms.'],
  };

  // Validate one field; returns true/false and updates the UI
  function check(el) {
    const rule = rules[el.id];
    if (!rule) return true;
    const [test, message] = rule;
    const ok = test($(el).val() ?? '', el);
    $(el).toggleClass('is-valid', ok)
         .toggleClass('is-invalid', !ok)
         .attr('aria-invalid', String(!ok));
    $('#' + el.id + 'Error').text(ok ? '' : message);
    return ok;
  }

  // Leaving a field marks it "touched" and validates it
  $form.on('blur change', 'input, select', function () {
    $(this).data('touched', true);
    check(this);
    if (this.id === 'password' && $('#confirm').data('touched')) check($('#confirm')[0]);
  });

  // Typing re-validates only fields the user has already visited
  $form.on('input', 'input', function () {
    if ($(this).data('touched')) check(this);
  });

  // Password strength meter (a small extra)
  $('#password').on('input', function () {
    const v = $(this).val();
    const score = [v.length >= 8, /\d/.test(v), /[A-Z]/.test(v), /[^A-Za-z0-9]/.test(v)].filter(Boolean).length;
    $('#strength').css('width', score * 25 + '%')
                  .attr('aria-valuenow', score * 25)
                  .removeClass('bg-danger bg-warning bg-success')
                  .addClass(score <= 1 ? 'bg-danger' : score <= 3 ? 'bg-warning' : 'bg-success');
  });

  // Submit: validate everything, focus the first problem
  $form.on('submit', function (e) {
    e.preventDefault();
    const fields = $form.find('input, select').get();
    const results = fields.map(el => { $(el).data('touched', true); return check(el); });
    if (results.every(Boolean)) {
      $('#success').removeClass('d-none').text(`Welcome, ${$('#fullName').val().trim()}! Your account has been created.`);
      $form.addClass('d-none');
    } else {
      $form.find('.is-invalid').first().trigger('focus');
    }
  });
});
