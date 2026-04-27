import styles from './About.module.css'

export default function About() {
  return (
    <section id="about" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.textCol}>
          <div className={`${styles.marker} reveal`}>03 — About</div>
          <h2 className={`${styles.title} reveal`}>
            About<span className={styles.accent}>.</span>
          </h2>

          <p className={`${styles.lead} reveal`}>
            I'm Dario, a filmmaker, photographer, and visual storyteller
            creating cinematic work around travel, culture, and human connection.
          </p>

          <p className={`${styles.body} reveal`}>
            I focus on capturing what a place feels like, not just how it
            looks, turning moments, landscapes, and experiences into stories
            people remember.
          </p>

          <p className={`${styles.body} reveal`}>
            Through films, photography, and brand collaborations, I work
            with hotels, tourism boards, and lifestyle brands to create
            visual narratives that feel honest, cinematic, and timeless.
          </p>

          <p className={`${styles.closing} reveal`}>
            Because the best visuals do more than look beautiful.<br />
            <strong>They make people feel something.</strong>
          </p>
        </div>

        <div className={styles.photoCol}>
          <div className={styles.frame}>
            <img
              src="/me.jpg"
              alt="Dario Viegas — portrait"
              className={`${styles.photo} reveal`}
              loading="lazy"
            />
          </div>
          <div className={`${styles.caption} reveal`}>
            Dario Viegas <span className={styles.accent}>/</span> On location
          </div>
        </div>
      </div>
    </section>
  )
}
