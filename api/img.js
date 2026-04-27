import sharp from 'sharp'

export default async function handler(req, res) {
  const { src, w = '1200', q = '80' } = req.query

  if (!src || typeof src !== 'string') return res.status(400).end()

  // Security: strip path traversal, only allow paths under /portfolio/
  const safeSrc = decodeURIComponent(src).replace(/\.\./g, '')
  if (!safeSrc.startsWith('/portfolio/')) return res.status(403).end()

  // Fetch the original image from the CDN (same deployment)
  const origin = `https://www.darioexplore.com${safeSrc}`

  try {
    const response = await fetch(origin)
    if (!response.ok) return res.status(404).end()

    const buffer = Buffer.from(await response.arrayBuffer())

    const output = await sharp(buffer)
      .resize(parseInt(w, 10), null, { withoutEnlargement: true })
      .webp({ quality: parseInt(q, 10) })
      .toBuffer()

    // Cache on Vercel's edge for 1 year — processed once, served forever after
    res.setHeader('Content-Type', 'image/webp')
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable')
    res.end(output)
  } catch {
    res.status(500).end()
  }
}
