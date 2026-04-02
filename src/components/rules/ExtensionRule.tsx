import type { ExtensionRule as ExtensionRuleType } from '../../types';
import { useRenameStore } from '../../store/useRenameStore';
import { useI18n } from '../../i18n';

interface Props {
  rule: ExtensionRuleType;
}

const commonExts = ['jpg', 'png', 'webp', 'mp4', 'mp3', 'txt', 'pdf'];

export default function ExtensionRule({ rule }: Props) {
  const { updateRule } = useRenameStore();
  const { t } = useI18n();

  return (
    <div>
      <label className="text-xs text-slate-500 dark:text-slate-400 mb-1 block">{t('newExtLabel')}</label>
      <input
        type="text"
        value={rule.newExt}
        onChange={(e) => updateRule(rule.id, { newExt: e.target.value })}
        placeholder={t('newExtPlaceholder')}
        className="w-full px-3 py-1.5 text-sm border border-slate-200 dark:border-slate-600 rounded-lg outline-none focus:ring-2 focus:ring-blue-500/30 bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-200"
      />
      <div className="flex flex-wrap gap-1.5 mt-2">
        {commonExts.map((ext) => (
          <button
            key={ext}
            onClick={() => updateRule(rule.id, { newExt: ext })}
            className={`px-2 py-0.5 text-xs rounded-md border transition-colors ${
              rule.newExt === ext || rule.newExt === '.' + ext
                ? 'bg-blue-500 border-blue-500 text-white'
                : 'border-slate-200 dark:border-slate-600 text-slate-500 dark:text-slate-400 hover:border-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20'
            }`}
          >
            .{ext}
          </button>
        ))}
      </div>
    </div>
  );
}
