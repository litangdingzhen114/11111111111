"use client";

import { motion } from "motion/react";
import { CheckCircle2 } from "lucide-react";
import RevealText from "@/components/motion/RevealText";

const projectNotes = [
  {
    quote:
      "做 DTC Agent 时我最有感的是：聊天框不难，难的是它什么时候该查订单、什么时候该停下来交给人工。",
    name: "DTC AI Agent",
    title: "客服与导购原型",
    avatar: "AI",
  },
  {
    quote:
      "做 Frieren 时我发现，AIGC 麻烦的地方不是生成一次，而是角色、分镜和素材要能接着用。",
    name: "Frieren",
    title: "AIGC 工作流",
    avatar: "FR",
  },
];

const experience = [
  {
    period: "2026",
    role: "AI 产品原型实践",
    company: "Agent / AIGC / 医疗健康",
    description:
      "做了 DTC AI Agent、Frieren 短剧工具和康复分诊小程序，把想法尽量做成可以打开体验的版本。",
  },
  {
    period: "2025 - 2026",
    role: "Web / 小程序项目",
    company: "电商、内容与作品集",
    description:
      "开发 LEMANISM 时尚电商小程序、影评社官方网页、生日互动页和这个作品集站，练习页面体验和内容组织。",
  },
  {
    period: "2024 - 2027",
    role: "电子商务专业在读",
    company: "门头沟学院",
    description:
      "学习数据分析、市场营销、网店美工和电商运营；曾获浙江省大学生职业技能竞赛商务数据分析组省级银奖。",
  },
];

export default function Testimonials() {
  return (
    <section className="border-y border-[var(--site-line)] bg-background py-16 sm:py-20 lg:py-24">
      <div className="section-shell">
        <div className="grid gap-10 sm:gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:gap-14">
          <div>
            <RevealText>
              <p className="section-kicker">Notes</p>
              <h2 className="mt-4 text-3xl font-black tracking-tight text-[var(--site-text)] sm:text-5xl">
                项目笔记
              </h2>
            </RevealText>

            <div className="mt-8 space-y-4">
              {projectNotes.map((t, i) => (
                <motion.article
                  key={t.name}
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: Math.min(i * 0.05, 0.12), duration: 0.42 }}
                  className="rounded-[8px] border border-[var(--site-line)] bg-[var(--site-panel)] p-5"
                >
                  <div className="mb-5 flex items-center gap-2 text-primary">
                    <CheckCircle2 size={16} />
                    <span className="text-xs font-bold uppercase tracking-[0.2em]">
                      Reflection
                    </span>
                  </div>
                  <p className="text-sm leading-7 text-[var(--site-muted)] sm:text-base sm:leading-8">“{t.quote}”</p>
                  <div className="mt-6 flex items-center gap-3">
                    <div className="grid h-10 w-10 place-items-center rounded-[6px] bg-white text-xs font-black text-[#080817]">
                      {t.avatar}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[var(--site-text)]">{t.name}</p>
                      <p className="text-xs text-[var(--site-muted)]">{t.title}</p>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>

          <div>
            <RevealText>
              <p className="section-kicker">Experience</p>
              <h2 className="mt-4 text-3xl font-black tracking-tight text-[var(--site-text)] sm:text-5xl">
                实践经历
              </h2>
            </RevealText>

            <div className="mt-8 border-t border-[var(--site-line)]">
              {experience.map((exp, i) => (
                <motion.article
                  key={exp.period}
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: Math.min(i * 0.05, 0.14), duration: 0.42 }}
                  className="grid gap-4 border-b border-[var(--site-line)] py-5 sm:grid-cols-[120px_minmax(0,1fr)]"
                >
                  <p className="font-mono text-xs text-primary">{exp.period}</p>
                  <div>
                    <h3 className="text-lg font-black text-[var(--site-text)] sm:text-xl">{exp.role}</h3>
                    <p className="mt-1 text-sm text-[var(--site-muted)]">{exp.company}</p>
                    <p className="mt-3 text-sm leading-7 text-[var(--site-muted)]">
                      {exp.description}
                    </p>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
