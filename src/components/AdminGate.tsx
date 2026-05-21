import { useState, useEffect, type ReactNode } from 'react'

const STORED_HASH = import.meta.env.VITE_ADMIN_PASSPHRASE_HASH as string | undefined

async function sha256hex(text: string): Promise<string> {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text))
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('')
}

export default function AdminGate({ children }: { children: ReactNode }) {
  const [unlocked, setUnlocked] = useState(false)
  const [input, setInput] = useState('')
  const [error, setError] = useState(false)
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    if (sessionStorage.getItem('admin_unlocked') === '1') setUnlocked(true)
  }, [])

  if (!STORED_HASH) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0e0d0e', fontFamily: 'DM Mono, monospace', color: 'rgba(232,230,227,0.4)', fontSize: 13 }}>
        404
      </div>
    )
  }

  if (unlocked) return <>{children}</>

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (busy) return
    setBusy(true)
    const hash = await sha256hex(input)
    if (hash === STORED_HASH.toLowerCase()) {
      sessionStorage.setItem('admin_unlocked', '1')
      setUnlocked(true)
    } else {
      setError(true)
      setInput('')
      setTimeout(() => setError(false), 1500)
    }
    setBusy(false)
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0e0d0e' }}>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12, width: 280 }}>
        <span style={{ fontFamily: 'DM Mono, monospace', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(232,230,227,0.35)' }}>
          Helium / Admin
        </span>
        <input
          type="password"
          autoFocus
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Passphrase"
          style={{
            background: error ? 'rgba(255,80,80,0.08)' : 'rgba(255,255,255,0.04)',
            border: `1px solid ${error ? 'rgba(255,80,80,0.4)' : 'rgba(255,255,255,0.1)'}`,
            borderRadius: 8,
            padding: '10px 14px',
            color: '#e8e6e3',
            fontFamily: 'DM Mono, monospace',
            fontSize: 14,
            outline: 'none',
            transition: 'border-color 0.2s, background 0.2s',
          }}
        />
        <button
          type="submit"
          disabled={busy || !input}
          style={{ background: '#c6e6c0', color: '#0e0d0e', border: 'none', borderRadius: 8, padding: '10px 14px', fontFamily: 'DM Mono, monospace', fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', cursor: busy || !input ? 'default' : 'pointer', opacity: busy || !input ? 0.5 : 1 }}
        >
          Enter
        </button>
      </form>
    </div>
  )
}
