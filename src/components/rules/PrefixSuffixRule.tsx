import type { PrefixRule, SuffixRule } from '../../types';
import { useRenameStore } from '../../store/useRenameStore';
import { useI18n } from '../../i18n';

interface Props {
  rule: PrefixRule | SuffixRule;
}

export default function PrefixSuffixRule({ rule }: Props) {
  const { updateRule } = useRenameStore();
  const { t } = useI18n();

  const isPrefix = rule.type === 'prefix';

  return (
    <div>
      <label className="text-xs text-slate-500 mb-1 block">
        {isPrefix ? t('prefixLabel') : t('suffixLabel')}
      </label>
      <input
        type="text"
        value={rule.value}
        onChange={(e) => updateRule(rule.id, { value: e.target.value })}
        placeholder={isPrefix ? t('prefixPlaceholder') : t('suffixPlaceholder')}
        className="w-full px-3 py-1.5 text-sm border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500/30"
      />
    </div>
  );
}
