# 📝 Practice Test · Bootstrap & jQuery for Responsive Web Pages

> [Prime AI – Software Engineering with AI](../../README.md) › [Term 1](../README.md) › [Bootstrap & jQuery for Responsive Web Pages](README.md) › **Practice test**

**Format:** Part A has 20 multiple-choice questions (1 mark each). Part B has 3 practical questions (10 marks each). Suggested time: 60 minutes. Attempt everything first, then open the answers.

## Part A — Multiple-choice questions

**1. How many columns does the Bootstrap grid have per row?**

- A) 6
- B) 10
- C) 12
- D) 16

<details><summary>Answer</summary>

**C** — 12 divides evenly by 1, 2, 3, 4, 6 and 12.

</details>

**2. `.col-md-4` means the element is:**

- A) 4 px wide on medium screens
- B) 4 of 12 columns wide from 768 px up, full width below
- C) Always one third wide
- D) Hidden on medium screens

<details><summary>Answer</summary>

**B** — Classes apply from their breakpoint up; below md the column stacks at 100%.

</details>

**3. Which file must you include for Bootstrap dropdowns and tooltips to work?**

- A) bootstrap.min.css only
- B) bootstrap.bundle.min.js (includes Popper)
- C) jquery.min.js
- D) popper.css

<details><summary>Answer</summary>

**B** — The bundle contains Popper, which positions dropdowns, tooltips and popovers.

</details>

**4. Which container is 100% wide on all screens?**

- A) `.container`
- B) `.container-lg`
- C) `.container-fluid`
- D) `.container-xl`

<details><summary>Answer</summary>

**C** — container-fluid never applies a max-width.

</details>

**5. Which class reorders a column to appear first only from the md breakpoint?**

- A) `.order-1`
- B) `.order-md-first`
- C) `.first-md`
- D) `.col-md-first`

<details><summary>Answer</summary>

**B** — order-{breakpoint}-first / order-{breakpoint}-{n}.

</details>

**6. Which attribute pair opens a Bootstrap modal without writing JavaScript?**

- A) `onclick="modal()"`
- B) `data-bs-toggle="modal" data-bs-target="#id"`
- C) `href="modal"`
- D) `data-open="#id"`

<details><summary>Answer</summary>

**B** — Bootstrap 5 uses data-bs-* attributes.

</details>

**7. `mt-3` adds:**

- A) margin-top: 3px
- B) margin-top: 1rem
- C) margin-top: 3rem
- D) padding-top: 1rem

<details><summary>Answer</summary>

**B** — The spacing scale is 0, .25, .5, 1, 1.5, 3 rem for 0–5.

</details>

**8. `d-none d-lg-block` makes an element:**

- A) Visible only on small screens
- B) Hidden below 992 px, visible from lg up
- C) Always hidden
- D) Hidden on lg only

<details><summary>Answer</summary>

**B** — Mobile-first: d-none applies everywhere until d-lg-block overrides it.

</details>

**9. Which jQuery line runs code when the DOM is ready?**

- A) `$(window).ready()`
- B) `$(function(){ … })`
- C) `jQuery.start()`
- D) `document.jquery()`

<details><summary>Answer</summary>

**B** — $(fn) is the short form of $(document).ready(fn).

</details>

**10. `$(".item:even")` selects:**

- A) Items with even text
- B) Items at index 0, 2, 4 …
- C) Items at index 1, 3, 5 …
- D) Nothing – invalid

<details><summary>Answer</summary>

**B** — jQuery filters are zero-based.

</details>

**11. Event delegation in jQuery is written as:**

- A) `$("li").click(fn)`
- B) `$("#list").on("click", "li", fn)`
- C) `$("li").delegate()` only
- D) `$(document).li(fn)`

<details><summary>Answer</summary>

**B** — The handler lives on the parent and works for children added later.

</details>

**12. Inside a jQuery event handler, `$(this)` refers to:**

- A) The window
- B) The element that the handler is running for
- C) The jQuery library
- D) The first element on the page

<details><summary>Answer</summary>

**B** — Wrap this in $() to use jQuery methods on it.

</details>

**13. Which method gets/sets the value of a form input?**

- A) `.text()`
- B) `.html()`
- C) `.val()`
- D) `.attr("text")`

<details><summary>Answer</summary>

**C** — val() works with input, select and textarea.

</details>

**14. `.slideToggle()` changes an element's:**

- A) Opacity
- B) Height
- C) Colour
- D) Position

<details><summary>Answer</summary>

**B** — Slide effects animate height; fades animate opacity.

</details>

**15. Which method inserts content as the LAST child of the selected element?**

- A) `.prepend()`
- B) `.after()`
- C) `.append()`
- D) `.before()`

<details><summary>Answer</summary>

**C** — append = last child; after = next sibling.

</details>

**16. `.closest(".card")` searches:**

- A) Down through children
- B) Up through ancestors, starting with the element itself
- C) Sideways through siblings
- D) The whole document

<details><summary>Answer</summary>

**B** — closest walks upward and returns the first match.

</details>

**17. A jQuery plugin is added by assigning a function to:**

- A) `$.plugin`
- B) `$.fn`
- C) `window.plugin`
- D) `jQuery.ui`

<details><summary>Answer</summary>

**B** — $.fn is jQuery's prototype, so every jQuery object gets the method.

</details>

**18. Which statement about Bootstrap 5 and jQuery is TRUE?**

- A) Bootstrap 5 requires jQuery
- B) Bootstrap 5 dropped the jQuery dependency but can expose a jQuery interface if jQuery is present
- C) They cannot be used together
- D) jQuery replaces Bootstrap CSS

<details><summary>Answer</summary>

**B** — Bootstrap 5 is written in plain JavaScript.

</details>

**19. Which class adds red error styling to a Bootstrap input?**

- A) `.error`
- B) `.is-invalid`
- C) `.text-danger` only
- D) `.invalid`

<details><summary>Answer</summary>

**B** — Pair it with a .invalid-feedback element.

</details>

**20. What does the `integrity` attribute on a CDN `<script>` do?**

- A) Speeds up downloading
- B) Lets the browser verify the file has not been tampered with
- C) Minifies the file
- D) Makes the script load last

<details><summary>Answer</summary>

**B** — Subresource Integrity compares a hash of the downloaded file.

</details>

## Part B — Practical / coding questions

### P1. **Responsive product grid.** Write the HTML for a Bootstrap page with a navbar that collapses on phones and a product section where cards show **1 per row on phones, 2 on tablets (md) and 4 on large screens (lg)**, with a 1.5 rem gap. Each card has an image, title, price badge and "Add to cart" button.

<details><summary>Model solution</summary>

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Shop</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
  <nav class="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
    <div class="container">
      <a class="navbar-brand" href="#">ShopKhi</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#nav"
              aria-controls="nav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="nav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item"><a class="nav-link active" aria-current="page" href="#">Home</a></li>
          <li class="nav-item"><a class="nav-link" href="#products">Products</a></li>
        </ul>
      </div>
    </div>
  </nav>
  <main class="container py-4" id="products">
    <div class="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
      <div class="col">
        <div class="card h-100">
          <img src="https://picsum.photos/seed/p1/400/300" class="card-img-top" alt="Leather wallet">
          <div class="card-body d-flex flex-column">
            <h2 class="card-title h5">Leather wallet</h2>
            <span class="badge text-bg-success align-self-start mb-3">Rs 2,499</span>
            <button class="btn btn-primary mt-auto">Add to cart</button>
          </div>
        </div>
      </div>
      <!-- three more .col cards -->
    </div>
  </main>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
```
Marks: correct includes + viewport (2), collapsing navbar with toggler (3), `row-cols-*` with g-4 (3), card structure (2).

</details>

### P2. **jQuery live search.** A page has `<input id="search">` and a `<ul id="students">` with 20 `<li>` names. Write the jQuery so that, while the user types, only names containing the typed text (case-insensitive) stay visible, and a `<p id="count">` shows "N match(es)".

<details><summary>Model solution</summary>

```js
$(function () {
  $('#search').on('input', function () {
    const term = $(this).val().trim().toLowerCase();
    let shown = 0;
    $('#students li').each(function () {
      const match = $(this).text().toLowerCase().includes(term);
      $(this).toggle(match);          // toggle(true) shows, toggle(false) hides
      if (match) shown++;
    });
    $('#count').text(`${shown} match(es)`);
  });
});
```
Marks: ready wrapper (1), input event (2), reading/normalising value (2), each + toggle(boolean) (3), counter (2).

</details>

### P3. **Validation with Bootstrap feedback.** Using jQuery, validate a sign-up form (`#name`, `#email`, `#password`) on submit: name required, email must match a simple pattern, password ≥ 8 characters. Invalid fields get `.is-invalid`, valid ones `.is-valid`; the form only "submits" (show a success alert) when all three pass.

<details><summary>Model solution</summary>

```js
$(function () {
  const rules = {
    name: v => v.length > 0,
    email: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
    password: v => v.length >= 8
  };
  $('#signup').on('submit', function (e) {
    e.preventDefault();                       // stop the real submit while we check
    let ok = true;
    $.each(rules, function (id, test) {
      const $f = $('#' + id);
      const valid = test($f.val().trim());
      $f.toggleClass('is-valid', valid).toggleClass('is-invalid', !valid);
      if (!valid) ok = false;
    });
    if (ok) {
      $('#result').removeClass('d-none').text('Account created!');
      this.reset();
      $(this).find('.is-valid').removeClass('is-valid');
    }
  });
});
```
Marks: preventDefault (2), rule table/tests correct (3), toggleClass with boolean (3), success path (2).

</details>

## 🧮 Score yourself

| Score (out of 50) | What it means |
|---|---|
| 45–50 | Excellent — move on to the next module. |
| 35–44 | Good — revise the sessions where you lost marks. |
| below 35 | Re-read the module cheat-sheet and redo the 🟡 labs before retrying. |

---

[⬅ Back to module overview](README.md)

<sub>Prepared by **Hamna Zahid Khan**, Junior Lecturer · Prime AI – Software Engineering with AI</sub>
