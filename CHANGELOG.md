# Changelog

All notable changes to this project will be documented in this file.

---

## [1.2.0] - 2026-04-05

### Added
- 渐进式披露：首次进入页面仅显示「选择文件夹」，选择后展开规则/预览/执行区域
- Header logo + 标题区域点击返回首页

### Changed
- 「选择文件夹」按钮视觉强化：更大图标、右下角加号徽标、悬停阴影过渡
- 未选文件夹时 SEO 信息区上移间距加大（mt-32），减少视觉干扰
- 「选择文件夹」文案更新为「选择文件夹以开始」（四语言同步）

---

## [1.1.3] - 2026-04-05

### Changed
- favicon 替换为透明背景版胖黄鸭（logo.png）

---

## [1.1.2] - 2026-04-05

### Fixed
- 改用 Vite MPA 双入口，/privacy 路由使用独立 privacy.html（修复 duplicate title/meta description）
- index.html 和 privacy.html 内嵌静态 h1 和描述文字，爬虫不执行 JS 也能读取（修复 missing h1、low word count、low text ratio）
- 更新 _redirects：/privacy 指向 privacy.html，其余路由仍走 index.html

---

## [1.1.1] - 2026-04-05

### Changed
- 浏览器标签页 favicon 替换为胖黄鸭图片（logo.jpeg）

---

## [1.1.0] - 2026-04-05

### Added
- 新增繁体中文（zh-TW）语言支持，覆盖全部 UI 文字
- Header 语言切换新增「繁」按钮（EN / 中 / 繁 / РУ）
- `detectLang()` 自动识别 `zh-TW`/`zh-HK`/`zh-MO` 并切换至繁体

---

## [1.0.10] - 2026-04-05

### Fixed
- 新增 `public/robots.txt`，修复格式无效问题，并声明 Sitemap URL
- 新增 `public/llms.txt`，修复 LLMs.txt 格式错误问题
- `PrivacyPolicy.tsx` 动态设置独立 `<title>` 和 `<meta description>`，修复与主页重复的 SEO 问题

---

## [1.0.9] - 2026-04-02

### Changed
- 提升 EN 关键词密度：Bulk Rename Images / Rename Images / Rename Files
- 优化 heroDesc、infoWhatText、infoAdv3、FAQ3、FAQ5 描述文字

---

## [1.0.8] - 2026-04-02

### Added
- 主内容区新增 H1 标题 + heroDesc 描述段落，修复无 H1 问题
- Header logo 由 `<h1>` 改为 `<span>`，避免重复 H1
- 新增 InfoSection 组件：介绍、优势列表、FAQ 手风琴，提升 text-HTML 比率
- 三语言新增 heroDesc 及所有 InfoSection 翻译键

---

## [1.0.7] - 2026-04-02

### Added
- 接入 Google AdSense 三个手动广告位（关闭自动广告）
  - 左侧边栏：slot 4991313315
  - 右侧边栏：slot 5018504526
  - 底部横幅：slot 9371645093
- index.html 添加 AdSense 全局脚本
- public/ads.txt 添加 AdSense 验证记录
- Footer 添加「联系站长」mailto 链接，预填日期+项目名+版本号主题

---

## [1.0.6] - 2026-04-02

### Added
- 深色模式（Dark Mode）支持，自动跟随系统偏好，可手动切换
- Header 右上角新增月亮/太阳切换按钮
- 主题选择持久化到 localStorage
- 所有页面（主页、隐私政策、浏览器不支持页）均适配深色模式

---

## [1.0.5] - 2026-04-02

### Added
- 新增隐私政策页面（/privacy），支持三语言
- Footer 添加隐私政策链接
- 添加 Cloudflare Pages `_redirects` 支持 SPA 路由

---

## [1.0.4] - 2026-04-02

### Fixed
- 修复 Microsoft Edge 图标，替换为正确的品牌色 SVG（蓝色主体 + 绿色上弧 + 白色椭圆开口 + 深色内卷）

---

## [1.0.3] - 2026-04-02

### Fixed
- 简化浏览器不支持页面的描述文字（三语言同步）
- 去掉 Chrome / Edge 版本号显示
- Chrome 和 Edge 图标替换为品牌色 SVG

---

## [1.0.2] - 2026-04-02

### Added
- 根据浏览器语言自动切换界面语言（zh / ru / en）

---

## [1.0.1] - 2026-04-02

### Fixed
- 浏览器不支持页面（BrowserGuard）增加语言切换按钮，用户可在提示页直接切换语言

---

## [1.0.0] - 2026-04-02

### Added
- 批量文件重命名核心功能（查找替换 / 前缀 / 后缀 / 大小写 / 序列化 / 扩展名）
- 三语言支持：英文（EN）/ 中文（中）/ 俄文（РУ），右上角手动切换
- Google AdSense 广告位占位（左侧、右侧 160×600，底部 728×90）
- SEO 优化：title、meta description、Open Graph 标签
- Footer 显示当前版本号
- Cloudflare Pages 部署
