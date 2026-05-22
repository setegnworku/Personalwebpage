import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import styles from './Navbar.module.css'

const links = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'shiny-apps', label: 'Applications' },
  { id: 'blog', label: 'Blog' },
  { id: 'contact', label: 'Contact' },
]

export default function Navbar({ active, onNav, theme, onToggleTheme }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navigate = (id) => {
    onNav(id)
    setMenuOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.container}>
        <button className={styles.logo} onClick={() => navigate('home')}>
          Setegn<span>.</span>
        </button>

        <div className={`${styles.links} ${menuOpen ? styles.open : ''}`}>
          {links.map(link => (
            <button
              key={link.id}
              className={`${styles.link} ${active === link.id ? styles.active : ''}`}
              onClick={() => navigate(link.id)}
            >
              {link.label}
              {active === link.id && (
                <motion.span layoutId="nav-indicator" className={styles.indicator} />
              )}
            </button>
          ))}
        </div>

        <div className={styles.actions}>
          <button className={styles.themeBtn} onClick={onToggleTheme} aria-label="Toggle theme">
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
          <button
            className={`${styles.hamburger} ${menuOpen ? styles.open : ''}`}
            onClick={() => setMenuOpen(m => !m)}
            aria-label="Toggle menu"
          >
            <span /><span /><span />
          </button>
        </div>
      </div>
    </nav>
  )
}
