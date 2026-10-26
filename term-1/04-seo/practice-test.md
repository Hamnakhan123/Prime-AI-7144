# 📝 Practice Test · Optimize Web for Search Engines (SEO)

> [Prime AI – Software Engineering with AI](../../README.md) › [Term 1](../README.md) › [Optimize Web for Search Engines (SEO)](README.md) › **Practice test**

**Format:** Part A has 20 multiple-choice questions (1 mark each). Part B has 3 practical questions (10 marks each). Suggested time: 60 minutes. Attempt everything first, then open the answers.

## Part A — Multiple-choice questions

**1. Which stage happens FIRST when a search engine discovers a new page?**

- A) Ranking
- B) Indexing
- C) Crawling
- D) Serving ads

<details><summary>Answer</summary>

**C** — Bots must fetch (crawl) a page before it can be indexed and ranked.

</details>

**2. What does `site:karachitutors.pk physics` return?**

- A) Ads for physics
- B) Pages from that domain that match "physics"
- C) All physics websites in Pakistan
- D) Backlinks to the site

<details><summary>Answer</summary>

**B** — site: restricts results to one domain.

</details>

**3. Which keyword is most clearly TRANSACTIONAL?**

- A) what is photosynthesis
- B) karachi tutors login
- C) book maths home tutor dha karachi
- D) history of algebra

<details><summary>Answer</summary>

**C** — It shows intent to take an action / buy.

</details>

**4. A good title tag is usually about:**

- A) 10–20 characters
- B) 50–60 characters
- C) 150–160 characters
- D) As long as possible

<details><summary>Answer</summary>

**B** — Longer titles are often truncated on the results page.

</details>

**5. The meta description mainly influences:**

- A) Crawl budget
- B) Click-through rate from results
- C) Page speed
- D) Indexing of images

<details><summary>Answer</summary>

**B** — It is shown as a snippet and persuades users to click.

</details>

**6. How many `<h1>` elements should a typical page have?**

- A) None
- B) One
- C) One per paragraph
- D) At least five

<details><summary>Answer</summary>

**B** — One h1 that states the page topic is the clear convention.

</details>

**7. Which file tells crawlers which paths they may crawl?**

- A) sitemap.xml
- B) robots.txt
- C) manifest.json
- D) .htaccess only

<details><summary>Answer</summary>

**B** — robots.txt holds crawl rules; it is not a security mechanism.

</details>

**8. To keep a page OUT of the index, the reliable method is:**

- A) Disallow it in robots.txt
- B) A `noindex` robots meta tag (page must remain crawlable)
- C) Remove its title
- D) Add more keywords

<details><summary>Answer</summary>

**B** — A disallowed page cannot be crawled, so its noindex would never be seen.

</details>

**9. Which link attribute should mark a paid placement?**

- A) `rel="nofollow"` only
- B) `rel="sponsored"`
- C) `target="_blank"`
- D) `rel="canonical"`

<details><summary>Answer</summary>

**B** — sponsored identifies paid/advertising links.

</details>

**10. Which is a WHITE-hat way to earn backlinks?**

- A) Buying 1,000 links
- B) Publishing original research that others cite
- C) Hidden links in footers of client sites
- D) Automated blog comments

<details><summary>Answer</summary>

**B** — Linkable assets earn links naturally.

</details>

**11. Mobile-first indexing means Google:**

- A) Ranks only mobile apps
- B) Primarily uses the mobile version of content for indexing and ranking
- C) Ignores desktop users
- D) Needs a separate m. site

<details><summary>Answer</summary>

**B** — A responsive site serves the same content to both.

</details>

**12. A good LCP score is:**

- A) ≤ 2.5 seconds
- B) ≤ 10 seconds
- C) ≤ 0.1
- D) ≤ 200 ms

<details><summary>Answer</summary>

**A** — LCP measures loading of the largest content element.

</details>

**13. CLS measures:**

- A) Server response time
- B) Unexpected layout shifts (visual stability)
- C) Number of links
- D) Click rate

<details><summary>Answer</summary>

**B** — Cumulative Layout Shift ≤ 0.1 is good.

</details>

**14. Structured data is best added in which format?**

- A) Microsoft Word
- B) JSON-LD
- C) CSV
- D) Plain comments

<details><summary>Answer</summary>

**A** — JSON-LD is the format Google recommends.

</details>

**15. NAP consistency matters most for:**

- A) International SEO
- B) Local SEO
- C) Image SEO
- D) Video SEO

<details><summary>Answer</summary>

**B** — Name, Address and Phone must match across listings.

</details>

**16. Which hreflang value targets Urdu speakers in Pakistan?**

- A) `ur-pk`
- B) `pk-ur`
- C) `urdu`
- D) `en-ur`

<details><summary>Answer</summary>

**A** — language code then optional region code.

</details>

**17. CTR for 40 clicks from 2,000 impressions is:**

- A) 0.5%
- B) 2%
- C) 20%
- D) 50%

<details><summary>Answer</summary>

**B** — 40 ÷ 2000 = 0.02 = 2%.

</details>

**18. In GA4, engagement rate is:**

- A) Bounces ÷ sessions
- B) Engaged sessions ÷ sessions
- C) Clicks ÷ impressions
- D) Users ÷ pages

<details><summary>Answer</summary>

**B** — GA4 bounce rate = 1 − engagement rate.

</details>

**19. Which tool shows the actual search queries that brought impressions and clicks to your site?**

- A) Google Search Console
- B) Lighthouse
- C) Screaming Frog
- D) Canva

<details><summary>Answer</summary>

**A** — The Performance report lists queries, clicks, impressions, CTR and position.

</details>

**20. The safest way to use AI tools such as ChatGPT in SEO is to:**

- A) Publish thousands of unedited AI pages
- B) Use them for drafts, ideas and meta suggestions, then fact-check and add real expertise
- C) Hide AI text in white font
- D) Generate fake reviews

<details><summary>Answer</summary>

**B** — Helpful, accurate, people-first content is what ranks.

</details>

## Part B — Practical / coding questions

### P1. **On-page fix.** Here is the `<head>` and top of a page targeting the keyword **"physics tuition karachi"**:
```html
<title>Home</title>
<h1>Welcome!!!</h1>
<img src="IMG_0042.jpg">
<p>We are the best. Click here for more.</p>
```
Rewrite it with an optimised title, meta description, h1, image and opening paragraph, and explain each change.

<details><summary>Model solution</summary>

```html
<title>Physics Tuition in Karachi – O & A Level Home Tutors | Karachi Tutors</title>
<meta name="description" content="Qualified physics tutors for O and A Level students in Karachi. Home or online classes, free trial lesson. Book your physics tuition today.">
<h1>Physics Tuition in Karachi for O & A Level Students</h1>
<img src="physics-tutor-karachi.webp" alt="Physics tutor explaining circuits to an A Level student" width="800" height="533" loading="lazy">
<p>Our physics tutors in Karachi help O and A Level students master mechanics, electricity and waves with
one-to-one home or online lessons. <a href="/fees">See our physics tuition fees</a>.</p>
```
- Title: keyword first, location, benefit, brand last, ~70 → trim to fit if needed (marks 2).
- Description: 120–160 chars, keyword + call to action (2).
- h1: one clear topic heading containing the keyword naturally (2).
- Image: descriptive file name, meaningful alt, dimensions, lazy (2).
- Paragraph: keyword early, real value, descriptive internal link instead of "click here" (2).

</details>

### P2. **Robots and indexing.** A developer added `Disallow: /blog/` to robots.txt to "remove old blog posts from Google",
but the posts still show in results with no description. Explain why, and give the correct fix. Also write a robots.txt
that blocks `/admin/` for all bots, allows everything else and points to the sitemap.

<details><summary>Model solution</summary>

robots.txt controls **crawling**, not **indexing**. Disallowed URLs can still be indexed if other pages link to them;
Google just cannot read them, so it shows the bare URL without a snippet. Fix: **allow crawling**, add
`<meta name="robots" content="noindex">` (or an `X-Robots-Tag: noindex` header) to the old posts – or return
**410/404** if they are gone, or **301-redirect** them to a relevant newer post – and request removal in Search Console
for urgent cases.

```text
User-agent: *
Disallow: /admin/

Sitemap: https://karachitutors.pk/sitemap.xml
```
Marks: crawl vs index explanation (4), correct fix (3), valid robots.txt (3).

</details>

### P3. **Measure and decide.** Search Console shows for three pages over 28 days:

| Page | Impressions | Clicks | Avg position |
|---|---|---|---|
| /maths-tuition | 12,000 | 360 | 4.2 |
| /physics-tuition | 9,500 | 57 | 6.8 |
| /blog/study-tips | 30,000 | 150 | 14.5 |

Calculate CTR for each, identify the biggest opportunity and propose two actions for it.

<details><summary>Model solution</summary>

CTR: maths 360/12,000 = **3.0%**; physics 57/9,500 = **0.6%**; blog 150/30,000 = **0.5%**.

- **/physics-tuition** ranks on page 1 (≈ 6.8) but has a very low CTR → its **snippet** is weak. Actions: rewrite the title and
  meta description to match the query intent (price, "free trial", location), add FAQ structured data where eligible, check
  that the title is not truncated.
- **/blog/study-tips** has huge impressions but sits on page 2 (≈ 14.5) → improve **content depth and internal links**
  from the home page, update it with fresher information, target the exact long-tail queries Search Console lists.

The biggest *quick* win is physics (already page 1). Marks: three correct CTRs (3), correct diagnosis (3), two sound
actions for each opportunity (4).

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
