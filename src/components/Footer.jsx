import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.row}>
        <div className={styles.logo}>
          DARIO VIEGAS<span className={styles.accent}>.</span>
        </div>
        <ul className={styles.social}>
          <li><a href="https://www.instagram.com/darioexplore" target="_blank" rel="noopener noreferrer">Instagram</a></li>
          <li><a href="https://vimeo.com/darioexplore" target="_blank" rel="noopener noreferrer">Vimeo</a></li>
          <li><a href="https://www.youtube.com/@darioexplore" target="_blank" rel="noopener noreferrer">YouTube</a></li>
        </ul>
      </div>
      <div className={styles.bottom}>
        <span>© 2025 Dario Viegas</span>
        <span>Available Worldwide</span>
      </div>
    </footer>
  )
}
