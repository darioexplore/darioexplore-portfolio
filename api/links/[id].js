import { Redis } from '@upstash/redis'

const redis = new Redis({
  url: process.env.KV_REST_API_URL,
  token: process.env.KV_REST_API_TOKEN,
})

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'PUT, DELETE, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  if (req.method === 'OPTIONS') return res.status(200).end()

  const { id } = req.query
  const { password, ...body } = req.body ?? {}

  if (!password || password !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  const links = (await redis.get('dv_links')) ?? []

  if (req.method === 'PUT') {
    const { title, url } = body
    if (!title || !url) return res.status(400).json({ error: 'title and url required' })
    const updated = links.map(l => l.id === id ? { ...l, title, url } : l)
    await redis.set('dv_links', updated)
    return res.json(updated.find(l => l.id === id))
  }

  if (req.method === 'DELETE') {
    await redis.set('dv_links', links.filter(l => l.id !== id))
    return res.json({ ok: true })
  }

  return res.status(405).json({ error: 'Method not allowed' })
}
