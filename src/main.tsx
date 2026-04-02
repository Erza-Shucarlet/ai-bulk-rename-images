import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import PrivacyPolicy from './components/PrivacyPolicy.tsx'
import { I18nProvider } from './i18n'

const isPrivacy = window.location.pathname === '/privacy'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <I18nProvider>
      {isPrivacy ? <PrivacyPolicy /> : <App />}
    </I18nProvider>
  </StrictMode>,
)
