"use client";

import { useRef } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ArrowRight, ChevronDown } from "lucide-react";
import MagneticButton from "@/components/motion/MagneticButton";

const HeroScene = dynamic(() => import("@/components/three/HeroScene"), {
  ssr: false,
});

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      const coarsePointer = window.matchMedia("(pointer: coarse)").matches;

      if (prefersReducedMotion || coarsePointer) {
        gsap.set("[data-hero-animate]", { opacity: 1, y: 0 });
        return;
      }

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        "[data-hero-animate]",
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, duration: 0.72, stagger: 0.09 }
      );
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="hero-surface relative flex min-h-[100svh] items-center justify-center overflow-hidden py-24 sm:py-28"
    >
      <HeroScene />

      <div className="hero-vertical-vignette pointer-events-none absolute inset-0 z-[1]" />
      <div className="hero-horizontal-vignette pointer-events-none absolute inset-0 z-[1]" />

      <div className="relative z-10 mx-auto max-w-5xl px-5 text-center sm:px-6">
        <div
          data-hero-animate
          className="hero-status-badge mb-5 inline-flex max-w-full items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-semibold sm:mb-6 sm:px-4 sm:text-sm"
        >
          <span className="relative flex h-2 w-2">
            <span className="hero-status-ping absolute inline-flex h-full w-full animate-ping rounded-full opacity-75" />
            <span className="hero-status-dot relative inline-flex h-2 w-2 rounded-full" />
          </span>
          AI 产品经理方向 / 项目作品集
        </div>

        <h1
          data-hero-animate
          className="text-[clamp(2.7rem,12vw,5rem)] font-extrabold leading-[1.02] tracking-tight text-white sm:text-6xl lg:text-8xl"
        >
          AI 产品经理 &
          <br />
          <span className="text-gradient">
            原型开发者
          </span>
        </h1>

        <p
          data-hero-animate
          className="mx-auto mt-5 max-w-2xl text-base leading-7 text-gray-400 sm:mt-6 sm:text-xl sm:leading-relaxed"
        >
          我把 Agent、AIGC 工作流、小程序和 Web 项目整理在这里，记录从场景拆解、产品流程到可演示原型的完整过程。
        </p>

        <div
          data-hero-animate
          className="mt-8 flex flex-col items-stretch gap-3 sm:mt-10 sm:flex-row sm:items-center sm:justify-center sm:gap-4"
        >
          <MagneticButton>
            <Link
              href="/work"
              className="site-primary-cta inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold transition-all hover:scale-[1.02] sm:w-auto sm:px-8"
            >
              查看作品
              <ArrowRight size={16} />
            </Link>
          </MagneticButton>
          <MagneticButton>
            <Link
              href="/#process"
              className="site-secondary-cta inline-flex w-full items-center justify-center gap-2 rounded-full border px-6 py-3.5 text-sm font-semibold transition-all hover:scale-[1.02] sm:w-auto sm:px-8"
            >
          看我的方法
            </Link>
          </MagneticButton>
        </div>

        <p data-hero-animate className="mt-6 text-xs leading-6 text-gray-600 sm:mt-8 sm:text-sm">
          当前重点：AI Agent / AIGC 工作流 / 垂直行业 AI 助手
        </p>
      </div>

      <div className="absolute bottom-5 left-1/2 z-10 hidden -translate-x-1/2 animate-bounce sm:block">
        <ChevronDown size={24} className="text-[var(--site-muted)]" />
      </div>
    </section>
  );
}
