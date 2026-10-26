# Milestone 5 · SEO, Accessibility, Testing and Deployment

> [Capstone Project](../../README.md) › **Milestone 5** · Suggested timing: Week 5

**Goal:** a fast, findable, accessible site that is live on the internet and passes every automated check.

## Tasks – step by step

1. **SEO (Module 4):** unique title (50–60 chars) and description (120–160) on every page, keyword research for your brief,
   descriptive headings and link text, Open Graph tags, update `robots.txt` and `sitemap.xml` with your real URL, optional
   JSON-LD (`LocalBusiness`, `Organization` or `Product`).
2. **Accessibility:** alt text, labels, skip link, keyboard navigation (Tab through every page), visible focus, contrast.
3. **Performance:** compress images, lazy-load below-the-fold images, remove unused files.
4. **Testing:** run `npm run check` (0 failures, 0 warnings), `npm test`, Lighthouse on mobile for every page, manual tests on
   a real phone; record results in a test table for the report.
5. **Cross-browser:** Chrome, Edge/Firefox, and a phone browser.
6. **Deploy:** GitHub Pages from `main`; check the live site, not just your laptop.
7. Optional CI: a GitHub Actions workflow that runs `npm run check` on every pull request (Module 5 Session 6).
8. Tag the release: `git tag -a v1.0.0 -m "Capstone submission"` and `git push --tags`.

## Deliverable
Live site URL, Lighthouse screenshots, test table, release `v1.0.0`.

## Acceptance checklist
- [ ] Lighthouse (mobile): SEO ≥ 90, Accessibility ≥ 90, Best Practices ≥ 90; Performance as high as you can
- [ ] `npm run check`: 0 failures, 0 warnings
- [ ] Live site works on a phone; all links and forms work online
- [ ] `v1.0.0` tag and GitHub Release created

<details><summary>💡 Hint – a CI workflow for the checker</summary>

```yaml
name: Site checks
on: [pull_request]
jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm install
      - run: npm run check
      - run: npm test
```
</details>

| Test ID | Page | Steps | Expected | Actual | Pass? |
|---|---|---|---|---|---|
| T01 | Catalogue | Type "cake" in search | Only cake items shown, count updates | | |
| T02 | Contact | Submit empty form | All required fields red, focus on name | | |
| T03 | All | Resize to 375 px | No horizontal scroll | | |

---

[⬅ Milestone 5](../04-javascript-and-jquery-interactivity/README.md) · [Milestone 7 ➡](../06-report-presentation-and-viva/README.md)

<sub>Prepared by **Hamna Zahid Khan**, Junior Lecturer</sub>
