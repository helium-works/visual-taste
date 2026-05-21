import { useLanguage } from '../context/LanguageContext'
import { useForm } from '../context/FormContext'
import SelectableCard from '../components/SelectableCard'

interface ShadowStepProps {
  onNext: () => void
  onBack: () => void
}

const SHADOW_OPTIONS = [
  { id: 'none', shadow: 'none', labelKey: 'shadow_none' as const, subKey: 'shadow_none_sub' as const },
  { id: 'subtle', shadow: '0 1px 3px rgba(0,0,0,0.08)', labelKey: 'shadow_subtle' as const, subKey: 'shadow_subtle_sub' as const },
  { id: 'medium', shadow: '0 4px 12px rgba(0,0,0,0.12)', labelKey: 'shadow_medium' as const, subKey: 'shadow_medium_sub' as const },
  { id: 'dramatic', shadow: '0 8px 30px rgba(0,0,0,0.18)', labelKey: 'shadow_dramatic' as const, subKey: 'shadow_dramatic_sub' as const },
]

function ShadowPreview({ shadow }: { shadow: string }) {
  return (
    <div style={{ padding: '24px 20px', background: '#f0efec', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 140 }}>
      <div style={{
        width: '80%',
        borderRadius: 12,
        border: '1px solid rgba(18,16,18,0.06)',
        padding: '20px 16px',
        background: '#fff',
        boxShadow: shadow,
        transition: 'box-shadow 0.3s',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
          <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--color-primary)', opacity: 0.8 }} />
          <div>
            <div style={{ width: 60, height: 5, background: 'rgba(18,16,18,0.15)', borderRadius: 3, marginBottom: 4 }} />
            <div style={{ width: 40, height: 4, background: 'rgba(18,16,18,0.08)', borderRadius: 2 }} />
          </div>
        </div>
        <div style={{ width: '100%', height: 4, background: 'rgba(18,16,18,0.08)', borderRadius: 2, marginBottom: 4 }} />
        <div style={{ width: '75%', height: 4, background: 'rgba(18,16,18,0.06)', borderRadius: 2 }} />
        <div style={{ marginTop: 14, background: 'var(--color-primary)', borderRadius: 6, padding: '8px 0', textAlign: 'center', fontSize: 11, fontWeight: 500, color: '#fff' }}>
          Action →
        </div>
      </div>
    </div>
  )
}

export default function ShadowStep({ onNext, onBack }: ShadowStepProps) {
  const { t } = useLanguage()
  const { form, setField } = useForm()

  return (
    <div>
      <h2 style={{ fontFamily: 'var(--font-brand)', fontSize: 'clamp(22px,4vw,30px)', fontWeight: 400, letterSpacing: '-0.025em', color: 'var(--color-ink)', margin: '0 0 8px' }}>
        {t('shadowTitle')}
      </h2>
      <p style={{ fontSize: 14, color: 'var(--color-mute)', marginBottom: 28 }}>
        {t('shadowSubtext')}
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 14 }}>
        {SHADOW_OPTIONS.map(({ id, shadow, labelKey, subKey }) => (
          <SelectableCard
            key={id}
            selected={form.shadowDepth === id}
            onClick={() => setField('shadowDepth', id)}
            style={{ borderRadius: 14, overflow: 'hidden' }}
          >
            <div style={{ pointerEvents: 'none' }}>
              <ShadowPreview shadow={shadow} />
            </div>
            <div style={{ padding: '12px 16px', background: '#fff', borderTop: '1px solid var(--color-rule)' }}>
              <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--color-ink)', fontFamily: 'DM Sans, sans-serif' }}>{t(labelKey)}</div>
              <div style={{ fontSize: 11, color: 'var(--color-mute)', fontFamily: 'DM Mono, monospace', letterSpacing: '0.04em', marginTop: 2 }}>{t(subKey)}</div>
            </div>
          </SelectableCard>
        ))}
      </div>

      <div className="step-nav">
        <button className="btn-outline" style={{ padding: '12px 24px' }} onClick={onBack}>{t('back')}</button>
        <button
          className="btn-brand"
          style={{ padding: '12px 28px', opacity: form.shadowDepth ? 1 : 0.4, cursor: form.shadowDepth ? 'pointer' : 'not-allowed' }}
          onClick={form.shadowDepth ? onNext : undefined}
        >
          {t('next')}
        </button>
      </div>
    </div>
  )
}
