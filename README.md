# Yuva Bharata Sena Website

Official website for **Yuva Bharata Sena (YBS)** — Karnataka's grassroots political movement.

## 🌐 Live Site

> Update this URL once GitHub Pages is configured.

---

## 📁 Structure

```
docs/
├── index.html        # Home page
├── about.html        # About the party
├── manifesto.html    # Full party manifesto
├── leaders.html      # Party leaders
├── events.html       # Events & programmes
├── join.html         # Join the movement (enrollment form)
├── 404.html          # Custom 404 page
├── global.css        # Global styles (nav, footer, buttons, brand colors)
├── home.css          # Home page-specific styles
├── pages.css         # Inner page styles
├── main.js           # JavaScript (nav, animations, form, filters)
├── .nojekyll         # Prevents GitHub Pages from using Jekyll
└── CNAME             # Custom domain (update before deploying)
```

---

## 🚀 Deploying to GitHub Pages (same as gist_website)

1. **Push this folder** to a GitHub repository.
2. Go to **Settings → Pages** in your GitHub repo.
3. Under **Source**, set Branch: `main` (or `master`), Folder: `/docs`.
4. Click **Save** — your site will be live at `https://<username>.github.io/<repo-name>/`.

### Custom Domain (optional)
1. Update `docs/CNAME` with your domain (e.g., `karnatakasvijayasena.in`).
2. In your domain registrar, add a CNAME record pointing to `<username>.github.io`.
3. In GitHub Pages settings, enter your custom domain and enable HTTPS.

---

## 🎨 Brand

| Color | Hex | Use |
|---|---|---|
| Deep Navy | `#0F2167` | Primary background, text |
| Saffron | `#FF6D00` | Accent, CTAs, highlights |
| Gold | `#FFB800` | Badges, numbers, ranks |
| Navy Dark | `#091444` | Footer, dark areas |

**Fonts**: Playfair Display (headings) + Noto Sans (body)

---

## 📝 Customizing Content

- **Leader names/photos**: Update `leaders.html` with actual leader data. Replace emoji avatars with `<img>` tags.
- **Event dates**: Update `events.html` as new events are scheduled.
- **Join form**: The form currently shows a success message on submit. Connect to a backend API or a form service (Formspree, Google Forms redirect, etc.) for real submissions.
- **App download link**: Update the Play Store link in `index.html` App Strip section.
- **Social links**: Update WhatsApp, Facebook, Twitter links in the footer across all pages.
- **Stats**: Update member count, districts, issues resolved in `index.html` hero and stats bar.

---

## 📱 YBS App

The party also has a companion Flutter app (YBS/Yuva Bharata Sena) for members to:
- Report issues in their area
- Connect with local leaders
- Track events and updates
- View leaderboard and ranks

---

*Yuva Bharata Sena · ಯುವ ಭಾರತ ಸೇನಾ*
