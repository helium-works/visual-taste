import { useState } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { useForm } from '../context/FormContext'
import SelectableCard from '../components/SelectableCard'

interface ButtonStyleStepProps {
  onNext: () => void
  onBack: () => void
}

function SolidButton({ hovered }: { hovered: boolean }) {
  return (
    <div style={{
      padding: '12px 28px',
      background: 'var(--color-primary)',
      borderRadius: 8,
      color: '#fff',
      fontWeight: 500,
      fontSize: 15,
      fontFamily: 'var(--font-brand)',
      cursor: 'pointer',
      transition: 'opacity 0.2s, transform 0.2s',
      opacity: hovered ? 0.85 : 1,
      transform: hovered ? 'translateY(-1px)' : 'none',
      display: 'inline-block',
    }}>
      Get started
    </div>
  )
}

function OutlinedButton({ hovered }: { hovered: boolean }) {
  return (
    <div style={{
      padding: '11px 28px',
      background: hovered ? 'var(--color-primary-light)' : 'transparent',
      border: '2px solid var(--color-primary)',
      borderRadius: 8,
      color: 'var(--color-primary)',
      fontWeight: 500,
      fontSize: 15,
      fontFamily: 'var(--font-brand)',
      cursor: 'pointer',
      transition: 'background 0.2s',
      display: 'inline-block',
    }}>
      Get started
    </div>
  )
}

function GhostButton({ hovered }: { hovered: boolean }) {
  return (
    <div style={{
      padding: '12px 28px',
      background: hovered ? 'var(--color-primary-light)' : 'transparent',
      borderRadius: 8,
      color: 'var(--color-primary)',
      fontWeight: 500,
      fontSize: 15,
      fontFamily: 'var(--font-brand)',
      cursor: 'pointer',
      transition: 'background 0.2s',
      display: 'inline-block',
    }}>
      Get started
    </div>
  )
}

function SolidIconButton({ hovered }: { hovered: boolean }) {
  return (
    <div style={{
      padding: '12px 28px',
      background: 'var(--color-primary)',
      borderRadius: 8,
      color: '#fff',
      fontWeight: 500,
      fontSize: 15,
      fontFamily: 'var(--font-brand)',
      cursor: 'pointer',
      transition: 'opacity 0.2s, transform 0.2s',
      opacity: hovered ? 0.85 : 1,
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
    }}>
      Get started
      <span style={{ transition: 'transform 0.2s', transform: hovered ? 'translateX(4px)' : 'none', display: 'inline-block' }}>→</span>
    </div>
  )
}

const BUTTON_OPTIONS = [
  { id: 'solid', labelKey: 'button_solid' as const, Component: SolidButton },
  { id: 'outlined', labelKey: 'button_outlined' as const, Component: OutlinedButton },
  { id: 'ghost', labelKey: 'button_ghost' as const, Component: GhostButton },
  { id: 'solidIcon', labelKey: 'button_solidIcon' as const, Component: SolidIconButton },
]

export default function ButtonStyleStep({ onNext, onBack }: ButtonStyleStepProps) {
  const { t } = useLanguage()
  const { form, setField } = useForm()
  const [hovered, setHovered] = useState<string | null>(null)

  return (
    <div>
      <h2 style={{ fontFamily: 'var(--font-brand)', fontSize: 'clamp(22px,4vw,30px)', fontWeight: 400, letterSpacing: '-0.025em', color: 'var(--color-ink)', margin: '0 0 8px' }}>
        {t('buttonTitle')}
      </h2>
      <p style={{ fontSize: 14, color: 'var(--color-mute)', marginBottom: 28 }}>
        {t('buttonSubtext')}
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 14 }}>
        {BUTTON_OPTIONS.map(({ id, labelKey, Component }) => (
          <SelectableCard
            key={id}
            selected={form.buttonStyle === id}
            onClick={() => setField('buttonStyle', id)}
            style={{ borderRadius: 14, overflow: 'hidden' }}
          >
            <div
              onMouseEnter={() => setHovered(id)}
              onMouseLeave={() => setHovered(null)}
              style={{
                padding: '32px 20px',
                background: '#fafaf9',
                minHeight: 110,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Component hovered={hovered === id} />
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
          style={{ padding: '12px 28px', opacity: form.buttonStyle ? 1 : 0.4, cursor: form.buttonStyle ? 'pointer' : 'not-allowed' }}
          onClick={form.buttonStyle ? onNext : undefined}
        >
          {t('next')}
        </button>
      </div>
    </div>
  )
}
