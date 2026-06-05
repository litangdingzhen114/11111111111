"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { getFeaturedProjects } from "@/data/projects";
import RevealText from "@/components/motion/RevealText";

const accents = [
  "var(--featured-accent)",
  "var(--site-accent-2)",
  "var(--site-accent-3)",
];

export default function FeaturedWork() {
  const featured = getFeaturedProjects();

  return (
    <section className="theme-featured-section relative overflow-hidden py-20 sm:py-24 lg:py-32">
      <div className="section-shell">
        <RevealText className="mb-10 grid gap-6 sm:mb-14 sm:gap-8 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-end">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.28em] text-[var(--featured-accent)]">
              Selected Work
            </p>
            <h2 className="mt-4 max-w-4xl text-[clamp(2.35rem,10vw,3rem)] font-black leading-[0.98] tracking-tight sm:text-6xl lg:text-7xl">
              先看真实项目，
              <br />
              再看产品判断。
            </h2>
          </div>
          <div>
            <p className="text-sm leading-7 text-[var(--featured-muted)] sm:text-base sm:leading-8">
              这些项目覆盖 AI Agent、AIGC 工作流、医疗健康小程序、电商小程序和内容站点。每个案例都保留了角色、技术栈和业务语境。
            </p>
            <Link
              href="/work"
              className="mt-6 inline-flex items-center gap-2 rounded-[6px] border border-[color:var(--featured-link-border)] px-4 py-2.5 text-sm font-bold transition-colors hover:bg-[var(--featured-link-hover-bg)] hover:text-[var(--featured-link-hover-text)]"
            >
              查看全部项目
              <ArrowRight size={15} />
            </Link>
          </div>
        </RevealText>

        <div className="space-y-5">
          {featured.map((project, i) => (
            <motion.article
              key={project.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.18 }}
              transition={{ delay: Math.min(i * 0.04, 0.16), duration: 0.42 }}
            >
              <Link
                href={`/work/${project.slug}`}
                className="theme-featured-card theme-inverted group grid overflow-hidden rounded-[8px] border text-[var(--featured-card-fg)] shadow-[0_18px_48px_rgba(8,8,23,0.16)] transition-transform duration-300 hover:-translate-y-1 md:grid-cols-[0.95fr_1.05fr] sm:shadow-[0_28px_80px_rgba(8,8,23,0.2)]"
              >
                <div
                  className={`relative min-h-[240px] overflow-hidden bg-gradient-to-br sm:min-h-[310px] ${project.coverGradient}`}
                >
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(5,6,5,0.16)_1px,transparent_1px),linear-gradient(90deg,rgba(5,6,5,0.16)_1px,transparent_1px)] bg-[size:42px_42px]" />
                  <div className="absolute left-5 top-5 rounded-[6px] border border-black/20 bg-white/70 px-3 py-1.5 text-xs font-black uppercase tracking-[0.2em] text-[#080817] backdrop-blur">
                    0{i + 1}
                  </div>
                  <div
                    className="absolute bottom-4 right-4 text-[6.5rem] font-black leading-none text-black/[0.12] transition-transform duration-500 group-hover:scale-105 sm:text-[11rem]"
                    aria-hidden
                  >
                    {project.title.slice(0, 1)}
                  </div>
                  <div className="absolute inset-x-5 bottom-5 flex items-end justify-between">
                    <span className="rounded-[6px] bg-[#080817]/[0.85] px-3 py-2 text-xs font-semibold text-white/[0.72]">
                      {project.type.join(" / ")}
                    </span>
                    <span className="grid h-11 w-11 place-items-center rounded-[6px] bg-white text-[#080817] transition-transform duration-300 group-hover:rotate-6 sm:h-12 sm:w-12">
                      <ArrowUpRight size={20} />
                    </span>
                  </div>
                </div>

                <div className="flex min-h-[270px] flex-col justify-between p-5 sm:min-h-[310px] sm:p-8 lg:p-10">
                  <div className="flex items-start justify-between gap-6">
                    <div>
                      <p
                        className="text-xs font-black uppercase tracking-[0.24em]"
                        style={{ color: accents[i % accents.length] }}
                      >
                        {project.year} / {project.role}
                      </p>
                      <h3 className="mt-4 max-w-xl text-3xl font-black leading-tight tracking-tight text-white sm:mt-5 sm:text-5xl">
                        {project.title}
                      </h3>
                    </div>
                    <span className="hidden text-sm font-mono text-white/[0.28] sm:block">
                      /{String(i + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <div>
                    <p className="mt-8 max-w-2xl text-sm leading-7 text-white/[0.58] sm:mt-0 sm:text-base sm:leading-8">
                      {project.description}
                    </p>
                    <div className="mt-6 flex flex-wrap gap-2">
                      {project.stack.slice(0, 5).map((tech) => (
                        <span
                          key={tech}
                          className="rounded-[6px] border border-white/10 px-3 py-1.5 text-xs text-white/[0.52]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
