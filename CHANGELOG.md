# Changelog — Personalwebpage

## 2026 — Major update: React site + Supabase blog

This release **replaces** the old static HTML portfolio with a React app and adds a **database-backed blog** connected to **Supabase**.

### Big changes

#### 1. New stack (replaces legacy HTML site)

- **React 18** + **Vite 5** + **Framer Motion**
- Deployed with **GitHub Actions** to **GitHub Pages** at `/Personalwebpage/`
- Sections: Home, About, Shiny Applications, **Blog**, Contact

#### 2. Blog page (new)

- Public **read** for all visitors
- **Create / delete posts** for the site owner only
- Posts stored in Supabase table `blog_posts` (not only browser `localStorage`)
- Long-form posts support **Markdown** (headings, lists, quotes, links)
- Sample / fallback article: *Why Machines Learn — A Book That Rewired How I Think* (`src/data/whyMachinesLearnContent.md`)
- Standalone HTML article: `public/why_machines_learn_blog.html`

#### 3. Supabase connection (new)

| Piece | Role |
|--------|------|
| **Supabase Auth** | **Sign in with GitHub** on the Blog page |
| **Admin check** | Only `VITE_ADMIN_GITHUB_USERNAME` (e.g. `setegnworku`) can publish or delete |
| **PostgreSQL** | Table `public.blog_posts` with Row Level Security (RLS) |
| **Client** | `@supabase/supabase-js` in `src/lib/supabase.js` |

**Security:** Even with the public anon key in the browser, RLS policies block non-admins from inserting/updating/deleting posts.

**Setup:** See [SETUP_SUPABASE.md](./SETUP_SUPABASE.md) — project URL, anon key, GitHub OAuth provider, redirect URLs, run `supabase/schema.sql`.

#### 4. Auth architecture

```
Visitor → read posts (no login)
Owner   → Blog → Sign in with GitHub → Supabase session → + New post / Delete
```

Key files:

- `src/context/AuthContext.jsx` — session, `signInWithGitHub`, `signOut`
- `src/lib/admin.js` — GitHub username vs `VITE_ADMIN_GITHUB_USERNAME`
- `src/lib/blogPosts.js` — fetch / create / delete posts
- `src/components/BlogAuthPanel.jsx` — GitHub sign-in UI
- `src/components/Blog.jsx` — blog UI

#### 5. Comments (optional, not Supabase)

- **Giscus** embed at the bottom of each post (GitHub Discussions)
- Configure `VITE_GISCUS_*` in `.env` and GitHub Actions secrets
- Visitors can use Giscus without Supabase; separate from blog admin login

#### 6. Deploy / environment

**Local:** `.env` (not committed) — see `.env.example`

**Production:** GitHub Actions secrets in `.github/workflows/deploy.yml`:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `VITE_ADMIN_GITHUB_USERNAME`
- `VITE_GISCUS_*` (optional)

### Removed / deprecated

- Password-only blog admin (`VITE_BLOG_ADMIN_PASSWORD` / `blogAdmin.config.js`) — superseded by **Supabase + GitHub** for post management
- Old static `index.html` site in the repo root (replaced by this React project)

### Links

- Live site: https://setegnworku.github.io/Personalwebpage/
- Supabase setup: [SETUP_SUPABASE.md](./SETUP_SUPABASE.md)
- Deploy checklist: [DEPLOY_NOW.md](./DEPLOY_NOW.md)
