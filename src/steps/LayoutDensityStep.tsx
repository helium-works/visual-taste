import { useLanguage } from '../context/LanguageContext'
import { useForm } from '../context/FormContext'

interface LayoutDensityStepProps {
  onNext: () => void
  onBack: () => void
}

const DENSITY_CONFIGS = [
  { value: 0, padding: 48, gap: 32, fontSize: 22 },
  { value: 1, padding: 28, gap: 20, fontSize: 20 },
  { value: 2, padding: 16, gap: 12, fontSize: 18 },
]

export default function LayoutDensityStep({ onNext, onBack }: LayoutDensityStepProps) {
  const { t } = useLanguage()
  const { form, setField } = useForm()
  const d = form.layoutDensity
  const config = DENSITY_CONFIGS[d] || DENSITY_CONFIGS[1]

  const LABELS = [t('density_spacious'), t('density_balanced'), t('density_dense')]

  return (
    <div>
      <h2 style={{ fontFamily: 'var(--font-brand)', fontSize: 'clamp(22px,4vw,30px)', fontWeight: 400, letterSpacing: '-0.025em', color: 'var(--color-ink)', margin: '0 0 8px' }}>
        {t('densityTitle')}
      </h2>
      <p style={{ fontSize: 14, color: 'var(--color-mute)', marginBottom: 28 }}>
        {t('densitySubtext')}
      </p>

      {/* Slider */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
          {LABELS.map((label, i) => (
            <span
              key={i}
              style={{
                fontSize: 11,
                fontFamily: 'DM Mono, monospace',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: d === i ? 'var(--color-primary)' : 'var(--color-mute)',
                transition: 'color 0.2s',
                fontWeight: d === i ? 500 : 400,
              }}
            >
              {label}
            </span>
          ))}
        </div>
        <input
          type="range"
          min={0}
          max={2}
          step={1}
          value={d}
          onChange={(e) => setField('layoutDensity', Number(e.target.value))}
          style={{
            width: '100%',
            height: 4,
            appearance: 'none',
            background: `linear-gradient(to right, var(--color-primary) ${d * 50}%, rgba(18,16,18,0.12) ${d * 50}%)`,
            borderRadius: 2,
            outline: 'none',
            cursor: 'pointer',
          }}
        />
      </div>

      {/* Live preview */}
      <div
        style={{
          border: '1px solid var(--color-rule)',
          borderRadius: 16,
          overflow: 'hidden',
          background: 'rgba(255,255,255,0.95)',
          transition: 'all 0.4s cubic-bezier(0.2,0.7,0.3,1)',
        }}
      >
        <div
          style={{
            padding: config.padding,
            display: 'flex',
            flexDirection: 'column',
            gap: config.gap,
            transition: 'all 0.4s cubic-bezier(0.2,0.7,0.3,1)',
          }}
        >
          <h3
            style={{
              fontFamily: 'var(--font-brand)',
              fontSize: config.fontSize,
              fontWeight: 400,
              letterSpacing: '-0.025em',
              color: 'var(--color-ink)',
              margin: 0,
              lineHeight: 1.2,
              transition: 'font-size 0.3s',
            }}
          >
            {t('densityPreviewHeading')}
          </h3>
          <p style={{
            fontSize: 14,
            lineHeight: 1.6,
            color: 'var(--color-mute-strong)',
            margin: 0,
            transition: 'all 0.3s',
          }}>
            {t('densityPreviewBody')}
          </p>
          <div>
            <button
              className="btn-brand"
              style={{ padding: `${config.gap * 0.4}px ${config.gap * 0.8}px`, fontSize: 14 }}
            >
              {t('densityPreviewButton')}
            </button>
          </div>
        </div>
      </div>

      <div className="step-nav">
        <button className="btn-outline" style={{ padding: '12px 24px' }} onClick={onBack}>{t('back')}</button>
        <button className="btn-brand" style={{ padding: '12px 28px' }} onClick={onNext}>{t('next')}</button>
      </div>
    </div>
  )
}
