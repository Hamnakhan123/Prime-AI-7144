// js/main.js – shared behaviour for every page (jQuery 3.7 + Bootstrap 5.3).
// Each block only runs if its elements exist on the current page.
$(function () {
  const items = window.ITEMS || [];
  const formatPrice = n => 'Rs ' + n.toLocaleString('en-US');

  /* ---------- 1. Footer year ---------- */
  $('#year').text(new Date().getFullYear());

  /* ---------- 2. Favourites saved in localStorage ---------- */
  const store = window.localStorage;
  const getFavs = () => JSON.parse(store?.getItem('favs') || '[]');
  const setFavs = f => store?.setItem('favs', JSON.stringify(f));

  /* ---------- 3. Render item cards (used on home + catalogue) ---------- */
  function card(item) {
    const fav = getFavs().includes(item.id);
    return `
      <div class="col-12 col-sm-6 col-lg-4">
        <article class="card h-100 shadow-sm">
          <img src="${item.image}" class="card-img-top" alt="${item.name}" width="800" height="500" loading="lazy">
          <div class="card-body d-flex flex-column">
            <span class="badge text-bg-secondary align-self-start mb-2">${item.category}</span>
            <h3 class="h5 card-title">${item.name}</h3>
            <p class="card-text">${item.description}</p>
            <p class="fw-bold mt-auto">${formatPrice(item.price)}</p>
            <div class="d-flex gap-2">
              <button class="btn btn-sm btn-brand details" data-id="${item.id}" type="button">Details</button>
              <button class="btn btn-sm btn-outline-secondary fav-btn" data-id="${item.id}" type="button"
                      aria-pressed="${fav}" aria-label="Save ${item.name} to favourites">${fav ? '♥' : '♡'}</button>
            </div>
          </div>
        </article>
      </div>`;
  }
  $('#featured').html(items.slice(0, 3).map(card).join(''));

  /* ---------- 4. Catalogue: category buttons + live search ---------- */
  if ($('#catalogue').length) {
    const categories = ['All', ...new Set(items.map(i => i.category))];
    $('#filters').html(categories.map((c, i) =>
      `<button type="button" class="btn btn-outline-secondary${i === 0 ? ' active' : ''}" data-cat="${c}">${c}</button>`).join(''));
    let activeCat = 'All';
    function render() {
      const q = $('#search').val().trim().toLowerCase();
      const list = items.filter(i => (activeCat === 'All' || i.category === activeCat) && i.name.toLowerCase().includes(q));
      $('#catalogue').html(list.map(card).join(''));
      $('#resultCount').text(`${list.length} of ${items.length} items`);
      $('#noResults').toggleClass('d-none', list.length > 0);
    }
    $('#filters').on('click', 'button', function () {
      activeCat = $(this).data('cat');
      $(this).addClass('active').siblings().removeClass('active');
      render();
    });
    $('#search').on('input', render);
    render();
  }

  /* ---------- 5. Details modal + favourite toggle (event delegation) ---------- */
  $(document).on('click', '.details', function () {
    const item = items.find(i => i.id === $(this).data('id'));
    $('#itemModalTitle').text(item.name);
    $('#itemModalBody').html(`<p>${item.description}</p><p class="fw-bold">${formatPrice(item.price)}</p>`);
    if (window.bootstrap) bootstrap.Modal.getOrCreateInstance('#itemModal').show();
  });
  $(document).on('click', '.fav-btn', function () {
    const id = $(this).data('id');
    let favs = getFavs();
    favs = favs.includes(id) ? favs.filter(f => f !== id) : [...favs, id];
    setFavs(favs);
    const on = favs.includes(id);
    $(this).attr('aria-pressed', on).text(on ? '♥' : '♡');
  });

  /* ---------- 6. Count-up statistics when they scroll into view ---------- */
  let counted = false;
  function countUp() {
    const $c = $('.counter');
    if (counted || !$c.length) return;
    if ($(window).scrollTop() + $(window).height() < $c.first().offset().top) return;
    counted = true;
    $c.each(function () {
      const $el = $(this);
      $({ n: 0 }).animate({ n: +$el.data('target') }, { duration: 1200, step: n => $el.text(Math.round(n)) });
    });
  }

  /* ---------- 7. Contact form validation ---------- */
  const rules = {
    cName: v => v.trim().length >= 3,
    cEmail: v => /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(v.trim()),
    cPhone: v => v.trim() === '' || /^03\d{2}-?\d{7}$/.test(v.trim()),
    cMsg: v => v.trim().length >= 10,
  };
  function check($input) {
    const ok = rules[$input.attr('id')]($input.val());
    $input.toggleClass('is-invalid', !ok).toggleClass('is-valid', ok).attr('aria-invalid', !ok);
    return ok;
  }
  $('#contactForm').on('input blur', 'input, textarea', function () { check($(this)); });
  $('#cMsg').on('input', function () { $('#msgCount').text($(this).val().length); });
  $('#contactForm').on('submit', function (e) {
    e.preventDefault();
    const fields = Object.keys(rules).map(id => $('#' + id));
    const bad = fields.filter($f => !check($f));
    if (bad.length) { bad[0].trigger('focus'); return; }
    $('#formSuccess').text(`Thank you, ${$('#cName').val().trim()}! We will reply soon.`).removeClass('d-none');
    this.reset();
    $(this).find('.is-valid').removeClass('is-valid');
    $('#msgCount').text(0);
    // TODO (Milestone 4): optionally send the data to a form service such as Formspree.
  });

  /* ---------- 8. Dark mode remembered between visits ---------- */
  function applyTheme(t) {
    $('html').attr('data-bs-theme', t);
    $('#themeToggle').text(t === 'dark' ? '☀️' : '🌙');
  }
  applyTheme(store?.getItem('theme') || 'light');
  $('#themeToggle').on('click', function () {
    const next = $('html').attr('data-bs-theme') === 'dark' ? 'light' : 'dark';
    store?.setItem('theme', next);
    applyTheme(next);
  });

  /* ---------- 9. Back-to-top button ---------- */
  $(window).on('scroll', function () {
    $('#toTop').toggle($(this).scrollTop() > 400);
    countUp();
  });
  $('#toTop').on('click', () => $('html, body').animate({ scrollTop: 0 }, 400));
  countUp();
});
