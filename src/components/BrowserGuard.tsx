import { checkFsApiSupport } from '../core/fsApi';
import { useI18n } from '../i18n';

interface BrowserGuardProps {
  children: React.ReactNode;
}

export default function BrowserGuard({ children }: BrowserGuardProps) {
  const { t } = useI18n();

  if (checkFsApiSupport()) {
    return <>{children}</>;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/95 backdrop-blur-sm">
      <div className="max-w-md w-full mx-4 bg-white rounded-2xl shadow-2xl p-8 text-center">
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
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🌐</span>
              <div>
                <p className="font-medium text-slate-800">Google Chrome</p>
                <p className="text-xs text-slate-500">{t('chromeVersion')}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-2xl">🔵</span>
              <div>
                <p className="font-medium text-slate-800">Microsoft Edge</p>
                <p className="text-xs text-slate-500">{t('edgeVersion')}</p>
              </div>
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
