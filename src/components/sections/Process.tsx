"use client";

import { motion } from "motion/react";
import { processSteps } from "@/data/skills";
import RevealText from "@/components/motion/RevealText";

export default function Process() {
  return (
    <section id="process" className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <RevealText className="mb-16 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-purple-400">
            How I Work
          </p>
          <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            From idea to product, fast and diligent.
          </h2>
        </RevealText>

        {/* Steps */}
        <div className="relative">
          {/* Connection line - desktop */}
          <div className="absolute top-12 left-0 right-0 hidden lg:block">
            <div className="mx-auto h-[2px] w-full bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
            {processSteps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.6 }}
                className="group relative text-center"
              >
                {/* Number circle */}
                <div className="relative z-10 mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/[0.08] bg-[#0a0a14] text-lg font-bold text-purple-400 group-hover:border-purple-500/30 group-hover:bg-purple-500/10 transition-all">
                  {step.number}
                </div>

                {/* Icon */}
                <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center text-gray-500 group-hover:text-purple-400 transition-colors">
                  <step.icon size={22} />
                </div>

                <h3 className="text-lg font-bold text-white">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-500">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
