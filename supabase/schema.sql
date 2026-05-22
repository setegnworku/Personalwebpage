-- Run in Supabase Dashboard → SQL Editor
-- Replace setegnworku with YOUR GitHub username (must match VITE_ADMIN_GITHUB_USERNAME)

create table if not exists public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  excerpt text not null,
  content text not null,
  category text not null check (category in ('genomics', 'methods', 'climate', 'tutorials')),
  date text not null,
  read_time text not null,
  author_id uuid references auth.users (id) on delete set null,
  created_at timestamptz not null default now()
);

alter table public.blog_posts enable row level security;

drop policy if exists "Anyone can read posts" on public.blog_posts;
create policy "Anyone can read posts"
  on public.blog_posts for select
  using (true);

drop policy if exists "Admin can insert posts" on public.blog_posts;
create policy "Admin can insert posts"
  on public.blog_posts for insert
  to authenticated
  with check (
    lower(coalesce(auth.jwt() -> 'user_metadata' ->> 'user_name', '')) = 'setegnworku'
  );

drop policy if exists "Admin can update posts" on public.blog_posts;
create policy "Admin can update posts"
  on public.blog_posts for update
  to authenticated
  using (
    lower(coalesce(auth.jwt() -> 'user_metadata' ->> 'user_name', '')) = 'setegnworku'
  );

drop policy if exists "Admin can delete posts" on public.blog_posts;
create policy "Admin can delete posts"
  on public.blog_posts for delete
  to authenticated
  using (
    lower(coalesce(auth.jwt() -> 'user_metadata' ->> 'user_name', '')) = 'setegnworku'
  );
