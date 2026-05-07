# stefanchristensen.me

Personal website built with [Astro](https://astro.build). Editorial design with Fraunces + Inter typography, collapsible identity rail, and markdown-based blog posts.

## Quick start

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # static output in dist/
```

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
