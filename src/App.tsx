import { HashRouter, Routes, Route } from 'react-router-dom'
import { LanguageProvider } from './context/LanguageContext'
import { FormProvider } from './context/FormContext'
import AdminPage from './pages/AdminPage'
import ClientForm from './pages/ClientForm'
import PromptGeneratorPage from './pages/PromptGeneratorPage'
import AdminGate from './components/AdminGate'

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/admin/prompt" element={<AdminGate><PromptGeneratorPage /></AdminGate>} />
        <Route path="/admin" element={<AdminGate><AdminPage /></AdminGate>} />
        <Route path="/*" element={
          <LanguageProvider>
            <FormProvider>
              <ClientForm />
            </FormProvider>
          </LanguageProvider>
        } />
      </Routes>
    </HashRouter>
  )
}
