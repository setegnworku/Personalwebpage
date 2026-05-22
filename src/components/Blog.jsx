import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ReactMarkdown from 'react-markdown'
import { initialBlogPosts } from '../data/content'
import { useAuth } from '../context/AuthContext'
import { isSupabaseConfigured } from '../lib/supabase'
import { fetchBlogPosts, createBlogPost, deleteBlogPost } from '../lib/blogPosts'
import GiscusComments from './GiscusComments'
import BlogAuthPanel from './BlogAuthPanel'
import styles from './Blog.module.css'

const STORAGE_KEY = 'setegn_blog_posts'
const catColors = { genomics: '#00D4AA', methods: '#00A3E0', climate: '#EF4444', tutorials: '#F59E0B' }

function AnimatedTitle({ words, accentIndex = -1 }) {
  return (
    <motion.div className={styles.animatedTitle} variants={{ hidden: {}, show: { transition: { staggerChildren: 0.04 } } }} initial="hidden" whileInView="show" viewport={{ once: true }}>
      {words.map((word, wi) => (
        <span key={wi} className={styles.titleWord}>
          {word.split('').map((char, ci) => (
            <motion.span key={ci} variants={{ hidden: { opacity: 0, y: 36, rotateX: -80 }, show: { opacity: 1, y: 0, rotateX: 0, transition: { duration: 0.45, ease: [0.4,0,0.2,1] } } }} className={wi === accentIndex ? styles.titleAccent : ''}>{char}</motion.span>
          ))}
        </span>
      ))}
    </motion.div>
  )
}

function PostCard({ post, onClick }) {
  const color = catColors[post.category] || '#00D4AA'
  return (
    <motion.div
      className={styles.card}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      onClick={() => onClick(post)}
    >
      <div className={styles.cardAccentBar} style={{ background: `linear-gradient(90deg, ${color}, ${color}88)` }} />
      <div className={styles.cardInner}>
        <div className={styles.cardMeta}>
          <span className={styles.tag} style={{ background: `${color}22`, color }}>{post.category}</span>
          <span className={styles.readTime}>{post.readTime}</span>
        </div>
        <h3 className={styles.cardTitle}>{post.title}</h3>
        <p className={styles.excerpt}>{post.excerpt}</p>
        <div className={styles.cardFooter}>
          <span className={styles.date}>{post.date}</span>
          <span className={styles.readMore}>Read &amp; comment →</span>
        </div>
      </div>
    </motion.div>
  )
}

function PostModal({ post, onClose, onDelete, isAdmin, deleting }) {
  return (
    <motion.div
      className={styles.overlay}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        className={`glass-card ${styles.modal}`}
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.98 }}
        onClick={e => e.stopPropagation()}
      >
        <div className={styles.modalAccent} style={{ background: `linear-gradient(90deg, ${catColors[post.category]}, ${catColors[post.category]}66)` }} />
        <div className={styles.modalBody}>
          <div className={styles.modalHeader}>
            <span className={styles.tag} style={{ background: `${catColors[post.category]}22`, color: catColors[post.category] }}>{post.category}</span>
            <div style={{ display: 'flex', gap: 8 }}>
              {isAdmin && (
                <button
                  type="button"
                  className={styles.deleteBtn}
                  disabled={deleting}
                  onClick={() => onDelete(post.id)}
                >
                  {deleting ? 'Deleting…' : 'Delete post'}
                </button>
              )}
              <button type="button" className={styles.closeBtn} onClick={onClose} aria-label="Close">✕</button>
            </div>
          </div>
          <h2 className={styles.modalTitle}>{post.title}</h2>
          <div className={styles.modalMeta}>{post.date} · {post.readTime}</div>
          <div className={styles.modalContent}>
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </div>
          <GiscusComments postId={String(post.id)} postTitle={post.title} />
        </div>
      </motion.div>
    </motion.div>
  )
}

function NewPostForm({ onSubmit, onClose, submitting }) {
  const [form, setForm] = useState({ title: '', category: 'genomics', date: '', readTime: '', excerpt: '', content: '' })
  const [error, setError] = useState('')
  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    const result = await onSubmit(form)
    if (result?.error) setError(result.error)
  }

  return (
    <motion.div
      className={styles.overlay}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        className={`glass-card ${styles.formModal}`}
        initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
        onClick={e => e.stopPropagation()}
      >
        <div className={styles.modalHeader}>
          <h3 style={{ color: 'var(--text-primary)' }}>New blog post (author only)</h3>
          <button type="button" className={styles.closeBtn} onClick={onClose}>✕</button>
        </div>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formGrid}>
            <label className={styles.formField}>
              <span>Title</span>
              <input value={form.title} onChange={set('title')} placeholder="Post title" required />
            </label>
            <label className={styles.formField}>
              <span>Category</span>
              <select value={form.category} onChange={set('category')}>
                <option value="genomics">Genomics</option>
                <option value="methods">Methods</option>
                <option value="climate">Climate</option>
                <option value="tutorials">Tutorials</option>
              </select>
            </label>
            <label className={styles.formField}>
              <span>Date</span>
              <input value={form.date} onChange={set('date')} placeholder="e.g. April 2025" required />
            </label>
            <label className={styles.formField}>
              <span>Read Time</span>
              <input value={form.readTime} onChange={set('readTime')} placeholder="e.g. 5 min read" required />
            </label>
            <label className={`${styles.formField} ${styles.full}`}>
              <span>Excerpt</span>
              <textarea value={form.excerpt} onChange={set('excerpt')} rows={2} placeholder="Brief summary..." required />
            </label>
            <label className={`${styles.formField} ${styles.full}`}>
              <span>Content (Markdown)</span>
              <textarea value={form.content} onChange={set('content')} rows={10} placeholder="Write your post in Markdown..." required />
            </label>
          </div>
          {error && <p className={styles.loadError}>{error}</p>}
          <div className={styles.formActions}>
            <button type="button" className="btn-ghost" onClick={onClose} disabled={submitting}>Cancel</button>
            <button type="submit" className="btn-primary" disabled={submitting}>
              {submitting ? 'Publishing…' : 'Publish post'}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  )
}

function loadLocalPosts() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : initialBlogPosts
  } catch {
    return initialBlogPosts
  }
}

export default function Blog() {
  const { isAdmin, user, isConfigured } = useAuth()
  const [posts, setPosts] = useState(() => (isSupabaseConfigured ? [] : loadLocalPosts()))
  const [loading, setLoading] = useState(isSupabaseConfigured)
  const [loadError, setLoadError] = useState('')
  const [selected, setSelected] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [filter, setFilter] = useState('all')

  const refreshPosts = useCallback(async () => {
    if (!isSupabaseConfigured) return
    setLoading(true)
    setLoadError('')
    const { posts: data, error } = await fetchBlogPosts()
    setLoading(false)
    if (error) {
      setLoadError(error)
      setPosts(loadLocalPosts())
      return
    }
    setPosts(data?.length ? data : initialBlogPosts)
  }, [])

  useEffect(() => {
    if (isSupabaseConfigured) refreshPosts()
  }, [refreshPosts])

  useEffect(() => {
    if (!isSupabaseConfigured) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(posts))
    }
  }, [posts])

  const addPost = async (form) => {
    if (!isAdmin || !user) return { error: 'Not signed in as admin' }

    if (isSupabaseConfigured) {
      setSubmitting(true)
      const { post, error } = await createBlogPost(form, user.id)
      setSubmitting(false)
      if (error) return { error }
      setPosts(p => [post, ...p])
      setShowForm(false)
      return {}
    }

    const newPost = { ...form, id: Date.now() }
    setPosts(p => [newPost, ...p])
    setShowForm(false)
    return {}
  }

  const deletePost = async (id) => {
    if (!isAdmin) return

    if (isSupabaseConfigured) {
      setDeleting(true)
      const { error } = await deleteBlogPost(id)
      setDeleting(false)
      if (error) {
        setLoadError(error)
        return
      }
    }

    setPosts(p => p.filter(post => post.id !== id))
    setSelected(null)
  }

  const cats = ['all', ...new Set(posts.map(p => p.category))]
  const filtered = filter === 'all' ? posts : posts.filter(p => p.category === filter)

  return (
    <main className={styles.page}>
      <section className={styles.heroBanner}>
        <div className={styles.heroBg} aria-hidden />
        <div className="section-container" style={{ paddingTop: 56, paddingBottom: 56 }}>
          <div className={styles.heroInner}>
            <div>
              <motion.span initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="section-label">Writing</motion.span>
              <AnimatedTitle words={['From', 'the', 'Lab']} accentIndex={2} />
              <p className={styles.subtitle}>
                Thoughts on <span className={styles.hiAccent}>genomics</span>, statistics,{' '}
                <span className={styles.hiAccent}>machine learning</span>, and the science of breeding.
                Open a post to read and leave a comment.
              </p>
            </div>
            <div className={styles.heroRight}>
              {isAdmin ? (
                <div className={styles.adminActions}>
                  <motion.button
                    type="button"
                    className="btn-primary"
                    onClick={() => setShowForm(true)}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    + New post
                  </motion.button>
                  <BlogAuthPanel />
                </div>
              ) : (
                <BlogAuthPanel />
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="section-container">
        {!isConfigured && (
          <p className={styles.setupHint}>
            Blog auth uses Supabase + GitHub. Copy <code>.env.example</code> to <code>.env</code> and follow <code>SETUP_SUPABASE.md</code>.
          </p>
        )}
        {loadError && <p className={styles.loadError}>Could not load posts: {loadError}</p>}
        {loading && <p className={styles.loading}>Loading posts…</p>}

        <div className={styles.filtersBar}>
          {cats.map(c => (
            <button key={c} type="button" className={`${styles.filterBtn} ${filter === c ? styles.activeFilter : ''}`} onClick={() => setFilter(c)}>
              {c.charAt(0).toUpperCase() + c.slice(1)}
            </button>
          ))}
        </div>

        <motion.div className={styles.grid} layout>
          <AnimatePresence>
            {filtered.map(post => (
              <motion.div key={post.id} layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}>
                <PostCard post={post} onClick={setSelected} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      <AnimatePresence>
        {selected && (
          <PostModal
            post={selected}
            onClose={() => setSelected(null)}
            onDelete={deletePost}
            isAdmin={isAdmin}
            deleting={deleting}
          />
        )}
        {showForm && isAdmin && (
          <NewPostForm
            onSubmit={addPost}
            onClose={() => setShowForm(false)}
            submitting={submitting}
          />
        )}
      </AnimatePresence>
    </main>
  )
}
