# Milestone 3 · CSS3 and Bootstrap Responsive Design

> [Capstone Project](../../README.md) › **Milestone 3** · Suggested timing: Week 3

**Goal:** a polished, consistent and fully responsive design built with Bootstrap 5 and your own CSS3.

## Tasks – step by step

1. Choose a **brand palette** (2–3 colours + neutrals) and fonts; set them as CSS variables in `css/style.css`. Check text
   contrast (WCAG AA) with a contrast checker.
2. Lay out every page with the Bootstrap **grid** (`container`, `row`, `col-12 col-md-6 col-lg-4`) – test at **375 px,
   768 px and 1280 px** in DevTools device mode.
3. Use at least **three interactive Bootstrap components** (modal, carousel, accordion, tabs, toast, offcanvas…).
4. Add CSS3 polish: hover transitions, a keyframe animation, Flexbox or Grid for a custom section, `prefers-reduced-motion`
   support.
5. Make sure nothing overflows horizontally on phones; images use `img-fluid` or `object-fit`.
6. Review each other's pages in a pull request against the wireframes.

## Deliverable
Responsive styled site on GitHub Pages; screenshots at three widths for each page in `docs/screenshots/`.

## Acceptance checklist
- [ ] No horizontal scrolling at 375 px on any page
- [ ] Three or more interactive Bootstrap components
- [ ] Consistent colours/fonts via CSS variables; contrast AA
- [ ] Lighthouse (mobile) accessibility ≥ 90

<details><summary>💡 Hint – brand variables and a responsive card grid</summary>

```css
:root { --brand: #b45309; --brand-dark: #7c2d12; --accent: #16a34a; }
.btn-brand { background: var(--brand); color: #fff; }
```
```html
<div class="row g-4">
  <div class="col-12 col-sm-6 col-lg-4"><article class="card h-100">…</article></div>
</div>
```
</details>

---

[⬅ Milestone 3](../02-html5-structure-and-content/README.md) · [Milestone 5 ➡](../04-javascript-and-jquery-interactivity/README.md)

<sub>Prepared by **Hamna Zahid Khan**, Junior Lecturer</sub>
