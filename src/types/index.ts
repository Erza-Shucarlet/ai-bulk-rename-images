// File entry (populated after reading a directory)
export interface FileEntry {
  name: string;
  handle: FileSystemFileHandle;
}

// Supported rule types
export type RuleType = 'replace' | 'prefix' | 'suffix' | 'case' | 'sequence' | 'extension';

// Individual rule data types
export interface ReplaceRule {
  id: string;
  type: 'replace';
  pattern: string;
  replacement: string;
  useRegex: boolean;
  caseSensitive: boolean;
  includeExt: boolean;
}

export interface PrefixRule {
  id: string;
  type: 'prefix';
  value: string;
}

export interface SuffixRule {
  id: string;
  type: 'suffix';
  value: string;
}

export interface CaseRule {
  id: string;
  type: 'case';
  mode: 'upper' | 'lower' | 'title';
}

export interface SequenceRule {
  id: string;
  type: 'sequence';
  start: number;
  step: number;
  digits: number;
  position: 'prefix' | 'suffix';
  separator: string;
}

export interface ExtensionRule {
  id: string;
  type: 'extension';
  newExt: string;
}

export type Rule =
  | ReplaceRule
  | PrefixRule
  | SuffixRule
  | CaseRule
  | SequenceRule
  | ExtensionRule;

// Preview entry (original filename + computed new filename)
export interface PreviewEntry {
  original: string;    // Original filename (with extension)
  preview: string;     // Preview new filename (with extension)
  handle: FileSystemFileHandle;
  conflict: boolean;   // True if this new name collides with another file
  error?: string;      // Rule computation error (e.g. invalid regex)
  skipped?: boolean;   // True if this file was not selected (excluded from rename)
}

// Rename execution result
export interface RenameResult {
  original: string;
  preview: string;
  success: boolean;
  error?: string;
}
