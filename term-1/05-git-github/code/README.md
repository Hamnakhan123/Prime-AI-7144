# 💻 Code · Module 05 · Distributed Version Control with Git & GitHub

> Prepared by **Hamna Zahid Khan**, Junior Lecturer

Every file below is complete and runnable on its own. Each one is used by a session page, which shows the real output it produced.

[⬅ Back to the module](../README.md)

## ⚙️ Setup

**Bash scripts (`.sh`)** – need Git 2.28+ and Bash (Git Bash on Windows). Every script sources
[`git-demo-env.sh`](git-demo-env.sh), which creates a temporary folder and a temporary Git identity, so the scripts never
touch your real repositories or your global Git settings.

```bash
bash session-02_lifecycle.sh
```

**Node.js tools (`.js`)** – Node 18+; tests use the built-in test runner (`node --test`), so there is nothing to install.

**Workflow files (`.yml`)** – copy them into `.github/workflows/` in a GitHub repository to run them on GitHub Actions.

## 📂 Files


### [Session 1 · Introduction to Version Control, Git and GitHub](../session-01-introduction-to-version-control-git-and-github.md)

| File | What it does | How to run / open |
|---|---|---|
| [`git-demo-env.sh`](git-demo-env.sh) | Example 1 — The shared demo environment used by every Git script | `bash git-demo-env.sh` |
| [`session-01_first-repo.sh`](session-01_first-repo.sh) | Example 2 — Your first repository: init, configure, commit, log | `bash session-01_first-repo.sh` |
| [`session-01_hash-object.js`](session-01_hash-object.js) | Example 3 — How Git names things: computing a blob hash in Node.js | `node session-01_hash-object.js` |
| [`session-01_clone-and-push.sh`](session-01_clone-and-push.sh) | Example 4 — Clone and push: simulating GitHub with a local "remote" | `bash session-01_clone-and-push.sh` |
| [`session-01_backup-routine.sh`](session-01_backup-routine.sh) | Real-life problem solution – three days of commits, a lost laptop, full recovery from the remote | `bash session-01_backup-routine.sh` |
| [`session-01_README-template.md`](session-01_README-template.md) | README template for publishing a project on GitHub | Read on GitHub |

### [Session 2 · Basic Git Commands](../session-02-basic-git-commands.md)

| File | What it does | How to run / open |
|---|---|---|
| [`session-02_lifecycle.sh`](session-02_lifecycle.sh) | Example 1 — The file lifecycle, live | `bash session-02_lifecycle.sh` |
| [`session-02_gitignore.sh`](session-02_gitignore.sh) | Example 2 — .gitignore in action (and rescuing a committed secret) | `bash session-02_gitignore.sh` |
| [`session-02_remote-sync.sh`](session-02_remote-sync.sh) | Example 3 — Branches, push, fetch and pull with two developers | `bash session-02_remote-sync.sh` |
| [`session-02_undo.sh`](session-02_undo.sh) | Example 4 — Undo toolkit: amend, reset (soft/mixed/hard) and revert | `bash session-02_undo.sh` |
| [`session-02_commit-lint.js`](session-02_commit-lint.js) | Example 5 — A Conventional Commits checker | `node session-02_commit-lint.js` |
| [`session-02_node.gitignore`](session-02_node.gitignore) | Ready-to-use .gitignore for Node/web projects (rename to .gitignore) | Git reads it automatically |
| [`session-02_hotfix-workflow.sh`](session-02_hotfix-workflow.sh) | Real-life problem solution – hotfix on main while a feature is in progress | `bash session-02_hotfix-workflow.sh` |
| [`session-02_mini-project-hook.sh`](session-02_mini-project-hook.sh) | Mini project solution – installs a commit-msg hook that enforces Conventional Commits | `bash session-02_mini-project-hook.sh` |

### [Session 3 · Branching, Merging and Conflict Resolution](../session-03-branching-merging-and-conflict-resolution.md)

| File | What it does | How to run / open |
|---|---|---|
| [`session-03_merge-types.sh`](session-03_merge-types.sh) | Example 1 — Fast-forward and three-way merges, with the history graph | `bash session-03_merge-types.sh` |
| [`session-03_conflict.sh`](session-03_conflict.sh) | Example 2 — Trigger a merge conflict and resolve it | `bash session-03_conflict.sh` |
| [`session-03_conflict-resolver.js`](session-03_conflict-resolver.js) | Example 3 — A conflict-marker resolver in JavaScript | `node session-03_conflict-resolver.js` |
| [`session-03_team-merge.sh`](session-03_team-merge.sh) | Real-life problem solution – three feature branches, fast-forward, auto three-way and a resolved conflict | `bash session-03_team-merge.sh` |
| [`session-03_mini-project-pr-description.js`](session-03_mini-project-pr-description.js) | Mini project solution – generates a pull-request description from commit subjects | `node session-03_mini-project-pr-description.js` |

### [Session 4 · Advanced Git Commands and Collaboration Workflows](../session-04-advanced-git-and-collaboration-workflows.md)

| File | What it does | How to run / open |
|---|---|---|
| [`session-04_rebase-squash.sh`](session-04_rebase-squash.sh) | Example 1 — Rebase a feature branch and squash messy commits | `bash session-04_rebase-squash.sh` |
| [`session-04_stash-cherry-tag.sh`](session-04_stash-cherry-tag.sh) | Example 2 — Stash, cherry-pick and tags | `bash session-04_stash-cherry-tag.sh` |
| [`session-04_bisect.sh`](session-04_bisect.sh) | Example 3 — git bisect run – find the commit that broke the tests | `bash session-04_bisect.sh` |
| [`session-04_file-ops.sh`](session-04_file-ops.sh) | Example 4 — Managing files and cleaning up branches | `bash session-04_file-ops.sh` |
| [`session-04_fork-workflow.sh`](session-04_fork-workflow.sh) | Real-life problem solution – fork, upstream remote, PR branch, sync with rebase, squash and force-with-lease | `bash session-04_fork-workflow.sh` |
| [`session-04_mini-project-release-notes.sh`](session-04_mini-project-release-notes.sh) | Mini project solution – release notes and next SemVer version from commits between tags | `bash session-04_mini-project-release-notes.sh` |

### [Session 5 · AI Integration with Git and GitHub](../session-05-ai-integration-with-git-and-github.md)

| File | What it does | How to run / open |
|---|---|---|
| [`session-05_commit-message-assistant.js`](session-05_commit-message-assistant.js) | Example 1 — An "AI-style" commit-message assistant (rule-based, runs offline) | `node session-05_commit-message-assistant.js` |
| [`session-05_review-ai-code.sh`](session-05_review-ai-code.sh) | Example 2 — Reviewing AI-drafted code with tests (node:test) | `bash session-05_review-ai-code.sh` |
| [`session-05_secret-scanner.js`](session-05_secret-scanner.js) | Example 3 — A pre-commit secret scanner | `node session-05_secret-scanner.js` |
| [`session-05_slugify-ai-draft.js`](session-05_slugify-ai-draft.js) | An AI-style first draft of slugify – looks fine, has edge-case bugs | `node session-05_slugify-ai-draft.js` |
| [`session-05_slugify.js`](session-05_slugify.js) | The reviewed slugify after testing (handles spaces, accents, symbols, empty input) | `node session-05_slugify.js` |
| [`session-05_slugify.test.js`](session-05_slugify.test.js) | Unit tests (node:test) used to review both slugify versions | `node session-05_slugify.test.js` |
| [`session-05_pricing.js`](session-05_pricing.js) | Real-life problem solution – reviewed pricing helpers (PKR formatting and delivery rule) | `node session-05_pricing.js` |
| [`session-05_pricing.test.js`](session-05_pricing.test.js) | Tests for the pricing helpers including edge cases a human added | `node session-05_pricing.test.js` |
| [`session-05_run-pricing-tests.sh`](session-05_run-pricing-tests.sh) | Runs the pricing tests with the built-in Node test runner (durations stripped) | `bash session-05_run-pricing-tests.sh` |
| [`session-05_prompt-log-template.md`](session-05_prompt-log-template.md) | Prompt library for Git/GitHub tasks + a log template for disclosing AI use | Read on GitHub |

### [Session 6 · Continuous Integration and Deployment with GitHub](../session-06-continuous-integration-and-deployment-with-github.md)

| File | What it does | How to run / open |
|---|---|---|
| [`session-06_ci-demo/.github/workflows/ci.yml`](session-06_ci-demo/.github/workflows/ci.yml) | Example 1 — The CI workflow (GitHub Actions YAML) | Config file |
| [`session-06_local-ci.sh`](session-06_local-ci.sh) | Example 2 — Running the same pipeline locally before you push | `bash session-06_local-ci.sh` |
| [`session-06_workflow-check.js`](session-06_workflow-check.js) | Example 3 — A workflow checker: catch YAML mistakes before GitHub does | `node session-06_workflow-check.js` |
| [`session-06_ci-demo/package.json`](session-06_ci-demo/package.json) | Demo project – npm scripts used by CI (lint and test, no dependencies) | `npm install` (once, in this folder) |
| [`session-06_ci-demo/src/cart.js`](session-06_ci-demo/src/cart.js) | Demo project – cart logic under test | `node session-06_ci-demo/src/cart.js` |
| [`session-06_ci-demo/test/cart.test.js`](session-06_ci-demo/test/cart.test.js) | Demo project – unit tests run by CI | `node session-06_ci-demo/test/cart.test.js` |
| [`session-06_ci-demo/scripts/lint.js`](session-06_ci-demo/scripts/lint.js) | Demo project – a tiny linter (no console.log, no var, no trailing spaces) | `node session-06_ci-demo/scripts/lint.js` |
| [`session-06_ci-demo/.github/workflows/pages.yml`](session-06_ci-demo/.github/workflows/pages.yml) | Demo project – deploy workflow: test, then publish site/ to GitHub Pages | Config file |
| [`session-06_ci-demo/site/index.html`](session-06_ci-demo/site/index.html) | Demo project – the static page that the Pages workflow deploys | Open in a browser (or VS Code Live Server) |
| [`session-06_ci-demo/.github/pull_request_template.md`](session-06_ci-demo/.github/pull_request_template.md) | Demo project – pull request template shown on every new PR | Read on GitHub |
| [`session-06_ci-demo/netlify.toml`](session-06_ci-demo/netlify.toml) | Demo project – optional Netlify configuration (deploy site/ after tests) | Open in your editor |
| [`session-06_ci-demo/README.md`](session-06_ci-demo/README.md) | Demo project – README with badge, live link and step-by-step CI/CD instructions | Read on GitHub |

---

<sub>Prepared by **Hamna Zahid Khan**, Junior Lecturer · Prime AI – Software Engineering with AI</sub>
