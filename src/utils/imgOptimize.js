/**
 * Routes local images through /api/img which converts to WebP and resizes.
 * Processed images are cached on Vercel's edge for 1 year.
 * External URLs (http/https) are passed through unchanged.
 */
export function imgSrc(src, width = 1200, quality = 80) {
  if (!src) return src
  if (src.startsWith('http://') || src.startsWith('https://')) return src
  return `/api/img?src=${encodeURIComponent(src)}&w=${width}&q=${quality}`
}
