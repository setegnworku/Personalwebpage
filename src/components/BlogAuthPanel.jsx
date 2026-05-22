import { useState } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import styles from './BlogAuthPanel.module.css'

export default function BlogAuthPanel({ onClose }) {
  const { user, isAdmin, isConfigured, adminUsername, signInWithGitHub, signOut, loading } = useAuth()
  const [error, setError] = useState('')
  const [signingIn, setSigningIn] = useState(false)

  const handleGitHubSignIn = async () => {
    setError('')
    setSigningIn(true)
    const { error: err } = await signInWithGitHub()
    setSigningIn(false)
    if (err) setError(err)
    else onClose?.()
  }

  if (!isConfigured) {
    return (
      <motion.div className={styles.banner} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <p>
          Add <code>VITE_SUPABASE_URL</code> and <code>VITE_SUPABASE_ANON_KEY</code> to <code>.env</code>.
          See <code>SETUP_SUPABASE.md</code>.
        </p>
      </motion.div>
    )
  }

  if (loading) {
    return <p className={styles.hint}>Checking sign-in…</p>
  }

  if (user && isAdmin) {
    return (
      <div className={styles.adminActions}>
        <span className={styles.signedIn}>
          Signed in as <strong>@{user.user_metadata?.user_name}</strong>
        </span>
        <button type="button" className={styles.signOutBtn} onClick={signOut}>
          Sign out
        </button>
      </div>
    )
  }

  if (user && !isAdmin) {
    return (
      <div className={styles.warnBox}>
        <p>
          Signed in as <strong>@{user.user_metadata?.user_name}</strong>, but only{' '}
          <strong>@{adminUsername}</strong> can manage posts.
        </p>
        <button type="button" className={styles.signOutBtn} onClick={signOut}>
          Sign out
        </button>
      </div>
    )
  }

  return (
    <div className={styles.guest}>
      <motion.button
        type="button"
        className={styles.githubBtn}
        onClick={handleGitHubSignIn}
        disabled={signingIn}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {signingIn ? 'Redirecting…' : 'Sign in with GitHub'}
      </motion.button>
      <p className={styles.hint}>Only @{adminUsername} can create and delete posts.</p>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  )
}
