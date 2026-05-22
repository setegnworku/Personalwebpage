import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import styles from './Hero.module.css'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, delay, ease: [0.4, 0, 0.2, 1] } },
})

export default function Hero({ onNav }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])
  const textY  = useTransform(scrollYProgress, [0, 1], ['0%', '12%'])
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  return (
    <section className={styles.hero} ref={ref}>
      <div className={styles.mesh} aria-hidden />
      <div className={styles.noise} aria-hidden />
      <div className={styles.orb1} aria-hidden />
      <div className={styles.orb2} aria-hidden />

      <div className={styles.container}>
        <motion.div className={styles.content} style={{ y: textY, opacity }}>
          <motion.div {...fadeUp(0.1)} className={styles.badge}>
            <span className={styles.dot} />
            Available for Collaboration
          </motion.div>

          <motion.h1 {...fadeUp(0.2)} className={styles.title}>
            Advancing <span>Quantitative</span><br />Genetics Through{' '}
            <span className={styles.gradient}>Innovation</span>
          </motion.h1>

          <motion.p {...fadeUp(0.3)} className={styles.subtitle}>
            Specializing in genomic selection, multi-omics integration, and climate-smart
            breeding strategies for sustainable agriculture.
          </motion.p>

          <motion.div {...fadeUp(0.4)} className={styles.cta}>
            <button className="btn-primary" onClick={() => onNav('contact')}>
              Get in Touch <span>→</span>
            </button>
            <button className="btn-ghost" onClick={() => onNav('blog')}>
              Read Blog
            </button>
          </motion.div>

          <motion.div {...fadeUp(0.5)} className={styles.stats}>
            {[['50+', 'Publications'], ['15+', 'Years Exp.'], ['25+', 'Projects'], ['5', 'Shiny Apps']].map(([val, label]) => (
              <div key={label} className={styles.stat}>
                <span className={styles.statVal}>{val}</span>
                <span className={styles.statLabel}>{label}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          className={styles.imageWrap}
          style={{ y: imageY }}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1, transition: { duration: 0.7, delay: 0.3, ease: [0.4, 0, 0.2, 1] } }}
        >
          <div className={styles.imageRing}>
            <img
              src={`${import.meta.env.BASE_URL}images/circle.png`}
              alt="Dr. Setegn Worku Alemu"
              className={styles.profileImg}
              onError={(e) => {
                e.currentTarget.src = `${import.meta.env.BASE_URL}images/profile-placeholder.svg`
              }}
            />
          </div>

          <motion.div
            className={`${styles.floatCard} ${styles.card1}`}
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            <span className={styles.floatIcon}>📊</span>
            <div>
              <div className={styles.floatLabel}>Publications</div>
              <div className={styles.floatValue}>50+</div>
            </div>
          </motion.div>

          <motion.div
            className={`${styles.floatCard} ${styles.card2}`}
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          >
            <span className={styles.floatIcon}>🧬</span>
            <div>
              <div className={styles.floatLabel}>Experience</div>
              <div className={styles.floatValue}>15+ yrs</div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <div className={styles.scrollHint} onClick={() => onNav('about')}>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>↓</motion.div>
      </div>
    </section>
  )
}
