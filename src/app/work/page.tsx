"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { projects, type ProjectType } from "@/data/projects";
import RevealText from "@/components/motion/RevealText";

const allTypes: Array<"全部" | ProjectType> = [
  "全部",
  "AI Agent",
  "AIGC",
  "AI 应用",
  "工作流产品",
  "电商产品",
  "小程序",
  "Web 应用",
];

export default function WorkPage() {
  const [filter, setFilter] = useState<"全部" | ProjectType>("全部");

  const filtered =
    filter === "全部" ? projects : projects.filter((p) => p.type.includes(filter));

  return (
    <div className="pt-28 pb-20 sm:pt-32 sm:pb-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <RevealText className="mb-10 grid gap-6 sm:mb-12 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">
              作品集
            </p>
            <h1 className="mt-3 text-4xl font-bold text-[var(--site-text)] sm:text-5xl lg:text-6xl">
              我的项目
            </h1>
          </div>
          <p className="max-w-2xl text-base leading-7 text-[var(--site-muted)] sm:text-lg lg:ml-auto">
            这里放了我这段时间做过的几个项目。每个案例都会尽量写清楚：为什么做、我负责什么、最后做成了什么，而不只是贴几张图。
          </p>
        </RevealText>

        <div className="project-filter-bar sticky top-20 z-20 mb-8 -mx-2 flex flex-wrap gap-2 rounded-[8px] border p-2 backdrop-blur sm:mb-10">
          {allTypes.map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`rounded-full border px-3.5 py-2 text-xs font-medium transition-all sm:px-4 sm:text-sm ${
                filter === type ? "project-filter-active" : "project-filter-idle"
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid gap-6 sm:gap-8 md:grid-cols-2"
          >
            {filtered.map((project, i) => (
              <motion.div
                key={project.slug}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(i * 0.04, 0.16), duration: 0.42 }}
              >
                <Link
                  href={`/work/${project.slug}`}
                  className="project-card-surface project-hover-lift group block overflow-hidden rounded-[8px] border transition duration-500 hover:-translate-y-1 sm:rounded-2xl"
                >
                  <div className={`relative aspect-[16/9] overflow-hidden bg-gradient-to-br ${project.coverGradient}`}>
                    {project.coverImage ? (
                      <Image
                        src={project.coverImage}
                        alt={project.coverAlt ?? project.title}
                        fill
                        priority={i === 0}
                        loading={i === 0 ? "eager" : undefined}
                        sizes="(min-width: 768px) 50vw, 100vw"
                        className="object-cover transition duration-700 ease-out group-hover:scale-[1.035]"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_24%_20%,rgba(143,163,255,0.32),transparent_32%),radial-gradient(circle_at_74%_72%,rgba(93,183,163,0.24),transparent_34%),linear-gradient(135deg,rgba(255,255,255,0.08),transparent)]" />
                    )}
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,6,10,0.04),rgba(4,6,10,0.66))]" />
                    <div className="absolute left-4 top-4 rounded-full border border-white/15 bg-black/28 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.24em] text-[var(--site-text)]/72 backdrop-blur">
                      Case {String(i + 1).padStart(2, "0")}
                    </div>
                    <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-4">
                      <span className="rounded-[6px] bg-white/90 px-3 py-1.5 text-[11px] font-black text-[#111821]">
                        {project.year}
                      </span>
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-[6px] bg-white text-[#111821] transition duration-300 group-hover:-translate-y-1 group-hover:rotate-3">
                        <ArrowUpRight size={18} />
                      </span>
                    </div>
                  </div>

                  <div className="p-5 sm:p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="mb-2 flex flex-wrap items-center gap-2 sm:gap-3">
                          {project.type.map((t) => (
                            <span key={t} className="text-xs text-[var(--site-muted-strong)]">
                              {t}
                            </span>
                          ))}
                        </div>
                        <h2 className="text-lg font-bold leading-snug text-[var(--site-text)] transition-colors group-hover:text-primary sm:text-xl">
                          {project.title}
                        </h2>
                        <p className="mt-1 text-sm text-gray-500">
                          {project.role}
                        </p>
                      </div>
                    </div>

                    <p className="mt-3 text-sm leading-relaxed text-[var(--site-muted)]">
                      {project.description}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.stack.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full border border-white/[0.06] bg-[var(--site-panel)] px-3 py-1 text-xs text-[var(--site-muted)]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
