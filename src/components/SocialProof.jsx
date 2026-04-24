import styles from './SocialProof.module.css'

export default function SocialProof() {
  return (
    <div className={styles.wrap}>
      <div className={`${styles.line} reveal`}>
        Trusted by brands worldwide
        <span className={styles.dot}>·</span>
        200K+ audience
        <span className={styles.dot}>·</span>
        Millions of views
      </div>
    </div>
  )
}
