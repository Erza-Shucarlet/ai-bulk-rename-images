import type { SequenceRule as SequenceRuleType } from '../../types';
import { useRenameStore } from '../../store/useRenameStore';
import { useI18n } from '../../i18n';

interface Props {
  rule: SequenceRuleType;
}

export default function SequenceRule({ rule }: Props) {
  const { updateRule } = useRenameStore();
  const { t } = useI18n();

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-3 gap-2">
        <div>
          <label className="text-xs text-slate-500 mb-1 block">{t('startNumber')}</label>
          <input
            type="number"
            value={rule.start}
            min={0}
            onChange={(e) => updateRule(rule.id, { start: parseInt(e.target.value) || 0 })}
            className="w-full px-3 py-1.5 text-sm border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500/30"
          />
        </div>
        <div>
          <label className="text-xs text-slate-500 mb-1 block">{t('step')}</label>
          <input
            type="number"
            value={rule.step}
            min={1}
            onChange={(e) => updateRule(rule.id, { step: parseInt(e.target.value) || 1 })}
            className="w-full px-3 py-1.5 text-sm border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500/30"
          />
        </div>
        <div>
          <label className="text-xs text-slate-500 mb-1 block">{t('minDigits')}</label>
          <input
            type="number"
            value={rule.digits}
            min={1}
            max={10}
            onChange={(e) => updateRule(rule.id, { digits: parseInt(e.target.value) || 1 })}
            className="w-full px-3 py-1.5 text-sm border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500/30"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="text-xs text-slate-500 mb-1 block">{t('separator')}</label>
          <input
            type="text"
            value={rule.separator}
            maxLength={5}
            onChange={(e) => updateRule(rule.id, { separator: e.target.value })}
            placeholder="_"
            className="w-full px-3 py-1.5 text-sm border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500/30"
          />
        </div>
        <div>
          <label className="text-xs text-slate-500 mb-1 block">{t('position')}</label>
          <div className="flex gap-1.5">
            {(['prefix', 'suffix'] as const).map((pos) => (
              <button
                key={pos}
                onClick={() => updateRule(rule.id, { position: pos })}
                className={`flex-1 py-1.5 text-sm rounded-lg border transition-all ${
                  rule.position === pos
                    ? 'bg-blue-500 border-blue-500 text-white'
                    : 'border-slate-200 text-slate-600 hover:border-blue-300'
                }`}
              >
                {pos === 'prefix' ? t('seqPrefix') : t('seqSuffix')}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="text-xs text-slate-400 bg-slate-50 rounded-lg px-3 py-2">
        {t('example')}&nbsp;
        {rule.position === 'prefix'
          ? `${String(rule.start).padStart(rule.digits, '0')}${rule.separator}filename`
          : `filename${rule.separator}${String(rule.start).padStart(rule.digits, '0')}`
        },&nbsp;
        {rule.position === 'prefix'
          ? `${String(rule.start + rule.step).padStart(rule.digits, '0')}${rule.separator}filename`
          : `filename${rule.separator}${String(rule.start + rule.step).padStart(rule.digits, '0')}`
        }
        ...
      </div>
    </div>
  );
}
