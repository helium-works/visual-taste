import { useState, useEffect, useRef } from 'react'

const POPULAR_FONTS = [
  'DM Sans', 'Inter', 'Outfit', 'Plus Jakarta Sans', 'Syne',
  'Space Grotesk', 'Bricolage Grotesque', 'Libre Baskerville',
  'Playfair Display', 'Cormorant Garamond', 'Lora', 'Merriweather',
  'Josefin Sans', 'Raleway', 'Nunito', 'Poppins', 'Montserrat',
  'Work Sans', 'Karla', 'IBM Plex Sans', 'Source Sans 3',
  'Fraunces', 'Cabinet Grotesk', 'General Sans', 'Clash Display',
]

interface FontPickerProps {
  value: string
  onChange: (font: string) => void
}

export default function FontPicker({ value, onChange }: FontPickerProps) {
  const [query, setQuery] = useState(value)
  const [filtered, setFiltered] = useState(POPULAR_FONTS)
  const [open, setOpen] = useState(false)
  const [previewLoaded, setPreviewLoaded] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Load preview font
  useEffect(() => {
    if (!value) return
    const fontName = value.replace(/\+/g, ' ')
    const id = `fp-${fontName.replace(/\s+/g, '-').toLowerCase()}`
    if (!document.getElementById(id)) {
      const link = document.createElement('link')
      link.id = id
      link.rel = 'stylesheet'
      link.href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(fontName)}:wght@400;700&display=swap`
      document.head.appendChild(link)
    }
    const timer = setTimeout(() => setPreviewLoaded(true), 400)
    return () => clearTimeout(timer)
  }, [value])

  useEffect(() => {
    const q = query.toLowerCase()
    setFiltered(POPULAR_FONTS.filter(f => f.toLowerCase().includes(q)))
  }, [query])

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const fontDisplayName = value.replace(/\+/g, ' ')

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }} ref={containerRef}>
      <label style={{ fontSize: 11, fontFamily: 'DM Mono, monospace', letterSpacing: '0.10em', textTransform: 'uppercase', color: 'rgba(232,230,227,0.55)' }}>
        Font
      </label>

      {/* Search input */}
      <div style={{ position: 'relative' }}>
        <input
          className="admin-input"
          value={query}
          onChange={(e) => { setQuery(e.target.value); setOpen(true) }}
          onFocus={() => setOpen(true)}
          placeholder="Search Google Fonts..."
        />
        {open && filtered.length > 0 && (
          <div style={{
            position: 'absolute',
            top: 'calc(100% + 4px)',
            left: 0,
            right: 0,
            background: '#1a1a1e',
            border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: 10,
            maxHeight: 200,
            overflowY: 'auto',
            zIndex: 50,
          }}>
            {filtered.slice(0, 12).map(font => (
              <button
                key={font}
                onClick={() => { onChange(font); setQuery(font); setOpen(false) }}
                style={{
                  display: 'block',
                  width: '100%',
                  padding: '10px 14px',
                  background: font === value ? 'rgba(255,255,255,0.08)' : 'transparent',
                  border: 'none',
                  textAlign: 'left',
                  cursor: 'pointer',
                  fontFamily: `'${font}', sans-serif`,
                  fontSize: 14,
                  color: '#e8e6e3',
                  transition: 'background 0.15s',
                }}
                onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.06)')}
                onMouseLeave={e => (e.currentTarget.style.background = font === value ? 'rgba(255,255,255,0.08)' : 'transparent')}
              >
                {font}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Live preview */}
      {value && (
        <div style={{
          padding: '14px 16px',
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 10,
          opacity: previewLoaded ? 1 : 0.4,
          transition: 'opacity 0.3s',
        }}>
          <div style={{ fontFamily: `'${fontDisplayName}', sans-serif`, fontSize: 22, color: '#e8e6e3', fontWeight: 400, lineHeight: 1.3 }}>
            {fontDisplayName}
          </div>
          <div style={{ fontFamily: `'${fontDisplayName}', sans-serif`, fontSize: 14, color: 'rgba(232,230,227,0.55)', marginTop: 4 }}>
            The quick brown fox jumps over the lazy dog.
          </div>
        </div>
      )}
    </div>
  )
}
