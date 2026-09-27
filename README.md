# stefanchristensen.me

Personal website built with [Astro](https://astro.build). Editorial design with Fraunces + Inter typography, collapsible identity rail, and markdown-based blog posts.

## Requirements

- Node.js 22.12 or newer (the GitHub Pages workflow uses Node 22)
- npm

## Quick start

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # static output in dist/
```

## Production-like local demo

```bash
npm ci
npm run validate
npm run preview -- --host 127.0.0.1 --port 4322
```

Open `http://127.0.0.1:4322/` and walk the main demo surface:

- `/`
- `/about/`
- `/experience/`
- `/now/`
- `/posts/`
- a representative `/posts/<slug>/`
- `/rss.xml`, `/sitemap.xml`, `/llms.txt`, `/llms-full.txt`

Browser QA checklist before an external demo:

- Desktop and mobile widths render without horizontal overflow.
- Rail collapse/expand, section tracking, and theme toggle work.
- Post reading progress moves while scrolling a post.
- CV PDF link resolves.
- RSS, sitemap, `llms.txt`, and markdown post mirrors return HTTP 200.

## Validation and release checklist

`npm run validate` runs `npm audit`, Astro type/content checks, verifies OG cards are fresh for the default card and published posts, and builds the static site.

When publishing content changes:

1. Refresh OG cards with `npm run og`.
2. Re-run `npm run validate`.
3. Commit the markdown/content changes and any refreshed `public/og/*.png` files together.

The GitHub Actions workflow runs `npm ci` and `npm run validate`, then deploys `dist/` to GitHub Pages on pushes to `main` or manual dispatch. Actual Pages settings, DNS for `stefanchristensen.me`, and HTTPS enforcement need to be checked in GitHub/domain admin tools; do not put secrets in this repository.

## Public copy decisions before external demos

Confirm these owner decisions before treating the public site as current:

- Whether the homepage “open to what is next” positioning fits the audience.
- Whether `/now/` should still show “Last updated: July 2026”.
- Whether LinkedIn-only contact is enough, or whether direct email/calendaring should be added.
- Whether the displayed metrics and testimonials are approved for public use as written.
- Which draft posts, if any, should be published; drafts remain hidden until `draft: false`.

## Adding a new post

Create `src/content/posts/your-post-slug.md`:

```yaml
---
title: "Your Post Title"
date: 2026-05-07
draft: true
tags: ["topic"]
categories: ["Category"]
description: "One-line description."
---

Your markdown content here.
```

Set `draft: false` when ready to publish.
