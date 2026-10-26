# 💻 Code · Module 04 · Optimize Web for Search Engines (SEO)

> Prepared by **Hamna Zahid Khan**, Junior Lecturer

Every file below is complete and runnable on its own. Each one is used by a session page, which shows the real output it produced.

[⬅ Back to the module](../README.md)

## ⚙️ Setup

All tools are **Node.js** scripts. The only dependency is **jsdom** (an HTML parser):

```bash
npm install            # once, inside this code/ folder
node session-01_mini-search-engine.js
```

The scripts work on the demo website in [`demo-site/`](demo-site/) – open its pages in a browser to see what the tools
are analysing. CSV/JSON sample data files sit next to the scripts that use them.

## 📂 Files


### [Session 1 · Understanding Search Engines and SEO Components](../session-01-understanding-search-engines-and-seo-components.md)

| File | What it does | How to run / open |
|---|---|---|
| [`session-01_mini-search-engine.js`](session-01_mini-search-engine.js) | Example 1 — Build a mini search engine: crawl → index → rank | `node session-01_mini-search-engine.js` |
| [`session-01_robots-checker.js`](session-01_robots-checker.js) | Example 2 — A robots.txt tester | `node session-01_robots-checker.js` |
| [`session-01_operator-builder.js`](session-01_operator-builder.js) | Example 3 — Operator query builder for competitor research | `node session-01_operator-builder.js` |
| [`demo-site/index.html`](demo-site/index.html) | Demo site – home page (fairly well optimised) | Open in a browser (or VS Code Live Server) |
| [`demo-site/maths-tuition.html`](demo-site/maths-tuition.html) | Demo site – maths tuition page (good example) | Open in a browser (or VS Code Live Server) |
| [`demo-site/physics-tuition.html`](demo-site/physics-tuition.html) | Demo site – physics page with deliberate mistakes (no description, weak title, image without alt, two h1s) | Open in a browser (or VS Code Live Server) |
| [`demo-site/blog-study-tips.html`](demo-site/blog-study-tips.html) | Demo site – long-form blog article | Open in a browser (or VS Code Live Server) |
| [`demo-site/contact.html`](demo-site/contact.html) | Demo site – contact page (duplicate title of the home page, links to a missing page) | Open in a browser (or VS Code Live Server) |
| [`demo-site/admin/login.html`](demo-site/admin/login.html) | Demo site – private admin page (blocked in robots.txt, marked noindex) | Open in a browser (or VS Code Live Server) |
| [`demo-site/img/tutor-teaching-maths.svg`](demo-site/img/tutor-teaching-maths.svg) | Demo site – illustration used on the home page | Image – opens in any browser |
| [`demo-site/img/maths-past-paper.svg`](demo-site/img/maths-past-paper.svg) | Demo site – illustration used on the maths page | Image – opens in any browser |
| [`demo-site/robots.txt`](demo-site/robots.txt) | Demo site – crawl rules for bots | Plain-text file |
| [`package.json`](package.json) | Node dependencies for the SEO tools (`npm install` once) | `npm install` (once, in this folder) |
| [`session-01_mini-project-search-plus.js`](session-01_mini-project-search-plus.js) | Mini project solution – snippets with highlighting, "did you mean", orphan-page report | `node session-01_mini-project-search-plus.js` |

### [Session 2 · On-page and Off-page Optimization Techniques](../session-02-on-page-and-off-page-optimization.md)

| File | What it does | How to run / open |
|---|---|---|
| [`session-02_onpage-analyzer.js`](session-02_onpage-analyzer.js) | Example 1 — An on-page SEO analyser for any HTML page | `node session-02_onpage-analyzer.js` |
| [`session-02_keyword-planner.js`](session-02_keyword-planner.js) | Example 2 — Keyword planner: intent, opportunity score and clusters | `node session-02_keyword-planner.js` |
| [`session-02_backlink-scorer.js`](session-02_backlink-scorer.js) | Example 3 — Backlink profile scorer | `node session-02_backlink-scorer.js` |
| [`session-02_keywords.csv`](session-02_keywords.csv) | Practice keyword list (illustrative volumes and difficulty, not real measurements) | Data file read by the scripts |
| [`session-02_backlinks.json`](session-02_backlinks.json) | Sample backlink export used by the backlink scorer | Data/config file used by the pages |
| [`session-02_physics-tuition-optimised.html`](session-02_physics-tuition-optimised.html) | Real-life problem solution – the physics page rewritten with on-page best practices | Open in a browser (or VS Code Live Server) |
| [`session-02_compare-before-after.js`](session-02_compare-before-after.js) | Runs the on-page checklist on the old and the optimised physics page | `node session-02_compare-before-after.js` |
| [`session-02_mini-project-content-brief.js`](session-02_mini-project-content-brief.js) | Mini project solution – content brief generator from a keyword and its intent | `node session-02_mini-project-content-brief.js` |
| [`demo-site/img/physics-circuit-lesson.svg`](demo-site/img/physics-circuit-lesson.svg) | Illustration for the optimised physics page | Image – opens in any browser |

### [Session 3 · Mobile SEO, Technical SEO and Local Content](../session-03-mobile-seo-and-more.md)

| File | What it does | How to run / open |
|---|---|---|
| [`session-03_cwv-checker.js`](session-03_cwv-checker.js) | Example 1 — Core Web Vitals checker from real-user samples | `node session-03_cwv-checker.js` |
| [`session-03_sitemap-generator.js`](session-03_sitemap-generator.js) | Example 2 — Generate an XML sitemap from the site folder | `node session-03_sitemap-generator.js` |
| [`session-03_schema-generator.js`](session-03_schema-generator.js) | Example 3 — Structured data generator and validator (JSON-LD) | `node session-03_schema-generator.js` |
| [`session-03_mobile-check.js`](session-03_mobile-check.js) | Example 4 — Mobile-friendliness checker | `node session-03_mobile-check.js` |
| [`session-03_cwv-samples.json`](session-03_cwv-samples.json) | Practice field data: 20 LCP/INP/CLS samples for a mobile and a desktop page | Data/config file used by the pages |
| [`session-03_local-landing-dha.html`](session-03_local-landing-dha.html) | Real-life problem solution – mobile-friendly local landing page with LocalBusiness, BreadcrumbList and FAQPage JSON-LD | Open in a browser (or VS Code Live Server) |
| [`session-03_local-page-test.js`](session-03_local-page-test.js) | Checks the local landing page: mobile basics, JSON-LD parsing and visible-content match | `node session-03_local-page-test.js` |
| [`session-03_mini-project-report-card.js`](session-03_mini-project-report-card.js) | Mini project solution – combined mobile SEO report card with A–F grades | `node session-03_mini-project-report-card.js` |

### [Session 4 · Advanced SEO Techniques and Tools](../session-04-advanced-seo-techniques-and-tools.md)

| File | What it does | How to run / open |
|---|---|---|
| [`session-04_site-audit.js`](session-04_site-audit.js) | Example 1 — A full site audit crawler with a health score | `node session-04_site-audit.js` |
| [`session-04_hreflang.js`](session-04_hreflang.js) | Example 2 — hreflang generator and validator | `node session-04_hreflang.js` |
| [`session-04_analytics-report.js`](session-04_analytics-report.js) | Example 3 — Search Console + GA4 report: KPIs and opportunities | `node session-04_analytics-report.js` |
| [`session-04_utm-builder.js`](session-04_utm-builder.js) | Example 4 — UTM link builder for social campaigns | `node session-04_utm-builder.js` |
| [`session-04_search-console.csv`](session-04_search-console.csv) | Practice Search Console export (query, page, clicks, impressions, position) | Data file read by the scripts |
| [`session-04_ga4-sessions.csv`](session-04_ga4-sessions.csv) | Practice GA4 session data (one row per session) | Data file read by the scripts |
| [`session-04_seo-plan.js`](session-04_seo-plan.js) | Real-life problem solution – turns audit findings into a prioritised 30-day plan | `node session-04_seo-plan.js` |
| [`session-04_30-day-plan-template.md`](session-04_30-day-plan-template.md) | Template – 30-day SEO plan with owners and KPI targets | Read on GitHub |
| [`session-04_audit-report-template.md`](session-04_audit-report-template.md) | Template – professional SEO audit report structure | Read on GitHub |

---

<sub>Prepared by **Hamna Zahid Khan**, Junior Lecturer · Prime AI – Software Engineering with AI</sub>
