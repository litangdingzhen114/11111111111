"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import RevealText from "@/components/motion/RevealText";

export default function AboutPreview() {
  const focusAreas = [
    { label: "产品拆解", value: 88 },
    { label: "应用搭建", value: 92 },
    { label: "流程整理", value: 86 },
    { label: "内容表达", value: 78 },
  ];

  return (
    <section className="py-16 sm:py-20 lg:py-24">
      <div className="section-shell">
        <div className="project-card-surface grid overflow-hidden rounded-[8px] border lg:grid-cols-[1.05fr_0.95fr]">
          <RevealText className="p-5 sm:p-8 lg:p-10">
            <p className="section-kicker">About</p>
            <h2 className="mt-5 max-w-3xl text-3xl font-black leading-tight tracking-tight text-[var(--site-text)] sm:text-5xl lg:text-6xl">
              我喜欢把想法做成能点开的原型。
            </h2>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-[var(--site-muted)] sm:mt-6 sm:text-base sm:leading-8">
              有些项目从需求开始，有些从一个页面开始。我会先把任务拆清楚，再用前端、小程序或简单后端把它跑起来，方便继续讨论和修改。
            </p>
            <Link
              href="/about"
              className="mt-6 inline-flex items-center gap-2 rounded-[6px] border border-[var(--site-line)] px-5 py-3 text-sm font-bold text-[var(--site-text)] transition-colors hover:border-primary/[0.45] hover:text-primary"
            >
              了解更多
              <ArrowRight size={15} />
            </Link>
          </RevealText>

          <RevealText
            delay={0.12}
            className="border-t border-[var(--site-line)] p-5 sm:p-8 lg:border-l lg:border-t-0 lg:p-10"
          >
            <div className="grid grid-cols-2 gap-px overflow-hidden rounded-[8px] border border-[var(--site-line)] bg-white/10">
              {[
                "3 个 AI 原型",
                "7 个项目案例",
                "20+ AIGC 作品",
                "25w 单条播放",
              ].map((item) => (
                <div key={item} className="bg-[var(--site-panel-strong)] p-4 text-sm text-[var(--site-muted)]">
                  {item}
                </div>
              ))}
            </div>

            <div className="mt-7 space-y-5 sm:mt-8 sm:space-y-6">
              {focusAreas.map((area, i) => (
                <div key={area.label}>
                  <div className="mb-3 flex items-center justify-between text-sm">
                    <span className="font-semibold text-[var(--site-text)]">{area.label}</span>
                    <span className="font-mono text-[var(--site-muted)]">{area.value}%</span>
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
