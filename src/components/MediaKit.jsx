import styles from './MediaKit.module.css'

/* ─── UPDATE THESE NUMBERS ──────────────────────────────────────────────── */
const PLATFORMS = [
  { name: 'Instagram',  handle: '@dario.explore', followers: '50K+',  metric: '4.8%',  metricLabel: 'Engagement' },
  { name: 'YouTube',    handle: '@dario.explore', followers: '12K+',  metric: '3.2K',  metricLabel: 'Avg Views'  },
  { name: 'Vimeo',      handle: 'darioexplore',   followers: '2K+',   metric: '98%',   metricLabel: 'Completion' },
]

const QUICK_STATS = [
  { value: '8+',   label: 'Years Experience' },
  { value: '20+',  label: 'Countries' },
  { value: '50+',  label: 'Brand Projects' },
  { value: '2M+',  label: 'Total Reach' },
]

const AGE_DATA = [
  { range: '18–24', pct: 22 },
  { range: '25–34', pct: 41 },
  { range: '35–44', pct: 24 },
  { range: '45–54', pct: 9  },
  { range: '55+',   pct: 4  },
]

const LOCATIONS = [
  { name: 'Portugal',       pct: 28 },
  { name: 'United States',  pct: 19 },
  { name: 'United Kingdom', pct: 14 },
  { name: 'Brazil',         pct: 11 },
  { name: 'Germany',        pct: 8  },
  { name: 'Other',          pct: 20 },
]

const GENDER = { male: 55, female: 45 }

const CONTENT_MIX = [
  { label: 'Travel & Destination', pct: 45, color: 'var(--fg)'     },
  { label: 'Brand Films',          pct: 30, color: 'var(--accent)'  },
  { label: 'Photography',          pct: 25, color: 'var(--muted)'   },
]
/* ──────────────────────────────────────────────────────────────────────── */

const SERVICES = [
  { idx: '01', title: 'Cinematic Brand Films',           desc: 'Narrative-driven films built to feel, not just to sell. Identity captured through atmosphere, pacing, and restraint.' },
  { idx: '02', title: 'Travel & Destination Campaigns',  desc: 'Visual stories rooted in place — from remote Arctic landscapes to luxury escapes, shaped to feel immersive and real.' },
  { idx: '03', title: 'Photography & Visual Assets',     desc: 'Stills with cinematic intent. Textures, moments, and compositions built for editorial and brand ecosystems.' },
  { idx: '04', title: 'Social Content & Short-Form',     desc: 'Short-form pieces engineered for attention — crafted with the same precision and atmosphere as the long form.' },
]

const BRANDS = [
  { src: '/logos/DJI_id5sH6ECbd_1.png',                               alt: 'DJI'                  },
  { src: '/logos/Samsonite_id8Lnz9qyU_0.png',                         alt: 'Samsonite'             },
  { src: '/logos/ponant-vector-logo-2.png',                            alt: 'Ponant'                },
  { src: '/logos/Hyatt_idaaVkqqMk_1.png',                              alt: 'Hyatt'                 },
  { src: '/logos/Celebrity_Cruises_idcWrfMjLQ_1.png',                  alt: 'Celebrity Cruises'     },
  { src: '/logos/OPPO_ideybZNjGZ_1.png',                               alt: 'OPPO'                  },
  { src: '/logos/Xiaomi_Logo_1.png',                                   alt: 'Xiaomi'                },
  { src: '/logos/Vectorexperiance-abudhabi-dark.svg',                  alt: 'Experience Abu Dhabi'  },
]

const PROJECTS = [
  { image: encodeURI('/portfolio/ponant/n°01_BO070724_Glacier-Kangerlussuaq©PONANT-Dario Viegas.jpg'), title: 'Ponant — Arctic',    cat: 'Destination Campaign' },
  { image: encodeURI('/portfolio/fairmont/Fairmont - Udaipur - stills-18.jpg'),                        title: 'Fairmont Udaipur',  cat: 'Hospitality'          },
  { image: '/portfolio/dji/Sony-400-800-263.jpg',                                                      title: 'DJI',               cat: 'Tech Campaign'        },
]

/* ── Charts ─────────────────────────────────────────────────────────────── */

function BarChart({ data }) {
  const max = Math.max(...data.map(d => d.pct))
  return (
    <div className={styles.barChart}>
      {data.map(d => (
        <div key={d.range} className={styles.barRow}>
          <span className={styles.barLabel}>{d.range}</span>
          <div className={styles.barTrack}>
            <div className={styles.barFill} style={{ width: `${(d.pct / max) * 100}%` }} />
          </div>
          <span className={styles.barPct}>{d.pct}%</span>
        </div>
      ))}
    </div>
  )
}

function DonutChart({ male, female }) {
  const r = 54
  const cx = 70
  const cy = 70
  const circ = 2 * Math.PI * r
  const maleDash = (male / 100) * circ
  const femaleDash = (female / 100) * circ
  const femaleOffset = maleDash
  return (
    <svg viewBox="0 0 140 140" className={styles.donut}>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="var(--rule-strong)" strokeWidth="14"/>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="var(--fg)" strokeWidth="14"
        strokeDasharray={`${maleDash} ${circ - maleDash}`}
        strokeDashoffset={0}
        transform={`rotate(-90 ${cx} ${cy})`}/>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="var(--accent)" strokeWidth="14"
        strokeDasharray={`${femaleDash} ${circ - femaleDash}`}
        strokeDashoffset={-femaleOffset}
        transform={`rotate(-90 ${cx} ${cy})`}/>
    </svg>
  )
}

function HorizBars({ data }) {
  return (
    <div className={styles.horizBars}>
      {data.map(d => (
        <div key={d.name} className={styles.horizRow}>
          <span className={styles.horizLabel}>{d.name}</span>
          <div className={styles.horizTrack}>
            <div className={styles.horizFill} style={{ width: `${d.pct}%` }} />
          </div>
          <span className={styles.horizPct}>{d.pct}%</span>
        </div>
      ))}
    </div>
  )
}

function ContentDonut({ data }) {
  const r = 54
  const cx = 70
  const cy = 70
  const circ = 2 * Math.PI * r
  let offset = 0
  return (
    <svg viewBox="0 0 140 140" className={styles.donut}>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="var(--rule)" strokeWidth="14"/>
      {data.map(d => {
        const dash = (d.pct / 100) * circ
        const el = (
          <circle key={d.label} cx={cx} cy={cy} r={r} fill="none"
            stroke={d.color} strokeWidth="14"
            strokeDasharray={`${dash} ${circ - dash}`}
            strokeDashoffset={-offset}
            transform={`rotate(-90 ${cx} ${cy})`}/>
        )
        offset += dash
        return el
      })}
    </svg>
  )
}

/* ── Page ────────────────────────────────────────────────────────────────── */

export default function MediaKit() {
  return (
    <div className={styles.page}>

      {/* ── 1. COVER ─────────────────────────────────────────────────── */}
      <section className={styles.cover}>
        <img src="/me.jpg" alt="Dario Viegas" className={styles.coverPhoto} />
        <div className={styles.coverOverlay} />
        <div className={styles.coverContent}>
          <div className={styles.coverTop}>
            <span className={styles.coverMarker}>Media Kit — 2025</span>
            <span className={styles.coverAvail}>
              <span className={styles.dot} />Available for Collaborations
            </span>
          </div>
          <div className={styles.coverBottom}>
            <p className={styles.coverEyebrow}>Filmmaker <span className={styles.accentText}>/</span> Photographer</p>
            <h1 className={styles.coverName}>Dario Viegas<span className={styles.accentText}>.</span></h1>
            <p className={styles.coverTagline}>Cinematic Stories That Make People Feel</p>
            <div className={styles.quickStats}>
              {QUICK_STATS.map(s => (
                <div key={s.label} className={styles.quickStat}>
                  <span className={styles.quickVal}>{s.value}</span>
                  <span className={styles.quickLabel}>{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. ABOUT ─────────────────────────────────────────────────── */}
      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionMarker}>01 — About</div>
          <div className={styles.aboutGrid}>
            <div className={styles.aboutText}>
              <h2 className={styles.sectionTitle}>Who I Am<span className={styles.accentText}>.</span></h2>
              <p className={styles.lead}>
                I'm Dario, a filmmaker, photographer, and visual storyteller creating
                cinematic work around travel, culture, and human connection.
              </p>
              <p className={styles.body}>
                I focus on capturing what a place <em>feels like</em>, not just how it looks —
                turning moments, landscapes, and experiences into stories people remember.
              </p>
              <p className={styles.body}>
                Through films, photography, and brand collaborations, I work with hotels,
                tourism boards, and lifestyle brands to create visual narratives that feel
                honest, cinematic, and timeless.
              </p>
              <div className={styles.contactLine}>
                <a href="mailto:hello@darioexplore.com" className={styles.contactLink}>hello@darioexplore.com</a>
                <span className={styles.sep}>·</span>
                <a href="https://darioexplore.com" className={styles.contactLink}>darioexplore.com</a>
                <span className={styles.sep}>·</span>
                <a href="https://instagram.com/dario.explore" className={styles.contactLink}>@dario.explore</a>
              </div>
            </div>
            <div className={styles.aboutPhoto}>
              <img src="/me.jpg" alt="Dario Viegas" className={styles.portrait} />
              <span className={styles.photoCaption}>On location <span className={styles.accentText}>/</span> Worldwide</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. PLATFORMS ─────────────────────────────────────────────── */}
      <section className={styles.darkSection}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionMarkerLight}>02 — Platforms & Reach</div>
          <div className={styles.platformsGrid}>
            {PLATFORMS.map(p => (
              <div key={p.name} className={styles.platformCard}>
                <div className={styles.platformName}>{p.name}</div>
                <div className={styles.platformHandle}>{p.handle}</div>
                <div className={styles.platformFollowers}>{p.followers}</div>
                <div className={styles.platformFollowersLabel}>Followers</div>
                <div className={styles.platformRule} />
                <div className={styles.platformMetric}>{p.metric}</div>
                <div className={styles.platformMetricLabel}>{p.metricLabel}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. AUDIENCE ──────────────────────────────────────────────── */}
      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionMarker}>03 — Audience Demographics</div>
          <h2 className={styles.sectionTitle}>Who's Watching<span className={styles.accentText}>.</span></h2>
          <div className={styles.demoGrid}>

            {/* Age */}
            <div className={styles.demoCard}>
              <div className={styles.demoCardTitle}>Age Breakdown</div>
              <BarChart data={AGE_DATA} />
            </div>

            {/* Gender */}
            <div className={styles.demoCard}>
              <div className={styles.demoCardTitle}>Gender Split</div>
              <div className={styles.donutWrap}>
                <DonutChart male={GENDER.male} female={GENDER.female} />
                <div className={styles.donutLegend}>
                  <div className={styles.legendRow}>
                    <span className={styles.legendDot} style={{ background: 'var(--fg)' }} />
                    <span>Male — {GENDER.male}%</span>
                  </div>
                  <div className={styles.legendRow}>
                    <span className={styles.legendDot} style={{ background: 'var(--accent)' }} />
                    <span>Female — {GENDER.female}%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Content Mix */}
            <div className={styles.demoCard}>
              <div className={styles.demoCardTitle}>Content Mix</div>
              <div className={styles.donutWrap}>
                <ContentDonut data={CONTENT_MIX} />
                <div className={styles.donutLegend}>
                  {CONTENT_MIX.map(d => (
                    <div key={d.label} className={styles.legendRow}>
                      <span className={styles.legendDot} style={{ background: d.color }} />
                      <span>{d.label} — {d.pct}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Locations */}
            <div className={`${styles.demoCard} ${styles.demoCardWide}`}>
              <div className={styles.demoCardTitle}>Top Locations</div>
              <HorizBars data={LOCATIONS} />
            </div>

          </div>
        </div>
      </section>

      {/* ── 5. SERVICES ──────────────────────────────────────────────── */}
      <section className={styles.darkSection}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionMarkerLight}>04 — Services</div>
          <h2 className={styles.sectionTitleLight}>What I Do<span className={styles.accentText}>.</span></h2>
          <div className={styles.servicesGrid}>
            {SERVICES.map(s => (
              <div key={s.idx} className={styles.serviceCard}>
                <div className={styles.serviceIdx}>{s.idx}</div>
                <h3 className={styles.serviceTitle}>{s.title}</h3>
                <p className={styles.serviceDesc}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. SELECTED WORK ─────────────────────────────────────────── */}
      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionMarker}>05 — Selected Work</div>
          <h2 className={styles.sectionTitle}>Recent Projects<span className={styles.accentText}>.</span></h2>
          <div className={styles.projectsGrid}>
            {PROJECTS.map(p => (
              <div key={p.title} className={styles.projectCard}>
                <div className={styles.projectImgWrap}>
                  <img src={p.image} alt={p.title} className={styles.projectImg} loading="lazy" />
                  <div className={styles.projectOverlay}>
                    <span className={styles.projectCat}>{p.cat}</span>
                    <span className={styles.projectTitle}>{p.title}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. BRANDS ────────────────────────────────────────────────── */}
      <section className={styles.brandsSection}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionMarker}>06 — Brand Partners</div>
          <h2 className={styles.sectionTitle}>Trusted By<span className={styles.accentText}>.</span></h2>
          <div className={styles.brandsGrid}>
            {BRANDS.map(b => (
              <div key={b.alt} className={styles.brandItem}>
                <img src={b.src} alt={b.alt} className={styles.brandLogo} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. CTA ───────────────────────────────────────────────────── */}
      <section className={styles.ctaSection}>
        <div className={styles.sectionInner}>
          <p className={styles.ctaMarker}>07 — Let's Work Together</p>
          <h2 className={styles.ctaHeadline}>Ready to Create<br/>Something<span className={styles.accentText}> Memorable?</span></h2>
          <a href="mailto:hello@darioexplore.com" className={styles.ctaBtn}>
            hello@darioexplore.com
          </a>
          <div className={styles.ctaLinks}>
            <a href="https://darioexplore.com" className={styles.ctaLink}>darioexplore.com</a>
            <span className={styles.ctaDot}>·</span>
            <a href="https://instagram.com/dario.explore" className={styles.ctaLink}>@dario.explore</a>
          </div>
        </div>
      </section>

    </div>
  )
}
