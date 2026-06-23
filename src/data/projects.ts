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
  coverImage?: string;
  coverAlt?: string;
}

export const projects: Project[] = [
  {
    slug: "dtc-ai-agent",
    title: "DTC 电商 AI Agent 客服与导购原型",
    description:
      "给 DTC 商家做的客服/导购原型，能回答政策、查订单、发优惠券，也会在高风险问题上转人工。",
    role: "AI 产品设计 / Agent 应用搭建",
    stack: ["FastAPI", "LangGraph", "MCP Tools", "SQLite", "RAG", "React", "Vite", "SSE"],
    type: ["AI Agent", "电商产品", "全栈"],
    year: "2026",
    featured: true,
    coverGradient: "from-emerald-500/32 via-amber-300/18 to-stone-950/80",
    coverImage: "/projects/dtc/dtc-case-hero.png",
    coverAlt: "DTC AI Agent chat and analytics dashboard composite",
  },
  {
    slug: "frieren-aigc-studio",
    title: "Frieren AI 短剧/漫剧生产平台",
    description:
      "给短剧/漫剧创作者做的节点式工具，把剧本、角色、分镜、生图、视频和音频放在同一条创作流程里。",
    role: "AIGC 产品设计 / 工作流应用搭建",
    stack: ["React", "TypeScript", "Vite", "Zustand", "Gemini API", "Sora 2", "Express", "Tauri"],
    type: ["AIGC", "工作流产品", "内容工具"],
    year: "2026",
    featured: true,
    coverGradient: "from-emerald-500/35 via-amber-400/25 to-slate-950/75",
    coverImage: "/projects/frieren/frieren-case-hero.png",
    coverAlt: "Frieren AIGC workflow canvas and generator panels",
  },
  {
    slug: "rehab-ai-miniprogram",
    title: "AI 康复分诊与随访管理小程序",
    description:
      "康复小程序原型，用户可以补充资料、做 AI 初筛、记录训练，系统会生成风险提醒和 7 天周报。",
    role: "AI 医疗健康产品原型 / 小程序开发",
    stack: ["微信小程序", "Express", "Kimi API", "SSE", "JSON 数据服务", "本地缓存"],
    type: ["AI 应用", "医疗健康", "小程序"],
    year: "2026",
    featured: true,
    coverGradient: "from-emerald-400/34 via-cyan-200/18 to-stone-950/80",
    coverImage: "/projects/rehab/rehab-case-hero.png",
    coverAlt: "AI rehab mini program screens and triage workflow",
  },
  {
    slug: "lemanism-fashion-miniprogram",
    title: "LEMANISM 时尚电商小程序",
    description:
      "为时尚零售场景做的小程序，包含商品浏览、购物袋、收藏、活动预约、Lookbook 和 AI 试穿入口。",
    role: "小程序产品设计 / 前端开发 / 电商体验",
    stack: ["微信小程序", "JavaScript", "WXSS", "本地状态管理", "自定义组件", "本地缓存"],
    type: ["小程序", "电商产品", "前端"],
    year: "2026",
    featured: false,
    coverGradient: "from-amber-300/34 via-emerald-700/25 to-stone-950/78",
    coverImage: "/projects/lemanism/lemanism-case-hero.png",
    coverAlt: "LEMANISM fashion commerce mini program screens",
  },
  {
    slug: "film-club-official-site",
    title: "影评社官方网页",
    description:
      "我给影评社做的官方网页，用来发布活动、收集影评、展示精选内容，并在活动后继续归档。",
    role: "网页开发 / 社团运营 / 内容维护",
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion", "Three.js"],
    type: ["Web 应用", "内容社区", "前端"],
    year: "2026",
    featured: false,
    coverGradient: "from-zinc-200/24 via-stone-500/22 to-neutral-950/82",
    coverImage: "/projects/film-club/film-club-case-hero.png",
    coverAlt: "Film club official website editorial screens",
  },
  {
    slug: "portfolio-site",
    title: "个人作品集站",
    description:
      "这个站本身也是一个练习：把项目截图、说明、技术栈和动效组织成一个能继续更新的作品集。",
    role: "产品规划 / 前端开发",
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "GSAP", "Three.js"],
    type: ["Web 应用", "作品集", "前端"],
    year: "2026",
    featured: false,
    coverGradient: "from-indigo-400/35 via-slate-600/30 to-zinc-950/75",
    coverImage: "/projects/portfolio/portfolio-case-hero.png",
    coverAlt: "Personal portfolio homepage and project showcase",
  },
  {
    slug: "creative-fan-site",
    title: "生日快乐沉浸式互动网站",
    description:
      "一个偏情绪化的生日互动页，用礼物开场、音乐、记忆走廊、玻璃票根和信件串起浏览体验。",
    role: "前端开发 / 交互设计 / 视觉动效",
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion", "GSAP", "Zustand"],
    type: ["创意互动", "Web 应用", "前端"],
    year: "2026",
    featured: false,
    coverGradient: "from-sky-300/34 via-violet-400/22 to-slate-950/82",
    coverImage: "/projects/birthday/birthday-case-hero.png",
    coverAlt: "Immersive birthday interaction website screens",
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
