import { useLanguage } from '../context/LanguageContext'
import { useForm } from '../context/FormContext'
import SelectableCard from '../components/SelectableCard'

interface ImageryStepProps {
  onNext: () => void
  onBack: () => void
}

function PhotographyCard() {
  return (
    <div style={{ height: 130, background: 'linear-gradient(180deg, var(--color-secondary) 0%, var(--color-primary) 100%)', opacity: 0.7, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '12px 12px 0 0', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.3))' }} />
      <div style={{ position: 'absolute', bottom: 14, left: 14, right: 14 }}>
        <div style={{ width: '70%', height: 6, background: 'rgba(255,255,255,0.9)', borderRadius: 3, marginBottom: 4 }} />
        <div style={{ width: '45%', height: 4, background: 'rgba(255,255,255,0.6)', borderRadius: 2 }} />
      </div>
    </div>
  )
}

function IllustrationCard() {
  return (
    <div style={{ height: 130, background: '#fafaf9', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, borderRadius: '12px 12px 0 0', padding: '0 16px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {/* Flat figures */}
        <div style={{ display: 'flex', gap: 6 }}>
          <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'var(--color-primary)', opacity: 0.8 }} />
          <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'var(--color-secondary)' }} />
        </div>
        <div style={{ width: 54, height: 12, background: 'var(--color-primary)', borderRadius: 6, opacity: 0.6 }} />
        <div style={{ width: 40, height: 8, background: 'var(--color-secondary)', borderRadius: 4 }} />
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
        <div style={{ width: '90%', height: 8, background: 'rgba(18,16,18,0.12)', borderRadius: 4 }} />
        <div style={{ width: '70%', height: 6, background: 'rgba(18,16,18,0.08)', borderRadius: 3 }} />
        <div style={{ width: '55%', height: 6, background: 'rgba(18,16,18,0.06)', borderRadius: 3 }} />
      </div>
    </div>
  )
}

function AbstractCard() {
  return (
    <div style={{ height: 130, background: '#0c0c0e', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '12px 12px 0 0', overflow: 'hidden', position: 'relative' }}>
      <div style={{ position: 'absolute', width: 80, height: 80, borderRadius: '50%', background: 'var(--color-primary)', opacity: 0.6, filter: 'blur(20px)', top: '20%', left: '20%' }} />
      <div style={{ position: 'absolute', width: 60, height: 60, borderRadius: '50%', background: 'var(--color-secondary)', opacity: 0.5, filter: 'blur(15px)', bottom: '20%', right: '20%' }} />
      <div style={{ position: 'relative', width: 50, height: 50, borderRadius: '50%', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)' }} />
    </div>
  )
}

function IconsCard() {
  const icons = ['⚡', '🎯', '💡', '🔑', '📊', '✨']
  return (
    <div style={{ height: 130, background: '#fff', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 4, padding: 12, borderRadius: '12px 12px 0 0' }}>
      {icons.map((icon, i) => (
        <div key={i} style={{ background: i % 2 === 0 ? 'var(--color-primary-light)' : '#fafaf9', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>
          {icon}
        </div>
      ))}
    </div>
  )
}

function MixedCard() {
  return (
    <div style={{ height: 130, background: '#fff', display: 'grid', gridTemplateColumns: '1fr 1fr', borderRadius: '12px 12px 0 0', overflow: 'hidden' }}>
      <div style={{ background: `linear-gradient(135deg, var(--color-secondary), var(--color-primary))`, opacity: 0.7, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>🖼</div>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 12px', gap: 6 }}>
        <div style={{ fontSize: 18 }}>⚡</div>
        <div style={{ width: '80%', height: 6, background: 'rgba(18,16,18,0.12)', borderRadius: 3 }} />
        <div style={{ width: '60%', height: 5, background: 'rgba(18,16,18,0.08)', borderRadius: 3 }} />
      </div>
    </div>
  )
}

const IMAGERY_OPTIONS = [
  { id: 'photography', labelKey: 'imagery_photography' as const, Preview: PhotographyCard },
  { id: 'illustration', labelKey: 'imagery_illustration' as const, Preview: IllustrationCard },
  { id: '3d', labelKey: 'imagery_3d' as const, Preview: AbstractCard },
  { id: 'icons', labelKey: 'imagery_icons' as const, Preview: IconsCard },
  { id: 'mixed', labelKey: 'imagery_mixed' as const, Preview: MixedCard },
]

export default function ImageryStep({ onNext, onBack }: ImageryStepProps) {
  const { t } = useLanguage()
  const { form, setField } = useForm()

  return (
    <div>
      <h2 style={{ fontFamily: 'var(--font-brand)', fontSize: 'clamp(22px,4vw,30px)', fontWeight: 400, letterSpacing: '-0.025em', color: 'var(--color-ink)', margin: '0 0 8px' }}>
        {t('imageryTitle')}
      </h2>
      <p style={{ fontSize: 14, color: 'var(--color-mute)', marginBottom: 28 }}>
        {t('imagerySubtext')}
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 14 }}>
        {IMAGERY_OPTIONS.map(({ id, labelKey, Preview }) => (
          <SelectableCard
            key={id}
            selected={form.imageryStyle === id}
            onClick={() => setField('imageryStyle', id)}
            style={{ borderRadius: 14, overflow: 'hidden' }}
          >
            <div style={{ pointerEvents: 'none' }}>
              <Preview />
            </div>
            <div style={{ padding: '12px 16px', background: '#fff', borderTop: '1px solid var(--color-rule)' }}>
              <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--color-ink)', fontFamily: 'DM Sans, sans-serif' }}>{t(labelKey)}</div>
            </div>
          </SelectableCard>
        ))}
      </div>

      <div className="step-nav">
        <button className="btn-outline" style={{ padding: '12px 24px' }} onClick={onBack}>{t('back')}</button>
        <button
          className="btn-brand"
          style={{ padding: '12px 28px', opacity: form.imageryStyle ? 1 : 0.4, cursor: form.imageryStyle ? 'pointer' : 'not-allowed' }}
          onClick={form.imageryStyle ? onNext : undefined}
        >
          {t('next')}
        </button>
      </div>
    </div>
  )
}
