import { useRenameStore } from '../store/useRenameStore';
import { useI18n } from '../i18n';

export default function PreviewTable() {
  const { previews, files } = useRenameStore();
  const { t } = useI18n();

  if (files.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 flex items-center justify-center min-h-48">
        <div className="text-center">
          <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <svg className="w-6 h-6 text-slate-300" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 00-1.883 2.542l.857 6a2.25 2.25 0 002.227 1.932H19.05a2.25 2.25 0 002.227-1.932l.857-6a2.25 2.25 0 00-1.883-2.542m-16.5 0V6A2.25 2.25 0 016 3.75h3.879a1.5 1.5 0 011.06.44l2.122 2.12a1.5 1.5 0 001.06.44H18A2.25 2.25 0 0120.25 9v.776" />
            </svg>
          </div>
          <p className="text-sm text-slate-400">{t('selectFolderFirst')}</p>
        </div>
      </div>
    );
  }

  const changedCount = previews.filter((p) => p.original !== p.preview && !p.error).length;
  const conflictCount = previews.filter((p) => p.conflict).length;
  const errorCount = previews.filter((p) => p.error).length;

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
      <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
          {t('preview')}
        </h2>
        <div className="flex items-center gap-3 text-xs">
          <span className="text-slate-400">{previews.length} {t('files')}</span>
          {changedCount > 0 && (
            <span className="text-blue-600 font-medium">{changedCount} {t('willBeRenamed')}</span>
          )}
          {conflictCount > 0 && (
            <span className="text-amber-500 font-medium">
              ⚠ {conflictCount} {conflictCount > 1 ? t('nameConflicts') : t('nameConflict')}
            </span>
          )}
          {errorCount > 0 && (
            <span className="text-red-500 font-medium">
              ✕ {errorCount} {errorCount > 1 ? t('ruleErrors') : t('ruleError')}
            </span>
          )}
        </div>
      </div>

      {/* 表格 */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50">
              <th className="px-4 py-2 text-left text-xs font-medium text-slate-400 w-8">#</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-slate-400">{t('originalName')}</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-slate-400 w-6"></th>
              <th className="px-4 py-2 text-left text-xs font-medium text-slate-400">{t('newName')}</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-slate-400 w-16">{t('status')}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {previews.map((entry, i) => {
              const changed = entry.original !== entry.preview && !entry.error;
              return (
                <tr key={entry.original + i} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-4 py-2.5 text-slate-300 text-xs">{i + 1}</td>
                  <td className="px-4 py-2.5 font-mono text-slate-600 max-w-xs">
                    <span className="truncate block" title={entry.original}>
                      {entry.original}
                    </span>
                  </td>
                  <td className="px-2 py-2.5 text-slate-300">
                    {changed && (
                      <svg className="w-4 h-4 text-blue-400" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                      </svg>
                    )}
                  </td>
                  <td className="px-4 py-2.5 font-mono max-w-xs">
                    {entry.error ? (
                      <span className="text-slate-400 text-xs">{entry.original}</span>
                    ) : (
                      <span
                        className={`truncate block ${changed ? 'text-blue-600 font-medium' : 'text-slate-400'}`}
                        title={entry.preview}
                      >
                        {entry.preview}
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-2.5">
                    {entry.error ? (
                      <span className="inline-flex items-center gap-1 text-xs text-red-500" title={entry.error}>
                        <span>❌</span>
                        <span className="hidden sm:inline truncate max-w-20">{t('errorLabel')}</span>
                      </span>
                    ) : entry.conflict ? (
                      <span className="inline-flex items-center gap-1 text-xs text-amber-500">
                        <span>⚠️</span>
                        <span className="hidden sm:inline">{t('conflictLabel')}</span>
                      </span>
                    ) : changed ? (
                      <span className="text-green-500 text-xs">✅</span>
                    ) : (
                      <span className="text-slate-300 text-xs">—</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
