import { useState } from 'react';
import { pickDirectory } from '../core/fsApi';
import { useRenameStore } from '../store/useRenameStore';
import { useI18n } from '../i18n';

export default function DropZone() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { setFiles, dirName, files } = useRenameStore();
  const { t } = useI18n();

  const handlePick = async () => {
    setError('');
    setLoading(true);
    try {
      const { files: picked, dirName: name } = await pickDirectory();
      setFiles(picked, name);
    } catch (e) {
      if (e instanceof DOMException && e.name === 'AbortError') {
        // 用户取消，静默处理
      } else {
        setError(t('folderReadError'));
      }
    } finally {
      setLoading(false);
    }
  };

  const hasFiles = files.length > 0;

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-5 h-full flex flex-col">
      <h2 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4">
        {t('folderLabel')}
      </h2>

      {hasFiles ? (
        <div className="flex-1 flex flex-col">
          <div className="flex-1 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mb-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-800/30 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
                </svg>
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-slate-800 dark:text-slate-100 truncate" title={dirName}>{dirName}</p>
                <p className="text-sm text-blue-600 mt-0.5">{files.length} {t('files')}</p>
              </div>
            </div>
          </div>

          <button
            onClick={handlePick}
            disabled={loading}
            className="w-full py-2 px-4 text-sm text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-600 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 hover:border-slate-300 dark:hover:border-slate-500 transition-colors"
          >
            {loading ? t('reading') : t('changeFolder')}
          </button>
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center">
          <button
            onClick={handlePick}
            disabled={loading}
            className="group w-full border-2 border-dashed border-slate-200 dark:border-slate-600 rounded-xl p-8 flex flex-col items-center gap-3 hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200 cursor-pointer"
          >
            <div className="w-14 h-14 bg-slate-100 dark:bg-slate-700 group-hover:bg-blue-100 dark:group-hover:bg-blue-800/30 rounded-full flex items-center justify-center transition-colors">
              {loading ? (
                <svg className="w-6 h-6 text-blue-500 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              ) : (
                <svg className="w-6 h-6 text-slate-400 dark:text-slate-500 group-hover:text-blue-500 transition-colors" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.338-2.32 5.75 5.75 0 011.229 8.19" />
                </svg>
              )}
            </div>
            <div className="text-center">
              <p className="font-medium text-slate-700 dark:text-slate-200 group-hover:text-blue-700 dark:group-hover:text-blue-400">
                {loading ? t('reading') : t('selectFolder')}
              </p>
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">{t('grantAccess')}</p>
            </div>
          </button>
        </div>
      )}

      {error && (
        <p className="mt-3 text-xs text-red-500 text-center">{error}</p>
      )}
    </div>
  );
}
