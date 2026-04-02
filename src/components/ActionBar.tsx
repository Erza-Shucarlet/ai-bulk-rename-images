import { useState } from 'react';
import { useRenameStore } from '../store/useRenameStore';
import { checkMoveSupport } from '../core/fsApi';
import { useI18n } from '../i18n';

export default function ActionBar() {
  const { previews, rules, reset, executeRename, isProcessing, progress, results, clearResults } = useRenameStore();
  const { t } = useI18n();
  const [showResults, setShowResults] = useState(false);

  const toRenameCount = previews.filter(
    (p) => !p.conflict && !p.error && p.original !== p.preview
  ).length;

  const conflictCount = previews.filter((p) => p.conflict).length;
  const isMoveSupported = checkMoveSupport();

  const handleExecute = async () => {
    if (!isMoveSupported) {
      alert(t('browserUpgradeAlert'));
      return;
    }
    if (toRenameCount === 0) return;
    setShowResults(false);
    await executeRename();
    setShowResults(true);
  };

  const handleReset = () => {
    reset();
    setShowResults(false);
    clearResults();
  };

  return (
    <div className="space-y-3">
      {/* 执行结果弹窗 */}
      {showResults && results.length > 0 && (
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-slate-700">{t('results')}</h3>
            <button
              onClick={() => { setShowResults(false); clearResults(); }}
              className="text-slate-400 hover:text-slate-600"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="flex gap-4 mb-3 text-sm">
            <span className="text-green-600">
              ✅ {results.filter((r) => r.success).length} {t('succeeded')}
            </span>
            {results.filter((r) => !r.success).length > 0 && (
              <span className="text-red-500">
                ❌ {results.filter((r) => !r.success).length} {t('failed')}
              </span>
            )}
          </div>

          {results.filter((r) => !r.success).length > 0 && (
            <div className="space-y-1 max-h-32 overflow-y-auto">
              {results.filter((r) => !r.success).map((r, i) => (
                <div key={i} className="text-xs text-red-500 bg-red-50 px-3 py-1.5 rounded-lg">
                  <span className="font-mono">{r.original}</span>
                  {r.error && <span className="text-red-400 ml-2">— {r.error}</span>}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 进度条 */}
      {isProcessing && (
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-600">{t('renaming')}</span>
            <span className="text-sm font-medium text-blue-600">{progress}%</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2">
            <div
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {/* 操作按钮栏 */}
      <div className="bg-white rounded-xl border border-slate-200 px-4 py-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <button
            onClick={handleReset}
            disabled={isProcessing || rules.length === 0}
            className="px-4 py-2 text-sm text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50 hover:border-slate-300 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            {t('resetRules')}
          </button>

          {conflictCount > 0 && (
            <span className="text-xs text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full">
              ⚠ {conflictCount} {t('conflictsWillBeSkipped')}
            </span>
          )}
        </div>

        <button
          onClick={handleExecute}
          disabled={isProcessing || toRenameCount === 0}
          className="flex items-center gap-2 px-5 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-slate-200 disabled:text-slate-400 text-white text-sm font-medium rounded-lg transition-colors disabled:cursor-not-allowed"
        >
          {isProcessing ? (
            <>
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              {t('processing')}
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
              {t('applyRename')}
              {toRenameCount > 0 && (
                <span className="bg-blue-400 text-white text-xs px-1.5 py-0.5 rounded-full">
                  {toRenameCount}
                </span>
              )}
            </>
          )}
        </button>
      </div>
    </div>
  );
}
