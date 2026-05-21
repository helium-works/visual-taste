import { useLanguage } from '../context/LanguageContext'
import { useForm } from '../context/FormContext'

interface NotesStepProps {
  onNext: () => void
  onBack: () => void
}

export default function NotesStep({ onNext, onBack }: NotesStepProps) {
  const { t } = useLanguage()
  const { form, setField } = useForm()

  return (
    <div>
      <h2 style={{ fontFamily: 'var(--font-brand)', fontSize: 'clamp(22px,4vw,30px)', fontWeight: 400, letterSpacing: '-0.025em', color: 'var(--color-ink)', margin: '0 0 8px' }}>
        {t('notesTitle')}
      </h2>
      <p style={{ fontSize: 14, color: 'var(--color-mute)', marginBottom: 28 }}>
        {t('notesSubtext')}
      </p>

      <textarea
        className="input-brand"
        value={form.notes}
        onChange={(e) => setField('notes', e.target.value)}
        placeholder={t('notesPlaceholder')}
        rows={7}
        style={{
          fontFamily: 'var(--font-brand)',
          fontSize: 15,
          lineHeight: 1.6,
          minHeight: 160,
          resize: 'vertical',
        }}
      />
      <div style={{ marginTop: 6, textAlign: 'right' }}>
        <span style={{ fontSize: 11, fontFamily: 'DM Mono, monospace', color: 'var(--color-mute)' }}>
          {form.notes.length} chars
        </span>
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
