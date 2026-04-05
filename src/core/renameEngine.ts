import type { Rule, ReplaceRule, CaseRule, SequenceRule, ExtensionRule } from '../types';

export interface ApplyResult {
  newBasename: string;
  newExt: string;
  error?: string;
}

// Rule engine: applies all rules sequentially to a filename (pipeline pattern)
export function applyRules(
  basename: string,
  ext: string,
  rules: Rule[],
  index: number
): ApplyResult {
  let currentBasename = basename;
  let currentExt = ext;
  let firstError: string | undefined;

  for (const rule of rules) {
    try {
      switch (rule.type) {
        case 'replace': {
          if (rule.includeExt) {
            // 对 basename+ext 整体替换，替换完后重新拆分
            const full = currentBasename + currentExt;
            const replaced = applyReplace(full, rule);
            // 重新拆分结果
            const dotIdx = replaced.lastIndexOf('.');
            if (dotIdx <= 0) {
              currentBasename = replaced;
              currentExt = '';
            } else {
              currentBasename = replaced.slice(0, dotIdx);
              currentExt = replaced.slice(dotIdx);
            }
          } else {
            currentBasename = applyReplace(currentBasename, rule);
          }
          break;
        }
        case 'prefix': {
          currentBasename = rule.value + currentBasename;
          break;
        }
        case 'suffix': {
          currentBasename = currentBasename + rule.value;
          break;
        }
        case 'case': {
          currentBasename = applyCase(currentBasename, rule);
          break;
        }
        case 'sequence': {
          const seqStr = applySequence(index, rule);
          if (rule.position === 'prefix') {
            currentBasename = seqStr + rule.separator + currentBasename;
          } else {
            currentBasename = currentBasename + rule.separator + seqStr;
          }
          break;
        }
        case 'extension': {
          currentExt = applyExtension(rule);
          break;
        }
      }
    } catch (e) {
      if (!firstError) {
        firstError = e instanceof Error ? e.message : 'Rule error';
      }
    }
  }

  return { newBasename: currentBasename, newExt: currentExt, error: firstError };
}

// Replace rule
function applyReplace(basename: string, rule: ReplaceRule): string {
  if (!rule.pattern) return basename;

  if (rule.useRegex) {
    const flags = rule.caseSensitive ? 'g' : 'gi';
    // If regex is invalid, throws here — caught by outer try/catch
    const regex = new RegExp(rule.pattern, flags);
    return basename.replace(regex, rule.replacement);
  } else {
    // Plain string replace (global)
    const escaped = rule.pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const flags = rule.caseSensitive ? 'g' : 'gi';
    const regex = new RegExp(escaped, flags);
    return basename.replace(regex, rule.replacement);
  }
}

// Case rule
function applyCase(basename: string, rule: CaseRule): string {
  switch (rule.mode) {
    case 'upper':
      return basename.toUpperCase();
    case 'lower':
      return basename.toLowerCase();
    case 'title':
      // Capitalize first letter of each word (split on space, hyphen, underscore, dot)
      return basename.replace(
        /(^|[\s\-_.])([a-zA-Z\u4e00-\u9fa5])/g,
        (_, sep, char) => sep + char.toUpperCase()
      );
  }
}

// Sequence rule: generate a padded number string from file index
function applySequence(index: number, rule: SequenceRule): string {
  const num = rule.start + index * rule.step;
  return String(num).padStart(rule.digits, '0');
}

// Extension rule: normalise to always start with "." or be empty
function applyExtension(rule: ExtensionRule): string {
  const ext = rule.newExt.trim();
  if (!ext) return '';
  return ext.startsWith('.') ? ext : '.' + ext;
}
