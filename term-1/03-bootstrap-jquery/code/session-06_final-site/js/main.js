// main.js – Indus Logistics behaviour (jQuery 3.7 + Bootstrap 5.3)
$(function () {
  'use strict';
  const reduceMotion = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) $.fx.off = true;

  /* ---------- 1. Service details: delegated slideToggle ---------- */
  $('#services').on('click', '.toggle-details', function () {
    const $btn = $(this);
    const $details = $btn.siblings('.details');
    const opening = $btn.attr('aria-expanded') !== 'true';   // the button's ARIA state is our source of truth
    $details.stop(true).slideToggle(250);
    $btn.text(opening ? 'Hide details' : 'Details').attr('aria-expanded', String(opening));
  });

  /* ---------- 2. Count-up statistics, once, when visible ---------- */
  let counted = false;
  function runCounters() {
    $('.counter').each(function () {
      const $c = $(this);
      const target = Number($c.data('target'));
      $({ n: 0 }).animate({ n: target }, {
        duration: 1500,
        step: now => $c.text(Math.floor(now).toLocaleString('en-US')),
        complete: () => $c.text(target.toLocaleString('en-US')),
      });
    });
  }
  function onScroll() {
    const y = $(window).scrollTop();
    $('#toTop').toggle(y > 400);
    if (!counted && y + $(window).height() > $('#stats').offset().top + 80) {
      counted = true;
      runCounters();
    }
  }
  $(window).on('scroll', onScroll);
  window.runCounters = () => { counted = true; runCounters(); };   // exposed for testing

  /* ---------- 3. Smooth scrolling for in-page links ---------- */
  $('a[href^="#"]').not('[data-bs-toggle]').on('click', function (e) {
    const id = $(this).attr('href');
    if (id.length < 2 || !$(id).length) return;
    e.preventDefault();
    $('html, body').stop().animate({ scrollTop: $(id).offset().top - 70 }, 500);
    const nav = document.getElementById('navLinks');
    if (window.bootstrap && nav.classList.contains('show')) bootstrap.Collapse.getOrCreateInstance(nav).hide();  // close mobile menu
  });
  $('#toTop').on('click', () => $('html, body').animate({ scrollTop: 0 }, 400));

  /* ---------- 4. Parcel tracking (demo data instead of a server) ---------- */
  const PARCELS = {
    'IL-204518': { status: 'Out for delivery', where: 'Gulshan-e-Iqbal hub', step: 3 },
    'IL-117730': { status: 'Delivered', where: 'Signed by: R. Ahmed', step: 4 },
    'IL-560021': { status: 'In transit', where: 'Hyderabad → Karachi', step: 2 },
  };
  const STEPS = ['Booked', 'In transit', 'Out for delivery', 'Delivered'];

  $('#trackForm').on('submit', function (e) {
    e.preventDefault();
    const code = $('#trackNo').val().trim().toUpperCase();
    const valid = /^IL-\d{6}$/.test(code);
    $('#trackNo').toggleClass('is-invalid', !valid).attr('aria-invalid', String(!valid));
    const $out = $('#trackResult').empty();
    if (!valid) return;

    const p = PARCELS[code];
    if (!p) {
      $('<div class="alert alert-warning">').text(`No parcel found for ${code}. Check the number on your receipt.`).appendTo($out);
      return;
    }
    const $card = $('<div class="card card-body">');
    $('<h3 class="h5">').text(`${code}: ${p.status}`).appendTo($card);
    $('<p class="mb-2 text-body-secondary">').text(p.where).appendTo($card);
    const pct = (p.step / STEPS.length) * 100;
    $('<div class="progress" role="progressbar" aria-label="Delivery progress">')
      .attr({ 'aria-valuenow': pct, 'aria-valuemin': 0, 'aria-valuemax': 100 })
      .append($('<div class="progress-bar bg-success">').css('width', pct + '%').text(STEPS[p.step - 1]))
      .appendTo($card);
    $card.hide().appendTo($out).fadeIn(300);
  });

  /* ---------- 5. Contact form: real-time validation ---------- */
  const rules = {
    cName: [v => v.trim().length >= 3, 'Please enter your name.'],
    cEmail: [v => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()), 'Please enter a valid email address.'],
    cMsg: [v => v.trim().length >= 20, 'Please write at least 20 characters.'],
  };
  function check(el) {
    const [test, msg] = rules[el.id];
    const ok = test($(el).val());
    $(el).toggleClass('is-valid', ok).toggleClass('is-invalid', !ok).attr('aria-invalid', String(!ok));
    $('#' + el.id + 'Error').text(ok ? '' : msg);
    return ok;
  }
  $('#contactForm').on('blur', 'input, textarea', function () { $(this).data('touched', true); check(this); })
                   .on('input', 'input, textarea', function () { if ($(this).data('touched')) check(this); })
                   .on('submit', function (e) {
                     e.preventDefault();
                     const ok = $(this).find('input, textarea').get().map(check).every(Boolean);
                     if (!ok) { $(this).find('.is-invalid').first().trigger('focus'); return; }
                     $('#contactSuccess').removeClass('d-none').text(`Thank you, ${$('#cName').val().trim()}! We will reply within one working day.`);
                     this.reset();
                     $(this).find('.is-valid').removeClass('is-valid');
                   });

  /* ---------- 6. Quote modal: live price ---------- */
  function quote() {
    const base = Number($('#qCity').val());
    const kg = Math.max(0.5, Number($('#qWeight').val()) || 0.5);
    const price = base + Math.ceil(Math.max(0, kg - 1)) * 100;
    $('#quoteAmount').text('Rs ' + price.toLocaleString('en-US'));
    return price;
  }
  $('#qCity, #qWeight').on('input change', quote);
  $('#quoteModal').on('shown.bs.modal', () => $('#qWeight').trigger('focus'));
  window.quote = quote;

  /* ---------- 7. Dark-mode toggle (remembered in localStorage) ---------- */
  function setTheme(theme) {
    $('html').attr('data-bs-theme', theme);
    $('#themeToggle').text(theme === 'dark' ? '☀️' : '🌙').attr('aria-pressed', String(theme === 'dark'));
    try { localStorage.setItem('theme', theme); } catch (err) { /* storage may be blocked */ }
  }
  let saved = 'light';
  try { saved = localStorage.getItem('theme') || 'light'; } catch (err) { /* ignore */ }
  setTheme(saved);
  $('#themeToggle').on('click', () => setTheme($('html').attr('data-bs-theme') === 'dark' ? 'light' : 'dark'));
});
