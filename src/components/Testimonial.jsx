import styles from './Testimonial.module.css'

export default function Testimonial() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.openMark} aria-hidden="true">"</div>
        <blockquote className={`${styles.quote} reveal`}>
          The film exceeded everything we imagined — it's now the centrepiece of our global campaign.
        </blockquote>
        <cite className={`${styles.attribution} reveal`}>
          — Head of Marketing, Fairmont Hotels &amp; Resorts
        </cite>
      </div>
    </section>
  )
}
