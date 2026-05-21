import { useState } from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'
import { useForm } from '../context/FormContext'
import { sendFormEmail, answersToText, type FormAnswers } from '../utils/email'

interface ReviewStepProps {
  onBack: () => void
  clientName: string
  font: string
  primary: string
  secondary: string
  onGoToStep: (step: number) => void
}

function Section({ label, children, onEdit }: { label: string; children: React.ReactNode; onEdit: () => void; step?: number }) {
  return (
    <div style={{ paddingBottom: 20, borderBottom: '1px solid var(--color-rule)' }}>
      <div className="review-section-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12, marginBottom: 10 }}>
        <span style={{ fontSize: 11, fontFamily: 'DM Mono, monospace', letterSpacing: '0.10em', textTransform: 'uppercase', color: 'var(--color-mute)' }}>
          {label}
        </span>
        <button
          className="edit-btn"
          onClick={onEdit}
          style={{ fontSize: 11, fontFamily: 'DM Mono, monospace', color: 'var(--color-primary)', background: 'none', border: 'none', cursor: 'pointer', letterSpacing: '0.04em', padding: '2px 6px', borderRadius: 4, transition: 'background 0.15s', flexShrink: 0 }}
          onMouseEnter={e => (e.currentTarget.style.background = 'var(--color-primary-light)')}
          onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
        >
          ✏ edit
        </button>
      </div>
      {children}
    </div>
  )
}

function Chip({ label }: { label: string }) {
  return (
    <span style={{
      display: 'inline-block',
      padding: '4px 12px',
      background: 'var(--color-primary-light)',
      color: 'var(--color-ink)',
      borderRadius: 9999,
      fontSize: 13,
      fontFamily: 'var(--font-brand)',
      fontWeight: 500,
      border: '1px solid var(--color-primary)',
      marginRight: 6,
      marginBottom: 6,
    }}>
      {label}
    </span>
  )
}

const DENSITY_LABELS = ['Spacious', 'Balanced', 'Dense']
const DENSITY_LABELS_ES = ['Espacioso', 'Equilibrado', 'Compacto']

export default function ReviewStep({ onBack, clientName, font, primary, secondary, onGoToStep }: ReviewStepProps) {
  const { t, lang } = useLanguage()
  const { form } = useForm()
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [copied, setCopied] = useState(false)

  const densityLabels = lang === 'es' ? DENSITY_LABELS_ES : DENSITY_LABELS

  const handleSubmit = async () => {
    setSubmitting(true)
    setError(false)
    const answers: FormAnswers = {
      clientName,
      font,
      primary,
      secondary,
      language: lang,
      personality: form.personality,
      cornerRadius: form.cornerRadius,
      shadowDepth: form.shadowDepth,
      buttonStyle: form.buttonStyle,
      layoutDensity: form.layoutDensity,
      heroStyle: form.heroStyle,
      imageryStyle: form.imageryStyle,
      navigationStyle: form.navigationStyle,
      animationLevel: form.animationLevel,
      colorMode: form.colorMode,
      websitesAdmire: form.websitesAdmire,
      websitesDislike: form.websitesDislike,
      notes: form.notes,
      timestamp: new Date().toLocaleString(),
    }
    try {
      await sendFormEmail(answers)
      setSubmitted(true)
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : String(err))
      setError(true)
    } finally {
      setSubmitting(false)
    }
  }

  const handleCopy = () => {
    const answers: FormAnswers = {
      clientName, font, primary, secondary, language: lang,
      personality: form.personality, cornerRadius: form.cornerRadius,
      shadowDepth: form.shadowDepth, buttonStyle: form.buttonStyle,
      layoutDensity: form.layoutDensity, heroStyle: form.heroStyle,
      imageryStyle: form.imageryStyle, navigationStyle: form.navigationStyle,
      animationLevel: form.animationLevel, colorMode: form.colorMode,
      websitesAdmire: form.websitesAdmire, websitesDislike: form.websitesDislike,
      notes: form.notes, timestamp: new Date().toLocaleString(),
    }
    navigator.clipboard.writeText(answersToText(answers))
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  // Success screen
  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.2, 0.7, 0.3, 1] }}
        style={{ textAlign: 'center', padding: '40px 20px' }}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 400, damping: 20 }}
          style={{
            width: 72,
            height: 72,
            borderRadius: '50%',
            background: 'var(--color-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 24px',
          }}
        >
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path
              className="check-path"
              d="M7 16L13 22L25 10"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ strokeDasharray: 40, strokeDashoffset: 40, animation: 'checkDraw 0.6s cubic-bezier(0.2,0.7,0.3,1) 0.4s forwards' }}
            />
          </svg>
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          style={{ fontFamily: 'var(--font-brand)', fontSize: 'clamp(28px,5vw,40px)', fontWeight: 400, letterSpacing: '-0.03em', color: 'var(--color-ink)', margin: '0 0 12px' }}
        >
          {t('successTitle', { name: clientName })}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55 }}
          style={{ fontSize: 16, lineHeight: 1.6, color: 'var(--color-mute-strong)', maxWidth: 400, margin: '0 auto' }}
        >
          {t('successSubtext')}
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          style={{ marginTop: 32, fontSize: 24 }}
        >
          🎈
        </motion.div>
      </motion.div>
    )
  }

  return (
    <div>
      <h2 style={{ fontFamily: 'var(--font-brand)', fontSize: 'clamp(22px,4vw,30px)', fontWeight: 400, letterSpacing: '-0.025em', color: 'var(--color-ink)', margin: '0 0 8px' }}>
        {t('reviewTitle')}
      </h2>
      <p style={{ fontSize: 14, color: 'var(--color-mute)', marginBottom: 32 }}>
        {t('reviewSubtext')}
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <Section label={t('reviewPersonality')} onEdit={() => onGoToStep(2)} step={2}>
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {form.personality.length > 0
              ? form.personality.map(p => <Chip key={p} label={p} />)
              : <span style={{ fontSize: 13, color: 'var(--color-mute)' }}>{t('reviewNone')}</span>}
          </div>
        </Section>

        <Section label={t('reviewCorner')} onEdit={() => onGoToStep(3)} step={3}>
          <span style={{ fontSize: 13, color: 'var(--color-ink)', fontFamily: 'DM Mono, monospace' }}>
            {form.cornerRadius || <span style={{ color: 'var(--color-mute)' }}>{t('reviewNone')}</span>}
          </span>
        </Section>

        <Section label={t('reviewShadow')} onEdit={() => onGoToStep(4)} step={4}>
          <span style={{ fontSize: 13, color: 'var(--color-ink)', fontFamily: 'DM Mono, monospace' }}>
            {form.shadowDepth || <span style={{ color: 'var(--color-mute)' }}>{t('reviewNone')}</span>}
          </span>
        </Section>

        <Section label={t('reviewButton')} onEdit={() => onGoToStep(5)} step={5}>
          <span style={{ fontSize: 13, color: 'var(--color-ink)', fontFamily: 'DM Mono, monospace' }}>
            {form.buttonStyle || <span style={{ color: 'var(--color-mute)' }}>{t('reviewNone')}</span>}
          </span>
        </Section>

        <Section label={t('reviewDensity')} onEdit={() => onGoToStep(6)} step={6}>
          <span style={{ fontSize: 13, color: 'var(--color-ink)' }}>
            {densityLabels[form.layoutDensity]}
          </span>
        </Section>

        <Section label={t('reviewHero')} onEdit={() => onGoToStep(7)} step={7}>
          <span style={{ fontSize: 13, color: 'var(--color-ink)', fontFamily: 'DM Mono, monospace' }}>
            {form.heroStyle || <span style={{ color: 'var(--color-mute)' }}>{t('reviewNone')}</span>}
          </span>
        </Section>

        <Section label={t('reviewImagery')} onEdit={() => onGoToStep(8)} step={8}>
          <span style={{ fontSize: 13, color: 'var(--color-ink)', fontFamily: 'DM Mono, monospace' }}>
            {form.imageryStyle || <span style={{ color: 'var(--color-mute)' }}>{t('reviewNone')}</span>}
          </span>
        </Section>

        <Section label={t('reviewNavigation')} onEdit={() => onGoToStep(9)} step={9}>
          <span style={{ fontSize: 13, color: 'var(--color-ink)', fontFamily: 'DM Mono, monospace' }}>
            {form.navigationStyle || <span style={{ color: 'var(--color-mute)' }}>{t('reviewNone')}</span>}
          </span>
        </Section>

        <Section label={t('reviewAnimation')} onEdit={() => onGoToStep(10)} step={10}>
          <span style={{ fontSize: 13, color: 'var(--color-ink)', fontFamily: 'DM Mono, monospace' }}>
            {form.animationLevel || <span style={{ color: 'var(--color-mute)' }}>{t('reviewNone')}</span>}
          </span>
        </Section>

        <Section label={t('reviewColorMode')} onEdit={() => onGoToStep(11)} step={11}>
          <span style={{ fontSize: 13, color: 'var(--color-ink)', fontFamily: 'DM Mono, monospace' }}>
            {form.colorMode || <span style={{ color: 'var(--color-mute)' }}>{t('reviewNone')}</span>}
          </span>
        </Section>

        <Section label={t('reviewAdmire')} onEdit={() => onGoToStep(12)} step={12}>
          {form.websitesAdmire.filter(Boolean).length > 0
            ? form.websitesAdmire.filter(Boolean).map((url, i) => (
                <div key={i} style={{ fontSize: 13, fontFamily: 'DM Mono, monospace', color: 'var(--color-primary)', marginBottom: 4, wordBreak: 'break-all' }}>{url}</div>
              ))
            : <span style={{ fontSize: 13, color: 'var(--color-mute)' }}>{t('reviewSkipped')}</span>}
        </Section>

        <Section label={t('reviewDislike')} onEdit={() => onGoToStep(13)} step={13}>
          {form.websitesDislike.filter(Boolean).length > 0
            ? form.websitesDislike.filter(Boolean).map((url, i) => (
                <div key={i} style={{ fontSize: 13, fontFamily: 'DM Mono, monospace', color: 'rgba(18,16,18,0.6)', marginBottom: 4, wordBreak: 'break-all' }}>{url}</div>
              ))
            : <span style={{ fontSize: 13, color: 'var(--color-mute)' }}>{t('reviewSkipped')}</span>}
        </Section>

        <Section label={t('reviewNotes')} onEdit={() => onGoToStep(14)} step={14}>
          {form.notes
            ? <p style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--color-mute-strong)', margin: 0 }}>{form.notes}</p>
            : <span style={{ fontSize: 13, color: 'var(--color-mute)' }}>{t('reviewSkipped')}</span>}
        </Section>
      </div>

      {/* Error state */}
      {error && (
        <div style={{ marginTop: 24, padding: '16px 20px', background: 'rgba(255,100,100,0.08)', border: '1px solid rgba(255,100,100,0.2)', borderRadius: 12 }}>
          <div style={{ fontSize: 14, fontWeight: 500, color: '#c0392b', marginBottom: 4 }}>{t('errorTitle')}</div>
          <div style={{ fontSize: 13, color: 'var(--color-mute-strong)', marginBottom: errorMsg ? 8 : 16 }}>{t('errorSubtext')}</div>
          {errorMsg && (
            <div style={{ fontFamily: 'DM Mono, monospace', fontSize: 11, padding: '8px 12px', background: 'rgba(18,16,18,0.05)', borderRadius: 8, color: 'var(--color-mute-strong)', marginBottom: 16, wordBreak: 'break-all' }}>
              {errorMsg}
            </div>
          )}
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <button className="btn-brand" style={{ padding: '10px 20px', fontSize: 13 }} onClick={handleSubmit}>{t('errorRetry')}</button>
            <button className="btn-outline" style={{ padding: '10px 20px', fontSize: 13 }} onClick={handleCopy}>
              {copied ? t('errorCopied') : t('errorCopy')}
            </button>
          </div>
        </div>
      )}

      <div className="step-nav" style={{ paddingTop: 32 }}>
        <button className="btn-outline" style={{ padding: '12px 24px' }} onClick={onBack}>{t('back')}</button>
        <button
          className="btn-brand"
          style={{ padding: '14px 32px', fontSize: 16, opacity: submitting ? 0.7 : 1, cursor: submitting ? 'wait' : 'pointer', minWidth: 200 }}
          onClick={submitting ? undefined : handleSubmit}
          disabled={submitting}
        >
          {submitting ? t('submitting') : t('submitButton')}
        </button>
      </div>
    </div>
  )
}
