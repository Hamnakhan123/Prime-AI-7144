# Bakery CI/CD demo

![CI](https://github.com/<your-username>/<your-repo>/actions/workflows/ci.yml/badge.svg)

> Prepared by **Hamna Zahid Khan**, Junior Lecturer – demo project for the Git & GitHub module

**Live site:** `https://<your-username>.github.io/<your-repo>/`

## What is inside

```
src/cart.js                     business logic
test/cart.test.js               unit tests (node:test finds *.test.js files automatically)
scripts/lint.js                 tiny linter (no console.log, no var, no trailing spaces)
site/index.html                 the static page that gets deployed
.github/workflows/ci.yml        lint + test on Node 18/20/22 for every push and PR
.github/workflows/pages.yml     test, then deploy site/ to GitHub Pages on main
.github/pull_request_template.md
netlify.toml                    optional Netlify set-up
```

## Run locally

```bash
npm run lint
npm test
```

## Set up CI/CD on GitHub – step by step

1. Create a new repository and push **the contents of this folder** to it (the `.github` folder must be at the root).
2. Open the **Actions** tab – the CI workflow runs on your first push.
3. *Settings › Pages › Build and deployment › Source:* **GitHub Actions**. Push to `main` (or run the workflow manually) to deploy.
4. *Settings › Branches* (or *Rules › Rulesets*): protect `main` – require a pull request, 1 approval and the `test` checks.
5. Replace `<your-username>/<your-repo>` above so the badge and link work.
6. Try it: on a branch, change `FEE` in `src/cart.js` to 300 without updating the tests, open a PR – the checks turn red
   and merging is blocked. Fix the test, push, watch it turn green, merge, and see the site redeploy.
