# Deploy React site to replace https://setegnworku.github.io/Personalwebpage/

This replaces the old HTML site in [setegnworku/Personalwebpage](https://github.com/setegnworku/Personalwebpage).

## Step 1 — Push code to GitHub

From the `react` folder (WSL or PowerShell):

```bash
cd /mnt/c/Users/SAlemu/OneDrive\ -\ CGIAR/Documents/Webpage/complete-cursor-package/react

git init
git add .
git commit -m "Replace static portfolio with React + Vite site"
git remote add origin https://github.com/setegnworku/Personalwebpage.git
git branch -M master
git push -u origin master --force
```

Use `--force` only if you intend to **fully replace** the old `index.html` / `css` site with this React project.

## Step 2 — Enable GitHub Pages (Actions)

1. Open https://github.com/setegnworku/Personalwebpage/settings/pages
2. **Build and deployment** → Source: **GitHub Actions**
3. Wait for the workflow **Deploy to GitHub Pages** to finish (Actions tab)

Live URL: **https://setegnworku.github.io/Personalwebpage/**

## Step 3 — GitHub secrets (Supabase blog + Giscus)

Repository → **Settings** → **Secrets and variables** → **Actions** → **New repository secret**

| Secret | Purpose |
|--------|---------|
| `VITE_SUPABASE_URL` | From Supabase → Settings → API |
| `VITE_SUPABASE_ANON_KEY` | anon public key |
| `VITE_ADMIN_GITHUB_USERNAME` | Your GitHub login (e.g. `setegnworku`) |
| `VITE_GISCUS_REPO` | `setegnworku/Personalwebpage` |
| `VITE_GISCUS_REPO_ID` | From https://giscus.app |
| `VITE_GISCUS_CATEGORY_ID` | From https://giscus.app |

Enable **Discussions** on the repo for Giscus comments. See **SETUP_SUPABASE.md** for auth and database.

## Host a standalone HTML page (e.g. knitted article)

Copy your file into `public/`:

```
public/why_machines_learn_blog.html
```

After deploy it is available at:

**https://setegnworku.github.io/Personalwebpage/why_machines_learn_blog.html**

Test locally first:

**http://localhost:5173/Personalwebpage/why_machines_learn_blog.html**

(or port `5174` if Vite picked another port)

Then commit and push:

```bash
git add public/why_machines_learn_blog.html
git commit -m "Add Why Machines Learn HTML article"
git push
```

In a blog post (Markdown **Content**), link to it:

```markdown
[Read the full formatted article](https://setegnworku.github.io/Personalwebpage/why_machines_learn_blog.html)
```

If the HTML file references CSS/images with paths like `/style.css`, change them to `/Personalwebpage/style.css` or use a single self-contained `.html` file.

## Profile photo

Ensure `public/images/circle.png` exists (copied from your old repo).
