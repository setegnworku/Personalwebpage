import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Applications from './components/Applications'
import Blog from './components/Blog'
import Contact from './components/Contact'
import Footer from './components/Footer'
import CustomCursor from './components/CustomCursor'
import ScrollProgress from './components/ScrollProgress'

const pageVariants = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] } },
  exit: { opacity: 0, y: -16, transition: { duration: 0.25 } },
}

const sections = { home: Hero, about: About, 'shiny-apps': Applications, blog: Blog, contact: Contact }

export default function App() {
  const [section, setSection] = useState('home')
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light')

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => setTheme(t => (t === 'light' ? 'dark' : 'light'))

  const navigate = (id) => {
    setSection(id)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const ActiveSection = sections[section] || Hero

  return (
    <>
      <CustomCursor />
      <ScrollProgress />
      <Navbar active={section} onNav={navigate} theme={theme} onToggleTheme={toggleTheme} />
      <AnimatePresence mode="wait">
        <motion.div key={section} variants={pageVariants} initial="initial" animate="animate" exit="exit">
          <ActiveSection onNav={navigate} />
        </motion.div>
      </AnimatePresence>
      <Footer onNav={navigate} />
    </>
  )
}
