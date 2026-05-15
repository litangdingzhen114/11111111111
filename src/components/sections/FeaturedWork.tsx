"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { getFeaturedProjects } from "@/data/projects";
import RevealText from "@/components/motion/RevealText";

export default function FeaturedWork() {
  const featured = getFeaturedProjects();

  return (
    <section className="py-24 lg:py-32 bg-white/[0.01]">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <RevealText className="mb-16 flex flex-col items-start gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-purple-400">
              Selected Projects
            </p>
            <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
              Featured Work <ArrowUpRight className="inline-block text-purple-400" size={32} />
            </h2>
          </div>
          <Link
            href="/work"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-white transition-colors"
          >
            View All Projects
            <ArrowRight size={14} />
          </Link>
        </RevealText>

        {/* Project Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((project, i) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: i * 0.15, duration: 0.7 }}
            >
              <Link href={`/work/${project.slug}`} className="group block">
                <div className="relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] transition-all hover:border-purple-500/20 hover:bg-white/[0.04]">
                  {/* Cover */}
                  <div
                    className={`aspect-[16/10] bg-gradient-to-br ${project.coverGradient} flex items-center justify-center transition-transform duration-500 group-hover:scale-105`}
                  >
                    <div className="text-6xl font-black text-white/10 select-none">
                      {project.title.charAt(0)}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-bold text-white group-hover:text-purple-300 transition-colors">
                          {project.title}
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">
                          {project.role}
                        </p>
                      </div>
                      <ArrowUpRight
                        size={18}
                        className="mt-1 text-gray-600 group-hover:text-purple-400 transition-colors"
                      />
                    </div>

                    <p className="mt-3 text-sm leading-relaxed text-gray-400 line-clamp-2">
                      {project.description}
                    </p>

                    {/* Tags */}
                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.stack.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full border border-white/[0.06] bg-white/[0.04] px-3 py-1 text-xs text-gray-400"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.stack.length > 3 && (
                        <span className="rounded-full border border-white/[0.06] bg-white/[0.04] px-3 py-1 text-xs text-gray-500">
                          +{project.stack.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
