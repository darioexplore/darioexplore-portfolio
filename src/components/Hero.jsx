import { useState } from 'react'
import styles from './Hero.module.css'

const LOGOS = [
  { src: '/logos/DJI_id5sH6ECbd_1.png',                                               alt: 'DJI' },
  { src: '/logos/Samsonite_id8Lnz9qyU_0.png',                                          alt: 'Samsonite' },
  { src: '/logos/ponant-vector-logo-2.png',                                              alt: 'Ponant' },
  { src: '/logos/Hyatt_idaaVkqqMk_1.png',                                              alt: 'Hyatt' },
  { src: '/logos/Celebrity_Cruises_idcWrfMjLQ_1.png',                                    alt: 'Celebrity Cruises' },
  { src: '/logos/OPPO_ideybZNjGZ_1.png',                                               alt: 'OPPO' },
  { src: '/logos/Xiaomi_Logo_1.png',                                                   alt: 'Xiaomi' },
  { src: '/logos/Vectorexperiance-abudhabi-dark.svg',                                  alt: 'Experience Abu Dhabi' },
  { src: '/logos/a77da30e6dcce4bc45ec52c3be509443.png',                               alt: 'Brand Partner' },
]

function Ticker() {
  const items = [...LOGOS, ...LOGOS, ...LOGOS]
  return (
    <div className={styles.ticker} aria-label="Clients and brand partners">
      <div className={styles.tickerTrack}>
        {items.map((logo, i) => (
          <span key={i} className={styles.tickerItem}>
            <img
              src={logo.src}
              alt={logo.alt}
              className={styles.tickerLogo}
              draggable="false"
            />
          </span>
        ))}
      </div>
    </div>
  )
}

export default function Hero() {
  const [reelOpen, setReelOpen] = useState(false)

  return (
    <>
      <section id="top" className={styles.hero}>
        <video
          className={styles.video}
          src="/video/mainvideo.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        />
        <div className={styles.overlay} />

        <div className={`${styles.marker} fade-up d1`}>
          00 — Reel / 2025
        </div>

        <div className={styles.headlineWrap}>
          <div className={`${styles.eyebrow} fade-up d2`}>
            Filmmaker <span className={styles.accent}>/</span> Photographer
          </div>
          <h1 className={`${styles.headline} fade-up d3`}>
            Cinematic Stories<br />
            That Make People <span className={styles.accentWord}>Feel</span>
          </h1>
          <p className={`${styles.sub} fade-up d4`}>
            Filmmaker &amp; Photographer crafting cinematic visuals for brands,
            destinations, and experiences.
          </p>
          <div className={`${styles.ctaRow} fade-up d5`}>
            <a href="mailto:hello@darioexplore.com" className={styles.ctaBtn}>
              Start a Project
            </a>
            <button className={styles.reelBtn} onClick={() => setReelOpen(true)}>
              Watch Reel ↗
            </button>
          </div>
        </div>
      </section>

      <Ticker />

      {reelOpen && (
        <div className={styles.modal} onClick={() => setReelOpen(false)}>
          <div className={styles.modalInner} onClick={e => e.stopPropagation()}>
            <button className={styles.modalClose} onClick={() => setReelOpen(false)}>✕</button>
            <iframe
              className={styles.modalIframe}
              src="https://player.vimeo.com/video/000000000?autoplay=1&title=0&byline=0&portrait=0"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              title="Dario Viegas — Reel 2025"
            />
          </div>
        </div>
      )}
    </>
  )
}
