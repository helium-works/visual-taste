import { useState, useEffect, useCallback } from 'react'
import { useUrlParams } from '../hooks/useUrlParams'
import { useBrandStyles } from '../hooks/useBrandStyles'
import { useLanguage } from '../context/LanguageContext'
import { useForm } from '../context/FormContext'
import type { Language } from '../data/translations'
import ProgressBar from '../components/ProgressBar'
import LanguageToggle from '../components/LanguageToggle'
import StepContainer from '../components/StepContainer'

// Steps
import WelcomeStep from '../steps/WelcomeStep'
import PersonalityStep from '../steps/PersonalityStep'
import CornerRadiusStep from '../steps/CornerRadiusStep'
import ShadowStep from '../steps/ShadowStep'
import ButtonStyleStep from '../steps/ButtonStyleStep'
import LayoutDensityStep from '../steps/LayoutDensityStep'
import HeroStyleStep from '../steps/HeroStyleStep'
import ImageryStep from '../steps/ImageryStep'
import NavigationStep from '../steps/NavigationStep'
import AnimationStep from '../steps/AnimationStep'
import ColorModeStep from '../steps/ColorModeStep'
import WebsitesAdmireStep from '../steps/WebsitesAdmireStep'
import WebsitesDislikeStep from '../steps/WebsitesDislikeStep'
import NotesStep from '../steps/NotesStep'
import ReviewStep from '../steps/ReviewStep'

// Step 0 = Welcome (language select)
// Steps 1-14 = form questions (displayed as 1-14)
// Step 15 = Review + Submit
const TOTAL_STEPS = 15

export default function ClientForm() {
  const params = useUrlParams()
  const { setLang } = useLanguage()
  const { registerGoToStep } = useForm()
  const [step, setStep] = useState(0)
  const [direction, setDirection] = useState<1 | -1>(1)

  // Inject brand
  useBrandStyles(params.font, params.primary, params.secondary)

  const goToStep = useCallback((target: number) => {
    setDirection(target > step ? 1 : -1)
    setStep(target)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [step])

  const next = useCallback(() => goToStep(step + 1), [step, goToStep])
  const back = useCallback(() => goToStep(step - 1), [step, goToStep])

  // Register goToStep for review "edit" buttons
  useEffect(() => {
    registerGoToStep(goToStep)
  }, [registerGoToStep, goToStep])

  // Keyboard nav
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && step > 0) back()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [step, back])

  // Missing params screen
  if (!params.isValid) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 24px',
        textAlign: 'center',
        background: 'var(--color-bg-soft)',
      }}>
        <div style={{ fontSize: 40, marginBottom: 20 }}>🔗</div>
        <h1 style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 28, fontWeight: 400, letterSpacing: '-0.025em', color: 'var(--color-ink)', margin: '0 0 12px' }}>
          This link is incomplete
        </h1>
        <p style={{ fontSize: 15, color: 'var(--color-mute-strong)', marginBottom: 16, maxWidth: 400 }}>
          This URL is missing required parameters. Please contact us for a fresh link.
        </p>
        <div style={{ padding: '10px 18px', background: 'rgba(18,16,18,0.05)', borderRadius: 10, fontFamily: 'DM Mono, monospace', fontSize: 13, color: 'var(--color-mute)' }}>
          Missing: {params.missingParams.join(', ')}
        </div>
      </div>
    )
  }

  const showToggle = step > 0
  const showProgress = step > 0
  // Progress: step 1-14 maps to 1/14 through 14/14, step 15 = 100%
  const progressStep = step === 0 ? 0 : Math.min(step, TOTAL_STEPS)

  const handleLanguageSelect = (lang: Language) => {
    setLang(lang)
  }

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <WelcomeStep
            clientName={params.client}
            onNext={next}
            onLanguageSelect={handleLanguageSelect}
          />
        )
      case 1:
        return <PersonalityStep onNext={next} onBack={back} />
      case 2:
        return <CornerRadiusStep onNext={next} onBack={back} />
      case 3:
        return <ShadowStep onNext={next} onBack={back} />
      case 4:
        return <ButtonStyleStep onNext={next} onBack={back} />
      case 5:
        return <LayoutDensityStep onNext={next} onBack={back} />
      case 6:
        return <HeroStyleStep onNext={next} onBack={back} />
      case 7:
        return <ImageryStep onNext={next} onBack={back} />
      case 8:
        return <NavigationStep onNext={next} onBack={back} />
      case 9:
        return <AnimationStep onNext={next} onBack={back} />
      case 10:
        return <ColorModeStep onNext={next} onBack={back} />
      case 11:
        return <WebsitesAdmireStep onNext={next} onBack={back} />
      case 12:
        return <WebsitesDislikeStep onNext={next} onBack={back} />
      case 13:
        return <NotesStep onNext={next} onBack={back} />
      case 14:
        return (
          <ReviewStep
            onBack={back}
            clientName={params.client}
            font={params.font}
            primary={params.primary}
            secondary={params.secondary}
            onGoToStep={goToStep}
          />
        )
      default:
        return null
    }
  }

  // Welcome step is full-screen, others are in a card
  const isWelcome = step === 0

  return (
    <div
      className="noise-bg"
      style={{
        minHeight: '100vh',
        background: 'var(--color-bg-soft)',
        fontFamily: 'var(--font-brand)',
        position: 'relative',
      }}
    >
      {showProgress && (
        <ProgressBar current={progressStep} total={TOTAL_STEPS} />
      )}

      {showToggle && <LanguageToggle />}

      {/* Step counter */}
      {showProgress && (
        <div className="step-counter" style={{
          position: 'fixed',
          top: 20,
          left: '50%',
          transform: 'translateX(-50%)',
          fontFamily: 'DM Mono, monospace',
          fontSize: 11,
          letterSpacing: '0.10em',
          textTransform: 'uppercase',
          color: 'var(--color-mute)',
          zIndex: 100,
          background: 'rgba(246,245,241,0.85)',
          backdropFilter: 'blur(8px)',
          padding: '5px 12px',
          borderRadius: 20,
          border: '1px solid var(--color-rule)',
        }}>
          {progressStep} / {TOTAL_STEPS}
        </div>
      )}

      {isWelcome ? (
        <StepContainer stepKey={step} direction={direction}>
          {renderStep()}
        </StepContainer>
      ) : (
        <div style={{
          maxWidth: 680,
          margin: '0 auto',
          padding: '72px 20px 60px',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
        }}>
          {/* Diagonal accent corner detail */}
          <div style={{
            position: 'fixed',
            bottom: 0,
            right: 0,
            width: 200,
            height: 200,
            background: 'var(--color-primary)',
            opacity: 0.04,
            clipPath: 'polygon(100% 0, 100% 100%, 0 100%)',
            pointerEvents: 'none',
            zIndex: 0,
          }} />

          <div className="step-card" style={{ position: 'relative', zIndex: 1 }}>
            <StepContainer stepKey={step} direction={direction}>
              {renderStep()}
            </StepContainer>
          </div>
        </div>
      )}
    </div>
  )
}
