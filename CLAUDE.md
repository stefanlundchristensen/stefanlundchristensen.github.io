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

First-person personal essays with real stories. The voice is honest, specific, and willing to say where things went wrong. Posts can be good in different ways — there is no single template.

#### What good posts share
- **Specificity over abstraction.** €29.15 traced through six systems. A 40-page guide replaced by a CLI. 9pm on a Saturday. Pitchfork-style scoring. The concrete detail is what earns the reader's trust.
- **Admitting where you got it wrong.** "I've erred on the softer side more than I'd like." "We learned this the expensive way." The posts that land hardest are the ones that name a real mistake, not a humble-brag.
- **Analogies that teach.** "Pair writing, like a parent at the kitchen table." The Taylor expansion as a business decision tool. These work when they're drawn from lived experience, not invented for the post.
- **The cost is named.** Good decisions have costs. The posts say what the cost was: "saying no meant disappointing people who had real needs and real timelines." This is what separates the writing from thought-leadership boilerplate.

#### Openings
Every post needs to earn the next paragraph. Several patterns work:
- **Concrete numbers:** "The customer expected €110.37. What they saw was €81.22."
- **Story already in motion:** "We did everything right."
- **Personal admission:** "Nobody told me a PhD in quantum physics would be useful in FinTech."
- **Quiet observation:** "Most of what I like, I was given before I knew I had a choice."
- **Provocation:** "The 1:5 PM-to-engineer ratio wasn't a physics constant."

#### Closings
End with identity or experience, not summary. Several patterns work:
- **Self-reflection:** "I keep learning this the same way every time: by being too far on one side, noticing the gap, and walking back toward the middle."
- **The lesson applied forward:** "the lesson has held in every market we've entered since."
- **Identity statement:** "I've never been able to get interested in music designed to be liked."
- **The work itself:** "The smooth experience on top exists only because someone wanted that."

Avoid: closers that land on a one-line punchline, closers that summarize the post, closers that address the reader as a call to action.

#### Genre variation
Posts don't all need to be the same shape. The body of work includes:
- **Personal essays** (physicist, what-i-listen-to, how-i-use-ai) — the lens is the author's experience, the structure follows the thinking.
- **Operational case studies** (european-payment-rails, payments-platform, platform-engineering) — a concrete story drives the argument, with lessons drawn from what happened.
- **Conceptual arguments** (pm-engineer-ratio, when-cost-of-coding, agents-as-users) — a thesis is developed across the post, supported by examples and external evidence.
- **Prescriptive how-tos** (goal-setting, three-lanes) — numbered steps or structured formats, where bullet lists and bold labels earn their place.

Each genre has different rules about structure, formatting, and length. A personal essay doesn't need ## sections; a prescriptive post benefits from them. Bullet lists work in a how-to; they undercut an essay. Match the format to the genre.

#### Structural patterns that work
- **Story → framework → story.** Open with a specific experience, extract the principle, then show it applied in a second context.
- **Problem → honest failure → what we learned.** The failure is what makes the learning credible.
- **Concept → concrete case → implications.** State the thesis, then test it against a real example.
- **Personal lens on a professional topic.** The physicist post, the how-I-use-AI post. The author's specific background is the frame.

#### External references
Link to external reports and sources (DX, DORA, Lenny's podcast, specific people) when they strengthen the argument. Attribution is a sign of intellectual honesty, not weakness. Company names (McKinsey, Amazon) are fine when they're part of the author's personal story.

### AI Signal Removal
- Em dashes: target 1–3 per post
- Avoid: `optimize for`, `surface` as verb, `show up` figuratively, `reframing`
- Avoid: two-sentence contrast ("It's not X. It's Y."), triple parallels, punchy short closers
- Watch qualifiers: `actually`, `genuinely`, `deliberately` (flag if 3+ per post)
- Vary closing section headings across posts — don't repeat the same formula title

## Analytics
GoatCounter (privacy-focused): `superhuman.goatcounter.com`

## URL Structure
- `/` — homepage (single-page with all sections)
- `/about/`, `/experience/`, `/now/` — static pages
- `/posts/` — writing index
- `/posts/[slug]/` — individual posts
- `/rss.xml` — RSS feed
