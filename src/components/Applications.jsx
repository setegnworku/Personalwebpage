import { motion } from 'framer-motion'
import { shinyApps } from '../data/content'
import styles from './Applications.module.css'

const tagColors = {
  Genomics: '#00D4AA',
  'Population Genetics': '#00A3E0',
  Poultry: '#F59E0B',
  Dashboard: '#8B5CF6',
  Climate: '#EF4444',
}

function AnimatedTitle({ words, accentIndex = -1 }) {
  return (
    <motion.div
      className={styles.animatedTitle}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.04 } } }}
      initial="hidden" whileInView="show" viewport={{ once: true }}
    >
      {words.map((word, wi) => (
        <span key={wi} className={styles.titleWord}>
          {word.split('').map((char, ci) => (
            <motion.span
              key={ci}
              variants={{ hidden: { opacity: 0, y: 36, rotateX: -80 }, show: { opacity: 1, y: 0, rotateX: 0, transition: { duration: 0.45, ease: [0.4,0,0.2,1] } } }}
              className={wi === accentIndex ? styles.titleAccent : ''}
            >{char}</motion.span>
          ))}
        </span>
      ))}
    </motion.div>
  )
}

export default function Applications() {
  return (
    <main className={styles.page}>
      <section className={`${styles.heroBanner} noise-overlay`}>
        <div className={styles.heroBg} aria-hidden />
        <div className="section-container" style={{ paddingTop: 60, paddingBottom: 60 }}>
          <motion.span
            initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="section-label"
          >Tools</motion.span>
          <AnimatedTitle words={['Interactive', 'Applications']} accentIndex={1} />
          <motion.p
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0, transition: { delay: 0.4 } }} viewport={{ once: true }}
            className={styles.subtitle}
          >
            Web-based tools for genetic data analysis and visualization — making complex
            analyses accessible to researchers and breeding program managers worldwide.
          </motion.p>

          <motion.div
            className={styles.metaRow}
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0, transition: { delay: 0.5 } }} viewport={{ once: true }}
          >
            {[['5', 'Live Apps'], ['R Shiny', 'Platform'], ['Open Access', 'Free to use']].map(([val, label]) => (
              <div key={label} className={styles.metaStat}>
                <span className={styles.metaVal}>{val}</span>
                <span className={styles.metaLabel}>{label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="section-container">
        <motion.div
          className={styles.grid}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } } }}
          initial="hidden" whileInView="show" viewport={{ once: true }}
        >
          {shinyApps.map((app) => {
            const color = tagColors[app.tag]
            return (
              <motion.div
                key={app.title}
                variants={{ hidden: { opacity: 0, y: 32, scale: 0.96 }, show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.4,0,0.2,1] } } }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className={styles.card}
                style={{ '--card-color': color }}
              >
                <div className={styles.cardSidebar} style={{ background: color }} />

                <div className={styles.cardInner}>
                  <div className={styles.cardHeader}>
                    <span className={styles.icon}>{app.icon}</span>
                    <div className={styles.cardHeaderRight}>
                      <span className={styles.tag} style={{ background: `${color}22`, color }}>{app.tag}</span>
                      <span className={styles.liveChip}>● Live</span>
                    </div>
                  </div>

                  <h3 className={styles.cardTitle}>{app.title}</h3>
                  <p className={styles.cardDesc}>{app.desc}</p>

                  <a href={app.url} target="_blank" rel="noopener noreferrer" className={styles.openBtn} style={{ '--btn-color': color }}>
                    <span>Open App</span>
                    <span className={styles.btnArrow}>→</span>
                  </a>
                </div>

                <div className={styles.cardGlow} style={{ background: `radial-gradient(circle, ${color}10 0%, transparent 70%)` }} />
              </motion.div>
            )
          })}
        </motion.div>
      </section>
    </main>
  )
}
