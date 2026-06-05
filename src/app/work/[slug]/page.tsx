import { notFound } from "next/navigation";
import Link from "next/link";
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
    rows: ["Intent: order query", "Tool: policy search", "Guardrail: human handoff"],
    chips: ["RAG", "SSE", "MCP", "SQLite"],
    metricA: "5 intents",
    metricB: "Risk checks",
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
};

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
        "relative min-h-[330px] overflow-hidden rounded-[8px] border border-white/10 bg-[#111315] sm:min-h-[440px]",
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
            <div className="rounded-[20px] border border-white/10 bg-[#0b0c0d] p-3 sm:rounded-[24px] sm:p-4">
              <div className="mx-auto mb-4 h-4 w-20 rounded-full bg-white/10 sm:mb-5 sm:h-5 sm:w-24" />
              <div className="mb-4 flex items-center justify-between sm:mb-5">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[var(--site-accent-2)]">
                    {profile.eyebrow}
                  </p>
                  <h2 className="mt-1 text-lg font-black text-white sm:text-xl">
                    {profile.primaryTitle}
                  </h2>
                </div>
                <Sparkles size={18} className="text-white/60" />
              </div>
              <div className="space-y-3">
                {profile.rows.map((row, index) => (
                  <div
                    key={row}
                    className="rounded-[6px] border border-white/10 bg-white/[0.06] p-2.5 sm:p-3"
                  >
                    <div className="flex items-center gap-2">
                      <span className="grid h-5 w-5 place-items-center rounded-full bg-white text-[10px] font-black text-black">
                        {index + 1}
                      </span>
                      <p className="text-xs font-semibold text-white/80">{row}</p>
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
          <div className="theme-device w-full max-w-[720px] rounded-[8px] border border-white/10 bg-black/90 p-3 shadow-[0_24px_60px_rgba(0,0,0,0.32)] sm:p-4">
            <div className="grid gap-4 md:grid-cols-[150px_minmax(0,1fr)]">
              <div className="rounded-[6px] border border-white/10 bg-white/[0.06] p-4">
                <p className="text-lg font-black text-white">
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
                          : "bg-white/[0.08] text-white/65"
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
                      className="rounded-[6px] border border-white/10 bg-white/[0.06] p-3 sm:p-4"
                    >
                      <p className="text-xs text-white/45">Metric</p>
                      <p className="mt-4 text-xl font-black text-white sm:mt-5 sm:text-2xl">
                        {metric}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="rounded-[6px] border border-white/10 bg-white/[0.06] p-4">
                  <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-xl font-black text-white sm:text-2xl">
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
                        <span className="text-sm font-semibold text-white/80">
                          {chip}
                        </span>
                        <span className="ml-auto font-mono text-xs text-white/35">
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
    <div className="border-t border-white/10 py-5">
      <div className="mb-3 flex items-center gap-2 text-white/45">
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
      className="section-shell grid gap-4 border-t border-white/10 py-16 sm:grid-cols-2"
    >
      {prev ? (
        <Link
          href={`/work/${prev.slug}`}
          className="group rounded-[8px] border border-white/10 bg-white/[0.03] p-5 transition-colors hover:border-[color:var(--site-accent-2)]"
        >
          <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-white/45">
            <ArrowLeft size={14} /> 上一个
          </span>
          <p className="mt-4 text-lg font-black text-white transition-colors group-hover:text-[var(--site-accent-2)]">
            {prev.title}
          </p>
        </Link>
      ) : (
        <div />
      )}
      {next ? (
        <Link
          href={`/work/${next.slug}`}
          className="group rounded-[8px] border border-white/10 bg-white/[0.03] p-5 text-right transition-colors hover:border-[color:var(--site-accent-2)]"
        >
          <span className="flex items-center justify-end gap-2 text-xs font-bold uppercase tracking-[0.18em] text-white/45">
            下一个 <ArrowRight size={14} />
          </span>
          <p className="mt-4 text-lg font-black text-white transition-colors group-hover:text-[var(--site-accent-2)]">
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
          className="section-shell py-10 sm:py-12 lg:min-h-[calc(100svh-6rem)] lg:py-16"
        >
          <Link
            href="/work"
            className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-white/50 transition-colors hover:text-white sm:mb-12"
          >
            <ArrowLeft size={15} />
            返回作品列表
          </Link>

          <div className="grid gap-12 lg:grid-cols-[minmax(0,1.08fr)_420px] lg:items-end">
            <div>
              <div className="mb-6 flex flex-wrap items-center gap-3">
                <span className="font-mono text-sm text-[var(--site-accent-2)]">
                  CASE {projectNumber}
                </span>
                {project.type.map((type) => (
                  <span
                    key={type}
                    className="rounded-full border border-white/10 px-3 py-1 text-xs font-semibold text-white/60"
                  >
                    {type}
                  </span>
                ))}
              </div>

              <h1 className="max-w-5xl break-words text-[clamp(2.7rem,12vw,4.8rem)] font-black leading-[0.96] tracking-tight text-white sm:text-7xl lg:text-8xl">
                {project.title}
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-7 text-white/60 sm:mt-8 sm:text-lg sm:leading-8">
                {project.description}
              </p>
            </div>

            <aside className="rounded-[8px] border border-white/10 bg-white/[0.035] p-5 sm:p-6">
              <InfoCell icon={<User size={15} />} label="Role">
                <p className="text-base font-bold text-white">{project.role}</p>
              </InfoCell>
              <InfoCell icon={<Calendar size={15} />} label="Year">
                <p className="text-base font-bold text-white">{project.year}</p>
              </InfoCell>
              <InfoCell icon={<Target size={15} />} label="Focus">
                <p className="text-sm leading-7 text-white/60">
                  场景拆解、流程设计、可演示原型与复盘沉淀
                </p>
              </InfoCell>
            </aside>
          </div>
        </section>

        <section
          data-project-theme="overview"
          className="section-shell grid gap-5 pb-12 sm:gap-6 sm:pb-20 lg:grid-cols-2"
        >
          <ProjectMockup project={project} variant="primary" />
          <ProjectMockup project={project} variant="secondary" />
        </section>

        <section
          data-project-theme="build"
          className="section-shell grid gap-8 border-y border-white/10 py-12 sm:gap-10 sm:py-16 lg:grid-cols-[0.74fr_1.26fr] lg:items-start"
        >
          <div>
            <p className="section-kicker">Tool Stack</p>
            <h2 className="mt-4 text-3xl font-black tracking-tight text-white sm:text-5xl">
              技术栈与产品能力
            </h2>
            <p className="mt-5 max-w-xl text-base leading-8 text-white/55">
              技术选择服务于原型验证：前端负责交互表达，后端负责能力接入，数据结构负责让流程可追踪、可复盘。
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
          data-project-theme="content"
          className="section-shell grid gap-10 py-14 sm:gap-12 sm:py-20 lg:grid-cols-[0.72fr_minmax(0,1fr)]"
        >
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <p className="section-kicker">Case Notes</p>
            <h2 className="mt-4 text-3xl font-black tracking-tight text-white sm:text-4xl">
              从问题到原型
            </h2>
            <div className="mt-8 space-y-5">
              <InfoCell icon={<Workflow size={15} />} label="Process">
                <p className="text-sm leading-7 text-white/55">
                  先明确场景和边界，再落到交互、数据、AI 能力接入和验证指标。
                </p>
              </InfoCell>
              <InfoCell icon={<Layers size={15} />} label="Stack">
                <div className="flex flex-wrap gap-2">
                  {project.stack.slice(0, 5).map((tech) => (
                    <span
                      key={tech}
                      className="rounded-[4px] border border-white/10 px-2.5 py-1 text-xs text-white/60"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </InfoCell>
            </div>
          </aside>

          <article className="prose-custom rounded-[8px] border border-white/10 bg-white/[0.035] p-5 sm:p-8">
            <MDXRemote source={mdx.content} components={mdxComponents} />
          </article>
        </section>

        <ProjectPager prev={prev} next={next} />
      </div>
    </ProjectColorStory>
  );
}
