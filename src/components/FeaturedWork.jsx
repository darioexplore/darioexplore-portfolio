import styles from './FeaturedWork.module.css'

const WORKS = [
  {
    idx: '01',
    slug: 'ponant',
    title: 'Ponant — Arctic',
    meta: '2024 / Destination',
    image: encodeURI('/portfolio/ponant/n°01_BO070724_Glacier-Kangerlussuaq©PONANT-Dario Viegas.jpg'),
    span: 'wide',
    frame: 'wide'
  },
  {
    idx: '02',
    slug: 'fairmont',
    title: 'Fairmont Udaipur',
    meta: '2024 / Hospitality',
    image: encodeURI('/portfolio/fairmont/Fairmont - Udaipur - stills-15.jpg'),
    span: 'third',
    frame: 'tall'
  },
  {
    idx: '03',
    slug: 'tropicfeel',
    title: 'Tropicfeel',
    meta: '2024 / Brand Film',
    image: '/portfolio/tropicfeel/bi-60.jpg_4.jpg',
    span: 'half',
    frame: 'square'
  },
  {
    idx: '04',
    slug: 'samsonite',
    title: 'Samsonite',
    meta: '2024 / Campaign',
    image: '/portfolio/samsonite/Samsonite-4.jpg',
    span: 'half',
    frame: 'square'
  },
  {
    idx: '05',
    slug: 'colombia',
    title: 'Passporter × Colombia',
    meta: '2024 / Tourism',
    image: '/portfolio/colombia/colombia-3.jpg',
    span: 'third',
    frame: 'tall'
  },
  {
    idx: '06',
    slug: 'dji',
    title: 'DJI × Sony',
    meta: '2024 / Tech',
    image: '/portfolio/dji/Sony-400-800-263.jpg',
    span: 'wide',
    frame: 'wide'
  }
]

export default function FeaturedWork() {
  function openProject(slug) {
    window.location.hash = `project/${slug}`
  }

  return (
    <section id="work" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <div className={styles.marker}>01 — Selected Work</div>
            <h2 className={`${styles.title} reveal`}>
              Selected <span className={styles.accent}>Work</span>
            </h2>
          </div>
          <p className={`${styles.sub} reveal`}>
            A selection of cinematic films and visual stories.
          </p>
        </div>

        <div className={styles.grid}>
          {WORKS.map((w) => (
            <button
              key={w.idx}
              onClick={() => openProject(w.slug)}
              className={`${styles.card} ${styles[w.span]} reveal`}
              style={{ background: 'none', border: 'none', padding: 0, textAlign: 'left' }}
            >
              <div className={`${styles.frame} ${styles[w.frame]}`}>
                <span className={styles.index}>N° {w.idx}</span>
                <img className={styles.img} src={w.image} alt={w.title} loading="lazy" />
                <span className={styles.titleOverlay}>{w.title}</span>
                <span className={styles.metaOverlay}>{w.meta}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
