# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Personal professional website for Stefan Christensen, built with Astro and deployed to GitHub Pages. The design is "AB1 v2 — Anchored Column": a warm editorial layout with a sticky collapsible left identity rail and a generous serif reading column. Typography uses Fraunces (display) + Inter (body) with a Clay (#c2410c) accent.

## Development Commands

```bash
# Local development server
npm run dev

# Build for production (output to dist/)
npm run build

# Preview production build locally
npm run preview
```

## Architecture

### Framework
Astro with React islands for interactive components. Static output deployed to GitHub Pages.

### Content Structure
- **Blog posts**: `src/content/posts/*.md` — standard markdown with frontmatter (title, date, draft, tags, categories, description)
- **Site data**: `src/data/stefan.ts` — bio, experience, contact, propositions
- **Static pages**: `src/pages/about.astro`, `experience.astro`, `now.astro` — HTML content in Astro components

### Key Directories
```
src/
  content/posts/     ← markdown blog posts (content collection)
  content.config.ts  ← collection schema
  data/stefan.ts     ← site-wide content data
  components/        ← Rail, TagFilter (React islands)
  layouts/           ← Base, Post, Page (Astro layouts)
  pages/             ← routes (index, posts/[slug], about, experience, now)
  styles/            ← tokens.css (design tokens), global.css (styles)
public/              ← CNAME, robots.txt, cv.json, files/
```

### Interactive Components (React Islands)
- `RailClient.tsx` — collapsible rail with section tracking (client:load)
- `TagFilter.tsx` — writing section tag filter chips (client:visible)

### Design Tokens
Defined in `src/styles/tokens.css` as CSS custom properties:
- Colors: `--bg` (#f5f3ee), `--ink` (#1a1a1a), `--accent` (#c2410c), plus opacity variants
- Typography: `--font-display` (Fraunces), `--font-body` (Inter)
- Spacing: page padding, rail widths, section gaps
- Motion: rail transition, hover speeds

### Deployment
GitHub Actions workflow at `.github/workflows/astro.yaml`:
1. Triggers on push to `main` or manual dispatch
2. `npm ci` → `npx astro build`
3. Deploys `dist/` to GitHub Pages

Custom domain: `stefanchristensen.me` (configured via `public/CNAME`)

## Content Guidelines

### Blog Post Frontmatter
```yaml
---
title: "Post Title"
date: 2026-02-01
draft: false
tags: ["tag1", "tag2"]
categories: ["Category"]
description: "Brief description for SEO and post listings."
---
```

Posts with `draft: true` are excluded from production builds.

### Writing Style
- Essay format, not listicles — no bullet lists in body text
- No "Further Reading" sections, no LinkedIn/contact CTAs
- No company names — first-person experience ("we", "I")
- First-person personal essay with real stories
- Opening: problem or paradox. Closing: identity, not summary.

### AI Signal Removal
- Em dashes: target 1–3 per post
- Avoid: `optimize for`, `surface` as verb, `show up` figuratively, `reframing`
- Avoid: two-sentence contrast ("It's not X. It's Y."), triple parallels, punchy short closers
- Watch qualifiers: `actually`, `genuinely`, `deliberately` (flag if 3+ per post)

## Analytics
GoatCounter (privacy-focused): `superhuman.goatcounter.com`

## URL Structure
- `/` — homepage (single-page with all sections)
- `/about/`, `/experience/`, `/now/` — static pages
- `/posts/` — writing index
- `/posts/[slug]/` — individual posts
- `/rss.xml` — RSS feed
