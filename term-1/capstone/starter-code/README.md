# Project Name

> Term 1 Capstone Project · Team: TODO (max. 4 members) · Live site: TODO

Starter code: a four-page responsive website (Home, Catalogue, About, Contact) built with **HTML5, CSS3, JavaScript,
Bootstrap 5.3 and jQuery 3.7**. Replace every `TODO` with your own project content.

## What already works

| Feature | Where |
|---|---|
| Responsive navbar with active page, dark-mode toggle (remembered) | every page, `js/main.js` §8 |
| Featured items + full catalogue rendered from data | `js/data.js`, `js/main.js` §3–4 |
| Live search + category filter buttons, result count | `catalogue.html`, `js/main.js` §4 |
| Details modal + favourites saved in `localStorage` | `js/main.js` §5 |
| Count-up statistics when scrolled into view | `index.html`, `js/main.js` §6 |
| Contact form with real-time validation and success message | `contact.html`, `js/main.js` §7 |
| Back-to-top button, skip link, reduced-motion support | `js/main.js` §9, `css/style.css` |
| SEO basics: titles, descriptions, canonical, Open Graph, `robots.txt`, `sitemap.xml` | every page |
| Pre-submission checker | `tools/check-site.js` (`npm install` then `npm run check`) |

## Folder structure

```
index.html  catalogue.html  about.html  contact.html
css/style.css            your brand styles on top of Bootstrap
js/data.js               catalogue data (replace with your items)
js/main.js               all behaviour, in numbered sections
assets/img/              logo and images (use your own, compressed)
robots.txt  sitemap.xml  SEO files
tools/check-site.js      checks the rubric requirements
```

## Run it

Open the folder in VS Code and use **Live Server**, or simply open `index.html` in a browser.

## Team workflow (Git)

1. One member creates the repository from this folder and adds the others as collaborators.
2. Protect `main`; everyone works on `feature/<name>` branches and opens pull requests.
3. Conventional Commit messages (`feat: add catalogue filter`).
4. Deploy with GitHub Pages from `main`.
