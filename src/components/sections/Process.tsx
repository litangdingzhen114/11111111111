"use client";

import { motion } from "motion/react";
import { ArrowDownRight } from "lucide-react";
import { processSteps } from "@/data/skills";
import RevealText from "@/components/motion/RevealText";

export default function Process() {
  return (
    <section id="process" className="py-16 sm:py-20 lg:py-24">
      <div className="section-shell">
        <div className="grid gap-10 sm:gap-12 lg:grid-cols-[0.78fr_1.22fr]">
          <RevealText className="lg:sticky lg:top-28 lg:self-start">
            <p className="section-kicker">Process</p>
            <h2 className="mt-4 text-3xl font-black leading-tight tracking-tight text-[var(--site-text)] sm:text-5xl">
              一个想法要先变具体，
              <br />
              才能写成页面。
            </h2>
            <p className="mt-5 max-w-md text-sm leading-7 text-[var(--site-muted)] sm:mt-6 sm:text-base sm:leading-8">
              我通常先问：谁会用、卡在哪里、哪些事不能让 AI 乱做。答案清楚以后，再开始画页面和写原型。
            </p>
          </RevealText>

          <div className="border-t border-[var(--site-line)]">
            {processSteps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.28 }}
                transition={{ delay: Math.min(i * 0.04, 0.16), duration: 0.42 }}
                className="group grid gap-5 border-b border-[var(--site-line)] py-5 sm:grid-cols-[104px_minmax(0,1fr)_44px] sm:items-start sm:gap-6 sm:py-6"
              >
                <span className="font-mono text-sm text-[var(--site-muted-strong)]">
                  {step.number}
                </span>
                <div>
                  <div className="flex items-start gap-3 sm:items-center sm:gap-4">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-[6px] border border-[var(--site-line)] text-primary transition-colors group-hover:border-primary/[0.45] group-hover:bg-primary/10 sm:h-11 sm:w-11">
                      <step.icon size={20} />
                    </span>
                    <h3 className="text-2xl font-black tracking-tight text-[var(--site-text)] sm:text-3xl">
                      {step.title}
                    </h3>
                  </div>
                  <p className="mt-4 max-w-2xl text-sm leading-7 text-[var(--site-muted)] sm:text-base sm:leading-8">
                    {step.description}
                  </p>
                </div>
                <ArrowDownRight
                  size={24}
                  className="hidden text-[var(--site-muted)] transition-colors group-hover:text-primary sm:block"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
