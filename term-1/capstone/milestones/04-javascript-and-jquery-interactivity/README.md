# Milestone 4 · JavaScript and jQuery Interactivity

> [Capstone Project](../../README.md) › **Milestone 4** · Suggested timing: Week 4

**Goal:** the site behaves like a real product – data-driven, searchable, validated and memorable.

## Tasks – step by step

1. Render the catalogue and featured items from `js/data.js` (the starter does this – adapt the card markup to your brief).
2. Keep **live search + category filter** working with your data; add one more control (sort by price, or a price range).
3. Implement your **brief-specific feature** (e.g. order basket with total, fee calculator, trip cost estimator, wishlist page,
   appointment date validation).
4. Validate every form field with clear messages (`is-invalid`/`is-valid`, `aria-invalid`), focus the first error, show a
   success message.
5. Add at least **two effects/animations** with jQuery (`slideToggle`, `fadeIn`, `animate`, count-up…).
6. Use `localStorage` for at least one feature (favourites, basket, theme) and handle the empty state.
7. Keep JavaScript organised in commented sections; no errors in the browser console.
8. Extend `tools/behaviour-test.js` with a test for your brief-specific feature.

## Deliverable
All interactive features merged, `npm test` extended and passing.

## Acceptance checklist
- [ ] Search, filter and your extra control work together
- [ ] Brief-specific feature works and survives a page reload where appropriate
- [ ] Form validation covers every field; success message shown
- [ ] No console errors; `npm test` passes, including your new test

<details><summary>💡 Hint – sort by price in the starter's render()</summary>

```js
const sort = $('#sort').val();              // "low" or "high"
list.sort((a, b) => sort === 'low' ? a.price - b.price : b.price - a.price);
$('#sort').on('change', render);
```
</details>

<details><summary>💡 Hint – a basket total with localStorage</summary>

```js
const basket = JSON.parse(localStorage.getItem('basket') || '[]');
function addToBasket(id) {
  const line = basket.find(l => l.id === id);
  line ? line.qty++ : basket.push({ id, qty: 1 });
  localStorage.setItem('basket', JSON.stringify(basket));
  const total = basket.reduce((s, l) => s + ITEMS.find(i => i.id === l.id).price * l.qty, 0);
  $('#basketTotal').text('Rs ' + total.toLocaleString('en-US'));
}
```
</details>

---

[⬅ Milestone 4](../03-css3-and-bootstrap-responsive-design/README.md) · [Milestone 6 ➡](../05-seo-accessibility-and-deployment/README.md)

<sub>Prepared by **Hamna Zahid Khan**, Junior Lecturer</sub>
