import { useState, useEffect } from 'react'
import FilmGrain from './FilmGrain'
import LinkIcon from './LinkIcon'
import styles from './LinksPage.module.css'

// Irregular closed bezier oval — wider on the right, higher on the left.
// Varies between ~58–76 px from centre so it never looks like a perfect circle.
const FLIGHT_PATH =
  'M 5 -62 C 45 -68 74 -24 70 22 C 66 64 16 74 -20 62 C -54 50 -78 8 -70 -32 C -62 -65 -24 -70 5 -62 Z'

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
          {/* Paper plane following an irregular bezier orbit.
               animateMotion traces FLIGHT_PATH; rotate="auto" keeps
               the nose always pointing in the direction of travel.
               The same path is drawn as a dashed "track" behind it. */}
          <div className={styles.orbitWrapper} aria-hidden="true">
            <svg className={styles.orbitSvg} viewBox="-90 -90 180 180">
              <defs>
                <path id="planePath" d={FLIGHT_PATH} />
              </defs>

              {/* Full dashed track — the irregular orbit path */}
              <path
                d={FLIGHT_PATH}
                fill="none"
                stroke="currentColor"
                strokeDasharray="5 8"
                strokeWidth="1.1"
                strokeLinecap="round"
                opacity="0.22"
              />

              {/* Paper plane — animateMotion moves + rotates it automatically */}
              <g className={styles.planeGroup}>
                <animateMotion dur="8s" repeatCount="indefinite" rotate="auto">
                  <mpath href="#planePath" />
                </animateMotion>
                {/* Upper wing */}
                <path d="M 11 0 L -10 -12 L -3 0 Z" />
                {/* Lower wing (mirror) */}
                <path d="M 11 0 L -10  12 L -3 0 Z" />
                {/* Centre spine */}
                <line x1="11" y1="0" x2="-3" y2="0" />
                {/* Tail-fold hatching */}
                <line x1="-10" y1="-12" x2="-7" y2="-3" />
                <line x1="-8"  y1="-12" x2="-5" y2="-4" />
                <line x1="-6"  y1="-11" x2="-4" y2="-6" />
              </g>
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

        {/* Availability status + contact CTA */}
        <div className={styles.statusBlock}>
          <div className={styles.availability}>
            <span className={styles.pingDot} aria-hidden="true" />
            Available for work
          </div>
          <a href="/#contact" target="_blank" rel="noopener noreferrer" className={styles.ctaBtn}>
            Get in touch →
          </a>
        </div>

        <footer className={styles.footer}>© 2025 Dario Viegas</footer>
      </div>
    </div>
  )
}
