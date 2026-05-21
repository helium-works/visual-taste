import { useLanguage } from '../context/LanguageContext'
import { useForm } from '../context/FormContext'

interface WebsitesAdmireStepProps {
  onNext: () => void
  onBack: () => void
}

export default function WebsitesAdmireStep({ onNext, onBack }: WebsitesAdmireStepProps) {
  const { t } = useLanguage()
  const { form, setField } = useForm()

  const handleChange = (i: number, val: string) => {
    const next = [...form.websitesAdmire]
    next[i] = val
    setField('websitesAdmire', next)
  }

  return (
    <div>
      <h2 style={{ fontFamily: 'var(--font-brand)', fontSize: 'clamp(22px,4vw,30px)', fontWeight: 400, letterSpacing: '-0.025em', color: 'var(--color-ink)', margin: '0 0 8px' }}>
        {t('admireTitle')}
      </h2>
      <p style={{ fontSize: 14, color: 'var(--color-mute)', marginBottom: 32 }}>
        {t('admireSubtext')}
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {[0, 1, 2].map(i => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontFamily: 'DM Mono, monospace', fontSize: 11, color: 'var(--color-mute)', letterSpacing: '0.08em', width: 16, textAlign: 'right', flexShrink: 0 }}>{i + 1}</span>
            <input
              className="input-brand"
              type="url"
              value={form.websitesAdmire[i] || ''}
              onChange={(e) => handleChange(i, e.target.value)}
              placeholder={t('admirePlaceholder')}
              style={{ fontFamily: 'DM Mono, monospace', fontSize: 14 }}
            />
          </div>
        ))}
      </div>

      <div className="step-nav">
        <button className="btn-outline" style={{ padding: '12px 24px' }} onClick={onBack}>{t('back')}</button>
        <div style={{ display: 'flex', gap: 10 }}>
          <button className="btn-outline" style={{ padding: '12px 20px', fontSize: 13 }} onClick={onNext}>{t('skip')}</button>
          <button className="btn-brand" style={{ padding: '12px 28px' }} onClick={onNext}>{t('next')}</button>
        </div>
      </div>
    </div>
  )
}
