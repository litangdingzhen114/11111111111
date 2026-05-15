"use client";

import { motion } from "motion/react";
import { capabilities } from "@/data/skills";
import RevealText from "@/components/motion/RevealText";

export default function Capabilities() {
  return (
    <section className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <RevealText className="mb-16 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-purple-400">
            What I Can Help You With
          </p>
          <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            Capabilities
          </h2>
        </RevealText>

        {/* Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {capabilities.map((cap, i) => (
            <motion.div
              key={cap.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="group relative rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 hover:border-purple-500/30 hover:bg-white/[0.04] transition-colors"
            >
              {/* Glow on hover */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="relative">
                {/* Number */}
                <span className="text-xs font-mono text-gray-600">
                  0{i + 1}
                </span>

                {/* Icon */}
                <div className="mt-4 mb-4 inline-flex items-center justify-center rounded-xl bg-gradient-to-br from-purple-500/10 to-blue-500/10 p-3 text-purple-400 border border-purple-500/10">
                  <cap.icon size={24} />
                </div>

                {/* Content */}
                <h3 className="text-lg font-bold text-white">{cap.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-400">
                  {cap.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
