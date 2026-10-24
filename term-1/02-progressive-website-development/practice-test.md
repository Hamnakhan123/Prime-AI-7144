# 📝 Practice Test · Progressive Website Development

> [Prime AI – Software Engineering with AI](../../README.md) › [Term 1](../README.md) › [Progressive Website Development](README.md) › **Practice test**

**Format:** Part A has 20 multiple-choice questions (1 mark each). Part B has 3 practical questions (10 marks each). Suggested time: 60 minutes. Attempt everything first, then open the answers.

## Part A — Multiple-choice questions

**1. Which line must be the very first line of an HTML5 document?**

- A) `<html>`
- B) `<!DOCTYPE html>`
- C) `<head>`
- D) `<meta charset="UTF-8">`

<details><summary>Answer</summary>

**B** — The DOCTYPE tells the browser to use standards mode.

</details>

**2. Which of these is a standalone (void) element?**

- A) `<p>`
- B) `<div>`
- C) `<img>`
- D) `<span>`

<details><summary>Answer</summary>

**C** — Void elements such as img, br, hr, input and meta have no closing tag.

</details>

**3. A link to `about.html` in the same folder is an example of a:**

- A) Absolute URL
- B) Relative URL
- C) Anchor link
- D) mailto link

<details><summary>Answer</summary>

**B** — It is resolved relative to the current page.

</details>

**4. Which semantic element should hold the main navigation links?**

- A) `<aside>`
- B) `<nav>`
- C) `<section>`
- D) `<footer>`

<details><summary>Answer</summary>

**B** — nav marks a block of major navigation links.

</details>

**5. `#menu .item a` has a specificity of:**

- A) (0,1,1,1)
- B) (0,0,2,1)
- C) (1,1,1,0)
- D) (0,1,0,2)

<details><summary>Answer</summary>

**A** — One id, one class and one element.

</details>

**6. With `box-sizing: border-box`, the `width` property includes:**

- A) Content only
- B) Content + padding + border
- C) Content + margin
- D) Everything including margin

<details><summary>Answer</summary>

**B** — Margin is always outside the declared width.

</details>

**7. An element with `position: absolute` is positioned relative to:**

- A) The viewport always
- B) Its nearest positioned ancestor
- C) The previous sibling
- D) The body margin

<details><summary>Answer</summary>

**B** — If no ancestor is positioned, the initial containing block is used.

</details>

**8. Which property places flex items along the main axis?**

- A) `align-items`
- B) `justify-content`
- C) `align-content`
- D) `flex-wrap`

<details><summary>Answer</summary>

**B** — justify-content works on the main axis; align-items on the cross axis.

</details>

**9. `grid-template-columns: repeat(3, 1fr)` creates:**

- A) 3 rows
- B) 3 equal columns
- C) 1 column 3 times wider
- D) A 3x3 grid always

<details><summary>Answer</summary>

**B** — fr shares the free space equally.

</details>

**10. Which unit equals 1% of the viewport width?**

- A) `em`
- B) `rem`
- C) `vw`
- D) `vmin`

<details><summary>Answer</summary>

**C** — vw = viewport width percentage.

</details>

**11. `@keyframes` is used with which property?**

- A) `transition`
- B) `animation`
- C) `transform`
- D) `filter`

<details><summary>Answer</summary>

**B** — animation names a keyframes rule and sets duration, timing and iterations.

</details>

**12. Which input attribute stops a form submitting while a field is empty?**

- A) `placeholder`
- B) `required`
- C) `value`
- D) `hidden`

<details><summary>Answer</summary>

**B** — required triggers built-in validation.

</details>

**13. Which attribute merges two table cells side by side?**

- A) `rowspan="2"`
- B) `colspan="2"`
- C) `merge="2"`
- D) `span="2"`

<details><summary>Answer</summary>

**B** — colspan spans columns; rowspan spans rows.

</details>

**14. `typeof null` in JavaScript returns:**

- A) "null"
- B) "undefined"
- C) "object"
- D) "number"

<details><summary>Answer</summary>

**C** — A long-standing quirk of the language.

</details>

**15. What does `[1, 2, 3].map(n => n * 2)` return?**

- A) 6
- B) [2, 4, 6]
- C) [1, 2, 3]
- D) undefined

<details><summary>Answer</summary>

**B** — map returns a new array of transformed values.

</details>

**16. `"5" === 5` evaluates to:**

- A) true
- B) false
- C) TypeError
- D) "55"

<details><summary>Answer</summary>

**B** — Strict equality compares type as well as value.

</details>

**17. In a class, `#balance` declares a:**

- A) Static method
- B) Private field
- C) Getter
- D) Global variable

<details><summary>Answer</summary>

**B** — ES2022 private class fields begin with #.

</details>

**18. Data in `localStorage`:**

- A) Is deleted when the tab closes
- B) Persists until removed and is stored as strings
- C) Is sent to the server with every request
- D) Can hold only numbers

<details><summary>Answer</summary>

**B** — Use JSON.stringify / JSON.parse for objects.

</details>

**19. The Geolocation API works only when:**

- A) The page is on HTTPS (or localhost) and the user grants permission
- B) The device has GPS hardware
- C) Cookies are enabled
- D) The page uses Canvas

<details><summary>Answer</summary>

**A** — It is a powerful feature gated by a secure context and permission.

</details>

**20. Which file makes a website installable as a PWA, together with a service worker?**

- A) `robots.txt`
- B) `manifest.webmanifest`
- C) `package.json`
- D) `sitemap.xml`

<details><summary>Answer</summary>

**B** — The manifest supplies name, icons, start URL and display mode.

</details>

## Part B — Practical / coding questions

### P1. **Semantic, responsive profile card page.** Build a page with a header (site name + nav with 3 links), a main area containing three profile cards (image, name, role, a "Contact" link) and a footer. Cards must sit in one column on phones and three columns from 768 px wide. Write the HTML and CSS.

<details><summary>Model solution</summary>

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Our Team</title>
  <link rel="stylesheet" href="team.css">
</head>
<body>
  <header class="site-header">
    <h1>Team Nova</h1>
    <nav><a href="#">Home</a> <a href="#team">Team</a> <a href="#contact">Contact</a></nav>
  </header>
  <main id="team" class="cards">
    <article class="card">
      <img src="ayesha.jpg" alt="Portrait of Ayesha" width="300" height="300">
      <h2>Ayesha Khan</h2><p>Front-end developer</p>
      <a href="mailto:ayesha@example.com">Contact</a>
    </article>
    <!-- two more article.card elements -->
  </main>
  <footer id="contact"><p>&copy; 2026 Team Nova</p></footer>
</body>
</html>
```

```css
*, *::before, *::after { box-sizing: border-box; }
body { margin: 0; font-family: system-ui, sans-serif; }
.site-header { display: flex; justify-content: space-between; align-items: center; padding: 1rem; background: #1e1b4b; color: #fff; }
.site-header a { color: #fff; margin-left: 1rem; }
.cards { display: grid; grid-template-columns: 1fr; gap: 1rem; padding: 1rem; }
.card img { width: 100%; height: auto; border-radius: 50%; }
.card { padding: 1rem; border: 1px solid #ddd; border-radius: 12px; text-align: center; }
@media (min-width: 768px) { .cards { grid-template-columns: repeat(3, 1fr); } }
```
Marks: valid skeleton with viewport meta (2), semantic tags (2), alt text (1), mobile-first grid + media query (3), tidy CSS (2).

</details>

### P2. **JavaScript – shopping list with storage.** Write the JavaScript for a page that has an input `#item`, a button `#add` and a list `#list`. Clicking Add appends the item to the list, ignores empty input, and saves the list in `localStorage` so it is still there after a refresh.

<details><summary>Model solution</summary>

```js
const input = document.querySelector('#item');
const list = document.querySelector('#list');
let items = JSON.parse(localStorage.getItem('items') ?? '[]');

function render() {
  list.innerHTML = '';
  for (const text of items) {
    const li = document.createElement('li');
    li.textContent = text;          // textContent, not innerHTML, to avoid HTML injection
    list.append(li);
  }
}

document.querySelector('#add').addEventListener('click', () => {
  const text = input.value.trim();
  if (text === '') return;          // ignore empty input
  items.push(text);
  localStorage.setItem('items', JSON.stringify(items));
  input.value = '';
  render();
});

render();
```
Marks: selecting elements (2), event listener (2), validation (1), DOM creation with textContent (2), JSON save/load (3).

</details>

### P3. **CSS animation + accessibility.** Create a "Sign up" button that grows slightly and changes colour on hover and keyboard focus, and a loading spinner that rotates forever. Users who prefer reduced motion must not see the spinner rotate. Write the CSS.

<details><summary>Model solution</summary>

```css
.btn {
  padding: .75rem 1.5rem; border: 0; border-radius: 8px;
  background: #0e7490; color: #fff; font-size: 1rem; cursor: pointer;
  transition: transform .2s ease, background-color .2s ease;
}
.btn:hover, .btn:focus-visible { transform: scale(1.05); background: #155e75; }
.btn:focus-visible { outline: 3px solid #fbbf24; outline-offset: 3px; }

.spinner {
  width: 40px; height: 40px; border-radius: 50%;
  border: 4px solid #e5e7eb; border-top-color: #0e7490;
  animation: spin 1s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }

@media (prefers-reduced-motion: reduce) {
  .spinner { animation: none; }
  .btn { transition: none; }
}
```
Marks: transition on hover and focus (3), visible focus outline (2), keyframes + infinite animation (3), reduced-motion query (2).

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
