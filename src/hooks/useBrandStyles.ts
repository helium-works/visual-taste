import { useEffect } from 'react'

function hexToRgb(hex: string): [number, number, number] | null {
  const clean = hex.replace('#', '')
  const full = clean.length === 3
    ? clean.split('').map(c => c + c).join('')
    : clean
  const result = /^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(full)
  if (!result) return null
  return [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)]
}

function hexToHsl(hex: string): [number, number, number] {
  const rgb = hexToRgb(hex)
  if (!rgb) return [0, 0, 0]
  const r = rgb[0] / 255, g = rgb[1] / 255, b = rgb[2] / 255
  const max = Math.max(r, g, b), min = Math.min(r, g, b)
  let h = 0, s = 0
  const l = (max + min) / 2

  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break
      case g: h = ((b - r) / d + 2) / 6; break
      case b: h = ((r - g) / d + 4) / 6; break
    }
  }
  return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)]
}

function hslToHex(h: number, s: number, l: number): string {
  const hNorm = h / 360, sNorm = s / 100, lNorm = l / 100
  const hue2rgb = (p: number, q: number, t: number) => {
    let tN = t
    if (tN < 0) tN += 1
    if (tN > 1) tN -= 1
    if (tN < 1/6) return p + (q - p) * 6 * tN
    if (tN < 1/2) return q
    if (tN < 2/3) return p + (q - p) * (2/3 - tN) * 6
    return p
  }
  let r, g, b
  if (sNorm === 0) {
    r = g = b = lNorm
  } else {
    const q = lNorm < 0.5 ? lNorm * (1 + sNorm) : lNorm + sNorm - lNorm * sNorm
    const p = 2 * lNorm - q
    r = hue2rgb(p, q, hNorm + 1/3)
    g = hue2rgb(p, q, hNorm)
    b = hue2rgb(p, q, hNorm - 1/3)
  }
  const toHex = (x: number) => Math.round(x * 255).toString(16).padStart(2, '0')
  return toHex(r) + toHex(g) + toHex(b)
}

export function useBrandStyles(font: string, primary: string, secondary: string) {
  useEffect(() => {
    const root = document.documentElement

    // Primary color
    const primaryHex = primary.replace('#', '')
    root.style.setProperty('--color-primary', `#${primaryHex}`)

    // Primary light (10% opacity)
    const rgb = hexToRgb(primaryHex)
    if (rgb) {
      root.style.setProperty('--color-primary-light', `rgba(${rgb[0]},${rgb[1]},${rgb[2]},0.10)`)
    }

    // Primary dark (20% darker in HSL)
    const [h, s, l] = hexToHsl(primaryHex)
    const darkL = Math.max(0, l - 20)
    root.style.setProperty('--color-primary-dark', `#${hslToHex(h, s, darkL)}`)

    // Secondary color
    root.style.setProperty('--color-secondary', `#${secondary.replace('#', '')}`)

    // Font
    const fontName = font.replace(/\+/g, ' ')
    root.style.setProperty('--font-brand', `'${fontName}', sans-serif`)

    // Load Google Font dynamically
    const fontId = `gfont-${font.replace(/\s+/g, '-').toLowerCase()}`
    if (!document.getElementById(fontId)) {
      const link = document.createElement('link')
      link.id = fontId
      link.rel = 'stylesheet'
      link.href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(fontName)}:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400&display=swap`
      document.head.appendChild(link)
    }

    return () => {
      // Cleanup on unmount
    }
  }, [font, primary, secondary])
}
