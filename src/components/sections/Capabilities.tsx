"use client";

import { motion } from "motion/react";
import { capabilities } from "@/data/skills";
import RevealText from "@/components/motion/RevealText";

export default function Capabilities() {
  return (
    <section className="py-16 sm:py-20 lg:py-24">
      <div className="section-shell">
        <div className="grid gap-10 sm:gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <RevealText className="lg:sticky lg:top-28">
            <p className="section-kicker">Capabilities</p>
            <h2 className="mt-4 max-w-xl text-3xl font-black leading-tight tracking-tight text-[var(--site-text)] sm:text-5xl">
              会做一点产品，也会把原型写出来。
            </h2>
            <p className="mt-5 max-w-md text-sm leading-7 text-[var(--site-muted)] sm:mt-6 sm:text-base sm:leading-8">
              我更习惯先把问题讲明白，再动手做一个能点、能跑、能继续改的小版本。
            </p>
          </RevealText>

          <div className="grid overflow-hidden rounded-[8px] border border-[var(--site-line)] bg-white/10 sm:grid-cols-2">
            {capabilities.map((cap, i) => (
              <motion.article
                key={cap.title}
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ delay: Math.min(i * 0.04, 0.16), duration: 0.42 }}
                className={`group relative min-h-[190px] border-[var(--site-line)] bg-[var(--site-panel)] p-5 transition-colors hover:bg-[var(--site-panel-hover)] sm:min-h-[220px] sm:p-6 ${
                  i % 2 === 0 ? "sm:border-r" : ""
                } ${i > 1 ? "sm:border-t" : ""}`}
              >
                <div className="flex items-start justify-between">
                  <span className="font-mono text-sm text-[var(--site-muted)]">
                    0{i + 1}
                  </span>
                  <span className="grid h-11 w-11 place-items-center rounded-[6px] border border-[var(--site-line)] text-primary transition-colors group-hover:border-primary/[0.45] group-hover:bg-primary/10">
                    <cap.icon size={22} />
                  </span>
                </div>

                <div className="mt-10 sm:mt-14">
                  <h3 className="text-xl font-black tracking-tight text-[var(--site-text)] sm:text-2xl">
                    {cap.title}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-[var(--site-muted)]">
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
