# Quick Start Guide

## Getting Your Site Live in 10 Minutes

### Step 1: Update Your Information

1. **Edit `hugo.toml`:**
   - Change `baseURL` to your domain
   - Update `title` if needed
   - Add your LinkedIn URL
   - Add your email address

2. **Edit `static/CNAME`:**
   - Replace with your actual domain

3. **Review content:**
   - Check `content/_index.md` (homepage)
   - Check `content/about.md`
   - Update `content/experience.md` with your CV

### Step 2: Create GitHub Repository

```bash
# On GitHub, create a new repository
# Name it: yourusername.github.io (or any name)

# In your terminal:
cd stefan-site
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/yourrepo.git

# Add the Hermit V2 theme as a submodule
git submodule add https://github.com/1bl4z3r/hermit-V2.git themes/hermit-v2

git add .
git commit -m "Add Hermit V2 theme"
git push -u origin main
```

### Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** → **Pages**
3. Under "Build and deployment":
   - Set **Source** to: **GitHub Actions**
4. Save

Your site will automatically build and deploy!

### Step 4: Configure Custom Domain (Optional)

**DNS Setup (at your domain registrar):**

Add these A records:
```
A     @     185.199.108.153
A     @     185.199.109.153
A     @     185.199.110.153
A     @     185.199.111.153
```

**On GitHub:**
1. Go to **Settings** → **Pages**
2. Enter your custom domain
3. Wait for DNS check (can take minutes to hours)
4. Enable **Enforce HTTPS**

### Step 5: Test

Visit your site:
- GitHub Pages URL: `https://yourusername.github.io`
- Custom domain: `https://yourdomain.com` (after DNS propagates)

## Next Steps

### Add Your CV PDF

1. Save your CV as `static/files/stefan-cv.pdf`
2. The download link in `/experience/` will work automatically

### Write Blog Posts

```bash
# Create a new post
hugo new posts/my-post-title.md

# Edit the file
# Set draft: false when ready to publish

# Commit and push
git add content/posts/my-post-title.md
git commit -m "Add new blog post"
git push
```

### Local Development

```bash
# Install Hugo (once)
# macOS:
brew install hugo

# Run local server
hugo server -D

# Visit http://localhost:1313
```

## Common Issues

**Theme not loading?**
```bash
git submodule update --init --recursive
```

**Site not deploying?**
- Check the **Actions** tab on GitHub for build errors
- Ensure you're pushing to the `main` branch
- Verify GitHub Pages source is set to "GitHub Actions"

**Custom domain not working?**
- DNS can take 24-48 hours to propagate
- Verify A records are correct
- Check that `static/CNAME` has the right domain

## Need Help?

Check the full `README.md` for detailed documentation and troubleshooting.
