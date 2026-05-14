# AVHS IB Pages

Public-facing static website for the International Baccalaureate program at **Arroyo Valley High School** in San Bernardino, CA. Built to live on GitHub Pages — no build step, no framework, just HTML / CSS / a tiny bit of JS.

This is the parent-and-student-facing site. It's separate from `avhs-ib-hub` (the internal coordinator/teacher/student management app).

## Site map

| Page | Path | For |
|------|------|-----|
| Home | `index.html` | Everyone — landing page |
| About IB | `about.html` | Anyone wanting the full overview |
| MYP | `myp.html` | Families of 9th–10th graders |
| Diploma | `diploma.html` | Families of 11th–12th graders |
| Subjects | `subjects.html` | Course selection |
| Core | `core.html` | TOK · Extended Essay · CAS |
| Assessment | `assessment.html` | Grading, IB exams, college credit |
| Parents | `parents.html` | Family-focused, includes Spanish section |
| Students | `students.html` | Student-focused, honest tone |
| Calendar | `calendar.html` | Year-by-year timeline |
| Resources | `resources.html` | Curated links + study tools |
| FAQ | `faq.html` | 30 most common questions |
| Contact | `contact.html` | Coordinator info + how to apply |
| 404 | `404.html` | Friendly missing-page fallback |

## File structure

```
avhs-ib-pages/
├── index.html
├── about.html
├── myp.html
├── diploma.html
├── subjects.html
├── core.html
├── assessment.html
├── parents.html
├── students.html
├── calendar.html
├── resources.html
├── faq.html
├── contact.html
├── 404.html
├── .nojekyll          ← tells GitHub Pages to skip Jekyll processing
├── .gitignore
├── README.md
└── assets/
    ├── css/main.css   ← single theme file
    ├── js/main.js     ← mobile nav, current-page highlight, anchor scroll
    └── img/           ← (empty — drop the GLA crest / hero photos here when you have them)
```

## Design system

- **Colors:** Hawks navy (`#0a1a3a` / `#0f2557`) + gold (`#fcb316`), cream background, charcoal body text.
- **Typography:** Source Serif 4 (headings, editorial weight) + Inter (body, accessible sans). Both via Google Fonts.
- **Components:** cards, callouts, hexagon subject grid, timeline, FAQ accordions, stat strips, bilingual blocks. All defined in `assets/css/main.css`.
- **Responsive:** mobile-first, breakpoints at 880px (nav) and 768px / 700px (layout collapses).
- **Accessibility:** semantic HTML, skip-link, focus-visible outlines, `aria-current` on nav, sufficient contrast, prefers-reduced-motion respected.
- **Print:** every page has a print stylesheet — clean output for parents who like paper.

## Stuff you'll want to fill in yourself

These are intentional `[update with ...]` placeholders or generic descriptions that should be customized to the current AVHS reality:

1. **Coordinator email** on `contact.html` — currently `[update with IB Coordinator email]`.
2. **Current course offerings** on `subjects.html` — the list shows typical IB courses; confirm which AVHS is actually running this year and prune what isn't.
3. **Current-year specifics on `calendar.html`** — the structure is evergreen, but actual exam dates / parent night dates change yearly.
4. **Magnet lottery dates** on `contact.html` — these are set by SBCUSD annually.
5. **GLA crest / hero photos** in `assets/img/` — currently the brand uses a text-based "IB" crest tile. Replace with a real logo when you have one.
6. **Memory** : optional — when you want to swap to a custom domain (e.g. `ibatav.org`), drop a `CNAME` file with the domain in it and configure DNS.

## Deploy on GitHub Pages

The fastest path:

```bash
# 1. From this folder
git init
git add .
git commit -m "Initial AVHS IB public site"

# 2. Create a new repo on github.com (suggest: avhs-ib-pages)
# 3. Connect and push
git remote add origin https://github.com/knightofspades00/avhs-ib-pages.git
git branch -M main
git push -u origin main
```

Then on github.com:
1. Go to **Settings → Pages**.
2. Source: **Deploy from branch**.
3. Branch: **main** / folder: **`/ (root)`**.
4. Save. Site will publish at `https://knightofspades00.github.io/avhs-ib-pages/` in ~1 minute.

For a custom domain (e.g. `ib.avhshawkathletics.com` or similar):
1. Add a `CNAME` file at the project root with just the domain on one line.
2. Configure DNS at your registrar — CNAME record from the subdomain to `knightofspades00.github.io`.
3. Wait for DNS propagation and HTTPS provisioning (5 min – 24 hrs).

## Editing tips

- Every page has the same nav and footer. If you change a link, change it in all 14 HTML files. (A simple find-and-replace handles this; or migrate to includes later if it gets painful.)
- The Spanish section currently lives on `parents.html#espanol`. If demand justifies it, the next move is a parallel `padres.html` and a real language switcher — the JS in `main.js` is already wired to support a `[data-lang-toggle]` button.
- No build step. Open any HTML file in a browser and you're seeing exactly what GitHub Pages will serve.

## What this site is NOT

- It is not the IB coordinator's internal management tool. That's `avhs-ib-hub` (Express app, separate repo, internal use).
- It is not an official IB-published site. Authoritative IB information lives at [ibo.org](https://www.ibo.org).
- It is not a replacement for direct conversation with the IB Coordinator. The site funnels families toward that conversation — it doesn't replace it.

## License + attribution

Content authored for AVHS use. The **IB**, **International Baccalaureate**, **IB World School**, **MYP**, and **DP** trademarks are property of the International Baccalaureate Organization. This site is an unofficial student/family resource and should not be construed as official IB communication.

— *Maintained by the AVHS IB office.*
