import { useState } from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'
import { useForm } from '../context/FormContext'

interface AnimationStepProps {
  onNext: () => void
  onBack: () => void
}

const ANIM_OPTIONS = [
  { id: 'none', labelKey: 'anim_none' as const, subKey: 'anim_none_sub' as const },
  { id: 'subtle', labelKey: 'anim_subtle' as const, subKey: 'anim_subtle_sub' as const },
  { id: 'moderate', labelKey: 'anim_moderate' as const, subKey: 'anim_moderate_sub' as const },
  { id: 'dynamic', labelKey: 'anim_dynamic' as const, subKey: 'anim_dynamic_sub' as const },
]

function NonePreview({ active: _active }: { active: boolean }) {
  return (
    <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div style={{ height: 10, background: 'var(--color-primary)', borderRadius: 5, width: '60%' }} />
      <div style={{ height: 6, background: 'rgba(18,16,18,0.12)', borderRadius: 3, width: '80%' }} />
      <div style={{ height: 6, background: 'rgba(18,16,18,0.08)', borderRadius: 3, width: '65%' }} />
      <div style={{ height: 24, background: 'var(--color-primary)', borderRadius: 4, width: 64, marginTop: 4, opacity: 0.8 }} />
    </div>
  )
}

function SubtlePreview({ active }: { active: boolean }) {
  return (
    <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: 8 }}>
      {[0, 1, 2, 3].map(i => (
        <motion.div
          key={`${active}-${i}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: active ? i * 0.15 : 0, duration: 0.5 }}
          style={{
            height: i === 0 ? 10 : i === 3 ? 24 : 6,
            width: i === 0 ? '60%' : i === 1 ? '80%' : i === 2 ? '65%' : 64,
            background: i === 0 || i === 3 ? 'var(--color-primary)' : `rgba(18,16,18,${i === 1 ? 0.12 : 0.08})`,
            borderRadius: i === 3 ? 4 : i === 0 ? 5 : 3,
            opacity: i === 3 ? 0.8 : 1,
          }}
        />
      ))}
    </div>
  )
}

function ModeratePreview({ active }: { active: boolean }) {
  return (
    <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: 8 }}>
      {[0, 1, 2, 3].map(i => (
        <motion.div
          key={`${active}-${i}`}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: active ? i * 0.12 : 0, type: 'spring', stiffness: 400, damping: 20 }}
          style={{
            height: i === 0 ? 10 : i === 3 ? 24 : 6,
            width: i === 0 ? '60%' : i === 1 ? '80%' : i === 2 ? '65%' : 64,
            background: i === 0 || i === 3 ? 'var(--color-primary)' : `rgba(18,16,18,${i === 1 ? 0.12 : 0.08})`,
            borderRadius: i === 3 ? 4 : i === 0 ? 5 : 3,
          }}
        />
      ))}
    </div>
  )
}

function DynamicPreview({ active }: { active: boolean }) {
  return (
    <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: 8, position: 'relative' }}>
      {[0, 1, 2, 3].map(i => (
        <motion.div
          key={`${active}-${i}`}
          initial={{ opacity: 0, x: -20, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{
            delay: active ? i * 0.1 : 0,
            type: 'spring',
            stiffness: 500,
            damping: 15,
            mass: 0.8,
          }}
          style={{
            height: i === 0 ? 10 : i === 3 ? 24 : 6,
            width: i === 0 ? '60%' : i === 1 ? '80%' : i === 2 ? '65%' : 64,
            background: i === 0 || i === 3 ? 'var(--color-primary)' : `rgba(18,16,18,${i === 1 ? 0.12 : 0.08})`,
            borderRadius: i === 3 ? 4 : i === 0 ? 5 : 3,
          }}
        />
      ))}
    </div>
  )
}

const PREVIEW_COMPONENTS = { none: NonePreview, subtle: SubtlePreview, moderate: ModeratePreview, dynamic: DynamicPreview }

export default function AnimationStep({ onNext, onBack }: AnimationStepProps) {
  const { t } = useLanguage()
  const { form, setField } = useForm()
  const [previewKey, setPreviewKey] = useState(0)

  const handleSelect = (id: string) => {
    setField('animationLevel', id)
    setPreviewKey(k => k + 1)
  }

  const selected = form.animationLevel
  const Preview = selected ? PREVIEW_COMPONENTS[selected as keyof typeof PREVIEW_COMPONENTS] : null

  return (
    <div>
      <h2 style={{ fontFamily: 'var(--font-brand)', fontSize: 'clamp(22px,4vw,30px)', fontWeight: 400, letterSpacing: '-0.025em', color: 'var(--color-ink)', margin: '0 0 8px' }}>
        {t('animTitle')}
      </h2>
      <p style={{ fontSize: 14, color: 'var(--color-mute)', marginBottom: 28 }}>
        {t('animSubtext')}
      </p>

      {/* Option buttons */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 12, marginBottom: 24 }}>
        {ANIM_OPTIONS.map(({ id, labelKey, subKey }) => (
          <button
            key={id}
            onClick={() => handleSelect(id)}
            style={{
              padding: '16px',
              borderRadius: 14,
              border: `2px solid ${selected === id ? 'var(--color-primary)' : 'var(--color-rule)'}`,
              background: selected === id ? 'var(--color-primary-light)' : 'rgba(255,255,255,0.95)',
              cursor: 'pointer',
              textAlign: 'left',
              transition: 'border-color 0.2s, background 0.2s',
            }}
          >
            <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--color-ink)', fontFamily: 'DM Sans, sans-serif', marginBottom: 4 }}>{t(labelKey)}</div>
            <div style={{ fontSize: 11, color: 'var(--color-mute)', fontFamily: 'DM Mono, monospace', letterSpacing: '0.04em' }}>{t(subKey)}</div>
          </button>
        ))}
      </div>

      {/* Live preview */}
      <div style={{ border: '1px solid var(--color-rule)', borderRadius: 16, overflow: 'hidden', background: 'rgba(255,255,255,0.95)', minHeight: 120 }}>
        <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--color-rule)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 11, fontFamily: 'DM Mono, monospace', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-mute)' }}>
            {t('animPreviewTitle')}
          </span>
          {selected && (
            <button
              onClick={() => setPreviewKey(k => k + 1)}
              style={{ fontSize: 11, color: 'var(--color-primary)', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'DM Mono, monospace', letterSpacing: '0.04em' }}
            >
              ↺ replay
            </button>
          )}
        </div>
        <div style={{ minHeight: 90 }}>
          {Preview ? (
            <Preview key={previewKey} active={true} />
          ) : (
            <div style={{ padding: 24, textAlign: 'center', color: 'var(--color-mute)', fontSize: 13 }}>
              {t('animSubtext')}
            </div>
          )}
        </div>
      </div>

      <div className="step-nav">
        <button className="btn-outline" style={{ padding: '12px 24px' }} onClick={onBack}>{t('back')}</button>
        <button
          className="btn-brand"
          style={{ padding: '12px 28px', opacity: form.animationLevel ? 1 : 0.4, cursor: form.animationLevel ? 'pointer' : 'not-allowed' }}
          onClick={form.animationLevel ? onNext : undefined}
        >
          {t('next')}
        </button>
      </div>
    </div>
  )
}
