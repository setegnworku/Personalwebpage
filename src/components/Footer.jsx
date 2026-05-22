import styles from './Footer.module.css'

const links = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'shiny-apps', label: 'Applications' },
  { id: 'blog', label: 'Blog' },
  { id: 'contact', label: 'Contact' },
]

export default function Footer({ onNav }) {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <button className={styles.logo} onClick={() => onNav('home')}>
          Setegn<span>.</span>
        </button>

        <nav className={styles.links}>
          {links.map(l => (
            <button key={l.id} className={styles.link} onClick={() => onNav(l.id)}>{l.label}</button>
          ))}
        </nav>

        <p className={styles.copy}>
          © {new Date().getFullYear()} Dr. Setegn Worku Alemu. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
