# My Portfolio

A premium dark-mode portfolio website built with **Next.js 15**, **TypeScript**, **Tailwind CSS**, **Three.js**, **GSAP**, and **Motion**.

## Quick Start

```bash
pnpm install
pnpm dev
```

Visit [http://localhost:3000](http://localhost:3000)

## Tech Stack

| Category | Technology |
|----------|-----------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 + shadcn/ui |
| 3D | Three.js + React Three Fiber + Drei |
| Animation | GSAP + @gsap/react + Motion |
| Smooth Scroll | Lenis |
| Content | MDX (next-mdx-remote + gray-matter) |
| Icons | lucide-react |

## How to Add a Project

1. Add metadata to `src/data/projects.ts`
2. Create MDX file in `src/content/projects/[slug].mdx`
3. Follow the case study structure

## How to Modify Hero Copy

Edit `src/components/sections/Hero.tsx` — title, subtitle, CTAs, and eyebrow badge.

## Design System

- Background: `#05050A`
- Primary: Purple-blue gradients
- Cards: `rgba(255,255,255,0.04)` with subtle borders
- Font: Geist Sans / Geist Mono
