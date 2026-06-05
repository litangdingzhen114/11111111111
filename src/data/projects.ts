export type ProjectType =
  | "AI Agent"
  | "AIGC"
  | "AI 应用"
  | "工作流产品"
  | "电商产品"
  | "内容工具"
  | "内容社区"
  | "医疗健康"
  | "小程序"
  | "Web 应用"
  | "作品集"
  | "创意互动"
  | "前端"
  | "全栈";

export interface Project {
  slug: string;
  title: string;
  description: string;
  role: string;
  stack: string[];
  type: ProjectType[];
  year: string;
  featured: boolean;
  coverGradient: string;
}

export const projects: Project[] = [
  {
    slug: "dtc-ai-agent",
    title: "DTC 电商 AI Agent 客服与导购原型",
    description:
      "面向 DTC 商家的 AI 客服与导购 MVP，覆盖商品推荐、订单查询、优惠券、政策问答和人工升级等核心链路。",
    role: "AI 产品设计 / Agent 原型开发",
    stack: ["FastAPI", "LangGraph", "MCP Tools", "SQLite", "RAG", "React", "Vite", "SSE"],
    type: ["AI Agent", "电商产品", "全栈"],
    year: "2026",
    featured: true,
    coverGradient: "from-slate-700/70 via-indigo-500/35 to-teal-400/35",
  },
  {
    slug: "frieren-aigc-studio",
    title: "Frieren AI 短剧/漫剧生产平台",
    description:
      "节点式 AIGC 内容生产工具，打通创意、剧本、角色、分镜、图片、视频、音频到剪辑导出的工作流。",
    role: "AIGC 产品设计 / 工作流原型开发",
    stack: ["React", "TypeScript", "Vite", "Zustand", "Gemini API", "Sora 2", "Express", "Tauri"],
    type: ["AIGC", "工作流产品", "内容工具"],
    year: "2026",
    featured: true,
    coverGradient: "from-violet-700/55 via-fuchsia-500/30 to-stone-800/60",
  },
  {
    slug: "rehab-ai-miniprogram",
    title: "AI 康复分诊与随访管理小程序",
    description:
      "康复医疗场景下的 AI 初筛与随访小程序原型，串联患者档案、问诊资料袋、康复打卡、风险提醒和 AI 周报。",
    role: "AI 医疗健康产品原型 / 小程序开发",
    stack: ["微信小程序", "Express", "Kimi API", "SSE", "JSON 数据服务", "本地缓存"],
    type: ["AI 应用", "医疗健康", "小程序"],
    year: "2026",
    featured: true,
    coverGradient: "from-emerald-500/45 via-teal-600/35 to-slate-800/60",
  },
  {
    slug: "lemanism-fashion-miniprogram",
    title: "LEMANISM 时尚电商小程序",
    description:
      "围绕时尚品牌展示与转化设计的小程序，包含商品、购物车、收藏、活动、Lookbook 和 AI 试穿入口等模块。",
    role: "小程序产品设计 / 前端开发",
    stack: ["微信小程序", "JavaScript", "WXSS", "本地缓存", "组件化开发"],
    type: ["小程序", "电商产品", "前端"],
    year: "2026",
    featured: false,
    coverGradient: "from-rose-300/45 via-zinc-700/35 to-stone-900/65",
  },
  {
    slug: "film-club-official-site",
    title: "影评社官方网页",
    description:
      "为校内影评社搭建的官方网页，用于展示社团介绍、活动信息和影评征集内容，并配合线下观影活动持续更新。",
    role: "网页开发 / 社团运营",
    stack: ["React", "Vite", "TypeScript", "CSS", "内容维护"],
    type: ["Web 应用", "内容社区", "前端"],
    year: "2025",
    featured: false,
    coverGradient: "from-amber-200/55 via-stone-600/35 to-neutral-950/65",
  },
  {
    slug: "portfolio-site",
    title: "个人作品集站",
    description:
      "用于整理项目案例、技术栈和个人经历的网站，重点验证项目展示结构、动效节奏和多项目内容组织方式。",
    role: "产品规划 / 前端开发",
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "GSAP", "Three.js"],
    type: ["Web 应用", "作品集", "前端"],
    year: "2026",
    featured: false,
    coverGradient: "from-slate-300/55 via-blue-900/35 to-stone-900/60",
  },
  {
    slug: "creative-fan-site",
    title: "创意互动专题页",
    description:
      "围绕特定人物/主题制作的沉浸式互动页面，侧重视觉表达、动效节奏和移动端浏览体验。",
    role: "前端开发 / 交互设计",
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion"],
    type: ["创意互动", "Web 应用", "前端"],
    year: "2025",
    featured: false,
    coverGradient: "from-cyan-400/40 via-indigo-700/35 to-zinc-950/65",
  },
];

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getAllProjectTypes(): string[] {
  const types = new Set<string>();
  projects.forEach((p) => p.type.forEach((t) => types.add(t)));
  return Array.from(types);
}
