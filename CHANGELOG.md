# Changelog

All notable changes to this project will be documented in this file.

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
