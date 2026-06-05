"use client";

import RevealText from "@/components/motion/RevealText";
import { techStack } from "@/data/skills";

export default function TechStack() {
  const firstRow = [...techStack, ...techStack];
  const secondRow = [...techStack].reverse().concat([...techStack].reverse());

  return (
    <section className="overflow-hidden border-y border-white/10 bg-background py-16 sm:py-20 lg:py-24">
      <div className="section-shell">
        <RevealText className="mb-8 flex flex-col gap-4 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="section-kicker">Stack</p>
            <h2 className="mt-4 text-3xl font-black tracking-tight text-white sm:text-5xl">
              技术栈不是清单，
              <br />
              是原型验证的基础设施。
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-7 text-white/[0.48]">
            从前端、小程序到后端代理和模型 API，用熟悉的工具组合快速跑通 AI 产品流程。
          </p>
        </RevealText>
      </div>

      <div className="space-y-3 sm:space-y-4">
        {[firstRow, secondRow].map((row, rowIndex) => (
          <div key={rowIndex} className="marquee-mask">
            <div
              className={`marquee-track flex items-center gap-4 ${
                rowIndex === 1 ? "reverse" : ""
              }`}
            >
              {row.map((tech, index) => (
                <span
                  key={`${tech.name}-${rowIndex}-${index}`}
                  className="inline-flex items-center gap-2 rounded-[8px] border border-white/10 bg-white/[0.035] px-3 py-2.5 text-xs text-white/[0.64] sm:gap-3 sm:px-5 sm:py-3 sm:text-sm"
                >
                  <span className="grid h-7 w-7 place-items-center rounded-[6px] bg-primary text-[11px] font-black text-primary-foreground sm:h-8 sm:w-8 sm:text-xs">
                    {tech.name.slice(0, 2)}
                  </span>
                  <span className="font-semibold text-white">{tech.name}</span>
                  <span className="hidden text-xs text-white/[0.34] sm:inline">{tech.category}</span>
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
