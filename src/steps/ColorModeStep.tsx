import { useLanguage } from '../context/LanguageContext'
import { useForm } from '../context/FormContext'
import SelectableCard from '../components/SelectableCard'

interface ColorModeStepProps {
  onNext: () => void
  onBack: () => void
}

function MiniPage({ mode }: { mode: 'light' | 'dark' | 'split' }) {
  const bg = mode === 'dark' ? '#0e0e10' : '#fff'
  const textColor = mode === 'dark' ? '#e8e6e3' : '#121012'
  const subColor = mode === 'dark' ? 'rgba(232,230,227,0.5)' : 'rgba(18,16,18,0.45)'
  const cardBg = mode === 'dark' ? 'rgba(255,255,255,0.06)' : '#fff'
  const cardBorder = mode === 'dark' ? 'rgba(255,255,255,0.10)' : 'rgba(18,16,18,0.08)'

  const Content = () => (
    <div style={{ height: '100%', background: bg, display: 'flex', flexDirection: 'column', gap: 8, padding: '14px 12px', position: 'relative', overflow: 'hidden' }}>
      {/* Glow */}
      {mode === 'dark' && (
        <div style={{ position: 'absolute', top: -20, right: -20, width: 80, height: 80, borderRadius: '50%', background: 'var(--color-primary)', opacity: 0.25, filter: 'blur(20px)' }} />
      )}
      {/* Nav */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, paddingBottom: 8, borderBottom: `1px solid ${cardBorder}` }}>
        <div style={{ width: 20, height: 5, background: 'var(--color-primary)', borderRadius: 3 }} />
        <div style={{ flex: 1, display: 'flex', gap: 5, justifyContent: 'flex-end' }}>
          {[1,2,3].map(i => <div key={i} style={{ width: 14, height: 3, background: subColor, borderRadius: 2 }} />)}
        </div>
      </div>
      {/* Hero */}
      <div style={{ fontSize: mode === 'dark' ? 13 : 11, fontWeight: 400, color: textColor, lineHeight: 1.2, letterSpacing: '-0.02em' }}>
        Your <em style={{ fontStyle: 'italic', fontWeight: 300, color: 'var(--color-primary)' }}>website</em>
      </div>
      <div style={{ width: '65%', height: 4, background: subColor, borderRadius: 2, opacity: 0.7 }} />
      {/* Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6, marginTop: 4 }}>
        {[1,2].map(i => (
          <div key={i} style={{ background: cardBg, border: `1px solid ${cardBorder}`, borderRadius: 6, padding: '6px 8px' }}>
            <div style={{ width: '80%', height: 4, background: textColor, borderRadius: 2, opacity: 0.2, marginBottom: 4 }} />
            <div style={{ width: '60%', height: 3, background: subColor, borderRadius: 2, opacity: 0.6 }} />
          </div>
        ))}
      </div>
    </div>
  )

  if (mode === 'split') {
    return (
      <div style={{ height: 160, display: 'flex', borderRadius: '12px 12px 0 0', overflow: 'hidden', position: 'relative' }}>
        <div style={{ flex: 1, position: 'relative' }}>
          <Content />
        </div>
        <div style={{ width: 1, background: 'rgba(18,16,18,0.12)', zIndex: 10 }} />
        <div style={{ flex: 1, position: 'relative' }}>
          {/* Dark half */}
          <div style={{ height: '100%', background: '#0e0e10', display: 'flex', flexDirection: 'column', gap: 8, padding: '14px 12px', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: -20, right: -20, width: 80, height: 80, borderRadius: '50%', background: 'var(--color-primary)', opacity: 0.25, filter: 'blur(20px)' }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, paddingBottom: 8, borderBottom: '1px solid rgba(255,255,255,0.10)' }}>
              <div style={{ width: 20, height: 5, background: 'var(--color-primary)', borderRadius: 3 }} />
              <div style={{ flex: 1, display: 'flex', gap: 5, justifyContent: 'flex-end' }}>
                {[1,2,3].map(i => <div key={i} style={{ width: 14, height: 3, background: 'rgba(232,230,227,0.3)', borderRadius: 2 }} />)}
              </div>
            </div>
            <div style={{ fontSize: 13, fontWeight: 400, color: '#e8e6e3', lineHeight: 1.2 }}>
              Your <em style={{ fontStyle: 'italic', fontWeight: 300, color: 'var(--color-primary)' }}>website</em>
            </div>
            <div style={{ width: '65%', height: 4, background: 'rgba(232,230,227,0.3)', borderRadius: 2 }} />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6, marginTop: 4 }}>
              {[1,2].map(i => (
                <div key={i} style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.10)', borderRadius: 6, padding: '6px 8px' }}>
                  <div style={{ width: '80%', height: 4, background: 'rgba(232,230,227,0.2)', borderRadius: 2, marginBottom: 4 }} />
                  <div style={{ width: '60%', height: 3, background: 'rgba(232,230,227,0.15)', borderRadius: 2 }} />
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Center icon */}
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', fontSize: 16, zIndex: 20, background: 'rgba(255,255,255,0.9)', borderRadius: '50%', width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}>
          ✨
        </div>
      </div>
    )
  }

  return (
    <div style={{ height: 160, borderRadius: '12px 12px 0 0', overflow: 'hidden' }}>
      <Content />
    </div>
  )
}

const COLOR_MODE_OPTIONS = [
  { id: 'light', labelKey: 'colorMode_light' as const, mode: 'light' as const },
  { id: 'dark', labelKey: 'colorMode_dark' as const, mode: 'dark' as const },
  { id: 'both', labelKey: 'colorMode_both' as const, mode: 'split' as const, subKey: 'colorMode_both_sub' as const },
]

export default function ColorModeStep({ onNext, onBack }: ColorModeStepProps) {
  const { t } = useLanguage()
  const { form, setField } = useForm()

  return (
    <div>
      <h2 style={{ fontFamily: 'var(--font-brand)', fontSize: 'clamp(22px,4vw,30px)', fontWeight: 400, letterSpacing: '-0.025em', color: 'var(--color-ink)', margin: '0 0 8px' }}>
        {t('colorModeTitle')}
      </h2>
      <p style={{ fontSize: 14, color: 'var(--color-mute)', marginBottom: 28 }}>
        {t('colorModeSubtext')}
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 14 }}>
        {COLOR_MODE_OPTIONS.map(({ id, labelKey, mode, subKey }) => (
          <SelectableCard
            key={id}
            selected={form.colorMode === id}
            onClick={() => setField('colorMode', id)}
            style={{ borderRadius: 14, overflow: 'hidden' }}
          >
            <div style={{ pointerEvents: 'none' }}>
              <MiniPage mode={mode} />
            </div>
            <div style={{ padding: '12px 16px', background: '#fff', borderTop: '1px solid var(--color-rule)' }}>
              <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--color-ink)', fontFamily: 'DM Sans, sans-serif' }}>{t(labelKey)}</div>
              {subKey && <div style={{ fontSize: 11, color: 'var(--color-mute)', marginTop: 2 }}>{t(subKey)}</div>}
            </div>
          </SelectableCard>
        ))}
      </div>
      <div className="step-nav">
        <button className="btn-outline" style={{ padding: '12px 24px' }} onClick={onBack}>{t('back')}</button>
        <button
          className="btn-brand"
          style={{ padding: '12px 28px', opacity: form.colorMode ? 1 : 0.4, cursor: form.colorMode ? 'pointer' : 'not-allowed' }}
          onClick={form.colorMode ? onNext : undefined}
        >
          {t('next')}
        </button>
      </div>
    </div>
  )
}
