import sharp from 'sharp'

export default async function handler(req, res) {
  const { src, w = '1200', q = '80' } = req.query

  if (!src || typeof src !== 'string') return res.status(400).end()

  // Decode fully to get the clean path, strip traversal
  const safeSrc = decodeURIComponent(src).replace(/\.\./g, '')
  if (!safeSrc.startsWith('/portfolio/')) return res.status(403).end()

  // Re-encode so spaces and special chars are valid in the fetch URL
  const origin = `https://www.darioexplore.com${encodeURI(safeSrc)}`

  try {
    const response = await fetch(origin)
    if (!response.ok) return res.status(404).end()

    const buffer = Buffer.from(await response.arrayBuffer())

    const output = await sharp(buffer)
      .resize(parseInt(w, 10), null, { withoutEnlargement: true })
      .webp({ quality: parseInt(q, 10) })
      .toBuffer()

    // s-maxage tells Vercel's CDN to cache; max-age tells the browser to cache
    res.setHeader('Content-Type', 'image/webp')
    res.setHeader('Cache-Control', 'public, s-maxage=31536000, max-age=31536000, immutable')
    res.end(output)
  } catch {
    res.status(500).end()
  }
}
