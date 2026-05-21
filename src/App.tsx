import { HashRouter, Routes, Route } from 'react-router-dom'
import { LanguageProvider } from './context/LanguageContext'
import { FormProvider } from './context/FormContext'
import AdminPage from './pages/AdminPage'
import ClientForm from './pages/ClientForm'

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/admin" element={<AdminPage />} />
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
