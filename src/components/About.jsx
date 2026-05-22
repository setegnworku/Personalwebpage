import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { stats, skills, researchInterests, tools } from '../data/content'
import styles from './About.module.css'

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, delay, ease: [0.4, 0, 0.2, 1] } },
})

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
              variants={{
                hidden: { opacity: 0, y: 36, rotateX: -80 },
                show: { opacity: 1, y: 0, rotateX: 0, transition: { duration: 0.45, ease: [0.4,0,0.2,1] } },
              }}
              className={wi === accentIndex ? styles.titleAccent : ''}
            >{char}</motion.span>
          ))}
        </span>
      ))}
    </motion.div>
  )
}

function AnimatedCounter({ target, inView }) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!inView) return
    let start = 0
    const step = Math.ceil(target / 40)
    const timer = setInterval(() => {
      start = Math.min(start + step, target)
      setCount(start)
      if (start >= target) clearInterval(timer)
    }, 28)
    return () => clearInterval(timer)
  }, [inView, target])
  return <span>{count}</span>
}

function SkillBar({ name, pct, inView, index }) {
  return (
    <motion.div
      className={styles.skillBar}
      variants={fadeUp(index * 0.08)}
      initial="hidden" animate={inView ? 'show' : 'hidden'}
    >
      <div className={styles.skillLabel}>
        <span>{name}</span>
        <span className={styles.skillPct}>{pct}%</span>
      </div>
      <div className={styles.track}>
        <motion.div
          className={styles.fill}
          initial={{ width: 0 }}
          animate={{ width: inView ? `${pct}%` : 0 }}
          transition={{ duration: 1.1, ease: [0.4, 0, 0.2, 1], delay: 0.15 + index * 0.07 }}
        />
      </div>
    </motion.div>
  )
}

const statIcons = ['📄', '⏳', '🤝', '⚙️']

export default function About() {
  const statsRef = useRef(null)
  const skillsRef = useRef(null)
  const statsInView = useInView(statsRef, { once: true, margin: '-60px' })
  const skillsInView = useInView(skillsRef, { once: true, margin: '-60px' })

  const stagger = (delay = 0) => ({
    hidden: {},
    show: { transition: { staggerChildren: 0.1, delayChildren: delay } },
  })

  return (
    <main className={styles.page}>

      {/* ── Hero Banner ── */}
      <section className={`${styles.heroBanner} noise-overlay`}>
        <div className={styles.heroBg} aria-hidden />
        <div className="section-container" style={{ paddingTop: 64, paddingBottom: 64 }}>
          <motion.span
            initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="section-label"
          >About Me</motion.span>
          <AnimatedTitle words={['Dr.', 'Setegn', 'Worku', 'Alemu']} accentIndex={3} />
          <motion.p
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0, transition: { delay: 0.35 } }} viewport={{ once: true }}
            className={styles.heroSubtitle}
          >
            Quantitative Geneticist · ILRI Nairobi
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0, transition: { delay: 0.45 } }} viewport={{ once: true }}
            className={styles.heroTagline}
          >
            Genomics × Microbiome × Bayesian AI — bridging biology and computation for climate-smart livestock
          </motion.p>
        </div>
      </section>

      {/* ── Bio ── */}
      <section className={styles.bioSection}>
        <div className="section-container">
          <div className={styles.bioGrid}>
            <motion.div
              variants={stagger(0.2)} initial="hidden" whileInView="show" viewport={{ once: true }}
              className={styles.bioCards}
            >
              <motion.div variants={fadeUp()} className={styles.bioCard}>
                <div className={styles.bioCardIcon}>🧬</div>
                <div>
                  <h3 className={styles.bioCardTitle}>Quantitative Genetics</h3>
                  <p className={styles.bioCardText}>
                    Building data-driven tools for <mark className={styles.hi}>climate-smart livestock</mark> and
                    genetic improvement. At <mark className={styles.hiPill}>ILRI</mark>, I work on{' '}
                    <mark className={styles.hi}>methane-related traits</mark> and animal productivity,
                    contributing to <mark className={styles.hiPill}>TDGG</mark> to accelerate genetic gain.
                  </p>
                  <div className={styles.techTags}>
                    {['Linear Mixed Models', 'BLUPF90', 'Genomic Selection', 'TDGG'].map(t => (
                      <span key={t} className={styles.techTag}>{t}</span>
                    ))}
                  </div>
                </div>
              </motion.div>

              <motion.div variants={fadeUp()} className={styles.bioCard}>
                <div className={styles.bioCardIcon}>🤖</div>
                <div>
                  <h3 className={styles.bioCardTitle}>Bayesian AI</h3>
                  <p className={styles.bioCardText}>
                    Developing <mark className={styles.hi}>next-generation prediction models</mark> — a{' '}
                    <mark className={styles.hiGrad}>Bayesian neural network</mark> integrating host DNA &amp; RNA
                    with <mark className={styles.hiPill}>microbiome data</mark> to predict methane emissions in
                    New Zealand sheep, linking biology to on-farm climate impact.
                  </p>
                  <div className={styles.techTags}>
                    {['Bayesian NN', 'Multi-omics', 'DNA + RNA', 'Methane Prediction'].map(t => (
                      <span key={t} className={styles.techTag}>{t}</span>
                    ))}
                  </div>
                </div>
              </motion.div>

              <motion.blockquote variants={fadeUp()} className={styles.quote}>
                <span className={styles.quoteMark}>"</span>
                <span>
                  Linking <span className={styles.qAccent}>genomics</span>,{' '}
                  <span className={styles.qAccent}>microbiome biology</span>, and{' '}
                  <span className={styles.qAccent}>machine learning</span> to make livestock
                  breeding both smarter and more sustainable.
                </span>
              </motion.blockquote>
            </motion.div>

            <motion.div
              variants={fadeUp(0.3)} initial="hidden" whileInView="show" viewport={{ once: true }}
              className={styles.bioMeta}
            >
              <div className={styles.metaCard}>
                <div className={styles.metaRow}><span>📍</span><div><strong>Location</strong><span>ILRI – Nairobi, Kenya</span></div></div>
                <div className={styles.metaRow}><span>🏛️</span><div><strong>Institute</strong><span>International Livestock Research Institute</span></div></div>
                <div className={styles.metaRow}><span>🔬</span><div><strong>Focus</strong><span>Genomic Selection & Multi-omics</span></div></div>
                <div className={styles.metaRow}><span>🌱</span><div><strong>Mission</strong><span>Climate-Smart Breeding</span></div></div>
              </div>
              <div className={styles.availBadge}>
                <span className={styles.availDot} />
                Open to global collaborations
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Global Journey ── */}
      <section className={styles.journeySection}>
        <div className="section-container" style={{ paddingTop: 64, paddingBottom: 64 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className={styles.journeyHeader}
          >
            <motion.span className="section-label" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>Career Path</motion.span>
            <div className={styles.journeyTitle}>
              <span>Global Research</span>{' '}
              <span className={styles.titleAccent}>Journey</span>
            </div>
            <div className={styles.journeyStats}>
              <span className={styles.journeyStat}><strong>7</strong> Countries</span>
              <span className={styles.journeyDot}>·</span>
              <span className={styles.journeyStat}><strong>4</strong> Continents</span>
              <span className={styles.journeyDot}>·</span>
              <span className={styles.journeyStat}><strong>15+</strong> Years</span>
            </div>
          </motion.div>

          <motion.div
            className={styles.journeyGrid}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } } }}
            initial="hidden" whileInView="show" viewport={{ once: true, margin: '-40px' }}
          >
            {[
              { flag: '🇪🇹', country: 'Ethiopia',      role: 'Foundation',              continent: 'Africa'     },
              { flag: '🇳🇱', country: 'Netherlands',  role: 'Wageningen Univ.',        continent: 'Europe'     },
              { flag: '🇺🇸', country: 'USA',          role: 'Iowa State Univ.',        continent: 'N. America' },
              { flag: '🇩🇰', country: 'Denmark',      role: 'Aarhus Univ.',            continent: 'Europe'     },
              { flag: '🇧🇪', country: 'Belgium',      role: 'Univ. of Liège',          continent: 'Europe'     },
              { flag: '🇳🇿', country: 'New Zealand',  role: 'Massey Univ., Hamilton',  continent: 'Oceania', id: 'nz-massey' },
              { flag: '🇳🇿', country: 'New Zealand',  role: 'AgResearch, Dunedin & Mosgiel', continent: 'Oceania', id: 'nz-agresearch' },
              { flag: '🇰🇪', country: 'Kenya',        role: 'ILRI Nairobi',            continent: 'Africa', current: true },
            ].map((stop, i) => (
              <motion.div
                key={stop.id || stop.country + stop.role}
                variants={{ hidden: { opacity: 0, y: 28, scale: 0.95 }, show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease: [0.4,0,0.2,1] } } }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className={`${styles.journeyCard} ${stop.current ? styles.journeyCurrent : ''}`}
              >
                <div className={styles.journeyCardTop}>
                  <span className={styles.journeyFlag}>{stop.flag}</span>
                  {stop.current && <span className={styles.journeyNow}><span className={styles.journeyPulse} />Now</span>}
                  <span className={styles.journeyContinent}>{stop.continent}</span>
                </div>
                <div className={styles.journeyCountry}>{stop.country}</div>
                <div className={styles.journeyRole}>{stop.role}</div>
                <div className={styles.journeyNum}>0{i + 1}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className={`${styles.statsSection} noise-overlay`} ref={statsRef}>
        <div className="section-container" style={{ paddingTop: 56, paddingBottom: 56 }}>
          <div className={styles.statsGrid}>
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 24 }}
                animate={statsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={styles.statCard}
              >
                <div className={styles.statIcon}>{statIcons[i]}</div>
                <div className={styles.statNum}>
                  <AnimatedCounter target={s.value} inView={statsInView} />
                  <span className={styles.statPlus}>+</span>
                </div>
                <div className={styles.statLabel}>{s.label}</div>
                <div className={styles.statBar} style={{ width: `${(s.value / 50) * 100}%` }} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Skills & Tools ── */}
      <section className="section-container" ref={skillsRef}>
        <div className={styles.twoCol}>
          <div>
            <motion.span variants={fadeUp(0)} initial="hidden" whileInView="show" viewport={{ once: true }} className="section-label">Expertise</motion.span>
            <AnimatedTitle words={['Skills', '&', 'Proficiency']} accentIndex={2} />
            <div className={styles.bars}>
              {skills.map((s, i) => <SkillBar key={s.name} {...s} inView={skillsInView} index={i} />)}
            </div>
          </div>

          <div>
            <motion.span variants={fadeUp(0)} initial="hidden" whileInView="show" viewport={{ once: true }} className="section-label">Toolbox</motion.span>
            <AnimatedTitle words={['Software', '&', 'Tools']} accentIndex={0} />
            <motion.div
              className={styles.toolGroups}
              variants={stagger(0.2)} initial="hidden" whileInView="show" viewport={{ once: true }}
            >
              {tools.map(t => (
                <motion.div key={t.category} variants={fadeUp()} className={styles.toolGroup}>
                  <div className={styles.toolCat}>{t.category}</div>
                  <div className={styles.toolTags}>
                    {t.items.map(item => (
                      <motion.span key={item} whileHover={{ scale: 1.05 }} className={styles.tag}>{item}</motion.span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Research Interests ── */}
      <section className={styles.interestsSection}>
        <div className="section-container" style={{ paddingTop: 60, paddingBottom: 60 }}>
          <motion.div className={styles.interestsHeader} initial="hidden" whileInView="show" viewport={{ once: true }} variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}>
            <motion.span variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }} className="section-label">Research</motion.span>
            <div className={styles.animatedTitle}>
              {['Research', 'Interests'].map((word, wi) => (
                <span key={wi} className={styles.titleWord}>
                  {word.split('').map((char, ci) => (
                    <motion.span key={ci} variants={{ hidden: { opacity: 0, y: 40, rotateX: -90 }, show: { opacity: 1, y: 0, rotateX: 0, transition: { duration: 0.5, ease: [0.4,0,0.2,1] } } }} className={wi === 1 ? styles.titleAccent : ''}>{char}</motion.span>
                  ))}
                </span>
              ))}
            </div>
            <motion.p variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.4 } } }} className={styles.interestsSubtitle}>
              Spanning genomics, computation, and climate-driven agriculture
            </motion.p>
          </motion.div>

          <motion.div className={styles.interestsGrid} variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: 0.3 } } }} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }}>
            {researchInterests.map((item, i) => (
              <motion.div key={i} variants={{ hidden: { opacity: 0, y: 30, scale: 0.96 }, show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.4,0,0.2,1] } } }} whileHover={{ y: -6, transition: { duration: 0.2 } }} className={styles.interestCard} style={{ '--card-index': i }}>
                <div className={styles.cardAccentBar} />
                <div className={styles.cardNumber}>0{i + 1}</div>
                <p className={styles.cardText}>{item}</p>
                <div className={styles.cardGlow} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Current Focus ── */}
      <section className="section-container" style={{ paddingTop: 0, paddingBottom: 80 }}>
        <motion.div initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0, transition: { duration: 0.6 } }} viewport={{ once: true }} className={styles.focusCard}>
          <div className={styles.focusLeft}>
            <div className={styles.focusBadge}>🌱 Current Focus</div>
            <h3 className={styles.focusTitle}>Improving Livelihoods of Smallholder Farmers</h3>
            <p className={styles.focusText}>
              Working across low- and middle-income countries to advance dairy and poultry genetic improvement.
              Contributing to the <strong>Tropical Dairy Genetic Gains (TDGG)</strong> initiative to accelerate
              genetic gain in tropical dairy systems, and leading the Africa chapter of the{' '}
              <strong>Global Methane Genetics Initiative</strong> (Bezos Earth Fund) — linking genomics,
              microbiome, and multi-omics data to reduce methane emissions in livestock.
            </p>
          </div>
          <div className={styles.focusRight}>
            <div className={styles.focusStat}><span>🥛</span><div><strong>TDGG</strong><span>Tropical Dairy Genetic Gains</span></div></div>
            <div className={styles.focusStat}><span>🌍</span><div><strong>Methane Initiative</strong><span>Africa chapter · Bezos Earth Fund</span></div></div>
            <div className={styles.focusStat}><span>🌾</span><div><strong>Smallholders</strong><span>Low &amp; middle income countries</span></div></div>
          </div>
        </motion.div>
      </section>
    </main>
  )
}
