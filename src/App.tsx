import './index.css';
import { useEffect } from 'react';
import BrowserGuard from './components/BrowserGuard';
import DropZone from './components/DropZone';
import RulesPanel from './components/RulesPanel';
import PreviewTable from './components/PreviewTable';
import ActionBar from './components/ActionBar';
import InfoSection from './components/InfoSection';
import { useI18n, type Lang } from './i18n';
import { useTheme } from './context/ThemeContext';

// 告知 TypeScript adsbygoogle 是全局变量
declare const adsbygoogle: unknown[];

function LanguageToggle() {
  const { lang, setLang } = useI18n();

  const options: { value: Lang; label: string }[] = [
    { value: 'en', label: 'EN' },
    { value: 'zh', label: '中' },
    { value: 'zh-TW', label: '繁' },
    { value: 'ru', label: 'РУ' },
  ];

  return (
    <div className="flex items-center bg-slate-100 dark:bg-slate-700 rounded-lg p-0.5 gap-0.5">
      {options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => setLang(opt.value)}
          className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
            lang === opt.value
              ? 'bg-white dark:bg-slate-500 text-slate-800 dark:text-slate-100 shadow-sm'
              : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300'
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:text-slate-500 dark:hover:text-slate-300 dark:hover:bg-slate-700 transition-colors"
      title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {theme === 'dark' ? (
        // 太阳图标（深色模式下显示，点击切回亮色）
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
        </svg>
      ) : (
        // 月亮图标（亮色模式下显示，点击切入深色）
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
        </svg>
      )}
    </button>
  );
}

/** 侧边广告位（左 / 右），宽 160px，在 xl 以下隐藏 */
function SideAd({ side }: { side: 'left' | 'right' }) {
  const slotId = side === 'left' ? '4991313315' : '5018504526';

  useEffect(() => {
    try {
      (adsbygoogle as unknown[]).push({});
    } catch (_) {
      // 开发环境忽略
    }
  }, []);

  return (
    <aside className="hidden xl:flex w-40 shrink-0 pt-6">
      <div className="sticky top-6 w-full">
        <ins
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client="ca-pub-4044456745316436"
          data-ad-slot={slotId}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    </aside>
  );
}

/** 底部广告位，自适应横幅 */
function BottomAd() {
  useEffect(() => {
    try {
      (adsbygoogle as unknown[]).push({});
    } catch (_) {
      // 开发环境忽略
    }
  }, []);

  return (
    <div className="w-full flex justify-center py-4">
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-4044456745316436"
        data-ad-slot="9371645093"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}

function App() {
  const { t } = useI18n();

  const today = new Date().toISOString().slice(0, 10);
  const mailtoHref = `mailto:shucarlet@gmail.com?subject=${encodeURIComponent(`${today}_ai-bulk-rename-images_v${__APP_VERSION__}`)}`;

  return (
    <BrowserGuard>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
        {/* Header */}
        <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 px-6 py-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            {/* Logo + Title */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                </svg>
              </div>
              <div>
                <span className="text-lg font-bold text-slate-800 dark:text-slate-100">{t('h1')}</span>
                <p className="text-xs text-slate-400 dark:text-slate-500">{t('appSubtitle')}</p>
              </div>
            </div>

            {/* 右上角：深色模式切换 + 语言切换 + 浏览器徽章 */}
            <div className="flex items-center gap-3">
              <ThemeToggle />
              <LanguageToggle />
              <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-full px-3 py-1.5">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-xs text-slate-500 dark:text-slate-400">{t('browserBadge')}</span>
              </div>
            </div>
          </div>
        </header>

        {/* 三栏布局：左广告 | 主内容 | 右广告 */}
        <div className="flex gap-4 px-4 xl:px-6">
          <SideAd side="left" />

          {/* 主内容区 */}
          <div className="flex-1 min-w-0">
            <main className="max-w-7xl mx-auto py-6">
              {/* 页面 H1 标题 + 描述（SEO） */}
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-1">{t('h1')}</h1>
                <p className="text-sm text-slate-500 dark:text-slate-400">{t('heroDesc')}</p>
              </div>

              {/* Top: folder picker + rules */}
              <div className="grid grid-cols-12 gap-4 mb-4">
                <div className="col-span-12 lg:col-span-3">
                  <DropZone />
                </div>
                <div className="col-span-12 lg:col-span-9">
                  <RulesPanel />
                </div>
              </div>

              {/* Preview table */}
              <PreviewTable />

              {/* Action bar */}
              <div className="mt-4">
                <ActionBar />
              </div>

              {/* 信息区：介绍、优势、FAQ */}
              <div className="mt-8 border-t border-slate-200 dark:border-slate-700 pt-8">
                <InfoSection />
              </div>
            </main>

            {/* 底部广告位 */}
            <BottomAd />

            {/* Footer */}
            <footer className="text-center py-4 text-xs text-slate-300 dark:text-slate-600">
              {t('footer')}
              <span className="ml-3 opacity-50">v{__APP_VERSION__}</span>
              <span className="mx-2 opacity-30">·</span>
              <a href="/privacy" className="hover:text-slate-400 dark:hover:text-slate-400 transition-colors">{t('privacyPolicy')}</a>
              <span className="mx-2 opacity-30">·</span>
              <a href={mailtoHref} className="hover:text-slate-400 dark:hover:text-slate-400 transition-colors">{t('contactWebmaster')}</a>
            </footer>
          </div>

          <SideAd side="right" />
        </div>
      </div>
    </BrowserGuard>
  );
}

export default App;
