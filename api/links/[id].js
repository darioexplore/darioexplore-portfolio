import { kv } from '@vercel/kv'

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'DELETE, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  if (req.method === 'OPTIONS') return res.status(200).end()

  if (req.method === 'DELETE') {
    const { id } = req.query
    const { password } = req.body ?? {}
    if (!password || password !== process.env.ADMIN_PASSWORD) {
      return res.status(401).json({ error: 'Unauthorized' })
    }
    const links = (await kv.get('dv_links')) ?? []
    await kv.set('dv_links', links.filter(l => l.id !== id))
    return res.json({ ok: true })
  }

  return res.status(405).json({ error: 'Method not allowed' })
}
