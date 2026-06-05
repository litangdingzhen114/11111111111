"use client";

import { motion } from "motion/react";
import { ArrowDownRight } from "lucide-react";
import { processSteps } from "@/data/skills";
import RevealText from "@/components/motion/RevealText";

export default function Process() {
  return (
    <section id="process" className="py-20 sm:py-24 lg:py-32">
      <div className="section-shell">
        <div className="grid gap-10 sm:gap-12 lg:grid-cols-[0.78fr_1.22fr]">
          <RevealText className="lg:sticky lg:top-28 lg:self-start">
            <p className="section-kicker">Process</p>
            <h2 className="mt-4 text-3xl font-black leading-tight tracking-tight text-white sm:text-5xl">
              从场景到 Demo，
              <br />
              每一步都能被验证。
            </h2>
            <p className="mt-5 max-w-md text-sm leading-7 text-white/[0.54] sm:mt-6 sm:text-base sm:leading-8">
              对我来说，AI 产品不是先堆模型，而是先确认场景，再定义边界，然后用原型把流程跑通。
            </p>
          </RevealText>

          <div className="border-t border-white/10">
            {processSteps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.28 }}
                transition={{ delay: Math.min(i * 0.04, 0.16), duration: 0.42 }}
                className="group grid gap-5 border-b border-white/10 py-7 sm:grid-cols-[120px_minmax(0,1fr)_52px] sm:items-start sm:gap-6 sm:py-8"
              >
                <span className="font-mono text-sm text-white/[0.34]">
                  {step.number}
                </span>
                <div>
                  <div className="flex items-start gap-3 sm:items-center sm:gap-4">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-[6px] border border-white/10 text-primary transition-colors group-hover:border-primary/[0.45] group-hover:bg-primary/10 sm:h-11 sm:w-11">
                      <step.icon size={20} />
                    </span>
                    <h3 className="text-2xl font-black tracking-tight text-white sm:text-3xl">
                      {step.title}
                    </h3>
                  </div>
                  <p className="mt-4 max-w-2xl text-sm leading-7 text-white/[0.52] sm:text-base sm:leading-8">
                    {step.description}
                  </p>
                </div>
                <ArrowDownRight
                  size={24}
                  className="hidden text-white/20 transition-colors group-hover:text-primary sm:block"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
