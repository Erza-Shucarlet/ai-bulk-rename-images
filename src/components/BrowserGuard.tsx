import { checkFsApiSupport } from '../core/fsApi';
import { useI18n, type Lang } from '../i18n';

interface BrowserGuardProps {
  children: React.ReactNode;
}

// Google Chrome 品牌色图标（三色扇形环 + 蓝色中心）
function ChromeIcon() {
  return (
    <svg viewBox="0 0 48 48" className="w-8 h-8" xmlns="http://www.w3.org/2000/svg">
      {/* 红色扇形（顶部 -90° → 30°） */}
      <path d="M24 2 A22 22 0 0 1 43.05 35 L24 24 Z" fill="#EA4335"/>
      {/* 黄色扇形（右下 30° → 150°） */}
      <path d="M43.05 35 A22 22 0 0 1 4.95 35 L24 24 Z" fill="#FBBC05"/>
      {/* 绿色扇形（左侧 150° → 270°） */}
      <path d="M4.95 35 A22 22 0 0 1 24 2 L24 24 Z" fill="#34A853"/>
      {/* 白色分隔环 */}
      <circle cx="24" cy="24" r="13" fill="white"/>
      {/* 蓝色中心圆 */}
      <circle cx="24" cy="24" r="9" fill="#4285F4"/>
    </svg>
  );
}

// Microsoft Edge 品牌色图标
function EdgeIcon() {
  return (
    <svg viewBox="0 0 48 48" className="w-8 h-8" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="edge-a" x1="9" y1="6.3" x2="40.5" y2="44.1" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#0C59A4"/>
          <stop offset="1" stopColor="#1B9DE2"/>
        </linearGradient>
        <linearGradient id="edge-b" x1="18.6" y1="32.6" x2="37.6" y2="44.5" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#1B9DE2"/>
          <stop offset="1" stopColor="#28CAFF"/>
        </linearGradient>
      </defs>
      {/* 主体波浪形 */}
      <path d="M6 23C6 13.06 14.06 5 24 5c6.3 0 11.8 3.1 15.1 7.8 1.5 2.1 2.4 4.7 2.4 7.4 0 2-.8 4-2.2 5.5-1.6 1.6-3.8 2.3-6.1 2.3H22c-1.1 0-2 .9-2 2 0 .6.3 1.2.7 1.6.5.5 1.3 1.1 1.3 2.1 0 2.2-2.8 4.3-6 4.3-4.1 0-7.8-2.3-9.8-5.8C5.3 29.9 6 26.5 6 23z" fill="url(#edge-a)"/>
      {/* 底部高光波浪 */}
      <path d="M42 34c-1.5 5.5-6.4 10-13.1 11-6.8 1-13-2-16.3-7 3.1 2 7.1 3.3 11.4 2.6 6.4-1 10.7-6.2 10.7-12.6v-.8l6.9-2.4C42.4 27.1 43.4 30.8 42 34z" fill="url(#edge-b)"/>
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
