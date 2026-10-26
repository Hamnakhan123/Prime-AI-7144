// session-03_jquery-vs-vanilla.js – compare jQuery with plain DOM code (run: node session-03_jquery-vs-vanilla.js)
const { JSDOM } = require('jsdom');
const html = `<ul id="menu">
  <li class="item">Home</li><li class="item">Courses</li><li class="item">Contact</li>
</ul><p id="out"></p>`;

// ---------- Version A: jQuery ----------
{
  const window = new JSDOM(html).window;
  const $ = require('jquery')(window);                // jQuery bound to this simulated window

  $('.item').addClass('nav-link').attr('role', 'menuitem');            // implicit iteration
  $('.item:last').css('font-weight', 'bold');                          // jQuery-only filter
  $('#menu').on('click', '.item', function () { $('#out').text('Opened ' + $(this).text()); });
  $('.item').eq(1).trigger('click');

  console.log('jQuery  :', $('#menu').html().replace(/\s+/g, ' ').trim());
  console.log('jQuery  :', $('#out').text());
}

// ---------- Version B: vanilla JavaScript ----------
{
  const { document } = new JSDOM(html).window;
  const items = document.querySelectorAll('.item');
  items.forEach(li => { li.classList.add('nav-link'); li.setAttribute('role', 'menuitem'); });
  items[items.length - 1].style.fontWeight = 'bold';
  document.querySelector('#menu').addEventListener('click', e => {
    const li = e.target.closest('.item');                              // manual delegation
    if (li) document.querySelector('#out').textContent = 'Opened ' + li.textContent;
  });
  items[1].click();

  console.log('vanilla :', document.querySelector('#menu').innerHTML.replace(/\s+/g, ' ').trim());
  console.log('vanilla :', document.querySelector('#out').textContent);
}
