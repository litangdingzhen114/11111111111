"use client";

import Link from "next/link";
import Image from "next/image";
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
    <section className="theme-featured-section relative overflow-hidden border-y py-16 sm:py-20 lg:py-24">
      <div className="section-shell">
        <RevealText className="mb-8 grid gap-6 sm:mb-10 sm:gap-8 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-end">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.28em] text-[var(--featured-accent)]">
              Selected Work
            </p>
            <h2 className="mt-4 max-w-4xl text-[clamp(2.35rem,10vw,3rem)] font-black leading-[0.98] tracking-tight sm:text-6xl lg:text-7xl">
              先看项目，
              <br />
              再看我是怎么想的。
            </h2>
          </div>
          <div>
            <p className="text-sm leading-7 text-[var(--featured-muted)] sm:text-base sm:leading-8">
              我把几个比较能代表方向的项目放在前面：电商 Agent、AIGC 短剧工具和康复小程序。比起只放截图，我更想讲清楚当时的问题和我的处理方式。
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

        <div className="space-y-4">
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
                className="theme-featured-card project-hover-lift group grid overflow-hidden rounded-[8px] border transition duration-500 hover:-translate-y-1 md:grid-cols-[0.95fr_1.05fr]"
              >
                <div
                  className={`featured-card-media theme-inverted relative min-h-[230px] overflow-hidden bg-gradient-to-br sm:min-h-[280px] ${project.coverGradient}`}
                >
                  {project.coverImage ? (
                    <Image
                      src={project.coverImage}
                      alt=""
                      fill
                      priority={i === 0}
                      loading={i === 0 ? "eager" : undefined}
                      sizes="(min-width: 768px) 46vw, 100vw"
                      className="object-cover transition duration-700 ease-out group-hover:scale-[1.035]"
                      aria-hidden
                    />
                  ) : (
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_28%_22%,rgba(143,163,255,0.3),transparent_34%),radial-gradient(circle_at_80%_74%,rgba(93,183,163,0.22),transparent_30%)]" />
                  )}
                  <div className="featured-card-media-overlay absolute inset-0" />
                  <div className="featured-card-media-grid absolute inset-0 bg-[size:42px_42px]" />
                  <div className="featured-card-index absolute left-5 top-5 rounded-[6px] border px-3 py-1.5 text-xs font-black uppercase tracking-[0.2em] backdrop-blur">
                    0{i + 1}
                  </div>
                  <div
                    className="featured-card-case absolute right-5 top-5 hidden rounded-full border px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.24em] backdrop-blur sm:block"
                    aria-hidden
                  >
                    Case Study
                  </div>
                  <div className="absolute inset-x-5 bottom-5 flex items-end justify-between">
                    <span className="featured-card-type max-w-[75%] rounded-[6px] px-3 py-2 text-xs font-semibold backdrop-blur">
                      {project.type.join(" / ")}
                    </span>
                    <span className="featured-card-action grid h-11 w-11 place-items-center rounded-[6px] transition duration-300 group-hover:-translate-y-1 group-hover:rotate-3 sm:h-12 sm:w-12">
                      <ArrowUpRight size={20} />
                    </span>
                  </div>
                </div>

                <div className="featured-card-body flex min-h-[230px] flex-col justify-between p-5 sm:min-h-[260px] sm:p-7 lg:p-8">
                  <div className="flex items-start justify-between gap-6">
                    <div>
                      <p
                        className="featured-card-kicker text-xs font-black uppercase tracking-[0.24em]"
                        style={{ color: accents[i % accents.length] }}
                      >
                        {project.year} / {project.role}
                      </p>
                      <h3 className="featured-card-title mt-4 max-w-xl text-3xl font-black leading-tight tracking-tight sm:mt-5 sm:text-4xl">
                        {project.title}
                      </h3>
                    </div>
                    <span className="featured-card-count hidden text-sm font-mono sm:block">
                      /{String(i + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <div>
                    <p className="featured-card-description mt-6 max-w-2xl text-sm leading-7 sm:mt-0 sm:text-base sm:leading-8">
                      {project.description}
                    </p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {project.stack.slice(0, 5).map((tech) => (
                        <span
                          key={tech}
                          className="featured-card-chip rounded-[6px] border px-3 py-1.5 text-xs"
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
