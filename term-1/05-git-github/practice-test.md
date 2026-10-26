# 📝 Practice Test · Distributed Version Control with Git & GitHub

> [Prime AI – Software Engineering with AI](../../README.md) › [Term 1](../README.md) › [Distributed Version Control with Git & GitHub](README.md) › **Practice test**

**Format:** Part A has 20 multiple-choice questions (1 mark each). Part B has 3 practical questions (10 marks each). Suggested time: 60 minutes. Attempt everything first, then open the answers.

## Part A — Multiple-choice questions

**1. Which type of version control gives every developer a full copy of the history?**

- A) Local
- B) Centralized
- C) Distributed
- D) Manual backups

<details><summary>Answer</summary>

**C** — Git is distributed: every clone is a full repository.

</details>

**2. Who created Git and in which year?**

- A) Linus Torvalds, 2005
- B) Bill Gates, 1995
- C) GitHub Inc., 2008
- D) Apache, 2000

<details><summary>Answer</summary>

**A** — Git was created for Linux kernel development in 2005.

</details>

**3. Git vs GitHub:**

- A) Same thing
- B) Git is the version control tool; GitHub is a hosting and collaboration platform for Git repositories
- C) GitHub runs only on Windows
- D) Git is a website

<details><summary>Answer</summary>

**B** — You can use Git without GitHub.

</details>

**4. Which command moves changes from the working directory to the staging area?**

- A) git commit
- B) git add
- C) git push
- D) git stage-all

<details><summary>Answer</summary>

**B** — add stages; commit records the staged snapshot.

</details>

**5. `git status` shows a file in red under "Untracked files". What does that mean?**

- A) It is committed
- B) Git has never tracked it
- C) It is staged
- D) It was deleted

<details><summary>Answer</summary>

**B** — Use git add to start tracking it.

</details>

**6. Which file tells Git which files to ignore?**

- A) .gitkeep
- B) .gitignore
- C) ignore.txt
- D) .git/config

<details><summary>Answer</summary>

**B** — .gitignore holds patterns such as node_modules/ and .env.

</details>

**7. Which is a good Conventional Commit message?**

- A) "changes"
- B) "fix: prevent crash when cart is empty"
- C) "Fixed stuff!!!"
- D) "update update"

<details><summary>Answer</summary>

**B** — type: imperative summary.

</details>

**8. `git switch -c feature/login` does what?**

- A) Deletes a branch
- B) Creates and switches to a new branch
- C) Merges a branch
- D) Pushes a branch

<details><summary>Answer</summary>

**B** — Same as git checkout -b.

</details>

**9. `git pull` is equivalent to:**

- A) git push + git merge
- B) git fetch + git merge (or rebase)
- C) git clone
- D) git commit + git push

<details><summary>Answer</summary>

**B** — It downloads and integrates remote changes.

</details>

**10. Which undo is SAFE for commits already pushed to a shared branch?**

- A) git reset --hard
- B) git revert
- C) git commit --amend
- D) git rebase -i

<details><summary>Answer</summary>

**B** — revert adds a new commit instead of rewriting history.

</details>

**11. A fast-forward merge happens when:**

- A) Both branches have new commits
- B) The target branch has no new commits since the feature branch was created
- C) There is a conflict
- D) You use --no-ff

<details><summary>Answer</summary>

**B** — Git just moves the pointer forward.

</details>

**12. Conflict markers look like:**

- A) `### ### ###`
- B) `<<<<<<<`, `=======`, `>>>>>>>`
- C) `/* conflict */`
- D) `!!!`

<details><summary>Answer</summary>

**B** — Edit the file, keep the right content, remove markers.

</details>

**13. `git rebase main` on a feature branch:**

- A) Deletes main
- B) Replays the feature commits on top of the latest main
- C) Merges with a merge commit
- D) Pushes to GitHub

<details><summary>Answer</summary>

**B** — It produces a linear history.

</details>

**14. `git stash` is used to:**

- A) Delete changes forever
- B) Temporarily shelve uncommitted changes
- C) Create a tag
- D) Publish a release

<details><summary>Answer</summary>

**B** — Restore later with git stash pop.

</details>

**15. `git cherry-pick abc123` does what?**

- A) Deletes commit abc123
- B) Applies the changes of commit abc123 onto the current branch
- C) Shows abc123
- D) Reverts abc123

<details><summary>Answer</summary>

**B** — Useful for hotfixes.

</details>

**16. A fork is:**

- A) A local branch
- B) Your own copy of someone else's repository on GitHub
- C) A merge conflict
- D) A deleted repository

<details><summary>Answer</summary>

**B** — You push to your fork and open a pull request to the original.

</details>

**17. Which statement about AI coding assistants is TRUE?**

- A) Their code never has bugs
- B) Suggestions must be reviewed and tested like any other code
- C) They can safely see your passwords
- D) They replace version control

<details><summary>Answer</summary>

**B** — AI output can be wrong, insecure or licensed code.

</details>

**18. CI stands for:**

- A) Code Inspection
- B) Continuous Integration
- C) Central Index
- D) Commit Interface

<details><summary>Answer</summary>

**B** — Automatically build and test every change.

</details>

**19. GitHub Actions workflows are written in:**

- A) JSON
- B) YAML
- C) XML
- D) Python

<details><summary>Answer</summary>

**B** — Files in .github/workflows/*.yml.

</details>

**20. Where should an API key used by a workflow be stored?**

- A) In the YAML file
- B) In GitHub repository secrets
- C) In README.md
- D) In a commit message

<details><summary>Answer</summary>

**B** — Reference it as ${{ secrets.NAME }}.

</details>

## Part B — Practical / coding questions

### P1. **Undo scenarios.** For each situation, give the safest command(s): (a) you edited `app.js` and want to throw the edits away; (b) you staged `notes.txt` by mistake; (c) your last commit message has a typo and you have NOT pushed; (d) a commit pushed yesterday to `main` broke the site.

<details><summary>Model solution</summary>

(a) `git restore app.js` – discards working-directory changes.
(b) `git restore --staged notes.txt` – unstages, keeps the edits.
(c) `git commit --amend -m "fix: correct total calculation"` – rewrites only the unpushed last commit.
(d) `git revert <commit-id>` then `git push` – creates a new commit that undoes it without rewriting shared history.
Marks: 2 + 2 + 3 + 3; explaining *why* reset/amend are unsafe for pushed commits earns full marks in (d).

</details>

### P2. **Conflict resolution.** After `git merge feature/price` you see:
```text
<<<<<<< HEAD
const DELIVERY = 250;
=======
const DELIVERY = 300;
const FREE_ABOVE = 5000;
>>>>>>> feature/price
```
The business decided delivery is Rs 300 and free above Rs 5,000. Show the resolved file and the commands to finish.

<details><summary>Model solution</summary>

```js
const DELIVERY = 300;
const FREE_ABOVE = 5000;
```
```bash
git add pricing.js
git commit            # Git proposes "Merge branch 'feature/price'"
git log --oneline --graph -3
```
Marks: correct content with all markers removed (4), add + commit (4), verification with log/status (2).

</details>

### P3. **CI workflow.** Write a GitHub Actions workflow that runs on every push and pull request to `main`, sets up Node.js 20, installs dependencies with `npm ci` and runs `npm test`.

<details><summary>Model solution</summary>

```yaml
name: CI
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm test
```
Marks: triggers (2), job with runner (2), checkout (2), setup-node (2), install + test steps (2).

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
