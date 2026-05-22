import { supabase, isSupabaseConfigured } from './supabase'

function rowToPost(row) {
  return {
    id: row.id,
    title: row.title,
    excerpt: row.excerpt,
    content: row.content,
    category: row.category,
    date: row.date,
    readTime: row.read_time,
  }
}

export async function fetchBlogPosts() {
  if (!isSupabaseConfigured) return { posts: null, error: 'Supabase not configured' }

  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) return { posts: null, error: error.message }
  return { posts: data.map(rowToPost), error: null }
}

export async function createBlogPost(form, userId) {
  if (!isSupabaseConfigured) return { post: null, error: 'Supabase not configured' }

  const { data, error } = await supabase
    .from('blog_posts')
    .insert({
      title: form.title,
      excerpt: form.excerpt,
      content: form.content,
      category: form.category,
      date: form.date,
      read_time: form.readTime,
      author_id: userId,
    })
    .select()
    .single()

  if (error) return { post: null, error: error.message }
  return { post: rowToPost(data), error: null }
}

export async function deleteBlogPost(id) {
  if (!isSupabaseConfigured) return { error: 'Supabase not configured' }

  const { error } = await supabase.from('blog_posts').delete().eq('id', id)
  return { error: error?.message || null }
}
