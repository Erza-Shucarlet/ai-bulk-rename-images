import { checkFsApiSupport } from '../core/fsApi';
import { useI18n, type Lang } from '../i18n';

interface BrowserGuardProps {
  children: React.ReactNode;
}

// Google Chrome 官方品牌色 SVG 图标
function ChromeIcon() {
  return (
    <svg viewBox="0 0 48 48" className="w-8 h-8" xmlns="http://www.w3.org/2000/svg">
      <circle cx="24" cy="24" r="10" fill="#fff"/>
      <path d="M24 14a10 10 0 0 1 8.66 5H44a20 20 0 1 0 .02 10H32.66A10 10 0 1 1 24 14z" fill="#4285F4"/>
      <path d="M24 14a10 10 0 0 1 8.66 5H44a20 20 0 0 0-20-20z" fill="#EA4335"/>
      <path d="M4 24a20 20 0 0 0 15.34 19.4L12 32a10 10 0 0 1-8-8z" fill="#34A853"/>
      <path d="M44 24a20 20 0 0 1-15.34 19.4L36 32a10 10 0 0 0 8-8z" fill="#FBBC05"/>
      <circle cx="24" cy="24" r="7" fill="#fff"/>
      <circle cx="24" cy="24" r="5.5" fill="#4285F4"/>
    </svg>
  );
}

// Microsoft Edge 官方品牌色 SVG 图标
function EdgeIcon() {
  return (
    <svg viewBox="0 0 48 48" className="w-8 h-8" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="edge-grad-1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0C59A4"/>
          <stop offset="100%" stopColor="#1B9DE2"/>
        </linearGradient>
        <linearGradient id="edge-grad-2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1B9DE2"/>
          <stop offset="100%" stopColor="#28BDEF"/>
        </linearGradient>
      </defs>
      <path d="M42 24c0 9.94-8.06 18-18 18-3.07 0-5.96-.77-8.5-2.13C19.73 41.08 24 38 24 38s10-4 10-14c0-2.34-.55-4.55-1.53-6.5C35.56 19.14 42 21.1 42 24z" fill="url(#edge-grad-2)"/>
      <path d="M24 6C13.51 6 5 14.51 5 25c0 4.43 1.53 8.5 4.08 11.72A18 18 0 0 0 24 42c9.94 0 18-8.06 18-18 0-2.9-6.44-4.86-9.53-6.5C33.45 19.45 34 21.66 34 24c0 10-10 14-10 14s-4.27 3.08-8.5 1.87A17.94 17.94 0 0 1 6 24c0-9.94 8.06-18 18-18 6.08 0 11.45 3.01 14.72 7.63C36.22 8.97 30.42 6 24 6z" fill="url(#edge-grad-1)"/>
    </svg>
  );
}

export default function BrowserGuard({ children }: BrowserGuardProps) {
  const { t, lang, setLang } = useI18n();

  if (checkFsApiSupport()) {
    return <>{children}</>;
  }

  const langOptions: { value: Lang; label: string }[] = [
    { value: 'en', label: 'EN' },
    { value: 'zh', label: '中' },
    { value: 'ru', label: 'РУ' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/95 backdrop-blur-sm">
      <div className="max-w-md w-full mx-4 bg-white rounded-2xl shadow-2xl p-8 text-center">
        {/* 语言切换 */}
        <div className="flex justify-end mb-4">
          <div className="flex items-center bg-slate-100 rounded-lg p-0.5 gap-0.5">
            {langOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setLang(opt.value)}
                className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
                  lang === opt.value
                    ? 'bg-white text-slate-800 shadow-sm'
                    : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-amber-500" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
          </svg>
        </div>

        <h2 className="text-2xl font-bold text-slate-800 mb-3">{t('browserNotSupported')}</h2>
        <p className="text-slate-500 mb-6 leading-relaxed">
          {t('browserNotSupportedDesc')}
        </p>

        <div className="bg-slate-50 rounded-xl p-5 mb-6 text-left">
          <p className="text-sm font-semibold text-slate-700 mb-3">{t('pleasUseOne')}</p>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <ChromeIcon />
              <p className="font-medium text-slate-800">Google Chrome</p>
            </div>
            <div className="flex items-center gap-3">
              <EdgeIcon />
              <p className="font-medium text-slate-800">Microsoft Edge</p>
            </div>
          </div>
        </div>

        <p className="text-xs text-slate-400">
          {t('browserNoSupport')}
        </p>
      </div>
    </div>
  );
}
