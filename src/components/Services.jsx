import styles from './Services.module.css'

function Crosshair() {
  return (
    <svg className={styles.icon} viewBox="0 0 44 44" aria-hidden="true">
      <circle cx="22" cy="22" r="14" />
      <circle cx="22" cy="22" r="2" />
      <line x1="22" y1="2" x2="22" y2="14" />
      <line x1="22" y1="30" x2="22" y2="42" />
      <line x1="2" y1="22" x2="14" y2="22" />
      <line x1="30" y1="22" x2="42" y2="22" />
    </svg>
  )
}
function Diamond() {
  return (
    <svg className={styles.icon} viewBox="0 0 44 44" aria-hidden="true">
      <polygon points="22,4 40,22 22,40 4,22" />
      <polygon points="22,14 30,22 22,30 14,22" />
    </svg>
  )
}
function CircleNode() {
  return (
    <svg className={styles.icon} viewBox="0 0 44 44" aria-hidden="true">
      <circle cx="22" cy="22" r="18" />
      <circle cx="22" cy="22" r="6" />
      <line x1="22" y1="4" x2="22" y2="16" />
      <line x1="22" y1="28" x2="22" y2="40" />
    </svg>
  )
}
function GridNode() {
  return (
    <svg className={styles.icon} viewBox="0 0 44 44" aria-hidden="true">
      <rect x="6" y="6" width="32" height="32" />
      <line x1="6" y1="22" x2="38" y2="22" />
      <line x1="22" y1="6" x2="22" y2="38" />
      <circle cx="22" cy="22" r="3" />
    </svg>
  )
}

const SERVICES = [
  {
    idx: '01',
    icon: <Crosshair />,
    title: 'Cinematic Brand Films',
    body: 'Narrative-driven films that capture identity through atmosphere, pacing, and restraint — built to feel, not to sell.'
  },
  {
    idx: '02',
    icon: <Diamond />,
    title: 'Travel & Destination Campaigns',
    body: 'Visual stories rooted in place — from remote landscapes to curated escapes, shaped to feel immersive and real.'
  },
  {
    idx: '03',
    icon: <CircleNode />,
    title: 'Photography & Visual Assets',
    body: 'Stills with the same cinematic intent — textures, moments, and compositions made for editorial and brand ecosystems.'
  },
  {
    idx: '04',
    icon: <GridNode />,
    title: 'Social Content & Short-Form Video',
    body: 'Short-form pieces engineered for attention — crafted with the same atmosphere and precision as the long form.'
  }
]

export default function Services() {
  return (
    <section id="services" className={styles.section}>
      <div className={styles.marker}>06 — Services</div>

      <div className={styles.header}>
        <h2 className={`${styles.title} reveal`}>
          <span className={styles.accent}>Services</span>
        </h2>
        <p className={`${styles.lead} reveal`}>
          A minimal set of services, executed with cinematic intent.
          Every project is shaped around emotion — not just aesthetics.
        </p>
      </div>

      <div className={styles.grid}>
        {SERVICES.map((s) => (
          <div key={s.idx} className={`${styles.cell} reveal`}>
            <div className={styles.cellIndex}>{s.idx} / Service</div>
            <h3 className={styles.cellTitle}>{s.title}</h3>
            <p className={styles.cellBody}>{s.body}</p>
          </div>
        ))}
      </div>

      <div className={`${styles.footerNote} reveal`}>
        Available <span className={styles.accent}>Worldwide</span>.
      </div>
    </section>
  )
}
