import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import styles from './CustomCursor.module.css'

export default function CustomCursor() {
  const [visible, setVisible] = useState(false)
  const [clicking, setClicking] = useState(false)
  const [hovering, setHovering] = useState(false)

  const mx = useMotionValue(-100)
  const my = useMotionValue(-100)

  const sx = useSpring(mx, { stiffness: 500, damping: 32, mass: 0.4 })
  const sy = useSpring(my, { stiffness: 500, damping: 32, mass: 0.4 })
  const tx = useSpring(mx, { stiffness: 120, damping: 22, mass: 0.6 })
  const ty = useSpring(my, { stiffness: 120, damping: 22, mass: 0.6 })

  useEffect(() => {
    const move = (e) => { mx.set(e.clientX); my.set(e.clientY); setVisible(true) }
    const down = () => setClicking(true)
    const up = () => setClicking(false)
    const over = (e) => {
      const el = e.target.closest('a, button, [data-magnetic]')
      setHovering(!!el)
    }

    window.addEventListener('mousemove', move)
    window.addEventListener('mousedown', down)
    window.addEventListener('mouseup', up)
    window.addEventListener('mouseover', over)
    document.body.style.cursor = 'none'

    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mousedown', down)
      window.removeEventListener('mouseup', up)
      window.removeEventListener('mouseover', over)
      document.body.style.cursor = ''
    }
  }, [mx, my])

  if (!visible) return null

  return (
    <>
      <motion.div
        className={styles.dot}
        style={{ x: sx, y: sy }}
        animate={{ scale: clicking ? 0.5 : hovering ? 0 : 1 }}
        transition={{ duration: 0.15 }}
      />
      <motion.div
        className={styles.ring}
        style={{ x: tx, y: ty }}
        animate={{
          scale: clicking ? 0.7 : hovering ? 2.2 : 1,
          opacity: hovering ? 0.5 : 1,
        }}
        transition={{ duration: 0.2 }}
      />
    </>
  )
}
