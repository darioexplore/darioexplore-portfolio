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
  const [stats, setStats] = useState([])
  const [days, setDays] = useState(7)
  const [statsLoading, setStatsLoading] = useState(false)

  const storedPw = sessionStorage.getItem(SESSION_KEY)

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

  const fetchStats = useCallback(async (pw, d) => {
    setStatsLoading(true)
    try {
      const r = await fetch(`/api/stats?password=${encodeURIComponent(pw)}&days=${d}`)
      if (r.ok) setStats(await r.json())
    } finally {
      setStatsLoading(false)
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
      if (r.ok) { setAuthed(true); fetchLinks(); fetchStats(storedPw, 7) }
      else sessionStorage.removeItem(SESSION_KEY)
    })
  }, [fetchLinks, fetchStats])

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
    fetchStats(password, 7)
  }

  function logout() {
    sessionStorage.removeItem(SESSION_KEY)
    setAuthed(false)
    setPassword('')
    setLinks([])
  }

  const pw = sessionStorage.getItem(SESSION_KEY) || password

  function authHeaders() {
    return { 'Content-Type': 'application/json', 'Authorization': `Bearer ${pw}` }
  }

  async function addLink(e) {
    e.preventDefault()
    const r = await fetch('/api/links', {
      method: 'POST',
      headers: authHeaders(),
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
      headers: authHeaders(),
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
      headers: authHeaders(),
      body: JSON.stringify({ title: editTitle, url: editUrl }),
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

        {/* Stats */}
        <div className={styles.statsBlock}>
          <div className={styles.statsHeader}>
            <div className={styles.label} style={{margin:0}}>Click stats</div>
            <div className={styles.dayBtns}>
              {[7, 14, 30].map(d => (
                <button
                  key={d}
                  className={`${styles.dayBtn} ${days === d ? styles.dayBtnActive : ''}`}
                  onClick={() => {
                    setDays(d)
                    fetchStats(sessionStorage.getItem(SESSION_KEY), d)
                  }}
                >{d}d</button>
              ))}
            </div>
          </div>
          {statsLoading && <div className={styles.statsLoading}>Loading…</div>}
          {!statsLoading && stats.length === 0 && <div className={styles.empty}>No data yet.</div>}
          {!statsLoading && stats.map(s => (
            <div key={s.id} className={styles.statRow}>
              <span className={styles.statTitle}>{s.title}</span>
              <span className={styles.statCount}>{s.clicks} click{s.clicks !== 1 ? 's' : ''}</span>
            </div>
          ))}
        </div>

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
