import { useLanguage } from '../context/LanguageContext'
import { useForm } from '../context/FormContext'

interface WebsitesAdmireStepProps {
  onNext: () => void
  onBack: () => void
}

export default function WebsitesAdmireStep({ onNext, onBack }: WebsitesAdmireStepProps) {
  const { t } = useLanguage()
  const { form, setField } = useForm()

  const handleChange = (i: number, field: 'url' | 'note', val: string) => {
    const next = [...form.websitesAdmire]
    next[i] = { ...next[i], [field]: val }
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

      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {[0, 1, 2].map(i => (
          <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
            <span style={{ fontFamily: 'DM Mono, monospace', fontSize: 11, color: 'var(--color-mute)', letterSpacing: '0.08em', width: 16, textAlign: 'right', flexShrink: 0, paddingTop: 13 }}>{i + 1}</span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, flex: 1 }}>
              <input
                className="input-brand"
                type="url"
                value={form.websitesAdmire[i]?.url || ''}
                onChange={(e) => handleChange(i, 'url', e.target.value)}
                placeholder={t('admirePlaceholder')}
                style={{ fontFamily: 'DM Mono, monospace', fontSize: 14 }}
              />
              <input
                className="input-brand"
                type="text"
                value={form.websitesAdmire[i]?.note || ''}
                onChange={(e) => handleChange(i, 'note', e.target.value)}
                placeholder={t('admireNotePlaceholder')}
                maxLength={200}
                style={{ fontSize: 13, color: 'var(--color-mute-strong)', background: 'rgba(255,255,255,0.6)' }}
              />
            </div>
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
