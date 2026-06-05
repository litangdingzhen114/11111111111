# 我的作品集

一个高级暗色风格的个人作品集网站，使用 **Next.js 16**、**TypeScript**、**Tailwind CSS**、**Three.js**、**GSAP** 和 **Motion** 构建。

## 快速开始

```bash
pnpm install
pnpm dev
```

访问 [http://localhost:3000](http://localhost:3000)

## 技术栈

| 分类 | 技术 |
| --- | --- |
| 框架 | Next.js 16 (App Router) |
| 语言 | TypeScript |
| 样式 | Tailwind CSS v4 + shadcn/ui |
| 3D | Three.js + React Three Fiber + Drei |
| 动效 | GSAP + @gsap/react + Motion |
| 平滑滚动 | Lenis |
| 内容 | MDX (next-mdx-remote + gray-matter) |
| 图标 | lucide-react |

## 添加项目

1. 在 `src/data/projects.ts` 中添加项目元数据
2. 在 `src/content/projects/[slug].mdx` 中创建项目详情
3. 按现有案例结构撰写内容

## 修改首页文案

编辑 `src/components/sections/Hero.tsx`，可调整标题、副标题、按钮和状态标签。

## 设计系统

- 背景色：`#05050A`
- 主色：紫蓝渐变
- 卡片：`rgba(255,255,255,0.04)` 半透明背景与细边框
- 字体：Geist Sans / Geist Mono
