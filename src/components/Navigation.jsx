import { useEffect, useState } from 'react'
import styles from './Navigation.module.css'

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.inner}>
        <a href="#top" className={styles.logo}>
          DARIO VIEGAS<span className={styles.dot}>.</span>
        </a>
        <nav>
          <ul className={styles.links}>
            <li><a href="#work">Selected Work</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#approach">Approach</a></li>
          </ul>
        </nav>
        <a href="#contact" className={styles.cta}>Start a Project</a>
      </div>
    </header>
  )
}
