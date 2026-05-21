import { motion } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'
import type { Language } from '../data/translations'

interface WelcomeStepProps {
  clientName: string
  onNext: () => void
  onLanguageSelect: (lang: Language) => void
}

export default function WelcomeStep({ clientName, onNext, onLanguageSelect }: WelcomeStepProps) {
  const { lang, setLang, t } = useLanguage()

  const handleSelect = (l: Language) => {
    setLang(l)
    onLanguageSelect(l)
    setTimeout(onNext, 300)
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 24px',
      position: 'relative',
      textAlign: 'center',
    }}>
      {/* Background blobs */}
      <div style={{
        position: 'fixed',
        top: '-10%',
        right: '-5%',
        width: 400,
        height: 400,
        borderRadius: '50%',
        background: 'var(--color-secondary)',
        opacity: 0.25,
        filter: 'blur(80px)',
        pointerEvents: 'none',
        zIndex: 0,
      }} />
      <div style={{
        position: 'fixed',
        bottom: '-5%',
        left: '-5%',
        width: 300,
        height: 300,
        borderRadius: '50%',
        background: 'var(--color-primary)',
        opacity: 0.08,
        filter: 'blur(60px)',
        pointerEvents: 'none',
        zIndex: 0,
      }} />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.2, 0.7, 0.3, 1] }}
        style={{ position: 'relative', zIndex: 1, maxWidth: 480, width: '100%' }}
      >
        {/* Step indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          style={{
            fontSize: 11,
            fontFamily: 'DM Mono, monospace',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'var(--color-mute)',
            marginBottom: 32,
          }}
        >
          {t('welcomeSelectLang')}
        </motion.div>

        {/* Greeting */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6, ease: [0.2, 0.7, 0.3, 1] }}
          style={{
            fontFamily: 'var(--font-brand)',
            fontSize: 'clamp(48px, 10vw, 80px)',
            fontWeight: 400,
            letterSpacing: '-0.04em',
            lineHeight: 1.0,
            color: 'var(--color-ink)',
            margin: '0 0 20px',
          }}
        >
          {lang === 'en' ? 'Hi, ' : 'Hola, '}
          <em style={{ fontStyle: 'italic', fontWeight: 300 }}>{clientName}</em>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          style={{
            fontSize: 18,
            lineHeight: 1.5,
            color: 'var(--color-mute-strong)',
            marginBottom: 48,
            maxWidth: 380,
            margin: '0 auto 48px',
          }}
        >
          {t('welcomeSubtext')}
        </motion.p>

        {/* Language cards */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          style={{
            display: 'flex',
            gap: 16,
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}
        >
          {(['en', 'es'] as Language[]).map((l) => (
            <motion.button
              key={l}
              onClick={() => handleSelect(l)}
              whileHover={{ y: -3, boxShadow: '0 8px 24px rgba(0,0,0,0.12)' }}
              whileTap={{ scale: 0.97 }}
              style={{
                padding: '20px 40px',
                borderRadius: 16,
                border: `2px solid ${lang === l ? 'var(--color-primary)' : 'var(--color-rule)'}`,
                background: lang === l ? 'var(--color-primary)' : 'rgba(255,255,255,0.85)',
                color: lang === l ? '#ffffff' : 'var(--color-ink)',
                fontFamily: 'var(--font-brand)',
                fontSize: 18,
                fontWeight: 500,
                cursor: 'pointer',
                transition: 'border-color 0.2s, background 0.2s, color 0.2s',
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                minWidth: 160,
                justifyContent: 'center',
              }}
            >
              <span style={{ fontSize: 22 }}>{l === 'en' ? '🇺🇸' : '🇲🇽'}</span>
              {l === 'en' ? t('welcomeEnglish') : t('welcomeSpanish')}
            </motion.button>
          ))}
        </motion.div>

        {/* Subtle brand dot */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
          style={{
            width: 6,
            height: 6,
            borderRadius: '50%',
            background: 'var(--color-primary)',
            margin: '48px auto 0',
          }}
        />
      </motion.div>
    </div>
  )
}
