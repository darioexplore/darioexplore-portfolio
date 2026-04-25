import { useEffect, useRef } from 'react'

export default function FilmGrain({ opacity = 0.08, fps = 24 }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animId
    let lastTime = 0
    const interval = 1000 / fps

    // 65mm = very fine grain — draw near 1:1 so each noise pixel is tiny
    const SCALE = 1.1

    function resize() {
      canvas.width = Math.ceil(window.innerWidth / SCALE)
      canvas.height = Math.ceil(window.innerHeight / SCALE)
    }
    resize()
    window.addEventListener('resize', resize)

    function generateGrain() {
      const w = canvas.width
      const h = canvas.height
      const imageData = ctx.createImageData(w, h)
      const data = imageData.data

      for (let i = 0; i < data.length; i += 4) {
        // Fine 65mm grain — narrow luma range, barely-there warm tone
        const luma = 128 + (Math.random() - 0.5) * 140
        data[i]     = luma
        data[i + 1] = luma * 0.97
        data[i + 2] = luma * 0.92
        data[i + 3] = 255
      }

      ctx.putImageData(imageData, 0, 0)
    }

    function loop(timestamp) {
      animId = requestAnimationFrame(loop)
      if (timestamp - lastTime < interval) return
      lastTime = timestamp
      generateGrain()
    }

    animId = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [fps])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        opacity,
        mixBlendMode: 'overlay',
        zIndex: 9998,
        imageRendering: 'pixelated',
      }}
    />
  )
}
