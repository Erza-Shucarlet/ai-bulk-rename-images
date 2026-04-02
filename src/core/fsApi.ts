import type { FileEntry } from '../types';

// Check if File System Access API is supported
export function checkFsApiSupport(): boolean {
  return typeof window !== 'undefined' && 'showDirectoryPicker' in window;
}

// Check if FileSystemFileHandle.move() is supported (Chrome 123+)
export function checkMoveSupport(): boolean {
  return typeof FileSystemFileHandle !== 'undefined' &&
    'move' in FileSystemFileHandle.prototype;
}

// Open a directory picker and return the list of files (direct children only, no recursion)
export async function pickDirectory(): Promise<{
  files: FileEntry[];
  dirName: string;
}> {
  // showDirectoryPicker typings may be incomplete in TS lib — cast to any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dirHandle: FileSystemDirectoryHandle = await (window as any).showDirectoryPicker({
    mode: 'readwrite', // write permission required for rename
  });

  const files: FileEntry[] = [];

  for await (const [name, handle] of (dirHandle as any).entries()) {
    if (handle.kind === 'file') {
      files.push({ name, handle: handle as FileSystemFileHandle });
    }
  }

  // Sort files alphabetically (natural order)
  files.sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true }));

  return { files, dirName: dirHandle.name };
}
