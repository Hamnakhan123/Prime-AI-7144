// session-04_effects-test.js  (run: node session-04_effects-test.js)
// Animations are left ON (fxOff:false) so we can observe the real queue timing.
const { loadPage } = require('./test-helper');

(async () => {
  const w = await loadPage('session-04_effects.html', { fxOff: false });
  const $ = w.jQuery;
  const t0 = Date.now();
  const at = () => `~${Math.round((Date.now() - t0) / 100) * 100} ms`;

  $('#chain').trigger('click');                   // fadeOut 300 → delay 200 → fadeIn 300
  console.log(`[${at()}] clicked "chain"; queue length now: ${$('#box').queue('fx').length}`);
  await new Promise(r => setTimeout(r, 1000));
  $('#log li').each((i, li) => console.log(`  log ${i + 1}: ${$(li).text()}`));
  console.log(`[${at()}] box opacity=${$('#box').css('opacity')} display=${$('#box').css('display')}`);

  $('#move').trigger('click');                    // animate left +=150, width 160, opacity .6 over 800ms
  await new Promise(r => setTimeout(r, 400));
  console.log(`[${at()}] halfway: left=${parseInt($('#box').css('left'))}px (still moving)`);
  $('#stop').trigger('click');                    // stop(true) freezes it where it is
  const frozen = parseInt($('#box').css('left'));
  await new Promise(r => setTimeout(r, 600));
  console.log(`[${at()}] after stop(true): left=${parseInt($('#box').css('left'))}px (was ${frozen}px when stopped) – no further movement`);
  process.exit(0);
})();
