import { useState, useEffect, useCallback } from 'react'
import styles from './AdminPage.module.css'

const SESSION_KEY = 'dv_admin_pw'

export default function AdminPage() {
  const [password, setPassword] = useState('')
  const [authed, setAuthed] = useState(false)
  const [links, setLinks] = useState([])
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [msg, setMsg] = useState({ text: '', error: false })
  const [editingId, setEditingId] = useState(null)
  const [editTitle, setEditTitle] = useState('')
  const [editUrl, setEditUrl] = useState('')

  const storedPw = sessionStorage.getItem(SESSION_KEY)

  const flash = (text, error = false) => {
    setMsg({ text, error })
    setTimeout(() => setMsg({ text: '', error: false }), 3000)
  }

  const fetchLinks = useCallback(async (pw) => {
    try {
      const r = await fetch('/api/links')
      setLinks(await r.json())
    } catch {
      flash('Could not load links.', true)
    }
  }, [])

  // Auto-login if password saved in session
  useEffect(() => {
    if (!storedPw) return
    fetch('/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: storedPw }),
    }).then(r => {
      if (r.ok) { setAuthed(true); fetchLinks() }
      else sessionStorage.removeItem(SESSION_KEY)
    })
  }, [fetchLinks])

  async function login(e) {
    e.preventDefault()
    const r = await fetch('/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    })
    if (!r.ok) { flash('Wrong password.', true); return }
    sessionStorage.setItem(SESSION_KEY, password)
    setAuthed(true)
    fetchLinks()
  }

  function logout() {
    sessionStorage.removeItem(SESSION_KEY)
    setAuthed(false)
    setPassword('')
    setLinks([])
  }

  const pw = sessionStorage.getItem(SESSION_KEY) || password

  async function addLink(e) {
    e.preventDefault()
    const r = await fetch('/api/links', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, url, password: pw }),
    })
    if (!r.ok) { flash('Something went wrong.', true); return }
    setTitle(''); setUrl('')
    flash('Link added.')
    fetchLinks()
  }

  async function deleteLink(id) {
    if (!confirm('Delete this link?')) return
    const r = await fetch(`/api/links/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: pw }),
    })
    if (!r.ok) { flash('Something went wrong.', true); return }
    flash('Deleted.')
    fetchLinks()
  }

  function startEdit(link) {
    setEditingId(link.id)
    setEditTitle(link.title)
    setEditUrl(link.url)
  }

  function cancelEdit() {
    setEditingId(null)
    setEditTitle('')
    setEditUrl('')
  }

  async function saveEdit(id) {
    const r = await fetch(`/api/links/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: editTitle, url: editUrl, password: pw }),
    })
    if (!r.ok) { flash('Something went wrong.', true); return }
    cancelEdit()
    flash('Saved.')
    fetchLinks()
  }

  // ── Login screen ─────────────────────────────────────────────
  if (!authed) {
    return (
      <div className={styles.page}>
        <div className={styles.loginWrap}>
          <div className={styles.marker}>Links — Admin</div>
          <form onSubmit={login} className={styles.loginForm}>
            <input
              type="password"
              className={styles.input}
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              autoFocus
              autoComplete="current-password"
            />
            <button type="submit" className={styles.btn}>Enter →</button>
            {msg.text && <span className={`${styles.msg} ${msg.error ? styles.err : ''}`}>{msg.text}</span>}
          </form>
        </div>
      </div>
    )
  }

  // ── Admin screen ─────────────────────────────────────────────
  return (
    <div className={styles.page}>
      <div className={styles.container}>

        <div className={styles.header}>
          <span className={styles.marker}>Links — Admin</span>
          <div className={styles.headerRight}>
            <a href="/links" className={styles.back}>← Public page</a>
            <button onClick={logout} className={styles.logoutBtn}>Log out</button>
          </div>
        </div>

        {/* Add link */}
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
          <div className={styles.formRow}>
            <button type="submit" className={styles.btn}>Add →</button>
            {msg.text && <span className={`${styles.msg} ${msg.error ? styles.err : ''}`}>{msg.text}</span>}
          </div>
        </form>

        {/* Link list */}
        <div className={styles.list}>
          <div className={styles.label}>Existing links ({links.length})</div>
          {links.length === 0 && <div className={styles.empty}>No links yet.</div>}
          {links.map(link => (
            <div key={link.id} className={styles.linkRow}>
              {editingId === link.id ? (
                <div className={styles.editBlock}>
                  <input
                    className={styles.input}
                    value={editTitle}
                    onChange={e => setEditTitle(e.target.value)}
                    placeholder="Title"
                  />
                  <input
                    className={styles.input}
                    value={editUrl}
                    onChange={e => setEditUrl(e.target.value)}
                    placeholder="https://"
                  />
                  <div className={styles.editActions}>
                    <button className={styles.btn} onClick={() => saveEdit(link.id)}>Save →</button>
                    <button className={styles.cancelBtn} onClick={cancelEdit}>Cancel</button>
                  </div>
                </div>
              ) : (
                <>
                  <div className={styles.linkInfo}>
                    <div className={styles.linkTitle}>{link.title}</div>
                    <div className={styles.linkUrl}>{link.url}</div>
                  </div>
                  <div className={styles.actions}>
                    <button className={styles.actionBtn} onClick={() => startEdit(link)}>Edit</button>
                    <button className={styles.actionBtn} onClick={() => deleteLink(link.id)}>Delete</button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}
