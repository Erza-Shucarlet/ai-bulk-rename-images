import './index.css';
import BrowserGuard from './components/BrowserGuard';
import DropZone from './components/DropZone';
import RulesPanel from './components/RulesPanel';
import PreviewTable from './components/PreviewTable';
import ActionBar from './components/ActionBar';
import { useI18n, type Lang } from './i18n';

function LanguageToggle() {
  const { lang, setLang } = useI18n();

  const options: { value: Lang; label: string }[] = [
    { value: 'en', label: 'EN' },
    { value: 'zh', label: '中' },
    { value: 'ru', label: 'РУ' },
  ];

  return (
    <div className="flex items-center bg-slate-100 rounded-lg p-0.5 gap-0.5">
      {options.map((opt) => (
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
  );
}

/** 侧边广告位（左 / 右），宽 160px，在 xl 以下隐藏 */
function SideAd({ side }: { side: 'left' | 'right' }) {
  return (
    <aside className="hidden xl:flex w-40 shrink-0 pt-6">
      <div className="sticky top-6 w-full">
        {/* 160×600 Wide Skyscraper */}
        <div className="w-40 h-[600px] bg-slate-100 border border-dashed border-slate-300 rounded-xl flex flex-col items-center justify-center gap-2 text-slate-400">
          <svg className="w-5 h-5 opacity-40" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3 9.75h18M3 6.75h18" />
          </svg>
          <span className="text-[10px] font-medium tracking-wide uppercase opacity-50">Ad</span>
          <span className="text-[9px] opacity-35">160 × 600</span>
        </div>
        {side === 'left' ? null : null}
      </div>
    </aside>
  );
}

/** 底部广告位，728×90 Leaderboard（响应式宽度） */
function BottomAd() {
  return (
    <div className="w-full flex justify-center py-4">
      <div className="w-full max-w-[728px] h-[90px] bg-slate-100 border border-dashed border-slate-300 rounded-xl flex items-center justify-center gap-3 text-slate-400">
        <svg className="w-5 h-5 opacity-40" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3 9.75h18M3 6.75h18" />
        </svg>
        <span className="text-[10px] font-medium tracking-wide uppercase opacity-50">Ad</span>
        <span className="text-[9px] opacity-35">728 × 90</span>
      </div>
    </div>
  );
}

function App() {
  const { t } = useI18n();

  return (
    <BrowserGuard>
      <div className="min-h-screen bg-slate-50">
        {/* Header */}
        <header className="bg-white border-b border-slate-200 px-6 py-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            {/* Logo + Title */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                </svg>
              </div>
              <div>
                <h1 className="text-lg font-bold text-slate-800">{t('h1')}</h1>
                <p className="text-xs text-slate-400">{t('appSubtitle')}</p>
              </div>
            </div>

            {/* 右上角：语言切换 + 浏览器徽章 */}
            <div className="flex items-center gap-3">
              <LanguageToggle />
              <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-full px-3 py-1.5">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-xs text-slate-500">{t('browserBadge')}</span>
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
            </main>

            {/* 底部广告位 */}
            <BottomAd />

            {/* Footer */}
            <footer className="text-center py-4 text-xs text-slate-300">
              {t('footer')}
              <span className="ml-3 opacity-50">v{__APP_VERSION__}</span>
              <span className="mx-2 opacity-30">·</span>
              <a href="/privacy" className="hover:text-slate-400 transition-colors">{t('privacyPolicy')}</a>
            </footer>
          </div>

          <SideAd side="right" />
        </div>
      </div>
    </BrowserGuard>
  );
}

export default App;
