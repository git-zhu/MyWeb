# 个人网站：MyWeb

> 基于 Next.js + TypeScript + Tailwind CSS 的个人博客 / 笔记 / 收藏 / 工作站点。

## 功能概览

- **顶部导航栏**
  - 主页、博客、笔记、收藏网站、工作相关
  - 支持多级菜单（如笔记分类、收藏分类）
- **博客模块**
  - 博客列表页 `/blog`
  - 博客详情页 `/blog/[slug]`
  - Markdown 存储，支持 Frontmatter（`title/date/tags/category/summary`）
- **笔记模块**
  - 笔记分类总览 `/notes`
  - 分类列表 `/notes/[category]`
  - 笔记详情 `/notes/[category]/[slug]`
- **收藏网站**
  - 列表展示所有收藏网站 `/bookmarks`
  - 通过 `?cat=` 查询参数按分类过滤（开发/设计/效率/其他）
- **工作相关**
  - 工作列表 `/work`
  - 工作详情 `/work/[slug]`
- **UI / UX**
  - 响应式设计，适配 PC 与移动端
  - 顶部导航汉堡菜单
  - 使用 Tailwind CSS + typography 插件

## 技术栈

- **框架**：Next.js 16（App Router）
- **语言**：TypeScript
- **样式**：Tailwind CSS + @tailwindcss/typography
- **Markdown 解析**：gray-matter + remark + remark-html
- **构建方式**：`output: 'export'`，支持静态导出到 `out/` 目录

## 目录结构（核心部分）

```text
MyWeb/
├─ app/                     # Next.js App Router 页面
│  ├─ layout.tsx           # 全局布局（导航 + 页脚）
│  ├─ page.tsx             # 主页（最新博客卡片）
│  ├─ blog/
│  │  ├─ page.tsx          # 博客列表
│  │  └─ [slug]/page.tsx   # 博客详情
│  ├─ notes/
│  │  ├─ page.tsx          # 笔记分类总览
│  │  └─ [category]/
│  │     ├─ page.tsx       # 某分类下的笔记列表
│  │     └─ [slug]/page.tsx# 笔记详情
│  ├─ bookmarks/
│  │  └─ page.tsx          # 收藏网站（支持 ?cat= 分类筛选）
│  └─ work/
│     ├─ page.tsx          # 工作相关列表
│     └─ [slug]/page.tsx   # 工作详情
│
├─ components/
│  ├─ layout/
│  │  └─ Header.tsx        # 顶部导航（多级菜单 + 汉堡）
│  ├─ ui/
│  │  └─ MarkdownRenderer.tsx
│  └─ bookmarks/
│     └─ BookmarksView.tsx # 客户端收藏筛选视图
│
├─ config/
│  └─ navigation.ts        # 导航菜单配置（可扩展 children）
│
├─ lib/
│  ├─ markdown/
│  │  ├─ getMarkdownFiles.ts
│  │  ├─ parseMarkdown.ts
│  │  └─ getContentByType.ts
│  └─ bookmarks.ts         # 收藏网站数据与类型定义
│
├─ content/                # 所有 Markdown 内容
│  ├─ blog/                # 博客文章 .md
│  ├─ notes/               # 笔记分类（如 tech/life/study）
│  └─ work/                # 工作相关内容 .md
│
├─ public/                 # 静态资源（图片 / 视频 / 下载文件）
│  ├─ zhu.ico              # 网站 favicon
│  ├─ zhu.png              # 网站 Logo
│  ├─ images/
│  │  ├─ blog/
│  │  ├─ notes/
│  │  └─ work/
│  ├─ videos/
│  │  ├─ blog/
│  │  └─ work/
│  └─ files/
│     ├─ cv/
│     ├─ slides/
│     └─ assets/
│
├─ styles/
│  └─ globals.css          # Tailwind 全局样式与基础布局
│
├─ next.config.mjs         # Next.js 配置（包含 output: 'export'）
├─ tailwind.config.ts      # Tailwind CSS 配置
├─ tsconfig.json
├─ package.json
└─ README.md
```

## 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器（默认 http://localhost:3000）
npm run dev
```

## 内容编辑方式

### 博客文章

- 位置：`content/blog/`
- 文件格式：`*.md`
- 推荐 Frontmatter 模板：

```md
---
title: "文章标题"
date: "2026-02-27"
tags: ["标签1", "标签2"]
category: "技术"
summary: "用于列表展示的文章摘要。"
---

正文使用 Markdown 编写……
```

访问路径：`/blog/<文件名去掉.md>`，例如 `content/blog/first-post.md` 对应 `/blog/first-post`。

### 笔记

- 位置：`content/notes/<category>/`
  - 例如：`content/notes/tech/note-1.md`
- Frontmatter 写法与博客类似（可视需求精简）。

访问路径：

- 分类列表：`/notes/<category>`
- 笔记详情：`/notes/<category>/<slug>`（`slug` 为文件名去掉 `.md`）。

### 工作相关

- 位置：`content/work/`
- 与博客结构类似，用于记录项目、经验总结等。

访问路径：`/work/<slug>`。

### 收藏网站

- 数据集中定义在：`lib/bookmarks.ts`
- 类型：

```ts
export type BookmarkCategory = '开发' | '设计' | '效率' | '其他';

export type Bookmark = {
  id: string;
  name: string;
  url: string;
  description: string;
  category: BookmarkCategory;
};
```

- 页面：`/bookmarks`
  - `?cat=开发` / `?cat=设计` 等，通过 URL 查询参数筛选分类。

## 导航菜单配置与扩展

- 文件位置：`config/navigation.ts`
- 配置示例：

```ts
export const NAV_ITEMS: NavItem[] = [
  { key: 'home', label: '主页', href: '/', exact: true },
  {
    key: 'notes',
    label: '笔记',
    href: '/notes',
    children: [
      { key: 'notes-tech', label: '技术笔记', href: '/notes/tech' },
      { key: 'notes-life', label: '生活笔记', href: '/notes/life' },
      { key: 'notes-study', label: '学习笔记', href: '/notes/study' },
    ],
  },
  // ...
];
```

要新增菜单项，只需要在 `NAV_ITEMS` 中添加一项，并在 `app/` 目录下创建对应路由页面即可。

## 静态导出与部署

本项目已启用 `output: 'export'`，可以导出为纯静态站点。

```bash
# 构建并导出静态文件
npm run build
```

构建完成后会在项目根目录生成 `out/` 目录，将 `out/` 部署到任意静态托管即可，例如：

- GitHub Pages（推送到 `gh-pages` 分支）
- Netlify / Vercel / Cloudflare Pages
- 自己的 Nginx / 对象存储静态托管等

## 后续可扩展方向

- 增加 **标签页**（/tags/[tag]）与标签云
- 增加 **暗色模式**，使用 `next-themes` + Tailwind `dark` 模式
- 接入评论系统（如 Giscus / utterances）
- 使用 Headless CMS（Contentful / Sanity 等）替代或补充 Markdown 管理

