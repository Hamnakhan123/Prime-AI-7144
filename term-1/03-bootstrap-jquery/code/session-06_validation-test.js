// session-06_validation-test.js  (run: node session-06_validation-test.js)
const { loadPage } = require('./test-helper');

(async () => {
  const w = await loadPage('session-06_validation.html');
  const $ = w.jQuery;
  const state = () => ['fullName', 'email', 'phone', 'password', 'confirm', 'programme', 'terms']
    .map(id => `${id}:${$('#' + id).hasClass('is-valid') ? 'ok' : $('#' + id).hasClass('is-invalid') ? 'ERR' : '-'}`).join(' ');
  const fill = (id, v) => $('#' + id).val(v).trigger('input').trigger('blur');

  $('#register').trigger('submit');
  console.log('1. Submit empty      ', state());
  console.log('   focused field     ', w.document.activeElement.id, '|', $('#fullNameError').text());
  fill('fullName', 'Areeba Zafar');
  fill('email', 'areeba@uni');
  fill('phone', '0321-7654321');
  console.log('2. Name/email/phone  ', state(), '|', $('#emailError').text());
  fill('email', 'areeba@uni.edu.pk');
  fill('password', 'Karachi2026');
  fill('confirm', 'Karachi2025');
  console.log('3. Mismatch          ', state(), '|', $('#confirmError').text());
  console.log('   strength bar      ', $('#strength').css('width'), $('#strength').attr('class'));
  fill('confirm', 'Karachi2026');
  $('#programme').val('BSSE').trigger('change');
  $('#terms').prop('checked', true).trigger('change');
  console.log('4. All fixed         ', state());
  $('#register').trigger('submit');
  console.log('5. Submit            ', $('#success').text(), '| form hidden:', $('#register').hasClass('d-none'));
})();
