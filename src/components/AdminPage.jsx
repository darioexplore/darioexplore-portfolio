import { useState, useEffect, useCallback } from 'react'
import styles from './AdminPage.module.css'

export default function AdminPage() {
  const [password, setPassword] = useState(
    () => sessionStorage.getItem('dv_admin_pw') ?? ''
  )
  const [links, setLinks] = useState([])
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [msg, setMsg] = useState({ text: '', error: false })

  const flash = (text, error = false) => {
    setMsg({ text, error })
    setTimeout(() => setMsg({ text: '', error: false }), 3000)
  }

  const fetchLinks = useCallback(async () => {
    try {
      const r = await fetch('/api/links')
      setLinks(await r.json())
    } catch {
      flash('Could not load links.', true)
    }
  }, [])

  useEffect(() => { fetchLinks() }, [fetchLinks])

  async function addLink(e) {
    e.preventDefault()
    const r = await fetch('/api/links', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, url, password }),
    })
    if (r.status === 401) { flash('Wrong password.', true); return }
    if (!r.ok) { flash('Something went wrong.', true); return }
    sessionStorage.setItem('dv_admin_pw', password)
    setTitle('')
    setUrl('')
    flash('Link added.')
    fetchLinks()
  }

  async function deleteLink(id) {
    if (!confirm('Delete this link?')) return
    const r = await fetch(`/api/links/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    })
    if (r.status === 401) { flash('Wrong password.', true); return }
    flash('Deleted.')
    fetchLinks()
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>

        <div className={styles.header}>
          <span className={styles.marker}>Links — Admin</span>
          <a href="/links" className={styles.back}>← Public page</a>
        </div>

        {/* Password */}
        <div className={styles.field}>
          <label className={styles.label}>Admin password</label>
          <input
            type="password"
            className={styles.input}
            placeholder="••••••••"
            value={password}
            onChange={e => setPassword(e.target.value)}
            autoComplete="current-password"
          />
        </div>

        {/* Add link form */}
        <form onSubmit={addLink} className={styles.form}>
          <div className={styles.label}>Add link</div>
          <input
            className={styles.input}
            placeholder="Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
          />
          <input
            className={styles.input}
            placeholder="https://"
            type="url"
            value={url}
            onChange={e => setUrl(e.target.value)}
            required
          />
          <div className={styles.row}>
            <button type="submit" className={styles.btn}>Add →</button>
            {msg.text && (
              <span className={`${styles.msg} ${msg.error ? styles.err : ''}`}>
                {msg.text}
              </span>
            )}
          </div>
        </form>

        {/* Existing links */}
        <div className={styles.list}>
          <div className={styles.label}>Existing links ({links.length})</div>
          {links.length === 0 && (
            <div className={styles.empty}>No links yet.</div>
          )}
          {links.map(link => (
            <div key={link.id} className={styles.linkRow}>
              <div className={styles.linkInfo}>
                <div className={styles.linkTitle}>{link.title}</div>
                <div className={styles.linkUrl}>{link.url}</div>
              </div>
              <button
                className={styles.del}
                onClick={() => deleteLink(link.id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}
