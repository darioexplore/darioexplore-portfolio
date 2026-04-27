import { useState } from 'react'
import styles from './Contact.module.css'

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mvzddjwo'

const SOCIALS = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/darioexplore',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
        <circle cx="12" cy="12" r="4"/>
        <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none"/>
      </svg>
    ),
  },
  {
    label: 'YouTube',
    href: 'https://www.youtube.com/@darioexplore',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
        <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="currentColor" stroke="none"/>
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/darioexplore',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
        <rect x="2" y="9" width="4" height="12"/>
        <circle cx="4" cy="4" r="2"/>
      </svg>
    ),
  },
  {
    label: 'Threads',
    href: 'https://www.threads.net/@darioexplore',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.473 12.01v-.017c.027-3.579.877-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-.481-1.817-1.4-3.24-2.721-4.237-1.43-1.082-3.315-1.64-5.58-1.657-2.82.02-5.007.917-6.5 2.666-1.394 1.634-2.122 4.059-2.146 7.09.024 3.035.752 5.462 2.146 7.098 1.492 1.75 3.68 2.647 6.502 2.666h.006c2.491-.018 4.295-.618 5.573-1.836 1.438-1.364 1.9-3.325 1.9-4.63 0-.086-.003-.17-.008-.254-.135-2.14-1.407-3.37-3.447-3.37-1.184 0-2.07.437-2.69 1.302-.387.543-.594 1.168-.614 1.86.02.69.216 1.28.582 1.756.377.49.887.75 1.455.75.75 0 1.35-.353 1.805-1.05a3.7 3.7 0 0 0 .568-1.997l2.057-.03c0 1.11-.274 2.17-.791 3.065-.693 1.2-1.793 1.89-3.094 1.94h-.046c-1.075 0-2.02-.457-2.73-1.32-.608-.736-.934-1.687-.934-2.766 0-.071.002-.142.006-.213.05-1.078.378-2.062.977-2.913.906-1.278 2.226-1.982 3.708-1.982 2.932 0 5.174 1.835 5.455 5.271.006.1.01.2.01.3 0 1.592-.537 4.022-2.551 5.923-1.636 1.542-3.877 2.335-6.66 2.353z"/>
      </svg>
    ),
  },
]

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', company: '', message: '' })
  const [status, setStatus] = useState('idle')

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setStatus('success')
        setForm({ name: '', email: '', company: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
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


        {status === 'success' ? (
          <div className={styles.successMsg}>
            Message sent — I'll be in touch soon.
          </div>
        ) : (
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
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
              required
            />
            <div className={styles.selectWrap}>
              <select
                className={`${styles.field} ${styles.select} ${!form.company ? styles.selectEmpty : ''}`}
                value={form.company}
                onChange={e => setForm(f => ({ ...f, company: e.target.value }))}
                required
              >
                <option value="" disabled>What's the type of your company?</option>
                <option value="Tourism Board">Tourism Board</option>
                <option value="Travel Agency">Travel Agency</option>
                <option value="Adventure/Travel Brand">Adventure/Travel Brand</option>
                <option value="Individual">Individual</option>
                <option value="Content Creator/Influencer">Content Creator/Influencer</option>
                <option value="Hotel/Resort/Accommodation Brand">Hotel/Resort/Accommodation Brand</option>
                <option value="Other">Other</option>
              </select>
              <span className={styles.selectArrow} aria-hidden="true">↓</span>
            </div>
            <textarea
              className={`${styles.field} ${styles.textarea}`}
              placeholder="Message"
              rows={5}
              value={form.message}
              onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
              required
            />
            {status === 'error' && (
              <p className={styles.errorMsg}>Something went wrong — try emailing directly.</p>
            )}
            <button type="submit" className={styles.cta} disabled={status === 'sending'}>
              {status === 'sending' ? 'Sending…' : 'Send Message'}
            </button>
          </form>
        )}
      </div>
    </section>
  )
}
