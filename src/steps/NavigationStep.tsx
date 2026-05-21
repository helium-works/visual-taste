import { useLanguage } from '../context/LanguageContext'
import { useForm } from '../context/FormContext'
import SelectableCard from '../components/SelectableCard'

interface NavigationStepProps {
  onNext: () => void
  onBack: () => void
}

function TopBarNav() {
  return (
    <div style={{ height: 110, background: '#fff', borderRadius: '12px 12px 0 0', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      <div style={{ height: 36, background: 'rgba(255,255,255,0.95)', borderBottom: '1px solid rgba(18,16,18,0.08)', display: 'flex', alignItems: 'center', padding: '0 12px', gap: 12 }}>
        <div style={{ width: 24, height: 8, background: 'var(--color-primary)', borderRadius: 4 }} />
        <div style={{ flex: 1, display: 'flex', gap: 8 }}>
          {[1,2,3].map(i => <div key={i} style={{ width: 24, height: 4, background: 'rgba(18,16,18,0.15)', borderRadius: 2 }} />)}
        </div>
        <div style={{ width: 40, height: 18, background: 'var(--color-primary)', borderRadius: 9, opacity: 0.9 }} />
      </div>
      <div style={{ flex: 1, background: '#f6f5f1', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 12px', gap: 6 }}>
        <div style={{ width: '60%', height: 8, background: 'rgba(18,16,18,0.15)', borderRadius: 4 }} />
        <div style={{ width: '40%', height: 5, background: 'rgba(18,16,18,0.08)', borderRadius: 3 }} />
      </div>
    </div>
  )
}

function HamburgerNav() {
  return (
    <div style={{ height: 110, background: '#fff', borderRadius: '12px 12px 0 0', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      <div style={{ height: 36, background: 'rgba(255,255,255,0.95)', borderBottom: '1px solid rgba(18,16,18,0.08)', display: 'flex', alignItems: 'center', padding: '0 12px', justifyContent: 'space-between' }}>
        <div style={{ width: 24, height: 8, background: 'var(--color-primary)', borderRadius: 4 }} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {[1,2,3].map(i => <div key={i} style={{ width: 16, height: 2, background: 'rgba(18,16,18,0.5)', borderRadius: 1 }} />)}
        </div>
      </div>
      <div style={{ flex: 1, background: '#f6f5f1', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 12px', gap: 6 }}>
        <div style={{ width: '65%', height: 8, background: 'rgba(18,16,18,0.15)', borderRadius: 4 }} />
        <div style={{ width: '45%', height: 5, background: 'rgba(18,16,18,0.08)', borderRadius: 3 }} />
      </div>
    </div>
  )
}

function MegaNav() {
  return (
    <div style={{ height: 110, background: '#fff', borderRadius: '12px 12px 0 0', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      <div style={{ height: 32, background: 'rgba(255,255,255,0.95)', borderBottom: '1px solid rgba(18,16,18,0.08)', display: 'flex', alignItems: 'center', padding: '0 10px', gap: 10 }}>
        <div style={{ width: 18, height: 6, background: 'var(--color-primary)', borderRadius: 3 }} />
        <div style={{ flex: 1, display: 'flex', gap: 6 }}>
          {[1,2,3,4].map(i => <div key={i} style={{ width: 18, height: 3, background: i===2?'var(--color-primary)':'rgba(18,16,18,0.12)', borderRadius: 2 }} />)}
        </div>
      </div>
      <div style={{ padding: '6px 10px', background: '#fff', borderBottom: '1px solid rgba(18,16,18,0.06)', display: 'flex', gap: 8 }}>
        {[0,1,2].map(col => (
          <div key={col} style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 3 }}>
            <div style={{ width: '80%', height: 4, background: 'var(--color-primary)', borderRadius: 2, opacity: 0.7 }} />
            <div style={{ width: '60%', height: 3, background: 'rgba(18,16,18,0.1)', borderRadius: 2 }} />
            <div style={{ width: '70%', height: 3, background: 'rgba(18,16,18,0.07)', borderRadius: 2 }} />
          </div>
        ))}
      </div>
      <div style={{ flex: 1, background: '#f6f5f1' }} />
    </div>
  )
}

function SidebarNav() {
  return (
    <div style={{ height: 110, background: '#fff', borderRadius: '12px 12px 0 0', overflow: 'hidden', display: 'flex' }}>
      <div style={{ width: 48, background: '#0e0e10', display: 'flex', flexDirection: 'column', padding: '10px 8px', gap: 8 }}>
        <div style={{ width: 20, height: 6, background: 'var(--color-primary)', borderRadius: 3 }} />
        <div style={{ height: 1, background: 'rgba(255,255,255,0.1)', margin: '2px 0' }} />
        {[1,2,3,4].map(i => (
          <div key={i} style={{ width: '100%', height: 4, background: i===1?'var(--color-primary)':'rgba(255,255,255,0.2)', borderRadius: 2 }} />
        ))}
      </div>
      <div style={{ flex: 1, background: '#f6f5f1', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 12px', gap: 6 }}>
        <div style={{ width: '60%', height: 8, background: 'rgba(18,16,18,0.15)', borderRadius: 4 }} />
        <div style={{ width: '40%', height: 5, background: 'rgba(18,16,18,0.08)', borderRadius: 3 }} />
      </div>
    </div>
  )
}

const NAV_OPTIONS = [
  { id: 'topbar', labelKey: 'nav_topbar' as const, Preview: TopBarNav },
  { id: 'hamburger', labelKey: 'nav_hamburger' as const, Preview: HamburgerNav },
  { id: 'mega', labelKey: 'nav_mega' as const, Preview: MegaNav },
  { id: 'sidebar', labelKey: 'nav_sidebar' as const, Preview: SidebarNav },
]

export default function NavigationStep({ onNext, onBack }: NavigationStepProps) {
  const { t } = useLanguage()
  const { form, setField } = useForm()

  return (
    <div>
      <h2 style={{ fontFamily: 'var(--font-brand)', fontSize: 'clamp(22px,4vw,30px)', fontWeight: 400, letterSpacing: '-0.025em', color: 'var(--color-ink)', margin: '0 0 8px' }}>
        {t('navTitle')}
      </h2>
      <p style={{ fontSize: 14, color: 'var(--color-mute)', marginBottom: 28 }}>
        {t('navSubtext')}
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 14 }}>
        {NAV_OPTIONS.map(({ id, labelKey, Preview }) => (
          <SelectableCard
            key={id}
            selected={form.navigationStyle === id}
            onClick={() => setField('navigationStyle', id)}
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
          style={{ padding: '12px 28px', opacity: form.navigationStyle ? 1 : 0.4, cursor: form.navigationStyle ? 'pointer' : 'not-allowed' }}
          onClick={form.navigationStyle ? onNext : undefined}
        >
          {t('next')}
        </button>
      </div>
    </div>
  )
}
