"use client";

import { motion } from "motion/react";
import { CheckCircle2 } from "lucide-react";
import RevealText from "@/components/motion/RevealText";

const projectNotes = [
  {
    quote:
      "Agent 项目让我意识到，AI 产品真正难的不是回答，而是工具调用、风险边界、人工兜底和业务数据之间的流程设计。",
    name: "DTC AI Agent",
    title: "客服与导购原型",
    avatar: "AI",
  },
  {
    quote:
      "AIGC 项目不是把模型入口排成菜单，而是把创意、分镜、角色、素材和导出串成可复用的生产流程。",
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
      "完成 DTC AI Agent、Frieren AIGC 工作流、AI 康复分诊小程序等可演示原型，重点训练场景拆解、流程设计和模型边界控制。",
  },
  {
    period: "2025 - 2026",
    role: "Web / 小程序项目",
    company: "电商、内容与作品集",
    description:
      "开发 LEMANISM 时尚电商小程序、影评社官方网页、创意互动专题页和个人作品集站，持续积累前端体验与内容组织能力。",
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
    <section className="border-y border-white/10 bg-background py-20 sm:py-24 lg:py-32">
      <div className="section-shell">
        <div className="grid gap-12 sm:gap-14 lg:grid-cols-[0.92fr_1.08fr] lg:gap-20">
          <div>
            <RevealText>
              <p className="section-kicker">Notes</p>
              <h2 className="mt-4 text-3xl font-black tracking-tight text-white sm:text-5xl">
                项目笔记
              </h2>
            </RevealText>

            <div className="mt-10 space-y-4">
              {projectNotes.map((t, i) => (
                <motion.article
                  key={t.name}
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: Math.min(i * 0.05, 0.12), duration: 0.42 }}
                  className="rounded-[8px] border border-white/10 bg-white/[0.035] p-5"
                >
                  <div className="mb-5 flex items-center gap-2 text-primary">
                    <CheckCircle2 size={16} />
                    <span className="text-xs font-bold uppercase tracking-[0.2em]">
                      Reflection
                    </span>
                  </div>
                  <p className="text-sm leading-7 text-white/70 sm:text-base sm:leading-8">“{t.quote}”</p>
                  <div className="mt-6 flex items-center gap-3">
                    <div className="grid h-10 w-10 place-items-center rounded-[6px] bg-white text-xs font-black text-[#080817]">
                      {t.avatar}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">{t.name}</p>
                      <p className="text-xs text-white/[0.38]">{t.title}</p>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>

          <div>
            <RevealText>
              <p className="section-kicker">Experience</p>
              <h2 className="mt-4 text-3xl font-black tracking-tight text-white sm:text-5xl">
                实践经历
              </h2>
            </RevealText>

            <div className="mt-10 border-t border-white/10">
              {experience.map((exp, i) => (
                <motion.article
                  key={exp.period}
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: Math.min(i * 0.05, 0.14), duration: 0.42 }}
                  className="grid gap-4 border-b border-white/10 py-6 sm:grid-cols-[130px_minmax(0,1fr)]"
                >
                  <p className="font-mono text-xs text-primary">{exp.period}</p>
                  <div>
                    <h3 className="text-lg font-black text-white sm:text-xl">{exp.role}</h3>
                    <p className="mt-1 text-sm text-white/[0.38]">{exp.company}</p>
                    <p className="mt-3 text-sm leading-7 text-white/[0.54]">
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
