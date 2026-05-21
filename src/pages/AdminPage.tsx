import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import ColorPicker from '../components/ColorPicker'
import FontPicker from '../components/FontPicker'
import LivePreview from '../components/LivePreview'

const LS_BASE_URL = 'helium_base_url'

export default function AdminPage() {
  const [client, setClient] = useState('Acme Corp')
  const [primary, setPrimary] = useState('FF6B6B')
  const [secondary, setSecondary] = useState('00C9A7')
  const [font, setFont] = useState('DM Sans')
  const [baseUrl, setBaseUrl] = useState(() => localStorage.getItem(LS_BASE_URL) || 'https://yourname.github.io/taste')
  const [copied, setCopied] = useState(false)

  // Persist base URL
  useEffect(() => {
    localStorage.setItem(LS_BASE_URL, baseUrl)
  }, [baseUrl])

  // Load preview font in admin
  useEffect(() => {
    if (!font) return
    const id = `adm-${font.replace(/\s+/g, '-').toLowerCase()}`
    if (!document.getElementById(id)) {
      const link = document.createElement('link')
      link.id = id
      link.rel = 'stylesheet'
      link.href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(font)}:wght@300;400;500;700&display=swap`
      document.head.appendChild(link)
    }
  }, [font])

  const generatedUrl = (() => {
    const base = baseUrl.replace(/\/$/, '')
    const params = new URLSearchParams({
      font: font.replace(/\s+/g, '+'),
      primary: primary.replace('#', ''),
      secondary: secondary.replace('#', ''),
      client: client,
    })
    return `${base}/#/?${params.toString()}`
  })()

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="admin-bg" style={{ fontFamily: 'DM Sans, sans-serif', minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ borderBottom: '1px solid rgba(255,255,255,0.08)', padding: '20px 32px', display: 'flex', alignItems: 'center', gap: 16 }}>
        <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#c6e6c0' }} />
        <span style={{ fontFamily: 'DM Mono, monospace', fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(232,230,227,0.5)' }}>
          Helium
        </span>
        <span style={{ fontFamily: 'DM Mono, monospace', fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(232,230,227,0.25)' }}>
          /
        </span>
        <span style={{ fontFamily: 'DM Mono, monospace', fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(232,230,227,0.5)' }}>
          Design Taste — Admin
        </span>
        <div style={{ flex: 1 }} />
        <Link
          to="/admin/prompt"
          style={{ fontFamily: 'DM Mono, monospace', fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(232,230,227,0.4)', textDecoration: 'none', padding: '6px 12px', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, transition: 'border-color 0.2s' }}
          onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)')}
          onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')}
        >
          Prompt generator →
        </Link>
        <a
          href="#/"
          style={{ fontFamily: 'DM Mono, monospace', fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(232,230,227,0.4)', textDecoration: 'none', padding: '6px 12px', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, transition: 'border-color 0.2s' }}
          onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)')}
          onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')}
        >
          Preview client →
        </a>
      </div>

      <div style={{ maxWidth: 900, margin: '0 auto', padding: '40px 32px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, alignItems: 'start' }}>
        {/* Left column — config */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
          <div>
            <h1 style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 28, fontWeight: 400, letterSpacing: '-0.025em', color: '#e8e6e3', margin: '0 0 6px' }}>
              Configure <em style={{ fontStyle: 'italic', fontWeight: 300 }}>client link</em>
            </h1>
            <p style={{ fontSize: 13, color: 'rgba(232,230,227,0.45)', margin: '0 0 16px', fontFamily: 'DM Mono, monospace', letterSpacing: '0.04em' }}>
              Fill in the brand details. Share the generated URL.
            </p>
            <Link
              to="/admin/prompt"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: 'DM Mono, monospace', fontSize: 11, letterSpacing: '0.10em', textTransform: 'uppercase', color: '#0e0d0e', background: '#c6e6c0', textDecoration: 'none', padding: '8px 16px', borderRadius: 8, fontWeight: 500, transition: 'opacity 0.15s' }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
            >
              Open prompt generator →
            </Link>
          </div>

          {/* Client name */}
          <div className="admin-card" style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <label style={{ fontSize: 11, fontFamily: 'DM Mono, monospace', letterSpacing: '0.10em', textTransform: 'uppercase', color: 'rgba(232,230,227,0.55)' }}>
              Client name
            </label>
            <input
              className="admin-input"
              value={client}
              onChange={(e) => setClient(e.target.value)}
              placeholder="Acme Corp"
            />
          </div>

          {/* Colors */}
          <div className="admin-card" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <ColorPicker value={primary} onChange={setPrimary} label="Primary color" />
            <div style={{ height: 1, background: 'rgba(255,255,255,0.06)' }} />
            <ColorPicker value={secondary} onChange={setSecondary} label="Secondary color" />
          </div>

          {/* Font */}
          <div className="admin-card">
            <FontPicker value={font} onChange={setFont} />
          </div>

          {/* Base URL */}
          <div className="admin-card" style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <label style={{ fontSize: 11, fontFamily: 'DM Mono, monospace', letterSpacing: '0.10em', textTransform: 'uppercase', color: 'rgba(232,230,227,0.55)' }}>
              Your GitHub Pages base URL
            </label>
            <input
              className="admin-input"
              value={baseUrl}
              onChange={(e) => setBaseUrl(e.target.value)}
              placeholder="https://studio.github.io/taste"
            />
            <p style={{ fontSize: 11, color: 'rgba(232,230,227,0.3)', fontFamily: 'DM Mono, monospace', margin: 0 }}>
              Saved automatically to localStorage
            </p>
          </div>
        </div>

        {/* Right column — output + preview */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24, position: 'sticky', top: 40 }}>
          {/* Generated URL */}
          <div className="admin-card">
            <div style={{ fontSize: 11, fontFamily: 'DM Mono, monospace', letterSpacing: '0.10em', textTransform: 'uppercase', color: 'rgba(232,230,227,0.55)', marginBottom: 14 }}>
              Generated URL
            </div>
            <div className="url-field" style={{ marginBottom: 14 }}>
              {generatedUrl}
            </div>
            <button
              onClick={handleCopy}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: 10,
                background: copied ? 'rgba(198,230,192,0.15)' : 'rgba(255,255,255,0.08)',
                border: `1px solid ${copied ? 'rgba(198,230,192,0.4)' : 'rgba(255,255,255,0.15)'}`,
                color: copied ? '#c6e6c0' : '#e8e6e3',
                fontFamily: 'DM Mono, monospace',
                fontSize: 13,
                letterSpacing: '0.06em',
                cursor: 'pointer',
                transition: 'all 0.2s',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
              }}
            >
              {copied ? (
                <><span>✓</span> Copied!</>
              ) : (
                <><span>⎘</span> Copy URL</>
              )}
            </button>
          </div>

          {/* Live preview */}
          <div className="admin-card">
            <div style={{ fontSize: 11, fontFamily: 'DM Mono, monospace', letterSpacing: '0.10em', textTransform: 'uppercase', color: 'rgba(232,230,227,0.55)', marginBottom: 14 }}>
              Client preview
            </div>
            <LivePreview
              font={font}
              primary={primary}
              secondary={secondary}
              client={client}
            />
          </div>
        </div>
      </div>

      {/* Mobile responsive */}
      <style>{`
        @media (max-width: 640px) {
          .admin-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}
