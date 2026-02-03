# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

This is a personal professional website for Stefan Christensen, built with Hugo static site generator and the "hello-friend-ng" theme. The site is deployed to GitHub Pages with a custom domain (stefanchristensen.me) and focuses on executive positioning in FinTech/payments leadership.

## Development Commands

### Local Development Server
```bash
hugo server -D
```
Visit http://localhost:1313 to preview the site. The `-D` flag includes draft posts.

### Build for Production
```bash
hugo --gc --minify
```
Output goes to `public/` directory. The `--gc` flag runs garbage collection, `--minify` optimizes assets.

### Create New Content
```bash
# Create a new blog post
hugo new posts/post-title.md

# Or manually create in content/posts/ with proper frontmatter
```

## Architecture

### Content Structure
- **Homepage**: `content/_index.md` - Landing page with professional bio
- **About Page**: `content/about.md` - Extended narrative and philosophy
- **Experience Page**: `content/experience.md` - CV/work history
- **Blog Posts**: `content/posts/*.md` - Thought leadership articles

All content uses markdown with Hugo frontmatter (YAML between `---` delimiters).

### Theme Architecture
Uses "hello-friend-ng" theme as a git submodule at `themes/hello-friend-ng/`. The theme is NOT "hermit-v2" as mentioned in README.md - the actual theme configured in `hugo.toml` is "hello-friend-ng".

**Important**: When cloning or pulling updates, always use:
```bash
git submodule update --init --recursive
```

### Configuration
Main configuration in `hugo.toml`:
- Site metadata (title, description, keywords)
- Theme selection and parameters
- Menu structure (About, Experience, Blog)
- Social links (LinkedIn, Email)
- Syntax highlighting settings
- Privacy settings

### Deployment Pipeline
GitHub Actions workflow at `.github/workflows/hugo.yaml`:
1. Triggers on push to `main` branch or manual dispatch
2. Uses Hugo v0.128.0 Extended
3. Initializes theme submodule
4. Builds with `--gc --minify`
5. Deploys to GitHub Pages

The workflow handles submodule initialization automatically, so theme files are always available during CI builds.

### Custom Domain
- Domain configured via `static/CNAME`: `stefanchristensen.me`
- DNS should point to GitHub Pages IPs
- HTTPS enforced via GitHub Pages settings

## Content Frontmatter Pattern

All content pages should include:
```yaml
---
title: "Page Title"
date: 2026-02-01
draft: false  # Set to true to exclude from production builds
tags: ["tag1", "tag2"]
categories: ["Category"]
---
```

Posts with `draft: true` are only visible when running `hugo server -D`.

## Key Files to Know

- `hugo.toml` - All site configuration (URLs, menus, theme params, social links)
- `static/CNAME` - Custom domain configuration
- `.github/workflows/hugo.yaml` - Deployment automation
- `.gitmodules` - Theme submodule reference

## Hugo-Specific Patterns

### URL Structure
- Hugo generates URLs based on content organization
- `content/_index.md` → `/` (homepage)
- `content/about.md` → `/about/`
- `content/posts/post-name.md` → `/posts/post-name/`

### Menu Configuration
Navigation menu items are defined in `hugo.toml` under `[menu]` sections, NOT derived from content automatically.

### Taxonomies
Site uses two taxonomies (defined in `hugo.toml`):
- Tags: For topical categorization
- Categories: For higher-level grouping

## Theme Limitations

The hello-friend-ng theme is a minimal theme with specific constraints:
- Limited built-in shortcodes
- Custom CSS would need to override theme styles
- Layout changes require creating override files in `layouts/` directory

To update the theme:
```bash
git submodule update --remote themes/hello-friend-ng
git add themes/hello-friend-ng
git commit -m "Update hello-friend-ng theme"
```

## Deployment Notes

- Site automatically deploys on push to `main` branch
- GitHub Actions build can be monitored in the "Actions" tab
- DNS changes can take 24-48 hours to propagate
- HTTPS certificate is managed automatically by GitHub Pages

## Content Guidelines

Based on existing content, the site emphasizes:
- Executive-level positioning (SVP Product & Engineering)
- Deep expertise in FinTech, payments, European payment rails
- Organizational scaling and leadership
- Builder/operator identity with consultant and quantum physicist background
- Authentic voice, avoiding excessive promotion
