# 🚚 Indus Logistics – final project for the Bootstrap & jQuery module

> Prepared by **Hamna Zahid Khan**, Junior Lecturer

A complete one-page business website built with **Bootstrap 5.3.3** and **jQuery 3.7.1**.

## Folder structure

```
session-06_final-site/
├── index.html      all sections: navbar, hero, services, stats, tracking, reviews, contact, quote modal
├── css/style.css   brand colour, custom .btn-brand, hero, small helpers
└── js/main.js      jQuery behaviour (details toggle, counters, tracking, validation, quote, dark mode)
```

## Run it

1. Open the folder in VS Code and choose **Open with Live Server** on `index.html` (or double-click the file).
2. Try: open the quote modal, change weight; type `IL-204518` (or `IL-117730`, `IL-560021`) in the tracker; submit the
   contact form empty, then fix each field; toggle dark mode and reload (it is remembered).

## Test it

From the parent `code/` folder:

```bash
npm install
node session-06_final-site-test.js      # simulated user journey
node session-06_predeploy-audit.js      # checklist: viewport, title, description, alt, labels, SRI, missing files
```

## Deploy it to GitHub Pages

1. Create a new **public** repository on GitHub, e.g. `indus-logistics`.
2. Upload `index.html`, the `css/` folder and the `js/` folder to the repository root (*Add file › Upload files*), or push
   them with Git (Module 5).
3. Go to **Settings › Pages**, choose **Deploy from a branch**, branch **main**, folder **/(root)**, and click **Save**.
4. Wait about a minute and open `https://<your-username>.github.io/indus-logistics/`.
5. Open the live site on your phone, run Lighthouse (Mobile) in Chrome DevTools, fix anything below 90 and push again.

**Netlify alternative:** sign in at netlify.com › *Add new site › Deploy manually* › drag this folder onto the page.

## Ideas to extend it

- Replace the demo `PARCELS` object with a real API call using `$.getJSON()` (Term 2).
- Add a jQuery UI datepicker for pick-up scheduling.
- Add a "Request pick-up" form that opens from each service card using `show.bs.modal` + `relatedTarget`.
