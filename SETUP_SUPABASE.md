# Supabase + GitHub sign-in (admin-only blog)

Only your GitHub account can create or delete blog posts. Everyone else can read posts and comment (via Giscus).

## 1. Create a Supabase project

1. Go to [supabase.com](https://supabase.com) → **New project**.
2. Note **Project URL** and **anon public** key (Settings → API).

## 2. Enable GitHub auth

1. Supabase → **Authentication** → **Providers** → **GitHub** → Enable.
2. Create a [GitHub OAuth App](https://github.com/settings/developers):
   - **Homepage URL:** `https://setegnworku.github.io`
   - **Authorization callback URL:** copy from Supabase (looks like `https://<project-ref>.supabase.co/auth/v1/callback`)
3. Paste **Client ID** and **Client Secret** into Supabase GitHub provider → Save.

## 3. Redirect URLs (required for sign-in)

Supabase → **Authentication** → **URL configuration** → **Redirect URLs**, add:

```
http://localhost:5173/Personalwebpage/
https://setegnworku.github.io/Personalwebpage/
```

**Site URL** can be:

```
https://setegnworku.github.io/Personalwebpage/
```

## 4. Database + row-level security

1. Open **SQL Editor**.
2. Paste `supabase/schema.sql`.
3. Replace every `'setegnworku'` with **your** GitHub username (lowercase).
4. Run the script.

Optional: insert your first post manually in **Table Editor** → `blog_posts`, or publish one after signing in on the site.

## 5. Local environment

Copy `.env.example` to `.env`:

```env
VITE_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_ADMIN_GITHUB_USERNAME=setegnworku

# Giscus (comments) — optional
VITE_GISCUS_REPO=setegnworku/Personalwebpage
VITE_GISCUS_REPO_ID=
VITE_GISCUS_CATEGORY=Blog Comments
VITE_GISCUS_CATEGORY_ID=
```

```bash
npm install
npm run dev
```

Open **Blog** → **Sign in with GitHub**. After redirect, you should see **+ New post** only when signed in as the admin username.

## 6. GitHub Pages deploy secrets

In repo **Settings → Secrets and variables → Actions**, add:

| Secret | Value |
|--------|--------|
| `VITE_SUPABASE_URL` | Project URL |
| `VITE_SUPABASE_ANON_KEY` | anon public key |
| `VITE_ADMIN_GITHUB_USERNAME` | Your GitHub login (e.g. `setegnworku`) |
| `VITE_GISCUS_*` | As before (optional) |

Remove old `VITE_BLOG_ADMIN_PASSWORD` if you no longer use password auth.

Push to `main`/`master`; the workflow builds with these variables.

## Security notes

- The **anon** key is safe in the frontend; **RLS** blocks non-admins from writing posts even if someone tampers with the UI.
- Admin is enforced by **GitHub username** in JWT `user_metadata.user_name` (must match SQL policies and `VITE_ADMIN_GITHUB_USERNAME`).
- Do not commit `.env` or Supabase **service_role** keys.

## Troubleshooting

| Issue | Fix |
|--------|-----|
| Redirect loop / blank after GitHub | Check redirect URLs include trailing path `/Personalwebpage/` |
| Signed in but no **New post** | GitHub username must match `VITE_ADMIN_GITHUB_USERNAME` and SQL policies |
| Insert fails | Re-run `schema.sql` with your username; confirm you are authenticated |
| Posts empty | Table empty is OK — use fallback seed or create first post as admin |
