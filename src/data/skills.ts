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
    title: "AI 产品设计",
    icon: Lightbulb,
    description:
      "围绕 Agent、RAG、AIGC 工作流和垂直行业助手，拆解用户场景、MVP 范围、流程和风险边界。",
  },
  {
    title: "交互原型",
    icon: Code2,
    description:
      "使用 React、Next.js、TypeScript、Vite、Tailwind CSS 和微信小程序快速做出可演示的产品原型。",
  },
  {
    title: "全栈落地",
    icon: Server,
    description:
      "用 FastAPI、Express、SQLite、JSON 数据服务和流式接口，把 AI 能力接到真实页面和业务流程里。",
  },
  {
    title: "内容与数据验证",
    icon: Sparkles,
    description:
      "通过对话日志、意图分布、打卡指标、内容播放数据等反馈，判断原型是否真的解决问题。",
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
    title: "拆场景",
    icon: Search,
    description: "先确认用户是谁、任务是什么、失败点在哪里，再决定 AI 应该进入哪一段流程。",
  },
  {
    number: "02",
    title: "定边界",
    icon: Target,
    description: "明确 MVP 范围、模型职责、人工兜底、风险提示和可验证指标，避免功能无限扩散。",
  },
  {
    number: "03",
    title: "画流程",
    icon: Palette,
    description: "把需求写成页面、状态、节点、输入输出和异常分支，让产品逻辑可以被讨论和实现。",
  },
  {
    number: "04",
    title: "做原型",
    icon: Hammer,
    description: "用前端、小程序、后端代理和 API 接入做出可演示版本，尽快看到真实交互效果。",
  },
  {
    number: "05",
    title: "看反馈",
    icon: RotateCcw,
    description: "根据日志、内容数据、任务完成情况和用户反馈调整流程，而不是只停留在想法层面。",
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
  { value: "3", label: "AI 产品原型" },
  { value: "20", suffix: "+", label: "AIGC 作品产出" },
  { value: "25", suffix: "w", label: "单条最高播放" },
];
