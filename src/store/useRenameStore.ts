import { create } from 'zustand';
import { nanoid } from 'nanoid';
import type { FileEntry, Rule, RuleType, PreviewEntry, RenameResult } from '../types';
import { applyRules } from '../core/renameEngine';

// Split filename into basename and ext
function splitFilename(name: string): { basename: string; ext: string } {
  const dotIndex = name.lastIndexOf('.');
  if (dotIndex <= 0) return { basename: name, ext: '' };
  return { basename: name.slice(0, dotIndex), ext: name.slice(dotIndex) };
}

// Create a default rule object for a given type
function createDefaultRule(type: RuleType): Rule {
  const id = nanoid();
  switch (type) {
    case 'replace':
      return { id, type, pattern: '', replacement: '', useRegex: false, caseSensitive: false };
    case 'prefix':
      return { id, type, value: '' };
    case 'suffix':
      return { id, type, value: '' };
    case 'case':
      return { id, type, mode: 'lower' };
    case 'sequence':
      return { id, type, start: 1, step: 1, digits: 3, position: 'suffix', separator: '_' };
    case 'extension':
      return { id, type, newExt: '' };
  }
}

interface RenameStore {
  // State
  files: FileEntry[];
  dirName: string;
  rules: Rule[];
  previews: PreviewEntry[];
  isProcessing: boolean;
  progress: number;
  results: RenameResult[];

  // Actions
  setFiles: (files: FileEntry[], dirName: string) => void;
  addRule: (type: RuleType) => void;
  updateRule: (id: string, patch: Partial<Rule>) => void;
  removeRule: (id: string) => void;
  reorderRules: (fromIndex: number, toIndex: number) => void;
  computePreviews: () => void;
  executeRename: () => Promise<void>;
  reset: () => void;
  clearResults: () => void;
}

export const useRenameStore = create<RenameStore>((set, get) => ({
  files: [],
  dirName: '',
  rules: [],
  previews: [],
  isProcessing: false,
  progress: 0,
  results: [],

  setFiles: (files, dirName) => {
    set({ files, dirName, previews: [], results: [] });
    // Recompute previews after update
    setTimeout(() => get().computePreviews(), 0);
  },

  addRule: (type) => {
    const newRule = createDefaultRule(type);
    set((s) => ({ rules: [...s.rules, newRule] }));
    setTimeout(() => get().computePreviews(), 0);
  },

  updateRule: (id, patch) => {
    set((s) => ({
      rules: s.rules.map((r) => (r.id === id ? ({ ...r, ...patch } as Rule) : r)),
    }));
    setTimeout(() => get().computePreviews(), 0);
  },

  removeRule: (id) => {
    set((s) => ({ rules: s.rules.filter((r) => r.id !== id) }));
    setTimeout(() => get().computePreviews(), 0);
  },

  reorderRules: (fromIndex, toIndex) => {
    set((s) => {
      const rules = [...s.rules];
      const [moved] = rules.splice(fromIndex, 1);
      rules.splice(toIndex, 0, moved);
      return { rules };
    });
    setTimeout(() => get().computePreviews(), 0);
  },

  computePreviews: () => {
    const { files, rules } = get();
    if (files.length === 0) {
      set({ previews: [] });
      return;
    }

    // 先计算所有预览名（不含冲突检测）
    const rawPreviews = files.map((file, index) => {
      const { basename, ext } = splitFilename(file.name);
      try {
        const { newBasename, newExt, error } = applyRules(basename, ext, rules, index);
        const preview = newBasename + newExt;
        return {
          original: file.name,
          preview,
          handle: file.handle,
          conflict: false,
          error,
        };
      } catch (e) {
        return {
          original: file.name,
          preview: file.name,
          handle: file.handle,
          conflict: false,
          error: e instanceof Error ? e.message : 'Unknown error',
        };
      }
    });

    // 检测重名冲突
    const nameCount = new Map<string, number>();
    rawPreviews.forEach((p) => {
      nameCount.set(p.preview, (nameCount.get(p.preview) ?? 0) + 1);
    });

    const previews: PreviewEntry[] = rawPreviews.map((p) => ({
      ...p,
      conflict: !p.error && (nameCount.get(p.preview) ?? 0) > 1,
    }));

    set({ previews });
  },

  executeRename: async () => {
    const { previews } = get();
    const toRename = previews.filter((p) => !p.conflict && !p.error && p.original !== p.preview);

    if (toRename.length === 0) return;

    set({ isProcessing: true, progress: 0, results: [] });

    const results: RenameResult[] = [];
    for (let i = 0; i < toRename.length; i++) {
      const entry = toRename[i];
      try {
        // FileSystemFileHandle.move() — Chrome 123+
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        await (entry.handle as any).move(entry.preview);
        results.push({ original: entry.original, preview: entry.preview, success: true });
      } catch (e) {
        results.push({
          original: entry.original,
          preview: entry.preview,
          success: false,
          error: e instanceof Error ? e.message : 'Rename failed',
        });
      }
      set({ progress: Math.round(((i + 1) / toRename.length) * 100) });
    }

    set({ isProcessing: false, results });

    // After execution, update in-memory file list with renamed entries
    set((s) => {
      const successMap = new Map(
        results.filter((r) => r.success).map((r) => [r.original, r.preview])
      );
      const files = s.files.map((f) => {
        const newName = successMap.get(f.name);
        return newName ? { ...f, name: newName } : f;
      });
      return { files };
    });
    setTimeout(() => get().computePreviews(), 0);
  },

  reset: () => {
    set({ rules: [], previews: [], results: [] });
    setTimeout(() => get().computePreviews(), 0);
  },

  clearResults: () => set({ results: [] }),
}));
