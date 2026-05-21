import { useRef } from 'react'

interface ColorPickerProps {
  value: string // hex without #
  onChange: (hex: string) => void
  label: string
}

export default function ColorPicker({ value, onChange, label }: ColorPickerProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleHexInput = (v: string) => {
    const clean = v.replace(/^#/, '').slice(0, 6)
    onChange(clean)
  }

  const isValidHex = /^[0-9a-fA-F]{6}$/.test(value)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <label style={{ fontSize: 11, fontFamily: 'DM Mono, monospace', letterSpacing: '0.10em', textTransform: 'uppercase', color: 'rgba(232,230,227,0.55)' }}>
        {label}
      </label>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: 8,
            background: isValidHex ? `#${value}` : '#333',
            border: '2px solid rgba(255,255,255,0.15)',
            cursor: 'pointer',
            flexShrink: 0,
            position: 'relative',
            overflow: 'hidden',
          }}
          onClick={() => inputRef.current?.click()}
        >
          <input
            ref={inputRef}
            type="color"
            value={isValidHex ? `#${value}` : '#000000'}
            onChange={(e) => handleHexInput(e.target.value.slice(1))}
            style={{
              position: 'absolute',
              inset: 0,
              opacity: 0,
              cursor: 'pointer',
              width: '100%',
              height: '100%',
            }}
          />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 8, padding: '0 12px', height: 36, gap: 4 }}>
          <span style={{ fontFamily: 'DM Mono, monospace', fontSize: 12, color: 'rgba(232,230,227,0.4)' }}>#</span>
          <input
            type="text"
            value={value.toUpperCase()}
            onChange={(e) => handleHexInput(e.target.value)}
            maxLength={6}
            style={{
              background: 'transparent',
              border: 'none',
              outline: 'none',
              fontFamily: 'DM Mono, monospace',
              fontSize: 13,
              color: '#e8e6e3',
              width: 72,
              letterSpacing: '0.06em',
            }}
            placeholder="000000"
          />
        </div>
      </div>
    </div>
  )
}
