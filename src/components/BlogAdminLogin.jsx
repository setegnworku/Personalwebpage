import { useState } from 'react'
import { motion } from 'framer-motion'
import styles from './BlogAdminLogin.module.css'

export default function BlogAdminLogin({ onLogin, onClose, isConfigured }) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const submit = (e) => {
    e.preventDefault()
    setError('')
    const result = onLogin(password)
    if (result.ok) {
      setPassword('')
      onClose()
    } else {
      setError(result.error)
    }
  }

  return (
    <motion.div
      className={styles.overlay}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        className={`glass-card ${styles.modal}`}
        initial={{ opacity: 0, y: 24, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.98 }}
        onClick={e => e.stopPropagation()}
      >
        <div className={styles.header}>
          <h3>Author sign-in</h3>
          <button type="button" className={styles.closeBtn} onClick={onClose} aria-label="Close">✕</button>
        </div>
        <p className={styles.desc}>
          Only you can create and delete blog posts. Visitors can comment after opening a post.
        </p>
        {!isConfigured ? (
          <p className={styles.warn}>
            Copy <code>src/config/blogAdmin.config.example.js</code> to{' '}
            <code>blogAdmin.config.js</code> and set your password, then refresh the page.
          </p>
        ) : (
          <form onSubmit={submit} className={styles.form}>
            <label className={styles.label}>
              <span>Password</span>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Your admin password"
                autoComplete="current-password"
                required
              />
            </label>
            {error && <p className={styles.error} role="alert">{error}</p>}
            <button type="submit" className="btn-primary">Sign in</button>
          </form>
        )}
      </motion.div>
    </motion.div>
  )
}
