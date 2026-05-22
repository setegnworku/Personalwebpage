# Dr. Setegn Worku Alemu — Portfolio (React)

Modern portfolio site built with **React**, **Vite**, and **Framer Motion**. Replaces the legacy HTML site at [setegnworku/Personalwebpage](https://github.com/setegnworku/Personalwebpage).

**Live site:** https://setegnworku.github.io/Personalwebpage/

---

## What’s new (major update)

### Blog page + Supabase

The biggest change is a full **Blog** section connected to **[Supabase](https://supabase.com)**:

| Feature | How it works |
|---------|----------------|
| **Read posts** | Anyone — posts load from Supabase `blog_posts` |
| **Write / delete posts** | **You only** — **Sign in with GitHub** on the Blog page |
| **Who is admin?** | GitHub username must match `VITE_ADMIN_GITHUB_USERNAME` (default: `setegnworku`) |
| **Database security** | Row Level Security (RLS) in PostgreSQL — non-admins cannot insert/delete even if they tamper with the UI |
| **Post format** | Markdown in the editor; optional full HTML article at `/why_machines_learn_blog.html` |

```
┌─────────────┐     Sign in with GitHub      ┌──────────────┐
│  Blog page  │ ───────────────────────────► │   Supabase   │
│  (React)    │ ◄── session + JWT metadata   │   Auth       │
└─────────────┘                              └──────────────┘
       │                                              │
       │  fetch / insert / delete                     │
       ▼                                              ▼
┌─────────────┐                              ┌──────────────┐
│  Visitors   │  read only                   │  blog_posts  │
│  (public)   │                              │  table + RLS │
└─────────────┘                              └──────────────┘
```

**First-time Supabase setup:** [SETUP_SUPABASE.md](./SETUP_SUPABASE.md)  
**Full change list:** [CHANGELOG.md](./CHANGELOG.md)

### Rest of the site

- **Home** — animated hero, stats, navigation  
- **About** — profile, skills, research interests  
- **Shiny Applications** — links to your Shiny apps  
- **Contact** — get in touch  
- **Comments on posts** (optional) — [Giscus](https://giscus.app) + GitHub Discussions (separate from Supabase admin)

---

## Quick start (local)

```bash
npm install
cp .env.example .env
# Edit .env: VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY, VITE_ADMIN_GITHUB_USERNAME
npm run dev
```

Open http://localhost:5173/Personalwebpage/ (or the port Vite prints).

**Blog:** go to **Blog** → **Sign in with GitHub** → **+ New post** (admin only).

---

## Environment variables

| Variable | Required | Purpose |
|----------|----------|---------|
| `VITE_SUPABASE_URL` | Yes | Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Yes | Public anon key (not service_role) |
| `VITE_ADMIN_GITHUB_USERNAME` | Yes | Only this GitHub user manages posts |
| `VITE_GISCUS_REPO` | No | Comments |
| `VITE_GISCUS_REPO_ID` | No | Comments |
| `VITE_GISCUS_CATEGORY` | No | Comments |
| `VITE_GISCUS_CATEGORY_ID` | No | Comments |

Never commit `.env` — it is in `.gitignore`.

---

## Project layout (blog + Supabase)

```
src/
  context/AuthContext.jsx      # GitHub OAuth session
  lib/supabase.js              # Supabase client
  lib/blogPosts.js             # CRUD for blog_posts
  lib/admin.js                 # Admin username check
  components/Blog.jsx          # Blog UI
  components/BlogAuthPanel.jsx # Sign in with GitHub
  data/whyMachinesLearnContent.md
supabase/schema.sql            # Table + RLS policies (run in Supabase SQL Editor)
public/why_machines_learn_blog.html
.github/workflows/deploy.yml   # Build + GitHub Pages (injects secrets)
```

---

## Build & deploy

```bash
npm run build
```

Output: `dist/` (base path `/Personalwebpage/`).

**Deploy:** push to `master` on [setegnworku/Personalwebpage](https://github.com/setegnworku/Personalwebpage). GitHub Actions runs `.github/workflows/deploy.yml`.

**Before live blog works**, add Actions secrets (same as `.env`) — see [DEPLOY_NOW.md](./DEPLOY_NOW.md).

1. **Settings → Pages → Source:** GitHub Actions  
2. Secrets: `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, `VITE_ADMIN_GITHUB_USERNAME`  
3. Supabase redirect URL: `https://setegnworku.github.io/Personalwebpage/`

---

## Blog: posts vs comments

| Action | Who | System |
|--------|-----|--------|
| Create / delete posts | **You only** | **Supabase** + GitHub sign-in |
| Read posts | Everyone | Supabase (or fallback seed in `content.js` if DB empty) |
| Comment on posts | Visitors (optional) | **Giscus** (GitHub Discussions) — configure `VITE_GISCUS_*` |

### Supabase setup (summary)

1. Create project → copy URL + anon key → `.env`  
2. Enable **GitHub** provider + OAuth app  
3. Run `supabase/schema.sql` (replace `setegnworku` with your username if needed)  
4. Add redirect URLs for localhost and GitHub Pages  

Details: **[SETUP_SUPABASE.md](./SETUP_SUPABASE.md)**

### Comments (optional)

1. https://giscus.app → install on **setegnworku/Personalwebpage**  
2. Enable **Discussions** on the repo  
3. Add `VITE_GISCUS_*` to `.env` and GitHub Actions secrets  

---

## Profile photo

`public/images/circle.png`

---

## Docs

| File | Contents |
|------|----------|
| [CHANGELOG.md](./CHANGELOG.md) | Major changes (blog, Supabase, deploy) |
| [SETUP_SUPABASE.md](./SETUP_SUPABASE.md) | Supabase + GitHub OAuth step-by-step |
| [DEPLOY_NOW.md](./DEPLOY_NOW.md) | Short deploy checklist |
| [DEPLOY.md](./DEPLOY.md) | Full deploy + static HTML hosting |
