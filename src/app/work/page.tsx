"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/data/projects";
import RevealText from "@/components/motion/RevealText";

const allTypes = [
  "All",
  "AI / SaaS",
  "Dashboard",
  "Web App",
  "Marketplace",
  "AI Tool",
  "Productivity",
  "Internal Tool",
];

export default function WorkPage() {
  const [filter, setFilter] = useState("All");

  const filtered =
    filter === "All"
      ? projects
      : projects.filter((p) => p.type.includes(filter as never));

  return (
    <div className="pt-32 pb-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <RevealText className="mb-16">
          <p className="text-sm font-semibold uppercase tracking-widest text-purple-400">
            Portfolio
          </p>
          <h1 className="mt-3 text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
            My Work
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-gray-400">
            A selection of products I&apos;ve built — from concept to delivery.
            Each project is a case study in product thinking and technical
            execution.
          </p>
        </RevealText>

        {/* Filter Tabs */}
        <div className="mb-12 flex flex-wrap gap-2">
          {allTypes.map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                filter === type
                  ? "bg-purple-500/20 text-purple-300 border border-purple-500/30"
                  : "bg-white/[0.04] text-gray-400 border border-white/[0.06] hover:border-white/10 hover:text-white"
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid gap-8 md:grid-cols-2"
          >
            {filtered.map((project, i) => (
              <motion.div
                key={project.slug}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <Link
                  href={`/work/${project.slug}`}
                  className="group block overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:border-purple-500/20 hover:bg-white/[0.04] transition-all"
                >
                  {/* Cover */}
                  <div
                    className={`aspect-[16/9] bg-gradient-to-br ${project.coverGradient} flex items-center justify-center transition-transform duration-500 group-hover:scale-[1.02]`}
                  >
                    <div className="text-7xl font-black text-white/10 select-none">
                      {project.title.charAt(0)}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-xs font-mono text-purple-400">
                            {project.year}
                          </span>
                          {project.type.map((t) => (
                            <span
                              key={t}
                              className="text-xs text-gray-600"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                        <h2 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors">
                          {project.title}
                        </h2>
                        <p className="mt-1 text-sm text-gray-500">
                          {project.role}
                        </p>
                      </div>
                      <ArrowUpRight
                        size={20}
                        className="mt-1 text-gray-600 group-hover:text-purple-400 transition-colors"
                      />
                    </div>

                    <p className="mt-3 text-sm leading-relaxed text-gray-400">
                      {project.description}
                    </p>

                    {/* Stack */}
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
