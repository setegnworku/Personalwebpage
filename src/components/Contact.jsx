import { useState } from 'react'
import { motion } from 'framer-motion'
import styles from './Contact.module.css'

const socials = [
  { icon: '🎓', label: 'Google Scholar', sub: 'Publications & Citations', url: 'https://scholar.google.com/citations?user=YhoIPOUAAAAJ&hl=en', color: '#4285F4' },
  { icon: '💼', label: 'LinkedIn', sub: 'Professional Network', url: 'https://www.linkedin.com/in/setegn-alemu-1b346817b/', color: '#0A66C2' },
  { icon: '📘', label: 'Facebook', sub: 'Personal Updates', url: 'https://www.facebook.com/setegn.alemu', color: '#1877F2' },
]

const topics = [
  { icon: '🧬', title: 'Genomic Selection', tags: ['GBLUP','ssGBLUP','Multi-species'], desc: 'Prediction models across species — from poultry to ruminants' },
  { icon: '🌡️', title: 'Climate-Smart Breeding', tags: ['Methane','GxE','Adaptation'], desc: 'Methane reduction, gene-environment interactions & sustainability' },
  { icon: '📊', title: 'Statistical Methods', tags: ['BLUPF90','Bayesian','ML'], desc: 'Linear mixed models, Bayesian neural networks, multi-omics' },
  { icon: '💻', title: 'Tool Development', tags: ['R Shiny','Python','Pipelines'], desc: 'Interactive dashboards & large-scale genetic data pipelines' },
]

function AnimatedTitle({ words, accentIndex = -1 }) {
  return (
    <motion.div className={styles.animatedTitle} variants={{ hidden: {}, show: { transition: { staggerChildren: 0.04 } } }} initial="hidden" whileInView="show" viewport={{ once: true }}>
      {words.map((word, wi) => (
        <span key={wi} className={styles.titleWord}>
          {word.split('').map((char, ci) => (
            <motion.span key={ci} variants={{ hidden: { opacity: 0, y: 36, rotateX: -80 }, show: { opacity: 1, y: 0, rotateX: 0, transition: { duration: 0.45, ease: [0.4,0,0.2,1] } } }} className={wi === accentIndex ? styles.titleAccent : ''}>{char}</motion.span>
          ))}
        </span>
      ))}
    </motion.div>
  )
}

export default function Contact() {
  const [copied, setCopied] = useState(false)
  const email = 'workusetegn@gmail.com'

  const copy = () => {
    navigator.clipboard.writeText(email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2200)
  }

  const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } } }
  const item = (delay = 0) => ({ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, delay } } })

  return (
    <main className={styles.page}>

      <section className={`${styles.heroBanner} noise-overlay`}>
        <div className={styles.heroBg} aria-hidden />
        <div className="section-container" style={{ paddingTop: 60, paddingBottom: 60 }}>
          <motion.span variants={item(0)} initial="hidden" whileInView="show" viewport={{ once: true }} className="section-label">Contact</motion.span>
          <AnimatedTitle words={["Let's", 'Collaborate']} accentIndex={1} />
          <motion.p variants={item(0.4)} initial="hidden" whileInView="show" viewport={{ once: true }} className={styles.heroSub}>
            Open to research collaborations, speaking engagements, and consulting on quantitative genetics &amp; climate-smart breeding.
          </motion.p>
        </div>
      </section>

      <section className="section-container">
        <div className={styles.layout}>

          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className={styles.leftCol}>

            <motion.div variants={item()} className={styles.emailCard}>
              <div className={styles.emailTop}>
                <div>
                  <div className={styles.emailLabel}>Primary Email</div>
                  <a href={`mailto:${email}`} className={styles.emailAddr}>{email}</a>
                </div>
                <motion.button
                  className={`${styles.copyBtn} ${copied ? styles.copied : ''}`}
                  onClick={copy}
                  whileTap={{ scale: 0.95 }}
                >
                  {copied ? '✓ Copied!' : 'Copy'}
                </motion.button>
              </div>
              <a href={`mailto:${email}`} className="btn-primary" style={{ display: 'inline-flex', marginTop: 20 }}>
                Send Email →
              </a>
            </motion.div>

            <motion.div variants={item()} className={styles.infoCard}>
              <div className={styles.infoRow}>
                <div className={styles.infoIcon}>📍</div>
                <div>
                  <div className={styles.infoTitle}>ILRI – Nairobi, Kenya</div>
                  <div className={styles.infoSub}>International Livestock Research Institute</div>
                </div>
              </div>
              <div className={styles.infoRow}>
                <div className={styles.infoIcon}>🌍</div>
                <div>
                  <div className={styles.infoTitle}>Remote Collaboration</div>
                  <div className={styles.infoSub}>Available worldwide</div>
                </div>
              </div>
              <div className={styles.availRow}>
                <span className={styles.availDot} />
                <span>Currently open to new collaborations</span>
              </div>
            </motion.div>

            <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className={styles.socials}>
              {socials.map(s => (
                <motion.a
                  key={s.label}
                  href={s.url} target="_blank" rel="noopener noreferrer"
                  className={styles.socialCard}
                  variants={item()}
                  whileHover={{ x: 6, transition: { duration: 0.2 } }}
                  style={{ '--social-color': s.color }}
                >
                  <span className={styles.socialIcon}>{s.icon}</span>
                  <div>
                    <div className={styles.socialLabel}>{s.label}</div>
                    <div className={styles.socialSub}>{s.sub}</div>
                  </div>
                  <span className={styles.socialArrow}>→</span>
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 36 }}
            whileInView={{ opacity: 1, x: 0, transition: { duration: 0.6, delay: 0.15 } }}
            viewport={{ once: true }}
            className={styles.rightCol}
          >
            <div className={styles.topicsHeader}>
              <span className="section-label">Collaboration Topics</span>
              <p className={styles.topicsSub}>Areas where I'm most interested in connecting</p>
            </div>
            <div className={styles.topicsGrid}>
              {topics.map((t, i) => (
                <motion.div
                  key={t.title}
                  className={styles.topicCard}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0, transition: { delay: i * 0.1 } }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
                >
                  <span className={styles.topicIcon}>{t.icon}</span>
                  <div className={styles.topicTitle}>{t.title}</div>
                  <div className={styles.topicDesc}>{t.desc}</div>
                  <div className={styles.topicTags}>{t.tags.map(tag => <span key={tag} className={styles.topicTag}>{tag}</span>)}</div>
                </motion.div>
              ))}
            </div>

            <div className={styles.ctaBox}>
              <div className={styles.ctaTitle}>Ready to connect?</div>
              <p className={styles.ctaText}>Whether it's a joint paper, a consulting question, or just sharing ideas — I'd love to hear from you.</p>
              <a href={`mailto:${email}`} className="btn-primary" style={{ display: 'inline-flex' }}>
                Start a Conversation →
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
