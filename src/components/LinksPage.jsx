import { useState, useEffect } from 'react'
import FilmGrain from './FilmGrain'
import LinkIcon from './LinkIcon'
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
      <FilmGrain opacity={0.08} fps={24} />

      <div className={styles.container}>
        <div className={styles.avatarWrap}>
          <div className={styles.avatar}>
            <img src="/me.jpg" alt="Dario Viegas" />
          </div>
          {/* Paper plane orbiting the photo */}
          <div className={styles.orbitRing} aria-hidden="true">
            <svg className={styles.plane} viewBox="0 0 24 24" fill="currentColor">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
            </svg>
          </div>
        </div>

        <h1 className={styles.name}>DARIO VIEGAS<span className={styles.dot}>.</span></h1>
        <p className={styles.bio}>Filmmaker &amp; Photographer</p>

        <nav className={styles.links}>
          {links.map(link => (
            <a
              key={link.id}
              href={`/api/go/${link.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              <LinkIcon url={link.url} className={styles.icon} />
              {link.title}
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
