// session-03_quiz-test.js  (run: node session-03_quiz-test.js)
const { loadPage } = require('./test-helper');

(async () => {
  const w = await loadPage('session-03_mini-project-quiz.html');
  const $ = w.jQuery;
  // Answer: q1 right, q2 right, q3 wrong, q4 right, q5 left blank
  $('[name=q1][value=b]').prop('checked', true);
  $('[name=q2][value=a]').prop('checked', true);
  $('[name=q3][value=a]').prop('checked', true);
  $('[name=q4][value=b]').prop('checked', true);
  $('#quiz').trigger('submit');
  $('#quiz .q').each(function (i) {
    const cls = ['border-success', 'border-danger', 'border-warning'].find(c => $(this).hasClass(c));
    console.log(`Q${i + 1}: ${cls}`);
  });
  console.log('Result :', $('#result').text(), '|', $('#result').attr('class'));
  console.log('Inputs disabled:', $('#quiz input:disabled').length, 'of', $('#quiz input').length);
  $('#retry').trigger('click');
  console.log('After Try again -> checked:', $('#quiz input:checked').length, '| result hidden:', $('#result').hasClass('d-none'));
})();
