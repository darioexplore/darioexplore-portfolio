import { useEffect } from 'react'
import styles from './ProjectPage.module.css'

function scrollToContact() {
  setTimeout(() => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
  }, 80)
}

export default function ProjectPage({ project, onBack }) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [project.slug])

  return (
    <div className={styles.page}>
      {/* Back bar */}
      <div className={styles.back}>
        <button className={styles.backBtn} onClick={onBack}>
          <span className={styles.backArrow}>←</span>
          Back
        </button>
        <span className={styles.breadcrumb}>
          <span>Work</span>
          <span className={styles.sep}>—</span>
          <span>{project.title}</span>
        </span>
      </div>

      {/* Hero image — always horizontal. Use project.hero if provided, else crop images[0]. */}
      <div className={styles.hero}>
        <img
          className={styles.heroImg}
          src={project.hero ?? project.images[0]}
          alt={project.title}
        />
      </div>

      {/* Header */}
      <div className={styles.header}>
        <div>
          <div className={styles.subtitle}>{project.subtitle}</div>
          <h1 className={styles.title}>{project.title}</h1>
        </div>
        <div>
          <div className={styles.meta}>
            <div className={styles.metaRow}>
              <span className={styles.metaLabel}>Category</span>
              <span className={styles.metaVal}>{project.category}</span>
            </div>
            <div className={styles.metaRow}>
              <span className={styles.metaLabel}>Year</span>
              <span className={styles.metaVal}>{project.year}</span>
            </div>
            <div className={styles.metaRow}>
              <span className={styles.metaLabel}>Location</span>
              <span className={styles.metaVal}>{project.location}</span>
            </div>
          </div>
          <p className={styles.description} style={{ marginTop: 32 }}>{project.description}</p>
        </div>
      </div>

      {/* Gallery */}
      <div className={styles.gallery}>
        <div className={styles.galleryGrid}>
          {project.images.map((src, i) => (
            <div key={i} className={styles.galleryItem}>
              <img
                className={styles.galleryImg}
                src={src}
                alt={`${project.title} — ${i + 1}`}
                loading={i < 3 ? 'eager' : 'lazy'}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className={styles.ctaBar}>
        <p className={styles.ctaText}>
          Let's Create Something<br />
          That <span className={styles.accent}>Stands Out</span>
        </p>
        <button
          className={styles.ctaBtn}
          onClick={() => { onBack(); scrollToContact() }}
        >
          Start a Project
        </button>
      </div>
    </div>
  )
}
