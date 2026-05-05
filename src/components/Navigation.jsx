import { useEffect, useRef, useState } from 'react'
import styles from './Navigation.module.css'

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const hamburgerRef = useRef(null)
  const menuRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll while menu is open and move focus into dialog
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    if (menuOpen) {
      const first = menuRef.current?.querySelector(FOCUSABLE)
      first?.focus()
    } else {
      hamburgerRef.current?.focus()
    }
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  // Focus trap: keep Tab/Shift+Tab inside the menu while open
  useEffect(() => {
    if (!menuOpen) return
    function onKeyDown(e) {
      if (e.key === 'Escape') { setMenuOpen(false); return }
      if (e.key !== 'Tab') return
      const focusable = Array.from(menuRef.current?.querySelectorAll(FOCUSABLE) ?? [])
      if (!focusable.length) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last.focus() }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first.focus() }
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [menuOpen])

  const close = () => setMenuOpen(false)

  return (
    <>
      <header className={`${styles.nav} ${scrolled ? styles.scrolled : ''} ${menuOpen ? styles.menuActive : ''}`}>
        <div className={styles.inner}>
          <a href="#top" className={styles.logo} onClick={close}>
            DARIO VIEGAS<span className={styles.dot}>.</span>
          </a>

          {/* Desktop nav */}
          <nav>
            <ul className={styles.links}>
              <li><a href="#top">Home</a></li>
              <li><a href="#work">Selected Work</a></li>
              <li><a href="#services">Services</a></li>
              <li><a href="#about">About</a></li>
            </ul>
          </nav>
          <a href="#contact" className={styles.cta}>Start a Project</a>

          {/* Hamburger — mobile only */}
          <button
            ref={hamburgerRef}
            className={styles.hamburger}
            onClick={() => setMenuOpen(o => !o)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            {menuOpen ? (
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                <line x1="2" y1="2" x2="16" y2="16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                <line x1="16" y1="2" x2="2" y2="16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            ) : (
              <svg width="22" height="14" viewBox="0 0 22 14" fill="none" aria-hidden="true">
                <line x1="0" y1="1"  x2="22" y2="1"  stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                <line x1="0" y1="7"  x2="22" y2="7"  stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                <line x1="0" y1="13" x2="22" y2="13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            )}
          </button>
        </div>
      </header>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div
          id="mobile-menu"
          ref={menuRef}
          className={styles.mobileMenu}
          role="dialog"
          aria-modal="true"
          aria-label="Navigation"
        >
          <nav className={styles.mobileLinks}>
            <a href="#top"      onClick={close}><span className={styles.linkNum}>00</span>Home</a>
            <a href="#work"     onClick={close}><span className={styles.linkNum}>01</span>Selected Work</a>
            <a href="#services" onClick={close}><span className={styles.linkNum}>02</span>Services</a>
            <a href="#about"    onClick={close}><span className={styles.linkNum}>03</span>About</a>
          </nav>
          <a href="#contact" onClick={close} className={styles.mobileCta}>
            Start a Project →
          </a>
        </div>
      )}
    </>
  )
}
