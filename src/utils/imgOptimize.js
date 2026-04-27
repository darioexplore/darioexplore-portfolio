/**
 * Returns a Vercel Image Optimization URL for local assets.
 * Automatically serves WebP/AVIF and resizes to the requested width.
 * External URLs (http/https) are passed through unchanged.
 *
 * Vercel docs: https://vercel.com/docs/image-optimization
 */
export function imgSrc(src, width = 1600, quality = 80) {
  if (!src) return src
  // External images — pass through
  if (src.startsWith('http://') || src.startsWith('https://')) return src
  return `/_vercel/image?url=${encodeURIComponent(src)}&w=${width}&q=${quality}`
}
