import { useState } from 'react';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import type { DragEndEvent } from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { Rule, RuleType } from '../types';
import { useRenameStore } from '../store/useRenameStore';
import { useI18n } from '../i18n';
import ReplaceRule from './rules/ReplaceRule';
import PrefixSuffixRule from './rules/PrefixSuffixRule';
import CaseRule from './rules/CaseRule';
import SequenceRule from './rules/SequenceRule';
import ExtensionRule from './rules/ExtensionRule';

// 规则类型标签颜色
const ruleColors: Record<RuleType, string> = {
  replace: 'bg-purple-100 text-purple-700',
  prefix: 'bg-green-100 text-green-700',
  suffix: 'bg-teal-100 text-teal-700',
  case: 'bg-orange-100 text-orange-700',
  sequence: 'bg-blue-100 text-blue-700',
  extension: 'bg-rose-100 text-rose-700',
};

// 单条规则的可排序包装组件
function SortableRuleItem({ rule }: { rule: Rule }) {
  const { removeRule } = useRenameStore();
  const { t } = useI18n();
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: rule.id,
  });

  const ruleLabels: Record<RuleType, string> = {
    replace: t('ruleLabelReplace'),
    prefix: t('ruleLabelPrefix'),
    suffix: t('ruleLabelSuffix'),
    case: t('ruleLabelCase'),
    sequence: t('ruleLabelSequence'),
    extension: t('ruleLabelExtension'),
  };

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-white border border-slate-200 rounded-xl overflow-hidden"
    >
      {/* 规则头部 */}
      <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 border-b border-slate-100">
        {/* 拖拽手柄 */}
        <button
          {...attributes}
          {...listeners}
          className="flex-shrink-0 cursor-grab active:cursor-grabbing text-slate-300 hover:text-slate-500 p-0.5 rounded"
          title={t('dragToReorder')}
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M7 2a2 2 0 110 4 2 2 0 010-4zM13 2a2 2 0 110 4 2 2 0 010-4zM7 8a2 2 0 110 4 2 2 0 010-4zM13 8a2 2 0 110 4 2 2 0 010-4zM7 14a2 2 0 110 4 2 2 0 010-4zM13 14a2 2 0 110 4 2 2 0 010-4z" />
          </svg>
        </button>

        {/* 规则类型标签 */}
        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${ruleColors[rule.type]}`}>
          {ruleLabels[rule.type]}
        </span>

        {/* 删除按钮 */}
        <button
          onClick={() => removeRule(rule.id)}
          className="ml-auto flex-shrink-0 p-1 text-slate-300 hover:text-red-500 rounded transition-colors"
          title={t('removeRule')}
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* 规则内容 */}
      <div className="p-3">
        {rule.type === 'replace' && <ReplaceRule rule={rule} />}
        {(rule.type === 'prefix' || rule.type === 'suffix') && <PrefixSuffixRule rule={rule} />}
        {rule.type === 'case' && <CaseRule rule={rule} />}
        {rule.type === 'sequence' && <SequenceRule rule={rule} />}
        {rule.type === 'extension' && <ExtensionRule rule={rule} />}
      </div>
    </div>
  );
}

export default function RulesPanel() {
  const { rules, addRule, reorderRules } = useRenameStore();
  const { t } = useI18n();
  const [showDropdown, setShowDropdown] = useState(false);

  const sensors = useSensors(useSensor(PointerSensor));

  const ruleOptions = [
    { type: 'replace' as const, label: t('ruleOptReplaceLabel'), desc: t('ruleOptReplaceDesc') },
    { type: 'prefix' as const, label: t('ruleOptPrefixLabel'), desc: t('ruleOptPrefixDesc') },
    { type: 'suffix' as const, label: t('ruleOptSuffixLabel'), desc: t('ruleOptSuffixDesc') },
    { type: 'case' as const, label: t('ruleOptCaseLabel'), desc: t('ruleOptCaseDesc') },
    { type: 'sequence' as const, label: t('ruleOptSequenceLabel'), desc: t('ruleOptSequenceDesc') },
    { type: 'extension' as const, label: t('ruleOptExtensionLabel'), desc: t('ruleOptExtensionDesc') },
  ];

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const fromIndex = rules.findIndex((r) => r.id === active.id);
      const toIndex = rules.findIndex((r) => r.id === over.id);
      reorderRules(fromIndex, toIndex);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
          {t('renameRules')}
        </h2>
        <span className="text-xs text-slate-400">{t('rulesTopToBottom')}</span>
      </div>

      {/* 添加规则按钮 */}
      <div className="relative mb-4">
        <button
          onClick={() => setShowDropdown((v) => !v)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-lg transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          {t('addRule')}
          <svg className={`w-3.5 h-3.5 transition-transform ${showDropdown ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </button>

        {showDropdown && (
          <>
            <div className="fixed inset-0 z-10" onClick={() => setShowDropdown(false)} />
            <div className="absolute left-0 top-full mt-1 w-64 bg-white border border-slate-200 rounded-xl shadow-lg z-20 py-1 overflow-hidden">
              {ruleOptions.map((opt) => (
                <button
                  key={opt.type}
                  onClick={() => {
                    addRule(opt.type);
                    setShowDropdown(false);
                  }}
                  className="w-full px-4 py-2.5 text-left hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <span className={`text-xs px-1.5 py-0.5 rounded-full font-medium ${ruleColors[opt.type]}`}>
                      {opt.label}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">{opt.desc}</p>
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      {/* 规则列表 */}
      <div className="flex-1 overflow-y-auto space-y-2 min-h-0">
        {rules.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-32 text-center">
            <p className="text-sm text-slate-400">{t('noRulesYet')}</p>
            <p className="text-xs text-slate-300 mt-1">{t('clickToAddRule')}</p>
          </div>
        ) : (
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={rules.map((r) => r.id)} strategy={verticalListSortingStrategy}>
              {rules.map((rule) => (
                <SortableRuleItem key={rule.id} rule={rule} />
              ))}
            </SortableContext>
          </DndContext>
        )}
      </div>
    </div>
  );
}
