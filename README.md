# Amir Elshimi — Personal Site

A fast, dependency-free site (plain HTML/CSS/JS — no build step, no frameworks).
Total size: ~1.8MB including all photos.

## Files

```
index.html          → the whole site, one page
assets/style.css     → all styling
assets/main.js       → load animation, scroll reveals, contact form logic
assets/img/          → your real photos, already resized & compressed for web
```

## How to put this online (GitHub Pages — free, ~5 minutes)

1. **Create a GitHub account** if you don't have one: https://github.com/signup

2. **Create a new repository**
   - Click the "+" in the top right → "New repository"
   - Name it `amir-elshimi-site` (or anything you like)
   - Keep it **Public** (required for free GitHub Pages)
   - Don't add a README/.gitignore — leave it empty
   - Click "Create repository"

3. **Upload these files**
   - On the new repo page, click "uploading an existing file"
   - Drag in `index.html` and the entire `assets` folder (keep the folder structure intact)
   - Scroll down, click "Commit changes"

4. **Turn on GitHub Pages**
   - Go to the repo's **Settings** tab → **Pages** (left sidebar)
   - Under "Build and deployment" → Source: select **Deploy from a branch**
   - Branch: select **main**, folder: **/ (root)** → Save

5. **Wait ~1 minute**, then refresh that Pages settings page — it will show your live URL:
   `https://yourusername.github.io/amir-elshimi-site/`

That's it — the site is live. Every time you upload changed files to the repo, it redeploys automatically within a minute.

## Connecting your own domain (once you buy one)

1. In repo **Settings → Pages**, under "Custom domain," type your domain (e.g. `amirelshimi.com`) and save. GitHub creates a `CNAME` file for you automatically.
2. At your domain registrar (wherever you bought the domain), add these DNS records:
   - Four **A records** for the root domain, pointing to:
     `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - One **CNAME record** for `www` pointing to `yourusername.github.io`
3. DNS changes can take a few hours to a day to fully propagate. Once they do, check "Enforce HTTPS" back in the Pages settings.

## Editing content later

Everything is in plain text:
- **Copy/text**: edit directly inside `index.html` — it's all readable English in `<p>` and `<h2>` tags.
- **Colors**: edit the `:root { --emerald: ...; --amber: ...; }` block at the top of `assets/style.css`.
- **Photos**: drop new images into `assets/img/` and update the `src="assets/img/..."` reference in `index.html`.

No build tools, no npm install, no compiling — change the file, re-upload, done.
