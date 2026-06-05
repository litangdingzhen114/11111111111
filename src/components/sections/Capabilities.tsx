"use client";

import { motion } from "motion/react";
import { capabilities } from "@/data/skills";
import RevealText from "@/components/motion/RevealText";

export default function Capabilities() {
  return (
    <section className="py-20 sm:py-24 lg:py-32">
      <div className="section-shell">
        <div className="grid gap-10 sm:gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <RevealText className="lg:sticky lg:top-28">
            <p className="section-kicker">Capabilities</p>
            <h2 className="mt-4 max-w-xl text-3xl font-black leading-tight tracking-tight text-white sm:text-5xl">
              不是单点技能，而是一套从产品判断到原型交付的能力组合。
            </h2>
            <p className="mt-5 max-w-md text-sm leading-7 text-white/[0.54] sm:mt-6 sm:text-base sm:leading-8">
              我把重点放在 AI 产品的流程设计、边界控制和可演示实现之间的连接，让想法尽快变成能被体验和验证的东西。
            </p>
          </RevealText>

          <div className="grid overflow-hidden rounded-[8px] border border-white/10 bg-white/10 sm:grid-cols-2">
            {capabilities.map((cap, i) => (
              <motion.article
                key={cap.title}
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ delay: Math.min(i * 0.04, 0.16), duration: 0.42 }}
                className={`group relative min-h-[220px] border-white/10 bg-[#080a09] p-5 transition-colors hover:bg-[#0d1110] sm:min-h-[260px] sm:p-6 ${
                  i % 2 === 0 ? "sm:border-r" : ""
                } ${i > 1 ? "sm:border-t" : ""}`}
              >
                <div className="flex items-start justify-between">
                  <span className="font-mono text-sm text-white/[0.36]">
                    0{i + 1}
                  </span>
                  <span className="grid h-11 w-11 place-items-center rounded-[6px] border border-white/10 text-primary transition-colors group-hover:border-primary/[0.45] group-hover:bg-primary/10">
                    <cap.icon size={22} />
                  </span>
                </div>

                <div className="mt-14 sm:mt-20">
                  <h3 className="text-xl font-black tracking-tight text-white sm:text-2xl">
                    {cap.title}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-white/[0.52]">
                    {cap.description}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
