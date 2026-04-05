import { useState } from 'react';
import type { ReplaceRule as ReplaceRuleType } from '../../types';
import { useRenameStore } from '../../store/useRenameStore';
import { useI18n } from '../../i18n';

interface Props {
  rule: ReplaceRuleType;
}

export default function ReplaceRule({ rule }: Props) {
  const { updateRule } = useRenameStore();
  const { t } = useI18n();
  const [regexError, setRegexError] = useState('');

  const handlePatternChange = (value: string) => {
    if (rule.useRegex && value) {
      try {
        new RegExp(value);
        setRegexError('');
      } catch {
        setRegexError(t('invalidRegex'));
      }
    } else {
      setRegexError('');
    }
    updateRule(rule.id, { pattern: value });
  };

  return (
    <div className="space-y-2">
      <div className="flex gap-2 items-center">
        <div className="flex-1">
          <label className="text-xs text-slate-500 dark:text-slate-400 mb-1 block">{t('findLabel')}</label>
          <input
            type="text"
            value={rule.pattern}
            onChange={(e) => handlePatternChange(e.target.value)}
            placeholder={rule.useRegex ? t('regexPlaceholder') : t('findPlaceholder')}
            className={`w-full px-3 py-1.5 text-sm border rounded-lg outline-none focus:ring-2 focus:ring-blue-500/30 bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-200 ${
              regexError ? 'border-red-400' : 'border-slate-200 dark:border-slate-600'
            }`}
          />
          {regexError && <p className="text-xs text-red-500 mt-0.5">{regexError}</p>}
        </div>
        <div className="flex-1">
          <label className="text-xs text-slate-500 dark:text-slate-400 mb-1 block">{t('replaceLabel')}</label>
          <input
            type="text"
            value={rule.replacement}
            onChange={(e) => updateRule(rule.id, { replacement: e.target.value })}
            placeholder={t('replacePlaceholder')}
            className="w-full px-3 py-1.5 text-sm border border-slate-200 dark:border-slate-600 rounded-lg outline-none focus:ring-2 focus:ring-blue-500/30 bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-200"
          />
        </div>
      </div>
      <div className="flex gap-4">
        <label className="flex items-center gap-1.5 cursor-pointer">
          <input
            type="checkbox"
            checked={rule.useRegex}
            onChange={(e) => {
              setRegexError('');
              updateRule(rule.id, { useRegex: e.target.checked });
            }}
            className="w-3.5 h-3.5 accent-blue-500"
          />
          <span className="text-xs text-slate-600 dark:text-slate-300">{t('useRegex')}</span>
        </label>
        <label className="flex items-center gap-1.5 cursor-pointer">
          <input
            type="checkbox"
            checked={rule.caseSensitive}
            onChange={(e) => updateRule(rule.id, { caseSensitive: e.target.checked })}
            className="w-3.5 h-3.5 accent-blue-500"
          />
          <span className="text-xs text-slate-600 dark:text-slate-300">{t('caseSensitive')}</span>
        </label>
        <label className="flex items-center gap-1.5 cursor-pointer">
          <input
            type="checkbox"
            checked={rule.includeExt}
            onChange={(e) => updateRule(rule.id, { includeExt: e.target.checked })}
            className="w-3.5 h-3.5 accent-blue-500"
          />
          <span className="text-xs text-slate-600 dark:text-slate-300">{t('includeExt')}</span>
        </label>
      </div>
    </div>
  );
}
