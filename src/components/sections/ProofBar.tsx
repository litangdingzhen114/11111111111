"use client";

import { useRef, useEffect, useState } from "react";
import { useInView } from "motion/react";
import { stats } from "@/data/skills";

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
    const duration = 2000;
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
    <span className="text-4xl font-extrabold text-white sm:text-5xl lg:text-6xl">
      {count}
      {suffix}
    </span>
  );
}

export default function ProofBar() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <section className="relative border-y border-white/[0.06] bg-white/[0.02]">
      <div
        ref={ref}
        className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-6 py-16 lg:grid-cols-4 lg:px-8"
      >
        {stats.map((stat) => (
          <div key={stat.label} className="text-center">
            <AnimatedCounter
              target={stat.value}
              suffix={stat.suffix}
              inView={isInView}
            />
            <p className="mt-2 text-sm text-gray-500">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
