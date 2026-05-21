import { useLanguage } from '../context/LanguageContext'

export default function LanguageToggle() {
  const { lang, setLang } = useLanguage()

  return (
    <button
      className="lang-toggle"
      onClick={() => setLang(lang === 'en' ? 'es' : 'en')}
      aria-label="Toggle language"
    >
      <span style={{ fontSize: 14 }}>🌐</span>
      <span>{lang === 'en' ? 'ES' : 'EN'}</span>
    </button>
  )
}
