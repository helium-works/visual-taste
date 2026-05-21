import { useLanguage } from '../context/LanguageContext'
import { useForm } from '../context/FormContext'
import SelectableCard from '../components/SelectableCard'

interface HeroStyleStepProps {
  onNext: () => void
  onBack: () => void
}

function FullscreenHero() {
  return (
    <div style={{ height: 130, background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)', position: 'relative', overflow: 'hidden', borderRadius: '12px 12px 0 0' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
        <div style={{ width: '70%', height: 14, background: 'rgba(255,255,255,0.9)', borderRadius: 7 }} />
        <div style={{ width: '50%', height: 8, background: 'rgba(255,255,255,0.6)', borderRadius: 4 }} />
        <div style={{ marginTop: 8, padding: '6px 18px', background: 'rgba(255,255,255,0.95)', borderRadius: 6, fontSize: 10, fontWeight: 600, color: '#121012' }}>Get started</div>
      </div>
    </div>
  )
}

function VideoHero() {
  return (
    <div style={{ height: 130, background: 'linear-gradient(135deg, #0e0e10 0%, var(--color-primary) 100%)', position: 'relative', overflow: 'hidden', borderRadius: '12px 12px 0 0' }}>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
        <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(255,255,255,0.15)', border: '2px solid rgba(255,255,255,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ color: '#fff', fontSize: 12, marginLeft: 2 }}>▶</span>
        </div>
        <div style={{ width: '60%', height: 8, background: 'rgba(255,255,255,0.8)', borderRadius: 4 }} />
        <div style={{ width: '40%', height: 5, background: 'rgba(255,255,255,0.5)', borderRadius: 3 }} />
      </div>
    </div>
  )
}

function TypographyHero() {
  return (
    <div style={{ height: 130, background: '#fafaf9', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', padding: '0 20px', gap: 8, borderRadius: '12px 12px 0 0' }}>
      <div style={{ fontSize: 28, fontWeight: 300, fontFamily: 'var(--font-brand)', color: 'var(--color-ink)', lineHeight: 1.0, letterSpacing: '-0.04em' }}>
        Big<br /><span style={{ fontStyle: 'italic', color: 'var(--color-primary)' }}>Bold</span>
      </div>
      <div style={{ width: '55%', height: 4, background: 'rgba(18,16,18,0.12)', borderRadius: 2 }} />
    </div>
  )
}

function IllustratedHero() {
  return (
    <div style={{ height: 130, background: '#fff', display: 'flex', alignItems: 'center', padding: '0 16px', gap: 16, borderRadius: '12px 12px 0 0', overflow: 'hidden' }}>
      <div style={{ flex: 1 }}>
        <div style={{ width: '90%', height: 10, background: 'rgba(18,16,18,0.15)', borderRadius: 5, marginBottom: 8 }} />
        <div style={{ width: '70%', height: 6, background: 'rgba(18,16,18,0.08)', borderRadius: 3, marginBottom: 14 }} />
        <div style={{ width: 60, height: 22, background: 'var(--color-primary)', borderRadius: 11 }} />
      </div>
      <div style={{ width: 80, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'center' }}>
        <div style={{ width: 60, height: 60, borderRadius: '50%', background: `linear-gradient(135deg, var(--color-secondary), var(--color-primary))`, opacity: 0.7 }} />
        <div style={{ width: 40, height: 12, borderRadius: 6, background: 'var(--color-secondary)', opacity: 0.8 }} />
      </div>
    </div>
  )
}

function SplitHero() {
  return (
    <div style={{ height: 130, display: 'flex', borderRadius: '12px 12px 0 0', overflow: 'hidden' }}>
      <div style={{ flex: 1, background: '#fff', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 16px', gap: 8 }}>
        <div style={{ width: '90%', height: 10, background: 'rgba(18,16,18,0.2)', borderRadius: 5 }} />
        <div style={{ width: '70%', height: 6, background: 'rgba(18,16,18,0.1)', borderRadius: 3 }} />
        <div style={{ width: 50, height: 18, background: 'var(--color-primary)', borderRadius: 9, marginTop: 6 }} />
      </div>
      <div style={{ width: 2, background: 'var(--color-rule)' }} />
      <div style={{ flex: 1, background: `linear-gradient(135deg, var(--color-secondary) 0%, var(--color-primary) 100%)`, opacity: 0.7, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: 40, height: 40, border: '2px dashed rgba(255,255,255,0.6)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>🖼</div>
      </div>
    </div>
  )
}

const HERO_OPTIONS = [
  { id: 'fullscreen', labelKey: 'hero_fullscreen' as const, subKey: 'hero_fullscreen_sub' as const, Preview: FullscreenHero },
  { id: 'video', labelKey: 'hero_video' as const, subKey: 'hero_video_sub' as const, Preview: VideoHero },
  { id: 'typography', labelKey: 'hero_typography' as const, subKey: 'hero_typography_sub' as const, Preview: TypographyHero },
  { id: 'illustrated', labelKey: 'hero_illustrated' as const, subKey: 'hero_illustrated_sub' as const, Preview: IllustratedHero },
  { id: 'split', labelKey: 'hero_split' as const, subKey: 'hero_split_sub' as const, Preview: SplitHero },
]

export default function HeroStyleStep({ onNext, onBack }: HeroStyleStepProps) {
  const { t } = useLanguage()
  const { form, setField } = useForm()

  return (
    <div>
      <h2 style={{ fontFamily: 'var(--font-brand)', fontSize: 'clamp(22px,4vw,30px)', fontWeight: 400, letterSpacing: '-0.025em', color: 'var(--color-ink)', margin: '0 0 8px' }}>
        {t('heroTitle')}
      </h2>
      <p style={{ fontSize: 14, color: 'var(--color-mute)', marginBottom: 28 }}>
        {t('heroSubtext')}
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 14 }}>
        {HERO_OPTIONS.map(({ id, labelKey, subKey, Preview }) => (
          <SelectableCard
            key={id}
            selected={form.heroStyle === id}
            onClick={() => setField('heroStyle', id)}
            style={{ borderRadius: 14, overflow: 'hidden' }}
          >
            <div style={{ pointerEvents: 'none' }}>
              <Preview />
            </div>
            <div style={{ padding: '12px 16px', background: '#fff', borderTop: '1px solid var(--color-rule)' }}>
              <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--color-ink)', fontFamily: 'DM Sans, sans-serif' }}>{t(labelKey)}</div>
              <div style={{ fontSize: 11, color: 'var(--color-mute)', marginTop: 2 }}>{t(subKey)}</div>
            </div>
          </SelectableCard>
        ))}
      </div>

      <div className="step-nav">
        <button className="btn-outline" style={{ padding: '12px 24px' }} onClick={onBack}>{t('back')}</button>
        <button
          className="btn-brand"
          style={{ padding: '12px 28px', opacity: form.heroStyle ? 1 : 0.4, cursor: form.heroStyle ? 'pointer' : 'not-allowed' }}
          onClick={form.heroStyle ? onNext : undefined}
        >
          {t('next')}
        </button>
      </div>
    </div>
  )
}
