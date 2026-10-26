# Milestone 2 · HTML5 Structure and Content

> [Capstone Project](../../README.md) › **Milestone 2** · Suggested timing: Week 2

**Goal:** every page exists with complete, semantic HTML5 and real content – before heavy styling.

## Tasks – step by step

1. Create your brief-specific fifth page (e.g. `order.html`, `courses.html`, `tours.html`) by copying `about.html` and
   editing it; add it to the navbar on **every** page.
2. Replace all placeholder text with **your own** content (no copied text – write it or cite sources).
3. Use semantic elements: `header`/`nav`/`main`/`section`/`article`/`aside`/`footer`; one `h1` per page and a logical
   `h2`/`h3` outline.
4. Include at least one **table** (e.g. price list, timetable), one **form** (contact) and **media** (images with `alt`,
   an embedded map or video).
5. Put your catalogue items into `js/data.js` (≥ 12 items) with image paths that exist in `assets/img/`.
6. Optimise images (≤ 200 KB each, WebP or JPEG, sensible dimensions) and always set `width`/`height`.
7. Validate every page with the W3C validator (validator.w3.org) and fix errors.

## Deliverable
All pages with final structure and content merged into `main` through pull requests.

## Acceptance checklist
- [ ] 5+ pages, all linked from the navbar
- [ ] W3C validator: 0 errors on every page
- [ ] ≥ 12 catalogue items with real images and alt text
- [ ] `npm run check`: "exactly one h1", "alt", "labels" and "local links" all ✔

<details><summary>💡 Hint – a semantic page skeleton</summary>

```html
<body>
  <nav>…</nav>
  <main id="main">
    <section aria-labelledby="menuTitle">
      <h1 id="menuTitle">Our Menu</h1>
      <article class="card">…</article>
    </section>
  </main>
  <footer>…</footer>
</body>
```
</details>

---

[⬅ Milestone 2](../01-planning-and-setup/README.md) · [Milestone 4 ➡](../03-css3-and-bootstrap-responsive-design/README.md)

<sub>Prepared by **Hamna Zahid Khan**, Junior Lecturer</sub>
