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
        <linearGradient id="eg1" x1="24" y1="3" x2="24" y2="45" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#36C6F0"/>
          <stop offset="0.5" stopColor="#1B7CD6"/>
          <stop offset="1" stopColor="#0C3B8C"/>
        </linearGradient>
        <linearGradient id="eg2" x1="14" y1="12" x2="42" y2="22" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#57D38C"/>
          <stop offset="1" stopColor="#1BA557"/>
        </linearGradient>
        <linearGradient id="eg3" x1="6" y1="28" x2="30" y2="46" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#1B7CD6"/>
          <stop offset="1" stopColor="#0C3B8C"/>
        </linearGradient>
        <clipPath id="ec">
          <circle cx="24" cy="24" r="22"/>
        </clipPath>
      </defs>
      {/* 蓝色主体 */}
      <circle cx="24" cy="24" r="22" fill="url(#eg1)"/>
      {/* 绿色上弧（右上角波浪区域） */}
      <path d="M24 3C33.5 3 41.5 8.5 45 16.5 42.5 12.5 37.5 9.5 32 9.5 22 9.5 14 17.5 14 27.5c0 2 .3 4 .9 5.8C10.5 29.8 8 25.2 8 20 8 10.6 15.2 3 24 3z" fill="url(#eg2)" clipPath="url(#ec)"/>
      {/* 白色椭圆（"e"字开口） */}
      <ellipse cx="27" cy="26" rx="11" ry="7" fill="white" transform="rotate(-10 27 26)"/>
      {/* 深色内卷（底部深蓝卷曲） */}
      <path d="M16 33.5c2.5 5 8 8.5 14 8.5 8 0 14.5-6 15.8-13.8C44 34 40.5 40 34 42.5c-3 1.2-6.5 1.5-9.5.5-4-1.2-7-4.2-8.5-9.5z" fill="url(#eg3)" clipPath="url(#ec)"/>
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
