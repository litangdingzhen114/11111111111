import {
  Lightbulb,
  Code2,
  Server,
  Sparkles,
  Search,
  Target,
  Palette,
  Hammer,
  RotateCcw,
  type LucideIcon,
} from "lucide-react";

export interface Capability {
  title: string;
  description: string;
  icon: LucideIcon;
}

export const capabilities: Capability[] = [
  {
    title: "产品拆解",
    icon: Lightbulb,
    description:
      "先把用户、任务和限制条件讲清楚，再决定 AI 应该出现在哪一步。",
  },
  {
    title: "交互原型",
    icon: Code2,
    description:
      "用 React、Next.js、Vite 和微信小程序把想法做成能点开的页面。",
  },
  {
    title: "后端与接口",
    icon: Server,
    description:
      "需要接口、数据库或流式回复时，会先用 FastAPI、Express 和 SQLite 搭出能跑的版本。",
  },
  {
    title: "反馈观察",
    icon: Sparkles,
    description:
      "会看对话记录、播放量、打卡数据这些反馈，判断哪里真的有用，哪里只是看起来完整。",
  },
];

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

export const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "看问题",
    icon: Search,
    description: "先确认谁会用、想完成什么、现在卡在哪里，而不是一上来就想功能。",
  },
  {
    number: "02",
    title: "划红线",
    icon: Target,
    description: "想清楚哪些事 AI 可以做，哪些必须转人工，哪些回答不能让模型随便编。",
  },
  {
    number: "03",
    title: "拆页面",
    icon: Palette,
    description: "把需求拆成页面、状态、输入输出和异常情况，先让结构能被看懂。",
  },
  {
    number: "04",
    title: "做出来",
    icon: Hammer,
    description: "用前端、小程序、后端代理和 API 接入做一个小版本，先看到真实交互。",
  },
  {
    number: "05",
    title: "回头改",
    icon: RotateCcw,
    description: "根据日志、内容数据和实际体验继续改，不把第一次做出来的东西当最终答案。",
  },
];

export interface TechItem {
  name: string;
  category: string;
}

export const techStack: TechItem[] = [
  { name: "Next.js", category: "框架" },
  { name: "React", category: "库" },
  { name: "TypeScript", category: "语言" },
  { name: "Tailwind CSS", category: "样式" },
  { name: "Vite", category: "构建" },
  { name: "微信小程序", category: "平台" },
  { name: "FastAPI", category: "后端" },
  { name: "Express", category: "后端" },
  { name: "LangGraph", category: "Agent" },
  { name: "Kimi API", category: "模型" },
  { name: "Gemini API", category: "模型" },
  { name: "SQLite", category: "数据库" },
  { name: "Git", category: "版本控制" },
];

export interface Stat {
  value: string;
  label: string;
  suffix?: string;
}

export const stats: Stat[] = [
  { value: "7", label: "项目整理" },
  { value: "3", label: "AI 原型" },
  { value: "20", suffix: "+", label: "AIGC 作品" },
  { value: "25", suffix: "w", label: "单条最高播放" },
];
