# AI Bulk Rename Images & Files

> Batch rename local files instantly in your browser — no login, no uploads, 100% private.

**Live site:** [ai-bulk-rename-images.com](https://ai-bulk-rename-images.com)

---

## Features

- **Batch rename** — apply multiple rules to hundreds of files at once
- **Rule types** — Find & Replace (regex), Add Prefix, Add Suffix, Change Case, Sequence Numbering, Change Extension
- **Live preview** — see new filenames before committing any changes
- **Conflict detection** — duplicate name conflicts are highlighted and skipped automatically
- **100% local** — all processing runs in-browser via the [File System Access API](https://developer.mozilla.org/en-US/docs/Web/API/File_System_API); no files ever leave your machine
- **Multilingual** — English / 中文 / Русский, auto-detected from browser language

## Browser Requirements

Requires a Chromium-based browser with File System Access API support:

| Browser | Minimum Version |
|---------|----------------|
| Google Chrome | 123+ |
| Microsoft Edge | 123+ |

Firefox and Safari are not supported (no filesystem write access).

## Tech Stack

- [React 19](https://react.dev) + [TypeScript](https://www.typescriptlang.org)
- [Vite 8](https://vite.dev) (build tool)
- [Tailwind CSS 3](https://tailwindcss.com)
- [Zustand](https://zustand-demo.pmnd.rs) (state management)
- [@dnd-kit](https://dndkit.com) (drag-and-drop rule reordering)
- Custom lightweight i18n (React Context, no external library)
- Deployed on [Cloudflare Pages](https://pages.cloudflare.com)

## Local Development

**Requirements:** Node.js 22+ (see `.nvmrc`)

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── ActionBar.tsx       # Apply rename / results summary
│   ├── BrowserGuard.tsx    # Unsupported browser fallback screen
│   ├── DropZone.tsx        # Folder picker
│   ├── PreviewTable.tsx    # Before/after filename table
│   ├── RulesPanel.tsx      # Rule list with drag-to-reorder
│   └── rules/
│       ├── CaseRule.tsx
│       ├── ExtensionRule.tsx
│       ├── PrefixSuffixRule.tsx
│       ├── ReplaceRule.tsx
│       └── SequenceRule.tsx
├── core/
│   ├── fsApi.ts            # File System Access API wrapper
│   └── renameEngine.ts     # Rule application logic
├── i18n/
│   └── index.tsx           # EN / ZH / RU translations + useI18n hook
├── store/
│   └── useRenameStore.ts   # Zustand global state
└── App.tsx
```

## Deployment

The project deploys automatically to Cloudflare Pages on every push to `main`.

Build settings:
- **Build command:** `npm run build`
- **Output directory:** `dist`
- **Node version:** `22` (pinned via `.nvmrc`)

## Changelog

See [CHANGELOG.md](./CHANGELOG.md).

## License

MIT
