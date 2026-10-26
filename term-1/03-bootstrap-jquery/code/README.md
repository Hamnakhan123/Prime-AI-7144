# 💻 Code · Module 03 · Bootstrap & jQuery for Responsive Web Pages

> Prepared by **Hamna Zahid Khan**, Junior Lecturer

Every file below is complete and runnable on its own. Each one is used by a session page, which shows the real output it produced.

[⬅ Back to the module](../README.md)

## ⚙️ Setup

**Browser pages (`.html`)** – double-click to open, or right-click › *Open with Live Server* in VS Code. They load
Bootstrap 5.3.3 and jQuery 3.7.1 from the jsDelivr / jQuery CDNs, so you need an internet connection.

**Automated tests (`*-test.js`, `*.js` tools)** – these load the real pages into a simulated browser (jsdom) and click
buttons, type into fields and print what happened. They are the source of every **Output (real run)** block in the
session pages. Run them from inside this `code/` folder:

```bash
npm install          # once – installs jsdom, jquery and jquery-validation from package.json
node session-03_todo-test.js
```

## 📂 Files


### [Session 1 · Fundamentals of Bootstrap](../session-01-fundamentals-of-bootstrap.md)

| File | What it does | How to run / open |
|---|---|---|
| [`session-01_starter.html`](session-01_starter.html) | Example 1 — The Bootstrap 5 starter template | Open in a browser (or VS Code Live Server) |
| [`session-01_grid-layout.html`](session-01_grid-layout.html) | Example 2 — A responsive three-zone layout (header, content, sidebar, footer) | Open in a browser (or VS Code Live Server) |
| [`session-01_nested-order.html`](session-01_nested-order.html) | Example 3 — Nesting, offsets and order classes | Open in a browser (or VS Code Live Server) |
| [`session-01_grid-calculator.js`](session-01_grid-calculator.js) | Example 4 — A grid calculator – how wide is each column at each breakpoint? | `node session-01_grid-calculator.js` |
| [`session-01_cafe-menu.html`](session-01_cafe-menu.html) | Real-life problem solution – responsive café menu with order classes and a nested grid | Open in a browser (or VS Code Live Server) |
| [`session-01_mini-project-portfolio.html`](session-01_mini-project-portfolio.html) | Mini project solution – one-page portfolio built only with the grid | Open in a browser (or VS Code Live Server) |

### [Session 2 · Building Blocks with Bootstrap Components](../session-02-building-blocks-with-bootstrap-components.md)

| File | What it does | How to run / open |
|---|---|---|
| [`session-02_components-gallery.html`](session-02_components-gallery.html) | Example 1 — A gallery of basic components | Open in a browser (or VS Code Live Server) |
| [`session-02_navbar-header.html`](session-02_navbar-header.html) | Example 2 — A responsive header: navbar with dropdown, hero and call-to-action buttons | Open in a browser (or VS Code Live Server) |
| [`session-02_interactive-components.html`](session-02_interactive-components.html) | Example 3 — Modal, carousel, tabs and an FAQ accordion | Open in a browser (or VS Code Live Server) |
| [`session-02_component-audit.js`](session-02_component-audit.js) | Example 4 — Auditing a page: which Bootstrap components does it use? | `node session-02_component-audit.js` |
| [`package.json`](package.json) | Node dependencies for the automated tests in this folder (`npm install` once) | `npm install` (once, in this folder) |
| [`session-02_karachi-bakes.html`](session-02_karachi-bakes.html) | Real-life problem solution – bakery landing page with navbar, cards, shared order modal and FAQ | Open in a browser (or VS Code Live Server) |
| [`session-02_mini-project-event.html`](session-02_mini-project-event.html) | Mini project solution – TechFest event page (carousel, tabs with tables, modal, map embed, accordion) | Open in a browser (or VS Code Live Server) |

### [Session 3 · Getting Started with jQuery](../session-03-getting-started-with-jquery.md)

| File | What it does | How to run / open |
|---|---|---|
| [`session-03_hello-jquery.html`](session-03_hello-jquery.html) | Example 1 — Your first jQuery page | Open in a browser (or VS Code Live Server) |
| [`session-03_selectors.html`](session-03_selectors.html) | Example 2 — Selector playground – test any selector against a student table | Open in a browser (or VS Code Live Server) |
| [`session-03_todo.js`](session-03_todo.js) | Example 3 — Events and delegation – a to-do list | Browser script – loaded by its HTML page |
| [`session-03_jquery-vs-vanilla.js`](session-03_jquery-vs-vanilla.js) | Example 4 — The same task in jQuery and in vanilla JavaScript | `node session-03_jquery-vs-vanilla.js` |
| [`test-helper.js`](test-helper.js) | Shared helper: loads a page into jsdom with the local jQuery so tests can click and type | Helper – required by the test files |
| [`session-03_hello-test.js`](session-03_hello-test.js) | Test for the first jQuery page – clicks Greet and Reset and prints the changes | `node session-03_hello-test.js` |
| [`session-03_selectors-test.js`](session-03_selectors-test.js) | Runs 18 selectors against the selector playground page and prints the matches | `node session-03_selectors-test.js` |
| [`session-03_todo.html`](session-03_todo.html) | To-do list page (behaviour in session-03_todo.js) | Open in a browser (or VS Code Live Server) |
| [`session-03_todo-test.js`](session-03_todo-test.js) | Automated test for the to-do list (add, Enter key, toggle done, delete, empty input) | `node session-03_todo-test.js` |
| [`session-03_student-directory.html`](session-03_student-directory.html) | Real-life problem solution – student directory with live search + programme filter | Open in a browser (or VS Code Live Server) |
| [`session-03_student-directory-test.js`](session-03_student-directory-test.js) | Test for the student directory (types, clicks a filter, no-match case) | `node session-03_student-directory-test.js` |
| [`session-03_mini-project-quiz.html`](session-03_mini-project-quiz.html) | Mini project solution – 5-question quiz with scoring, feedback colours and reset | Open in a browser (or VS Code Live Server) |
| [`session-03_quiz-test.js`](session-03_quiz-test.js) | Test for the quiz app (answers 4 questions, submits, then resets) | `node session-03_quiz-test.js` |

### [Session 4 · Mastering jQuery Techniques](../session-04-mastering-jquery-techniques.md)

| File | What it does | How to run / open |
|---|---|---|
| [`session-04_effects.html`](session-04_effects.html) | Example 1 — Effects, queues and callbacks – with real timing | Open in a browser (or VS Code Live Server) |
| [`session-04_cart.js`](session-04_cart.js) | Example 2 — DOM manipulation – a mini shopping cart | Browser script – loaded by its HTML page |
| [`session-04_charlimit-plugin.js`](session-04_charlimit-plugin.js) | Example 3 — Writing a reusable plugin: `$.fn.charLimit` | Browser script – loaded by its HTML page |
| [`session-04_jquery-ui.html`](session-04_jquery-ui.html) | Example 4 — jQuery UI – Datepicker, Dialog, Tabs, Sortable and an effect | Open in a browser (or VS Code Live Server) |
| [`session-04_effects-test.js`](session-04_effects-test.js) | Runs the chained effects with real timing and logs when each callback fires | `node session-04_effects-test.js` |
| [`session-04_cart.html`](session-04_cart.html) | Shopping cart page (behaviour in session-04_cart.js) | Open in a browser (or VS Code Live Server) |
| [`session-04_cart-test.js`](session-04_cart-test.js) | Automated test for the cart (add, repeat add, minus, remove, clear) | `node session-04_cart-test.js` |
| [`session-04_plugin-demo.html`](session-04_plugin-demo.html) | Demo page using the charLimit plugin on two fields with different options | Open in a browser (or VS Code Live Server) |
| [`session-04_plugin-test.js`](session-04_plugin-test.js) | Test for the charLimit plugin (defaults, options, warning class, chaining, double init) | `node session-04_plugin-test.js` |
| [`session-04_gradebook.html`](session-04_gradebook.html) | Real-life problem solution – gradebook page | Open in a browser (or VS Code Live Server) |
| [`session-04_gradebook.js`](session-04_gradebook.js) | Real-life problem solution – gradebook behaviour (create, edit, delete, stats, filter) | Browser script – loaded by its HTML page |
| [`session-04_gradebook-test.js`](session-04_gradebook-test.js) | Automated test for the gradebook | `node session-04_gradebook-test.js` |
| [`session-04_mini-project-gallery.html`](session-04_mini-project-gallery.html) | Mini project solution – filterable gallery with fade effects and a jQuery UI dialog lightbox | Open in a browser (or VS Code Live Server) |
| [`session-04_gallery-test.js`](session-04_gallery-test.js) | Test for the gallery: filter, open, next/previous with wrap-around | `node session-04_gallery-test.js` |

### [Session 5 · Designing Responsive Web Pages](../session-05-designing-responsive-web-pages.md)

| File | What it does | How to run / open |
|---|---|---|
| [`session-05_utilities-demo.html`](session-05_utilities-demo.html) | Example 1 — Responsive utilities in action | Open in a browser (or VS Code Live Server) |
| [`session-05_breakpoint-inspector.js`](session-05_breakpoint-inspector.js) | Example 2 — Breakpoint inspector – what does each class do at each width? | `node session-05_breakpoint-inspector.js` |
| [`session-05_responsive-media.html`](session-05_responsive-media.html) | Example 3 — Responsive media – srcset, picture, object-fit and ratio | Open in a browser (or VS Code Live Server) |
| [`session-05_srcset-chooser.js`](session-05_srcset-chooser.js) | Example 4 — Simulating the browser's srcset choice | `node session-05_srcset-chooser.js` |
| [`session-05_news-homepage.html`](session-05_news-homepage.html) | Real-life problem solution – responsive news homepage (3 layouts from one page) | Open in a browser (or VS Code Live Server) |
| [`session-05_mini-project-restaurant.html`](session-05_mini-project-restaurant.html) | Mini project solution – responsive restaurant site with picture hero, table, gallery, map, phone-only call button and dark mode | Open in a browser (or VS Code Live Server) |

### [Session 6 · Integrating and Enhancing with Bootstrap and jQuery](../session-06-integrating-and-enhancing-with-bootstrap-and-jquery.md)

| File | What it does | How to run / open |
|---|---|---|
| [`session-06_order-modal.js`](session-06_order-modal.js) | Example 1 — Driving a Bootstrap modal with jQuery and the JS API | Browser script – loaded by its HTML page |
| [`session-06_validation.js`](session-06_validation.js) | Example 2 — Real-time validation with jQuery + Bootstrap feedback | Browser script – loaded by its HTML page |
| [`session-06_plugin-validate.html`](session-06_plugin-validate.html) | Example 3 — Integrating a third-party plugin: jQuery Validation | Open in a browser (or VS Code Live Server) |
| [`session-06_predeploy-audit.js`](session-06_predeploy-audit.js) | Example 4 — Pre-deploy audit – catch problems before you publish | `node session-06_predeploy-audit.js` |
| [`session-06_order-modal.html`](session-06_order-modal.html) | Page for Example 1: cards with Order buttons, one shared modal, a toast and a tooltip | Open in a browser (or VS Code Live Server) |
| [`session-06_order-modal-test.js`](session-06_order-modal-test.js) | Test: fires show.bs.modal from two different buttons, submits valid and invalid quantities | `node session-06_order-modal-test.js` |
| [`session-06_validation.html`](session-06_validation.html) | Registration form page for the real-time validation example | Open in a browser (or VS Code Live Server) |
| [`session-06_validation-test.js`](session-06_validation-test.js) | Test: empty submit, fixing fields one by one, password mismatch, success | `node session-06_validation-test.js` |
| [`session-06_plugin-validate-test.js`](session-06_plugin-validate-test.js) | Test for the jQuery Validation plugin page using the real plugin from npm | `node session-06_plugin-validate-test.js` |
| [`session-06_scroll-effects.html`](session-06_scroll-effects.html) | Scroll enhancements: ScrollSpy, smooth scroll with offset, back-to-top, count-up stats | Open in a browser (or VS Code Live Server) |
| [`session-06_final-site/index.html`](session-06_final-site/index.html) | Final project – Indus Logistics one-page business site (HTML) | Open in a browser (or VS Code Live Server) |
| [`session-06_final-site/css/style.css`](session-06_final-site/css/style.css) | Final project – brand styles (Bootstrap CSS variables, hero, small helpers) | Linked from the matching HTML page |
| [`session-06_final-site/js/main.js`](session-06_final-site/js/main.js) | Final project – all jQuery behaviour (details, counters, tracking, validation, quote, theme, back-to-top) | Browser script – loaded by its HTML page |
| [`session-06_final-site/README.md`](session-06_final-site/README.md) | Final project – how to run, test and deploy the site | Read on GitHub |
| [`session-06_final-site-test.js`](session-06_final-site-test.js) | Automated user-journey test of the final site | `node session-06_final-site-test.js` |

---

<sub>Prepared by **Hamna Zahid Khan**, Junior Lecturer · Prime AI – Software Engineering with AI</sub>
