import styles from './About.module.css'

const APPROACH_STEPS = [
  {
    idx: '01',
    label: 'Feel First',
    text: 'Every project starts with one question — How should this feel? Emotion leads, aesthetics follow.',
  },
  {
    idx: '02',
    label: 'Shape the Story',
    text: 'I work closely with brands to find the visual language that feels natural and aligned — never forced or overproduced.',
  },
  {
    idx: '03',
    label: 'Make it Stay',
    text: "The result is work that doesn't just look good. It stays with people long after they've seen it.",
  },
]

export default function About() {
  return (
    <section id="about" className={styles.section}>
      {/* About: marker + title left, body + photo right */}
      <div className={styles.grid}>
        <div className={styles.left}>
          <div className={styles.marker}>04 — About / Positioning</div>
          <h2 className={`${styles.statement} reveal`}>
            About<span className={styles.accent}>.</span>
          </h2>
          <p className={`${styles.approachLead} reveal`}>
            I create cinematic visuals that go beyond aesthetics —
            work that makes people <span className={styles.accent}>feel</span> something.
          </p>
        </div>
        <div className={styles.right}>
          <p className={`${styles.body} reveal`}>
            My approach blends <strong>storytelling, atmosphere, and natural beauty</strong>
            {' '}to craft films that connect on a deeper level.
          </p>
          <p className={`${styles.body} reveal`}>
            From remote landscapes to curated brand experiences,
            I focus on capturing moments that feel
            <strong> timeless, immersive, and real.</strong>
          </p>
          <div className={`${styles.photoWrap} reveal`}>
            <img src="/photoperonal-14.jpg" alt="Dario Viegas" className={styles.photo} />
          </div>
        </div>
      </div>

      {/* Approach: title left, bullet steps right */}
      <div id="approach" className={styles.approach}>
        <div className={styles.approachLeft}>
          <div className={`${styles.marker} reveal`}>05 — Approach</div>
          <h3 className={`${styles.approachTitle} reveal`}>
            Approach<span className={styles.accent}>.</span>
          </h3>
          <p className={`${styles.approachLead} reveal`}>
            Every project starts with a simple idea:<br />
            <em>How should this feel?</em>
          </p>
        </div>
        <div className={styles.approachRight}>
          <ul className={styles.stepList}>
            {APPROACH_STEPS.map((s) => (
              <li key={s.idx} className={`${styles.step} reveal`}>
                <div className={styles.stepHead}>
                  <span className={styles.stepIdx}>{s.idx}</span>
                  <span className={styles.stepLabel}>{s.label}</span>
                </div>
                <p className={styles.stepText}>{s.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Why It Works */}
      <div className={styles.results}>
        <div className={styles.feelingBg} aria-hidden="true">Feeling</div>
        <div className={styles.resultsLeft}>
          <div className={`${styles.marker} reveal`}>07 — Why It Works</div>
          <h3 className={`${styles.resultsTitle} reveal`}>
            Why It <span className={styles.accent}>Works</span>
          </h3>
        </div>
        <div className={styles.resultsRight}>
          <p className={`${styles.body} reveal`}>
            In a world of endless content, attention comes from <strong>feeling</strong> — not just visuals.
            My work is designed to:
          </p>
          <ul className={styles.pillars}>
            <li className={`${styles.pillar} reveal`}>
              <span className={styles.pillarIdx}>01 —</span>
              <p className={styles.pillarText}>Capture attention instantly</p>
            </li>
            <li className={`${styles.pillar} reveal`}>
              <span className={styles.pillarIdx}>02 —</span>
              <p className={styles.pillarText}>Build emotional connection</p>
            </li>
            <li className={`${styles.pillar} reveal`}>
              <span className={styles.pillarIdx}>03 —</span>
              <p className={styles.pillarText}>Elevate brand perception</p>
            </li>
          </ul>
          <p className={`${styles.closing} reveal`}>
            Because people don't remember content.<br />
            <strong>They remember how it made them feel.</strong>
          </p>
        </div>
      </div>
    </section>
  )
}
