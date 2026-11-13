# Portfolio Site

> Maintainer doc. Static site, hosted by GitHub Pages at sajadxdp.github.io.
> Codebase: `~/sajadxdp.github.io` | Stack: vanilla HTML + CSS + JS, no build.

## 1. What this product is

Personal portfolio for Sajad: Home, About, Projects (Lexora, EsenceLab,
HookFlow, neuDB), Contact. Goal: bring visitors to GitHub / LinkedIn /
email contact. No blog, no feed, no archive, no subpages.

## 2. How it works

- Four pages: `index.html`, `about.html`, `projects.html`, `contact.html`.
  No 404 page, no project subdirectories. Every project title links its
  GitHub repo directly.
- `style.css` (edition 8, dark-only charcoal: bg `#141516`, text `#c9cdd2`,
  bright `#e9ecef`, muted `#8e9399`, accent `#e0855a`; 50rem document
  column, 40rem read column, flat title rows with dashed rules,
  fluid gutter and h1, centered footer, zero animations)
- `script.js` (footer year, active-nav marking, mailto copy button)
- Discovery: `sitemap.xml` (4 urls), `robots.txt`, OG meta, `favicon.svg`
- No templating: header/nav/footer duplicated per file (drift risk, see roadmap)

## 3. User guide

### Serve locally
```bash
python3 -m http.server -d ~/sajadxdp.github.io 8000
```

### Edit content
- Hero openers are pinned: `Hi, I'm Sajad.` (home), `Hi. I'm Sajad.` (about).
- Project blurbs: `index.html` + `projects.html` (keep in sync with the
  GitHub profile README)
- Styles/nav: `style.css`, each page's `<nav>`

### Deploy
Push `main` → GitHub Pages serves the repo root. Verify: `/sitemap.xml`,
`/robots.txt`.

## 4. Operations

- No env, no health endpoint (static). Monitor via Pages status + manual
  link check.
- Keep `sitemap.xml` `lastmod` in sync when a page's content changes
  (currently 2026-11-13).
- The verification harness (check, smoke, contrast, responsive, live-audit
  scripts) lives outside the repo in `~/shots/pf-harness/`.
- Roadmap: link-check CI, HTML validator run. Both are dev-time only; the
  site itself stays build-free.

## 5. Verification

```bash
python3 -m http.server -d . 8000
```
Then check `/`, `/about.html`, `/projects.html`, `/contact.html`,
`/sitemap.xml`.
