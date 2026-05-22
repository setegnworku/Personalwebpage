# Dr. Setegn Worku Alemu — Portfolio (React)

Modern portfolio site built with React, Vite, and Framer Motion. Replaces the legacy HTML site at [setegnworku/Personalwebpage](https://github.com/setegnworku/Personalwebpage).

**Live site (after deploy):** https://setegnworku.github.io/Personalwebpage/

## Local development

```bash
npm install
npm run dev
```

Open http://localhost:5173/Personalwebpage/

## Build

```bash
npm run build
```

Output is in `dist/` (configured for GitHub Pages base path `/Personalwebpage/`).

See **[DEPLOY.md](./DEPLOY.md)** for full steps to replace [setegnworku/Personalwebpage](https://github.com/setegnworku/Personalwebpage).

## Deploy to GitHub Pages (replace old site)

### 1. Push this project to your repo

From this folder:

```bash
git init
git add .
git commit -m "Replace static site with React portfolio"
git remote add origin https://github.com/setegnworku/Personalwebpage.git
git branch -M master
git push -u origin master
```

If the repo already has history and you want to fully replace it:

```bash
git push -u origin master --force
```

Only use `--force` when you intend to overwrite the old HTML site.

### 2. Enable GitHub Pages

1. Open https://github.com/setegnworku/Personalwebpage/settings/pages
2. Under **Build and deployment** → **Source**, choose **GitHub Actions**
3. After the workflow runs, the site updates at https://setegnworku.github.io/Personalwebpage/

The workflow `.github/workflows/deploy.yml` builds on every push to `master` or `main`.

### Profile photo

Place your headshot at `public/images/circle.png` (included when copied from the old repo).

## Blog: posts vs comments

| Action | Who |
|--------|-----|
| Create / delete posts | **You only** (Sign in with GitHub via Supabase) |
| Comment on posts | **Anyone** (via GitHub / Giscus) |

### 1. Supabase + GitHub sign-in

Follow **[SETUP_SUPABASE.md](./SETUP_SUPABASE.md)** to create a project, enable GitHub OAuth, run `supabase/schema.sql`, and set `.env` (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, `VITE_ADMIN_GITHUB_USERNAME`).

On the Blog page, click **Sign in with GitHub**. Only the GitHub user matching `VITE_ADMIN_GITHUB_USERNAME` gets **+ New post** and delete controls (enforced in the database with row-level security).

For GitHub Pages deploy, add the same values as Actions secrets (see SETUP_SUPABASE.md).

### 2. Enable public comments (Giscus)

1. Open https://giscus.app and install on **setegnworku/Personalwebpage**
2. Enable **Discussions** on that GitHub repo
3. Copy the repo ID, category name, and category ID into `.env`
4. Add the same values as GitHub Actions secrets for deploy

Visitors open a post, scroll to **Comments**, sign in with GitHub, and comment. You moderate via GitHub Discussions.
