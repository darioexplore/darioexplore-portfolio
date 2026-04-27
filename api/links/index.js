import { Redis } from '@upstash/redis'

const redis = new Redis({
  url: process.env.KV_REST_API_URL,
  token: process.env.KV_REST_API_TOKEN,
})

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  if (req.method === 'OPTIONS') return res.status(200).end()

  if (req.method === 'GET') {
    const links = (await redis.get('dv_links')) ?? []
    return res.json(links)
  }

  if (req.method === 'POST') {
    const { title, url, password } = req.body ?? {}
    if (!password || password !== process.env.ADMIN_PASSWORD) {
      return res.status(401).json({ error: 'Unauthorized' })
    }
    if (!title || !url) {
      return res.status(400).json({ error: 'title and url are required' })
    }
    const links = (await redis.get('dv_links')) ?? []
    const link = { id: String(Date.now()), title, url }
    await redis.set('dv_links', [...links, link])
    return res.status(201).json(link)
  }

  return res.status(405).json({ error: 'Method not allowed' })
}
