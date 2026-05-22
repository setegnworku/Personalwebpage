# Deploy to https://setegnworku.github.io/Personalwebpage/

## What this deploy includes

- **React portfolio** replacing the old static HTML site  
- **Blog page** with posts stored in **Supabase** (`blog_posts` table)  
- **Sign in with GitHub** — only `setegnworku` (or your `VITE_ADMIN_GITHUB_USERNAME`) can add/delete posts  
- **RLS** in Supabase so the database enforces admin-only writes  
- Optional **Giscus** comments on each post  

See **[CHANGELOG.md](./CHANGELOG.md)** and **[SETUP_SUPABASE.md](./SETUP_SUPABASE.md)** for full details.

---

## Before you push — GitHub secrets

Repo: **https://github.com/setegnworku/Personalwebpage**

**Settings → Secrets and variables → Actions → New repository secret**

| Secret | Required for live site |
|--------|-------------------------|
| `VITE_SUPABASE_URL` | Yes (blog + sign-in) |
| `VITE_SUPABASE_ANON_KEY` | Yes |
| `VITE_ADMIN_GITHUB_USERNAME` | Yes (`setegnworku`) |
| `VITE_GISCUS_*` | Optional (comments) |

## Enable GitHub Pages

**Settings → Pages → Build and deployment → Source:** **GitHub Actions**

## Push commands (replace old HTML site)

From this `react` folder in **WSL** (recommended):

```bash
cd "/mnt/c/Users/SAlemu/OneDrive - CGIAR/Documents/Webpage/complete-cursor-package/react"

git init
git add .
git commit -m "Replace static site with React portfolio (Vite + Supabase blog)"

git branch -M master
git remote add origin https://github.com/setegnworku/Personalwebpage.git

# First time replacing the old site:
git push -u origin master --force
```

Use `--force` only when you intend to **overwrite** the old repo contents with this React project.

## After push

1. **Actions** tab → wait for **Deploy to GitHub Pages** (green).
2. Open **https://setegnworku.github.io/Personalwebpage/**
3. Supabase → **Authentication → URL configuration** → redirect URL:
   `https://setegnworku.github.io/Personalwebpage/`

## Profile photo

Add `public/images/circle.png` if missing, commit, push again.
