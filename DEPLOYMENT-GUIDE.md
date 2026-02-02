# Complete Step-by-Step Deployment Guide

This guide will take you from zero to a live website in about 30 minutes.

---

## Prerequisites Checklist

Before you begin, make sure you have:

- [ ] GitHub account (free) - [Sign up here](https://github.com/signup)
- [ ] A custom domain purchased (e.g., from Namecheap, GoDaddy, Google Domains)
- [ ] Git installed on your computer ([Download here](https://git-scm.com/downloads))
- [ ] A text editor (VS Code, Sublime Text, or any editor)
- [ ] Terminal/Command Line access

---

## Part 1: Initial Setup (5 minutes)

### Step 1.1: Download and Extract Your Site

1. Download the `stefan-site.tar.gz` file from above
2. Extract it to a location on your computer (e.g., `~/Documents/stefan-site`)
3. Open Terminal/Command Prompt and navigate to this folder:
   ```bash
   cd ~/Documents/stefan-site
   ```

### Step 1.2: Update Your Personal Information

**Edit `hugo.toml`:**

Open the file in your text editor and change these lines:

```toml
# Line 1: Replace with YOUR domain
baseURL = "https://yourdomain.com/"

# Line 3: Update if you want different title
title = "Your Name - SVP Product & Engineering"

# Lines 12-13: Update with your info
author = "Your Name"
description = "Your professional description here"

# Line 16: Update with your tagline
homeSubtitle = "Your professional tagline here"

# Lines 24-25: Add your LinkedIn URL
[[params.social]]
  name = "LinkedIn"
  url = "https://linkedin.com/in/YOUR-PROFILE"
  
# Lines 27-28: Add your email
[[params.social]]
  name = "Email"
  url = "mailto:your.email@yourdomain.com"
```

**Edit `static/CNAME`:**

Replace the entire content with your domain:
```
yourdomain.com
```

**Edit `static/robots.txt`:**

Update line 4 with your domain:
```
Sitemap: https://yourdomain.com/sitemap.xml
```

### Step 1.3: Review and Customize Content

**Check these files and personalize them:**

1. `content/_index.md` - Your homepage
2. `content/about.md` - Your extended bio
3. `content/experience.md` - Complete this with your full CV

**Blog posts (optional now):**
- Review `content/posts/self-sufficient-teams.md`
- Review `content/posts/european-payment-rails.md`
- Set `draft: false` in the front matter when ready to publish
- Or delete them and write your own later

---

## Part 2: GitHub Repository Setup (5 minutes)

### Step 2.1: Create a New GitHub Repository

1. Go to [github.com](https://github.com) and log in
2. Click the **+** icon (top right) → **New repository**
3. Repository settings:
   - **Name**: `yourusername.github.io` (recommended) or any name
   - **Description**: "Professional website"
   - **Public** (required for free GitHub Pages)
   - **DO NOT** initialize with README, .gitignore, or license
4. Click **Create repository**

### Step 2.2: Initialize Git and Push Your Code

In your terminal (in the `stefan-site` folder):

```bash
# Initialize git repository
git init

# Add all files
git add .

# Make first commit
git commit -m "Initial commit"

# Rename branch to main
git branch -M main

# Add GitHub as remote (replace with YOUR repository URL)
git remote add origin https://github.com/yourusername/yourrepo.git

# Add the Hermit V2 theme as a submodule
git submodule add https://github.com/1bl4z3r/hermit-V2.git themes/hermit-v2

# Commit the submodule
git add .
git commit -m "Add Hermit V2 theme"

# Push to GitHub
git push -u origin main
```

**You may need to authenticate:**
- GitHub will prompt for username/password
- If using 2FA, you'll need a Personal Access Token instead of password
  - Go to GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
  - Generate new token with `repo` scope
  - Use this token as your password

---

## Part 3: Enable GitHub Pages (2 minutes)

### Step 3.1: Configure GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** tab (top right)
3. Click **Pages** in the left sidebar
4. Under **Build and deployment**:
   - **Source**: Select **GitHub Actions** (NOT "Deploy from a branch")
5. No need to click Save - it's automatic

### Step 3.2: Wait for Build to Complete

1. Click the **Actions** tab at the top
2. You should see a workflow running: "Deploy Hugo site to Pages"
3. Wait for it to finish (usually 1-2 minutes)
4. Green checkmark = success ✓
5. Red X = error (check the logs)

### Step 3.3: Test Your Site

Your site is now live at:
```
https://yourusername.github.io
```

Visit this URL and verify your site loads correctly.

---

## Part 4: Custom Domain Setup (15 minutes + DNS propagation time)

### Step 4.1: Add Custom Domain to GitHub

1. Still in **Settings → Pages**
2. Under **Custom domain**, enter your domain: `yourdomain.com`
3. Click **Save**
4. GitHub will check DNS configuration
5. Don't enable "Enforce HTTPS" yet (do this AFTER DNS propagates)

### Step 4.2: Configure DNS Records

Now go to your domain registrar (Namecheap, GoDaddy, Cloudflare, etc.) and add DNS records.

#### Option A: Apex Domain (yourdomain.com)

**If you want your site at `yourdomain.com` (no www):**

Add these **4 A records**:

| Type | Name/Host | Value/Points To    | TTL  |
|------|-----------|-------------------|------|
| A    | @         | 185.199.108.153   | 3600 |
| A    | @         | 185.199.109.153   | 3600 |
| A    | @         | 185.199.110.153   | 3600 |
| A    | @         | 185.199.111.153   | 3600 |

Add **1 CNAME record** (for www redirect):

| Type  | Name/Host | Value/Points To           | TTL  |
|-------|-----------|---------------------------|------|
| CNAME | www       | yourusername.github.io    | 3600 |

#### Option B: WWW Subdomain (www.yourdomain.com)

**If you want your site at `www.yourdomain.com`:**

1. **Update `static/CNAME`** to:
   ```
   www.yourdomain.com
   ```

2. Add **1 CNAME record**:

| Type  | Name/Host | Value/Points To           | TTL  |
|-------|-----------|---------------------------|------|
| CNAME | www       | yourusername.github.io    | 3600 |

3. Add **4 A records** for apex redirect:

| Type | Name/Host | Value/Points To    | TTL  |
|------|-----------|-------------------|------|
| A    | @         | 185.199.108.153   | 3600 |
| A    | @         | 185.199.109.153   | 3600 |
| A    | @         | 185.199.110.153   | 3600 |
| A    | @         | 185.199.111.153   | 3600 |

### Step 4.3: DNS Record Examples by Provider

#### Namecheap

1. Log into Namecheap
2. Go to **Domain List** → Click **Manage** next to your domain
3. Click **Advanced DNS** tab
4. Click **Add New Record**
5. Add each record as shown above
   - For @ records, select "A Record" and use "@" as the Host
   - For www, select "CNAME Record" and use "www" as the Host

#### GoDaddy

1. Log into GoDaddy
2. Go to **My Products** → **DNS** (next to your domain)
3. Scroll to **Records** section
4. Click **Add** to add each record
   - Type: A, Name: @, Value: [IP address]
   - Type: CNAME, Name: www, Value: yourusername.github.io

#### Cloudflare

1. Log into Cloudflare
2. Select your domain
3. Click **DNS** in the left menu
4. Click **Add record**
5. Add each record
   - **Important**: Set Proxy status to "DNS only" (gray cloud, not orange)

#### Google Domains

1. Log into Google Domains
2. Click your domain → **DNS**
3. Scroll to **Custom resource records**
4. Add each record:
   - Name: @ or www
   - Type: A or CNAME
   - TTL: 1H
   - Data: IP or domain

### Step 4.4: Verify DNS Configuration

**Wait 5-10 minutes**, then check DNS propagation:

1. Go to [https://dnschecker.org](https://dnschecker.org)
2. Enter your domain
3. Check if A records show the GitHub IPs globally
4. Green checkmarks = DNS is propagating

**Full propagation can take 24-48 hours**, but usually works within 1-2 hours.

### Step 4.5: Enable HTTPS

Once DNS is fully propagated (all green checks):

1. Go back to GitHub: **Settings → Pages**
2. Check the box: **Enforce HTTPS**
3. Wait a few minutes for SSL certificate to provision
4. Your site will now work at `https://yourdomain.com`

---

## Part 5: Add Your CV and Final Touches (5 minutes)

### Step 5.1: Add Your CV PDF

1. Create/export your CV as a PDF
2. Name it: `stefan-cv.pdf`
3. Place it in: `static/files/stefan-cv.pdf`
4. Commit and push:
   ```bash
   git add static/files/stefan-cv.pdf
   git commit -m "Add CV PDF"
   git push
   ```

### Step 5.2: Publish Your First Blog Post (Optional)

To publish one of the sample blog posts:

1. Edit `content/posts/self-sufficient-teams.md`
2. Change `draft: true` to `draft: false`
3. Update the content if you want
4. Commit and push:
   ```bash
   git add content/posts/
   git commit -m "Publish first blog post"
   git push
   ```

The site will automatically rebuild and deploy (check Actions tab).

---

## Part 6: Ongoing Usage

### How to Add New Blog Posts

**Method 1: Manual Creation**

1. Create a new file: `content/posts/my-new-post.md`
2. Add front matter:
   ```markdown
   ---
   title: "My Post Title"
   date: 2026-02-15
   draft: false
   tags: ["tag1", "tag2"]
   categories: ["Category"]
   ---
   
   Your content here...
   ```
3. Write your post in Markdown
4. Commit and push:
   ```bash
   git add content/posts/my-new-post.md
   git commit -m "Add new blog post"
   git push
   ```

**Method 2: Using Hugo CLI (if you install Hugo locally)**

```bash
hugo new posts/my-new-post.md
# Edit the file
git add content/posts/my-new-post.md
git commit -m "Add new blog post"
git push
```

### How to Update Your Experience/CV

1. Edit `content/experience.md`
2. Add your work history, achievements, etc.
3. Commit and push:
   ```bash
   git add content/experience.md
   git commit -m "Update experience page"
   git push
   ```

### How to Test Changes Locally (Optional)

If you want to preview changes before pushing:

**Install Hugo:**
```bash
# macOS
brew install hugo

# Windows (using Chocolatey)
choco install hugo-extended

# Linux (Ubuntu/Debian)
wget https://github.com/gohugoio/hugo/releases/download/v0.128.0/hugo_extended_0.128.0_linux-amd64.deb
sudo dpkg -i hugo_extended_0.128.0_linux-amd64.deb
```

**Run local server:**
```bash
cd stefan-site
hugo server -D
```

Visit `http://localhost:1313` to see your changes in real-time.

---

## Troubleshooting

### Site Not Building

**Check GitHub Actions:**
1. Go to **Actions** tab
2. Click the failed workflow
3. Expand the failed step to see error message

**Common issues:**
- Theme submodule not added: Run `git submodule add https://github.com/1bl4z3r/hermit-V2.git themes/hermit-v2`
- Incorrect baseURL in `hugo.toml`
- Syntax error in markdown files

### Custom Domain Not Working

**DNS not configured:**
- Double-check all A records are correct
- Verify CNAME file has correct domain
- Use [dnschecker.org](https://dnschecker.org) to verify propagation

**GitHub DNS check failing:**
- Wait longer (can take 24-48 hours)
- Try removing and re-adding the custom domain in Settings → Pages
- Make sure you added **all 4 A records**

**HTTPS not working:**
- Don't enable "Enforce HTTPS" until DNS is fully propagated
- Wait a few minutes after enabling for certificate provisioning
- Clear browser cache and try again

### Theme Not Loading

```bash
# Make sure submodule is initialized
git submodule update --init --recursive

# If that doesn't work, remove and re-add
rm -rf themes/hermit-v2
git submodule add https://github.com/1bl4z3r/hermit-V2.git themes/hermit-v2
git add .
git commit -m "Fix theme submodule"
git push
```

### Site Shows 404

**If yourusername.github.io shows 404:**
- Wait 5-10 minutes after first deployment
- Check Actions tab to ensure build succeeded
- Verify GitHub Pages is enabled in Settings

**If custom domain shows 404:**
- DNS may not be propagated yet
- Try accessing via `yourusername.github.io` first
- Check CNAME file has correct domain

---

## Quick Reference Commands

### Git Workflow
```bash
# Make changes to files
git add .
git commit -m "Description of changes"
git push
```

### Common Tasks
```bash
# Add new blog post
echo "---
title: \"My Post\"
date: $(date +%Y-%m-%d)
draft: false
---

Content here" > content/posts/my-post.md

# Check site status
git status

# View commit history
git log --oneline

# Pull latest theme updates
git submodule update --remote themes/hermit-v2
```

---

## Success Checklist

After completing all steps, verify:

- [ ] Site loads at `yourusername.github.io`
- [ ] Custom domain works at `yourdomain.com`
- [ ] HTTPS is enabled (padlock in browser)
- [ ] All pages work (About, Experience, Blog)
- [ ] CV download link works
- [ ] Mobile responsive (test on phone)
- [ ] LinkedIn and email links work
- [ ] Blog posts display correctly
- [ ] Site looks professional and loads fast

---

## Next Steps

1. **Share your site** - Update LinkedIn, email signature, resume
2. **Write content** - Publish blog posts regularly
3. **Monitor traffic** - Consider adding analytics (see README.md)
4. **Keep updated** - Update experience page as you progress
5. **Maintain** - Update theme periodically, keep Hugo current

---

## Support Resources

- **Hugo Documentation**: https://gohugo.io/documentation/
- **GitHub Pages Docs**: https://docs.github.com/pages
- **Markdown Guide**: https://www.markdownguide.org/
- **DNS Checker**: https://dnschecker.org
- **SSL Checker**: https://www.sslshopper.com/ssl-checker.html

---

**Congratulations! Your professional website is now live.** 🎉

The site is set up to automatically deploy whenever you push changes to GitHub. No manual rebuilding needed - just edit, commit, and push.
