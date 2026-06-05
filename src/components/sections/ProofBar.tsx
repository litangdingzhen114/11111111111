"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";
import { stats } from "@/data/skills";

const loopItems = [
  "AI AGENT",
  "AIGC WORKFLOW",
  "MINI PROGRAM",
  "PRODUCT PROTOTYPE",
  "INTERFACE CRAFT",
  "CONTENT OPS",
];

function AnimatedCounter({
  target,
  suffix = "",
  inView,
}: {
  target: string;
  suffix?: string;
  inView: boolean;
}) {
  const [count, setCount] = useState(0);
  const value = parseInt(target);

  useEffect(() => {
    if (!inView) return;

    let frame: number;
    const duration = 1500;
    const start = Date.now();

    const animate = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * value));

      if (progress < 1) {
        frame = requestAnimationFrame(animate);
      }
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [inView, value]);

  return (
    <span className="text-4xl font-black tracking-tight text-white sm:text-6xl">
      {count}
      {suffix}
    </span>
  );
}

export default function ProofBar() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.45 });
  const marquee = [...loopItems, ...loopItems];

  return (
    <section className="relative overflow-hidden border-y border-white/10 bg-background">
      <div className="marquee-mask border-b border-white/10 py-3 sm:py-4">
        <div className="marquee-track flex items-center gap-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/[0.45] sm:gap-5 sm:text-xs sm:tracking-[0.28em]">
          {marquee.map((item, index) => (
            <span key={`${item}-${index}`} className="flex items-center gap-5">
              {item}
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            </span>
          ))}
        </div>
      </div>

      <div
        ref={ref}
        className="section-shell grid divide-y divide-white/10 sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4"
      >
        {stats.map((stat) => (
          <div key={stat.label} className="py-8 sm:px-6 sm:py-10 lg:px-8">
            <AnimatedCounter
              target={stat.value}
              suffix={stat.suffix}
              inView={isInView}
            />
            <p className="mt-3 text-sm text-white/[0.48]">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
