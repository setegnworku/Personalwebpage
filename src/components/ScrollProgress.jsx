import { useScroll, useSpring, motion } from 'framer-motion'

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 })

  return (
    <motion.div
      style={{
        scaleX,
        position: 'fixed',
        top: 0, left: 0, right: 0,
        height: '3px',
        background: 'linear-gradient(90deg, #00D4AA, #00A3E0, #8B5CF6)',
        transformOrigin: '0%',
        zIndex: 9999,
      }}
    />
  )
}
