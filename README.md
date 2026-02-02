# Stefan's Professional Website

A minimalist, Scandinavian-inspired professional website built with Hugo and the Hermit V2 theme. Designed for executive positioning with focus on payments expertise, organizational scaling, and leadership.

## Overview

- **Theme**: Hermit V2 (minimalist Hugo theme)
- **Hosting**: GitHub Pages with custom domain
- **Design**: Black and white Scandinavian aesthetic
- **Features**: Blog, experience/CV page, responsive design

## Prerequisites

- Git
- Hugo Extended (v0.128.0 or later)
- GitHub account

## Local Development Setup

### 1. Clone the Repository

```bash
git clone --recurse-submodules https://github.com/yourusername/yourrepo.git
cd yourrepo
```

If you already cloned without submodules:

```bash
git submodule update --init --recursive
```

### 2. Install Hugo

**macOS:**
```bash
brew install hugo
```

**Linux:**
```bash
wget https://github.com/gohugoio/hugo/releases/download/v0.128.0/hugo_extended_0.128.0_linux-amd64.deb
sudo dpkg -i hugo_extended_0.128.0_linux-amd64.deb
```

**Windows:**
```bash
choco install hugo-extended
```

### 3. Run Local Development Server

```bash
hugo server -D
```

Visit `http://localhost:1313` to see your site.

### 4. Build for Production

```bash
hugo --gc --minify
```

The site will be built to the `public/` directory.

## Configuration

### Update Your Domain

1. Edit `hugo.toml` and change:
   ```toml
   baseURL = "https://yourdomain.com/"
   ```

2. Edit `static/CNAME` with your domain:
   ```
   yourdomain.com
   ```

### Update Social Links

In `hugo.toml`, update the social links section:

```toml
[[params.social]]
  name = "LinkedIn"
  url = "https://linkedin.com/in/yourprofile"
  
[[params.social]]
  name = "Email"
  url = "mailto:your.email@domain.com"
```

### Update Author Information

In `hugo.toml`, modify:

```toml
author = "Your Name"
description = "Your professional description"
```

## GitHub Pages Deployment

### 1. Create GitHub Repository

Create a new repository named `yourusername.github.io` (for user site) or any name for a project site.

### 2. Enable GitHub Pages

1. Go to repository **Settings → Pages**
2. Under "Build and deployment":
   - **Source**: GitHub Actions
3. Save settings

### 3. Configure GitHub Actions

The workflow file is already included at `.github/workflows/hugo.yaml`. It will automatically:
- Build your Hugo site on every push to `main`
- Deploy to GitHub Pages
- Handle the Hermit V2 theme submodule

### 4. Push Your Code

```bash
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/yourrepo.git
git push -u origin main
```

The site will automatically build and deploy. Check the **Actions** tab to monitor progress.

### 5. Custom Domain Setup (Optional)

**DNS Configuration:**

Add these records to your domain's DNS:

For apex domain (yourdomain.com):
```
A     @     185.199.108.153
A     @     185.199.109.153
A     @     185.199.110.153
A     @     185.199.111.153
```

For www subdomain:
```
CNAME www   yourusername.github.io
```

**GitHub Configuration:**

1. Go to repository **Settings → Pages**
2. Under "Custom domain", enter your domain
3. Wait for DNS check to complete
4. Enable "Enforce HTTPS"

**Propagation Time:** DNS changes can take 24-48 hours to fully propagate.

## Content Management

### Adding Blog Posts

Create a new post:

```bash
hugo new posts/my-new-post.md
```

Or manually create a file in `content/posts/` with front matter:

```markdown
---
title: "Post Title"
date: 2026-02-01
draft: false
tags: ["payments", "leadership"]
categories: ["FinTech"]
---

Your content here...
```

### Updating Experience/CV

Edit `content/experience.md` to add your work history, education, and achievements.

To add a downloadable PDF resume:
1. Place your PDF in `static/files/stefan-cv.pdf`
2. The link in `experience.md` will automatically work

### Updating About Page

Edit `content/about.md` to modify your professional narrative and philosophy.

## Customization

### Styling

The site uses a custom black and white Scandinavian theme. To modify:

Edit `assets/scss/custom.scss` to adjust:
- Colors (strict monochrome palette)
- Typography (font sizes, spacing)
- Layout (max-width, padding)

### Theme Configuration

The Hermit V2 theme settings are in `hugo.toml`. Key parameters:
- `homeSubtitle`: Text shown on homepage
- `dateFormat`: How dates are displayed
- `enableAvatar`: Set to `false` for text-only

## Project Structure

```
stefan-site/
├── .github/
│   └── workflows/
│       └── hugo.yaml          # GitHub Actions deployment
├── archetypes/
│   └── default.md             # Template for new content
├── assets/
│   └── scss/
│       └── custom.scss        # Custom styling
├── content/
│   ├── _index.md              # Homepage
│   ├── about.md               # About page
│   ├── experience.md          # CV/Experience
│   └── posts/                 # Blog posts
├── static/
│   ├── CNAME                  # Custom domain
│   └── files/                 # Downloadable files (PDFs)
├── themes/
│   └── hermit-v2/             # Theme submodule
├── .gitignore
├── .gitmodules
├── hugo.toml                  # Main configuration
└── README.md
```

## Troubleshooting

### Theme Not Loading

Ensure the submodule is initialized:
```bash
git submodule update --init --recursive
```

### Build Fails in GitHub Actions

Check that:
1. Repository settings have GitHub Pages source set to "GitHub Actions"
2. The workflow file is in `.github/workflows/hugo.yaml`
3. You've pushed to the `main` branch

### Custom Domain Not Working

Verify:
1. DNS records are correctly configured
2. `static/CNAME` contains your domain
3. DNS propagation is complete (can take 24-48 hours)
4. HTTPS is enabled in GitHub Pages settings

### Local Server Shows 404

Make sure you're running from the project root:
```bash
cd stefan-site
hugo server -D
```

## Analytics (Optional)

To add Google Analytics or Plausible:

**Google Analytics:**
```toml
[params]
  googleAnalytics = "G-XXXXXXXXXX"
```

**Plausible:**
Add to `layouts/partials/head.html`:
```html
<script defer data-domain="yourdomain.com" src="https://plausible.io/js/script.js"></script>
```

## Performance

The site is optimized for speed:
- Static HTML generation
- Minified CSS/JS
- No JavaScript dependencies
- Optimized for mobile

Expected Lighthouse scores:
- Performance: 95+
- Accessibility: 100
- Best Practices: 100
- SEO: 100

## Maintenance

### Updating Hugo

```bash
# macOS
brew upgrade hugo

# Linux/Windows
# Download latest from https://github.com/gohugoio/hugo/releases
```

### Updating Theme

```bash
git submodule update --remote themes/hermit-v2
git add themes/hermit-v2
git commit -m "Update Hermit V2 theme"
git push
```

## Support

For Hugo questions: https://gohugo.io/documentation/  
For Hermit V2 theme: https://github.com/1bl4z3r/hermit-V2  
For GitHub Pages: https://docs.github.com/pages

## License

Content © Stefan. All rights reserved.  
Hermit V2 theme: MIT License
