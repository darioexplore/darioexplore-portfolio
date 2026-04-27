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
          {/* Paper plane + dashed trail orbiting the photo.
               Both live in one SVG so they rotate as a unit.
               Trail arc: 120° of the circle behind the plane.
               Plane: outlined origami style with fold hatching. */}
          <div className={styles.orbitWrapper} aria-hidden="true">
            <svg className={styles.orbitSvg} viewBox="-82 -82 164 164">
              {/* 120° dashed trail — the arc the plane just flew */}
              <path
                d="M -53.7 31 A 62 62 0 0 1 0 -62"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeDasharray="5 7"
                strokeLinecap="round"
                opacity="0.3"
              />
              {/* Plane at 12 o'clock, nose pointing east (CW travel dir) */}
              <g transform="translate(0,-62)" className={styles.planeGroup}>
                {/* Upper wing */}
                <path d="M 11 0 L -10 -12 L -3 0 Z" />
                {/* Lower wing (mirror) */}
                <path d="M 11 0 L -10  12 L -3 0 Z" />
                {/* Centre spine */}
                <line x1="11" y1="0"   x2="-3" y2="0"  />
                {/* Tail-fold hatching on upper wing */}
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
              <LinkIcon url={link.url} title={link.title} className={styles.icon} />
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
