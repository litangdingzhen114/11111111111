import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { ReactNode } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Layers,
  Sparkles,
  Target,
  User,
  Workflow,
} from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";
import { projects, getProjectBySlug, type Project } from "@/data/projects";
import { getProjectMDX, getAllProjectSlugs } from "@/lib/mdx";
import ProjectColorStory from "@/components/work/ProjectColorStory";
import { cn } from "@/lib/utils";

const mdxComponents = {};

function CaseImage({
  alt,
  className,
  priority = false,
  sizes = "(min-width: 1024px) 960px, 100vw",
  src,
}: {
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
  src: string;
}) {
  return (
    <Image
      src={src}
      alt={alt}
      width={1600}
      height={1000}
      priority={priority}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      sizes={sizes}
      className={className}
    />
  );
}

interface VisualProfile {
  eyebrow: string;
  primaryTitle: string;
  secondaryTitle: string;
  rows: string[];
  chips: string[];
  metricA: string;
  metricB: string;
}

const visualProfiles: Record<string, VisualProfile> = {
  "dtc-ai-agent": {
    eyebrow: "Agent Flow",
    primaryTitle: "Consumer Chat",
    secondaryTitle: "Merchant Console",
    rows: ["Intent: product recommendation", "Tool: order lookup", "Guardrail: human handoff"],
    chips: ["LangGraph", "MCP Tools", "RAG", "SSE"],
    metricA: "6 intents",
    metricB: "4+ guardrails",
  },
  "frieren-aigc-studio": {
    eyebrow: "AIGC Pipeline",
    primaryTitle: "Node Canvas",
    secondaryTitle: "Asset Timeline",
    rows: ["Script", "Character", "Storyboard", "Video Provider"],
    chips: ["Gemini", "Sora 2", "seedance", "Tauri"],
    metricA: "20+ works",
    metricB: "25w views",
  },
  "rehab-ai-miniprogram": {
    eyebrow: "Health Triage",
    primaryTitle: "Patient Profile",
    secondaryTitle: "Follow-up Report",
    rows: ["Pain score", "Training minutes", "Risk reminder"],
    chips: ["Kimi", "SSE", "Mini Program", "JSON"],
    metricA: "7-day report",
    metricB: "AI triage",
  },
  "lemanism-fashion-miniprogram": {
    eyebrow: "Commerce UI",
    primaryTitle: "Lookbook",
    secondaryTitle: "Checkout Flow",
    rows: ["Product card", "Cart", "Favorite", "AI try-on"],
    chips: ["WXML", "WXSS", "JavaScript", "Cache"],
    metricA: "Mini app",
    metricB: "Fashion retail",
  },
  "film-club-official-site": {
    eyebrow: "Community Site",
    primaryTitle: "Club Home",
    secondaryTitle: "Activity Archive",
    rows: ["Screening event", "Review collection", "Content update"],
    chips: ["React", "Vite", "CSS", "Content"],
    metricA: "Club ops",
    metricB: "Official page",
  },
  "creative-fan-site": {
    eyebrow: "Birthday Flow",
    primaryTitle: "Gift Opening",
    secondaryTitle: "Memory Corridor",
    rows: ["Ribbon gate", "Music unlock", "Ticket", "Letter"],
    chips: ["Next.js", "Motion", "Zustand", "Audio"],
    metricA: "4 chambers",
    metricB: "22 frames",
  },
};

const frierenVisuals = [
  {
    title: "Workflow overview",
    caption: "Script, storyboard and video generation are arranged as one visible production chain.",
    src: "/projects/frieren/frieren-workflow-overview.png",
  },
  {
    title: "Image node control",
    caption: "Prompt fields, aspect ratio, model choice and reference assets stay inside one node surface.",
    src: "/projects/frieren/image-generator-node-panel.png",
  },
  {
    title: "Batch generation",
    caption: "Repeated storyboard prompts can be handled as structured tasks instead of manual one-off prompts.",
    src: "/projects/frieren/image-generator-batch-mode.png",
  },
];

const dtcVisuals = [
  {
    title: "Product recommendation",
    caption: "Sensitive-skin, budget and fragrance constraints are routed into structured product search.",
    src: "/projects/dtc/dtc-chat-product.png",
  },
  {
    title: "Verified order lookup",
    caption: "Order status is shown only after order ID and checkout email are both present.",
    src: "/projects/dtc/dtc-chat-order-verified.png",
  },
  {
    title: "Coupon assist",
    caption: "Promotion logic is handled as a sales assist flow instead of a loose refund promise.",
    src: "/projects/dtc/dtc-chat-coupon.png",
  },
  {
    title: "Risk escalation",
    caption: "Reaction and urgent refund requests are escalated to a human review path.",
    src: "/projects/dtc/dtc-chat-escalation.png",
  },
];

const rehabVisuals = [
  {
    title: "Home service hub",
    caption: "首页把名医预约、AI 初筛、康复打卡和资料袋入口收束在一个轻量服务台。",
    src: "/projects/rehab/rehab-home.png",
  },
  {
    title: "Online intake",
    caption: "问诊前先收集起病时间、症状、功能受限、既往治疗和康复目标。",
    src: "/projects/rehab/rehab-consult.png",
  },
  {
    title: "AI triage assistant",
    caption: "Kimi 代理以流式对话完成资料补全，并输出可回写档案的结构化分诊结果。",
    src: "/projects/rehab/rehab-ai-assistant.png",
  },
  {
    title: "Rehab check-in",
    caption: "每日记录疼痛评分、训练时长、任务完成数和主观状态，方便复诊时查看变化。",
    src: "/projects/rehab/rehab-checkin.png",
  },
  {
    title: "Patient archive",
    caption: "患者侧持续维护症状、风险等级、康复目标与 AI 周报，减少复诊信息断层。",
    src: "/projects/rehab/rehab-profile.png",
  },
  {
    title: "Therapy plan library",
    caption: "理疗方案页用于承接训练内容、适用场景和后续医生复核入口。",
    src: "/projects/rehab/rehab-physio.png",
  },
];

const filmClubVisuals = [
  {
    title: "3D film-strip gateway",
    caption: "首页用可滚动的 3D 胶卷作为主题入口，让影评社官网一打开就有明确记忆点。",
    src: "/projects/film-club/film-club-home.png",
  },
  {
    title: "Review archive",
    caption: "影评库保存投稿内容，支持按标题、摘要和作者检索，活动结束后也能继续查阅。",
    src: "/projects/film-club/film-club-deafening-archive.png",
  },
  {
    title: "Little Me collection",
    caption: "围绕《小小的我》建立专题归档，把观影反馈从散落文档整理成可浏览内容。",
    src: "/projects/film-club/film-club-littleme-archive.png",
  },
  {
    title: "Film context page",
    caption: "关于页补充影片资料、主题词云和价值解读，帮助读者进入影评语境。",
    src: "/projects/film-club/film-club-about-content.png",
  },
  {
    title: "Article detail",
    caption: "详情页强调作者、班级、标签和正文阅读，让投稿作品拥有正式展示页面。",
    src: "/projects/film-club/film-club-detail.png",
  },
  {
    title: "AI learning track",
    caption: "在影评内容之外扩展 AI 学习栏目，验证同一套内容架构的复用能力。",
    src: "/projects/film-club/film-club-ai-learning.png",
  },
];

const birthdayVisuals = [
  {
    title: "Gift opening",
    caption: "首屏用照片拼贴、玻璃门和丝带按钮建立生日礼物的第一层仪式感。",
    src: "/projects/birthday/birthday-gift.png",
  },
  {
    title: "Audio unlock",
    caption: "音乐播放器把 Sparkle、歌词和下一环节按钮整合成真正的章节转场。",
    src: "/projects/birthday/birthday-sound.png",
  },
  {
    title: "Memory corridor",
    caption: "图片、视频、祝福文案、票根和信件卡片被放进同一个横向记忆空间。",
    src: "/projects/birthday/birthday-memory.png",
  },
  {
    title: "Blessing quote",
    caption: "祝福文案作为记忆走廊里的独立卡片，让互动节奏从浏览短暂转为阅读。",
    src: "/projects/birthday/birthday-quote.png",
  },
  {
    title: "Glass ticket",
    caption: "票根页让体验从持续推进进入短暂停顿，强化“被收藏的记忆”这个意象。",
    src: "/projects/birthday/birthday-ticket.png",
  },
  {
    title: "Final letter",
    caption: "最终页从大面积动效收束到安静阅读，让祝福文本成为最后的视觉中心。",
    src: "/projects/birthday/birthday-letter.png",
  },
  {
    title: "Mobile opening",
    caption: "移动端保持礼物门、照片拼贴和主按钮的节奏，避免首屏元素互相挤压。",
    src: "/projects/birthday/birthday-mobile.png",
  },
];

const lemanismVisuals = [
  {
    title: "Brand gateway",
    caption: "首页用春季系列主视觉、快速入口和热门商品，把品牌情绪先立起来。",
    src: "/projects/lemanism/lemanism-home.png",
  },
  {
    title: "Category shelf",
    caption: "分类页把商品、筛选标签和逛店建议放在同一层，降低移动端浏览成本。",
    src: "/projects/lemanism/lemanism-shop.png",
  },
  {
    title: "Product detail",
    caption: "详情页承接大图、商品信息、收藏、加入购物袋和立即购买等关键决策动作。",
    src: "/projects/lemanism/lemanism-product-detail.png",
  },
  {
    title: "Cart drawer",
    caption: "购物袋作为全局浮层出现，支持数量调整和合计金额，不打断当前页面上下文。",
    src: "/projects/lemanism/lemanism-cart.png",
  },
  {
    title: "Lookbook",
    caption: "穿搭页用内容化方式组织单品，让商品从货架回到真实搭配语境里。",
    src: "/projects/lemanism/lemanism-lookbook.png",
  },
  {
    title: "Brand events",
    caption: "活动页放线下企划、预约入口和品牌内容，让小程序不只是一个货架。",
    src: "/projects/lemanism/lemanism-events.png",
  },
  {
    title: "Member center",
    caption: "会员中心保存收藏、最近浏览和活动记录，也给后续推荐和试穿功能留出位置。",
    src: "/projects/lemanism/lemanism-profile.png",
  },
  {
    title: "AI try-on entry",
    caption: "AI 虚拟试衣入口先作为产品位占位，验证未来接入拍照量体和试穿能力的信息架构。",
    src: "/projects/lemanism/lemanism-ai-tryon.png",
  },
];

function getVisualProfile(project: Project) {
  return (
    visualProfiles[project.slug] ?? {
      eyebrow: "Product System",
      primaryTitle: "Experience Map",
      secondaryTitle: "Interface Study",
      rows: ["Discover", "Design", "Prototype", "Iterate"],
      chips: project.stack.slice(0, 4),
      metricA: project.year,
      metricB: project.type[0],
    }
  );
}

function FrierenOverviewMedia() {
  return (
    <section
      id="case-overview"
      data-project-theme="overview"
      className="project-scroll-section section-shell pb-10 sm:pb-14"
    >
      <div className="overflow-hidden rounded-[8px] border border-[var(--site-line)] bg-[#111312] shadow-[0_30px_90px_rgba(0,0,0,0.26)]">
        <CaseImage
          src="/projects/frieren/frieren-case-hero.png"
          alt="Frieren AI 短剧漫剧生产平台的工作流案例主视觉"
          priority
          className="block aspect-[16/8.4] w-full object-cover"
        />
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-3">
        {[
          ["20+ AIGC works", "围绕短剧/漫剧流程产出可发布内容"],
          ["25w peak views", "单条作品最高播放量验证内容方向"],
          ["8.5w likes", "用真实平台反馈反推工作流迭代"],
        ].map(([value, label]) => (
          <div
            key={value}
            className="rounded-[8px] border border-[var(--site-line)] bg-[var(--site-panel)] p-5"
          >
            <p className="text-3xl font-black text-[var(--site-text)]">{value}</p>
            <p className="mt-2 text-sm leading-6 text-[var(--site-text)]/55">{label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

const frierenCaseNavItems = [
  ["Overview", "#case-overview"],
  ["System", "#case-system"],
  ["Gallery", "#case-gallery"],
  ["Stack", "#case-stack"],
  ["Notes", "#case-notes"],
] as const;

function FrierenCaseNav() {
  return (
    <nav
      aria-label="Frieren case sections"
      className="section-shell project-scroll-section sticky top-[72px] z-20 hidden py-2 lg:block"
    >
      <div className="flex w-fit gap-2 rounded-full border border-[var(--site-line)] bg-[#050907]/72 p-1.5 shadow-[0_18px_54px_rgba(0,0,0,0.24)] backdrop-blur-xl">
        {frierenCaseNavItems.map(([label, href]) => (
          <a
            key={href}
            href={href}
            className="rounded-full px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-[var(--site-text)]/52 transition-colors hover:bg-white/10 hover:text-[var(--site-text)]"
          >
            {label}
          </a>
        ))}
      </div>
    </nav>
  );
}

function FrierenCaseStudyPanels() {
  return (
    <>
      <section
        id="case-system"
        data-project-theme="architecture"
        className="project-scroll-section section-shell border-y border-[var(--site-line)] py-10 sm:py-12"
      >
        <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="section-kicker">Product System</p>
            <h2 className="mt-4 max-w-xl text-3xl font-black tracking-tight text-[var(--site-text)] sm:text-5xl">
              把短剧创作拆成一步步能接上的节点
            </h2>
            <p className="mt-5 max-w-xl text-base leading-8 text-[var(--site-text)]/55">
              页面里的截图来自本地原型：画布负责摆放流程，节点记录每一步输入和结果，任务状态告诉创作者现在生成到哪里、失败了要怎么继续。
            </p>
          </div>

          <div className="overflow-hidden rounded-[8px] border border-[var(--site-line)] bg-[#111312]">
            <CaseImage
              src="/projects/frieren/frieren-case-system.png"
              alt="Frieren 工作流控制台、批量生图、参考图优化与主流程截图"
              className="block w-full object-cover"
            />
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {[
            ["节点拆分", "把创意、剧本、角色、分镜和视频生成拆成独立节点，让每一步的输入输出更清楚。"],
            ["生成调度", "围绕 Gemini、Sora 2、Seedance 2.0 规划模型选择、排队、失败重试和降级方案。"],
            ["素材复用", "让角色设定、参考图、分镜图和视频片段可以继续使用，而不是散落在聊天记录里。"],
          ].map(([title, copy]) => (
            <div
              key={title}
              className="rounded-[8px] border border-[var(--site-line)] bg-[var(--site-panel)] p-5"
            >
              <h3 className="text-lg font-black text-[var(--site-text)]">{title}</h3>
              <p className="mt-3 text-sm leading-7 text-[var(--site-text)]/55">{copy}</p>
            </div>
          ))}
        </div>
      </section>

      <section
        id="case-gallery"
        data-project-theme="impact"
        className="project-scroll-section project-heavy-media project-gallery-strip section-shell flex snap-x snap-mandatory gap-5 overflow-x-auto py-10 sm:gap-6 sm:py-12 lg:grid lg:grid-cols-3 lg:overflow-visible"
      >
        {frierenVisuals.map((item) => (
          <figure
            key={item.title}
            className="min-w-[82%] snap-start overflow-hidden rounded-[8px] border border-[var(--site-line)] bg-[var(--site-panel)] lg:min-w-0"
          >
            <div className="aspect-[4/3] overflow-hidden bg-black">
              <CaseImage
                src={item.src}
                alt={item.title}
                sizes="(min-width: 1024px) 31vw, 82vw"
                className="project-hover-lift h-full w-full object-cover opacity-90 transition-transform duration-700 hover:scale-[1.025]"
              />
            </div>
            <figcaption className="p-5">
              <p className="text-lg font-black text-[var(--site-text)]">{item.title}</p>
              <p className="mt-2 text-sm leading-6 text-[var(--site-text)]/55">
                {item.caption}
              </p>
            </figcaption>
          </figure>
        ))}
      </section>
    </>
  );
}

const dtcCaseNavItems = [
  ["Overview", "#case-overview"],
  ["System", "#case-system"],
  ["Gallery", "#case-gallery"],
  ["Stack", "#case-stack"],
  ["Notes", "#case-notes"],
] as const;

function DtcOverviewMedia() {
  return (
    <section
      id="case-overview"
      data-project-theme="overview"
      className="project-scroll-section section-shell pb-10 sm:pb-14"
    >
      <div className="overflow-hidden rounded-[8px] border border-[var(--site-line)] bg-[#111412] shadow-[0_30px_90px_rgba(0,0,0,0.26)]">
        <CaseImage
          src="/projects/dtc/dtc-case-hero.png"
          alt="DTC 电商 AI Agent 客服与导购原型案例主视觉"
          priority
          className="block aspect-[16/9] w-full object-cover"
        />
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-4">
        {[
          ["6 intents", "覆盖商品推荐、订单查询、优惠券、政策问答、投诉升级等路径"],
          ["6 commerce tools", "将商品、订单、政策、优惠券和升级记录拆成可控工具"],
          ["2 user surfaces", "同时设计消费者聊天端与商家运营看板"],
          ["4+ guardrails", "围绕隐私、退款、医疗功效和低置信度建立边界"],
        ].map(([value, label]) => (
          <div
            key={value}
            className="rounded-[8px] border border-[var(--site-line)] bg-[var(--site-panel)] p-5"
          >
            <p className="text-3xl font-black text-[var(--site-text)]">{value}</p>
            <p className="mt-2 text-sm leading-6 text-[var(--site-text)]/55">{label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function DtcCaseNav() {
  return (
    <nav
      aria-label="DTC case sections"
      className="section-shell project-scroll-section sticky top-[72px] z-20 hidden py-2 lg:block"
    >
      <div className="flex w-fit gap-2 rounded-full border border-[var(--site-line)] bg-[#050907]/72 p-1.5 shadow-[0_18px_54px_rgba(0,0,0,0.24)] backdrop-blur-xl">
        {dtcCaseNavItems.map(([label, href]) => (
          <a
            key={href}
            href={href}
            className="rounded-full px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-[var(--site-text)]/52 transition-colors hover:bg-white/10 hover:text-[var(--site-text)]"
          >
            {label}
          </a>
        ))}
      </div>
    </nav>
  );
}

function DtcCaseStudyPanels() {
  return (
    <>
      <section
        id="case-system"
        data-project-theme="architecture"
        className="project-scroll-section section-shell border-y border-[var(--site-line)] py-10 sm:py-12"
      >
        <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="section-kicker">Agent System</p>
            <h2 className="mt-4 max-w-xl text-3xl font-black tracking-tight text-[var(--site-text)] sm:text-5xl">
              让客服 Agent 知道什么时候该查、什么时候该停
            </h2>
            <p className="mt-5 max-w-xl text-base leading-8 text-[var(--site-text)]/55">
              这个项目不是单纯做一个聊天框。用户问政策、查订单、要优惠券、投诉升级时，Agent 需要先判断意图，再决定调用哪个工具；如果信息不够或风险太高，就停下来交给人工。
            </p>
          </div>

          <div className="overflow-hidden rounded-[8px] border border-[var(--site-line)] bg-[#111412]">
            <CaseImage
              src="/projects/dtc/dtc-case-system.png"
              alt="DTC AI Agent 从用户请求到工具调用、风险校验和运营分析的流程图"
              className="block w-full object-cover"
            />
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {[
            ["意图和工具分开", "政策问答、订单查询、商品推荐、优惠券和升级记录都走不同工具，减少模型乱编动作。"],
            ["敏感问题停一下", "订单查询要同时有订单号和邮箱；退款、医疗反应、低置信度问题都进入人工复核。"],
            ["商家能看到结果", "mock 看板会显示意图分布、升级率、优惠券触发、热门问题和推荐商品，方便判断哪里最常被问。"],
          ].map(([title, copy]) => (
            <div
              key={title}
              className="rounded-[8px] border border-[var(--site-line)] bg-[var(--site-panel)] p-5"
            >
              <h3 className="text-lg font-black text-[var(--site-text)]">{title}</h3>
              <p className="mt-3 text-sm leading-7 text-[var(--site-text)]/55">{copy}</p>
            </div>
          ))}
        </div>
      </section>

      <section
        id="case-gallery"
        data-project-theme="impact"
        className="project-scroll-section project-heavy-media project-gallery-strip section-shell flex snap-x snap-mandatory gap-5 overflow-x-auto py-10 sm:gap-6 sm:py-12 lg:grid lg:grid-cols-2 lg:overflow-visible"
      >
        {dtcVisuals.map((item) => (
          <figure
            key={item.title}
            className="min-w-[82%] snap-start overflow-hidden rounded-[8px] border border-[var(--site-line)] bg-[var(--site-panel)] lg:min-w-0"
          >
            <div className="aspect-[16/9] overflow-hidden bg-white">
              <CaseImage
                src={item.src}
                alt={item.title}
                sizes="(min-width: 1024px) 48vw, 82vw"
                className="project-hover-lift h-full w-full object-cover opacity-95 transition-transform duration-700 hover:scale-[1.025]"
              />
            </div>
            <figcaption className="p-5">
              <p className="text-lg font-black text-[var(--site-text)]">{item.title}</p>
              <p className="mt-2 text-sm leading-6 text-[var(--site-text)]/55">
                {item.caption}
              </p>
            </figcaption>
          </figure>
        ))}
      </section>
    </>
  );
}

const rehabCaseNavItems = [
  ["Overview", "#case-overview"],
  ["System", "#case-system"],
  ["Gallery", "#case-gallery"],
  ["Stack", "#case-stack"],
  ["Notes", "#case-notes"],
] as const;

function RehabOverviewMedia() {
  return (
    <section
      id="case-overview"
      data-project-theme="overview"
      className="project-scroll-section section-shell pb-10 sm:pb-14"
    >
      <div className="overflow-hidden rounded-[8px] border border-[var(--site-line)] bg-[#101615] shadow-[0_30px_90px_rgba(0,0,0,0.26)]">
        <CaseImage
          src="/projects/rehab/rehab-case-hero.png"
          alt="AI 康复分诊与随访管理小程序案例主视觉"
          priority
          className="block aspect-[16/9] w-full object-cover"
        />
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-4">
        {[
          ["8 pages", "覆盖首页、问诊、AI 助手、打卡、档案和理疗方案等页面"],
          ["AI triage JSON", "将风险等级、训练建议和就医指征结构化回写"],
          ["7-day report", "围绕疼痛、训练时长和任务完成情况生成随访复盘"],
          ["Risk alerts", "对高痛感、训练不足和连续异常状态进行提醒"],
        ].map(([value, label]) => (
          <div
            key={value}
            className="rounded-[8px] border border-[var(--site-line)] bg-[var(--site-panel)] p-5"
          >
            <p className="text-3xl font-black text-[var(--site-text)]">{value}</p>
            <p className="mt-2 text-sm leading-6 text-[var(--site-text)]/55">{label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function RehabCaseNav() {
  return (
    <nav
      aria-label="Rehab case sections"
      className="section-shell project-scroll-section sticky top-[72px] z-20 hidden py-2 lg:block"
    >
      <div className="flex w-fit gap-2 rounded-full border border-[var(--site-line)] bg-[#06100f]/72 p-1.5 shadow-[0_18px_54px_rgba(0,0,0,0.24)] backdrop-blur-xl">
        {rehabCaseNavItems.map(([label, href]) => (
          <a
            key={href}
            href={href}
            className="rounded-full px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-[var(--site-text)]/52 transition-colors hover:bg-white/10 hover:text-[var(--site-text)]"
          >
            {label}
          </a>
        ))}
      </div>
    </nav>
  );
}

function RehabCaseStudyPanels() {
  return (
    <>
      <section
        id="case-system"
        data-project-theme="architecture"
        className="project-scroll-section section-shell border-y border-[var(--site-line)] py-10 sm:py-12"
      >
        <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="section-kicker">Care Loop</p>
            <h2 className="mt-4 max-w-xl text-3xl font-black tracking-tight text-[var(--site-text)] sm:text-5xl">
              把康复记录、初筛和随访放到一个小程序里
            </h2>
            <p className="mt-5 max-w-xl text-base leading-8 text-[var(--site-text)]/55">
              康复不是问完一次就结束。这个原型让患者先补充资料，再做 AI 初筛和训练打卡；系统根据疼痛、训练时长和异常情况提醒风险，并生成 7 天周报给医生复核。
            </p>
          </div>

          <div className="overflow-hidden rounded-[8px] border border-[var(--site-line)] bg-[#101615]">
            <CaseImage
              src="/projects/rehab/rehab-case-system.png"
              alt="AI 康复小程序从患者档案、在线问诊到 AI 初筛、打卡和风险提醒的流程展示"
              className="block w-full object-cover"
            />
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {[
            ["资料袋与分诊材料", "先把起病时间、症状、功能受限、既往治疗和康复目标整理好，医生复核时不用到处找信息。"],
            ["AI 初筛结果", "通过后端代理接入 Kimi/Moonshot，前端不暴露 Key，并把风险等级、训练建议和就医指征写回档案。"],
            ["随访打卡与风险提醒", "围绕疼痛评分、训练时长、任务完成数和主观状态建立规则，触发异常提醒并生成 7 天周报。"],
          ].map(([title, copy]) => (
            <div
              key={title}
              className="rounded-[8px] border border-[var(--site-line)] bg-[var(--site-panel)] p-5"
            >
              <h3 className="text-lg font-black text-[var(--site-text)]">{title}</h3>
              <p className="mt-3 text-sm leading-7 text-[var(--site-text)]/55">{copy}</p>
            </div>
          ))}
        </div>
      </section>

      <section
        id="case-gallery"
        data-project-theme="impact"
        className="project-scroll-section project-heavy-media project-gallery-strip section-shell flex snap-x snap-mandatory scroll-px-5 gap-5 overflow-x-auto py-10 sm:scroll-px-8 sm:gap-6 sm:py-12 xl:grid xl:grid-cols-3 xl:scroll-px-0 xl:overflow-visible"
      >
        {rehabVisuals.map((item) => (
          <figure
            key={item.title}
            className="min-w-[72%] snap-start overflow-hidden rounded-[8px] border border-[var(--site-line)] bg-[var(--site-panel)] sm:min-w-[44%] xl:min-w-0"
          >
            <div className="aspect-[9/16] overflow-hidden bg-[linear-gradient(145deg,rgba(212,237,226,0.16),rgba(6,14,14,0.94))] p-3">
              <CaseImage
                src={item.src}
                alt={item.title}
                sizes="(min-width: 1280px) 31vw, 82vw"
                className="project-hover-lift h-full w-full rounded-[6px] object-contain transition-transform duration-700 hover:scale-[1.018]"
              />
            </div>
            <figcaption className="p-5">
              <p className="text-lg font-black text-[var(--site-text)]">{item.title}</p>
              <p className="mt-2 text-sm leading-6 text-[var(--site-text)]/55">
                {item.caption}
              </p>
            </figcaption>
          </figure>
        ))}
      </section>
    </>
  );
}

const filmClubCaseNavItems = [
  ["Overview", "#case-overview"],
  ["System", "#case-system"],
  ["Gallery", "#case-gallery"],
  ["Stack", "#case-stack"],
  ["Notes", "#case-notes"],
] as const;

function FilmClubOverviewMedia() {
  return (
    <section
      id="case-overview"
      data-project-theme="overview"
      className="project-scroll-section section-shell pb-10 sm:pb-14"
    >
      <div className="overflow-hidden rounded-[8px] border border-[var(--site-line)] bg-[#111111] shadow-[0_30px_90px_rgba(0,0,0,0.26)]">
        <CaseImage
          src="/projects/film-club/film-club-case-hero.png"
          alt="影评社官方网页案例主视觉"
          priority
          className="block aspect-[16/9] w-full object-cover"
        />
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-4">
        {[
          ["4 tracks", "覆盖《震耳欲聋》《雷锋》《小小的我》和 AI Learning 内容入口"],
          ["70+ records", "将活动投稿、影评和长文整理成可检索内容库"],
          ["Live site", "线上地址：www.sunmaosun.com"],
          ["GitHub", "仓库：litangdingzhen114/film-club"],
        ].map(([value, label]) => (
          <div
            key={value}
            className="rounded-[8px] border border-[var(--site-line)] bg-[var(--site-panel)] p-5"
          >
            <p className="text-3xl font-black text-[var(--site-text)]">{value}</p>
            <p className="mt-2 text-sm leading-6 text-[var(--site-text)]/55">{label}</p>
          </div>
        ))}
      </div>

      <div className="mt-5 flex flex-wrap gap-3">
        <a
          href="https://www.sunmaosun.com"
          target="_blank"
          rel="noreferrer"
          className="rounded-full bg-white px-5 py-3 text-xs font-bold uppercase tracking-[0.14em] text-[#121212] transition-transform hover:-translate-y-0.5"
        >
          Visit Site
        </a>
        <a
          href="https://github.com/litangdingzhen114/film-club"
          target="_blank"
          rel="noreferrer"
          className="rounded-full border border-white/15 px-5 py-3 text-xs font-bold uppercase tracking-[0.14em] text-[var(--site-muted)] transition-colors hover:border-white/35 hover:text-[var(--site-text)]"
        >
          GitHub Repo
        </a>
      </div>
    </section>
  );
}

function FilmClubCaseNav() {
  return (
    <nav
      aria-label="Film club case sections"
      className="section-shell project-scroll-section sticky top-[72px] z-20 hidden py-2 lg:block"
    >
      <div className="flex w-fit gap-2 rounded-full border border-[var(--site-line)] bg-[#080808]/72 p-1.5 shadow-[0_18px_54px_rgba(0,0,0,0.24)] backdrop-blur-xl">
        {filmClubCaseNavItems.map(([label, href]) => (
          <a
            key={href}
            href={href}
            className="rounded-full px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-[var(--site-text)]/52 transition-colors hover:bg-white/10 hover:text-[var(--site-text)]"
          >
            {label}
          </a>
        ))}
      </div>
    </nav>
  );
}

function FilmClubCaseStudyPanels() {
  return (
    <>
      <section
        id="case-system"
        data-project-theme="architecture"
        className="project-scroll-section section-shell border-y border-[var(--site-line)] py-10 sm:py-12"
      >
        <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="section-kicker">Content System</p>
            <h2 className="mt-4 max-w-xl text-3xl font-black tracking-tight text-[var(--site-text)] sm:text-5xl">
              把社团活动做成可持续更新的内容运营入口
            </h2>
            <p className="mt-5 max-w-xl text-base leading-8 text-[var(--site-text)]/55">
              这个项目不是只做一个静态介绍页，而是把观影活动、影评征集、精选展示、全文归档和专题扩展串成一套可复用结构。
              每次活动产生的文字都能进入同一套内容系统，被检索、被阅读，也能继续服务下一次社团宣传。
            </p>
          </div>

          <div className="overflow-hidden rounded-[8px] border border-[var(--site-line)] bg-[#111111]">
            <CaseImage
              src="/projects/film-club/film-club-case-system.png"
              alt="影评社官网从观影活动到归档检索的内容结构展示"
              className="block w-full object-cover"
            />
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {[
            ["活动传播入口", "用 3D 胶卷首页承接主题选择，让观影活动、专题栏目和社团品牌形成统一入口。"],
            ["投稿归档检索", "把散落的影评文档整理成结构化数据，提供精选、列表、搜索和详情阅读路径。"],
            ["长期内容维护", "同一套页面结构可以继续承接新片单、新活动和 AI 学习文章，减少后续更新成本。"],
          ].map(([title, copy]) => (
            <div
              key={title}
              className="rounded-[8px] border border-[var(--site-line)] bg-[var(--site-panel)] p-5"
            >
              <h3 className="text-lg font-black text-[var(--site-text)]">{title}</h3>
              <p className="mt-3 text-sm leading-7 text-[var(--site-text)]/55">{copy}</p>
            </div>
          ))}
        </div>
      </section>

      <section
        id="case-gallery"
        data-project-theme="impact"
        className="project-scroll-section project-heavy-media project-gallery-strip section-shell flex snap-x snap-mandatory scroll-px-5 gap-5 overflow-x-auto py-10 sm:scroll-px-8 sm:gap-6 sm:py-12 lg:grid lg:grid-cols-2 lg:scroll-px-0 lg:overflow-visible"
      >
        {filmClubVisuals.map((item) => (
          <figure
            key={item.title}
            className="min-w-[82%] snap-start overflow-hidden rounded-[8px] border border-[var(--site-line)] bg-[var(--site-panel)] lg:min-w-0"
          >
            <div className="aspect-[16/10] overflow-hidden bg-black">
              <CaseImage
                src={item.src}
                alt={item.title}
                sizes="(min-width: 1024px) 48vw, 82vw"
                className="project-hover-lift h-full w-full object-cover opacity-95 transition-transform duration-700 hover:scale-[1.025]"
              />
            </div>
            <figcaption className="p-5">
              <p className="text-lg font-black text-[var(--site-text)]">{item.title}</p>
              <p className="mt-2 text-sm leading-6 text-[var(--site-text)]/55">
                {item.caption}
              </p>
            </figcaption>
          </figure>
        ))}
      </section>
    </>
  );
}

const birthdayCaseNavItems = [
  ["Overview", "#case-overview"],
  ["System", "#case-system"],
  ["Gallery", "#case-gallery"],
  ["Stack", "#case-stack"],
  ["Notes", "#case-notes"],
] as const;

function BirthdayOverviewMedia() {
  return (
    <section
      id="case-overview"
      data-project-theme="overview"
      className="project-scroll-section section-shell pb-10 sm:pb-14"
    >
      <div className="overflow-hidden rounded-[8px] border border-[var(--site-line)] bg-[#07121f] shadow-[0_30px_90px_rgba(0,0,0,0.26)]">
        <CaseImage
          src="/projects/birthday/birthday-case-hero.png"
          alt="生日快乐沉浸式互动网站案例主视觉"
          priority
          className="block aspect-[16/9] w-full object-cover"
        />
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-4">
        {[
          ["4 chambers", "礼物开场、记忆走廊、玻璃票根和最终信件形成完整章节"],
          ["22 frames", "用 22 张照片建立首屏拼贴和生日礼物的情绪入口"],
          ["Sparkle audio", "播放器、歌词和下一环节按钮共同承担音乐解锁"],
          ["Mobile ready", "窄屏保留主视觉、操作按钮和章节节奏"],
        ].map(([value, label]) => (
          <div
            key={value}
            className="rounded-[8px] border border-[var(--site-line)] bg-[var(--site-panel)] p-5"
          >
            <p className="text-3xl font-black text-[var(--site-text)]">{value}</p>
            <p className="mt-2 text-sm leading-6 text-[var(--site-text)]/55">{label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function BirthdayCaseNav() {
  return (
    <nav
      aria-label="Birthday case sections"
      className="section-shell project-scroll-section sticky top-[72px] z-20 hidden py-2 lg:block"
    >
      <div className="flex w-fit gap-2 rounded-full border border-[var(--site-line)] bg-[#06111f]/72 p-1.5 shadow-[0_18px_54px_rgba(0,0,0,0.24)] backdrop-blur-xl">
        {birthdayCaseNavItems.map(([label, href]) => (
          <a
            key={href}
            href={href}
            className="rounded-full px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-[var(--site-text)]/52 transition-colors hover:bg-white/10 hover:text-[var(--site-text)]"
          >
            {label}
          </a>
        ))}
      </div>
    </nav>
  );
}

function BirthdayCaseStudyPanels() {
  return (
    <>
      <section
        id="case-system"
        data-project-theme="architecture"
        className="project-scroll-section section-shell border-y border-[var(--site-line)] py-10 sm:py-12"
      >
        <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="section-kicker">Experience Flow</p>
            <h2 className="mt-4 max-w-xl text-3xl font-black tracking-tight text-[var(--site-text)] sm:text-5xl">
              把生日祝福拆成可推进、可停顿、可阅读的情绪章节
            </h2>
            <p className="mt-5 max-w-xl text-base leading-8 text-[var(--site-text)]/55">
              这个页面不是单张贺图，而是一条有状态的互动路径：礼物门负责进入，音乐播放器负责解锁，
              记忆走廊负责浏览，票根负责制造仪式停顿，最终信件把注意力收回到祝福文本。
            </p>
          </div>

          <div className="overflow-hidden rounded-[8px] border border-[var(--site-line)] bg-[#07121f]">
            <CaseImage
              src="/projects/birthday/birthday-case-system.png"
              alt="生日互动网站从礼物开场到音乐解锁、记忆走廊、票根和信件的体验结构图"
              className="block w-full object-cover"
            />
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {[
            ["状态驱动叙事", "用 Zustand 管理 loading、当前章节、音乐播放和互动状态，让视觉动效背后有清晰流程。"],
            ["音乐作为转场", "播放器不只是装饰，而是把歌词、唱片、进度和下一环节按钮整合成章节解锁动作。"],
            ["多端交互控制", "兼容滚轮、方向键、Enter、Space 和触摸滑动，并为移动端首屏和歌词视图做单独适配。"],
          ].map(([title, copy]) => (
            <div
              key={title}
              className="rounded-[8px] border border-[var(--site-line)] bg-[var(--site-panel)] p-5"
            >
              <h3 className="text-lg font-black text-[var(--site-text)]">{title}</h3>
              <p className="mt-3 text-sm leading-7 text-[var(--site-text)]/55">{copy}</p>
            </div>
          ))}
        </div>
      </section>

      <section
        id="case-gallery"
        data-project-theme="impact"
        className="project-scroll-section project-heavy-media project-gallery-strip section-shell flex snap-x snap-mandatory scroll-px-5 gap-5 overflow-x-auto py-10 sm:scroll-px-8 sm:gap-6 sm:py-12 lg:grid lg:grid-cols-2 lg:scroll-px-0 lg:overflow-visible"
      >
        {birthdayVisuals.map((item) => {
          const isMobile = item.src.includes("mobile");
          return (
            <figure
              key={item.title}
              className="min-w-[82%] snap-start overflow-hidden rounded-[8px] border border-[var(--site-line)] bg-[var(--site-panel)] lg:min-w-0"
            >
              <div
                className={cn(
                  "overflow-hidden bg-[#07121f]",
                  isMobile
                    ? "aspect-[9/16] p-3 sm:aspect-[3/4]"
                    : "aspect-[16/10]"
                )}
              >
                <CaseImage
                  src={item.src}
                  alt={item.title}
                  sizes="(min-width: 1024px) 48vw, 82vw"
                  className={cn(
                    "project-hover-lift h-full w-full transition-transform duration-700 hover:scale-[1.025]",
                    isMobile ? "rounded-[6px] object-contain" : "object-cover opacity-95"
                  )}
                />
              </div>
              <figcaption className="p-5">
                <p className="text-lg font-black text-[var(--site-text)]">{item.title}</p>
                <p className="mt-2 text-sm leading-6 text-[var(--site-text)]/55">
                  {item.caption}
                </p>
              </figcaption>
            </figure>
          );
        })}
      </section>
    </>
  );
}

function LemanismOverviewMedia() {
  return (
    <section
      id="case-overview"
      data-project-theme="overview"
      className="project-scroll-section section-shell pb-10 sm:pb-14"
    >
      <div className="overflow-hidden rounded-[8px] border border-[var(--site-line)] bg-[#132019] shadow-[0_30px_90px_rgba(0,0,0,0.26)]">
        <CaseImage
          src="/projects/lemanism/lemanism-case-hero.png"
          alt="LEMANISM 时尚电商小程序案例主视觉"
          priority
          className="block aspect-[16/8.8] w-full object-cover"
        />
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-4">
        {[
          ["5 tabs", "首页、分类、穿搭、活动、我的组成底部主导航"],
          ["10 SKUs", "覆盖夹克、卫衣、T 恤、裤装与配件"],
          ["4 records", "购物袋、收藏、最近浏览和活动预约都有记录"],
          ["AI entry", "预留虚拟试衣、量体和形象诊断能力入口"],
        ].map(([value, label]) => (
          <div
            key={value}
            className="rounded-[8px] border border-[var(--site-line)] bg-[var(--site-panel)] p-5"
          >
            <p className="text-3xl font-black text-[var(--site-text)]">{value}</p>
            <p className="mt-2 text-sm leading-6 text-[var(--site-text)]/55">{label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

const lemanismCaseNavItems = [
  ["Overview", "#case-overview"],
  ["System", "#case-system"],
  ["Gallery", "#case-gallery"],
  ["Stack", "#case-stack"],
  ["Notes", "#case-notes"],
] as const;

function LemanismCaseNav() {
  return (
    <nav
      aria-label="LEMANISM case sections"
      className="section-shell project-scroll-section sticky top-[72px] z-20 hidden py-2 lg:block"
    >
      <div className="flex w-fit gap-2 rounded-full border border-[var(--site-line)] bg-[#101d15]/72 p-1.5 shadow-[0_18px_54px_rgba(0,0,0,0.24)] backdrop-blur-xl">
        {lemanismCaseNavItems.map(([label, href]) => (
          <a
            key={href}
            href={href}
            className="rounded-full px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-[var(--site-text)]/52 transition-colors hover:bg-white/10 hover:text-[var(--site-text)]"
          >
            {label}
          </a>
        ))}
      </div>
    </nav>
  );
}

function LemanismCaseStudyPanels() {
  return (
    <>
      <section
        id="case-system"
        data-project-theme="architecture"
        className="project-scroll-section section-shell border-y border-[var(--site-line)] py-10 sm:py-12"
      >
        <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="section-kicker">Commerce Flow</p>
            <h2 className="mt-4 max-w-xl text-3xl font-black tracking-tight text-[var(--site-text)] sm:text-5xl">
              在微信里做一个更像品牌店的小程序
            </h2>
            <p className="mt-5 max-w-xl text-base leading-8 text-[var(--site-text)]/55">
              LEMANISM 的重点不是堆一个复杂商城，而是在微信里做一个更轻的购物体验：
              首页建立品牌情绪，分类页完成浏览，详情页推动决策，购物袋保持转化入口，
              Lookbook、活动和会员中心负责把内容、预约和浏览记录留住。
            </p>
          </div>

          <div className="overflow-hidden rounded-[8px] border border-[var(--site-line)] bg-[#132019]">
            <CaseImage
              src="/projects/lemanism/lemanism-case-system.png"
              alt="LEMANISM 小程序从品牌入口、商品分类、详情页、购物袋到会员与 AI 入口的体验流程图"
              className="block w-full object-cover"
            />
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {[
            ["内容先行", "首页、Lookbook 和活动页先给出品牌感觉，让用户不是从冷冰冰的货架开始浏览。"],
            ["转化不断线", "商品详情和购物袋用固定底部操作与浮层承接购买动作，避免在页面跳转里丢失意图。"],
            ["记录留住", "收藏、最近浏览和活动预约写入本地记录，为会员中心、推荐和 AI 试穿扩展留下位置。"],
          ].map(([title, copy]) => (
            <div
              key={title}
              className="rounded-[8px] border border-[var(--site-line)] bg-[var(--site-panel)] p-5"
            >
              <h3 className="text-lg font-black text-[var(--site-text)]">{title}</h3>
              <p className="mt-3 text-sm leading-7 text-[var(--site-text)]/55">{copy}</p>
            </div>
          ))}
        </div>
      </section>

      <section
        id="case-gallery"
        data-project-theme="impact"
        className="project-scroll-section project-heavy-media project-gallery-strip section-shell flex snap-x snap-mandatory scroll-px-5 gap-5 overflow-x-auto py-10 sm:scroll-px-8 sm:gap-6 sm:py-12 lg:grid lg:grid-cols-4 lg:scroll-px-0 lg:overflow-visible xl:grid-cols-5"
      >
        {lemanismVisuals.map((item) => (
          <figure
            key={item.title}
            className="min-w-[74%] snap-start overflow-hidden rounded-[8px] border border-[var(--site-line)] bg-[var(--site-panel)] sm:min-w-[44%] lg:min-w-0"
          >
            <div className="aspect-[9/19] overflow-hidden bg-[#101d15] p-3">
              <CaseImage
                src={item.src}
                alt={item.title}
                sizes="(min-width: 1024px) 18vw, 82vw"
                className="project-hover-lift h-full w-full rounded-[6px] object-contain transition-transform duration-700 hover:scale-[1.025]"
              />
            </div>
            <figcaption className="p-5">
              <p className="text-lg font-black text-[var(--site-text)]">{item.title}</p>
              <p className="mt-2 text-sm leading-6 text-[var(--site-text)]/55">
                {item.caption}
              </p>
            </figcaption>
          </figure>
        ))}
      </section>
    </>
  );
}

function ProjectMockup({
  project,
  variant,
}: {
  project: Project;
  variant: "primary" | "secondary";
}) {
  const profile = getVisualProfile(project);
  const isPrimary = variant === "primary";

  return (
    <div
      className={cn(
        "relative min-h-[330px] overflow-hidden rounded-[8px] border border-[var(--site-line)] bg-[var(--device-shell)] sm:min-h-[440px]",
        isPrimary ? "lg:min-h-[620px]" : "lg:min-h-[520px]"
      )}
    >
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-br opacity-80",
          project.coverGradient
        )}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(255,255,255,0.18),transparent_34%),linear-gradient(180deg,rgba(0,0,0,0.08),rgba(0,0,0,0.74))]" />
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-[linear-gradient(145deg,rgba(0,0,0,0.86),rgba(0,0,0,0.2))]" />

      <div className="relative flex h-full min-h-[inherit] items-center justify-center p-4 sm:p-8">
        {isPrimary ? (
          <div className="theme-device w-full max-w-[292px] rounded-[28px] border border-white/20 bg-black p-2.5 shadow-[0_24px_60px_rgba(0,0,0,0.32)] sm:max-w-[360px] sm:rotate-[-5deg] sm:rounded-[32px] sm:p-3">
            <div className="rounded-[20px] border border-[var(--site-line)] bg-[#0b0c0d] p-3 sm:rounded-[24px] sm:p-4">
              <div className="mx-auto mb-4 h-4 w-20 rounded-full bg-white/10 sm:mb-5 sm:h-5 sm:w-24" />
              <div className="mb-4 flex items-center justify-between sm:mb-5">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[var(--site-accent-2)]">
                    {profile.eyebrow}
                  </p>
                  <h2 className="mt-1 text-lg font-black text-[var(--site-text)] sm:text-xl">
                    {profile.primaryTitle}
                  </h2>
                </div>
                <Sparkles size={18} className="text-[var(--site-text)]/60" />
              </div>
              <div className="space-y-3">
                {profile.rows.map((row, index) => (
                  <div
                    key={row}
                    className="rounded-[6px] border border-[var(--site-line)] bg-[var(--site-panel-hover)] p-2.5 sm:p-3"
                  >
                    <div className="flex items-center gap-2">
                      <span className="grid h-5 w-5 place-items-center rounded-full bg-white text-[10px] font-black text-black">
                        {index + 1}
                      </span>
                      <p className="text-xs font-semibold text-[var(--site-text)]/80">{row}</p>
                    </div>
                    <div className="mt-3 h-1.5 rounded-full bg-white/10">
                      <div
                        className="h-full rounded-full bg-[var(--site-accent-2)]"
                        style={{ width: `${52 + index * 12}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="theme-device w-full max-w-[720px] rounded-[8px] border border-[var(--site-line)] bg-black/90 p-3 shadow-[0_24px_60px_rgba(0,0,0,0.32)] sm:p-4">
            <div className="grid gap-4 md:grid-cols-[150px_minmax(0,1fr)]">
              <div className="rounded-[6px] border border-[var(--site-line)] bg-[var(--site-panel-hover)] p-4">
                <p className="text-lg font-black text-[var(--site-text)]">
                  {project.title.slice(0, 10)}
                </p>
                <div className="mt-8 space-y-3">
                  {["Overview", "Flow", "Data", "Export"].map((item, index) => (
                    <div
                      key={item}
                      className={cn(
                        "rounded-[4px] px-3 py-2 text-xs font-semibold",
                        index === 1
                          ? "bg-white text-black"
                          : "bg-white/[0.08] text-[var(--site-text)]/65"
                      )}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  {[profile.metricA, profile.metricB].map((metric) => (
                    <div
                      key={metric}
                      className="rounded-[6px] border border-[var(--site-line)] bg-[var(--site-panel-hover)] p-3 sm:p-4"
                    >
                      <p className="text-xs text-[var(--site-text)]/45">Metric</p>
                      <p className="mt-4 text-xl font-black text-[var(--site-text)] sm:mt-5 sm:text-2xl">
                        {metric}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="rounded-[6px] border border-[var(--site-line)] bg-[var(--site-panel-hover)] p-4">
                  <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-xl font-black text-[var(--site-text)] sm:text-2xl">
                      {profile.secondaryTitle}
                    </h2>
                    <span className="rounded-full bg-[var(--site-accent-2)] px-3 py-1 text-xs font-black text-black">
                      Live
                    </span>
                  </div>
                  <div className="space-y-2">
                    {profile.chips.map((chip, index) => (
                      <div
                        key={chip}
                        className="flex items-center gap-3 rounded-[4px] bg-black/50 p-3"
                      >
                        <span className="h-2 w-2 rounded-full bg-[var(--site-accent-2)]" />
                        <span className="text-sm font-semibold text-[var(--site-text)]/80">
                          {chip}
                        </span>
                        <span className="ml-auto font-mono text-xs text-[var(--site-text)]/35">
                          0{index + 1}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function InfoCell({
  icon,
  label,
  children,
}: {
  icon: ReactNode;
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="border-t border-[var(--site-line)] py-5">
      <div className="mb-3 flex items-center gap-2 text-[var(--site-text)]/45">
        {icon}
        <span className="text-xs font-bold uppercase tracking-[0.2em]">
          {label}
        </span>
      </div>
      {children}
    </div>
  );
}

function ProjectPager({
  prev,
  next,
}: {
  prev: Project | null;
  next: Project | null;
}) {
  return (
    <section
      data-project-theme="next"
      className="section-shell grid gap-4 border-t border-[var(--site-line)] py-12 sm:grid-cols-2"
    >
      {prev ? (
        <Link
          href={`/work/${prev.slug}`}
          className="group rounded-[8px] border border-[var(--site-line)] bg-white/[0.03] p-5 transition-colors hover:border-[color:var(--site-accent-2)]"
        >
          <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[var(--site-text)]/45">
            <ArrowLeft size={14} /> 上一个
          </span>
          <p className="mt-4 text-lg font-black text-[var(--site-text)] transition-colors group-hover:text-[var(--site-accent-2)]">
            {prev.title}
          </p>
        </Link>
      ) : (
        <div />
      )}
      {next ? (
        <Link
          href={`/work/${next.slug}`}
          className="group rounded-[8px] border border-[var(--site-line)] bg-white/[0.03] p-5 text-right transition-colors hover:border-[color:var(--site-accent-2)]"
        >
          <span className="flex items-center justify-end gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[var(--site-text)]/45">
            下一个 <ArrowRight size={14} />
          </span>
          <p className="mt-4 text-lg font-black text-[var(--site-text)] transition-colors group-hover:text-[var(--site-accent-2)]">
            {next.title}
          </p>
        </Link>
      ) : (
        <div />
      )}
    </section>
  );
}

export function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Project Not Found" };

  return {
    title: project.title,
    description: project.description,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  const mdx = getProjectMDX(slug);

  if (!project || !mdx) notFound();

  const currentIndex = projects.findIndex((p) => p.slug === slug);
  const prev = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const next =
    currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;
  const projectNumber = String(currentIndex + 1).padStart(2, "0");
  const hasCaseSections =
    project.slug === "frieren-aigc-studio" ||
    project.slug === "dtc-ai-agent" ||
    project.slug === "rehab-ai-miniprogram" ||
    project.slug === "film-club-official-site" ||
    project.slug === "creative-fan-site" ||
    project.slug === "lemanism-fashion-miniprogram";

  if (mdx.frontmatter.customLayout) {
    return (
      <ProjectColorStory>
        <div className="min-h-[100svh] pt-24 text-gray-300">
          <MDXRemote source={mdx.content} components={mdxComponents} />
          <ProjectPager prev={prev} next={next} />
        </div>
      </ProjectColorStory>
    );
  }

  return (
    <ProjectColorStory>
      <div className="pt-24">
        <section
          data-project-theme="hero"
          className="section-shell py-8 sm:py-10 lg:min-h-[620px] lg:py-12"
        >
          <Link
            href="/work"
            className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-[var(--site-text)]/50 transition-colors hover:text-[var(--site-text)] sm:mb-8"
          >
            <ArrowLeft size={15} />
            返回作品列表
          </Link>

          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.08fr)_420px] lg:items-end">
            <div>
              <div className="mb-6 flex flex-wrap items-center gap-3">
                <span className="font-mono text-sm text-[var(--site-accent-2)]">
                  CASE {projectNumber}
                </span>
                {project.type.map((type) => (
                  <span
                    key={type}
                    className="rounded-full border border-[var(--site-line)] px-3 py-1 text-xs font-semibold text-[var(--site-text)]/60"
                  >
                    {type}
                  </span>
                ))}
              </div>

              <h1 className="max-w-5xl break-words text-[clamp(2.55rem,11vw,4.6rem)] font-black leading-[0.96] tracking-tight text-[var(--site-text)] sm:text-6xl lg:text-7xl">
                {project.title}
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-[var(--site-text)]/60 sm:mt-6 sm:text-lg sm:leading-8">
                {project.description}
              </p>
            </div>

            <aside className="rounded-[8px] border border-[var(--site-line)] bg-[var(--site-panel)] p-5 sm:p-6">
              <InfoCell icon={<User size={15} />} label="Role">
                <p className="text-base font-bold text-[var(--site-text)]">{project.role}</p>
              </InfoCell>
              <InfoCell icon={<Calendar size={15} />} label="Year">
                <p className="text-base font-bold text-[var(--site-text)]">{project.year}</p>
              </InfoCell>
              <InfoCell icon={<Target size={15} />} label="Focus">
                <p className="text-sm leading-7 text-[var(--site-text)]/60">
                  需求拆解、页面原型、接口接入和后续修改
                </p>
              </InfoCell>
            </aside>
          </div>
        </section>

        {project.slug === "frieren-aigc-studio" ? (
          <>
            <FrierenOverviewMedia />
            <FrierenCaseNav />
            <FrierenCaseStudyPanels />
          </>
        ) : project.slug === "dtc-ai-agent" ? (
          <>
            <DtcOverviewMedia />
            <DtcCaseNav />
            <DtcCaseStudyPanels />
          </>
        ) : project.slug === "rehab-ai-miniprogram" ? (
          <>
            <RehabOverviewMedia />
            <RehabCaseNav />
            <RehabCaseStudyPanels />
          </>
        ) : project.slug === "film-club-official-site" ? (
          <>
            <FilmClubOverviewMedia />
            <FilmClubCaseNav />
            <FilmClubCaseStudyPanels />
          </>
        ) : project.slug === "creative-fan-site" ? (
          <>
            <BirthdayOverviewMedia />
            <BirthdayCaseNav />
            <BirthdayCaseStudyPanels />
          </>
        ) : project.slug === "lemanism-fashion-miniprogram" ? (
          <>
            <LemanismOverviewMedia />
            <LemanismCaseNav />
            <LemanismCaseStudyPanels />
          </>
        ) : (
          <section
            data-project-theme="overview"
            className="section-shell grid gap-5 pb-10 sm:gap-6 sm:pb-14 lg:grid-cols-2"
          >
            <ProjectMockup project={project} variant="primary" />
            <ProjectMockup project={project} variant="secondary" />
          </section>
        )}

        <section
          id={hasCaseSections ? "case-stack" : undefined}
          data-project-theme="build"
          className="project-scroll-section section-shell grid gap-8 border-y border-[var(--site-line)] py-10 sm:gap-10 sm:py-12 lg:grid-cols-[0.74fr_1.26fr] lg:items-start"
        >
          <div>
            <p className="section-kicker">Tool Stack</p>
            <h2 className="mt-4 text-3xl font-black tracking-tight text-[var(--site-text)] sm:text-5xl">
              这版原型用了什么
            </h2>
            <p className="mt-5 max-w-xl text-base leading-8 text-[var(--site-text)]/55">
              前端负责把体验做出来，后端负责接接口和数据。技术不单独炫技，只服务于这个原型能不能跑起来。
            </p>
          </div>

          <div className="flex flex-wrap gap-3 lg:justify-end">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="rounded-full bg-white px-4 py-2.5 text-xs font-bold text-[#121212] sm:px-5 sm:py-3 sm:text-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        </section>

        <section
          id={hasCaseSections ? "case-notes" : undefined}
          data-project-theme="content"
          className="project-scroll-section section-shell grid gap-8 py-10 sm:gap-10 sm:py-14 lg:grid-cols-[0.72fr_minmax(0,1fr)]"
        >
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <p className="section-kicker">Case Notes</p>
            <h2 className="mt-4 text-3xl font-black tracking-tight text-[var(--site-text)] sm:text-4xl">
              从问题到原型
            </h2>
            <div className="mt-8 space-y-5">
              <InfoCell icon={<Workflow size={15} />} label="Process">
                <p className="text-sm leading-7 text-[var(--site-text)]/55">
                  先弄清楚谁会用、要解决什么，再落到页面、数据、接口和必要的 AI 能力。
                </p>
              </InfoCell>
              <InfoCell icon={<Layers size={15} />} label="Stack">
                <div className="flex flex-wrap gap-2">
                  {project.stack.slice(0, 5).map((tech) => (
                    <span
                      key={tech}
                      className="rounded-[4px] border border-[var(--site-line)] px-2.5 py-1 text-xs text-[var(--site-text)]/60"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </InfoCell>
            </div>
          </aside>

          <article className="prose-custom case-notes-prose rounded-[8px] border border-[var(--site-line)] bg-[var(--site-panel)] p-5 sm:p-7">
            <MDXRemote source={mdx.content} components={mdxComponents} />
          </article>
        </section>

        <ProjectPager prev={prev} next={next} />
      </div>
    </ProjectColorStory>
  );
}
