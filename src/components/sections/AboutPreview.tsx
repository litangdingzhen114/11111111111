"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import RevealText from "@/components/motion/RevealText";

export default function AboutPreview() {
  const focusAreas = [
    { label: "Product Strategy", value: 90 },
    { label: "Frontend Development", value: 95 },
    { label: "Backend Development", value: 80 },
    { label: "UI/UX Design", value: 75 },
  ];

  return (
    <section className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20 items-center">
          {/* Left: Text */}
          <RevealText>
            <p className="text-sm font-semibold uppercase tracking-widest text-purple-400">
              About Me
            </p>
            <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
              A product-minded full-stack developer
            </h2>
            <p className="mt-6 text-gray-400 leading-relaxed">
              I&apos;m a product-minded full-stack developer with a passion for
              building digital products that solve real problems. I bring
              together product strategy, user experience, and engineering to
              create simple, intuitive, and beautiful experiences.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-gray-400">
              <li className="flex items-center gap-3">
                <span className="h-1.5 w-1.5 rounded-full bg-purple-400" />
                6+ years of experience
              </li>
              <li className="flex items-center gap-3">
                <span className="h-1.5 w-1.5 rounded-full bg-purple-400" />
                20+ successful projects
              </li>
              <li className="flex items-center gap-3">
                <span className="h-1.5 w-1.5 rounded-full bg-purple-400" />
                Deep product mindset
              </li>
              <li className="flex items-center gap-3">
                <span className="h-1.5 w-1.5 rounded-full bg-purple-400" />
                Clean & scalable code
              </li>
            </ul>
            <Link
              href="/about"
              className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-6 py-2.5 text-sm font-semibold text-gray-300 hover:border-white/20 hover:text-white transition-all"
            >
              More About Me
              <ArrowRight size={14} />
            </Link>
          </RevealText>

          {/* Right: Focus bars */}
          <RevealText delay={0.2}>
            <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8">
              <h3 className="mb-6 text-lg font-bold text-white">My Focus</h3>
              <div className="space-y-6">
                {focusAreas.map((area, i) => (
                  <div key={area.label}>
                    <div className="mb-2 flex items-center justify-between text-sm">
                      <span className="text-gray-400">{area.label}</span>
                      <span className="text-white font-mono">{area.value}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-white/[0.06] overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${area.value}%` }}
                        viewport={{ once: true }}
                        transition={{
                          delay: 0.3 + i * 0.15,
                          duration: 1,
                          ease: "easeOut",
                        }}
                        className="h-full rounded-full bg-gradient-to-r from-purple-500 to-blue-500"
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 rounded-xl bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/10 p-4">
                <p className="text-sm font-semibold text-white">
                  Let&apos;s build something amazing
                </p>
                <p className="mt-1 text-xs text-gray-400">
                  I&apos;m currently available for freelance and full-time opportunities.
                </p>
                <Link
                  href="/contact"
                  className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-purple-400 hover:text-purple-300 transition-colors"
                >
                  Let&apos;s Talk
                  <ArrowRight size={12} />
                </Link>
              </div>
            </div>
          </RevealText>
        </div>
      </div>
    </section>
  );
}
