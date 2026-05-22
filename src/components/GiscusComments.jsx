import { useEffect, useRef } from 'react'
import styles from './GiscusComments.module.css'

/**
 * Visitor comments via Giscus (GitHub Discussions).
 * Configure in .env — see .env.example
 */
const REPO = import.meta.env.VITE_GISCUS_REPO
const REPO_ID = import.meta.env.VITE_GISCUS_REPO_ID
const CATEGORY = import.meta.env.VITE_GISCUS_CATEGORY || 'Blog Comments'
const CATEGORY_ID = import.meta.env.VITE_GISCUS_CATEGORY_ID

export default function GiscusComments({ postId, postTitle }) {
  const containerRef = useRef(null)

  useEffect(() => {
    if (!REPO || !REPO_ID || !CATEGORY_ID || !containerRef.current) return

    const host = containerRef.current
    host.innerHTML = ''

    const script = document.createElement('script')
    script.src = 'https://giscus.app/client.js'
    script.async = true
    script.crossOrigin = 'anonymous'
    script.setAttribute('data-repo', REPO)
    script.setAttribute('data-repo-id', REPO_ID)
    script.setAttribute('data-category', CATEGORY)
    script.setAttribute('data-category-id', CATEGORY_ID)
    script.setAttribute('data-mapping', 'specific')
    script.setAttribute('data-term', `blog-post-${postId}`)
    script.setAttribute('data-strict', '0')
    script.setAttribute('data-reactions-enabled', '1')
    script.setAttribute('data-emit-metadata', '0')
    script.setAttribute('data-input-position', 'top')
    script.setAttribute('data-theme', document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light')
    script.setAttribute('data-lang', 'en')
    script.setAttribute('data-loading', 'lazy')

    host.appendChild(script)

    return () => {
      host.innerHTML = ''
    }
  }, [postId])

  if (!REPO || !REPO_ID || !CATEGORY_ID) {
    return (
      <div className={styles.setup}>
        <h4 className={styles.setupTitle}>Comments</h4>
        <p>
          Public comments will appear here once Giscus is configured for this site.
          Visitors sign in with GitHub to comment on <strong>{postTitle}</strong>.
        </p>
        <p className={styles.setupHint}>
          Site owner: add <code>VITE_GISCUS_*</code> variables (see <code>.env.example</code>).
        </p>
      </div>
    )
  }

  return (
    <section className={styles.section} aria-label={`Comments on ${postTitle}`}>
      <h4 className={styles.title}>Comments</h4>
      <p className={styles.hint}>Sign in with GitHub to leave a comment. Anyone can read and reply.</p>
      <div ref={containerRef} className={styles.giscus} />
    </section>
  )
}
