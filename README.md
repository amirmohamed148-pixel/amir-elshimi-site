# Amir Elshimi — Executive Site v2 (Complete)

A full multi-page site: Home, About, Experience (career timeline), Investment
Portfolio, Case Studies, Leadership & Speaking, Awards & Certificates, Media &
Events, Insights, Gallery, Resume, and Contact. Plain HTML/CSS/JS — no build
step, no frameworks. ~5.4MB total including all photos.

## Files

```
index.html                  → Home page
pages/about.html             → Story & background
pages/experience.html        → Interactive career timeline
pages/portfolio.html         → Investment sectors
pages/case-studies.html       → 6 detailed case studies
pages/leadership.html         → Speaking, judging, networking
pages/awards.html              → Awards & certificates, 14 credentials
pages/media.html               → Conferences & events
pages/insights.html            → Original perspective articles
pages/gallery.html            → Full photo gallery with filters
pages/resume.html              → Printable resume
pages/contact.html             → Contact page

assets/css/core.css           → All styling, shared across every page
assets/js/core.js              → Animations, counters, timeline, gallery, contact form
assets/img/                    → Photos, organized by category, already optimized for web
```

Navigation: primary links (Home, About, Experience, Portfolio, Case Studies,
Leadership, Gallery, Contact) sit on the main bar; Awards, Media, Insights,
and Resume are grouped under a "More" dropdown to keep the nav from getting
crowded.

## Easiest way to go live: Vercel (drag-and-drop)

1. Go to **vercel.com** and sign in (or sign up — it's free)
2. From your dashboard, click **"Add New..." → "Project"**
3. Look for an option to **deploy without Git** — usually a drag-and-drop area
   - If you don't see that option immediately, try the **Netlify** alternative below, which has a more obvious drag-and-drop on its homepage
4. Drag the **entire site folder** (the one containing `index.html`, `pages/`, and `assets/`) into the drop zone
5. Click **Deploy**
6. Within about a minute, you'll get a live URL like `https://your-site-name.vercel.app`

## Alternative: Netlify Drop (simplest possible option)

1. Go to **app.netlify.com/drop**
2. Drag the whole site folder onto the page
3. It deploys instantly — no account required for a quick test, though creating a free account lets you keep and manage the site afterward

## Alternative: GitHub Pages

Same process as before: create a repo, upload `index.html`, `pages/`, and `assets/` keeping the folder structure intact, then enable Pages in Settings.

**Important for GitHub uploads specifically:** upload one whole folder at a time (drag the `pages` folder itself, then separately drag the `assets` folder itself) rather than selecting all files together — this is what caused folders to flatten previously.

## Editing content later

- **Copy/text**: open any `.html` file — all text is in plain, readable English inside `<p>`, `<h1>`, `<h2>` tags.
- **Colors**: edit the `:root { --emerald: ...; --amber: ...; }` block at the top of `assets/css/core.css` — this single file controls every page's color scheme.
- **Photos**: drop new images into the relevant `assets/img/[category]/` folder and update the `src="../assets/img/..."` path in the relevant page.
- **Navigation**: the nav menu is repeated at the top of every page. The primary links and the "More" dropdown items are both inside the `<nav class="nav-links">` block — if you add a new page, add a matching line there and in the footer's "More" column, in every file.

No build tools, no npm install, no compiling — change a file, re-upload, done.

## What's real vs. illustrative

The case-study figures (deal values, IRRs, percentages) come from your actual
archive of financial models and reports. Before this goes fully public, it's
worth a final cross-check of each number against the source documents — they
were transcribed from earlier analysis sessions, not re-verified file-by-file
in this build pass.

The Insights articles are original writing grounded in real patterns from
your case studies, written specifically for this site — they are not
previously published pieces.
