import type { CaseRule as CaseRuleType } from '../../types';
import { useRenameStore } from '../../store/useRenameStore';
import { useI18n } from '../../i18n';

interface Props {
  rule: CaseRuleType;
}

export default function CaseRule({ rule }: Props) {
  const { updateRule } = useRenameStore();
  const { t } = useI18n();

  const options: { value: CaseRuleType['mode']; labelKey: 'caseLower' | 'caseUpper' | 'caseTitle'; example: string }[] = [
    { value: 'lower', labelKey: 'caseLower', example: 'hello_world' },
    { value: 'upper', labelKey: 'caseUpper', example: 'HELLO_WORLD' },
    { value: 'title', labelKey: 'caseTitle', example: 'Hello_World' },
  ];

  return (
    <div>
      <label className="text-xs text-slate-500 dark:text-slate-400 mb-2 block">{t('conversionMode')}</label>
      <div className="flex gap-2">
        {options.map((opt) => (
          <button
            key={opt.value}
            onClick={() => updateRule(rule.id, { mode: opt.value })}
            className={`flex-1 py-2 px-3 rounded-lg border text-sm font-medium transition-all ${
              rule.mode === opt.value
                ? 'bg-blue-500 border-blue-500 text-white'
                : 'border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:border-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20'
            }`}
          >
            <div>{t(opt.labelKey)}</div>
            <div className={`text-xs mt-0.5 font-normal ${rule.mode === opt.value ? 'text-blue-100' : 'text-slate-400 dark:text-slate-500'}`}>
              {opt.example}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
