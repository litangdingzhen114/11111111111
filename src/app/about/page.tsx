import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";

export const metadata: Metadata = {
  title: "关于我",
  description: "AI 产品经理方向，会做原型，也会写代码把想法跑起来。",
};

const highlights = [
  { label: "项目案例", value: "7" },
  { label: "AI 原型", value: "3" },
  { label: "AIGC 作品", value: "20+" },
  { label: "单条最高播放", value: "25w" },
];

const focusAreas = [
  {
    title: "产品拆解",
    description:
      "先弄清楚用户要做什么、现在卡在哪里，再决定 AI 应该帮哪一段。",
  },
  {
    title: "应用搭建",
    description:
      "用 React、Next.js、Vite 和微信小程序，把想法尽快做成可以点开的版本。",
  },
  {
    title: "流程整理",
    description:
      "会把 Agent 调工具、AIGC 节点、失败重试和状态变化这些东西整理到页面里。",
  },
  {
    title: "内容表达",
    description:
      "做过影评社网页、观影活动和短剧内容账号，更能理解内容为什么要这样呈现。",
  },
];

const timeline = [
  {
    year: "2026",
    role: "AI 产品原型实践",
    company: "Agent / AIGC / 医疗健康",
    description: "完成 DTC 电商 AI Agent、Frieren AIGC 工作流和 AI 康复分诊小程序等项目原型。",
  },
  {
    year: "2025 - 2026",
    role: "Web 与小程序项目",
    company: "电商 / 社团 / 作品集",
    description: "开发 LEMANISM 时尚电商小程序、影评社官方网页、创意互动专题页和个人作品集站。",
  },
  {
    year: "2024 - 2027",
    role: "电子商务专业在读",
    company: "门头沟学院",
    description: "学习数据分析、市场营销、网店美工和电商运营，并担任影评社社长。",
  },
];

export default function AboutPage() {
  return (
    <div className="pt-28 pb-20 sm:pt-32 sm:pb-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="mb-14 max-w-3xl sm:mb-20">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">关于我</p>
          <h1 className="mt-3 text-4xl font-bold text-[var(--site-text)] sm:text-5xl lg:text-6xl">
            走向 AI 产品的
            <br />
            <span className="text-gradient">应用搭建者</span>
          </h1>
          <p className="mt-6 text-base leading-7 text-[var(--site-muted)] sm:text-lg sm:leading-relaxed">
            我是电子商务专业在读，求职方向是 AI 产品经理 / AI 应用产品。最近主要在做 Agent、AIGC 创作工具和小程序原型。
          </p>
          <p className="mt-4 text-base leading-7 text-[var(--site-muted)] sm:text-lg sm:leading-relaxed">
            我喜欢把一个想法先拆成页面和状态，再用代码跑起来。比起写一大段概念说明，我更想先做出一个能被打开、能被挑毛病的版本。
          </p>
        </div>

        <div className="mb-14 grid grid-cols-2 gap-3 sm:mb-20 sm:gap-6 lg:grid-cols-4">
          {highlights.map((s) => (
            <div key={s.label} className="rounded-[8px] border border-white/[0.06] bg-white/[0.02] p-4 text-center sm:rounded-2xl sm:p-6">
              <p className="text-2xl font-bold text-[var(--site-text)] sm:text-3xl">{s.value}</p>
              <p className="mt-2 text-sm text-gray-500">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="mb-14 sm:mb-20">
          <h2 className="mb-6 text-2xl font-bold text-[var(--site-text)] sm:mb-10">我能做什么</h2>
          <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
            {focusAreas.map((a, i) => (
              <div key={a.title} className="project-card-surface group rounded-[8px] border p-5 transition-all sm:rounded-2xl sm:p-6">
                <span className="text-xs font-mono text-[var(--site-muted-strong)]">0{i + 1}</span>
                <h3 className="mt-3 text-lg font-bold text-[var(--site-text)]">{a.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--site-muted)]">{a.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-14 sm:mb-20">
          <h2 className="mb-6 text-2xl font-bold text-[var(--site-text)] sm:mb-10">经历</h2>
          <div className="space-y-8 sm:space-y-10">
            {timeline.map((t) => (
              <div key={t.year} className="relative pl-8 before:absolute before:left-0 before:top-2 before:h-2 before:w-2 before:rounded-full before:bg-primary after:absolute after:left-[3px] after:top-4 after:h-full after:w-[2px] after:bg-[var(--site-panel-hover)] last:after:hidden">
                <p className="text-xs font-mono text-primary">{t.year}</p>
                <h3 className="mt-1 text-lg font-bold text-[var(--site-text)]">{t.role}</h3>
                <p className="text-sm text-gray-500">{t.company}</p>
                <p className="mt-2 text-sm text-[var(--site-muted)]">{t.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="project-card-surface rounded-[8px] border p-5 text-center sm:rounded-2xl sm:p-12">
          <h2 className="text-2xl font-bold text-[var(--site-text)] sm:text-3xl">想进一步了解项目吗？</h2>
          <p className="mt-3 text-[var(--site-muted)]">可以找我聊项目细节、原型思路、小程序，或者实习机会。</p>
          <div className="mt-8 flex flex-col items-stretch gap-4 sm:flex-row sm:items-center sm:justify-center">
            <Link href="/contact" className="site-primary-cta inline-flex items-center justify-center gap-2 rounded-full px-8 py-3 text-sm font-semibold">
              联系我 <ArrowRight size={14} />
            </Link>
            <span aria-disabled="true" className="inline-flex cursor-not-allowed items-center justify-center gap-2 rounded-full border border-[var(--site-line)] bg-[var(--site-panel)] px-8 py-3 text-sm font-semibold text-gray-300 opacity-80">
              <Download size={14} /> 下载简历
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
