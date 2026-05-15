"use client";

import { motion } from "motion/react";
import { techStack } from "@/data/skills";
import RevealText from "@/components/motion/RevealText";

export default function TechStack() {
  return (
    <section className="py-24 lg:py-32 bg-white/[0.01]">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <RevealText className="mb-16 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-purple-400">
            Tools & Technologies
          </p>
          <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
            Tech Stack
          </h2>
        </RevealText>

        <div className="mx-auto grid max-w-4xl grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-6">
          {techStack.map((tech, i) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="group flex flex-col items-center gap-3 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4 hover:border-purple-500/20 hover:bg-white/[0.04] transition-all"
            >
              {/* Tech initial as icon placeholder */}
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500/10 to-blue-500/10 text-sm font-bold text-purple-400 border border-purple-500/10">
                {tech.name.slice(0, 2)}
              </div>
              <div className="text-center">
                <p className="text-xs font-semibold text-white">
                  {tech.name}
                </p>
                <p className="text-[10px] text-gray-600">{tech.category}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
