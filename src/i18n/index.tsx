import { createContext, useContext, useState, type ReactNode } from 'react';

// ── 翻译文本定义 ────────────────────────────────────────────────────────────────

const translations = {
  en: {
    // App
    appSubtitle: 'Batch rename local files in your browser',
    browserBadge: 'Chrome / Edge 123+ only',
    footer: 'All processing happens locally — no files are ever uploaded',
    // H1 for SEO
    h1: 'Bulk Rename Images & Files Instantly',

    // BrowserGuard
    browserNotSupported: 'Browser Not Supported',
    browserNotSupportedDesc: 'This tool is only available in Chromium-based browsers.',
    pleasUseOne: 'Please use one of these browsers:',
    chromeVersion: '',
    edgeVersion: '',
    browserNoSupport: 'Firefox, Safari, and other browsers do not support local filesystem write access',

    // DropZone
    folderLabel: 'Folder',
    files: 'files',
    reading: 'Reading...',
    changeFolder: 'Change Folder',
    selectFolder: 'Select Folder',
    grantAccess: 'Grant access to read file list',
    folderReadError: 'Failed to read folder. Please try again.',

    // RulesPanel
    renameRules: 'Rename Rules',
    rulesTopToBottom: 'Rules are applied top to bottom',
    addRule: 'Add Rule',
    dragToReorder: 'Drag to reorder',
    removeRule: 'Remove rule',
    noRulesYet: 'No rules yet',
    clickToAddRule: 'Click the button above to add a rule',
    // Rule type labels (short, for badges)
    ruleLabelReplace: 'Find & Replace',
    ruleLabelPrefix: 'Prefix',
    ruleLabelSuffix: 'Suffix',
    ruleLabelCase: 'Case',
    ruleLabelSequence: 'Sequence',
    ruleLabelExtension: 'Extension',
    // Rule options (for dropdown)
    ruleOptReplaceLabel: 'Find & Replace',
    ruleOptReplaceDesc: 'Replace or delete characters (supports regex)',
    ruleOptPrefixLabel: 'Add Prefix',
    ruleOptPrefixDesc: 'Prepend text to the filename',
    ruleOptSuffixLabel: 'Add Suffix',
    ruleOptSuffixDesc: 'Append text to the filename',
    ruleOptCaseLabel: 'Change Case',
    ruleOptCaseDesc: 'Convert to uppercase, lowercase, or title case',
    ruleOptSequenceLabel: 'Sequence',
    ruleOptSequenceDesc: 'Add numbering (001, 002...)',
    ruleOptExtensionLabel: 'Extension',
    ruleOptExtensionDesc: 'Change the file extension',

    // PreviewTable
    preview: 'Preview',
    willBeRenamed: 'will be renamed',
    nameConflict: 'name conflict',
    nameConflicts: 'name conflicts',
    ruleError: 'rule error',
    ruleErrors: 'rule errors',
    originalName: 'Original Name',
    newName: 'New Name',
    status: 'Status',
    selectFolderFirst: 'Select a folder to get started',
    errorLabel: 'Error',
    conflictLabel: 'Conflict',

    // ActionBar
    results: 'Results',
    succeeded: 'succeeded',
    failed: 'failed',
    renaming: 'Renaming...',
    resetRules: 'Reset Rules',
    conflictsWillBeSkipped: 'conflict(s) will be skipped',
    applyRename: 'Apply Rename',
    processing: 'Processing...',
    browserUpgradeAlert: 'Your browser version does not support the file rename API. Please upgrade to Chrome 123 or later.',

    // ReplaceRule
    findLabel: 'Find',
    regexPlaceholder: 'Regex pattern...',
    findPlaceholder: 'Text to find...',
    replaceLabel: 'Replace with (leave empty to delete)',
    replacePlaceholder: 'Replacement text...',
    invalidRegex: 'Invalid regex pattern',
    useRegex: 'Use Regex',
    caseSensitive: 'Case Sensitive',

    // PrefixSuffixRule
    prefixLabel: 'Add to the beginning of filename',
    suffixLabel: 'Add to the end of filename (before extension)',
    prefixPlaceholder: 'e.g. 2024_',
    suffixPlaceholder: 'e.g. _final',

    // CaseRule
    conversionMode: 'Conversion mode',
    caseLower: 'lowercase',
    caseUpper: 'UPPERCASE',
    caseTitle: 'Title Case',

    // SequenceRule
    startNumber: 'Start number',
    step: 'Step',
    minDigits: 'Min digits',
    separator: 'Separator',
    position: 'Position',
    seqPrefix: 'Prefix',
    seqSuffix: 'Suffix',
    example: 'Example:',

    // ExtensionRule
    newExtLabel: 'New extension (leave empty to remove extension)',
    newExtPlaceholder: 'e.g. jpg or .jpg',
  },

  zh: {
    // App
    appSubtitle: '本地批量文件重命名工具',
    browserBadge: '仅支持 Chrome / Edge 123+',
    footer: '文件处理完全在本地完成，不上传任何数据',
    h1: '批量重命名图片与文件',

    // BrowserGuard
    browserNotSupported: '浏览器不支持',
    browserNotSupportedDesc: '此工具仅在基于 Chromium 的浏览器中可用。',
    pleasUseOne: '请使用以下浏览器之一：',
    chromeVersion: '',
    edgeVersion: '',
    browserNoSupport: 'Firefox、Safari 及其他浏览器不支持本地文件系统写入访问',

    // DropZone
    folderLabel: '文件夹',
    files: '个文件',
    reading: '读取中...',
    changeFolder: '更换文件夹',
    selectFolder: '选择文件夹',
    grantAccess: '授权读取文件列表',
    folderReadError: '读取文件夹失败，请重试。',

    // RulesPanel
    renameRules: '重命名规则',
    rulesTopToBottom: '规则从上到下依次执行',
    addRule: '添加规则',
    dragToReorder: '拖拽排序',
    removeRule: '删除规则',
    noRulesYet: '暂无规则',
    clickToAddRule: '点击上方按钮添加规则',
    ruleLabelReplace: '查找替换',
    ruleLabelPrefix: '前缀',
    ruleLabelSuffix: '后缀',
    ruleLabelCase: '大小写',
    ruleLabelSequence: '序列化',
    ruleLabelExtension: '扩展名',
    ruleOptReplaceLabel: '查找替换',
    ruleOptReplaceDesc: '替换或删除字符（支持正则表达式）',
    ruleOptPrefixLabel: '添加前缀',
    ruleOptPrefixDesc: '在文件名开头添加文字',
    ruleOptSuffixLabel: '添加后缀',
    ruleOptSuffixDesc: '在文件名末尾添加文字',
    ruleOptCaseLabel: '大小写转换',
    ruleOptCaseDesc: '转换为大写、小写或首字母大写',
    ruleOptSequenceLabel: '序列化编号',
    ruleOptSequenceDesc: '添加编号（001, 002...）',
    ruleOptExtensionLabel: '修改扩展名',
    ruleOptExtensionDesc: '修改文件的扩展名',

    // PreviewTable
    preview: '预览',
    willBeRenamed: '将被重命名',
    nameConflict: '重名冲突',
    nameConflicts: '重名冲突',
    ruleError: '规则错误',
    ruleErrors: '规则错误',
    originalName: '原文件名',
    newName: '新文件名',
    status: '状态',
    selectFolderFirst: '请先选择文件夹',
    errorLabel: '错误',
    conflictLabel: '冲突',

    // ActionBar
    results: '执行结果',
    succeeded: '成功',
    failed: '失败',
    renaming: '正在重命名...',
    resetRules: '重置规则',
    conflictsWillBeSkipped: '个重名冲突将被跳过',
    applyRename: '确认执行',
    processing: '执行中...',
    browserUpgradeAlert: '您的浏览器版本不支持文件重命名 API，请升级至 Chrome 123 或更高版本。',

    // ReplaceRule
    findLabel: '查找',
    regexPlaceholder: '正则表达式...',
    findPlaceholder: '要查找的文本...',
    replaceLabel: '替换为（留空则删除）',
    replacePlaceholder: '替换文本...',
    invalidRegex: '无效的正则表达式',
    useRegex: '使用正则',
    caseSensitive: '区分大小写',

    // PrefixSuffixRule
    prefixLabel: '在文件名开头添加',
    suffixLabel: '在文件名末尾添加（扩展名之前）',
    prefixPlaceholder: '例如：2024_',
    suffixPlaceholder: '例如：_final',

    // CaseRule
    conversionMode: '转换模式',
    caseLower: '全小写',
    caseUpper: '全大写',
    caseTitle: '首字母大写',

    // SequenceRule
    startNumber: '起始数字',
    step: '步长',
    minDigits: '最小位数',
    separator: '分隔符',
    position: '位置',
    seqPrefix: '前缀',
    seqSuffix: '后缀',
    example: '示例：',

    // ExtensionRule
    newExtLabel: '新扩展名（留空则删除扩展名）',
    newExtPlaceholder: '例如：jpg 或 .jpg',
  },

  ru: {
    // App
    appSubtitle: 'Пакетное переименование файлов прямо в браузере',
    browserBadge: 'Только Chrome / Edge 123+',
    footer: 'Все операции выполняются локально — файлы никуда не загружаются',
    h1: 'Массовое переименование файлов и изображений',

    // BrowserGuard
    browserNotSupported: 'Браузер не поддерживается',
    browserNotSupportedDesc: 'Этот инструмент доступен только в браузерах на основе Chromium.',
    pleasUseOne: 'Пожалуйста, используйте один из этих браузеров:',
    chromeVersion: '',
    edgeVersion: '',
    browserNoSupport: 'Firefox, Safari и другие браузеры не поддерживают запись в локальную файловую систему',

    // DropZone
    folderLabel: 'Папка',
    files: 'файлов',
    reading: 'Загрузка...',
    changeFolder: 'Сменить папку',
    selectFolder: 'Выбрать папку',
    grantAccess: 'Разрешить доступ к списку файлов',
    folderReadError: 'Не удалось прочитать папку. Попробуйте ещё раз.',

    // RulesPanel
    renameRules: 'Правила переименования',
    rulesTopToBottom: 'Правила применяются сверху вниз',
    addRule: 'Добавить правило',
    dragToReorder: 'Перетащить для сортировки',
    removeRule: 'Удалить правило',
    noRulesYet: 'Правил нет',
    clickToAddRule: 'Нажмите кнопку выше, чтобы добавить правило',
    ruleLabelReplace: 'Найти и заменить',
    ruleLabelPrefix: 'Префикс',
    ruleLabelSuffix: 'Суффикс',
    ruleLabelCase: 'Регистр',
    ruleLabelSequence: 'Нумерация',
    ruleLabelExtension: 'Расширение',
    ruleOptReplaceLabel: 'Найти и заменить',
    ruleOptReplaceDesc: 'Замена или удаление символов (поддерживает regex)',
    ruleOptPrefixLabel: 'Добавить префикс',
    ruleOptPrefixDesc: 'Добавить текст в начало имени файла',
    ruleOptSuffixLabel: 'Добавить суффикс',
    ruleOptSuffixDesc: 'Добавить текст в конец имени файла',
    ruleOptCaseLabel: 'Изменить регистр',
    ruleOptCaseDesc: 'Преобразовать в верхний, нижний или заглавный регистр',
    ruleOptSequenceLabel: 'Нумерация',
    ruleOptSequenceDesc: 'Добавить нумерацию (001, 002...)',
    ruleOptExtensionLabel: 'Расширение',
    ruleOptExtensionDesc: 'Изменить расширение файла',

    // PreviewTable
    preview: 'Предпросмотр',
    willBeRenamed: 'будет переименовано',
    nameConflict: 'конфликт имён',
    nameConflicts: 'конфликта имён',
    ruleError: 'ошибка правила',
    ruleErrors: 'ошибки правил',
    originalName: 'Исходное имя',
    newName: 'Новое имя',
    status: 'Статус',
    selectFolderFirst: 'Выберите папку для начала работы',
    errorLabel: 'Ошибка',
    conflictLabel: 'Конфликт',

    // ActionBar
    results: 'Результаты',
    succeeded: 'успешно',
    failed: 'ошибок',
    renaming: 'Переименование...',
    resetRules: 'Сбросить правила',
    conflictsWillBeSkipped: 'конфликт(ов) будет пропущено',
    applyRename: 'Применить',
    processing: 'Обработка...',
    browserUpgradeAlert: 'Ваш браузер не поддерживает API переименования файлов. Обновите Chrome до версии 123 или выше.',

    // ReplaceRule
    findLabel: 'Найти',
    regexPlaceholder: 'Regex-шаблон...',
    findPlaceholder: 'Текст для поиска...',
    replaceLabel: 'Заменить на (оставьте пустым для удаления)',
    replacePlaceholder: 'Текст замены...',
    invalidRegex: 'Некорректный regex-шаблон',
    useRegex: 'Использовать Regex',
    caseSensitive: 'Учитывать регистр',

    // PrefixSuffixRule
    prefixLabel: 'Добавить в начало имени файла',
    suffixLabel: 'Добавить в конец имени файла (перед расширением)',
    prefixPlaceholder: 'Напр. 2024_',
    suffixPlaceholder: 'Напр. _final',

    // CaseRule
    conversionMode: 'Режим преобразования',
    caseLower: 'нижний',
    caseUpper: 'ВЕРХНИЙ',
    caseTitle: 'Заглавный',

    // SequenceRule
    startNumber: 'Начальный номер',
    step: 'Шаг',
    minDigits: 'Мин. цифр',
    separator: 'Разделитель',
    position: 'Позиция',
    seqPrefix: 'Префикс',
    seqSuffix: 'Суффикс',
    example: 'Пример:',

    // ExtensionRule
    newExtLabel: 'Новое расширение (оставьте пустым для удаления)',
    newExtPlaceholder: 'Напр. jpg или .jpg',
  },
} as const;

export type Lang = keyof typeof translations;
export type TranslationKeys = keyof typeof translations.en;

// 根据浏览器语言自动匹配支持的语言，默认英文
function detectLang(): Lang {
  const raw = navigator.language || 'en';
  if (raw.startsWith('zh')) return 'zh';
  if (raw.startsWith('ru')) return 'ru';
  return 'en';
}

// ── Context ─────────────────────────────────────────────────────────────────

interface I18nContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: TranslationKeys) => string;
}

const I18nContext = createContext<I18nContextValue | null>(null);

// ── Provider ─────────────────────────────────────────────────────────────────

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(detectLang);

  const t = (key: TranslationKeys): string => translations[lang][key];

  return (
    <I18nContext.Provider value={{ lang, setLang, t }}>
      {children}
    </I18nContext.Provider>
  );
}

// ── Hook ─────────────────────────────────────────────────────────────────────

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used within I18nProvider');
  return ctx;
}
