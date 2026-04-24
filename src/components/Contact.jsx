import { useState } from 'react'
import styles from './Contact.module.css'

export default function Contact() {
  const [form, setForm] = useState({ name: '', company: '', message: '' })

  function handleSubmit(e) {
    e.preventDefault()
    const { name, company, message } = form
    const subject = encodeURIComponent(
      `Project Inquiry${name ? ' from ' + name : ''}${company ? ' / ' + company : ''}`
    )
    const body = encodeURIComponent(message)
    window.location.href = `mailto:hello@darioexplore.com?subject=${subject}&body=${body}`
  }

  return (
    <section id="contact" className={styles.section}>
      <div className={styles.marker}>08 — Contact</div>

      <div className={styles.inner}>
        <h2 className={`${styles.headline} reveal`}>
          Let's Create Something<br />
          That <span className={styles.accent}>Stands Out</span>
        </h2>

        <p className={`${styles.sub} reveal`}>
          If you're looking for visuals that feel different —<br />
          let's talk.
        </p>

        <p className={`${styles.availability} reveal`}>
          Available for 3–5 brand projects per year. Currently accepting inquiries.
        </p>

        <a href="mailto:hello@darioexplore.com" className={`${styles.email} reveal`}>
          hello@darioexplore.com
        </a>

        <form className={`${styles.form} reveal`} onSubmit={handleSubmit} noValidate>
          <input
            className={styles.field}
            type="text"
            placeholder="Name"
            value={form.name}
            onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
            required
          />
          <input
            className={styles.field}
            type="text"
            placeholder="Company"
            value={form.company}
            onChange={e => setForm(f => ({ ...f, company: e.target.value }))}
          />
          <textarea
            className={`${styles.field} ${styles.textarea}`}
            placeholder="Message"
            rows={5}
            value={form.message}
            onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
            required
          />
          <button type="submit" className={styles.cta}>
            Send Message
          </button>
        </form>
      </div>
    </section>
  )
}
