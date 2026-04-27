import { Redis } from '@upstash/redis'

const redis = new Redis({
  url: process.env.KV_REST_API_URL,
  token: process.env.KV_REST_API_TOKEN,
})

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).end()

  const { password, days = '7' } = req.query
  if (!password || password !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  const links = (await redis.get('dv_links')) ?? []
  const since = Date.now() - parseInt(days, 10) * 86_400_000

  const stats = await Promise.all(
    links.map(async link => ({
      id: link.id,
      title: link.title,
      clicks: await redis.zcount(`dv_clicks:${link.id}`, since, '+inf'),
    }))
  )

  // Sort by most clicks
  stats.sort((a, b) => b.clicks - a.clicks)

  return res.json(stats)
}
