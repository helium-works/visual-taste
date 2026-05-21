import { useLanguage } from '../context/LanguageContext'
import { useForm } from '../context/FormContext'
import SelectableCard from '../components/SelectableCard'
import type { Translations } from '../data/translations'

interface PersonalityStepProps {
  onNext: () => void
  onBack: () => void
}

const PERSONALITIES = [
  {
    id: 'minimalist',
    key: 'personality_minimalist' as keyof Translations,
    render: (_primary: string, _secondary: string) => (
      <div style={{ padding: '24px 20px', minHeight: 160, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', background: '#fafaf9' }}>
        <div style={{ width: 40, height: 1, background: 'rgba(18,16,18,0.2)' }} />
        <div>
          <div style={{ fontSize: 15, fontWeight: 300, letterSpacing: '-0.01em', color: '#121012', marginBottom: 8 }}>Minimalist</div>
          <div style={{ width: '60%', height: 1, background: 'rgba(18,16,18,0.12)' }} />
        </div>
        <div style={{ fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(18,16,18,0.35)' }}>White space as design</div>
      </div>
    ),
  },
  {
    id: 'bold',
    key: 'personality_bold' as keyof Translations,
    render: (primary: string) => (
      <div style={{ padding: '20px', minHeight: 160, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', background: primary }}>
        <div style={{ fontSize: 32, fontWeight: 700, color: '#fff', lineHeight: 1, letterSpacing: '-0.03em' }}>BOLD</div>
        <div style={{ border: '3px solid #fff', borderRadius: 4, padding: '8px 14px', fontSize: 13, fontWeight: 700, color: '#fff', display: 'inline-block', alignSelf: 'flex-start', letterSpacing: '0.04em' }}>IMPACT</div>
      </div>
    ),
  },
  {
    id: 'playful',
    key: 'personality_playful' as keyof Translations,
    render: (primary: string, secondary: string) => (
      <div style={{ padding: '20px', minHeight: 160, background: '#fff', display: 'flex', flexDirection: 'column', gap: 12, overflow: 'hidden' }}>
        <div style={{ display: 'flex', gap: 8, transform: 'rotate(-2deg)' }}>
          <div style={{ width: 28, height: 28, borderRadius: '50%', background: secondary }} />
          <div style={{ width: 28, height: 28, borderRadius: 8, background: primary, opacity: 0.8 }} />
          <div style={{ width: 28, height: 28, borderRadius: '50%', background: secondary, opacity: 0.6 }} />
        </div>
        <div style={{ fontSize: 18, fontWeight: 700, color: primary, transform: 'rotate(1deg)', letterSpacing: '-0.01em' }}>Playful!</div>
        <div style={{ fontSize: 11, color: 'rgba(18,16,18,0.5)', transform: 'rotate(-0.5deg)' }}>Fun & Expressive ✨</div>
      </div>
    ),
  },
  {
    id: 'elegant',
    key: 'personality_elegant' as keyof Translations,
    render: (primary: string) => (
      <div style={{ padding: '24px 20px', minHeight: 160, background: '#fffef9', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div style={{ width: 32, height: 1, background: primary, opacity: 0.6 }} />
        <div style={{ fontStyle: 'italic', fontWeight: 300, fontSize: 20, color: '#121012', letterSpacing: '-0.01em', lineHeight: 1.3 }}>
          "Refined<br />simplicity"
        </div>
        <div style={{ fontSize: 9, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(18,16,18,0.4)' }}>Fine detail</div>
      </div>
    ),
  },
  {
    id: 'corporate',
    key: 'personality_corporate' as keyof Translations,
    render: (primary: string) => (
      <div style={{ padding: '20px', minHeight: 160, background: '#fff', display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
          <div style={{ width: 10, height: 10, background: primary, borderRadius: 2 }} />
          <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase', color: '#121012' }}>Company</div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
          {[1,2,3,4].map(i => <div key={i} style={{ height: 32, background: 'rgba(18,16,18,0.06)', borderRadius: 4 }} />)}
        </div>
        <div style={{ height: 24, background: primary, borderRadius: 4, opacity: 0.85 }} />
      </div>
    ),
  },
  {
    id: 'artistic',
    key: 'personality_artistic' as keyof Translations,
    render: (primary: string, secondary: string) => (
      <div style={{ padding: '20px', minHeight: 160, background: '#0e0e10', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', overflow: 'hidden', position: 'relative' }}>
        <div style={{ position: 'absolute', top: -20, right: -20, width: 120, height: 120, borderRadius: '50%', background: secondary, opacity: 0.5, filter: 'blur(20px)' }} />
        <div style={{ position: 'absolute', top: 20, left: -10, width: 80, height: 80, borderRadius: '50%', background: primary, opacity: 0.4, filter: 'blur(15px)' }} />
        <div style={{ fontSize: 22, fontWeight: 300, color: '#fff', letterSpacing: '-0.02em', position: 'relative', zIndex: 1 }}>Art<br /><em style={{ fontStyle: 'italic' }}>is data</em></div>
      </div>
    ),
  },
  {
    id: 'techy',
    key: 'personality_techy' as keyof Translations,
    render: (primary: string) => (
      <div style={{ padding: '20px', minHeight: 160, background: '#0c0c0e', display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div style={{ fontFamily: 'DM Mono, monospace', fontSize: 10, color: primary, opacity: 0.9, letterSpacing: '0.04em' }}>
          {'>'} init_system()<br />
          {'>'} loading modules...<br />
          {'>'} <span style={{ color: '#c6e6c0' }}>ready ✓</span>
        </div>
        <div style={{ marginTop: 'auto', border: `1px solid ${primary}`, borderRadius: 2, padding: '4px 10px', fontSize: 11, color: primary, fontFamily: 'DM Mono, monospace', alignSelf: 'flex-start', letterSpacing: '0.04em' }}>EXECUTE</div>
      </div>
    ),
  },
  {
    id: 'warm',
    key: 'personality_warm' as keyof Translations,
    render: (primary: string, secondary: string) => (
      <div style={{ padding: '20px', minHeight: 160, background: `linear-gradient(135deg, ${primary}22, ${secondary}33)`, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div style={{ fontSize: 22 }}>☀️</div>
        <div style={{ fontSize: 16, fontWeight: 400, color: '#121012', lineHeight: 1.4 }}>
          Warm &<br /><em style={{ fontStyle: 'italic', fontWeight: 300 }}>inviting</em>
        </div>
        <div style={{ fontSize: 10, color: 'rgba(18,16,18,0.45)', letterSpacing: '0.08em' }}>Organic & human</div>
      </div>
    ),
  },
]

export default function PersonalityStep({ onNext, onBack }: PersonalityStepProps) {
  const { t } = useLanguage()
  const { form, setField } = useForm()
  const primary = 'var(--color-primary)'
  const secondary = 'var(--color-secondary)'

  const toggle = (id: string) => {
    const cur = form.personality
    if (cur.includes(id)) {
      setField('personality', cur.filter(x => x !== id))
    } else if (cur.length < 2) {
      setField('personality', [...cur, id])
    }
  }

  const canNext = form.personality.length === 2

  return (
    <div>
      <div style={{ marginBottom: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <h2 style={{ fontFamily: 'var(--font-brand)', fontSize: 'clamp(22px,4vw,30px)', fontWeight: 400, letterSpacing: '-0.025em', color: 'var(--color-ink)', margin: 0 }}>
          {t('personalityTitle')}
        </h2>
        <span style={{ fontFamily: 'DM Mono, monospace', fontSize: 12, color: 'var(--color-mute)', letterSpacing: '0.06em' }}>
          {form.personality.length}{t('personalityCountOf')}
        </span>
      </div>
      <p style={{ fontSize: 14, color: 'var(--color-mute)', marginBottom: 28, fontFamily: 'DM Sans, sans-serif' }}>
        {t('personalitySubtext')}
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 14 }}>
        {PERSONALITIES.map(({ id, key, render }) => {
          const selected = form.personality.includes(id)
          const disabled = !selected && form.personality.length >= 2
          return (
            <SelectableCard
              key={id}
              selected={selected}
              onClick={() => toggle(id)}
              disabled={disabled}
              style={{ borderRadius: 14, overflow: 'hidden', opacity: disabled ? 0.5 : 1 }}
            >
              <div style={{ pointerEvents: 'none' }}>
                {render(primary, secondary)}
              </div>
              <div style={{ padding: '10px 14px', background: '#fff', borderTop: '1px solid var(--color-rule)' }}>
                <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 13, fontWeight: 500, color: 'var(--color-ink)' }}>
                  {t(key)}
                </div>
              </div>
            </SelectableCard>
          )
        })}
      </div>

      <div className="step-nav">
        <button className="btn-outline" style={{ padding: '12px 24px' }} onClick={onBack}>{t('back')}</button>
        <button
          className="btn-brand"
          style={{ padding: '12px 28px', opacity: canNext ? 1 : 0.4, cursor: canNext ? 'pointer' : 'not-allowed' }}
          onClick={canNext ? onNext : undefined}
        >
          {t('next')}
        </button>
      </div>
    </div>
  )
}
