import { Redis } from '@upstash/redis'

const redis = new Redis({
  url: process.env.KV_REST_API_URL,
  token: process.env.KV_REST_API_TOKEN,
})

export default async function handler(req, res) {
  const { id } = req.query

  const links = (await redis.get('dv_links')) ?? []
  const link = links.find(l => l.id === id)

  if (!link) return res.status(404).json({ error: 'Not found' })

  // Record click as a timestamped entry in a sorted set
  const ts = Date.now()
  await redis.zadd(`dv_clicks:${id}`, {
    score: ts,
    member: `${ts}-${Math.random().toString(36).slice(2)}`,
  })

  res.redirect(302, link.url)
}
