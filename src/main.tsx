import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import PrivacyPolicy from './components/PrivacyPolicy.tsx'
import { I18nProvider } from './i18n'
import { ThemeProvider } from './context/ThemeContext.tsx'

const isPrivacy = window.location.pathname === '/privacy'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <I18nProvider>
        {isPrivacy ? <PrivacyPolicy /> : <App />}
      </I18nProvider>
    </ThemeProvider>
  </StrictMode>,
)
