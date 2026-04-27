import { useState, useEffect } from 'react'
import FilmGrain from './FilmGrain'
import styles from './LinksPage.module.css'

export default function LinksPage() {
  const [links, setLinks] = useState([])

  useEffect(() => {
    fetch('/api/links')
      .then(r => r.json())
      .then(setLinks)
      .catch(() => {})
  }, [])

  return (
    <div className={styles.page}>
      <FilmGrain opacity={0.06} fps={24} />

      <div className={styles.container}>
        <div className={styles.frame}>
          <img src="/me.jpg" alt="Dario Viegas" className={styles.photo} />
        </div>

        <h1 className={styles.name}>
          DARIO VIEGAS<span className={styles.dot}>.</span>
        </h1>

        <p className={styles.bio}>Filmmaker &amp; Photographer</p>

        <nav className={styles.links}>
          {links.map(link => (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              <span>{link.title}</span>
              <span className={styles.arrow}>↗</span>
            </a>
          ))}
          {links.length === 0 && (
            <p className={styles.empty}>No links yet.</p>
          )}
        </nav>

        <footer className={styles.footer}>© 2025 Dario Viegas</footer>
      </div>
    </div>
  )
}
