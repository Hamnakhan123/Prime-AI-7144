# 📝 Practice Test · Effective Productivity with Office Automation

> [Prime AI – Software Engineering with AI](../../README.md) › [Term 1](../README.md) › [Effective Productivity with Office Automation](README.md) › **Practice test**

**Format:** Part A has 20 multiple-choice questions (1 mark each). Part B has 3 practical questions (10 marks each). Suggested time: 60 minutes. Attempt everything first, then open the answers.

## Part A — Multiple-choice questions

**1. Which Windows 11 edition includes BitLocker and Hyper-V for small businesses?**

- A) Home
- B) Pro
- C) S mode
- D) Starter

<details><summary>Answer</summary>

**B** — Pro adds business features such as BitLocker encryption, Hyper-V and domain join.

</details>

**2. The shortcut to open Snap layouts on the active window is:**

- A) Win+D
- B) Win+Z
- C) Win+Tab
- D) Alt+Tab

<details><summary>Answer</summary>

**B** — Win+Z shows the snap layout grid.

</details>

**3. Which Office application is best for a shared digital notebook with sections and pages?**

- A) Excel
- B) Outlook
- C) OneNote
- D) Publisher

<details><summary>Answer</summary>

**C** — OneNote is organised as notebooks, sections and pages.

</details>

**4. In Word, a reusable file that keeps styles and boilerplate is saved with which extension?**

- A) .docx
- B) .dotx
- C) .rtf
- D) .xlsx

<details><summary>Answer</summary>

**B** — .dotx is a Word template.

</details>

**5. Mail Merge combines a main document with a:**

- A) Macro
- B) Data source
- C) Theme
- D) Section break

<details><summary>Answer</summary>

**B** — The data source (Excel sheet, Outlook contacts, etc.) provides one record per letter.

</details>

**6. Track Changes is found on which Word ribbon tab?**

- A) Insert
- B) Layout
- C) Review
- D) View

<details><summary>Answer</summary>

**C** — Review holds Track Changes, Comments, Compare and Accept/Reject.

</details>

**7. In Excel, `=$B$2*C5` copied one row down becomes:**

- A) =$B$3*C6
- B) =$B$2*C6
- C) =B3*C6
- D) =$B$2*C5

<details><summary>Answer</summary>

**B** — The absolute reference stays; the relative one shifts.

</details>

**8. Which function returns a value from a table by matching a key, searching in any direction?**

- A) SUMIF
- B) XLOOKUP
- C) COUNTA
- D) TRIM

<details><summary>Answer</summary>

**B** — XLOOKUP replaces VLOOKUP/HLOOKUP and can look left.

</details>

**9. `=IF(B2>=50,"Pass","Fail")` when B2 is 50 returns:**

- A) Fail
- B) Pass
- C) #VALUE!
- D) 0

<details><summary>Answer</summary>

**B** — 50 >= 50 is TRUE.

</details>

**10. Goal Seek is used to:**

- A) Find the input that produces a target result
- B) Sort data
- C) Protect a sheet
- D) Create a chart

<details><summary>Answer</summary>

**A** — It works backwards from a desired output.

</details>

**11. To let users edit only input cells on a protected sheet you must first:**

- A) Hide the sheet
- B) Unlock those cells
- C) Encrypt the file
- D) Freeze panes

<details><summary>Answer</summary>

**B** — All cells are Locked by default; unlock inputs, then Protect Sheet.

</details>

**12. A PivotChart is always based on:**

- A) A Word table
- B) A PivotTable
- C) A macro
- D) A slicer only

<details><summary>Answer</summary>

**B** — The PivotChart visualises the connected PivotTable.

</details>

**13. After changing source data, a PivotTable needs to be:**

- A) Recreated
- B) Refreshed
- C) Unprotected
- D) Sorted

<details><summary>Answer</summary>

**B** — Right-click › Refresh (or Alt+F5).

</details>

**14. The PowerPoint transition that animates objects smoothly between two similar slides is:**

- A) Fade
- B) Morph
- C) Push
- D) Wipe

<details><summary>Answer</summary>

**B** — Morph matches objects across consecutive slides.

</details>

**15. Summary Zoom in PowerPoint creates:**

- A) A video
- B) An interactive overview slide linking to sections
- C) A handout
- D) A chart

<details><summary>Answer</summary>

**B** — It builds a clickable agenda slide.

</details>

**16. `F5` in PowerPoint:**

- A) Starts the show from the beginning
- B) Saves the file
- C) Inserts a slide
- D) Opens Designer

<details><summary>Answer</summary>

**A** — Shift+F5 starts from the current slide.

</details>

**17. In Outlook, automatically moving all mail from a sender to a folder is done with:**

- A) Categories
- B) Rules
- C) Signatures
- D) Flags

<details><summary>Answer</summary>

**B** — Rules run actions when conditions match.

</details>

**18. OneDrive Files On-Demand means:**

- A) Files are deleted after 30 days
- B) Files appear locally but download only when opened
- C) Files are emailed
- D) Files are read-only

<details><summary>Answer</summary>

**B** — It saves disk space while keeping the full list visible.

</details>

**19. A Teams channel is best described as:**

- A) A private email folder
- B) A topic-based conversation space inside a team
- C) A calendar view
- D) A file format

<details><summary>Answer</summary>

**B** — Teams contain channels for topics or projects.

</details>

**20. The safest practice when using an AI assistant in Office is to:**

- A) Accept output without reading
- B) Review and fact-check output before sharing
- C) Paste passwords for context
- D) Disable spell-check

<details><summary>Answer</summary>

**B** — AI can be wrong; you remain responsible.

</details>

## Part B — Practical / coding questions

### P1. **Excel – grade sheet.** Columns: Name, Quiz (out of 20), Midterm (out of 30), Final (out of 50). Write formulas for Total, Percentage, Grade (A ≥ 80, B ≥ 65, C ≥ 50, else F) and the class average. Then describe how to highlight failing rows in red.

<details><summary>Model solution</summary>

| Cell | Formula |
|---|---|
| E2 Total | `=SUM(B2:D2)` |
| F2 Percentage | `=E2/100` formatted as % |
| G2 Grade | `=IFS(F2>=0.8,"A",F2>=0.65,"B",F2>=0.5,"C",TRUE,"F")` |
| E12 Average | `=AVERAGE(E2:E11)` |

Fill E2:G2 down. Conditional formatting: select A2:G11 › Home › Conditional Formatting › New Rule › *Use a formula* › `=$G2="F"` › red fill. The `$` before G keeps the column fixed while the row changes, so the whole row is coloured.

</details>

### P2. **Word – mail merge.** You must send 40 personalised internship acceptance letters. List the steps from data to finished letters, including one rule that adds "Dear Mr." or "Dear Ms." based on a Gender column.

<details><summary>Model solution</summary>

1. Prepare an Excel sheet with headers: Title, FirstName, LastName, Gender, Department, StartDate.
2. In Word: Mailings › Start Mail Merge › Letters.
3. Select Recipients › Use an Existing List › choose the workbook and sheet.
4. Write the letter and Insert Merge Field for FirstName, Department, StartDate.
5. Rules › If…Then…Else: *If Gender = Male then "Dear Mr." else "Dear Ms."* followed by «LastName».
6. Preview Results to check several records; use Find Recipient to test edge cases.
7. Finish & Merge › Edit Individual Documents (to review) or Print / Send Email Messages.

</details>

### P3. **PowerPoint + OneDrive – team pitch.** Your group of four must build a 6-slide pitch together in one week. Describe the setup, collaboration workflow and two features you will use to make the deck engaging.

<details><summary>Model solution</summary>

- Save the deck to a shared OneDrive/Teams folder; Share › *Can edit* link for the three teammates.
- Assign slides in a Teams channel; co-author live (each person's cursor shows their name) and use comments with @mentions.
- Use Version History to roll back mistakes.
- Engagement: a **Summary Zoom** agenda slide for non-linear navigation and **Morph** between the problem and solution slides; Designer for consistent layouts.
- Final rehearsal with Rehearse with Coach / Rehearse Timings, then export a PDF copy.

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
