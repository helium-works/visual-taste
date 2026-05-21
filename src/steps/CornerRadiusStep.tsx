import { useLanguage } from '../context/LanguageContext'
import { useForm } from '../context/FormContext'
import SelectableCard from '../components/SelectableCard'

interface CornerRadiusStepProps {
  onNext: () => void
  onBack: () => void
}

const RADIUS_OPTIONS = [
  { id: 'sharp', px: 0, labelKey: 'corner_sharp' as const, subKey: 'corner_sharp_sub' as const },
  { id: 'soft', px: 8, labelKey: 'corner_soft' as const, subKey: 'corner_soft_sub' as const },
  { id: 'rounded', px: 16, labelKey: 'corner_rounded' as const, subKey: 'corner_rounded_sub' as const },
  { id: 'pill', px: 9999, labelKey: 'corner_pill' as const, subKey: 'corner_pill_sub' as const },
]

function RadiusPreview({ px, primary }: { px: number; primary: string; secondary?: string }) {
  const r = px === 9999 ? '9999px' : `${px}px`
  return (
    <div style={{ padding: '20px 16px', background: '#fafaf9', display: 'flex', flexDirection: 'column', gap: 14 }}>
      {/* Card preview */}
      <div style={{
        borderRadius: r,
        border: '1px solid rgba(18,16,18,0.10)',
        padding: '16px',
        background: '#fff',
        boxShadow: '0 1px 4px rgba(18,16,18,0.07)',
      }}>
        <div style={{ width: '70%', height: 6, background: primary, borderRadius: 3, opacity: 0.8, marginBottom: 8 }} />
        <div style={{ width: '100%', height: 4, background: 'rgba(18,16,18,0.1)', borderRadius: 2, marginBottom: 4 }} />
        <div style={{ width: '80%', height: 4, background: 'rgba(18,16,18,0.07)', borderRadius: 2 }} />
      </div>
      {/* Button preview */}
      <div style={{
        borderRadius: r,
        background: primary,
        padding: '10px 20px',
        textAlign: 'center',
        fontSize: 12,
        fontWeight: 500,
        color: '#fff',
        fontFamily: 'var(--font-brand)',
      }}>
        Button
      </div>
    </div>
  )
}

export default function CornerRadiusStep({ onNext, onBack }: CornerRadiusStepProps) {
  const { t } = useLanguage()
  const { form, setField } = useForm()

  return (
    <div>
      <h2 style={{ fontFamily: 'var(--font-brand)', fontSize: 'clamp(22px,4vw,30px)', fontWeight: 400, letterSpacing: '-0.025em', color: 'var(--color-ink)', margin: '0 0 8px' }}>
        {t('cornerTitle')}
      </h2>
      <p style={{ fontSize: 14, color: 'var(--color-mute)', marginBottom: 28 }}>
        {t('cornerSubtext')}
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 14 }}>
        {RADIUS_OPTIONS.map(({ id, px, labelKey, subKey }) => (
          <SelectableCard
            key={id}
            selected={form.cornerRadius === id}
            onClick={() => setField('cornerRadius', id)}
            style={{ borderRadius: 14, overflow: 'hidden' }}
          >
            <div style={{ pointerEvents: 'none' }}>
              <RadiusPreview px={px} primary="var(--color-primary)" secondary="var(--color-secondary)" />
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
          style={{ padding: '12px 28px', opacity: form.cornerRadius ? 1 : 0.4, cursor: form.cornerRadius ? 'pointer' : 'not-allowed' }}
          onClick={form.cornerRadius ? onNext : undefined}
        >
          {t('next')}
        </button>
      </div>
    </div>
  )
}
