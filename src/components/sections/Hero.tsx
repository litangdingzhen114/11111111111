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

      if (prefersReducedMotion) {
        gsap.set("[data-hero-animate]", { opacity: 1, y: 0 });
        return;
      }

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        "[data-hero-animate]",
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.15 }
      );
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* 3D Background */}
      <HeroScene />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#05050A] via-transparent to-[#05050A] pointer-events-none z-[1]" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#05050A]/50 via-transparent to-[#05050A]/50 pointer-events-none z-[1]" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        {/* Eyebrow */}
        <div data-hero-animate className="mb-6 inline-flex items-center gap-2 rounded-full border border-purple-500/20 bg-purple-500/10 px-4 py-1.5 text-sm text-purple-300">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-purple-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-purple-500" />
          </span>
          Available for work
        </div>

        {/* Title */}
        <h1
          data-hero-animate
          className="text-5xl font-extrabold leading-tight tracking-tight text-white sm:text-6xl lg:text-8xl"
        >
          Product Manager &
          <br />
          <span className="bg-gradient-to-r from-purple-400 via-violet-400 to-blue-400 bg-clip-text text-transparent">
            Full-stack Developer
          </span>
        </h1>

        {/* Subtitle */}
        <p
          data-hero-animate
          className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-400 sm:text-xl"
        >
          I combine product thinking, frontend craft, and full-stack engineering
          to turn ideas into usable, scalable web products.
        </p>

        {/* CTAs */}
        <div
          data-hero-animate
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
        >
          <MagneticButton>
            <Link
              href="/work"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 px-8 py-3.5 text-sm font-semibold text-white shadow-xl shadow-purple-500/25 hover:shadow-purple-500/40 transition-all hover:scale-[1.02]"
            >
              View My Work
              <ArrowRight size={16} />
            </Link>
          </MagneticButton>
          <MagneticButton>
            <Link
              href="/#process"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-8 py-3.5 text-sm font-semibold text-gray-300 hover:border-white/20 hover:text-white transition-all hover:scale-[1.02]"
            >
              See My Process
            </Link>
          </MagneticButton>
        </div>

        {/* Trust line */}
        <p data-hero-animate className="mt-8 text-sm text-gray-600">
          Trusted by 20+ clients worldwide
        </p>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <ChevronDown size={24} className="text-gray-600" />
      </div>
    </section>
  );
}
