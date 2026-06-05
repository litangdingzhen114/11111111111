"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import RevealText from "@/components/motion/RevealText";

export default function AboutPreview() {
  const focusAreas = [
    { label: "AI 产品", value: 88 },
    { label: "原型开发", value: 92 },
    { label: "工作流设计", value: 86 },
    { label: "内容运营", value: 78 },
  ];

  return (
    <section className="py-20 sm:py-24 lg:py-32">
      <div className="section-shell">
        <div className="project-card-surface grid overflow-hidden rounded-[8px] border lg:grid-cols-[1.05fr_0.95fr]">
          <RevealText className="p-5 sm:p-10 lg:p-12">
            <p className="section-kicker">About</p>
            <h2 className="mt-5 max-w-3xl text-3xl font-black leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              一个能把 AI 想法做成可演示产品的人。
            </h2>
            <p className="mt-6 max-w-2xl text-sm leading-7 text-white/[0.56] sm:mt-8 sm:text-base sm:leading-8">
              我关注的不只是把页面做出来，而是把业务场景、模型能力、用户流程和风险边界连起来。每个项目我都会尽量做成可演示、可复盘、能继续迭代的原型。
            </p>
            <Link
              href="/about"
              className="mt-8 inline-flex items-center gap-2 rounded-[6px] border border-white/[0.12] px-5 py-3 text-sm font-bold text-white transition-colors hover:border-primary/[0.45] hover:text-primary"
            >
              了解更多
              <ArrowRight size={15} />
            </Link>
          </RevealText>

          <RevealText
            delay={0.12}
            className="border-t border-white/10 p-5 sm:p-10 lg:border-l lg:border-t-0 lg:p-12"
          >
            <div className="grid grid-cols-2 gap-px overflow-hidden rounded-[8px] border border-white/10 bg-white/10">
              {[
                "3 个 AI 原型",
                "7 个项目案例",
                "20+ AIGC 作品",
                "25w 单条播放",
              ].map((item) => (
                <div key={item} className="bg-[#0d1110] p-4 text-sm text-white/[0.62]">
                  {item}
                </div>
              ))}
            </div>

            <div className="mt-8 space-y-6 sm:mt-10 sm:space-y-7">
              {focusAreas.map((area, i) => (
                <div key={area.label}>
                  <div className="mb-3 flex items-center justify-between text-sm">
                    <span className="font-semibold text-white">{area.label}</span>
                    <span className="font-mono text-white/[0.42]">{area.value}%</span>
                  </div>
                  <div className="h-px overflow-hidden bg-white/10">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${area.value}%` }}
                      viewport={{ once: true }}
                      transition={{
                        delay: 0.25 + i * 0.12,
                        duration: 1,
                        ease: "easeOut",
                      }}
                      className="h-full bg-[linear-gradient(90deg,var(--site-accent),var(--site-accent-2),var(--site-accent-3))]"
                    />
                  </div>
                </div>
              ))}
            </div>
          </RevealText>
        </div>
      </div>
    </section>
  );
}
