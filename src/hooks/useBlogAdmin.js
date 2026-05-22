import { useState, useCallback, useEffect } from 'react'

const SESSION_KEY = 'setegn_blog_admin'

function normalizeSecret(value) {
  if (!value || typeof value !== 'string') return ''
  const trimmed = value.trim()
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1)
  }
  return trimmed
}

/** Password from build-time env (GitHub Actions) or local config file */
function loadAdminPassword() {
  const fromEnv = normalizeSecret(import.meta.env.VITE_BLOG_ADMIN_PASSWORD)
  if (fromEnv) return Promise.resolve(fromEnv)

  return import('../config/blogAdmin.config.js')
    .then((m) => normalizeSecret(m.BLOG_ADMIN_PASSWORD))
    .catch(() => '')
}

export function useBlogAdmin() {
  const [adminPassword, setAdminPassword] = useState('')
  const [ready, setReady] = useState(false)
  const [isAdmin, setIsAdmin] = useState(
    () => sessionStorage.getItem(SESSION_KEY) === '1'
  )

  useEffect(() => {
    let cancelled = false
    loadAdminPassword().then((pwd) => {
      if (!cancelled) {
        setAdminPassword(pwd)
        setReady(true)
      }
    })
    return () => { cancelled = true }
  }, [])

  const login = useCallback(
    (password) => {
      if (!ready) {
        return { ok: false, error: 'Still loading. Try again in a moment.' }
      }
      if (!adminPassword) {
        return {
          ok: false,
          error:
            'Blog admin is not set up. Create src/config/blogAdmin.config.js (copy from blogAdmin.config.example.js) or set VITE_BLOG_ADMIN_PASSWORD in .env, then refresh.',
        }
      }
      if (password.trim() !== adminPassword) {
        return { ok: false, error: 'Incorrect password.' }
      }
      sessionStorage.setItem(SESSION_KEY, '1')
      setIsAdmin(true)
      return { ok: true }
    },
    [adminPassword, ready]
  )

  const logout = useCallback(() => {
    sessionStorage.removeItem(SESSION_KEY)
    setIsAdmin(false)
  }, [])

  return {
    isAdmin,
    isConfigured: ready && Boolean(adminPassword),
    login,
    logout,
  }
}
