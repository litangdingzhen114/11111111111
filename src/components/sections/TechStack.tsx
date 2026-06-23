"use client";

import RevealText from "@/components/motion/RevealText";
import { techStack } from "@/data/skills";

export default function TechStack() {
  const firstRow = [...techStack, ...techStack];
  const secondRow = [...techStack].reverse().concat([...techStack].reverse());

  return (
    <section className="overflow-hidden border-y border-[var(--site-line)] bg-background py-16 sm:py-20 lg:py-24">
      <div className="section-shell">
        <RevealText className="mb-8 flex flex-col gap-4 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="section-kicker">Stack</p>
            <h2 className="mt-4 text-3xl font-black tracking-tight text-[var(--site-text)] sm:text-5xl">
              这些工具让我
              <br />
              少停在 PPT 里。
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-7 text-[var(--site-muted)]">
            前端负责把体验做出来，后端负责接接口和数据。先跑通一个小版本，再慢慢补细节。
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
                  className="inline-flex items-center gap-2 rounded-[8px] border border-[var(--site-line)] bg-[var(--site-panel)] px-3 py-2.5 text-xs text-[var(--site-muted)] sm:gap-3 sm:px-5 sm:py-3 sm:text-sm"
                >
                  <span className="grid h-7 w-7 place-items-center rounded-[6px] bg-primary text-[11px] font-black text-primary-foreground sm:h-8 sm:w-8 sm:text-xs">
                    {tech.name.slice(0, 2)}
                  </span>
                  <span className="font-semibold text-[var(--site-text)]">{tech.name}</span>
                  <span className="hidden text-xs text-[var(--site-muted-strong)] sm:inline">{tech.category}</span>
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
