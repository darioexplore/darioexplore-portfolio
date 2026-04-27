import sharp from 'sharp'
import { readFile } from 'fs/promises'
import path from 'path'

export default async function handler(req, res) {
  const { src, w = '1200', q = '80' } = req.query

  if (!src || typeof src !== 'string') {
    return res.status(400).end()
  }

  // Security: strip any path traversal attempts, only serve from public/
  const safeSrc = decodeURIComponent(src).replace(/\.\./g, '').replace(/^\/+/, '')
  const filePath = path.join(process.cwd(), 'public', safeSrc)

  try {
    const input = await readFile(filePath)
    const output = await sharp(input)
      .resize(parseInt(w, 10), null, { withoutEnlargement: true })
      .webp({ quality: parseInt(q, 10) })
      .toBuffer()

    // Cache on Vercel's edge for 1 year — processed once, served forever
    res.setHeader('Content-Type', 'image/webp')
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable')
    res.end(output)
  } catch {
    res.status(404).end()
  }
}
