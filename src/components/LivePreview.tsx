// Mini client form preview — renders a schematic welcome screen with client branding
interface LivePreviewProps {
  font: string
  primary: string
  secondary: string
  client: string
}

export default function LivePreview({ font, primary, secondary, client }: LivePreviewProps) {
  const fontName = font.replace(/\+/g, ' ')
  const p = primary ? `#${primary.replace('#', '')}` : '#121012'
  const s = secondary ? `#${secondary.replace('#', '')}` : '#c6e6c0'

  return (
    <div style={{
      width: '100%',
      aspectRatio: '16/9',
      background: '#f6f5f1',
      borderRadius: 12,
      overflow: 'hidden',
      position: 'relative',
      fontFamily: `'${fontName}', DM Sans, sans-serif`,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 24,
      gap: 16,
    }}>
      {/* Decorative blob */}
      <div style={{
        position: 'absolute',
        top: -40,
        right: -40,
        width: 160,
        height: 160,
        borderRadius: '50%',
        background: s,
        opacity: 0.35,
        filter: 'blur(40px)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute',
        bottom: -20,
        left: -20,
        width: 100,
        height: 100,
        borderRadius: '50%',
        background: p,
        opacity: 0.12,
        filter: 'blur(30px)',
        pointerEvents: 'none',
      }} />

      {/* Progress bar mock */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 3,
        background: 'rgba(18,16,18,0.08)',
      }}>
        <div style={{ width: '8%', height: '100%', background: p, borderRadius: '0 2px 2px 0' }} />
      </div>

      {/* Content */}
      <div style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <div style={{ fontSize: 11, fontFamily: 'DM Mono, monospace', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(18,16,18,0.45)', marginBottom: 12 }}>
          Step 1 of 14
        </div>
        <div style={{ fontSize: 28, fontWeight: 400, color: '#121012', lineHeight: 1.1, letterSpacing: '-0.03em' }}>
          Hi, <em style={{ fontStyle: 'italic', fontWeight: 300 }}>{client || 'Friend'}</em>
        </div>
        <div style={{ fontSize: 13, color: 'rgba(18,16,18,0.55)', marginTop: 10, maxWidth: 220 }}>
          Let's discover the visual personality of your website
        </div>
        <div style={{ display: 'flex', gap: 8, marginTop: 16, justifyContent: 'center' }}>
          <div style={{ padding: '8px 18px', background: p, borderRadius: 9999, fontSize: 12, color: '#fff', fontWeight: 500 }}>English</div>
          <div style={{ padding: '8px 18px', background: 'transparent', border: `1px solid ${p}`, borderRadius: 9999, fontSize: 12, color: '#121012' }}>Español</div>
        </div>
      </div>

      {/* Lang toggle mock */}
      <div style={{
        position: 'absolute',
        top: 10,
        right: 10,
        background: 'rgba(255,255,255,0.8)',
        border: '1px solid rgba(18,16,18,0.10)',
        borderRadius: 20,
        padding: '4px 10px',
        fontSize: 9,
        fontFamily: 'DM Mono, monospace',
        letterSpacing: '0.08em',
        color: '#121012',
      }}>
        🌐 EN
      </div>
    </div>
  )
}
