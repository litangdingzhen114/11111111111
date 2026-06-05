import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";

export const metadata: Metadata = {
  title: "关于我",
  description: "AI 产品经理方向，关注 Agent、AIGC 工作流和可演示原型。",
};

const highlights = [
  { label: "项目案例", value: "7" },
  { label: "AI 原型", value: "3" },
  { label: "AIGC 作品", value: "20+" },
  { label: "单条最高播放", value: "25w" },
];

const focusAreas = [
  {
    title: "AI 产品思维",
    description:
      "先回到用户场景和业务目标，再判断模型应该做什么、不该做什么，以及需要怎样的人工作业边界。",
  },
  {
    title: "原型开发",
    description:
      "使用 React、Next.js、TypeScript、Vite 和微信小程序，把产品流程尽快做成可点击、可演示的版本。",
  },
  {
    title: "流程编排",
    description:
      "关注 Agent 工具调用、AIGC 节点工作流、结构化输出、风险校验、失败重试和状态流转。",
  },
  {
    title: "内容与运营理解",
    description:
      "有影评社网页维护、活动组织和 Frieren 内容数据验证经历，能把内容表达和产品体验放在一起看。",
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
          <h1 className="mt-3 text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
            走向 AI 产品的
            <br />
            <span className="text-gradient">原型开发者</span>
          </h1>
          <p className="mt-6 text-base leading-7 text-gray-400 sm:text-lg sm:leading-relaxed">
            我是电子商务专业在读，求职方向是 AI 产品经理 / AI 应用产品。现在主要关注 LLM Agent、RAG、AIGC 工作流和垂直行业 AI 助手。
          </p>
          <p className="mt-4 text-base leading-7 text-gray-400 sm:text-lg sm:leading-relaxed">
            我喜欢把想法拆成具体流程，再用代码做成可演示原型。相比停留在概念上，我更在意需求、状态、边界、指标和下一轮迭代怎么落地。
          </p>
        </div>

        <div className="mb-14 grid grid-cols-2 gap-3 sm:mb-20 sm:gap-6 lg:grid-cols-4">
          {highlights.map((s) => (
            <div key={s.label} className="rounded-[8px] border border-white/[0.06] bg-white/[0.02] p-4 text-center sm:rounded-2xl sm:p-6">
              <p className="text-2xl font-bold text-white sm:text-3xl">{s.value}</p>
              <p className="mt-2 text-sm text-gray-500">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="mb-14 sm:mb-20">
          <h2 className="mb-6 text-2xl font-bold text-white sm:mb-10">我能带来的价值</h2>
          <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
            {focusAreas.map((a, i) => (
              <div key={a.title} className="project-card-surface group rounded-[8px] border p-5 transition-all sm:rounded-2xl sm:p-6">
                <span className="text-xs font-mono text-gray-600">0{i + 1}</span>
                <h3 className="mt-3 text-lg font-bold text-white">{a.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-gray-400">{a.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-14 sm:mb-20">
          <h2 className="mb-6 text-2xl font-bold text-white sm:mb-10">经历</h2>
          <div className="space-y-8 sm:space-y-10">
            {timeline.map((t) => (
              <div key={t.year} className="relative pl-8 before:absolute before:left-0 before:top-2 before:h-2 before:w-2 before:rounded-full before:bg-primary after:absolute after:left-[3px] after:top-4 after:h-full after:w-[2px] after:bg-white/[0.06] last:after:hidden">
                <p className="text-xs font-mono text-primary">{t.year}</p>
                <h3 className="mt-1 text-lg font-bold text-white">{t.role}</h3>
                <p className="text-sm text-gray-500">{t.company}</p>
                <p className="mt-2 text-sm text-gray-400">{t.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="project-card-surface rounded-[8px] border p-5 text-center sm:rounded-2xl sm:p-12">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">想进一步了解项目吗？</h2>
          <p className="mt-3 text-gray-400">可以联系我聊 AI 产品、前端原型、小程序项目或实习机会。</p>
          <div className="mt-8 flex flex-col items-stretch gap-4 sm:flex-row sm:items-center sm:justify-center">
            <Link href="/contact" className="site-primary-cta inline-flex items-center justify-center gap-2 rounded-full px-8 py-3 text-sm font-semibold">
              联系我 <ArrowRight size={14} />
            </Link>
            <span aria-disabled="true" className="inline-flex cursor-not-allowed items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-8 py-3 text-sm font-semibold text-gray-300 opacity-80">
              <Download size={14} /> 下载简历
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
