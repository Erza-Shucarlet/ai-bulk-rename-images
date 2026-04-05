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
      return { id, type, pattern: '', replacement: '', useRegex: false, caseSensitive: false, includeExt: false };
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

// 撤销历史条目
export interface UndoEntry {
  handle: FileSystemFileHandle;
  oldName: string;
  newName: string;
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
  // 选中文件名集合，null 表示全选（默认）
  selectedFiles: Set<string> | null;
  // 撤销历史（最后一次执行）
  undoHistory: UndoEntry[];

  // Actions
  setFiles: (files: FileEntry[], dirName: string) => void;
  addRule: (type: RuleType) => void;
  updateRule: (id: string, patch: Partial<Rule>) => void;
  removeRule: (id: string) => void;
  reorderRules: (fromIndex: number, toIndex: number) => void;
  computePreviews: () => void;
  executeRename: () => Promise<void>;
  undoRename: () => Promise<void>;
  reset: () => void;
  clearResults: () => void;
  toggleFileSelection: (name: string) => void;
  toggleSelectAll: () => void;
}

export const useRenameStore = create<RenameStore>((set, get) => ({
  files: [],
  dirName: '',
  rules: [],
  previews: [],
  isProcessing: false,
  progress: 0,
  results: [],
  selectedFiles: null, // null = 全选
  undoHistory: [],

  setFiles: (files, dirName) => {
    set({ files, dirName, previews: [], results: [], selectedFiles: null, undoHistory: [] });
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
    const { files, rules, selectedFiles } = get();
    if (files.length === 0) {
      set({ previews: [] });
      return;
    }

    // null = 全选；否则只处理集合内的文件
    const isSelected = (name: string) => selectedFiles === null || selectedFiles.has(name);

    // 先计算所有预览名（不含冲突检测）
    // 序列规则按选中文件的相对顺序编号
    let ruleIndex = 0;
    const rawPreviews = files.map((file) => {
      const { basename, ext } = splitFilename(file.name);
      if (!isSelected(file.name)) {
        return {
          original: file.name,
          preview: file.name,
          handle: file.handle,
          conflict: false,
          skipped: true,
        };
      }
      const idx = ruleIndex++;
      try {
        const { newBasename, newExt, error } = applyRules(basename, ext, rules, idx);
        const preview = newBasename + newExt;
        return {
          original: file.name,
          preview,
          handle: file.handle,
          conflict: false,
          error,
          skipped: false,
        };
      } catch (e) {
        return {
          original: file.name,
          preview: file.name,
          handle: file.handle,
          conflict: false,
          error: e instanceof Error ? e.message : 'Unknown error',
          skipped: false,
        };
      }
    });

    // 检测重名冲突（只在选中文件之间检测）
    const nameCount = new Map<string, number>();
    rawPreviews.forEach((p) => {
      if (!p.skipped) {
        nameCount.set(p.preview, (nameCount.get(p.preview) ?? 0) + 1);
      }
    });

    const previews: PreviewEntry[] = rawPreviews.map((p) => ({
      ...p,
      conflict: !p.error && !p.skipped && (nameCount.get(p.preview) ?? 0) > 1,
    }));

    set({ previews });
  },

  executeRename: async () => {
    const { previews } = get();
    const toRename = previews.filter((p) => !p.conflict && !p.error && p.original !== p.preview);

    if (toRename.length === 0) return;

    set({ isProcessing: true, progress: 0, results: [] });

    const results: RenameResult[] = [];
    const undoHistory: UndoEntry[] = [];

    for (let i = 0; i < toRename.length; i++) {
      const entry = toRename[i];
      try {
        // FileSystemFileHandle.move() — Chrome 123+
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        await (entry.handle as any).move(entry.preview);
        results.push({ original: entry.original, preview: entry.preview, success: true });
        undoHistory.push({ handle: entry.handle, oldName: entry.original, newName: entry.preview });
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

    set({ isProcessing: false, results, undoHistory });

    // 执行后更新内存中的文件列表
    set((s) => {
      const successMap = new Map(
        results.filter((r) => r.success).map((r) => [r.original, r.preview])
      );
      const files = s.files.map((f) => {
        const newName = successMap.get(f.name);
        return newName ? { ...f, name: newName } : f;
      });
      // 同步更新 selectedFiles 中的文件名
      let selectedFiles = s.selectedFiles;
      if (selectedFiles !== null) {
        const next = new Set<string>();
        selectedFiles.forEach((name) => {
          next.add(successMap.get(name) ?? name);
        });
        selectedFiles = next;
      }
      return { files, selectedFiles };
    });
    setTimeout(() => get().computePreviews(), 0);
  },

  undoRename: async () => {
    const { undoHistory } = get();
    if (undoHistory.length === 0) return;

    set({ isProcessing: true, progress: 0 });

    const results: RenameResult[] = [];
    for (let i = 0; i < undoHistory.length; i++) {
      const entry = undoHistory[i];
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        await (entry.handle as any).move(entry.oldName);
        results.push({ original: entry.newName, preview: entry.oldName, success: true });
      } catch (e) {
        results.push({
          original: entry.newName,
          preview: entry.oldName,
          success: false,
          error: e instanceof Error ? e.message : 'Undo failed',
        });
      }
      set({ progress: Math.round(((i + 1) / undoHistory.length) * 100) });
    }

    set({ isProcessing: false, results, undoHistory: [] });

    // 恢复内存文件名
    set((s) => {
      const restoreMap = new Map(
        results.filter((r) => r.success).map((r) => [r.original, r.preview])
      );
      const files = s.files.map((f) => {
        const restored = restoreMap.get(f.name);
        return restored ? { ...f, name: restored } : f;
      });
      let selectedFiles = s.selectedFiles;
      if (selectedFiles !== null) {
        const next = new Set<string>();
        selectedFiles.forEach((name) => {
          next.add(restoreMap.get(name) ?? name);
        });
        selectedFiles = next;
      }
      return { files, selectedFiles };
    });
    setTimeout(() => get().computePreviews(), 0);
  },

  reset: () => {
    set({ rules: [], previews: [], results: [], selectedFiles: null, undoHistory: [] });
    setTimeout(() => get().computePreviews(), 0);
  },

  clearResults: () => set({ results: [] }),

  toggleFileSelection: (name) => {
    set((s) => {
      if (s.selectedFiles === null) {
        // 当前全选，点击某个文件 = 取消选中它（其余仍选中）
        const next = new Set(s.files.map((f) => f.name));
        next.delete(name);
        // 全都被选中 = null（理论上此分支不会出现，但加上保险）
        if (next.size === s.files.length) return { selectedFiles: null };
        return { selectedFiles: next };
      }
      const next = new Set(s.selectedFiles);
      if (next.has(name)) {
        next.delete(name);
      } else {
        next.add(name);
        // 若已全部选中，恢复为 null
        if (next.size === s.files.length) return { selectedFiles: null };
      }
      return { selectedFiles: next };
    });
    setTimeout(() => get().computePreviews(), 0);
  },

  toggleSelectAll: () => {
    set((s) => {
      if (s.selectedFiles === null) {
        // 当前全选 → 全不选
        return { selectedFiles: new Set<string>() };
      }
      // 当前部分选/全不选 → 全选
      return { selectedFiles: null };
    });
    setTimeout(() => get().computePreviews(), 0);
  },
}));
