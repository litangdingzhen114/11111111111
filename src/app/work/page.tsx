"use client";

import { useState } from "react";
import Link from "next/link";
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
        <RevealText className="mb-12 sm:mb-16">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            作品集
          </p>
          <h1 className="mt-3 text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
            我的项目
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-gray-400 sm:text-lg">
            这里整理了我从 0 到 1 推进过的 AI 产品、小程序和 Web 项目。每个案例都尽量记录场景、流程、边界和原型实现，而不是只放最终截图。
          </p>
        </RevealText>

        <div className="mb-10 flex flex-wrap gap-2 sm:mb-12">
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
                  className="project-card-surface group block overflow-hidden rounded-[8px] border transition-all sm:rounded-2xl"
                >
                  <div
                    className={`aspect-[16/9] bg-gradient-to-br ${project.coverGradient} flex items-center justify-center transition-transform duration-300 group-hover:scale-[1.015]`}
                  >
                    <div className="text-6xl font-black text-white/10 select-none sm:text-7xl">
                      {project.title.charAt(0)}
                    </div>
                  </div>

                  <div className="p-5 sm:p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="mb-2 flex flex-wrap items-center gap-2 sm:gap-3">
                          <span className="text-xs font-mono text-primary">
                            {project.year}
                          </span>
                          {project.type.map((t) => (
                            <span key={t} className="text-xs text-gray-600">
                              {t}
                            </span>
                          ))}
                        </div>
                        <h2 className="text-lg font-bold leading-snug text-white transition-colors group-hover:text-primary sm:text-xl">
                          {project.title}
                        </h2>
                        <p className="mt-1 text-sm text-gray-500">
                          {project.role}
                        </p>
                      </div>
                      <ArrowUpRight
                        size={20}
                        className="mt-1 text-gray-600 transition-colors group-hover:text-primary"
                      />
                    </div>

                    <p className="mt-3 text-sm leading-relaxed text-gray-400">
                      {project.description}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.stack.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full border border-white/[0.06] bg-white/[0.04] px-3 py-1 text-xs text-gray-400"
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
