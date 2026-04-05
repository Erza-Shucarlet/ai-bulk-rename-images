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
    heroDesc: 'The fastest way to bulk rename images and rename files directly in your browser — no uploads, no login, no installation. Select a folder, build your rename rules, and rename images or files in seconds.',

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
    selectFolder: 'Select a Folder to Start',
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
    selected: 'selected',
    toggleSelectAll: 'Select / Deselect All',

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
    undo: 'Undo',
    undoDesc: 'Revert the last rename operation',

    // ReplaceRule
    findLabel: 'Find',
    regexPlaceholder: 'Regex pattern...',
    findPlaceholder: 'Text to find...',
    replaceLabel: 'Replace with (leave empty to delete)',
    replacePlaceholder: 'Replacement text...',
    invalidRegex: 'Invalid regex pattern',
    useRegex: 'Use Regex',
    caseSensitive: 'Case Sensitive',
    includeExt: 'Include Extension',

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

    // Footer
    privacyPolicy: 'Privacy Policy',
    contactWebmaster: 'Contact',

    // Privacy Policy page
    privacyTitle: 'Privacy Policy',
    privacyLastUpdated: 'Last updated: April 2, 2026',
    privacyIntroTitle: 'Overview',
    privacyIntroText: 'AI Bulk Rename Images & Files ("the Service") is a browser-based file renaming tool. This policy explains how we handle your data.',
    privacyDataTitle: 'Data We Do NOT Collect',
    privacyDataText: 'We do not collect, transmit, or store any of your files or filenames. All file operations are performed entirely within your browser using the File System Access API. Your files never leave your device.',
    privacyLocalTitle: 'Local Processing Only',
    privacyLocalText: 'The Service runs entirely client-side. No file content, metadata, or rename operations are sent to any server.',
    privacyAdsTitle: 'Advertising',
    privacyAdsText: 'This site uses Google AdSense to display advertisements. Google may use cookies and collect anonymized usage data to serve relevant ads. Please refer to Google\'s Privacy Policy for details.',
    privacyAnalyticsTitle: 'Analytics',
    privacyAnalyticsText: 'We may use anonymized analytics (e.g. page view counts via Cloudflare) to understand overall traffic. No personally identifiable information is collected.',
    privacyCookiesTitle: 'Cookies',
    privacyCookiesText: 'The Service itself does not set any cookies. Third-party services (Google AdSense) may set cookies for ad personalization.',
    privacyContactTitle: 'Contact',
    privacyContactText: 'If you have any questions about this Privacy Policy, please open an issue on our GitHub repository.',
    privacyBackHome: '← Back to Home',

    // InfoSection
    infoWhatTitle: 'What is BulkRenameImages?',
    infoWhatText: 'BulkRenameImages is a free online tool to bulk rename images and rename files instantly in your browser. Whether you need to rename images with sequential numbering, rename files using find-and-replace, add prefixes or suffixes, or change file extensions across hundreds of files at once — BulkRenameImages handles it all. No login, no file uploads, and no installation required. Your files never leave your device.',
    infoAdvTitle: 'Advantages of BulkRenameImages',
    infoAdv1: '100% Local & Private — Files never leave your device. All operations run entirely in your browser.',
    infoAdv2: 'No Login Required — Start renaming immediately without creating an account.',
    infoAdv3: 'Powerful Rename Rules — Bulk rename images and files with Find & Replace (regex), Prefix/Suffix, Case conversion, Sequence Numbering, and Extension change.',
    infoAdv4: 'Real-Time Preview — See exactly how your files will be renamed before applying any changes.',
    infoAdv5: 'Drag-to-Reorder Rules — Stack and reorder multiple rules to build complex rename workflows.',
    infoAdv6: 'Multilingual Interface — Available in English, Chinese, and Russian.',
    infoFaqTitle: 'Frequently Asked Questions',
    infoFaq1Q: 'Which browsers are supported?',
    infoFaq1A: 'Chrome 123+ and Microsoft Edge 123+. The tool requires the File System Access API which is only available in Chromium-based browsers.',
    infoFaq2Q: 'Is it safe to use?',
    infoFaq2A: 'Absolutely. All file processing happens locally in your browser. No files, filenames, or any data are ever uploaded to a server.',
    infoFaq3Q: 'Can I use it to rename files other than images?',
    infoFaq3A: 'Yes! While the name highlights bulk rename images, the tool works equally well to rename files of any type — documents, videos, audio files, PDFs, and more. Any file in a folder can be renamed.',
    infoFaq4Q: 'Is there a limit on the number of files?',
    infoFaq4A: 'There is no hard limit. Performance depends on your browser and device, but it handles hundreds of files with ease.',
    infoFaq5Q: 'Is it free to bulk rename images and files?',
    infoFaq5A: 'Yes, completely free to use with no hidden fees or subscriptions. Bulk rename images, rename files, and manage your whole folder at no cost.',
  },

  zh: {
    // App
    appSubtitle: '本地批量文件重命名工具',
    browserBadge: '仅支持 Chrome / Edge 123+',
    footer: '文件处理完全在本地完成，不上传任何数据',
    h1: '批量重命名图片与文件',
    heroDesc: '免费、保护隐私的浏览器端批量重命名工具，无需上传文件、无需登录、无需安装。选择文件夹，配置规则，一键完成。',

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
    selectFolder: '选择文件夹以开始',
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
    selected: '已选中',
    toggleSelectAll: '全选 / 取消全选',

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
    undo: '撤销',
    undoDesc: '撤销上次重命名操作',

    // ReplaceRule
    findLabel: '查找',
    regexPlaceholder: '正则表达式...',
    findPlaceholder: '要查找的文本...',
    replaceLabel: '替换为（留空则删除）',
    replacePlaceholder: '替换文本...',
    invalidRegex: '无效的正则表达式',
    useRegex: '使用正则',
    caseSensitive: '区分大小写',
    includeExt: '包含扩展名',

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

    // Footer
    privacyPolicy: '隐私政策',
    contactWebmaster: '联系站长',

    // Privacy Policy page
    privacyTitle: '隐私政策',
    privacyLastUpdated: '最后更新：2026年4月2日',
    privacyIntroTitle: '概述',
    privacyIntroText: 'AI Bulk Rename Images & Files（以下简称"本服务"）是一款基于浏览器的文件批量重命名工具。本政策说明我们如何处理您的数据。',
    privacyDataTitle: '我们不收集的数据',
    privacyDataText: '我们不收集、传输或存储您的任何文件或文件名。所有文件操作完全在您的浏览器内通过 File System Access API 完成，您的文件永远不会离开您的设备。',
    privacyLocalTitle: '纯本地处理',
    privacyLocalText: '本服务完全在客户端运行。不会将任何文件内容、元数据或重命名操作发送到任何服务器。',
    privacyAdsTitle: '广告',
    privacyAdsText: '本网站使用 Google AdSense 展示广告。Google 可能会使用 Cookie 并收集匿名使用数据以投放相关广告，详情请参阅 Google 隐私政策。',
    privacyAnalyticsTitle: '统计分析',
    privacyAnalyticsText: '我们可能通过 Cloudflare 等服务收集匿名统计数据（如页面访问量）以了解整体流量，不收集任何个人身份信息。',
    privacyCookiesTitle: 'Cookie',
    privacyCookiesText: '本服务本身不设置任何 Cookie。第三方服务（Google AdSense）可能会为广告个性化设置 Cookie。',
    privacyContactTitle: '联系方式',
    privacyContactText: '如果您对本隐私政策有任何疑问，请在我们的 GitHub 仓库提交 Issue。',
    privacyBackHome: '← 返回首页',

    // InfoSection
    infoWhatTitle: 'BulkRenameImages 是什么？',
    infoWhatText: 'BulkRenameImages 是一款免费的浏览器端文件批量重命名工具，无需登录、无需上传文件、无需安装任何软件，即可在浏览器中即时批量重命名图片和文件。它借助浏览器内置的 File System Access API，直接在您的设备上完成所有操作。',
    infoAdvTitle: 'BulkRenameImages 的优势',
    infoAdv1: '完全本地化，保护隐私 — 文件永远不会离开您的设备，所有操作均在浏览器内完成。',
    infoAdv2: '无需注册登录 — 打开即用，无需创建账户。',
    infoAdv3: '强大的重命名规则 — 支持查找替换（含正则）、添加前后缀、大小写转换、序列化编号、修改扩展名。',
    infoAdv4: '实时预览 — 执行前可预览每个文件的重命名结果，避免误操作。',
    infoAdv5: '拖拽调整规则顺序 — 多条规则自由叠加，构建复杂的批量重命名流程。',
    infoAdv6: '多语言界面 — 支持英文、中文和俄文。',
    infoFaqTitle: '常见问题',
    infoFaq1Q: '支持哪些浏览器？',
    infoFaq1A: 'Chrome 123+ 和 Microsoft Edge 123+。此工具依赖 File System Access API，目前仅 Chromium 内核浏览器支持。',
    infoFaq2Q: '使用安全吗？',
    infoFaq2A: '非常安全。所有文件处理均在本地浏览器内完成，文件名和文件内容不会上传到任何服务器。',
    infoFaq3Q: '只能重命名图片吗？',
    infoFaq3A: '不是。虽然名称中含有"图片"，但本工具支持任意文件类型，包括文档、视频、音频等。',
    infoFaq4Q: '文件数量有限制吗？',
    infoFaq4A: '没有硬性限制，处理能力取决于您的浏览器和设备性能，通常可轻松处理数百个文件。',
    infoFaq5Q: '需要付费吗？',
    infoFaq5A: '完全免费，无任何隐藏费用。',
  },

  'zh-TW': {
    // App
    appSubtitle: '本機批次檔案重新命名工具',
    browserBadge: '僅支援 Chrome / Edge 123+',
    footer: '檔案處理完全在本機完成，不上傳任何資料',
    h1: '批次重新命名圖片與檔案',
    heroDesc: '免費、保護隱私的瀏覽器端批次重新命名工具，無需上傳檔案、無需登入、無需安裝。選擇資料夾，設定規則，一鍵完成。',

    // BrowserGuard
    browserNotSupported: '瀏覽器不支援',
    browserNotSupportedDesc: '此工具僅在基於 Chromium 的瀏覽器中可用。',
    pleasUseOne: '請使用以下其中一款瀏覽器：',
    chromeVersion: '',
    edgeVersion: '',
    browserNoSupport: 'Firefox、Safari 及其他瀏覽器不支援本機檔案系統寫入存取',

    // DropZone
    folderLabel: '資料夾',
    files: '個檔案',
    reading: '讀取中...',
    changeFolder: '更換資料夾',
    selectFolder: '選擇資料夾以開始',
    grantAccess: '授權讀取檔案清單',
    folderReadError: '讀取資料夾失敗，請重試。',

    // RulesPanel
    renameRules: '重新命名規則',
    rulesTopToBottom: '規則從上到下依序執行',
    addRule: '新增規則',
    dragToReorder: '拖曳排序',
    removeRule: '刪除規則',
    noRulesYet: '尚無規則',
    clickToAddRule: '點擊上方按鈕新增規則',
    ruleLabelReplace: '尋找取代',
    ruleLabelPrefix: '前綴',
    ruleLabelSuffix: '後綴',
    ruleLabelCase: '大小寫',
    ruleLabelSequence: '序列化',
    ruleLabelExtension: '副檔名',
    ruleOptReplaceLabel: '尋找取代',
    ruleOptReplaceDesc: '取代或刪除字元（支援正規表示式）',
    ruleOptPrefixLabel: '新增前綴',
    ruleOptPrefixDesc: '在檔名開頭新增文字',
    ruleOptSuffixLabel: '新增後綴',
    ruleOptSuffixDesc: '在檔名結尾新增文字',
    ruleOptCaseLabel: '大小寫轉換',
    ruleOptCaseDesc: '轉換為大寫、小寫或首字母大寫',
    ruleOptSequenceLabel: '序列化編號',
    ruleOptSequenceDesc: '新增編號（001, 002...）',
    ruleOptExtensionLabel: '修改副檔名',
    ruleOptExtensionDesc: '修改檔案的副檔名',

    // PreviewTable
    preview: '預覽',
    willBeRenamed: '將被重新命名',
    nameConflict: '重名衝突',
    nameConflicts: '重名衝突',
    ruleError: '規則錯誤',
    ruleErrors: '規則錯誤',
    originalName: '原始檔名',
    newName: '新檔名',
    status: '狀態',
    selectFolderFirst: '請先選擇資料夾',
    errorLabel: '錯誤',
    conflictLabel: '衝突',
    selected: '已選取',
    toggleSelectAll: '全選 / 取消全選',

    // ActionBar
    results: '執行結果',
    succeeded: '成功',
    failed: '失敗',
    renaming: '重新命名中...',
    resetRules: '重置規則',
    conflictsWillBeSkipped: '個重名衝突將被略過',
    applyRename: '確認執行',
    processing: '執行中...',
    browserUpgradeAlert: '您的瀏覽器版本不支援檔案重新命名 API，請升級至 Chrome 123 或更高版本。',
    undo: '復原',
    undoDesc: '復原上次重新命名操作',

    // ReplaceRule
    findLabel: '尋找',
    regexPlaceholder: '正規表示式...',
    findPlaceholder: '要尋找的文字...',
    replaceLabel: '取代為（留空則刪除）',
    replacePlaceholder: '取代文字...',
    invalidRegex: '無效的正規表示式',
    useRegex: '使用正規表示式',
    caseSensitive: '區分大小寫',
    includeExt: '包含副檔名',

    // PrefixSuffixRule
    prefixLabel: '在檔名開頭新增',
    suffixLabel: '在檔名結尾新增（副檔名之前）',
    prefixPlaceholder: '例如：2024_',
    suffixPlaceholder: '例如：_final',

    // CaseRule
    conversionMode: '轉換模式',
    caseLower: '全小寫',
    caseUpper: '全大寫',
    caseTitle: '首字母大寫',

    // SequenceRule
    startNumber: '起始數字',
    step: '步長',
    minDigits: '最小位數',
    separator: '分隔符',
    position: '位置',
    seqPrefix: '前綴',
    seqSuffix: '後綴',
    example: '範例：',

    // ExtensionRule
    newExtLabel: '新副檔名（留空則移除副檔名）',
    newExtPlaceholder: '例如：jpg 或 .jpg',

    // Footer
    privacyPolicy: '隱私權政策',
    contactWebmaster: '聯絡站長',

    // Privacy Policy page
    privacyTitle: '隱私權政策',
    privacyLastUpdated: '最後更新：2026年4月2日',
    privacyIntroTitle: '概述',
    privacyIntroText: 'AI Bulk Rename Images & Files（以下簡稱「本服務」）是一款基於瀏覽器的檔案批次重新命名工具。本政策說明我們如何處理您的資料。',
    privacyDataTitle: '我們不收集的資料',
    privacyDataText: '我們不收集、傳輸或儲存您的任何檔案或檔名。所有檔案操作完全在您的瀏覽器內透過 File System Access API 完成，您的檔案永遠不會離開您的裝置。',
    privacyLocalTitle: '純本機處理',
    privacyLocalText: '本服務完全在用戶端執行。不會將任何檔案內容、中繼資料或重新命名操作傳送至任何伺服器。',
    privacyAdsTitle: '廣告',
    privacyAdsText: '本網站使用 Google AdSense 展示廣告。Google 可能會使用 Cookie 並收集匿名使用資料以投放相關廣告，詳情請參閱 Google 隱私權政策。',
    privacyAnalyticsTitle: '統計分析',
    privacyAnalyticsText: '我們可能透過 Cloudflare 等服務收集匿名統計資料（如頁面瀏覽量）以了解整體流量，不收集任何個人身分識別資訊。',
    privacyCookiesTitle: 'Cookie',
    privacyCookiesText: '本服務本身不設定任何 Cookie。第三方服務（Google AdSense）可能會為廣告個人化設定 Cookie。',
    privacyContactTitle: '聯絡方式',
    privacyContactText: '如果您對本隱私權政策有任何疑問，請在我們的 GitHub 儲存庫提交 Issue。',
    privacyBackHome: '← 返回首頁',

    // InfoSection
    infoWhatTitle: 'BulkRenameImages 是什麼？',
    infoWhatText: 'BulkRenameImages 是一款免費的瀏覽器端檔案批次重新命名工具，無需登入、無需上傳檔案、無需安裝任何軟體，即可在瀏覽器中即時批次重新命名圖片和檔案。它借助瀏覽器內建的 File System Access API，直接在您的裝置上完成所有操作。',
    infoAdvTitle: 'BulkRenameImages 的優勢',
    infoAdv1: '完全本機化，保護隱私 — 檔案永遠不會離開您的裝置，所有操作均在瀏覽器內完成。',
    infoAdv2: '無需註冊登入 — 開啟即用，無需建立帳號。',
    infoAdv3: '強大的重新命名規則 — 支援尋找取代（含正規表示式）、新增前後綴、大小寫轉換、序列化編號、修改副檔名。',
    infoAdv4: '即時預覽 — 執行前可預覽每個檔案的重新命名結果，避免誤操作。',
    infoAdv5: '拖曳調整規則順序 — 多條規則自由疊加，建構複雜的批次重新命名流程。',
    infoAdv6: '多語言介面 — 支援英文、簡體中文、繁體中文和俄文。',
    infoFaqTitle: '常見問題',
    infoFaq1Q: '支援哪些瀏覽器？',
    infoFaq1A: 'Chrome 123+ 和 Microsoft Edge 123+。此工具依賴 File System Access API，目前僅 Chromium 核心瀏覽器支援。',
    infoFaq2Q: '使用安全嗎？',
    infoFaq2A: '非常安全。所有檔案處理均在本機瀏覽器內完成，檔名和檔案內容不會上傳至任何伺服器。',
    infoFaq3Q: '只能重新命名圖片嗎？',
    infoFaq3A: '不是。雖然名稱中含有「圖片」，但本工具支援任意檔案類型，包括文件、影片、音訊等。',
    infoFaq4Q: '檔案數量有限制嗎？',
    infoFaq4A: '沒有硬性限制，處理能力取決於您的瀏覽器和裝置效能，通常可輕鬆處理數百個檔案。',
    infoFaq5Q: '需要付費嗎？',
    infoFaq5A: '完全免費，無任何隱藏費用。',
  },

  ru: {
    // App
    appSubtitle: 'Пакетное переименование файлов прямо в браузере',
    browserBadge: 'Только Chrome / Edge 123+',
    footer: 'Все операции выполняются локально — файлы никуда не загружаются',
    h1: 'Массовое переименование файлов и изображений',
    heroDesc: 'Бесплатный инструмент для пакетного переименования файлов прямо в браузере. Без загрузки файлов, без регистрации, без установки — выберите папку, настройте правила и применяйте.',

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
    selectFolder: 'Выбрать папку для начала',
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
    selected: 'выбрано',
    toggleSelectAll: 'Выбрать всё / Снять выбор',

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
    undo: 'Отменить',
    undoDesc: 'Отменить последнее переименование',

    // ReplaceRule
    findLabel: 'Найти',
    regexPlaceholder: 'Regex-шаблон...',
    findPlaceholder: 'Текст для поиска...',
    replaceLabel: 'Заменить на (оставьте пустым для удаления)',
    replacePlaceholder: 'Текст замены...',
    invalidRegex: 'Некорректный regex-шаблон',
    useRegex: 'Использовать Regex',
    caseSensitive: 'Учитывать регистр',
    includeExt: 'Включая расширение',

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

    // Footer
    privacyPolicy: 'Политика конфиденциальности',
    contactWebmaster: 'Связаться',

    // Privacy Policy page
    privacyTitle: 'Политика конфиденциальности',
    privacyLastUpdated: 'Последнее обновление: 2 апреля 2026 г.',
    privacyIntroTitle: 'Обзор',
    privacyIntroText: 'AI Bulk Rename Images & Files («Сервис») — браузерный инструмент для пакетного переименования файлов. Данная политика объясняет, как мы обращаемся с вашими данными.',
    privacyDataTitle: 'Данные, которые мы НЕ собираем',
    privacyDataText: 'Мы не собираем, не передаём и не храним ваши файлы или имена файлов. Все операции выполняются исключительно в вашем браузере через File System Access API. Ваши файлы никогда не покидают ваше устройство.',
    privacyLocalTitle: 'Только локальная обработка',
    privacyLocalText: 'Сервис работает полностью на стороне клиента. Никакое содержимое файлов, метаданные или операции переименования не отправляются на серверы.',
    privacyAdsTitle: 'Реклама',
    privacyAdsText: 'Сайт использует Google AdSense для показа рекламы. Google может использовать файлы cookie и собирать анонимные данные для показа релевантной рекламы. Подробнее см. Политику конфиденциальности Google.',
    privacyAnalyticsTitle: 'Аналитика',
    privacyAnalyticsText: 'Мы можем использовать анонимную аналитику (например, счётчик просмотров через Cloudflare) для анализа общего трафика. Персональные данные не собираются.',
    privacyCookiesTitle: 'Файлы cookie',
    privacyCookiesText: 'Сервис сам по себе не устанавливает файлы cookie. Сторонние сервисы (Google AdSense) могут устанавливать cookie для персонализации рекламы.',
    privacyContactTitle: 'Контакты',
    privacyContactText: 'Если у вас есть вопросы по данной Политике конфиденциальности, откройте Issue в нашем репозитории на GitHub.',
    privacyBackHome: '← На главную',

    // InfoSection
    infoWhatTitle: 'Что такое BulkRenameImages?',
    infoWhatText: 'BulkRenameImages — бесплатный браузерный инструмент для пакетного переименования файлов. Работает без регистрации, без загрузки файлов и без установки. Использует File System Access API браузера для работы непосредственно с файлами на вашем устройстве.',
    infoAdvTitle: 'Преимущества BulkRenameImages',
    infoAdv1: 'Полностью локальная обработка — файлы никогда не покидают ваше устройство, все операции выполняются в браузере.',
    infoAdv2: 'Без регистрации — начните переименование сразу, без создания аккаунта.',
    infoAdv3: 'Мощные правила — поиск и замена (с regex), префикс/суффикс, изменение регистра, нумерация, смена расширения.',
    infoAdv4: 'Предпросмотр в реальном времени — видите результат до применения изменений.',
    infoAdv5: 'Перетаскивание правил — создавайте сложные цепочки правил в нужном порядке.',
    infoAdv6: 'Многоязычный интерфейс — доступен на английском, китайском и русском языках.',
    infoFaqTitle: 'Часто задаваемые вопросы',
    infoFaq1Q: 'Какие браузеры поддерживаются?',
    infoFaq1A: 'Chrome 123+ и Microsoft Edge 123+. Инструмент требует File System Access API, доступный только в браузерах на основе Chromium.',
    infoFaq2Q: 'Безопасно ли использовать?',
    infoFaq2A: 'Абсолютно. Все операции выполняются локально в браузере, никакие файлы и данные не отправляются на серверы.',
    infoFaq3Q: 'Можно ли переименовывать не только изображения?',
    infoFaq3A: 'Да! Несмотря на название, инструмент работает с любыми типами файлов — документами, видео, аудио и другими.',
    infoFaq4Q: 'Есть ли ограничение на количество файлов?',
    infoFaq4A: 'Жёсткого ограничения нет. Возможности зависят от браузера и устройства, обычно без проблем обрабатываются сотни файлов.',
    infoFaq5Q: 'Это бесплатно?',
    infoFaq5A: 'Да, полностью бесплатно, без скрытых платежей и подписок.',
  },
} as const;

export type Lang = keyof typeof translations;
export type TranslationKeys = keyof typeof translations.en;

// 根据浏览器语言自动匹配支持的语言，默认英文
function detectLang(): Lang {
  const raw = navigator.language || 'en';
  if (raw === 'zh-TW' || raw === 'zh-HK' || raw === 'zh-MO') return 'zh-TW';
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
