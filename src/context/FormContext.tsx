import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'

export interface FormState {
  personality: string[]
  cornerRadius: string
  shadowDepth: string
  buttonStyle: string
  layoutDensity: number
  heroStyle: string
  imageryStyle: string
  navigationStyle: string
  animationLevel: string
  colorMode: string
  websitesAdmire: string[]
  websitesDislike: string[]
  notes: string
}

const defaultState: FormState = {
  personality: [],
  cornerRadius: '',
  shadowDepth: '',
  buttonStyle: '',
  layoutDensity: 1,
  heroStyle: '',
  imageryStyle: '',
  navigationStyle: '',
  animationLevel: '',
  colorMode: '',
  websitesAdmire: ['', '', ''],
  websitesDislike: ['', '', ''],
  notes: '',
}

interface FormContextValue {
  form: FormState
  setField: <K extends keyof FormState>(key: K, value: FormState[K]) => void
  goToStep: (step: number) => void
  onGoToStep: ((step: number) => void) | null
  registerGoToStep: (fn: (step: number) => void) => void
}

const FormContext = createContext<FormContextValue | null>(null)

export function FormProvider({ children }: { children: ReactNode }) {
  const [form, setForm] = useState<FormState>(defaultState)
  const [goToStepFn, setGoToStepFn] = useState<((step: number) => void) | null>(null)

  const setField = useCallback(<K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm(prev => ({ ...prev, [key]: value }))
  }, [])

  const registerGoToStep = useCallback((fn: (step: number) => void) => {
    setGoToStepFn(() => fn)
  }, [])

  const goToStep = useCallback((step: number) => {
    goToStepFn?.(step)
  }, [goToStepFn])

  return (
    <FormContext.Provider value={{ form, setField, goToStep, onGoToStep: goToStepFn, registerGoToStep }}>
      {children}
    </FormContext.Provider>
  )
}

export function useForm() {
  const ctx = useContext(FormContext)
  if (!ctx) throw new Error('useForm must be used within FormProvider')
  return ctx
}
